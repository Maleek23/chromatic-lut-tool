import sharp from "sharp";
import type { AdvancedControls } from "@shared/schema";
import {
  analyzeImageColorScience,
  type RGB,
  type Lab,
  type ColorAnalysis,
  applyFilmicToneCurve,
  rgbToLab,
  labToRgb,
  labToLch,
  lchToLab,
  gamutMapToRec709,
} from "./color-science";
import { generateLookLUT, generateXmpPreset } from "./format-exporters";
import { buildLUTFromColorScience, type LUTPoint } from "./professional-lut-builder";

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface ColorTransform {
  brightnessShift: number;
  contrastFactor: number;
  saturationFactor: number;
  colorShifts: { r: number; g: number; b: number };
}

// Helper functions for color space conversions
function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) {
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  } else if (max === g) {
    h = ((b - r) / d + 2) / 6;
  } else {
    h = ((r - g) / d + 4) / 6;
  }

  return { h: h * 360, s, l };
}

function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s;
  const l = hsl.l;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = hueToRgb(p, q, h + 1 / 3);
  const g = hueToRgb(p, q, h);
  const b = hueToRgb(p, q, h - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

// Professional LUT generation with cinema-grade color science
export async function generateLUT(
  imageBuffer: Buffer,
  gridSize: number,
  intensity: number,
  format: ".cube" | ".3dl" | ".lut" | ".look" | ".xmp",
  advancedControls?: AdvancedControls,
  precision: string = "10",
  metadata?: { name?: string; description?: string }
): Promise<string> {
  // Use professional color science analysis
  const colorAnalysis = await analyzeImageColorScience(imageBuffer);
  
  // Build LUT using advanced color science
  const lutMap = buildLUTFromColorScience(
    colorAnalysis,
    gridSize,
    intensity / 100,
    advancedControls
  );

  // Export in requested format
  if (format === ".cube") {
    return generateCubeLUT(lutMap, gridSize, precision);
  } else if (format === ".3dl") {
    return generate3dlLUT(lutMap, gridSize, precision);
  } else if (format === ".lut") {
    return generate1dLUT(lutMap, gridSize, precision);
  } else if (format === ".look") {
    return generateLookLUT(lutMap, gridSize, precision);
  } else if (format === ".xmp") {
    return generateXmpPreset(lutMap, gridSize, metadata);
  } else {
    throw new Error(`Unsupported format: ${format}`);
  }
}

interface ZoneColorData {
  avgR: number;
  avgG: number;
  avgB: number;
  saturation: number;
  count: number;
}

async function deriveColorTransform(imageBuffer: Buffer): Promise<ColorTransform> {
  // Single-pass processing: decode, resize, and extract pixels efficiently
  const { data, info } = await sharp(imageBuffer, {
    failOn: 'none',
    limitInputPixels: 268402689, // Max 16384x16384 pixels
  })
    .resize(200, 200, { fit: "inside", withoutEnlargement: true })
    .toColorspace('srgb') // Ensure consistent color space
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Separate pixels into tonal zones
  const shadows: RGB[] = [];
  const midtones: RGB[] = [];
  const highlights: RGB[] = [];

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    if (luminance < 0.33) {
      shadows.push({ r, g, b });
    } else if (luminance < 0.67) {
      midtones.push({ r, g, b });
    } else {
      highlights.push({ r, g, b });
    }
  }

  // Analyze color characteristics in each zone
  const shadowData = analyzeZone(shadows);
  const midtoneData = analyzeZone(midtones);
  const highlightData = analyzeZone(highlights);

  // Calculate overall color shifts weighted by zone importance
  const totalPixels = shadows.length + midtones.length + highlights.length;
  const shadowWeight = shadows.length / totalPixels;
  const midtoneWeight = midtones.length / totalPixels;
  const highlightWeight = highlights.length / totalPixels;

  // Weighted average color shifts
  const avgR = shadowData.avgR * shadowWeight + midtoneData.avgR * midtoneWeight + highlightData.avgR * highlightWeight;
  const avgG = shadowData.avgG * shadowWeight + midtoneData.avgG * midtoneWeight + highlightData.avgG * highlightWeight;
  const avgB = shadowData.avgB * shadowWeight + midtoneData.avgB * midtoneWeight + highlightData.avgB * highlightWeight;

  // Calculate saturation factor based on zone analysis
  const avgSaturation = shadowData.saturation * shadowWeight + midtoneData.saturation * midtoneWeight + highlightData.saturation * highlightWeight;

  // Detect color temperature bias
  const rToB = avgR / Math.max(avgB, 1);
  const temperatureShift = (rToB - 1.0) * 0.3; // Positive = warm, negative = cool

  return {
    brightnessShift: (avgR + avgG + avgB) / 3 / 255 - 0.5,
    contrastFactor: 1.0 + (highlightData.avgR + highlightData.avgG + highlightData.avgB) / 3 / 255 - (shadowData.avgR + shadowData.avgG + shadowData.avgB) / 3 / 255,
    saturationFactor: avgSaturation,
    colorShifts: {
      r: (avgR - 128) / 255 * 0.3,
      g: (avgG - 128) / 255 * 0.3,
      b: (avgB - 128) / 255 * 0.3,
    },
  };
}

