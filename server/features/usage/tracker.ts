import { User } from "@shared/schema";
import { storage } from "../storage";

// Free tier: 3 monthly generations (resets on the 1st of each month)
// After limit: $2.50 per additional LUT (pay-per-use)
// Paid tiers: Unlimited
const FREE_TIER_MONTHLY_LIMIT = 3;
const PAY_PER_USE_PRICE = 2.50;

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

  // If at or over the monthly limit, require payment ($2.50 per LUT)
  return {
    allowed: false,
    requiresPayment: true,
    paymentAmount: PAY_PER_USE_PRICE,
    reason: `You've used all ${FREE_TIER_MONTHLY_LIMIT} free generations this month. Pay $${PAY_PER_USE_PRICE} for this LUT, or upgrade to Creator ($7/mo) for unlimited generations.`,
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
  payPerUse: boolean;
  pricePerUse?: number;
} {
  if (tier === "free") {
    return {
      limit: FREE_TIER_MONTHLY_LIMIT,
      unlimited: false,
      monthlyReset: true,
      payPerUse: true,
      pricePerUse: PAY_PER_USE_PRICE
    };
  }
  
  return {
    limit: -1,
    unlimited: true,
    monthlyReset: false,
    payPerUse: false
  };
}
