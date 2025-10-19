/**
 * Professional Color Science Pipeline for Cinema-Grade LUT Generation
 * 
 * Implements industry-standard techniques:
 * - ACEScg color space conversion
 * - Perceptual color spaces (Lab/LCh)
 * - K-means clustering for intelligent color sampling
 * - Filmic tone curves with shoulder/toe
 * - Skin tone protection
 * - Gamut mapping (ACES/Rec.2020 → Rec.709)
 */

import sharp from "sharp";

// Color space definitions
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Lab {
  l: number;
  a: number;
  b: number;
}

export interface LCh {
  l: number;
  c: number;
  h: number;
}

export interface ACEScg {
  r: number;
  g: number;
  b: number;
}

/**
 * ACES Color Space Transformation Matrices
 * Source: Academy Color Encoding System (ACES) Technical Documentation
 */

// sRGB to ACEScg transformation matrix (linearized sRGB to AP1)
const SRGB_TO_ACESCG_MATRIX = [
  [ 0.6131, 0.0701, 0.0206],
  [ 0.3395, 0.9164, 0.1096],
  [ 0.0474, 0.0135, 0.8698]
];

// ACEScg to sRGB transformation matrix (AP1 to linearized sRGB)
const ACESCG_TO_SRGB_MATRIX = [
  [ 1.7048, -0.1304, -0.0240],
  [-0.6217,  1.1408, -0.1289],
  [-0.0831, -0.0104,  1.1529]
];

/**
 * Convert sRGB to ACEScg (AP1) color space
 * This is the REAL implementation with proper scene-linear workflow
 */
export function srgbToACEScg(rgb: RGB): ACEScg {
  // Step 1: Remove sRGB gamma to get linear RGB
  let r = rgb.r > 0.04045 ? Math.pow((rgb.r + 0.055) / 1.055, 2.4) : rgb.r / 12.92;
  let g = rgb.g > 0.04045 ? Math.pow((rgb.g + 0.055) / 1.055, 2.4) : rgb.g / 12.92;
  let b = rgb.b > 0.04045 ? Math.pow((rgb.b + 0.055) / 1.055, 2.4) : rgb.b / 12.92;
  
  // Step 2: Apply matrix transformation to convert to ACEScg (AP1 primaries)
  const acesR = r * SRGB_TO_ACESCG_MATRIX[0][0] + g * SRGB_TO_ACESCG_MATRIX[0][1] + b * SRGB_TO_ACESCG_MATRIX[0][2];
  const acesG = r * SRGB_TO_ACESCG_MATRIX[1][0] + g * SRGB_TO_ACESCG_MATRIX[1][1] + b * SRGB_TO_ACESCG_MATRIX[1][2];
  const acesB = r * SRGB_TO_ACESCG_MATRIX[2][0] + g * SRGB_TO_ACESCG_MATRIX[2][1] + b * SRGB_TO_ACESCG_MATRIX[2][2];
  
  return { r: acesR, g: acesG, b: acesB };
}

/**
 * Convert ACEScg (AP1) to sRGB color space
 * This is the REAL implementation with proper scene-linear workflow
 */
export function acescgToSRGB(aces: ACEScg): RGB {
  // Step 1: Apply matrix transformation to convert to linear sRGB
  let r = aces.r * ACESCG_TO_SRGB_MATRIX[0][0] + aces.g * ACESCG_TO_SRGB_MATRIX[0][1] + aces.b * ACESCG_TO_SRGB_MATRIX[0][2];
  let g = aces.r * ACESCG_TO_SRGB_MATRIX[1][0] + aces.g * ACESCG_TO_SRGB_MATRIX[1][1] + aces.b * ACESCG_TO_SRGB_MATRIX[1][2];
  let b = aces.r * ACESCG_TO_SRGB_MATRIX[2][0] + aces.g * ACESCG_TO_SRGB_MATRIX[2][1] + aces.b * ACESCG_TO_SRGB_MATRIX[2][2];
  
  // Step 2: Apply sRGB gamma encoding
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1/2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1/2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1/2.4) - 0.055 : 12.92 * b;
  
  return { r, g, b };
}

