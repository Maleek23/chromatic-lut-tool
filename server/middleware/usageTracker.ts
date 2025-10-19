import { User } from "@shared/schema";
import { storage } from "../storage";

// Free tier: 3 lifetime generations, then $5 per LUT
// Paid tiers: Unlimited
const FREE_TIER_LIMIT = 3;

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

  // Free tier: check total conversions (lifetime)
  const totalUsed = user.totalConversions || 0;

  // If under the free limit, allow
  if (totalUsed < FREE_TIER_LIMIT) {
    return {
      allowed: true,
      currentUsage: totalUsed,
      limit: FREE_TIER_LIMIT
    };
  }

  // If at or over the free limit, require payment
  return {
    allowed: false,
    requiresPayment: true,
    paymentAmount: 5, // $5 per LUT
    reason: `You've used all ${FREE_TIER_LIMIT} free generations. Additional LUTs are $5 each, or upgrade to Creator tier for unlimited generations.`,
    currentUsage: totalUsed,
    limit: FREE_TIER_LIMIT
  };
}

export async function incrementUsage(userId: number): Promise<void> {
  await storage.incrementConversions(userId);
}

export function getUsageLimits(tier: string): { 
  limit: number; 
  unlimited: boolean;
  payPerUse: boolean;
  pricePerUse?: number;
} {
  if (tier === "free") {
    return {
      limit: FREE_TIER_LIMIT,
      unlimited: false,
      payPerUse: true,
      pricePerUse: 5
    };
  }
  
  return {
    limit: -1,
    unlimited: true,
    payPerUse: false
  };
}
