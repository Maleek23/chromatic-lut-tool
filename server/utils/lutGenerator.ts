import sharp from "sharp";

interface RGB {
  r: number;
  g: number;
  b: number;
}

export async function generateLUT(
  imageBuffer: Buffer,
  gridSize: number,
  intensity: number,
  format: "cube" | "3dl"
): Promise<string> {
  // Analyze the image to create a color mapping
  const colorMap = await buildColorMap(imageBuffer, gridSize);

  // Apply intensity
  const adjustedMap = applyIntensity(colorMap, intensity / 100);

  // Generate LUT file content
  if (format === "cube") {
    return generateCubeLUT(adjustedMap, gridSize);
  } else {
    return generate3dlLUT(adjustedMap, gridSize);
  }
}

async function buildColorMap(
  imageBuffer: Buffer,
  gridSize: number
): Promise<Map<string, RGB>> {
  const image = sharp(imageBuffer);
  
  // Resize to manageable size for analysis
  const { data, info } = await image
    .resize(400, 400, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const colorMap = new Map<string, RGB>();

  // Sample the image and build a color transformation map
  for (let r = 0; r < gridSize; r++) {
    for (let g = 0; g < gridSize; g++) {
      for (let b = 0; b < gridSize; b++) {
        const inputR = Math.round((r / (gridSize - 1)) * 255);
        const inputG = Math.round((g / (gridSize - 1)) * 255);
        const inputB = Math.round((b / (gridSize - 1)) * 255);

        // Find similar colors in the image and average their transformations
        const outputColor = findClosestColorTransform(
          data,
          info.channels,
          inputR,
          inputG,
          inputB
        );

        const key = `${r},${g},${b}`;
        colorMap.set(key, outputColor);
      }
    }
  }

  return colorMap;
}

function findClosestColorTransform(
  data: Buffer,
  channels: number,
  targetR: number,
  targetG: number,
  targetB: number
): RGB {
  let closestR = targetR;
  let closestG = targetG;
  let closestB = targetB;
  let minDistance = Infinity;
  let count = 0;
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;

  // Sample pixels to find color transformation
  const sampleSize = Math.min(1000, data.length / channels);
  const step = Math.floor((data.length / channels) / sampleSize);

  for (let i = 0; i < data.length; i += step * channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const distance = Math.sqrt(
      Math.pow(r - targetR, 2) +
        Math.pow(g - targetG, 2) +
        Math.pow(b - targetB, 2)
    );

    if (distance < 50) {
      sumR += r;
      sumG += g;
      sumB += b;
      count++;
    }

    if (distance < minDistance) {
      minDistance = distance;
      closestR = r;
      closestG = g;
      closestB = b;
    }
  }

  if (count > 0) {
    return {
      r: sumR / count,
      g: sumG / count,
      b: sumB / count,
    };
  }

  return { r: closestR, g: closestG, b: closestB };
}

function applyIntensity(
  colorMap: Map<string, RGB>,
  intensity: number
): Map<string, RGB> {
  const adjusted = new Map<string, RGB>();

  colorMap.forEach((output, key) => {
    const [r, g, b] = key.split(",").map(Number);
    const inputR = (r / (Math.cbrt(colorMap.size) - 1)) * 255;
    const inputG = (g / (Math.cbrt(colorMap.size) - 1)) * 255;
    const inputB = (b / (Math.cbrt(colorMap.size) - 1)) * 255;

    adjusted.set(key, {
      r: inputR + (output.r - inputR) * intensity,
      g: inputG + (output.g - inputG) * intensity,
      b: inputB + (output.b - inputB) * intensity,
    });
  });

  return adjusted;
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