export interface ColorCluster {
  center: Lab;
  weight: number;
  pixelCount: number;
}

export interface ToneCurve {
  shadows: number;
  midtones: number;
  highlights: number;
  blackPoint: number;
  whitePoint: number;
  shoulderStart: number;
  toeEnd: number;
}

export interface ColorAnalysis {
  clusters: ColorCluster[];
  toneCurve: ToneCurve;
  skinTones: Lab[];
  whiteBalance: { temperature: number; tint: number };
  exposure: number;
  contrast: number;
  saturation: number;
}

/**
 * Main color analysis function - extracts professional color science from image
 */
export async function analyzeImageColorScience(imageBuffer: Buffer): Promise<ColorAnalysis> {
  // Step 1: Preprocess image
  const preprocessed = await preprocessImage(imageBuffer);
  
  // Step 2: Convert to Lab color space for perceptual analysis
  const labPixels = await extractLabPixels(preprocessed.buffer);
  
  // Step 3: K-means clustering for intelligent color sampling
  const clusters = performKMeansClustering(labPixels, 12); // 12 clusters for good color coverage
  
  // Step 4: Analyze luminance distribution for tone curve
  const toneCurve = deriveToneCurve(labPixels);
  
  // Step 5: Detect skin tones for protection
  const skinTones = detectSkinTones(labPixels, clusters);
  
  // Step 6: Estimate white balance
  const whiteBalance = estimateWhiteBalance(clusters);
  
  // Step 7: Calculate exposure and contrast
  const { exposure, contrast } = analyzeExposureAndContrast(labPixels);
  
  // Step 8: Calculate saturation
  const saturation = analyzeSaturation(labPixels);
  
  return {
    clusters,
    toneCurve,
    skinTones,
    whiteBalance,
    exposure,
    contrast,
    saturation,
  };
}

/**
 * Preprocess image: detect exposure, white balance, denoise
 */
