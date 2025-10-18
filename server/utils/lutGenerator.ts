import sharp from "sharp";
import type { AdvancedControls } from "@shared/schema";

interface RGB {
  r: number;
  g: number;
  b: number;
}

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

// Fast LUT generation with optional advanced controls
export async function generateLUT(
  imageBuffer: Buffer,
  gridSize: number,
  intensity: number,
  format: "cube" | "3dl",
  advancedControls?: AdvancedControls,
  precision: string = "10"
): Promise<string> {
  const transform = await deriveColorTransform(imageBuffer);
  const lutMap = buildLUTFromTransform(
    transform,
    gridSize,
    intensity / 100,
    advancedControls
  );

  if (format === "cube") {
    return generateCubeLUT(lutMap, gridSize, precision);
  } else {
    return generate3dlLUT(lutMap, gridSize, precision);
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
  const image = sharp(imageBuffer);
  const { data, info } = await image
    .resize(200, 200, { fit: "inside" })
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

function generateCubeLUT(colorMap: Map<string, RGB>, gridSize: number, precision: string = "10"): string {
  // DaVinci Resolve compatible .cube format with proper headers
  const timestamp = new Date().toISOString();
  let lut = `# Created by LUT Maker
# Generated: ${timestamp}
# Precision: ${precision}-bit
# LUT 3D size
LUT_3D_SIZE ${gridSize}
# Domain
DOMAIN_MIN 0.0 0.0 0.0
DOMAIN_MAX 1.0 1.0 1.0

`;

  // Blue-fastest order: R (slowest) -> G (middle) -> B (fastest)
  for (let r = 0; r < gridSize; r++) {
    for (let g = 0; g < gridSize; g++) {
      for (let b = 0; b < gridSize; b++) {
        const key = `${r},${g},${b}`;
        const color = colorMap.get(key) || {
          r: (r / (gridSize - 1)) * 255,
          g: (g / (gridSize - 1)) * 255,
          b: (b / (gridSize - 1)) * 255,
        };

        const rNorm = (color.r / 255).toFixed(6);
        const gNorm = (color.g / 255).toFixed(6);
        const bNorm = (color.b / 255).toFixed(6);

        lut += `${rNorm} ${gNorm} ${bNorm}\n`;
      }
    }
  }

  return lut;
}

function generate3dlLUT(colorMap: Map<string, RGB>, gridSize: number, precision: string = "10"): string {
  // Autodesk/Lustre .3dl format with proper headers
  const timestamp = new Date().toISOString();
  let lut = `# Created by LUT Maker
# Generated: ${timestamp}
# Precision: ${precision}-bit
# Format: Autodesk Color Management 3D LUT
# Input: RGB
# Output: RGB
3DMESH
Mesh ${gridSize} ${gridSize} ${gridSize}

`;

  // Blue-fastest order: R (slowest) -> G (middle) -> B (fastest)
  for (let r = 0; r < gridSize; r++) {
    for (let g = 0; g < gridSize; g++) {
      for (let b = 0; b < gridSize; b++) {
        const key = `${r},${g},${b}`;
        const color = colorMap.get(key) || {
          r: (r / (gridSize - 1)) * 255,
          g: (g / (gridSize - 1)) * 255,
          b: (b / (gridSize - 1)) * 255,
        };

        const rInt = Math.round(color.r);
        const gInt = Math.round(color.g);
        const bInt = Math.round(color.b);

        lut += `${rInt} ${gInt} ${bInt}\n`;
      }
    }
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
  const image = sharp(imageBuffer);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

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
