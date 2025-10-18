export type TierType = "free" | "creator" | "pro" | "studio";

export interface TierLimits {
  name: string;
  displayName: string;
  price: string;
  priceMonthly?: number;
  priceYearly?: number;
  gridSizes: Array<17 | 33 | 65>;
  formats: Array<"cube" | "3dl" | "lut">;
  maxPresets: number;
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
    formats: ["cube"],
    maxPresets: 3,
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
      "Basic LUT conversions (.cube only)",
      "1–3 presets saved",
      "Limited export quality (17×17×17 grid)",
      "Community presets access (read-only)",
    ],
  },
  creator: {
    name: "creator",
    displayName: "Creator",
    price: "$6–7/mo",
    priceMonthly: 7,
    gridSizes: [17, 33],
    formats: ["cube"],
    maxPresets: 30,
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
      "Everything in Free",
      "Full export quality up to 33×33×33",
      "Save 20–30 presets",
      "Organize folders / mini dashboard",
      "Priority export queue",
      "Early access to Lightroom-style presets",
    ],
  },
  pro: {
    name: "pro",
    displayName: "Pro",
    price: "$12/mo or $99/yr",
    priceMonthly: 12,
    priceYearly: 99,
    gridSizes: [17, 33, 65],
    formats: ["cube", "3dl", "lut"],
    maxPresets: -1, // Unlimited
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
      "Everything in Plus",
      "Unlimited grid sizes (17×17×17 → 65×65×65)",
      "All LUT conversions (.cube ↔ .3dl ↔ .lut)",
      "Unlimited preset library",
      "Batch processing",
      "Priority support",
    ],
  },
  studio: {
    name: "studio",
    displayName: "Studio",
    price: "$25/mo",
    priceMonthly: 25,
    gridSizes: [17, 33, 65],
    formats: ["cube", "3dl", "lut"],
    maxPresets: -1, // Unlimited
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
      "Custom branded LUTs",
      "Team preset sharing",
      "Collaboration dashboard",
      "Early access to AI grading",
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
  return limits.formats.includes(format as "cube" | "3dl" | "lut");
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

export function getUpgradeMessage(feature: string, currentTier: TierType): string {
  const messages: Record<string, string> = {
    gridSize: "Unlock higher precision exports with Creator or Pro tier!",
    format: "Access all LUT formats (.cube, .3dl, .lut) with Pro tier!",
    batch: "Process multiple images at once with Pro tier!",
    presets: `You've reached your preset limit (${getMaxPresets(currentTier)}). Upgrade to save more!`,
    branding: "Create custom branded LUTs with Studio tier!",
    team: "Share presets with your team using Studio tier!",
    ai: "Access AI-powered grading with Studio tier!",
  };
  return messages[feature] || "Upgrade to unlock this feature!";
}
