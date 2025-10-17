import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { analyzeImage } from "./utils/colorAnalysis";
import { generateLUT } from "./utils/lutGenerator";
import { lutGenerationSchema } from "@shared/schema";

const upload = multer({ storage: multer.memoryStorage() });

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
