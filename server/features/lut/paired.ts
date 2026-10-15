/**
 * Paired before/after LUT extraction.
 *
 * This is the accurate way to replicate a grade: instead of guessing from the
 * statistics of a single graded still, we measure the actual mapping. The user
 * supplies the SAME frame twice — once ungraded, once graded — and we solve
 * for the 3D LUT cell that best reproduces the observed transformation.
 *
 * Method:
 *   1. Decode both frames at identical dimensions (working size capped at 960px).
 *   2. For every pixel, quantize the BEFORE color to its LUT cell and
 *      accumulate the AFTER color. Cells with direct observations are exact.
 *   3. Fill unobserved cells with normalized convolution (blur the accumulated
 *      sums and the sample counts separately, then divide) — smooth, fast, no
 *      randomness anywhere in this module.
 *   4. Blend with identity by intensity, clamp to gamut.
 *   5. Report fidelity: mean/max ΔE (CIE76 in Lab) between the LUT applied to
 *      the before-frame and the actual graded frame, plus cell coverage.
 */

import sharp from "sharp";
import { exportLUT, type LUTFormat } from "./generator";
import { rgbToLab, labDistance, type RGB } from "./color-science";
import type { LUTPoint } from "./professional-lut-builder";

export interface PairedLUTResult {
  lutData: string;
  map: LUTPoint[];
  /** Fraction of LUT cells with direct before/after observations (0-1). */
  coverage: number;
  /** Mean CIE76 ΔE between LUT(before) and actual after, over sampled pixels. */
  meanDeltaE: number;
  /** Max sampled ΔE. */
  maxDeltaE: number;
  /** Working dimensions (both frames are resampled to these). */
  width: number;
  height: number;
  /** JPEG of the (resized) before frame, for previews. */
  previewSource: Buffer;
}

interface DecodedFrame {
  data: Buffer;
  width: number;
  height: number;
}

async function decodeFrame(buffer: Buffer, width: number, height: number): Promise<DecodedFrame> {
  const { data, info } = await sharp(buffer)
    .resize(width, height, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data: Buffer.from(data), width: info.width, height: info.height };
}

/** One separable box-blur pass (radius 1) over a gridSize³ volume, in place via temp. */
function blurAxis(values: Float64Array, n: number, axis: 0 | 1 | 2): void {
  const tmp = new Float64Array(values.length);
  // Layout is blue-fastest: idx = (b * n + g) * n + r
  for (let b = 0; b < n; b++) {
    for (let g = 0; g < n; g++) {
      for (let r = 0; r < n; r++) {
        let sum = 0;
        let count = 0;
        for (let d = -1; d <= 1; d++) {
          const rr = axis === 0 ? r + d : r;
          const gg = axis === 1 ? g + d : g;
          const bb = axis === 2 ? b + d : b;
          if (rr < 0 || rr >= n || gg < 0 || gg >= n || bb < 0 || bb >= n) continue;
          sum += values[(bb * n + gg) * n + rr];
          count++;
        }
        tmp[(b * n + g) * n + r] = sum / count;
      }
    }
  }
  values.set(tmp);
}

function trilinearSample(map: LUTPoint[], n: number, r: number, g: number, b: number): RGB {
  const max = n - 1;
  const fr = Math.max(0, Math.min(max, r * max));
  const fg = Math.max(0, Math.min(max, g * max));
  const fb = Math.max(0, Math.min(max, b * max));
  const r0 = Math.floor(fr);
  const g0 = Math.floor(fg);
  const b0 = Math.floor(fb);
  const r1 = Math.min(r0 + 1, max);
  const g1 = Math.min(g0 + 1, max);
  const b1 = Math.min(b0 + 1, max);
  const dr = fr - r0;
  const dg = fg - g0;
  const db = fb - b0;
  const at = (rr: number, gg: number, bb: number) => map[(bb * n + gg) * n + rr];
  const lerp = (a: RGB, b2: RGB, t: number): RGB => ({
    r: a.r + (b2.r - a.r) * t,
    g: a.g + (b2.g - a.g) * t,
    b: a.b + (b2.b - a.b) * t,
  });
  const c00 = lerp(at(r0, g0, b0), at(r1, g0, b0), dr);
  const c10 = lerp(at(r0, g1, b0), at(r1, g1, b0), dr);
  const c01 = lerp(at(r0, g0, b1), at(r1, g0, b1), dr);
  const c11 = lerp(at(r0, g1, b1), at(r1, g1, b1), dr);
  const c0 = lerp(c00, c10, dg);
  const c1 = lerp(c01, c11, dg);
  return lerp(c0, c1, db);
}

