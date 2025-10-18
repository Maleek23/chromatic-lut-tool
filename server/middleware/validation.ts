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
  pro: 50 * 1024 * 1024, // 50MB
  studio: 500 * 1024 * 1024, // 500MB
};

// Feature limits by tier
export const TIER_FEATURES = {
  free: {
    // LUT Generation
    gridSizes: ["17"], // Only 17x17x17
    outputFormats: ["cube"], // Only .cube export
    precision: ["8", "10", "12"], // All precision levels
    
    // Conversion - Directional limits
    conversionSourceFormats: ["cube"], // Can convert FROM .cube only
    conversionDestFormats: ["3dl"], // Can convert TO .3dl only
    
    // Analysis
    analysisFeatures: {
      bandingDetection: true, // Preview only
      fullAnalysis: false,
      qualityMetrics: false,
    },
    
    // Presets
    savedPresets: 0, // Cannot save presets
    
    // Batch
    batchSize: 1,
  },
  pro: {
    // LUT Generation
    gridSizes: ["17", "33", "65"], // All grid sizes
    outputFormats: ["cube", "3dl", "lut"], // All formats
    precision: ["8", "10", "12"],
    
    // Conversion - Bidirectional
    conversionSourceFormats: ["cube", "3dl", "lut"], // Can convert FROM any format
    conversionDestFormats: ["cube", "3dl", "lut"], // Can convert TO any format
    
    // Analysis
    analysisFeatures: {
      bandingDetection: true,
      fullAnalysis: true,
      qualityMetrics: true,
    },
    
    // Presets
    savedPresets: Infinity, // Unlimited presets
    
    // Batch
    batchSize: 10,
  },
  studio: {
    // Everything in Pro, plus:
    gridSizes: ["17", "33", "65"],
    outputFormats: ["cube", "3dl", "lut"],
    precision: ["8", "10", "12"],
    conversionSourceFormats: ["cube", "3dl", "lut"],
    conversionDestFormats: ["cube", "3dl", "lut"],
    analysisFeatures: {
      bandingDetection: true,
      fullAnalysis: true,
      qualityMetrics: true,
    },
    savedPresets: Infinity,
    batchSize: Infinity,
  },
};

// Helper to check if a feature is available for a tier
export function hasFeature(tier: "free" | "pro" | "studio", feature: string, value?: string): boolean {
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
export function canConvert(tier: "free" | "pro" | "studio", sourceFormat: string, destFormat: string): boolean {
  const features = TIER_FEATURES[tier];
  return features.conversionSourceFormats.includes(sourceFormat) && 
         features.conversionDestFormats.includes(destFormat);
}