function analyzeZone(pixels: RGB[]): ZoneColorData {
  if (pixels.length === 0) {
    return { avgR: 128, avgG: 128, avgB: 128, saturation: 1.0, count: 0 };
  }

  let totalR = 0, totalG = 0, totalB = 0;
  let totalSaturation = 0;

  for (const pixel of pixels) {
    totalR += pixel.r;
    totalG += pixel.g;
    totalB += pixel.b;

    // Calculate saturation for this pixel
    const max = Math.max(pixel.r, pixel.g, pixel.b);
    const min = Math.min(pixel.r, pixel.g, pixel.b);
    const sat = max === 0 ? 0 : (max - min) / max;
    totalSaturation += sat;
  }

  return {
    avgR: totalR / pixels.length,
    avgG: totalG / pixels.length,
    avgB: totalB / pixels.length,
    saturation: 1.0 + (totalSaturation / pixels.length - 0.5) * 0.4,
    count: pixels.length,
  };
}

function buildLUTFromTransform(
  transform: ColorTransform,
  gridSize: number,
  intensity: number,
  advancedControls?: AdvancedControls
): Map<string, RGB> {
  const lutMap = new Map<string, RGB>();

  for (let r = 0; r < gridSize; r++) {
    for (let g = 0; g < gridSize; g++) {
      for (let b = 0; b < gridSize; b++) {
        const inputR = (r / (gridSize - 1)) * 255;
        const inputG = (g / (gridSize - 1)) * 255;
        const inputB = (b / (gridSize - 1)) * 255;

        let transformed = applyTransform(
          { r: inputR, g: inputG, b: inputB },
          transform
        );

        // Apply advanced controls if provided
        if (advancedControls) {
          transformed = applyAdvancedControls(transformed, advancedControls);
        }

        const key = `${r},${g},${b}`;
        lutMap.set(key, {
          r: inputR + (transformed.r - inputR) * intensity,
          g: inputG + (transformed.g - inputG) * intensity,
          b: inputB + (transformed.b - inputB) * intensity,
        });
      }
    }
  }

  return lutMap;
}

