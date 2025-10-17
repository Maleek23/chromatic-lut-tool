/**
 * LUT Parser and Converter
 * Supports .cube (3D LUT format) and .3dl (Lustre 3D LUT format)
 */

export interface LUTData {
  title?: string;
  domainMin: number[];
  domainMax: number[];
  size: number;
  data: number[][];
}

export interface ParsedLUT {
  format: 'cube' | '3dl';
  lut: LUTData;
  errors: string[];
  warnings: string[];
}

/**
 * Parse .cube LUT file
 * Format specification:
 * - Comments start with #
 * - TITLE line (optional)
 * - LUT_3D_SIZE specifies grid size
 * - DOMAIN_MIN and DOMAIN_MAX specify input range
 * - RGB triplets follow (one per line)
 */
export function parseCubeLUT(content: string): ParsedLUT {
  const errors: string[] = [];
  const warnings: string[] = [];
  const lines = content.split('\n').map(l => l.trim());
  
  let title: string | undefined;
  let size = 33; // Default size
  let domainMin = [0, 0, 0];
  let domainMax = [1, 1, 1];
  const data: number[][] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip empty lines and comments
    if (!line || line.startsWith('#')) continue;

    // Parse title
    if (line.startsWith('TITLE')) {
      title = line.substring(5).trim().replace(/"/g, '');
      continue;
    }

    // Parse size
    if (line.startsWith('LUT_3D_SIZE')) {
      const sizeMatch = line.match(/LUT_3D_SIZE\s+(\d+)/);
      if (sizeMatch) {
        size = parseInt(sizeMatch[1], 10);
        if (size < 2 || size > 256) {
          errors.push(`Invalid LUT size: ${size}. Must be between 2 and 256.`);
        }
      }
      continue;
    }

    // Parse domain min
    if (line.startsWith('DOMAIN_MIN')) {
      const values = line.substring(10).trim().split(/\s+/).map(Number);
      if (values.length === 3) {
        domainMin = values;
      }
      continue;
    }

    // Parse domain max
    if (line.startsWith('DOMAIN_MAX')) {
      const values = line.substring(10).trim().split(/\s+/).map(Number);
      if (values.length === 3) {
        domainMax = values;
      }
      continue;
    }

    // Parse RGB data
    const values = line.split(/\s+/).map(Number);
    if (values.length === 3 && !values.some(isNaN)) {
      data.push(values);
    }
  }

  // Validate data count
  const expectedCount = size * size * size;
  if (data.length !== expectedCount) {
    errors.push(`Expected ${expectedCount} RGB triplets, found ${data.length}`);
  }

  // Validate RGB values are in valid range
  for (let i = 0; i < data.length; i++) {
    const [r, g, b] = data[i];
    if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
      warnings.push(`RGB value out of range [0,1] at index ${i}: [${r}, ${g}, ${b}]`);
    }
  }

  return {
    format: 'cube',
    lut: { title, domainMin, domainMax, size, data },
    errors,
    warnings
  };
}

/**
 * Parse .3dl LUT file
 * Format specification:
 * - Always 33x33x33 grid (32 intervals)
 * - RGB values are integers 0-4095 (12-bit)
 * - Data organized in Blue-fastest order
 */
export function parse3dlLUT(content: string): ParsedLUT {
  const errors: string[] = [];
  const warnings: string[] = [];
  const lines = content.split('\n').map(l => l.trim());
  
  const size = 33; // .3dl always uses 33x33x33
  const data: number[][] = [];

  for (const line of lines) {
    // Skip empty lines and comments
    if (!line || line.startsWith('#')) continue;

    // Parse RGB data (integers 0-4095)
    const values = line.split(/\s+/).map(Number);
    if (values.length === 3 && !values.some(isNaN)) {
      // Convert from 12-bit (0-4095) to normalized 0-1
      const normalized = values.map(v => v / 4095);
      data.push(normalized);
    }
  }

  // Validate data count
  const expectedCount = size * size * size;
  if (data.length !== expectedCount) {
    errors.push(`Expected ${expectedCount} RGB triplets for 33x33x33 grid, found ${data.length}`);
  }

  // Validate RGB values
  for (let i = 0; i < data.length; i++) {
    const [r, g, b] = data[i];
    if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
      warnings.push(`RGB value out of range after normalization at index ${i}: [${r}, ${g}, ${b}]`);
    }
  }

  return {
    format: '3dl',
    lut: {
      domainMin: [0, 0, 0],
      domainMax: [1, 1, 1],
      size,
      data
    },
    errors,
    warnings
  };
}

/**
 * Convert LUT data to .cube format string
 */
export function toCubeFormat(lut: LUTData): string {
  let output = '';
  
  // Add title if present
  if (lut.title) {
    output += `TITLE "${lut.title}"\n`;
  }
  
  // Add size
  output += `LUT_3D_SIZE ${lut.size}\n`;
  
  // Add domain
  output += `DOMAIN_MIN ${lut.domainMin.join(' ')}\n`;
  output += `DOMAIN_MAX ${lut.domainMax.join(' ')}\n`;
  output += '\n';
  
  // Add RGB data (normalized 0-1 with 6 decimal places)
  for (const [r, g, b] of lut.data) {
    output += `${r.toFixed(6)} ${g.toFixed(6)} ${b.toFixed(6)}\n`;
  }
  
  return output;
}

