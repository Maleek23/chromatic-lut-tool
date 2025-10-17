import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { analyzeImage } from "./utils/colorAnalysis";
import { generateLUT, applyLUTToImage } from "./utils/lutGenerator";
import { lutGenerationSchema } from "@shared/schema";

const upload = multer({ storage: multer.memoryStorage() });

// Cache LUT maps for preview generation
const lutCache = new Map<string, { map: Map<string, any>, gridSize: number }>();

export async function registerRoutes(app: Express): Promise<Server> {
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
      const { imageData, gridSize, intensity } = req.body;

      if (!imageData || !gridSize || intensity === undefined) {
        return res.status(400).json({ error: "Missing parameters" });
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
      res.status(500).json({ error: "Failed to generate preview" });
    }
  });

  // Generate LUT endpoint
  app.post("/api/generate-lut", async (req, res) => {
    try {
      const validationResult = lutGenerationSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validationResult.error 
        });
      }

      const { imageData, gridSize, intensity, format } = validationResult.data;

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Generate LUT
      const lutData = await generateLUT(
        imageBuffer,
        parseInt(gridSize),
        intensity,
        format
      );

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `color_grade_${timestamp}_${gridSize}x${gridSize}x${gridSize}.${format}`;

      res.json({
        lutData,
        filename,
        format,
        gridSize,
      });
    } catch (error) {
      console.error("LUT generation error:", error);
      res.status(500).json({ error: "Failed to generate LUT" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
