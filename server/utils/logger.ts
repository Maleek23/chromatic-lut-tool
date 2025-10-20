/**
 * Secure logging utility that respects environment mode
 * Only logs in development, sanitizes in production
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * Development-only logging - never logs in production
   */
  dev: {
    log: (...args: any[]) => {
      if (isDevelopment) {
        console.log('[DEV]', ...args);
      }
    },
    error: (message: string, error?: any) => {
      if (isDevelopment) {
        console.error('[DEV ERROR]', message, error);
      }
    },
    warn: (...args: any[]) => {
      if (isDevelopment) {
        console.warn('[DEV WARN]', ...args);
      }
    }
  },

  /**
   * Production-safe logging - sanitizes sensitive data
   */
  error: (message: string, error?: any) => {
    // In production, only log the message, not the full error object
    if (isDevelopment) {
      console.error('[ERROR]', message, error);
    } else {
      console.error('[ERROR]', message);
    }
  },

  /**
   * Security/audit logging - always logs (for monitoring)
   */
  security: (message: string) => {
    console.log('[SECURITY]', message);
  },

  /**
   * Critical system errors that should always be logged
   */
  critical: (message: string, error?: any) => {
    console.error('[CRITICAL]', message, error?.message || error);
  }
};

/**
 * Sanitize error for user display - never expose internal details
 */
export function sanitizeErrorForUser(error: any): string {
  // Default user-friendly message
  const genericMessage = "An error occurred. Please try again.";

  // In development, show more details
  if (isDevelopment && error?.message) {
    return error.message;
  }

  // In production, only show generic message
  return genericMessage;
}

/**
 * Check if we should show detailed errors (development only)
 */
export function shouldShowDetailedErrors(): boolean {
  return isDevelopment;
}
