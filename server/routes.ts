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

// Configure multer with file validation
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'text/plain',           // .cube, .3dl
      'application/octet-stream', // generic
      'image/png',            // .png
      'image/jpeg',           // .jpg, .jpeg
      'video/mp4',            // .mp4
      'video/quicktime',      // .mov
      'video/x-msvideo'       // .avi
    ];
    
    const allowedExtensions = ['.cube', '.3dl', '.png', '.jpg', '.jpeg', '.mp4', '.mov', '.avi'];
    const ext = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Supported: .cube, .3dl, .png, .jpg, .mp4, .mov, .avi`));
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit for video files
  }
});

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
  app.post("/api/lut/convert", dynamicRateLimiter, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString('utf-8');
      const sourceFormat = req.body.sourceFormat as 'cube' | '3dl' | undefined;
      // Normalize target format (remove leading dot if present)
      const targetFormatRaw = req.body.targetFormat;
      const targetFormat = (targetFormatRaw?.startsWith('.') 
        ? targetFormatRaw.substring(1) 
        : targetFormatRaw) as 'cube' | '3dl';
      const gridSize = req.body.gridSize ? parseInt(req.body.gridSize) : undefined;

      if (!targetFormat || !['cube', '3dl'].includes(targetFormat)) {
        return res.status(400).json({ error: "Target format required (cube or 3dl)" });
      }

      // Backend tier validation for grid size resampling (Pro feature)
      if (gridSize) {
        // Grid size resampling requires authentication and Pro tier
        if (!req.user) {
          return res.status(401).json({
            error: "Authentication required for grid size resampling",
            upgradeRequired: true
          });
        }

        const { hasTier } = await import("./middleware/tierGuard");
        if (!hasTier(req.user.tier, "pro")) {
          return res.status(403).json({
            error: "Grid size resampling requires Pro tier",
            upgradeRequired: true,
            requiredTier: "pro"
          });
        }

        // Validate grid size values
        if (![17, 33, 65].includes(gridSize)) {
          return res.status(400).json({ error: "Invalid grid size. Must be 17, 33, or 65" });
        }
      }

      // Parse source LUT
      const parsed = parseLUT(content, sourceFormat);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      console.log(`[DEBUG] Parsed LUT size: ${parsed.lut.size}, Target format: ${targetFormat}, Grid size param: ${gridSize}`);

      // Convert to target format with optional grid size resampling
      const converted = convertLUT(parsed, targetFormat, gridSize);
      
      // Count data lines to verify output size
      const dataLines = converted.split('\n').filter(l => l.trim() && /^[\d\.\-\s]+$/.test(l.trim())).length;
      console.log(`[DEBUG] Converted LUT has ${dataLines} data lines`);

      // Track usage if user is authenticated
      if (req.user) {
        const { storage } = await import("./storage");
        await storage.incrementConversions(req.user.id);
      }

      // Generate filename
      const originalName = req.file.originalname.replace(/\.[^/.]+$/, "");
      const timestamp = new Date().toISOString().split("T")[0];
      const gridSuffix = gridSize ? `_${gridSize}` : "";
      const filename = `${originalName}_converted${gridSuffix}_${timestamp}.${targetFormat}`;

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
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { storage } = await import("./storage");
      const savedPresets = await storage.getUserPresetCount(req.user.id);
      
      res.json({
        savedPresets,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Preset Management Routes
  
  // Get user's saved presets
  app.get("/api/presets", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { storage } = await import("./storage");
      const presets = await storage.getUserPresets(req.user.id);
      
      res.json(presets); // Return array directly for React Query
    } catch (error) {
      console.error("Get presets error:", error);
      res.status(500).json({ error: "Failed to fetch presets" });
    }
  });

  // Download a preset
  app.get("/api/presets/:id/download", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const presetId = parseInt(req.params.id);
      if (isNaN(presetId)) {
        return res.status(400).json({ error: "Invalid preset ID" });
      }

      const { storage } = await import("./storage");
      const preset = await storage.getPreset(presetId, req.user.id);
      
      if (!preset) {
        return res.status(404).json({ error: "Preset not found" });
      }

      // Send the LUT data as a downloadable file with proper MIME type
      const filename = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}.${preset.format}`;
      
      // Determine MIME type based on format
      let contentType = 'text/plain';
      const format = preset.format.toLowerCase();
      
      if (format === 'cube' || format === '3dl') {
        contentType = 'text/plain';
      } else if (format === 'png') {
        contentType = 'image/png';
      } else if (format === 'jpg' || format === 'jpeg') {
        contentType = 'image/jpeg';
      } else if (format === 'mp4') {
        contentType = 'video/mp4';
      } else if (format === 'mov') {
        contentType = 'video/quicktime';
      } else if (format === 'avi') {
        contentType = 'video/x-msvideo';
      } else {
        contentType = 'application/octet-stream'; // Safe fallback for unknown formats
      }
      
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Type', contentType);
      res.send(preset.lutData);
    } catch (error) {
      console.error("Download preset error:", error);
      res.status(500).json({ error: "Failed to download preset" });
    }
  });

  // Save a new preset
  app.post("/api/presets", requireAuth, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const user = req.user;
      const { USAGE_LIMITS } = await import("./middleware/validation");
      const { storage } = await import("./storage");
      
      // Check preset limit for free tier
      if (user.tier === "free") {
        const currentPresetCount = await storage.getUserPresetCount(user.id);
        if (currentPresetCount >= USAGE_LIMITS.free.savedPresets) {
          return res.status(403).json({
            error: "Preset limit reached",
            upgradeRequired: true,
            limit: USAGE_LIMITS.free.savedPresets
          });
        }
      }

      const name = req.body.name || `Preset ${new Date().toISOString()}`;
      const content = req.file.buffer.toString('utf-8');
      const format = req.body.format as 'cube' | '3dl' | undefined;
      
      const parsed = parseLUT(content, format);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      // Save to database
      const preset = await storage.createPreset({
        userId: user.id,
        name,
        description: req.body.description || null,
        lutData: content,
        format: parsed.format,
        isPublic: false,
      });

      res.json({
        message: "Preset saved successfully",
        preset: {
          id: preset.id,
          name: preset.name,
          format: preset.format,
          createdAt: preset.createdAt
        }
      });
    } catch (error) {
      console.error("Save preset error:", error);
      res.status(500).json({ error: "Failed to save preset" });
    }
  });

  // Delete a preset
  app.delete("/api/presets/:id", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const presetId = parseInt(req.params.id);
      if (isNaN(presetId)) {
        return res.status(400).json({ error: "Invalid preset ID" });
      }

      const { storage } = await import("./storage");
      const deleted = await storage.deletePreset(presetId, req.user.id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Preset not found" });
      }

      res.json({ message: "Preset deleted successfully" });
    } catch (error) {
      console.error("Delete preset error:", error);
      res.status(500).json({ error: "Failed to delete preset" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
