/**
 * Apply an actual generated LUT file to an image for previews.
 *
 * Before this module, previews were rendered through the legacy zone-based
 * pipeline while downloads came from the color-science pipeline — so what
 * you saw was not what you got. Every path here consumes the real LUT text
 * (or rebuilds the identical map), so previews match the exported file.
 */

import sharp from "sharp";
import { parseCubeLUT, parse3dlLUT } from "./parser";
import { applyLUTToImage, buildLUTMapFromImage } from "./generator";
import { lutPointsToMap } from "./video";
import type { LUTPoint } from "./professional-lut-builder";

export type PreviewableFormat = "cube" | "3dl" | "lut" | "look" | "dctl";

/** Normalize "cube" / ".cube" / ".CUBE" to a bare lowercase format id. */
export function normalizeFormat(format: string): string {
  return format.replace(/^\./, "").toLowerCase();
}

function toPoints(data: number[][]): LUTPoint[] {
  return data.map(([r, g, b]) => ({ r, g, b }));
}

/** Parse the embedded float array out of our own .dctl files. */
function parseDCTLText(lutData: string): { points: LUTPoint[]; gridSize: number } {
  const sizeMatch = lutData.match(/__CONSTANT__\s+int\s+CHROMA_N\s*=\s*(\d+)/);
  if (!sizeMatch) throw new Error("Unrecognized .dctl: missing CHROMA_N");
  const gridSize = parseInt(sizeMatch[1], 10);

  const arrayMatch = lutData.match(/CHROMA_LUT\[\]\s*=\s*\{([\s\S]*?)\};/);
  if (!arrayMatch) throw new Error("Unrecognized .dctl: missing CHROMA_LUT array");
  const values = arrayMatch[1]
    .split(",")
    .map((v) => parseFloat(v.replace(/f$/, "").trim()))
    .filter((v) => Number.isFinite(v));

  if (values.length !== gridSize ** 3 * 3) {
    throw new Error(
      `Corrupt .dctl: expected ${gridSize ** 3 * 3} values, found ${values.length}`
    );
  }

  const points: LUTPoint[] = [];
  for (let i = 0; i < values.length; i += 3) {
    points.push({ r: values[i], g: values[i + 1], b: values[i + 2] });
  }
  return { points, gridSize };
}

/** Parse our own .look files (grid floats inside braces after a Length line). */
function parseLookText(lutData: string): { points: LUTPoint[]; gridSize: number } {
  const lengthMatch = lutData.match(/Length\s+(\d+)/);
  if (!lengthMatch) throw new Error("Unrecognized .look: missing Length");
  const length = parseInt(lengthMatch[1], 10);
  const gridSize = Math.round(Math.cbrt(length));
  if (gridSize ** 3 !== length) {
    throw new Error(`Unsupported .look grid length: ${length}`);
  }

  const bodyMatch = lutData.match(/\{([\s\S]*?)\}/);
  if (!bodyMatch) throw new Error("Unrecognized .look: missing data block");
  const points: LUTPoint[] = [];
  for (const line of bodyMatch[1].split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const vals = t.split(/\s+/).map(Number);
    if (vals.length !== 3 || vals.some((v) => !Number.isFinite(v))) {
      throw new Error(`Corrupt .look data line: ${t.slice(0, 40)}`);
    }
    points.push({ r: vals[0], g: vals[1], b: vals[2] });
  }
  if (points.length !== length) {
    throw new Error(`Corrupt .look: expected ${length} points, found ${points.length}`);
  }
  return { points, gridSize };
}

function parse1DEntries(lutData: string): number[][] {
  const entries: number[][] = [];
  for (const line of lutData.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const vals = t.split(/\s+/).map(Number);
    if (vals.length !== 3 || vals.some((v) => !Number.isFinite(v))) continue;
    entries.push(vals);
  }
  if (entries.length < 2) throw new Error("Unrecognized 1D LUT: no usable entries");
  return entries;
}

/** Apply a per-channel 1D curve LUT to an image buffer. */
async function apply1DEntries(
  imageBuffer: Buffer,
  entries: number[][],
  intensity: number
): Promise<Buffer> {
  const t = Math.max(0, Math.min(100, intensity)) / 100;
  const n = entries.length;
  const { data, info } = await sharp(imageBuffer, { failOn: "none" })
    .toColorspace("srgb")
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(data);

  for (let i = 0; i < data.length; i += info.channels) {
    for (let c = 0; c < 3; c++) {
      const pos = Math.max(0, Math.min(n - 1, (data[i + c] / 255) * (n - 1)));
      const i0 = Math.floor(pos);
      const i1 = Math.min(i0 + 1, n - 1);
      const f = pos - i0;
      const graded =
        (entries[i0][c] * (1 - f) + entries[i1][c] * f) * 255;
      out[i + c] = Math.round(
        Math.max(0, Math.min(255, data[i + c] * (1 - t) + graded * t))
      );
    }
  }

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .jpeg()
    .toBuffer();
}

/**
 * Render a preview by applying a LUT file's real content to an image.
 * The map is final (intensity baked in), so `intensity` only blends the
 * 1D-curve path; 3D paths apply at full strength to match the file.
 */
export async function applyLUTFileToImage(
  imageBuffer: Buffer,
  lutData: string,
  format: string,
  intensity: number
): Promise<Buffer> {
  const fmt = normalizeFormat(format);

  if (fmt === "lut") {
    return apply1DEntries(imageBuffer, parse1DEntries(lutData), intensity);
  }

  let points: LUTPoint[];
  let gridSize: number;
  if (fmt === "cube") {
    const parsed = parseCubeLUT(lutData);
    if (parsed.errors.length > 0) throw new Error(parsed.errors[0]);
    gridSize = parsed.lut.size;
    points = toPoints(parsed.lut.data);
  } else if (fmt === "3dl") {
    const parsed = parse3dlLUT(lutData);
    if (parsed.errors.length > 0) throw new Error(parsed.errors[0]);
    gridSize = parsed.lut.size;
    points = toPoints(parsed.lut.data);
  } else if (fmt === "dctl") {
    ({ points, gridSize } = parseDCTLText(lutData));
  } else if (fmt === "look") {
    ({ points, gridSize } = parseLookText(lutData));
  } else {
    throw new Error(
      `Previews are not available for .${fmt || "unknown"} files — download and check in your editor.`
    );
  }

  if (points.length !== gridSize ** 3) {
    throw new Error(`Corrupt LUT: expected ${gridSize ** 3} points, found ${points.length}`);
  }

  return applyLUTToImage(imageBuffer, lutPointsToMap(points, gridSize), gridSize, 100);
}

/**
 * Rebuild the exact color-science map for a source image (used for live
 * pre-generation previews). Same builder the download path uses.
 */
export async function buildLivePreview(
  imageBuffer: Buffer,
  gridSize: number,
  intensity: number
): Promise<Buffer> {
  const lutMap = await buildLUTMapFromImage(imageBuffer, gridSize, intensity);
  return applyLUTToImage(imageBuffer, lutPointsToMap(lutMap, gridSize), gridSize, 100);
}
