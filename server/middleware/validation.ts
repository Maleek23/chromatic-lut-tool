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

// Usage limits
export const USAGE_LIMITS = {
  free: {
    conversionsPerMonth: 50,
    previewsPerDay: 3,
    savedPresets: 3,
    batchSize: 1,
  },
  pro: {
    conversionsPerMonth: Infinity,
    previewsPerDay: Infinity,
    savedPresets: Infinity,
    batchSize: 10,
  },
  studio: {
    conversionsPerMonth: Infinity,
    previewsPerDay: Infinity,
    savedPresets: Infinity,
    batchSize: Infinity,
  },
};