/**
 * Convert LUT data to .3dl format string
 */
export function to3dlFormat(lut: LUTData): string {
  let output = '# 3D LUT\n\n';
  
  // Resample to 33x33x33 if needed
  const resampledData = resampleLUT(lut, 33);
  
  // Convert to 12-bit integers (0-4095)
  for (const [r, g, b] of resampledData) {
    const r12 = Math.round(Math.max(0, Math.min(1, r)) * 4095);
    const g12 = Math.round(Math.max(0, Math.min(1, g)) * 4095);
    const b12 = Math.round(Math.max(0, Math.min(1, b)) * 4095);
    output += `${r12} ${g12} ${b12}\n`;
  }
  
  return output;
}

/**
 * Resample LUT to different grid size using trilinear interpolation
 * Maintains blue-fastest order (r slowest, g middle, b fastest)
 */
function resampleLUT(lut: LUTData, targetSize: number): number[][] {
  if (lut.size === targetSize) {
    return lut.data;
  }

  const result: number[][] = [];
  const sourceSize = lut.size;
  const scale = (sourceSize - 1) / (targetSize - 1);

  // Generate new grid points in blue-fastest order
  for (let r = 0; r < targetSize; r++) {
    for (let g = 0; g < targetSize; g++) {
      for (let b = 0; b < targetSize; b++) {
        // Map target coordinates to source coordinates
        const sr = r * scale;
        const sg = g * scale;
        const sb = b * scale;

        // Trilinear interpolation
        const interpolated = trilinearInterpolate(lut, sr, sg, sb);
        result.push(interpolated);
      }
    }
  }

  return result;
}

/**
 * Trilinear interpolation for LUT values
 * Note: LUT data is stored in blue-fastest order (index = r*size*size + g*size + b)
 */
function trilinearInterpolate(lut: LUTData, r: number, g: number, b: number): number[] {
  const size = lut.size;
  
  // Get surrounding cube indices
  const r0 = Math.floor(r);
  const r1 = Math.min(r0 + 1, size - 1);
  const g0 = Math.floor(g);
  const g1 = Math.min(g0 + 1, size - 1);
  const b0 = Math.floor(b);
  const b1 = Math.min(b0 + 1, size - 1);

  // Get fractional parts
  const rFrac = r - r0;
  const gFrac = g - g0;
  const bFrac = b - b0;

  // Get 8 surrounding values (blue-fastest: index = r*size*size + g*size + b)
  const c000 = lut.data[r0 * size * size + g0 * size + b0];
  const c001 = lut.data[r0 * size * size + g0 * size + b1];
  const c010 = lut.data[r0 * size * size + g1 * size + b0];
  const c011 = lut.data[r0 * size * size + g1 * size + b1];
  const c100 = lut.data[r1 * size * size + g0 * size + b0];
  const c101 = lut.data[r1 * size * size + g0 * size + b1];
  const c110 = lut.data[r1 * size * size + g1 * size + b0];
  const c111 = lut.data[r1 * size * size + g1 * size + b1];

  // Interpolate each channel
  const result: number[] = [];
  for (let channel = 0; channel < 3; channel++) {
    // Interpolate along r axis
    const c00 = c000[channel] * (1 - rFrac) + c100[channel] * rFrac;
    const c01 = c001[channel] * (1 - rFrac) + c101[channel] * rFrac;
    const c10 = c010[channel] * (1 - rFrac) + c110[channel] * rFrac;
    const c11 = c011[channel] * (1 - rFrac) + c111[channel] * rFrac;

    // Interpolate along g axis
    const c0 = c00 * (1 - gFrac) + c10 * gFrac;
    const c1 = c01 * (1 - gFrac) + c11 * gFrac;

    // Interpolate along b axis
    const value = c0 * (1 - bFrac) + c1 * bFrac;
    result.push(value);
  }

  return result;
}

/**
 * Auto-detect LUT format from file content
 */
export function detectLUTFormat(content: string): 'cube' | '3dl' | null {
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('LUT_3D_SIZE') || trimmed.startsWith('TITLE')) {
      return 'cube';
    }
  }
  
  // Check if it looks like .3dl (all integer values in 0-4095 range)
  const hasLargeIntegers = content.match(/\b([1-9]\d{2,3})\b/);
  if (hasLargeIntegers) {
    return '3dl';
  }
  
  return null;
}

/**
 * Parse LUT file with auto-detection
 */
export function parseLUT(content: string, format?: 'cube' | '3dl'): ParsedLUT {
  const detectedFormat = format || detectLUTFormat(content);
  
  if (!detectedFormat) {
    return {
      format: 'cube',
      lut: { domainMin: [0, 0, 0], domainMax: [1, 1, 1], size: 0, data: [] },
      errors: ['Could not detect LUT format. File must be .cube or .3dl format.'],
      warnings: []
    };
  }
  
  if (detectedFormat === 'cube') {
    return parseCubeLUT(content);
  } else {
    return parse3dlLUT(content);
  }
}

/**
 * Convert LUT from one format to another
 */
export function convertLUT(parsedLUT: ParsedLUT, targetFormat: 'cube' | '3dl'): string {
  if (targetFormat === 'cube') {
    return toCubeFormat(parsedLUT.lut);
  } else {
    return to3dlFormat(parsedLUT.lut);
  }
}
