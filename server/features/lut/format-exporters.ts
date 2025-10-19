/**
 * Additional LUT format exporters for Creator+ tiers
 * Supports .look (Autodesk/Nuke) and .xmp (Adobe Lightroom) formats
 */

interface LUTPoint {
  r: number;
  g: number;
  b: number;
}

/**
 * Generate .look format (Autodesk/Nuke LUT)
 * Used in Nuke, Flame, and other Autodesk products
 * Spec-compliant with required metadata blocks
 */
export function generateLookLUT(lutMap: LUTPoint[], gridSize: number, precision: string = "10"): string {
  const precisionValue = parseInt(precision);
  const timestamp = new Date().toISOString();
  const qualityLevel = gridSize <= 17 ? "Preview/Proxy" : gridSize <= 33 ? "Production" : "Master Quality";
  
  // Autodesk .look format requires proper metadata blocks
  let lookContent = `# Created by CHROMA - Professional Cinema-Grade LUT
# Generated: ${timestamp}
# Format: Autodesk/Nuke .look (Nuke, Flame, Lustre)
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
Version 1
From 0.0 1.0
Length ${gridSize * gridSize * gridSize}
Components 3
{
`;

  // Blue-fastest order (matches Nuke/Autodesk spec)
  for (const point of lutMap) {
    const r = point.r.toFixed(precisionValue);
    const g = point.g.toFixed(precisionValue);
    const b = point.b.toFixed(precisionValue);
    lookContent += `  ${r} ${g} ${b}\n`;
  }

  lookContent += "}\n";
  
  return lookContent;
}

/**
 * Generate .xmp format (Adobe Lightroom Preset)
 * Creates a Lightroom-compatible preset with tone curve and color adjustments
 */