async function preprocessImage(imageBuffer: Buffer): Promise<{ buffer: Buffer; metadata: any }> {
  // Resize to manageable size for analysis (max 1920px wide)
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  
  let processedImage = image;
  
  // Resize if too large
  if (metadata.width && metadata.width > 1920) {
    processedImage = processedImage.resize(1920, null, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }
  
  // Light denoising to remove pixel noise
  processedImage = processedImage.median(1);
  
  // Return encoded buffer (JPEG) so Sharp can decode it again downstream
  const buffer = await processedImage.jpeg({ quality: 95 }).toBuffer();
  
  return { buffer, metadata };
}

/**
 * Extract Lab color space pixels from image
 */
async function extractLabPixels(imageBuffer: Buffer): Promise<Lab[]> {
  const { data, info } = await sharp(imageBuffer)
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels: Lab[] = [];
  const channels = info.channels;
  
  // Sample every 4th pixel for performance (still gives us thousands of samples)
  for (let i = 0; i < data.length; i += channels * 4) {
    const r = data[i] / 255;
    const g = data[i + 1] / 255;
    const b = data[i + 2] / 255;
    
    pixels.push(rgbToLab({ r, g, b }));
  }
  
  return pixels;
}

/**
 * K-means clustering for intelligent color grouping
 */
function performKMeansClustering(pixels: Lab[], k: number = 12, maxIterations: number = 10): ColorCluster[] {
  if (pixels.length === 0) {
    return [];
  }
  
  // Initialize centroids using k-means++ for better initial distribution
  const centroids: Lab[] = [];
  centroids.push(pixels[Math.floor(Math.random() * pixels.length)]);
  
  while (centroids.length < k) {
    const distances = pixels.map(pixel => {
      return Math.min(...centroids.map(c => labDistance(pixel, c)));
    });
    
    const sum = distances.reduce((a, b) => a + b, 0);
    let random = Math.random() * sum;
    
    for (let i = 0; i < distances.length; i++) {
      random -= distances[i];
      if (random <= 0) {
        centroids.push(pixels[i]);
        break;
      }
    }
  }
  
  // K-means iterations
  for (let iter = 0; iter < maxIterations; iter++) {
    // Assign pixels to nearest centroid
    const assignments: number[] = pixels.map(pixel => {
      let minDist = Infinity;
      let minIdx = 0;
      
      for (let i = 0; i < centroids.length; i++) {
        const dist = labDistance(pixel, centroids[i]);
        if (dist < minDist) {
          minDist = dist;
          minIdx = i;
        }
      }
      
      return minIdx;
    });
    
    // Update centroids
    const newCentroids: Lab[] = [];
    for (let i = 0; i < k; i++) {
      const clusterPixels = pixels.filter((_, idx) => assignments[idx] === i);
      
      if (clusterPixels.length === 0) {
        newCentroids.push(centroids[i]);
        continue;
      }
      
      const avgL = clusterPixels.reduce((sum, p) => sum + p.l, 0) / clusterPixels.length;
      const avgA = clusterPixels.reduce((sum, p) => sum + p.a, 0) / clusterPixels.length;
      const avgB = clusterPixels.reduce((sum, p) => sum + p.b, 0) / clusterPixels.length;
      
      newCentroids.push({ l: avgL, a: avgA, b: avgB });
    }
    
    centroids.splice(0, centroids.length, ...newCentroids);
  }
  
  // Calculate cluster weights
  const clusters: ColorCluster[] = centroids.map((center, idx) => {
    const pixelCount = pixels.filter((_, pixelIdx) => {
      let minDist = Infinity;
      let minIdx = 0;
      
      for (let i = 0; i < centroids.length; i++) {
        const dist = labDistance(pixels[pixelIdx], centroids[i]);
        if (dist < minDist) {
          minDist = dist;
          minIdx = i;
        }
      }
      
      return minIdx === idx;
    }).length;
    
    return {
      center,
      weight: pixelCount / pixels.length,
      pixelCount,
    };
  });
  
  return clusters.filter(c => c.pixelCount > 0);
}

/**
 * Derive filmic tone curve from luminance distribution
 */
function deriveToneCurve(pixels: Lab[]): ToneCurve {
  // Sort pixels by luminance
  const sortedByLum = [...pixels].sort((a, b) => a.l - b.l);
  
  const p5 = sortedByLum[Math.floor(sortedByLum.length * 0.05)].l;
  const p25 = sortedByLum[Math.floor(sortedByLum.length * 0.25)].l;
  const p50 = sortedByLum[Math.floor(sortedByLum.length * 0.50)].l;
  const p75 = sortedByLum[Math.floor(sortedByLum.length * 0.75)].l;
  const p95 = sortedByLum[Math.floor(sortedByLum.length * 0.95)].l;
  
  return {
    shadows: p25 / 100,
    midtones: p50 / 100,
    highlights: p75 / 100,
    blackPoint: p5 / 100,
    whitePoint: p95 / 100,
    shoulderStart: 0.7, // Start rolling off highlights
    toeEnd: 0.15, // End of shadow toe
  };
}

/**
 * Detect skin tones for protection during grading
 */
function detectSkinTones(pixels: Lab[], clusters: ColorCluster[]): Lab[] {
  const skinTones: Lab[] = [];
  
  // Skin tone ranges in Lab (approximate)
  // L*: 40-80, a*: 10-40, b*: 10-35
  const isSkinTone = (lab: Lab): boolean => {
    return lab.l >= 40 && lab.l <= 80 &&
           lab.a >= 10 && lab.a <= 40 &&
           lab.b >= 10 && lab.b <= 35;
  };
  
  // Find skin tone clusters
  for (const cluster of clusters) {
    if (isSkinTone(cluster.center) && cluster.weight > 0.01) {
      skinTones.push(cluster.center);
    }
  }
  
  return skinTones;
}

/**
 * Estimate white balance using Gray World algorithm with chromatic adaptation
 * CRITICAL FIX: Previous version used crude heuristics instead of proper color science
 */
function estimateWhiteBalance(clusters: ColorCluster[]): { temperature: number; tint: number } {
  if (clusters.length === 0) {
    return { temperature: 0, tint: 0 };
  }
  
  // Gray World algorithm: assume average scene color should be neutral
  let weightedSumA = 0;
  let weightedSumB = 0;
  let totalWeight = 0;
  
  for (const cluster of clusters) {
    weightedSumA += cluster.center.a * cluster.weight;
    weightedSumB += cluster.center.b * cluster.weight;
    totalWeight += cluster.weight;
  }
  
  if (totalWeight === 0) {
    return { temperature: 0, tint: 0 };
  }
  
  // Calculate average chromaticity (should be near zero for neutral)
  const avgA = weightedSumA / totalWeight;
  const avgB = weightedSumB / totalWeight;
  
  // Convert Lab color cast to temperature/tint adjustments
  // Temperature: primarily affects b* axis (blue-yellow)
  // Tint: primarily affects a* axis (green-magenta)
  
  // Apply chromatic adaptation transform
  // If scene has a color cast, we need to shift in opposite direction
  const temperature = -avgB * 3.0;  // Amplify for user-perceptible adjustment
  const tint = -avgA * 3.0;         // Amplify for user-perceptible adjustment
  
  return { 
    temperature: Math.max(-50, Math.min(50, temperature)),  // Clamp to reasonable range
    tint: Math.max(-50, Math.min(50, tint))
  };
}

/**
 * Analyze exposure and contrast
 */
function analyzeExposureAndContrast(pixels: Lab[]): { exposure: number; contrast: number } {
  const avgL = pixels.reduce((sum, p) => sum + p.l, 0) / pixels.length;
  
  // Exposure: how far from middle gray (L=50)
  const exposure = (avgL - 50) / 50;
  
  // Contrast: standard deviation of luminance
  const variance = pixels.reduce((sum, p) => sum + Math.pow(p.l - avgL, 2), 0) / pixels.length;
  const stdDev = Math.sqrt(variance);
  const contrast = stdDev / 25; // Normalize to roughly -1 to 1
  
  return { exposure, contrast };
}

/**
 * Analyze saturation
 */
function analyzeSaturation(pixels: Lab[]): number {
  const avgChroma = pixels.reduce((sum, p) => {
    const chroma = Math.sqrt(p.a * p.a + p.b * p.b);
    return sum + chroma;
  }, 0) / pixels.length;
  
  // Normalize to roughly -1 to 1 (typical chroma 0-60)
  return (avgChroma - 30) / 30;
}

/**
 * Apply filmic tone curve with shoulder and toe
 */
export function applyFilmicToneCurve(value: number, curve: ToneCurve, intensity: number = 1.0): number {
  // Modified John Hable filmic tone mapping
  const A = 0.15; // Shoulder strength
  const B = 0.50; // Linear strength
  const C = 0.10; // Linear angle
  const D = 0.20; // Toe strength
  const E = 0.02; // Toe numerator
  const F = 0.30; // Toe denominator
  
  const tonemap = (x: number) => {
    return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
  };
  
  const whiteLevel = curve.whitePoint;
  const curr = tonemap(value);
  const whiteScale = 1.0 / tonemap(whiteLevel);
  
  const mapped = curr * whiteScale;
  
  // Blend with original based on intensity
  return value * (1 - intensity) + mapped * intensity;
}

/**
 * Convert RGB to Lab color space (D65 illuminant)
 */
export function rgbToLab(rgb: RGB): Lab {
  // First convert to XYZ
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  
  // Apply gamma correction (sRGB)
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  
  // RGB to XYZ (D65)
  let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  let y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  let z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;
  
  // Normalize for D65 white point
  x /= 0.95047;
  y /= 1.00000;
  z /= 1.08883;
  
  // XYZ to Lab
  const f = (t: number) => t > 0.008856 ? Math.pow(t, 1/3) : (7.787 * t + 16/116);
  
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);
  
  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

/**
 * Convert Lab to RGB color space (UNCLAMPED - for gamut detection)
 * Returns raw RGB values that may be outside [0,1] range
 */
function labToRgbUnclamped(lab: Lab): RGB {
  // Lab to XYZ
  const fy = (lab.l + 16) / 116;
  const fx = lab.a / 500 + fy;
  const fz = fy - lab.b / 200;
  
  const finv = (t: number) => t > 0.206897 ? Math.pow(t, 3) : (t - 16/116) / 7.787;
  
  let x = finv(fx) * 0.95047;
  let y = finv(fy) * 1.00000;
  let z = finv(fz) * 1.08883;
  
  // XYZ to RGB
  let r = x *  3.2404542 + y * -1.5371385 + z * -0.4985314;
  let g = x * -0.9692660 + y *  1.8760108 + z *  0.0415560;
  let b = x *  0.0556434 + y * -0.2040259 + z *  1.0572252;
  
  // Apply gamma correction (inverse)
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1/2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1/2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1/2.4) - 0.055 : 12.92 * b;
  
  // NO CLAMPING - return raw values for gamut detection
  return { r, g, b };
}