function applyTransform(color: RGB, transform: ColorTransform): RGB {
  let r = color.r;
  let g = color.g;
  let b = color.b;

  // Calculate luminance of input color to determine zone
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Apply contrast based on luminance zone
  // Shadows get less contrast, highlights get more
  const contrastMultiplier = luminance < 0.33 ? 0.7 : luminance > 0.67 ? 1.3 : 1.0;
  const effectiveContrast = transform.contrastFactor * contrastMultiplier;
  
  r = ((r / 255 - 0.5) * effectiveContrast + 0.5) * 255;
  g = ((g / 255 - 0.5) * effectiveContrast + 0.5) * 255;
  b = ((b / 255 - 0.5) * effectiveContrast + 0.5) * 255;

  // Apply brightness shift - stronger in shadows, weaker in highlights
  const brightnessMultiplier = luminance < 0.33 ? 1.2 : luminance > 0.67 ? 0.8 : 1.0;
  const effectiveBrightness = transform.brightnessShift * brightnessMultiplier;
  
  r += effectiveBrightness * 60;
  g += effectiveBrightness * 60;
  b += effectiveBrightness * 60;

  // Apply color shifts - zone-specific
  const colorShiftStrength = luminance < 0.33 ? 120 : luminance > 0.67 ? 80 : 100;
  r += transform.colorShifts.r * colorShiftStrength;
  g += transform.colorShifts.g * colorShiftStrength;
  b += transform.colorShifts.b * colorShiftStrength;

  // Apply saturation
  const hsl = rgbToHsl({ r, g, b });
  hsl.s *= transform.saturationFactor;
  const result = hslToRgb(hsl);

  return {
    r: Math.max(0, Math.min(255, result.r)),
    g: Math.max(0, Math.min(255, result.g)),
    b: Math.max(0, Math.min(255, result.b)),
  };
}

function applyAdvancedControls(color: RGB, controls: AdvancedControls): RGB {
  let result = { ...color };

  // Determine luminance zone (shadows, midtones, highlights)
  const luminance = Math.max(result.r, result.g, result.b) / 255;
  const isShadow = luminance < 0.33;
  const isHighlight = luminance > 0.66;
  const isMidtone = !isShadow && !isHighlight;

  // Apply zone-specific adjustments
  if (isShadow && controls.shadows) {
    result = applyZoneAdjustment(result, controls.shadows);
  } else if (isMidtone && controls.midtones) {
    result = applyZoneAdjustment(result, controls.midtones);
  } else if (isHighlight && controls.highlights) {
    result = applyZoneAdjustment(result, controls.highlights);
  }

  // Apply temperature and tint
  if (controls.temperature !== 0) {
    const temp = controls.temperature / 100;
    result.r = Math.max(0, Math.min(255, result.r + temp * 50));
    result.b = Math.max(0, Math.min(255, result.b - temp * 50));
  }

  if (controls.tint !== 0) {
    const tint = controls.tint / 100;
    result.g = Math.max(0, Math.min(255, result.g + tint * 30));
  }

  // Apply split toning
  if (controls.splitToning) {
    const balance = controls.splitToning.balance / 100;
    const shadowWeight = isShadow ? 1 : isHighlight ? 0 : 1 - balance;
    const highlightWeight = isHighlight ? 1 : isShadow ? 0 : balance;

    if (shadowWeight > 0) {
      const shadowColor = hexToRgb(controls.splitToning.shadowColor);
      result.r = Math.max(0, Math.min(255, result.r + (shadowColor.r - result.r) * shadowWeight * 0.2));
      result.g = Math.max(0, Math.min(255, result.g + (shadowColor.g - result.g) * shadowWeight * 0.2));
      result.b = Math.max(0, Math.min(255, result.b + (shadowColor.b - result.b) * shadowWeight * 0.2));
    }

    if (highlightWeight > 0) {
      const highlightColor = hexToRgb(controls.splitToning.highlightColor);
      result.r = Math.max(0, Math.min(255, result.r + (highlightColor.r - result.r) * highlightWeight * 0.2));
      result.g = Math.max(0, Math.min(255, result.g + (highlightColor.g - result.g) * highlightWeight * 0.2));
      result.b = Math.max(0, Math.min(255, result.b + (highlightColor.b - result.b) * highlightWeight * 0.2));
    }
  }

  return result;
}

function applyZoneAdjustment(
  color: RGB,
  adjustment: { brightness: number; saturation: number; hue: number }
): RGB {
  const hsl = rgbToHsl(color);

  // Apply brightness
  hsl.l = Math.max(0, Math.min(1, hsl.l + adjustment.brightness / 100));

  // Apply saturation
  hsl.s = Math.max(0, Math.min(1, hsl.s + adjustment.saturation / 100));

  // Apply hue shift
  hsl.h = (hsl.h + adjustment.hue) % 360;
  if (hsl.h < 0) hsl.h += 360;

  return hslToRgb(hsl);
}

