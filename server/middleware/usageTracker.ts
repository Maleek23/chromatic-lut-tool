import { User } from "@shared/schema";
import { storage } from "../storage";

// Free tier: 5 monthly generations (resets on the 1st of each month)
// Paid tiers: Unlimited
const FREE_TIER_MONTHLY_LIMIT = 5;

export async function checkUsageLimit(user: User): Promise<{
  allowed: boolean;
  requiresPayment?: boolean;
  paymentAmount?: number;
  reason?: string;
  currentUsage?: number;
  limit?: number;
}> {
  const tier = user.tier as string;

  // Paid tiers have unlimited generations
  if (tier !== "free") {
    return {
      allowed: true,
      currentUsage: user.conversionsThisMonth || 0,
      limit: -1 // Unlimited
    };
  }

  // Free tier: check monthly conversions
  const monthlyUsed = user.conversionsThisMonth || 0;

  // If under the monthly limit, allow
  if (monthlyUsed < FREE_TIER_MONTHLY_LIMIT) {
    return {
      allowed: true,
      currentUsage: monthlyUsed,
      limit: FREE_TIER_MONTHLY_LIMIT
    };
  }

  // If at or over the monthly limit, block (no pay-per-use)
  return {
    allowed: false,
    requiresPayment: false, // Changed: no more $5 per LUT
    reason: `You've reached your monthly limit of ${FREE_TIER_MONTHLY_LIMIT} generations. Upgrade to Creator ($7/mo) for unlimited generations, or wait until next month.`,
    currentUsage: monthlyUsed,
    limit: FREE_TIER_MONTHLY_LIMIT
  };
}

export async function incrementUsage(userId: number): Promise<void> {
  await storage.incrementConversions(userId);
}

export function getUsageLimits(tier: string): { 
  limit: number; 
  unlimited: boolean;
  monthlyReset: boolean;
} {
  if (tier === "free") {
    return {
      limit: FREE_TIER_MONTHLY_LIMIT,
      unlimited: false,
      monthlyReset: true
    };
  }
  
  return {
    limit: -1,
    unlimited: true,
    monthlyReset: false
  };
}
