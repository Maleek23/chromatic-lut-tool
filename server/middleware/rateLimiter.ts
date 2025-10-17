import rateLimit from "express-rate-limit";
import { Request } from "express";
import { User } from "@shared/schema";

// Rate limit configuration based on tier
export const createRateLimiter = (tier: "free" | "pro" | "studio") => {
  const limits = {
    free: { windowMs: 15 * 60 * 1000, max: 20 }, // 20 requests per 15 minutes
    pro: { windowMs: 15 * 60 * 1000, max: 200 }, // 200 requests per 15 minutes
    studio: { windowMs: 15 * 60 * 1000, max: 1000 }, // 1000 requests per 15 minutes
  };

  return rateLimit({
    ...limits[tier],
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: `Rate limit exceeded for ${tier} tier`,
      upgradeRequired: tier === "free",
    },
  });
};

// Dynamic rate limiter based on user's tier
export const dynamicRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: Request) => {
    const user = req.user as User | undefined;
    
    if (!user) return 10; // Unauthenticated users: 10 requests
    
    switch (user.tier) {
      case "studio":
        return 1000;
      case "pro":
        return 200;
      case "free":
      default:
        return 20;
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
  message: (req: Request) => {
    const user = req.user as User | undefined;
    return {
      error: "Rate limit exceeded",
      upgradeRequired: !user || user.tier === "free",
      currentTier: user?.tier || "none",
    };
  },
});

// Auth-specific rate limiter (prevent brute force)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many authentication attempts, please try again later",
  },
});
