import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import sharp from "sharp";
import { analyzeImage } from "./utils/colorAnalysis";
import { generateLUT, applyLUTToImage } from "./utils/lutGenerator";
import { parseLUT, convertLUT } from "./utils/lutParser";
import { lutGenerationSchema } from "@shared/schema";
import { setupAuth } from "./auth";

// Configure multer with file validation
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'text/plain',           // .cube, .3dl
      'application/octet-stream', // generic
      'image/png',            // .png
      'image/jpeg',           // .jpg, .jpeg
    ];
    
    const allowedExtensions = ['.cube', '.3dl', '.lut', '.png', '.jpg', '.jpeg'];
    const ext = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Supported: .cube, .3dl, .lut, .png, .jpg`));
    }
  },
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB limit
  }
});

// Cache LUT maps for preview generation
const lutCache = new Map<string, { map: Map<string, any>, gridSize: number }>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication (login/register/logout)
  setupAuth(app);

  // Analyze image endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { imageData } = req.body;

      if (!imageData) {
        return res.status(400).json({ error: "No image data provided" });
      }

      // Validate base64 format
      if (!imageData.startsWith('data:image/')) {
        return res.status(400).json({ error: "Invalid image data format" });
      }

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Validate buffer size (max 25MB)
      const MAX_SIZE = 25 * 1024 * 1024;
      if (imageBuffer.length > MAX_SIZE) {
        return res.status(400).json({ error: "Image too large. Maximum size is 25MB" });
      }

      // Validate minimum size
      if (imageBuffer.length < 100) {
        return res.status(400).json({ error: "Invalid or corrupted image data" });
      }

      // Analyze the image
      const analysis = await analyzeImage(imageBuffer);

      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      const message = error instanceof Error ? error.message : "Failed to analyze image";
      res.status(500).json({ error: message });
    }
  });

  // Generate preview with LUT applied
  app.post("/api/preview", async (req, res) => {
    try {
      const { imageData, gridSize, intensity } = req.body;

      if (!imageData || !gridSize || intensity === undefined) {
        return res.status(400).json({ error: "Missing required parameters: imageData, gridSize, and intensity are required" });
      }

      // Community Edition: Only 17x17x17 grid size
      if (String(gridSize) !== "17") {
        return res.status(400).json({ error: "Community Edition supports 17×17×17 grid size only" });
      }

      if (intensity < 0 || intensity > 100) {
        return res.status(400).json({ error: "Invalid intensity. Must be between 0 and 100" });
      }

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Check cache or generate new LUT map
      const cacheKey = `${imageData.substring(0, 100)}_${gridSize}`;
      let lutData = lutCache.get(cacheKey);

      if (!lutData) {
        const { getLUTMap } = await import("./utils/lutGenerator");
        const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize));
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
      const message = error instanceof Error ? error.message : "Failed to generate preview";
      res.status(500).json({ error: message });
    }
  });

  // Generate LUT endpoint - Community Edition (17x17x17, .cube only)
  app.post("/api/generate-lut", async (req, res) => {
    try {
      const validationResult = lutGenerationSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validationResult.error 
        });
      }

      const { imageData, gridSize, intensity, format, precision, exportPreview } = validationResult.data;

      // Community Edition: Force 17x17x17 and .cube format
      if (gridSize !== "17" || format !== "cube") {
        return res.status(400).json({
          error: "Community Edition is limited to 17×17×17 grid size and .cube format"
        });
      }

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Generate LUT from image analysis
      const lutData = await generateLUT(
        imageBuffer,
        parseInt(gridSize),
        intensity,
        format,
        undefined, // No advanced controls
        precision
      );

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `color_grade_${timestamp}_${gridSize}x${gridSize}x${gridSize}.${format}`;

      // Generate preview image if requested
      let previewData: string | undefined;
      if (exportPreview) {
        const { getLUTMap } = await import("./utils/lutGenerator");
        const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize));
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

  // Convert LUT format endpoint - Community Edition (.cube → .3dl only)
  app.post("/api/lut/convert", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString('utf-8');
      const sourceFormat = req.body.sourceFormat as 'cube' | '3dl' | 'lut' | undefined;
      const targetFormatRaw = req.body.targetFormat;
      const targetFormat = (targetFormatRaw?.startsWith('.') 
        ? targetFormatRaw.substring(1) 
        : targetFormatRaw) as 'cube' | '3dl' | 'lut';

      if (!targetFormat || !['cube', '3dl', 'lut'].includes(targetFormat)) {
        return res.status(400).json({ error: "Target format required (cube, 3dl, or lut)" });
      }

      // Parse source LUT
      const parsed = parseLUT(content, sourceFormat);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      // Community Edition: Only .cube → .3dl conversion
      if (parsed.format !== 'cube' || targetFormat !== '3dl') {
        return res.status(400).json({
          error: "Community Edition only supports .cube → .3dl conversion"
        });
      }

      // Convert to target format
      const converted = convertLUT(parsed, targetFormat);

      // Return the converted LUT file
      const filename = `${req.file.originalname.replace(/\.[^.]+$/, '')}.${targetFormat}`;
      
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
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

      // Simple banding detection
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
      
      // If more than 10% consecutive points are identical, consider it banding
      analysis.quality.bandingDetected = bandingScore > parsed.lut.data.length * 0.1;

      res.json(analysis);
    } catch (error) {
      console.error("LUT analysis error:", error);
      res.status(500).json({ error: "Failed to analyze LUT file" });
    }
  });

  // Profile image upload endpoint
  app.post("/api/profile/upload-image", upload.single("image"), async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Authentication required" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }

      const imageType = req.body.type; // 'avatar' or 'banner'
      
      if (!imageType || !['avatar', 'banner'].includes(imageType)) {
        return res.status(400).json({ error: "Invalid image type. Must be 'avatar' or 'banner'" });
      }

      // Resize based on type
      let processedImage;
      if (imageType === 'avatar') {
        processedImage = await sharp(req.file.buffer)
          .resize(200, 200, { fit: 'cover' })
          .jpeg({ quality: 90 })
          .toBuffer();
      } else {
        processedImage = await sharp(req.file.buffer)
          .resize(1200, 300, { fit: 'cover' })
          .jpeg({ quality: 90 })
          .toBuffer();
      }

      const base64Image = `data:image/jpeg;base64,${processedImage.toString('base64')}`;

      const { storage } = await import("./storage");
      const updates = imageType === 'avatar' 
        ? { avatarUrl: base64Image }
        : { bannerUrl: base64Image };
      
      const updatedUser = await storage.updateUserProfile(req.user!.id, updates);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ 
        imageUrl: base64Image,
        message: `${imageType === 'avatar' ? 'Avatar' : 'Banner'} updated successfully`
      });
    } catch (error) {
      console.error("Profile image upload error:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  // Update profile endpoint
  app.patch("/api/profile", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { bio, website, twitter, instagram, linkedin } = req.body;
      
      const updates: any = {};
      if (bio !== undefined) updates.bio = bio;
      if (website !== undefined) updates.website = website;
      if (twitter !== undefined) updates.twitter = twitter;
      if (instagram !== undefined) updates.instagram = instagram;
      if (linkedin !== undefined) updates.linkedin = linkedin;

      const { storage } = await import("./storage");
      const updatedUser = await storage.updateUserProfile(req.user!.id, updates);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ 
        message: "Profile updated successfully",
        user: updatedUser
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
