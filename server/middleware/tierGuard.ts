import { Request, Response, NextFunction } from "express";
import { User } from "@shared/schema";

export type Tier = "free" | "pro" | "studio";

const TIER_HIERARCHY: Record<Tier, number> = {
  free: 0,
  pro: 1,
  studio: 2,
};

export function hasTier(userTier: string, requiredTier: Tier): boolean {
  const userLevel = TIER_HIERARCHY[userTier as Tier] ?? 0;
  const requiredLevel = TIER_HIERARCHY[requiredTier];
  return userLevel >= requiredLevel;
}

export function requireTier(minTier: Tier) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ 
        error: "Authentication required",
        upgradeRequired: false
      });
    }

    const user = req.user as User;
    
    // Check if tier has expired
    if (user.tierExpiresAt && new Date(user.tierExpiresAt) < new Date()) {
      return res.status(403).json({
        error: "Your subscription has expired",
        upgradeRequired: true,
        requiredTier: minTier,
        currentTier: "free"
      });
    }

    if (!hasTier(user.tier, minTier)) {
      return res.status(403).json({
        error: `This feature requires ${minTier} tier or higher`,
        upgradeRequired: true,
        requiredTier: minTier,
        currentTier: user.tier
      });
    }

    next();
  };
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}
