import { z } from "zod";
import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// User Schema - Community Edition (Simplified)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // Profile personalization fields
  avatarUrl: text("avatar_url"),
  bannerUrl: text("banner_url"),
  bio: text("bio"),
  website: text("website"),
  twitter: text("twitter"),
  instagram: text("instagram"),
  linkedin: text("linkedin"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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

// LUT Generation Request Schema - Community Edition (17x17x17 only, .cube only)
export const lutGenerationSchema = z.object({
  imageData: z.string(), // base64 encoded image
  gridSize: z.literal("17"), // Locked to 17x17x17 in Community Edition
  intensity: z.number().min(0).max(100),
  format: z.literal("cube"), // Locked to .cube in Community Edition
  precision: z.enum(["8", "10", "12"]).default("10"),
  exportPreview: z.boolean().default(false),
});

export type LutGenerationRequest = z.infer<typeof lutGenerationSchema>;

// LUT Generation Response Schema
export const lutResponseSchema = z.object({
  lutData: z.string(), // LUT file content
  filename: z.string(),
  format: z.string(),
  gridSize: z.string(),
  previewData: z.string().optional(), // base64 preview image if exportPreview was true
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

// Extended LUT Generation Schema (with advanced controls)
export const extendedLutGenerationSchema = lutGenerationSchema.extend({
  advancedControls: advancedControlsSchema.optional(),
});

export type ExtendedLutGenerationRequest = z.infer<typeof extendedLutGenerationSchema>;

// Batch LUT Generation Schema
export const batchLutRequestSchema = z.object({
  images: z.array(z.object({
    imageData: z.string(),
    name: z.string(),
  })),
  gridSize: z.literal("17"),
  intensity: z.number().min(0).max(100),
  format: z.literal("cube"),
  precision: z.enum(["8", "10", "12"]).default("10"),
});

export type BatchLutRequest = z.infer<typeof batchLutRequestSchema>;

// Profile Update Schema
export const profileUpdateSchema = z.object({
  avatarUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal("")),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
