import { User } from "@shared/schema";
import { storage } from "../storage";

// Monthly limits per tier
const MONTHLY_LIMITS = {
  free: 5,
  creator: Infinity,
  pro: Infinity,
  studio: Infinity,
} as const;

export async function checkUsageLimit(user: User): Promise<{
  allowed: boolean;
  reason?: string;
  currentUsage?: number;
  limit?: number;
}> {
  const tier = user.tier as keyof typeof MONTHLY_LIMITS;
  const limit = MONTHLY_LIMITS[tier] || MONTHLY_LIMITS.free;

  // Check if we need to reset monthly counters
  const now = new Date();
  const lastReset = new Date(user.lastResetDate);
  const monthsSinceReset = (now.getFullYear() - lastReset.getFullYear()) * 12 + 
    (now.getMonth() - lastReset.getMonth());

  let currentUsage = user.conversionsThisMonth || 0;

  if (monthsSinceReset > 0) {
    await storage.resetMonthlyLimits(user.id);
    currentUsage = 0;
  }

  // Check if user has reached their limit
  if (currentUsage >= limit) {
    return {
      allowed: false,
      reason: `You've reached your monthly limit of ${limit} Image-to-LUT generations. Upgrade to Creator tier for unlimited generations.`,
      currentUsage,
      limit
    };
  }

  return {
    allowed: true,
    currentUsage,
    limit
  };
}

export async function incrementUsage(userId: number): Promise<void> {
  await storage.incrementConversions(userId);
}

export function getUsageLimits(tier: string): { monthlyLimit: number; unlimited: boolean } {
  const tierKey = tier as keyof typeof MONTHLY_LIMITS;
  const monthlyLimit = MONTHLY_LIMITS[tierKey] || MONTHLY_LIMITS.free;
  
  return {
    monthlyLimit,
    unlimited: monthlyLimit === Infinity
  };
}
