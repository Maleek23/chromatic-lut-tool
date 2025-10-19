import sharp from "sharp";

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ColorInfo {
  rgb: [number, number, number];
  hex: string;
  percentage: number;
}

export async function analyzeImage(imageBuffer: Buffer) {
  try {
    // Create Sharp instance once and reuse it
    const image = sharp(imageBuffer, {
      failOn: 'none',
      limitInputPixels: 268402689, // Max 16384x16384 pixels (reasonable ceiling)
    });

    // Get metadata to validate dimensions
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error("Invalid image: missing dimensions");
    }

    // Ensure minimum size for meaningful analysis (at least 2x2 pixels)
    if (metadata.width < 2 || metadata.height < 2) {
      throw new Error("Image too small: minimum size is 2x2 pixels");
    }

    // Single-pass processing: decode, normalize format, resize, and extract pixels
    // Use clone() to avoid re-parsing the buffer after metadata() consumed it
    const { data, info } = await image.clone()
      .resize(200, 200, { fit: "inside", withoutEnlargement: true })
      .toColorspace('srgb') // Ensure consistent color space for all inputs
      .removeAlpha() // Remove alpha channel for consistent RGB processing
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    if (!data || data.length === 0) {
      throw new Error("Failed to process image data");
    }

  const pixels: RGB[] = [];
  for (let i = 0; i < data.length; i += info.channels) {
    pixels.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
    });
  }

  // Calculate dominant colors using basic color quantization
  const dominantColors = extractDominantColors(pixels, 6);

  // Calculate RGB histograms (simplified to 32 bins)
  const rgbHistogram = calculateHistogram(pixels);

  // Calculate average brightness and saturation
  const stats = calculateColorStats(pixels);

    return {
      dominantColors,
      averageBrightness: stats.brightness,
      averageSaturation: stats.saturation,
      rgbHistogram,
    };
  } catch (error) {
    // Provide more context for debugging
    if (error instanceof Error) {
      throw new Error(`Image analysis failed: ${error.message}`);
    }
    throw new Error('Image analysis failed: Unknown error');
  }
}

function extractDominantColors(pixels: RGB[], count: number): ColorInfo[] {
  // Simple k-means clustering for color extraction
  const clusters: RGB[] = [];
  
  // Initialize clusters with random pixels
  const step = Math.floor(pixels.length / count);
  for (let i = 0; i < count; i++) {
    clusters.push({ ...pixels[i * step] });
  }

  // Run k-means for a few iterations
  for (let iter = 0; iter < 5; iter++) {
    const groups: RGB[][] = Array.from({ length: count }, () => []);

    // Assign pixels to nearest cluster
    pixels.forEach((pixel) => {
      let minDist = Infinity;
      let minIdx = 0;

      clusters.forEach((cluster, idx) => {
        const dist = colorDistance(pixel, cluster);
        if (dist < minDist) {
          minDist = dist;
          minIdx = idx;
        }
      });

      groups[minIdx].push(pixel);
    });

    // Update cluster centers
    groups.forEach((group, idx) => {
      if (group.length > 0) {
        const sum = group.reduce(
          (acc, p) => ({
            r: acc.r + p.r,
            g: acc.g + p.g,
            b: acc.b + p.b,
          }),
          { r: 0, g: 0, b: 0 }
        );

        clusters[idx] = {
          r: Math.round(sum.r / group.length),
          g: Math.round(sum.g / group.length),
          b: Math.round(sum.b / group.length),
        };
      }
    });
  }

  // Calculate percentages and sort by prominence
  const totalPixels = pixels.length;
  const results: ColorInfo[] = clusters.map((cluster) => {
    const count = pixels.filter(
      (p) => colorDistance(p, cluster) < 50
    ).length;

    return {
      rgb: [cluster.r, cluster.g, cluster.b] as [number, number, number],
      hex: rgbToHex(cluster.r, cluster.g, cluster.b),
      percentage: (count / totalPixels) * 100,
    };
  });

  return results.sort((a, b) => b.percentage - a.percentage);
}

function calculateHistogram(pixels: RGB[]) {
  const bins = 32;
  const red = new Array(bins).fill(0);
  const green = new Array(bins).fill(0);
  const blue = new Array(bins).fill(0);

  pixels.forEach((pixel) => {
    const rBin = Math.floor((pixel.r / 255) * (bins - 1));
    const gBin = Math.floor((pixel.g / 255) * (bins - 1));
    const bBin = Math.floor((pixel.b / 255) * (bins - 1));

    red[rBin]++;
    green[gBin]++;
    blue[bBin]++;
  });

  return { red, green, blue };
}

function calculateColorStats(pixels: RGB[]) {
  let totalBrightness = 0;
  let totalSaturation = 0;

  pixels.forEach((pixel) => {
    // Calculate brightness (HSV value)
    const brightness = Math.max(pixel.r, pixel.g, pixel.b) / 255;
    totalBrightness += brightness;

    // Calculate saturation
    const max = Math.max(pixel.r, pixel.g, pixel.b);
    const min = Math.min(pixel.r, pixel.g, pixel.b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    totalSaturation += saturation;
  });

  return {
    brightness: (totalBrightness / pixels.length) * 100,
    saturation: (totalSaturation / pixels.length) * 100,
  };
}

function colorDistance(c1: RGB, c2: RGB): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
  );
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