export function generateXmpPreset(
  lutMap: LUTPoint[],
  gridSize: number,
  metadata?: {
    name?: string;
    description?: string;
  }
): string {
  // Analyze the LUT to extract tone curve and color adjustments
  const analysis = analyzeLUTForXmp(lutMap, gridSize);
  
  const presetName = metadata?.name || "CHROMA Color Grade";
  const description = metadata?.description || "Professional color grade generated from reference image";
  
  // Create XMP preset with extracted adjustments
  const xmpContent = `<?xml version="1.0" encoding="UTF-8"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c140 79.160451, 2017/05/06-01:08:21">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
      xmlns:dc="http://purl.org/dc/elements/1.1/">
      
      <!-- Preset Metadata -->
      <dc:title>
        <rdf:Alt>
          <rdf:li xml:lang="x-default">${escapeXml(presetName)}</rdf:li>
        </rdf:Alt>
      </dc:title>
      <dc:description>
        <rdf:Alt>
          <rdf:li xml:lang="x-default">${escapeXml(description)}</rdf:li>
        </rdf:Alt>
      </dc:description>
      
      <!-- Camera Raw Settings -->
      <crs:Version>11.0</crs:Version>
      <crs:ProcessVersion>11.0</crs:ProcessVersion>
      
      <!-- Tone Curve Adjustments -->
      <crs:Exposure2012>${analysis.exposure.toFixed(2)}</crs:Exposure2012>
      <crs:Contrast2012>${analysis.contrast.toFixed(0)}</crs:Contrast2012>
      <crs:Highlights2012>${analysis.highlights.toFixed(0)}</crs:Highlights2012>
      <crs:Shadows2012>${analysis.shadows.toFixed(0)}</crs:Shadows2012>
      <crs:Whites2012>${analysis.whites.toFixed(0)}</crs:Whites2012>
      <crs:Blacks2012>${analysis.blacks.toFixed(0)}</crs:Blacks2012>
      
      <!-- Color Adjustments -->
      <crs:Saturation>${analysis.saturation.toFixed(0)}</crs:Saturation>
      <crs:Vibrance>${analysis.vibrance.toFixed(0)}</crs:Vibrance>
      
      <!-- Temperature and Tint -->
      <crs:Temperature>${analysis.temperature.toFixed(0)}</crs:Temperature>
      <crs:Tint>${analysis.tint.toFixed(0)}</crs:Tint>
      
      <!-- HSL Adjustments -->
      <crs:HueAdjustmentRed>${analysis.hsl.red.hue.toFixed(0)}</crs:HueAdjustmentRed>
      <crs:HueAdjustmentOrange>${analysis.hsl.orange.hue.toFixed(0)}</crs:HueAdjustmentOrange>
      <crs:HueAdjustmentYellow>${analysis.hsl.yellow.hue.toFixed(0)}</crs:HueAdjustmentYellow>
      <crs:HueAdjustmentGreen>${analysis.hsl.green.hue.toFixed(0)}</crs:HueAdjustmentGreen>
      <crs:HueAdjustmentAqua>${analysis.hsl.aqua.hue.toFixed(0)}</crs:HueAdjustmentAqua>
      <crs:HueAdjustmentBlue>${analysis.hsl.blue.hue.toFixed(0)}</crs:HueAdjustmentBlue>
      <crs:HueAdjustmentPurple>${analysis.hsl.purple.hue.toFixed(0)}</crs:HueAdjustmentPurple>
      <crs:HueAdjustmentMagenta>${analysis.hsl.magenta.hue.toFixed(0)}</crs:HueAdjustmentMagenta>
      
      <crs:SaturationAdjustmentRed>${analysis.hsl.red.saturation.toFixed(0)}</crs:SaturationAdjustmentRed>
      <crs:SaturationAdjustmentOrange>${analysis.hsl.orange.saturation.toFixed(0)}</crs:SaturationAdjustmentOrange>
      <crs:SaturationAdjustmentYellow>${analysis.hsl.yellow.saturation.toFixed(0)}</crs:SaturationAdjustmentYellow>
      <crs:SaturationAdjustmentGreen>${analysis.hsl.green.saturation.toFixed(0)}</crs:SaturationAdjustmentGreen>
      <crs:SaturationAdjustmentAqua>${analysis.hsl.aqua.saturation.toFixed(0)}</crs:SaturationAdjustmentAqua>
      <crs:SaturationAdjustmentBlue>${analysis.hsl.blue.saturation.toFixed(0)}</crs:SaturationAdjustmentBlue>
      <crs:SaturationAdjustmentPurple>${analysis.hsl.purple.saturation.toFixed(0)}</crs:SaturationAdjustmentPurple>
      <crs:SaturationAdjustmentMagenta>${analysis.hsl.magenta.saturation.toFixed(0)}</crs:SaturationAdjustmentMagenta>
      
      <crs:LuminanceAdjustmentRed>${analysis.hsl.red.luminance.toFixed(0)}</crs:LuminanceAdjustmentRed>
      <crs:LuminanceAdjustmentOrange>${analysis.hsl.orange.luminance.toFixed(0)}</crs:LuminanceAdjustmentOrange>
      <crs:LuminanceAdjustmentYellow>${analysis.hsl.yellow.luminance.toFixed(0)}</crs:LuminanceAdjustmentYellow>
      <crs:LuminanceAdjustmentGreen>${analysis.hsl.green.luminance.toFixed(0)}</crs:LuminanceAdjustmentGreen>
      <crs:LuminanceAdjustmentAqua>${analysis.hsl.aqua.luminance.toFixed(0)}</crs:LuminanceAdjustmentAqua>
      <crs:LuminanceAdjustmentBlue>${analysis.hsl.blue.luminance.toFixed(0)}</crs:LuminanceAdjustmentBlue>
      <crs:LuminanceAdjustmentPurple>${analysis.hsl.purple.luminance.toFixed(0)}</crs:LuminanceAdjustmentPurple>
      <crs:LuminanceAdjustmentMagenta>${analysis.hsl.magenta.luminance.toFixed(0)}</crs:LuminanceAdjustmentMagenta>
      
      <!-- Tone Curve Points (Custom curve based on LUT) -->
      <crs:ToneCurvePV2012>
        <rdf:Seq>
          <rdf:li>0, 0</rdf:li>
          <rdf:li>${(analysis.toneCurve.shadows * 64).toFixed(0)}, ${(analysis.toneCurve.shadowsOut * 64).toFixed(0)}</rdf:li>
          <rdf:li>${(analysis.toneCurve.midtones * 128).toFixed(0)}, ${(analysis.toneCurve.midtonesOut * 128).toFixed(0)}</rdf:li>
          <rdf:li>${(analysis.toneCurve.highlights * 192).toFixed(0)}, ${(analysis.toneCurve.highlightsOut * 192).toFixed(0)}</rdf:li>
          <rdf:li>255, 255</rdf:li>
        </rdf:Seq>
      </crs:ToneCurvePV2012>
      
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>`;
  
  return xmpContent;
}

/**
 * Analyze LUT to extract Lightroom-compatible adjustments
 */
