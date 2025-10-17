import sharp from "sharp";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ColorTransform {
  brightnessShift: number;
  contrastFactor: number;
  saturationFactor: number;
  colorShifts: { r: number; g: number; b: number };
}

// Fast LUT generation using simple color transforms derived from image analysis
export async function generateLUT(
  imageBuffer: Buffer,
  gridSize: number,
  intensity: number,
  format: "cube" | "3dl"
): Promise<string> {
  // Analyze image to derive color transform
  const transform = await deriveColorTransform(imageBuffer);

  // Build LUT using the transform
  const lutMap = buildLUTFromTransform(transform, gridSize, intensity / 100);

  // Generate LUT file content
  if (format === "cube") {
    return generateCubeLUT(lutMap, gridSize);
  } else {
    return generate3dlLUT(lutMap, gridSize);
  }
}

async function deriveColorTransform(imageBuffer: Buffer): Promise<ColorTransform> {
  const image = sharp(imageBuffer);
  const { data, info } = await image
    .resize(100, 100, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let totalR = 0, totalG = 0, totalB = 0;
  let totalBrightness = 0;
  const pixelCount = data.length / info.channels;

  // Fast single pass analysis
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    totalR += r;
    totalG += g;
    totalB += b;
    totalBrightness += Math.max(r, g, b);
  }

  const avgR = totalR / pixelCount;
  const avgG = totalG / pixelCount;
  const avgB = totalB / pixelCount;
  const avgBrightness = totalBrightness / pixelCount;

  // Derive simple color transforms
  return {
    brightnessShift: (avgBrightness - 128) / 255,
    contrastFactor: 1.0 + (avgBrightness / 255 - 0.5) * 0.3,
    saturationFactor: 1.0 + ((avgR + avgG + avgB) / (3 * 255) - 0.5) * 0.2,
    colorShifts: {
      r: (avgR - 128) / 512,
      g: (avgG - 128) / 512,
      b: (avgB - 128) / 512,
    },
  };
}

function buildLUTFromTransform(
  transform: ColorTransform,
  gridSize: number,
  intensity: number
): Map<string, RGB> {
  const lutMap = new Map<string, RGB>();

  for (let r = 0; r < gridSize; r++) {
    for (let g = 0; g < gridSize; g++) {
      for (let b = 0; b < gridSize; b++) {
        const inputR = (r / (gridSize - 1)) * 255;
        const inputG = (g / (gridSize - 1)) * 255;
        const inputB = (b / (gridSize - 1)) * 255;

        // Apply color transform
        const transformed = applyTransform(
          { r: inputR, g: inputG, b: inputB },
          transform
        );

        // Blend with original based on intensity
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
  // Apply brightness and contrast
  let r = color.r;
  let g = color.g;
  let b = color.b;

  // Contrast
  r = ((r / 255 - 0.5) * transform.contrastFactor + 0.5) * 255;
  g = ((g / 255 - 0.5) * transform.contrastFactor + 0.5) * 255;
  b = ((b / 255 - 0.5) * transform.contrastFactor + 0.5) * 255;

  // Brightness
  r += transform.brightnessShift * 50;
  g += transform.brightnessShift * 50;
  b += transform.brightnessShift * 50;

  // Color shifts
  r += transform.colorShifts.r * 100;
  g += transform.colorShifts.g * 100;
  b += transform.colorShifts.b * 100;

  // Clamp to valid range
  return {
    r: Math.max(0, Math.min(255, r)),
    g: Math.max(0, Math.min(255, g)),
    b: Math.max(0, Math.min(255, b)),
  };
}

function generateCubeLUT(colorMap: Map<string, RGB>, gridSize: number): string {
  let lut = `# LUT size\nLUT_3D_SIZE ${gridSize}\n\n`;

  for (let b = 0; b < gridSize; b++) {
    for (let g = 0; g < gridSize; g++) {
      for (let r = 0; r < gridSize; r++) {
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

function generate3dlLUT(colorMap: Map<string, RGB>, gridSize: number): string {
  let lut = `3DMESH\nMesh ${gridSize} ${gridSize} ${gridSize}\n\n`;

  for (let b = 0; b < gridSize; b++) {
    for (let g = 0; g < gridSize; g++) {
      for (let r = 0; r < gridSize; r++) {
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

  // Apply LUT transformation to each pixel
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Map input RGB to grid coordinates
    const rIdx = Math.round((r / 255) * (gridSize - 1));
    const gIdx = Math.round((g / 255) * (gridSize - 1));
    const bIdx = Math.round((b / 255) * (gridSize - 1));

    const key = `${rIdx},${gIdx},${bIdx}`;
    const transformed = lutMap.get(key) || { r, g, b };

    // Apply transformation
    processedData[i] = Math.round(r + (transformed.r - r) * (intensity / 100));
    processedData[i + 1] = Math.round(g + (transformed.g - g) * (intensity / 100));
    processedData[i + 2] = Math.round(b + (transformed.b - b) * (intensity / 100));
  }

  // Convert back to image
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
  gridSize: number
): Promise<Map<string, RGB>> {
  const transform = await deriveColorTransform(imageBuffer);
  return buildLUTFromTransform(transform, gridSize, 1.0);
}
