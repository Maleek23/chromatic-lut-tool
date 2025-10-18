import { TierType, TIER_CONFIG, getTierLimits, canUseGridSize, canUseFormat, canUseBatchProcessing, getMaxPresets, hasUnlimitedPresets, canSaveMorePresets, getUpgradeMessage } from "@shared/tiers";
import { useAuth } from "@/hooks/use-auth";

// Re-export for convenience
export { TIER_CONFIG, type TierType };

// Frontend-specific helpers
export function getUserTier(user: any | null): TierType {
  if (!user) return "free";
  return (user.tier as TierType) || "free";
}

export function canAccess(userTier: TierType, requiredTier: TierType): boolean {
  const hierarchy: Record<TierType, number> = {
    free: 0,
    creator: 1,
    pro: 2,
    studio: 3,
  };
  
  return hierarchy[userTier] >= hierarchy[requiredTier];
}

// Grid size helpers
export function getAvailableGridSizes(tier: TierType): Array<17 | 33 | 65> {
  return getTierLimits(tier).gridSizes;
}

export function isGridSizeAllowed(tier: TierType, gridSize: number): boolean {
  return canUseGridSize(tier, gridSize);
}

// Format helpers
export function getAvailableFormats(tier: TierType): Array<"cube" | "3dl" | "lut"> {
  return getTierLimits(tier).formats;
}

export function isFormatAllowed(tier: TierType, format: string): boolean {
  return canUseFormat(tier, format);
}

// Preset helpers
export function getPresetLimit(tier: TierType): number {
  return getMaxPresets(tier);
}

export function canSavePreset(tier: TierType, currentCount: number): boolean {
  return canSaveMorePresets(tier, currentCount);
}

export function isPresetLimitUnlimited(tier: TierType): boolean {
  return hasUnlimitedPresets(tier);
}

// Batch processing helpers
export function isBatchProcessingAllowed(tier: TierType): boolean {
  return canUseBatchProcessing(tier);
}

// Feature helpers
export function hasFolderOrganization(tier: TierType): boolean {
  return getTierLimits(tier).folderOrganization;
}

export function hasPriorityQueue(tier: TierType): boolean {
  return getTierLimits(tier).priorityQueue;
}

export function hasLightroomPresets(tier: TierType): boolean {
  return getTierLimits(tier).lightroomPresets;
}

export function hasCustomBranding(tier: TierType): boolean {
  return getTierLimits(tier).customBranding;
}

export function hasTeamSharing(tier: TierType): boolean {
  return getTierLimits(tier).teamSharing;
}

export function hasAIGrading(tier: TierType): boolean {
  return getTierLimits(tier).aiGrading;
}

// Upgrade message helpers
export function getGridSizeUpgradeMessage(tier: TierType, gridSize: number): string | null {
  if (isGridSizeAllowed(tier, gridSize)) return null;
  
  if (gridSize === 33 && tier === "free") {
    return "Unlock 33×33×33 grid with Creator tier or higher!";
  }
  if (gridSize === 65) {
    return "Unlock 65×65×65 grid with Pro tier or higher!";
  }
  return getUpgradeMessage("gridSize", tier);
}

export function getFormatUpgradeMessage(tier: TierType, format: string): string | null {
  if (isFormatAllowed(tier, format)) return null;
  
  if (format === "3dl" || format === "lut") {
    return "Access all LUT formats (.cube, .3dl, .lut) with Pro tier!";
  }
  return getUpgradeMessage("format", tier);
}

export function getBatchUpgradeMessage(tier: TierType): string | null {
  if (isBatchProcessingAllowed(tier)) return null;
  return "Process multiple images at once with Pro tier!";
}

export function getPresetUpgradeMessage(tier: TierType, currentCount: number): string | null {
  if (canSavePreset(tier, currentCount)) return null;
  
  const limit = getPresetLimit(tier);
  if (tier === "free") {
    return `You've reached your preset limit (${limit}). Upgrade to Creator for 30 presets or Pro for unlimited!`;
  }
  if (tier === "creator") {
    return `You've reached your preset limit (${limit}). Upgrade to Pro for unlimited presets!`;
  }
  return null;
}

// Tier display helpers
export function getTierDisplayName(tier: TierType): string {
  return getTierLimits(tier).displayName;
}

export function getTierPrice(tier: TierType): string {
  return getTierLimits(tier).price;
}

export function getTierFeatures(tier: TierType): string[] {
  return getTierLimits(tier).features;
}

// Get recommended upgrade tier for a feature
export function getRecommendedUpgradeTier(feature: string, currentTier: TierType): TierType | null {
  const featureToTier: Record<string, TierType> = {
    "gridSize33": "creator",
    "gridSize65": "pro",
    "allFormats": "pro",
    "batchProcessing": "pro",
    "unlimitedPresets": "pro",
    "customBranding": "studio",
    "teamSharing": "studio",
    "aiGrading": "studio",
  };
  
  const requiredTier = featureToTier[feature];
  if (!requiredTier) return null;
  if (canAccess(currentTier, requiredTier)) return null;
  return requiredTier;
}

// ==================== React Hooks ====================
// These hooks use the current authenticated user's tier

export function useHasGridSize(gridSize: number): boolean {
  const { user } = useAuth();
  const tier = getUserTier(user);
  return isGridSizeAllowed(tier, gridSize);
}

export function useHasFormat(format: string): boolean {
  const { user } = useAuth();
  const tier = getUserTier(user);
  return isFormatAllowed(tier, format);
}

export function useHasBatchProcessing(): boolean {
  const { user } = useAuth();
  const tier = getUserTier(user);
  return isBatchProcessingAllowed(tier);
}

export function useCanSavePreset(currentCount: number): boolean {
  const { user } = useAuth();
  const tier = getUserTier(user);
  return canSavePreset(tier, currentCount);
}