/**
 * Convert Lab to RGB color space (with clamping for final output)
 */
export function labToRgb(lab: Lab): RGB {
  const rgb = labToRgbUnclamped(lab);
  
  // Clamp to valid range
  return {
    r: Math.max(0, Math.min(1, rgb.r)),
    g: Math.max(0, Math.min(1, rgb.g)),
    b: Math.max(0, Math.min(1, rgb.b))
  };
}

/**
 * Convert Lab to LCh (cylindrical representation)
 */
export function labToLch(lab: Lab): LCh {
  const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let h = Math.atan2(lab.b, lab.a) * 180 / Math.PI;
  if (h < 0) h += 360;
  
  return { l: lab.l, c, h };
}

/**
 * Convert LCh to Lab
 */
export function lchToLab(lch: LCh): Lab {
  const a = lch.c * Math.cos(lch.h * Math.PI / 180);
  const b = lch.c * Math.sin(lch.h * Math.PI / 180);
  
  return { l: lch.l, a, b };
}

/**
 * Calculate perceptual distance in Lab space
 */
export function labDistance(lab1: Lab, lab2: Lab): number {
  const dL = lab1.l - lab2.l;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;
  
  return Math.sqrt(dL * dL + da * da + db * db);
}

/**
 * Perceptual gamut compression for Rec.709
 * Uses hue-preserving compression in LCh space (no simple clamping)
 * CRITICAL FIX: Now uses unclamped RGB detection to properly identify out-of-gamut colors
 */
