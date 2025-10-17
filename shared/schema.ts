import { z } from "zod";

// LUT Analysis Response Schema
export const lutAnalysisSchema = z.object({
  dominantColors: z.array(z.object({
    rgb: z.tuple([z.number(), z.number(), z.number()]),
    hex: z.string(),
    percentage: z.number(),
  })),
  averageBrightness: z.number(),
  averageSaturation: z.number(),
  rgbHistogram: z.object({
    red: z.array(z.number()),
    green: z.array(z.number()),
    blue: z.array(z.number()),
  }),
});

export type LutAnalysis = z.infer<typeof lutAnalysisSchema>;

// LUT Generation Request Schema
export const lutGenerationSchema = z.object({
  imageData: z.string(), // base64 encoded image
  gridSize: z.enum(["17", "33", "65"]),
  intensity: z.number().min(0).max(100),
  format: z.enum(["cube", "3dl"]),
});

export type LutGenerationRequest = z.infer<typeof lutGenerationSchema>;

// LUT Generation Response Schema
export const lutResponseSchema = z.object({
  lutData: z.string(), // LUT file content
  filename: z.string(),
  format: z.string(),
  gridSize: z.string(),
});

export type LutResponse = z.infer<typeof lutResponseSchema>;
