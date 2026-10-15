/**
 * Video -> LUT pipeline.
 *
 * Approach:
 *   1. Decode the clip with ffmpeg and sample N frames spread across the whole
 *      duration (not just the first few seconds).
 *   2. Run the exact same color-science analysis used for images on each frame.
 *   3. Merge the per-frame 3D LUTs with a trimmed mean, so a single flashy or
 *      dark frame can't drag the grade around.
 *
 * The result is one LUT that represents the look of the clip.
 */

import { execFile } from "child_process";
import { promisify } from "util";
import { mkdtemp, writeFile, readFile, readdir, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import ffmpegPath from "ffmpeg-static";
import type { AdvancedControls } from "@shared/schema";
import type { LUTPoint } from "./professional-lut-builder";
import { buildLUTMapFromImage, exportLUT, type LUTFormat } from "./generator";
import { DEFAULT_SEED, type RGB } from "./color-science";

const execFileAsync = promisify(execFile);

export interface VideoLUTOptions {
  /** How many frames to sample across the clip (3-16). Default 8. */
  frameCount?: number;
  /** Values trimmed from each end before averaging (outlier rejection). Default 1. */
  trim?: number;
  /** Seed for deterministic per-frame analysis. Default DEFAULT_SEED. */
  seed?: number;
}

export interface VideoLUTResult {
  lutData: string;
  lutMap: LUTPoint[];
  frameCount: number;
  durationSec: number;
  /** A representative frame (middle of the clip), useful for previews. */
  sampleFrame: Buffer;
}

interface FFmpegError extends Error {
  stderr?: string;
}

/**
 * Read the clip duration from ffmpeg's stderr.
 * `ffmpeg -i <file>` with no output exits non-zero but prints the metadata.
 */
async function probeDurationSec(inputPath: string): Promise<number> {
  try {
    await execFileAsync(ffmpegPath, ["-hide_banner", "-i", inputPath]);
  } catch (err) {
    const stderr = (err as FFmpegError).stderr || "";
    const match = stderr.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
    if (match) {
      const [, h, m, s] = match;
      return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
    }
  }
  return 0;
}

/**
 * Extract evenly spaced frames from a video buffer as JPEG buffers.
 */
export async function extractFrames(
  videoBuffer: Buffer,
  frameCount = 8
): Promise<{ frames: Buffer[]; durationSec: number }> {
  const count = Math.max(3, Math.min(frameCount, 16));
  const dir = await mkdtemp(join(tmpdir(), "chroma-video-"));
  const inputPath = join(dir, "input.mp4");

  try {
    await writeFile(inputPath, videoBuffer);
    const durationSec = await probeDurationSec(inputPath);

    // Sample `count` frames spread across the whole clip. When we can't read a
    // duration, fall back to roughly one frame every two seconds.
    const fps = durationSec > 0 ? count / durationSec : 0.5;

    await execFileAsync(
      ffmpegPath,
      [
        "-hide_banner",
        "-loglevel", "error",
        "-i", inputPath,
        "-vf", `fps=${fps.toFixed(4)},scale='min(1280,iw)':-2`,
        "-frames:v", String(count),
        "-q:v", "3",
        join(dir, "frame_%03d.jpg"),
      ],
      { maxBuffer: 1024 * 1024 * 64 }
    );

    const files = (await readdir(dir))
      .filter((f) => f.startsWith("frame_") && f.endsWith(".jpg"))
      .sort();

    const frames: Buffer[] = [];
    for (const file of files) {
      frames.push(await readFile(join(dir, file)));
    }

    return { frames, durationSec };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

/**
 * Merge several 3D LUT maps into one using a per-channel trimmed mean.
 */
export function mergeLUTMaps(maps: LUTPoint[][], trim = 1): LUTPoint[] {
  if (maps.length === 0) throw new Error("No LUT maps to merge");
  if (maps.length === 1) return maps[0];

  const size = maps[0].length;
  const merged: LUTPoint[] = new Array(size);

  // Never trim so far that we'd have nothing left.
  const t = Math.min(trim, Math.floor((maps.length - 1) / 2));

  for (let i = 0; i < size; i++) {
    const rs: number[] = [];
    const gs: number[] = [];
    const bs: number[] = [];
    for (let f = 0; f < maps.length; f++) {
      const p = maps[f][i];
      rs.push(p.r);
      gs.push(p.g);
      bs.push(p.b);
    }
    rs.sort((a, b) => a - b);
    gs.sort((a, b) => a - b);
    bs.sort((a, b) => a - b);

    const slice = (arr: number[]) =>
      t > 0 ? arr.slice(t, arr.length - t) : arr;
    const mean = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;

    merged[i] = {
      r: mean(slice(rs)),
      g: mean(slice(gs)),
      b: mean(slice(bs)),
    };
  }

  return merged;
}

/** Convert a LUT point map (0-1) into the Map<"r,g,b", RGB> shape used for previews. */
export function lutPointsToMap(points: LUTPoint[], gridSize: number): Map<string, RGB> {
  const map = new Map<string, RGB>();
  for (let b = 0; b < gridSize; b++) {
    for (let g = 0; g < gridSize; g++) {
      for (let r = 0; r < gridSize; r++) {
        const idx = (b * gridSize + g) * gridSize + r;
        const p = points[idx];
        map.set(`${r},${g},${b}`, {
          r: Math.round(p.r * 255),
          g: Math.round(p.g * 255),
          b: Math.round(p.b * 255),
        });
      }
    }
  }
  return map;
}

/**
 * Generate a single LUT that represents a video clip.
 */
export async function generateVideoLUT(
  videoBuffer: Buffer,
  gridSize: number,
  intensity: number,
  format: LUTFormat,
  advancedControls?: AdvancedControls,
  precision: string = "10",
  options: VideoLUTOptions = {}
): Promise<VideoLUTResult> {
  const { frames, durationSec } = await extractFrames(videoBuffer, options.frameCount ?? 8);

  if (frames.length === 0) {
    throw new Error("No frames could be decoded from the video");
  }

  // Analyze frames in small batches to keep memory/CPU sane.
  // Each frame reuses the same seed so identical frames analyze identically.
  const seed = options.seed ?? DEFAULT_SEED;
  const maps: LUTPoint[][] = [];
  const batchSize = 4;
  for (let i = 0; i < frames.length; i += batchSize) {
    const batch = frames.slice(i, i + batchSize);
    const batchMaps = await Promise.all(
      batch.map((frame) => buildLUTMapFromImage(frame, gridSize, intensity, advancedControls, seed))
    );
    maps.push(...batchMaps);
  }

  const merged = mergeLUTMaps(maps, options.trim ?? 1);
  const lutData = exportLUT(merged, gridSize, format, precision, {
    name: "Chroma Video Grade",
    description: `Averaged across ${frames.length} frames (${durationSec.toFixed(1)}s)`,
  });

  return {
    lutData,
    lutMap: merged,
    frameCount: frames.length,
    durationSec,
    sampleFrame: frames[Math.floor(frames.length / 2)],
  };
}