function generateCubeLUT(lutMap: LUTPoint[], gridSize: number, precision: string = "10"): string {
  // DaVinci Resolve compatible .cube format with proper headers
  const timestamp = new Date().toISOString();
  
  // Grid size quality guide (per professional standards)
  const qualityLevel = gridSize <= 17 ? "Preview/Proxy" : gridSize <= 33 ? "Production" : "Master Quality";
  
  let lut = `# Created by CHROMA - Professional Cinema-Grade LUT
# Generated: ${timestamp}
# Precision: ${precision}-bit
# Grid Size: ${gridSize}x${gridSize}x${gridSize} (${qualityLevel})
#
# INPUT REQUIREMENTS (CRITICAL - "Garbage In, Garbage Out"):
# - Color Space: sRGB (Rec.709 primaries, D65 white point)
# - Transfer Function: sRGB gamma (~2.2)
# - Data Range: 0.0 - 1.0 (normalized)
# - Bit Depth: 8-bit minimum, 10-bit+ recommended
#
# DO NOT use with Log footage (Arri LogC, Sony S-Log, RED Log, etc.)
# DO NOT use with wide-gamut sources without conversion to sRGB first
#
# Color Science Pipeline:
# - Perceptual Lab color space transformations
# - Filmic tone curves (John Hable)
# - K-means based color clustering
# - Skin tone protection (Lab distance-based)
# - Hue-preserving gamut compression
# - Chromatic adaptation white balance
#
LUT_3D_SIZE ${gridSize}
DOMAIN_MIN 0.0 0.0 0.0
DOMAIN_MAX 1.0 1.0 1.0

`;

  // Blue-fastest order: already arranged in lutMap
  for (const color of lutMap) {
    const rNorm = color.r.toFixed(6);
    const gNorm = color.g.toFixed(6);
    const bNorm = color.b.toFixed(6);
    
    lut += `${rNorm} ${gNorm} ${bNorm}\n`;
  }

  return lut;
}

function generate3dlLUT(lutMap: LUTPoint[], gridSize: number, precision: string = "10"): string {
  // Autodesk/Lustre .3dl format - CRITICAL: Must use 12-bit integers (0-4095)
  const timestamp = new Date().toISOString();
  const qualityLevel = gridSize <= 17 ? "Preview/Proxy" : gridSize <= 33 ? "Production" : "Master Quality";
  
  let lut = `# Created by CHROMA - Professional Cinema-Grade LUT
# Generated: ${timestamp}
# Format: Autodesk .3dl (Flame, Lustre, Smoke)
# Precision: 12-bit integers (0-4095) - REQUIRED for .3dl format
# Grid Size: ${gridSize}x${gridSize}x${gridSize} (${qualityLevel})
#
# INPUT REQUIREMENTS (CRITICAL):
# - Color Space: sRGB (Rec.709 primaries, D65 white point)
# - Transfer Function: sRGB gamma (~2.2)
# - Data Range: 0.0 - 1.0 (normalized)
# - DO NOT use with Log footage or wide-gamut sources
#
# Color Science Pipeline:
# - Perceptual Lab color space transformations
# - Filmic tone curves (John Hable)
# - K-means based color clustering
# - Skin tone protection (Lab distance-based)
# - Hue-preserving gamut compression
# - Chromatic adaptation white balance
#
3DMESH
Mesh ${gridSize} ${gridSize} ${gridSize}

`;

  // Blue-fastest order: already arranged in lutMap
  // .3dl format REQUIRES 12-bit integers (0-4095), not floats or 8-bit
  for (const color of lutMap) {
    const rInt = Math.round(Math.max(0, Math.min(1, color.r)) * 4095);
    const gInt = Math.round(Math.max(0, Math.min(1, color.g)) * 4095);
    const bInt = Math.round(Math.max(0, Math.min(1, color.b)) * 4095);
    
    lut += `${rInt} ${gInt} ${bInt}\n`;
  }

  return lut;
}

