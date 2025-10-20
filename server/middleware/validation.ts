import { z } from "zod";

// Password complexity requirements
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// Validate password complexity
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const result = passwordSchema.safeParse(password);
  
  if (result.success) {
    return { valid: true, errors: [] };
  }
  
  return {
    valid: false,
    errors: result.error.errors.map((err) => err.message),
  };
}

// File size limits based on tier (in bytes)
export const FILE_SIZE_LIMITS = {
  free: 5 * 1024 * 1024, // 5MB
  creator: 25 * 1024 * 1024, // 25MB
  pro: 50 * 1024 * 1024, // 50MB
  studio: 100 * 1024 * 1024, // 100MB
};

// Feature limits by tier
export const TIER_FEATURES = {
  free: {
    // LUT Generation
    gridSizes: ["17"], // Only 17x17x17
    outputFormats: [".cube"], // Only .cube export
    precision: ["8", "10", "12"], // All precision levels
    
    // Conversion - Can convert supported formats TO .cube only
    conversionSourceFormats: [".cube", ".3dl", ".lut", ".look"], // Can convert FROM any standard format
    conversionDestFormats: [".cube"], // Can convert TO .cube only
    
    // Analysis
    analysisFeatures: {
      bandingDetection: true, // Preview only
      fullAnalysis: false,
      qualityMetrics: false,
    },
    
    // Presets
    savedPresets: 3, // 1-3 presets saved
    
    // Batch
    batchSize: 1,
    
    // Special Features
    folderOrganization: false,
    priorityQueue: false,
    lightroomPresets: false,
    customBranding: false,
    teamSharing: false,
    aiGrading: false,
  },
  creator: {
    // Creator/Plus tier ($6-7/mo)
    gridSizes: ["17", "33"], // Up to 33x33x33
    outputFormats: [".cube", ".3dl", ".look"], // 3 professional formats
    precision: ["8", "10", "12"],
    
    // Conversion - Can convert FROM/TO .cube, .3dl, and .look
    conversionSourceFormats: [".cube", ".3dl", ".look"],
    conversionDestFormats: [".cube", ".3dl", ".look"],
    
    // Analysis
    analysisFeatures: {
      bandingDetection: true,
      fullAnalysis: false,
      qualityMetrics: false,
    },
    
    // Presets
    savedPresets: 30, // 20-30 presets
    
    // Batch
    batchSize: 3, // Small batch
    
    // Special Features
    folderOrganization: true,
    priorityQueue: true,
    lightroomPresets: true, // Early access
    customBranding: false,
    teamSharing: false,
    aiGrading: false,
  },
  pro: {
    // LUT Generation
    gridSizes: ["17", "33", "65"], // All grid sizes
    outputFormats: [".cube", ".3dl", ".lut", ".look", ".xmp"], // All 5 formats
    precision: ["8", "10", "12"],
    
    // Conversion - Bidirectional (note: .xmp is export-only, not convertible)
    conversionSourceFormats: [".cube", ".3dl", ".lut", ".look"], // Can convert FROM any standard format
    conversionDestFormats: [".cube", ".3dl", ".lut", ".look"], // Can convert TO any standard format
    
    // Analysis
    analysisFeatures: {
      bandingDetection: true,
      fullAnalysis: true,
      qualityMetrics: true,
    },
    
    // Presets
    savedPresets: Infinity, // Unlimited presets
    
    // Batch
    batchSize: 10, // Batch processing
    
    // Special Features
    folderOrganization: true,
    priorityQueue: true,
    lightroomPresets: true,
    customBranding: false,
    teamSharing: false,
    aiGrading: false,
  },
  studio: {
    // Everything in Pro, plus enterprise features
    gridSizes: ["17", "33", "65"],
    outputFormats: [".cube", ".3dl", ".lut", ".look", ".xmp"], // All 5 formats
    precision: ["8", "10", "12"],
    conversionSourceFormats: [".cube", ".3dl", ".lut", ".look"], // .xmp is export-only
    conversionDestFormats: [".cube", ".3dl", ".lut", ".look"], // .xmp is export-only
    analysisFeatures: {
      bandingDetection: true,
      fullAnalysis: true,
      qualityMetrics: true,
    },
    savedPresets: Infinity,
    batchSize: Infinity,
    
    // Special Features
    folderOrganization: true,
    priorityQueue: true,
    lightroomPresets: true,
    customBranding: true, // Custom branded LUTs
    teamSharing: true, // Team preset sharing
    aiGrading: true, // AI grading features
  },
};

// Helper to check if a feature is available for a tier
export function hasFeature(tier: "free" | "creator" | "pro" | "studio", feature: string, value?: string): boolean {
  const features = TIER_FEATURES[tier];
  
  if (feature === "gridSize") {
    return features.gridSizes.includes(value || "");
  }
  
  if (feature === "outputFormat") {
    return features.outputFormats.includes(value || "");
  }
  
  if (feature === "conversionSourceFormat") {
    return features.conversionSourceFormats.includes(value || "");
  }
  
  if (feature === "conversionDestFormat") {
    return features.conversionDestFormats.includes(value || "");
  }
  
  if (feature === "fullAnalysis") {
    return features.analysisFeatures.fullAnalysis;
  }
  
  return false;
}

// Helper to validate conversion is allowed for tier
export function canConvert(tier: "free" | "creator" | "pro" | "studio", sourceFormat: string, destFormat: string): boolean {
  const features = TIER_FEATURES[tier];
  return features.conversionSourceFormats.includes(sourceFormat) && 
         features.conversionDestFormats.includes(destFormat);
}
