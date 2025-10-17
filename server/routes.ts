import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import JSZip from "jszip";
import { analyzeImage } from "./utils/colorAnalysis";
import { generateLUT, applyLUTToImage } from "./utils/lutGenerator";
import { parseLUT, convertLUT, type ParsedLUT } from "./utils/lutParser";
import { lutGenerationSchema, extendedLutGenerationSchema, batchLutRequestSchema } from "@shared/schema";
import { setupAuth } from "./auth";
import { requireAuth, requireTier } from "./middleware/tierGuard";
import { dynamicRateLimiter } from "./middleware/rateLimiter";

const upload = multer({ storage: multer.memoryStorage() });

// Cache LUT maps for preview generation
const lutCache = new Map<string, { map: Map<string, any>, gridSize: number }>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Reference: blueprint:javascript_auth_all_persistance
  // Sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Analyze image endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { imageData } = req.body;

      if (!imageData) {
        return res.status(400).json({ error: "No image data provided" });
      }

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Analyze the image
      const analysis = await analyzeImage(imageBuffer);

      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });

  // Generate preview with LUT applied
  app.post("/api/preview", async (req, res) => {
    try {
      const { imageData, gridSize, intensity, advancedControls } = req.body;

      if (!imageData || !gridSize || intensity === undefined) {
        return res.status(400).json({ error: "Missing parameters" });
      }

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      const controls = advancedControls;

      // Check cache or generate new LUT map
      const cacheKey = `${imageData.substring(0, 100)}_${gridSize}_${JSON.stringify(controls)}`;
      let lutData = lutCache.get(cacheKey);

      if (!lutData) {
        const { getLUTMap } = await import("./utils/lutGenerator");
        const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize), controls);
        lutData = { map: lutMap, gridSize: parseInt(gridSize) };
        lutCache.set(cacheKey, lutData);
      }

      // Apply LUT to create preview
      const previewBuffer = await applyLUTToImage(
        imageBuffer,
        lutData.map,
        lutData.gridSize,
        parseInt(intensity)
      );

      // Return as base64
      const previewBase64 = `data:image/jpeg;base64,${previewBuffer.toString("base64")}`;
      res.json({ previewImage: previewBase64 });
    } catch (error) {
      console.error("Preview error:", error);
      res.status(500).json({ error: "Failed to generate preview" });
    }
  });

  // Generate LUT endpoint
  app.post("/api/generate-lut", async (req, res) => {
    try {
      const validationResult = extendedLutGenerationSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validationResult.error 
        });
      }

      const { imageData, gridSize, intensity, format, advancedControls, precision, exportPreview } = validationResult.data;

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      const controls = advancedControls;

      // Generate LUT with precision metadata
      const lutData = await generateLUT(
        imageBuffer,
        parseInt(gridSize),
        intensity,
        format,
        controls,
        precision
      );

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `color_grade_${timestamp}_${gridSize}x${gridSize}x${gridSize}.${format}`;

      // Generate preview image if requested
      let previewData: string | undefined;
      if (exportPreview) {
        const { getLUTMap } = await import("./utils/lutGenerator");
        const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize), controls);
        const previewBuffer = await applyLUTToImage(imageBuffer, lutMap, parseInt(gridSize), intensity);
        previewData = `data:image/jpeg;base64,${previewBuffer.toString("base64")}`;
      }

      res.json({
        lutData,
        filename,
        format,
        gridSize,
        previewData,
      });
    } catch (error) {
      console.error("LUT generation error:", error);
      res.status(500).json({ error: "Failed to generate LUT" });
    }
  });

  // Batch preview endpoint
  app.post("/api/batch-preview", async (req, res) => {
    try {
      const { images, gridSize, intensity, advancedControls } = req.body;

      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ error: "No images provided" });
      }

      const controls = advancedControls;

      // Process each image
      const previews = await Promise.all(
        images.map(async (img: any) => {
          try {
            const base64Data = img.imageData.replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");

            // Get or create LUT map
            const cacheKey = `${img.id}_${gridSize}_${JSON.stringify(controls)}`;
            let lutData = lutCache.get(cacheKey);

            if (!lutData) {
              const { getLUTMap } = await import("./utils/lutGenerator");
              const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize), controls);
              lutData = { map: lutMap, gridSize: parseInt(gridSize) };
              lutCache.set(cacheKey, lutData);
            }

            // Apply LUT to create preview
            const previewBuffer = await applyLUTToImage(
              imageBuffer,
              lutData.map,
              lutData.gridSize,
              parseInt(intensity)
            );

            return {
              id: img.id,
              previewData: `data:image/jpeg;base64,${previewBuffer.toString("base64")}`,
            };
          } catch (error) {
            console.error(`Preview error for image ${img.id}:`, error);
            return {
              id: img.id,
              previewData: img.imageData, // fallback to original
            };
          }
        })
      );

      res.json({ previews });
    } catch (error) {
      console.error("Batch preview error:", error);
      res.status(500).json({ error: "Failed to generate batch previews" });
    }
  });

  // Batch download endpoint
  app.post("/api/batch-download", async (req, res) => {
    try {
      const validationResult = batchLutRequestSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validationResult.error 
        });
      }

      const { images, gridSize, intensity, format, advancedControls, precision, exportPreview } = validationResult.data;

      const controls = advancedControls;

      const zip = new JSZip();
      const timestamp = new Date().toISOString().split("T")[0];

      // Generate LUT for each image
      await Promise.all(
        images.map(async (img, index) => {
          try {
            const base64Data = img.imageData.replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");

            const lutData = await generateLUT(
              imageBuffer,
              parseInt(gridSize),
              intensity,
              format,
              controls,
              precision
            );

            const imageName = img.name.replace(/\.[^/.]+$/, ""); // Remove extension
            const filename = `${imageName}_${timestamp}.${format}`;
            zip.file(filename, lutData);

            // Add preview image if requested
            if (exportPreview) {
              const { getLUTMap } = await import("./utils/lutGenerator");
              const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize), controls);
              const previewBuffer = await applyLUTToImage(imageBuffer, lutMap, parseInt(gridSize), intensity);
              const previewFilename = `${imageName}_${timestamp}_preview.jpg`;
              zip.file(previewFilename, previewBuffer);
            }
          } catch (error) {
            console.error(`LUT generation error for image ${img.id}:`, error);
          }
        })
      );

      // Generate ZIP file
      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

      // Send ZIP file
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="lut_batch_${timestamp}.zip"`);
      res.send(zipBuffer);
    } catch (error) {
      console.error("Batch download error:", error);
      res.status(500).json({ error: "Failed to generate batch download" });
    }
  });

  // Parse LUT file endpoint
  app.post("/api/lut/parse", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString('utf-8');
      const format = req.body.format as 'cube' | '3dl' | undefined;
      
      const parsed = parseLUT(content, format);

      res.json({
        success: parsed.errors.length === 0,
        format: parsed.format,
        size: parsed.lut.size,
        title: parsed.lut.title,
        errors: parsed.errors,
        warnings: parsed.warnings,
        dataPoints: parsed.lut.data.length
      });
    } catch (error) {
      console.error("LUT parse error:", error);
      res.status(500).json({ error: "Failed to parse LUT file" });
    }
  });

  // Convert LUT format endpoint
  app.post("/api/lut/convert", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString('utf-8');
      const sourceFormat = req.body.sourceFormat as 'cube' | '3dl' | undefined;
      const targetFormat = req.body.targetFormat as 'cube' | '3dl';

      if (!targetFormat) {
        return res.status(400).json({ error: "Target format required" });
      }

      // Parse source LUT
      const parsed = parseLUT(content, sourceFormat);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      // Convert to target format
      const converted = convertLUT(parsed, targetFormat);

      // Generate filename
      const originalName = req.file.originalname.replace(/\.[^/.]+$/, "");
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `${originalName}_converted_${timestamp}.${targetFormat}`;

      // Send as download
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(converted);
    } catch (error) {
      console.error("LUT conversion error:", error);
      res.status(500).json({ error: "Failed to convert LUT file" });
    }
  });

  // Analyze LUT quality endpoint
  app.post("/api/lut/analyze", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString('utf-8');
      const format = req.body.format as 'cube' | '3dl' | undefined;
      
      const parsed = parseLUT(content, format);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      // Analyze quality issues
      const analysis = {
        format: parsed.format,
        size: parsed.lut.size,
        title: parsed.lut.title,
        totalPoints: parsed.lut.data.length,
        errors: parsed.errors,
        warnings: parsed.warnings,
        quality: {
          hasInvalidPoints: false,
          outOfRangeCount: 0,
          bandingDetected: false,
          maxValue: 0,
          minValue: 1,
          avgValue: 0
        }
      };

      // Check for invalid points and out-of-range values
      let sum = 0;
      for (const [r, g, b] of parsed.lut.data) {
        const values = [r, g, b];
        
        for (const v of values) {
          sum += v;
          
          if (v < 0 || v > 1) {
            analysis.quality.hasInvalidPoints = true;
            analysis.quality.outOfRangeCount++;
          }
          
          if (v > analysis.quality.maxValue) {
            analysis.quality.maxValue = v;
          }
          if (v < analysis.quality.minValue) {
            analysis.quality.minValue = v;
          }
        }
      }

      analysis.quality.avgValue = sum / (parsed.lut.data.length * 3);

      // Simple banding detection: check for repeated consecutive values
      let bandingScore = 0;
      for (let i = 1; i < parsed.lut.data.length; i++) {
        const prev = parsed.lut.data[i - 1];
        const curr = parsed.lut.data[i];
        
        if (
          Math.abs(prev[0] - curr[0]) < 0.001 &&
          Math.abs(prev[1] - curr[1]) < 0.001 &&
          Math.abs(prev[2] - curr[2]) < 0.001
        ) {
          bandingScore++;
        }
      }
      
      // If more than 10% of consecutive points are identical, consider it banding
      analysis.quality.bandingDetected = bandingScore > parsed.lut.data.length * 0.1;

      res.json(analysis);
    } catch (error) {
      console.error("LUT analysis error:", error);
      res.status(500).json({ error: "Failed to analyze LUT file" });
    }
  });

  // Dashboard stats endpoint - returns usage and saved preset count
  app.get("/api/dashboard/stats", requireAuth, async (req, res) => {
    try {
      // For now, return basic stats
      // In the future, we'll query presets from database
      res.json({
        savedPresets: 0, // TODO: Query from database when presets feature is built
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