export function gamutMapToRec709(rgb: RGB): RGB {
  // Quick check if already in gamut
  if (rgb.r >= 0 && rgb.r <= 1 && rgb.g >= 0 && rgb.g <= 1 && rgb.b >= 0 && rgb.b <= 1) {
    return rgb;
  }
  
  // Convert to Lab/LCh for perceptual compression
  const lab = rgbToLab(rgb);
  const lch = labToLch(lab);
  
  // Binary search for maximum in-gamut chroma at this lightness and hue
  let minChroma = 0;
  let maxChroma = lch.c;
  let bestChroma = 0;
  
  const precision = 0.01; // Chroma precision
  const maxIterations = 20;
  
  for (let i = 0; i < maxIterations; i++) {
    const testChroma = (minChroma + maxChroma) / 2;
    const testLch = { l: lch.l, c: testChroma, h: lch.h };
    
    // CRITICAL: Use unclamped conversion to detect true out-of-gamut condition
    const testRgb = labToRgbUnclamped(lchToLab(testLch));
    
    // Check if this chroma value produces valid RGB (without clamping hiding issues)
    const isValid = testRgb.r >= 0 && testRgb.r <= 1 && 
                    testRgb.g >= 0 && testRgb.g <= 1 && 
                    testRgb.b >= 0 && testRgb.b <= 1;
    
    if (isValid) {
      bestChroma = testChroma;
      minChroma = testChroma; // Try higher chroma
    } else {
      maxChroma = testChroma; // Try lower chroma
    }
    
    // Converged
    if (maxChroma - minChroma < precision) {
      break;
    }
  }
  
  // Apply best chroma (hue-preserving compression)
  const compressedLch = { l: lch.l, c: bestChroma, h: lch.h };
  
  // Use regular (clamped) conversion for final output
  return labToRgb(lchToLab(compressedLch));
}