function analyzeLUTForXmp(lutMap: LUTPoint[], gridSize: number) {
  // Sample key points from the LUT to derive adjustments
  const identity = createIdentityLUT(gridSize);
  
  // Calculate overall exposure shift
  let totalShift = 0;
  let contrastShift = 0;
  let saturationShift = 0;
  
  for (let i = 0; i < lutMap.length; i++) {
    const lut = lutMap[i];
    const orig = identity[i];
    
    // Calculate luminance
    const lutLum = 0.2126 * lut.r + 0.7152 * lut.g + 0.0722 * lut.b;
    const origLum = 0.2126 * orig.r + 0.7152 * orig.g + 0.0722 * orig.b;
    
    totalShift += (lutLum - origLum);
    
    // Calculate saturation change
    const lutMax = Math.max(lut.r, lut.g, lut.b);
    const lutMin = Math.min(lut.r, lut.g, lut.b);
    const origMax = Math.max(orig.r, orig.g, orig.b);
    const origMin = Math.min(orig.r, orig.g, orig.b);
    
    const lutSat = lutMax - lutMin;
    const origSat = origMax - origMin;
    
    saturationShift += (lutSat - origSat);
  }
  
  const avgShift = totalShift / lutMap.length;
  const avgSatShift = saturationShift / lutMap.length;
  
  // Analyze shadows, midtones, highlights
  const shadowsIdx = Math.floor(gridSize * gridSize * gridSize * 0.2);
  const midtonesIdx = Math.floor(gridSize * gridSize * gridSize * 0.5);
  const highlightsIdx = Math.floor(gridSize * gridSize * gridSize * 0.8);
  
  const shadowShift = (
    (0.2126 * lutMap[shadowsIdx].r + 0.7152 * lutMap[shadowsIdx].g + 0.0722 * lutMap[shadowsIdx].b) -
    (0.2126 * identity[shadowsIdx].r + 0.7152 * identity[shadowsIdx].g + 0.0722 * identity[shadowsIdx].b)
  );
  
  const midtoneShift = (
    (0.2126 * lutMap[midtonesIdx].r + 0.7152 * lutMap[midtonesIdx].g + 0.0722 * lutMap[midtonesIdx].b) -
    (0.2126 * identity[midtonesIdx].r + 0.7152 * identity[midtonesIdx].g + 0.0722 * identity[midtonesIdx].b)
  );
  
  const highlightShift = (
    (0.2126 * lutMap[highlightsIdx].r + 0.7152 * lutMap[highlightsIdx].g + 0.0722 * lutMap[highlightsIdx].b) -
    (0.2126 * identity[highlightsIdx].r + 0.7152 * identity[highlightsIdx].g + 0.0722 * identity[highlightsIdx].b)
  );
  
  // Calculate color temperature shift (simplified)
  let tempShift = 0;
  let tintShift = 0;
  
  for (let i = 0; i < Math.min(100, lutMap.length); i++) {
    const rb = lutMap[i].r - lutMap[i].b;
    tempShift += rb;
    tintShift += (lutMap[i].g - (lutMap[i].r + lutMap[i].b) / 2);
  }
  
  return {
    exposure: avgShift * 5, // Convert to EV stops (-2 to +2 range)
    contrast: contrastShift * 50, // -100 to +100
    highlights: highlightShift * 100, // -100 to +100
    shadows: shadowShift * 100,
    whites: highlightShift * 100,
    blacks: shadowShift * 100,
    saturation: avgSatShift * 100, // -100 to +100
    vibrance: avgSatShift * 50,
    temperature: Math.max(-100, Math.min(100, tempShift * 2)),
    tint: Math.max(-100, Math.min(100, tintShift * 2)),
    
    // HSL adjustments (simplified - would need more sophisticated color analysis)
    hsl: {
      red: { hue: 0, saturation: 0, luminance: 0 },
      orange: { hue: 0, saturation: 0, luminance: 0 },
      yellow: { hue: 0, saturation: 0, luminance: 0 },
      green: { hue: 0, saturation: 0, luminance: 0 },
      aqua: { hue: 0, saturation: 0, luminance: 0 },
      blue: { hue: 0, saturation: 0, luminance: 0 },
      purple: { hue: 0, saturation: 0, luminance: 0 },
      magenta: { hue: 0, saturation: 0, luminance: 0 },
    },
    
    // Tone curve points
    toneCurve: {
      shadows: 0.25,
      shadowsOut: 0.25 + shadowShift,
      midtones: 0.5,
      midtonesOut: 0.5 + midtoneShift,
      highlights: 0.75,
      highlightsOut: 0.75 + highlightShift,
    },
  };
}

/**
 * Create identity LUT for comparison
 */
function createIdentityLUT(gridSize: number): LUTPoint[] {
  const lutMap: LUTPoint[] = [];
  const step = 1.0 / (gridSize - 1);
  
  for (let b = 0; b < gridSize; b++) {
    for (let g = 0; g < gridSize; g++) {
      for (let r = 0; r < gridSize; r++) {
        lutMap.push({
          r: r * step,
          g: g * step,
          b: b * step,
        });
      }
    }
  }
  
  return lutMap;
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