export async function solvePairedLUT(
  beforeBuffer: Buffer,
  afterBuffer: Buffer,
  gridSize: number,
  intensity: number
): Promise<Omit<PairedLUTResult, "lutData">> {
  const n = gridSize;
  const t = Math.max(0, Math.min(100, intensity)) / 100;

  const beforeMeta = await sharp(beforeBuffer).metadata();
  const bw = beforeMeta.width || 0;
  const bh = beforeMeta.height || 0;
  if (!bw || !bh) throw new Error("Could not read the before image");

  const scale = Math.min(1, 960 / Math.max(bw, bh));
  const width = Math.max(1, Math.round(bw * scale));
  const height = Math.max(1, Math.round(bh * scale));

  const before = await decodeFrame(beforeBuffer, width, height);
  const after = await decodeFrame(afterBuffer, width, height);
  if (before.data.length !== after.data.length) {
    throw new Error("Frame size mismatch after resampling");
  }

  const cells = n * n * n;
  const sumR = new Float64Array(cells);
  const sumG = new Float64Array(cells);
  const sumB = new Float64Array(cells);
  const counts = new Float64Array(cells);

  const pixels = before.data.length / 3;
  for (let i = 0; i < pixels; i++) {
    const br = before.data[i * 3] / 255;
    const bg = before.data[i * 3 + 1] / 255;
    const bb = before.data[i * 3 + 2] / 255;
    const r = Math.round(br * (n - 1));
    const g = Math.round(bg * (n - 1));
    const b = Math.round(bb * (n - 1));
    const idx = (b * n + g) * n + r;
    sumR[idx] += after.data[i * 3] / 255;
    sumG[idx] += after.data[i * 3 + 1] / 255;
    sumB[idx] += after.data[i * 3 + 2] / 255;
    counts[idx] += 1;
  }

  let populated = 0;
  for (let i = 0; i < cells; i++) if (counts[i] > 0) populated++;

  // Normalized convolution: diffuse sums and counts so unobserved cells take
  // smooth values from observed neighbors. Three full passes is plenty.
  for (let pass = 0; pass < 3; pass++) {
    blurAxis(sumR, n, 0); blurAxis(sumR, n, 1); blurAxis(sumR, n, 2);
    blurAxis(sumG, n, 0); blurAxis(sumG, n, 1); blurAxis(sumG, n, 2);
    blurAxis(sumB, n, 0); blurAxis(sumB, n, 1); blurAxis(sumB, n, 2);
    blurAxis(counts, n, 0); blurAxis(counts, n, 1); blurAxis(counts, n, 2);
  }

  const map: LUTPoint[] = new Array(cells);
  for (let b = 0; b < n; b++) {
    for (let g = 0; g < n; g++) {
      for (let r = 0; r < n; r++) {
        const idx = (b * n + g) * n + r;
        const identity = { r: r / (n - 1), g: g / (n - 1), b: b / (n - 1) };
        let solved: LUTPoint;
        if (counts[idx] > 1e-9) {
          solved = {
            r: sumR[idx] / counts[idx],
            g: sumG[idx] / counts[idx],
            b: sumB[idx] / counts[idx],
          };
        } else {
          solved = identity;
        }
        map[idx] = {
          r: Math.max(0, Math.min(1, identity.r * (1 - t) + solved.r * t)),
          g: Math.max(0, Math.min(1, identity.g * (1 - t) + solved.g * t)),
          b: Math.max(0, Math.min(1, identity.b * (1 - t) + solved.b * t)),
        };
      }
    }
  }

  // Fidelity: mean/max ΔE between LUT(before) and actual after.
  const stride = Math.max(1, Math.floor(pixels / 20000));
  let sumDE = 0;
  let maxDE = 0;
  let samples = 0;
  for (let i = 0; i < pixels; i += stride) {
    const br = before.data[i * 3] / 255;
    const bg = before.data[i * 3 + 1] / 255;
    const bb = before.data[i * 3 + 2] / 255;
    const predicted = trilinearSample(map, n, br, bg, bb);
    const de = labDistance(
      rgbToLab(predicted),
      rgbToLab({
        r: after.data[i * 3] / 255,
        g: after.data[i * 3 + 1] / 255,
        b: after.data[i * 3 + 2] / 255,
      })
    );
    sumDE += de;
    if (de > maxDE) maxDE = de;
    samples++;
  }

  const previewSource = await sharp(before.data, {
    raw: { width, height, channels: 3 },
  })
    .jpeg({ quality: 88 })
    .toBuffer();

  return {
    map,
    coverage: populated / cells,
    meanDeltaE: samples ? sumDE / samples : 0,
    maxDeltaE: maxDE,
    width,
    height,
    previewSource,
  };
}

export async function generatePairedLUT(
  beforeBuffer: Buffer,
  afterBuffer: Buffer,
  gridSize: number,
  intensity: number,
  format: LUTFormat,
  precision: string = "10"
): Promise<PairedLUTResult> {
  const solved = await solvePairedLUT(beforeBuffer, afterBuffer, gridSize, intensity);
  const lutData = exportLUT(solved.map, gridSize, format, precision, {
    name: "Chroma Paired Grade",
    description: `Solved from a before/after frame pair (coverage ${(solved.coverage * 100).toFixed(1)}%, mean ΔE ${solved.meanDeltaE.toFixed(2)})`,
  });
  return { ...solved, lutData };
}
