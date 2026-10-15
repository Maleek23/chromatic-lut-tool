export type TierType = "free" | "creator" | "pro" | "studio";

export interface TierLimits {
  name: string;
  displayName: string;
  price: string;
  priceMonthly?: number;
  priceYearly?: number;
  gridSizes: Array<17 | 33 | 65>;
  formats: Array<"cube" | "3dl" | "lut" | "look" | "xmp" | "dctl">;
  maxPresets: number;
  hasAnalyzer: boolean;
  hasOptimizer: boolean;
  batchProcessing: boolean;
  folderOrganization: boolean;
  customBranding: boolean;
  teamSharing: boolean;
  aiGrading: boolean;
  priorityQueue: boolean;
  prioritySupport: boolean;
  communityPresetsReadOnly: boolean;
  communityPresetsWrite: boolean;
  lightroomPresets: boolean;
  features: string[];
}

export const TIER_CONFIG: Record<TierType, TierLimits> = {
  free: {
    name: "free",
    displayName: "Free",
    price: "$0",
    priceMonthly: 0,
    gridSizes: [17],
    formats: ["cube"], // Free tier only gets .cube format output
    maxPresets: 3,
    hasAnalyzer: false,
    hasOptimizer: false,
    batchProcessing: false,
    folderOrganization: false,
    customBranding: false,
    teamSharing: false,
    aiGrading: false,
    priorityQueue: false,
    prioritySupport: false,
    communityPresetsReadOnly: true,
    communityPresetsWrite: false,
    lightroomPresets: false,
    features: [
      "3 Image-to-LUT generations per month",
      "$2.50 per additional LUT (pay-per-use)",
      "Resets on the 1st of each month",
      "17×17×17 grid size (Preview quality)",
      "Export: .cube format only",
      "Convert any LUT to .cube format",
      "25MB file size limit",
      "Save up to 3 LUTs",
      "Community presets access (read-only)",
    ],
  },
  creator: {
    name: "creator",
    displayName: "Creator",
    price: "$7/mo",
    priceMonthly: 7,
    gridSizes: [17, 33],
    formats: ["cube", "3dl", "look"], // Creator tier gets 3 export formats
    maxPresets: 30,
    hasAnalyzer: false,
    hasOptimizer: false,
    batchProcessing: false,
    folderOrganization: true,
    customBranding: false,
    teamSharing: false,
    aiGrading: false,
    priorityQueue: true,
    prioritySupport: false,
    communityPresetsReadOnly: true,
    communityPresetsWrite: false,
    lightroomPresets: true,
    features: [
      "Unlimited Image-to-LUT generations",
      "Video-to-LUT + before/after frame-pair solving",
      "Up to 33×33×33 grid size (Production quality)",
      "Export: .cube, .3dl, .look (3 formats)",
      "Convert between .cube, .3dl, and .look formats",
      "50MB file size limit",
      "Save up to 30 LUTs",
      "Organize in folders",
      "Priority export queue",
      "Lightroom-style presets (coming soon)",
    ],
  },
  pro: {
    name: "pro",
    displayName: "Pro",
    price: "$12/mo or $99/yr",
    priceMonthly: 12,
    priceYearly: 99,
    gridSizes: [17, 33, 65],
    formats: ["cube", "3dl", "lut", "look", "xmp", "dctl"], // Pro gets all formats
    maxPresets: -1, // Unlimited
    hasAnalyzer: true,
    hasOptimizer: true,
    batchProcessing: true,
    folderOrganization: true,
    customBranding: false,
    teamSharing: false,
    aiGrading: false,
    priorityQueue: true,
    prioritySupport: true,
    communityPresetsReadOnly: true,
    communityPresetsWrite: true,
    lightroomPresets: true,
    features: [
      "Everything in Creator",
      "Up to 65×65×65 grid size (Master quality)",
      "Export: all 6 formats incl. Resolve .dctl (.cube, .3dl, .lut, .look, .xmp, .dctl)",
      "Convert between any LUT formats",
      "100MB file size limit",
      "LUT Analyzer (quality scoring, banding detection)",
      "LUT Optimizer (fix invalid points)",
      "Unlimited saved LUTs",
      "Batch processing (10 files)",
      "Email delivery of LUT downloads",
      "Priority support",
    ],
  },
  studio: {
    name: "studio",
    displayName: "Studio",
    price: "$25/mo",
    priceMonthly: 25,
    gridSizes: [17, 33, 65],
    formats: ["cube", "3dl", "lut", "look", "xmp", "dctl"], // Studio gets all formats
    maxPresets: -1, // Unlimited
    hasAnalyzer: true,
    hasOptimizer: true,
    batchProcessing: true,
    folderOrganization: true,
    customBranding: true,
    teamSharing: true,
    aiGrading: true,
    priorityQueue: true,
    prioritySupport: true,
    communityPresetsReadOnly: true,
    communityPresetsWrite: true,
    lightroomPresets: true,
    features: [
      "Everything in Pro",
      "200MB file size limit",
      "Custom branded LUTs",
      "Team preset sharing",
      "Collaboration dashboard",
      "AI-powered color grading",
    ],
  },
};

export function getTierLimits(tier: TierType): TierLimits {
  return TIER_CONFIG[tier];
}

export function canUseGridSize(tier: TierType, gridSize: number): boolean {
  const limits = getTierLimits(tier);
  return limits.gridSizes.includes(gridSize as 17 | 33 | 65);
}

export function canUseFormat(tier: TierType, format: string): boolean {
  const limits = getTierLimits(tier);
  return limits.formats.includes(format as "cube" | "3dl" | "lut" | "look" | "xmp" | "dctl");
}

export function canUseBatchProcessing(tier: TierType): boolean {
  return getTierLimits(tier).batchProcessing;
}

export function getMaxPresets(tier: TierType): number {
  return getTierLimits(tier).maxPresets;
}

export function hasUnlimitedPresets(tier: TierType): boolean {
  return getTierLimits(tier).maxPresets === -1;
}

export function canSaveMorePresets(tier: TierType, currentCount: number): boolean {
  const max = getMaxPresets(tier);
  if (max === -1) return true; // Unlimited
  return currentCount < max;
}

export function canUseAnalyzer(tier: TierType): boolean {
  return getTierLimits(tier).hasAnalyzer;
}

export function canUseOptimizer(tier: TierType): boolean {
  return getTierLimits(tier).hasOptimizer;
}

export function getTierDisplayName(tier: TierType): string {
  return getTierLimits(tier).displayName;
}

export function getUpgradeMessage(feature: string, currentTier: TierType): string {
  const messages: Record<string, string> = {
    gridSize: "Unlock custom grid resampling (33³ or 65³) with Creator or Pro tier!",
    format: "All tiers export to industry-standard .cube format for maximum compatibility.",
    batch: "Process multiple images at once with Pro tier!",
    presets: `You've reached your preset limit (${getMaxPresets(currentTier)}). Upgrade to save more!`,
    analyzer: "Analyze LUT quality with banding detection and scoring on Pro tier!",
    optimizer: "Optimize and fix invalid LUT points with Pro tier!",
    branding: "Create custom branded LUTs with Studio tier!",
    team: "Share presets with your team using Studio tier!",
    ai: "Access AI-powered grading with Studio tier!",
  };
  return messages[feature] || "Upgrade to unlock this feature!";
}