function generate1dLUT(lutMap: LUTPoint[], gridSize: number, precision: string = "10"): string {
  // 1D LUT format - separate curves for R, G, B channels
  const timestamp = new Date().toISOString();
  const qualityLevel = gridSize <= 17 ? "Preview/Proxy" : gridSize <= 33 ? "Production" : "Master Quality";
  
  // Determine entries per channel based on precision
  let entriesPerChannel = 256; // 8-bit
  if (precision === "10") entriesPerChannel = 1024; // 10-bit
  if (precision === "12") entriesPerChannel = 4096; // 12-bit
  
  let lut = `# Created by CHROMA - Professional Cinema-Grade LUT
# Generated: ${timestamp}
# Format: 1D LUT (${entriesPerChannel} entries per channel)
# Precision: ${precision}-bit
# Source Grid: ${gridSize}x${gridSize}x${gridSize} (${qualityLevel})
#
# INPUT REQUIREMENTS (CRITICAL):
# - Color Space: sRGB (Rec.709 primaries, D65 white point)
# - Transfer Function: sRGB gamma (~2.2)
# - Data Range: 0.0 - 1.0 (normalized)
# - DO NOT use with Log footage or wide-gamut sources
#
# Color Science Pipeline:
# - Perceptual Lab color space transformations
# - Filmic tone curves (John Hable)
# - K-means based color clustering
# - Skin tone protection (Lab distance-based)
# - Hue-preserving gamut compression
# - Chromatic adaptation white balance
#

`;

  // Generate 1D lookup table by sampling the 3D LUT along the neutral axis
  // For each input value, we sample the 3D LUT at (value, value, value)
  for (let i = 0; i < entriesPerChannel; i++) {
    const inputValue = i / (entriesPerChannel - 1);
    
    // Map to 3D grid position
    const gridPos = inputValue * (gridSize - 1);
    const gridIdx = Math.round(gridPos);
    
    // Calculate index in blue-fastest order: b * gridSize² + g * gridSize + r
    const lutIdx = gridIdx * gridSize * gridSize + gridIdx * gridSize + gridIdx;
    const color = lutMap[lutIdx] || {
      r: inputValue,
      g: inputValue,
      b: inputValue,
    };
    
    const rNorm = color.r.toFixed(6);
    const gNorm = color.g.toFixed(6);
    const bNorm = color.b.toFixed(6);
    
    lut += `${rNorm} ${gNorm} ${bNorm}\n`;
  }

  return lut;
}

// Apply LUT to image for preview
export async function applyLUTToImage(
  imageBuffer: Buffer,
  lutMap: Map<string, RGB>,
  gridSize: number,
  intensity: number
): Promise<Buffer> {
  // Single-pass decode with security limits
  const { data, info } = await sharp(imageBuffer, {
    failOn: 'none',
    limitInputPixels: 268402689, // Max 16384x16384 pixels
  })
    .toColorspace('srgb') // Ensure consistent color space
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const processedData = Buffer.from(data);

  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const rIdx = Math.round((r / 255) * (gridSize - 1));
    const gIdx = Math.round((g / 255) * (gridSize - 1));
    const bIdx = Math.round((b / 255) * (gridSize - 1));

    const key = `${rIdx},${gIdx},${bIdx}`;
    const transformed = lutMap.get(key) || { r, g, b };

    processedData[i] = Math.round(r + (transformed.r - r) * (intensity / 100));
    processedData[i + 1] = Math.round(g + (transformed.g - g) * (intensity / 100));
    processedData[i + 2] = Math.round(b + (transformed.b - b) * (intensity / 100));
  }

  return sharp(processedData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .jpeg()
    .toBuffer();
}

// Get cached or generate LUT map
export async function getLUTMap(
  imageBuffer: Buffer,
  gridSize: number,
  advancedControls?: AdvancedControls
): Promise<Map<string, RGB>> {
  const transform = await deriveColorTransform(imageBuffer);
  return buildLUTFromTransform(transform, gridSize, 1.0, advancedControls);
}
