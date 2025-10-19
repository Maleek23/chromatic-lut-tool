/**
 * Professional LUT Builder using Perceptual Color Science
 * 
 * Color Pipeline:
 * - sRGB → Lab (CIE L*a*b* perceptually uniform color space)
 * - Apply transformations in Lab space for perceptual accuracy
 * - Lab → sRGB with proper gamut compression
 * 
 * This approach is correct for image-to-LUT generation.
 * (ACEScg would be used for film emulation or camera workflows)
 */

import type { ColorAnalysis, RGB, Lab } from "./color-science";
import type { AdvancedControls } from "@shared/schema";
import {
  rgbToLab,
  labToRgb,
  labToLch,
  lchToLab,
  applyFilmicToneCurve,
  gamutMapToRec709,
  labDistance,
} from "./color-science";

export interface LUTPoint {
  r: number;
  g: number;
  b: number;
}

/**
 * Build 3D LUT from professional color analysis
 */
export function buildLUTFromColorScience(
  analysis: ColorAnalysis,
  gridSize: number,
  intensity: number,
  advancedControls?: AdvancedControls
): LUTPoint[] {
  const lutMap: LUTPoint[] = [];
  const step = 1.0 / (gridSize - 1);
  
  // Build LUT using blue-fastest indexing
  for (let b = 0; b < gridSize; b++) {
    for (let g = 0; g < gridSize; g++) {
      for (let r = 0; r < gridSize; r++) {
        const inputRGB: RGB = {
          r: r * step,
          g: g * step,
          b: b * step,
        };
        
        // Apply professional color transformations
        const transformedRGB = applyColorScience(inputRGB, analysis, intensity, advancedControls);
        
        lutMap.push(transformedRGB);
      }
    }
  }
  
  return lutMap;
}

/**
 * Apply professional color science transformations to a single RGB value
 */
function applyColorScience(
  inputRGB: RGB,
  analysis: ColorAnalysis,
  intensity: number,
  advancedControls?: AdvancedControls
): LUTPoint {
  // Convert to Lab for perceptual color space operations
  let lab = rgbToLab(inputRGB);
  
  // 1. Apply filmic tone curve
  const newL = applyFilmicToneCurve(lab.l / 100, analysis.toneCurve, intensity) * 100;
  lab.l = newL;
  
  // 2. Apply cluster-based color shifts
  lab = applyClusterColorShifts(lab, analysis, intensity);
  
  // 3. Skin tone protection
  lab = protectSkinTones(lab, analysis.skinTones, intensity);
  
  // 4. White balance adjustment
  if (Math.abs(analysis.whiteBalance.temperature) > 1 || Math.abs(analysis.whiteBalance.tint) > 1) {
    lab = applyWhiteBalance(lab, analysis.whiteBalance, intensity);
  }
  
  // 5. Exposure and contrast
  lab.l = applyExposureAndContrast(lab.l, analysis.exposure, analysis.contrast, intensity);
  
  // 6. Saturation in LCh space (perceptually uniform)
  if (Math.abs(analysis.saturation) > 0.01) {
    lab = applySaturation(lab, analysis.saturation, intensity);
  }
  
  // 7. Apply advanced controls if provided
  if (advancedControls) {
    lab = applyAdvancedControls(lab, advancedControls, intensity);
  }
  
  // Convert back to RGB
  let rgb = labToRgb(lab);
  
  // 8. Gamut mapping to Rec.709
  rgb = gamutMapToRec709(rgb);
  
  return rgb;
}

/**
 * Apply color shifts based on k-means clusters
 */
function applyClusterColorShifts(
  lab: Lab,
  analysis: ColorAnalysis,
  intensity: number
): Lab {
  if (analysis.clusters.length === 0) {
    return lab;
  }
  
  // Find closest cluster
  let minDist = Infinity;
  let closestCluster = analysis.clusters[0];
  
  for (const cluster of analysis.clusters) {
    const dist = labDistance(lab, cluster.center);
    if (dist < minDist) {
      minDist = dist;
      closestCluster = cluster;
    }
  }
  
  // Apply subtle shift towards cluster center (weighted by intensity and cluster weight)
  const shiftAmount = intensity * closestCluster.weight * 0.2;
  
  return {
    l: lab.l * (1 - shiftAmount) + closestCluster.center.l * shiftAmount,
    a: lab.a * (1 - shiftAmount) + closestCluster.center.a * shiftAmount,
    b: lab.b * (1 - shiftAmount) + closestCluster.center.b * shiftAmount,
  };
}

