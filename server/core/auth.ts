// Reference: blueprint:javascript_auth_all_persistance
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { validatePassword } from "../middleware/validation";
import { authRateLimiter } from "../middleware/rateLimiter";
import { sendPasswordResetEmail } from "../features/email/passwordReset";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error("SESSION_SECRET environment variable is required");
  }

  const sessionSettings: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await storage.getUserByEmail(email);
        if (!user) {
          return done(null, false, { message: "Email not found. Please register first." });
        }
        if (!(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Incorrect password. Please try again." });
        }
        return done(null, user);
      }
    ),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  // Sanitize user object by removing password
  const sanitizeUser = (user: SelectUser): Omit<SelectUser, "password"> => {
    const { password, ...sanitized } = user;
    return sanitized;
  };

  app.post("/api/register", authRateLimiter, async (req, res, next) => {
    const existingUser = await storage.getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists. Please use a different email or sign in." });
    }

    // Validate password complexity
    const passwordValidation = validatePassword(req.body.password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ 
        error: "Password does not meet requirements",
        details: passwordValidation.errors 
      });
    }

    // Validate tier selection
    const tier = req.body.tier || "free";
    const allowedTiers = ["free", "creator", "pro"];
    if (!allowedTiers.includes(tier)) {
      return res.status(400).json({ 
        error: "Invalid tier selection",
        details: "Studio tier is coming soon. Please choose Free, Creator, or Pro." 
      });
    }

    const user = await storage.createUser({
      ...req.body,
      tier,
      password: await hashPassword(req.body.password),
    });

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(sanitizeUser(user));
    });
  });

  app.post("/api/login", authRateLimiter, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        const message = info?.message || "Invalid email or password";
        return res.status(401).json({ error: message });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(200).json(sanitizeUser(user));
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated() || !req.user) return res.sendStatus(401);
    res.json(sanitizeUser(req.user));
  });

  // Forgot password - request reset token
  app.post("/api/auth/forgot-password", authRateLimiter, async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      
      // Always return success to prevent email enumeration
      // But only send email if user exists
      if (user) {
        // Generate secure random token
        const resetToken = randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        // Store reset token
        await storage.createPasswordResetToken({
          userId: user.id,
          token: resetToken,
          expiresAt,
          used: false,
        });

        // Send reset email
        const emailResult = await sendPasswordResetEmail({
          to: user.email,
          resetToken,
          userName: user.username || user.email.split('@')[0],
        });

        if (!emailResult.success) {
          console.error('Failed to send password reset email:', emailResult.error);
        }
      }

      // Always return success message
      res.status(200).json({ 
        message: "If an account exists with that email, we've sent password reset instructions." 
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: "An error occurred. Please try again later." });
    }
  });

  // Reset password - complete reset with token
  app.post("/api/auth/reset-password", authRateLimiter, async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({ error: "Token and new password are required" });
      }

      // Validate new password
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.valid) {
        return res.status(400).json({ 
          error: "Password does not meet requirements",
          details: passwordValidation.errors 
        });
      }

      // Find and validate reset token
      const resetToken = await storage.getPasswordResetToken(token);

      if (!resetToken) {
        return res.status(400).json({ error: "Invalid or expired reset token" });
      }

      if (resetToken.used) {
        return res.status(400).json({ error: "This reset link has already been used" });
      }

      if (new Date() > resetToken.expiresAt) {
        return res.status(400).json({ error: "This reset link has expired. Please request a new one." });
      }

      // Hash new password
      const hashedPassword = await hashPassword(newPassword);

      // Update user's password
      await storage.updateUserPassword(resetToken.userId, hashedPassword);

      // Mark token as used
      await storage.markResetTokenUsed(resetToken.id);

      res.status(200).json({ message: "Password successfully reset. You can now login with your new password." });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: "An error occurred. Please try again later." });
    }
  });
}
