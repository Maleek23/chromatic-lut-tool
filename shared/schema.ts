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

// Advanced Color Controls Schema
export const advancedControlsSchema = z.object({
  shadows: z.object({
    brightness: z.number().min(-100).max(100).default(0),
    saturation: z.number().min(-100).max(100).default(0),
    hue: z.number().min(-180).max(180).default(0),
  }).default({ brightness: 0, saturation: 0, hue: 0 }),
  midtones: z.object({
    brightness: z.number().min(-100).max(100).default(0),
    saturation: z.number().min(-100).max(100).default(0),
    hue: z.number().min(-180).max(180).default(0),
  }).default({ brightness: 0, saturation: 0, hue: 0 }),
  highlights: z.object({
    brightness: z.number().min(-100).max(100).default(0),
    saturation: z.number().min(-100).max(100).default(0),
    hue: z.number().min(-180).max(180).default(0),
  }).default({ brightness: 0, saturation: 0, hue: 0 }),
  temperature: z.number().min(-100).max(100).default(0),
  tint: z.number().min(-100).max(100).default(0),
  splitToning: z.object({
    shadowColor: z.string().default("#000000"),
    highlightColor: z.string().default("#ffffff"),
    balance: z.number().min(0).max(100).default(50),
  }).default({ shadowColor: "#000000", highlightColor: "#ffffff", balance: 50 }),
});

export type AdvancedControls = z.infer<typeof advancedControlsSchema>;

// Preset Schema
export const presetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  controls: advancedControlsSchema,
  intensity: z.number().min(0).max(100).default(100),
  isCustom: z.boolean().default(false),
  thumbnail: z.string().optional(),
});

export type Preset = z.infer<typeof presetSchema>;

// Extended LUT Generation with Advanced Controls
export const extendedLutGenerationSchema = lutGenerationSchema.extend({
  advancedControls: advancedControlsSchema.optional(),
  presetId: z.string().optional(),
});

// Batch Image Schema
export const batchImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  imageData: z.string(), // base64 encoded image
  previewData: z.string().optional(), // preview with LUT applied
});

export type BatchImage = z.infer<typeof batchImageSchema>;

// Batch LUT Request Schema
export const batchLutRequestSchema = z.object({
  images: z.array(batchImageSchema),
  gridSize: z.enum(["17", "33", "65"]),
  intensity: z.number().min(0).max(100),
  format: z.enum(["cube", "3dl"]),
  advancedControls: advancedControlsSchema.optional(),
  presetId: z.string().optional(),
});

export type BatchLutRequest = z.infer<typeof batchLutRequestSchema>;