/**
 * Protect skin tones from aggressive grading
 * CRITICAL FIX: Previous implementation was a mathematical no-op
 */
function protectSkinTones(
  lab: Lab,
  skinTones: Lab[],
  intensity: number
): Lab {
  if (skinTones.length === 0 || intensity === 0) {
    return lab;
  }
  
  // Check if current color is close to any skin tone
  for (const skinTone of skinTones) {
    const dist = labDistance(lab, skinTone);
    
    // If within skin tone range, reduce the amount of grading applied
    if (dist < 15) { // 15 is typical skin tone distance threshold
      // Calculate protection factor (closer to skin tone = more protection)
      const protectionFactor = 1 - (dist / 15); // 0 = far from skin, 1 = exact skin tone
      const protectionStrength = protectionFactor * 0.7; // Protect up to 70%
      
      // Blend between fully graded version and original skin tone
      // High protection = keep closer to original skin tone
      return {
        l: lab.l * (1 - protectionStrength) + skinTone.l * protectionStrength,
        a: lab.a * (1 - protectionStrength) + skinTone.a * protectionStrength,
        b: lab.b * (1 - protectionStrength) + skinTone.b * protectionStrength,
      };
    }
  }
  
  return lab;
}

/**
 * Apply white balance correction
 */
function applyWhiteBalance(
  lab: Lab,
  whiteBalance: { temperature: number; tint: number },
  intensity: number
): Lab {
  const lch = labToLch(lab);
  
  // Temperature affects b* (blue-yellow)
  // Tint affects a* (green-magenta)
  const tempShift = whiteBalance.temperature * intensity * 0.1;
  const tintShift = whiteBalance.tint * intensity * 0.1;
  
  const newLab = lchToLab(lch);
  newLab.b += tempShift;
  newLab.a += tintShift;
  
  return newLab;
}

/**
 * Apply exposure and contrast adjustments
 */
function applyExposureAndContrast(
  l: number,
  exposure: number,
  contrast: number,
  intensity: number
): number {
  // Exposure: shift all luminance
  let newL = l + (exposure * 20 * intensity);
  
  // Contrast: pivot around middle gray (L=50)
  const pivot = 50;
  const contrastAdjust = 1 + (contrast * intensity * 0.5);
  newL = pivot + (newL - pivot) * contrastAdjust;
  
  // Clamp to valid range
  return Math.max(0, Math.min(100, newL));
}

/**
 * Apply saturation in perceptually uniform LCh space
 */
function applySaturation(
  lab: Lab,
  saturation: number,
  intensity: number
): Lab {
  const lch = labToLch(lab);
  
  // Adjust chroma (saturation in perceptual space)
  const saturationFactor = 1 + (saturation * intensity);
  lch.c *= saturationFactor;
  
  return lchToLab(lch);
}

/**
 * Apply advanced user controls (split toning, etc.)
 */
function applyAdvancedControls(
  lab: Lab,
  controls: AdvancedControls,
  intensity: number
): Lab {
  const lch = labToLch(lab);
  
  // Split toning: different colors for shadows and highlights
  if (controls.splitToning) {
    const isHighlight = lab.l > 60;
    const isShadow = lab.l < 40;
    
    if (isShadow && controls.splitToning.shadowColor !== "#000000") {
      // Apply shadow toning
      const shadowLab = hexToLab(controls.splitToning.shadowColor);
      const blend = intensity * 0.3;
      
      lab.a = lab.a * (1 - blend) + shadowLab.a * blend;
      lab.b = lab.b * (1 - blend) + shadowLab.b * blend;
    }
    
    if (isHighlight && controls.splitToning.highlightColor !== "#ffffff") {
      // Apply highlight toning
      const highlightLab = hexToLab(controls.splitToning.highlightColor);
      const blend = intensity * 0.3;
      
      lab.a = lab.a * (1 - blend) + highlightLab.a * blend;
      lab.b = lab.b * (1 - blend) + highlightLab.b * blend;
    }
  }
  
  // Color temperature adjustment
  if (controls.temperature && controls.temperature !== 0) {
    lab.b += controls.temperature * intensity * 0.5;
  }
  
  // Tint adjustment
  if (controls.tint && controls.tint !== 0) {
    lab.a += controls.tint * intensity * 0.5;
  }
  
  return lab;
}

/**
 * Convert hex color to Lab
 */
function hexToLab(hex: string): Lab {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { l: 50, a: 0, b: 0 };
  }
  
  const rgb: RGB = {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
  
  return rgbToLab(rgb);
}
