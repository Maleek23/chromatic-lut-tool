import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import JSZip from "jszip";
import sharp from "sharp";
import Stripe from "stripe";
import { analyzeImage } from "./utils/colorAnalysis";
import { generateLUT, applyLUTToImage } from "./utils/lutGenerator";
import { parseLUT, convertLUT, type ParsedLUT } from "./utils/lutParser";
import { lutGenerationSchema, extendedLutGenerationSchema, batchLutRequestSchema } from "@shared/schema";
import { setupAuth } from "./auth";
import { requireAuth, requireTier } from "./middleware/tierGuard";
import { dynamicRateLimiter } from "./middleware/rateLimiter";
import { hasFeature, canConvert } from "./middleware/validation";
import { checkUsageLimit, incrementUsage, getUsageLimits } from "./middleware/usageTracker";
import { sendLutEmail } from "./utils/email";

// Helper to normalize format strings for file extensions
const EXTENSION_MAP = {
  cube: ".cube",
  "3dl": ".3dl",
  lut: ".lut"
} as const;

// Configure multer with file validation
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'text/plain',           // .cube, .3dl
      'application/octet-stream', // generic
      'image/png',            // .png
      'image/jpeg',           // .jpg, .jpeg
      'video/mp4',            // .mp4
      'video/quicktime',      // .mov
      'video/x-msvideo'       // .avi
    ];
    
    const allowedExtensions = ['.cube', '.3dl', '.lut', '.png', '.jpg', '.jpeg', '.mp4', '.mov', '.avi'];
    const ext = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (allowedMimeTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Supported: .cube, .3dl, .lut, .png, .jpg, .mp4, .mov, .avi`));
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit for video files
  }
});

// Cache LUT maps for preview generation
const lutCache = new Map<string, { map: Map<string, any>, gridSize: number }>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Reference: blueprint:javascript_auth_all_persistance
  // Sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Get usage statistics for current user
  app.get("/api/usage", requireAuth, async (req, res) => {
    try {
      const user = req.user!;
      const limits = getUsageLimits(user.tier);

      // For free tier, use totalConversions for lifetime tracking
      // For paid tiers, conversionsThisMonth is still used for analytics
      const relevantUsage = user.tier === 'free' 
        ? (user.totalConversions || 0)
        : (user.conversionsThisMonth || 0);

      res.json({
        tier: user.tier,
        conversionsThisMonth: user.conversionsThisMonth || 0,
        totalConversions: user.totalConversions || 0,
        limit: limits.limit,
        unlimited: limits.unlimited,
        payPerUse: limits.payPerUse,
        pricePerUse: limits.pricePerUse,
        lastResetDate: user.lastResetDate,
        conversionsRemaining: limits.unlimited ? Infinity : Math.max(0, limits.limit - relevantUsage)
      });
    } catch (error) {
      console.error("Usage stats error:", error);
      res.status(500).json({ error: "Failed to get usage statistics" });
    }
  });

  // Reference: blueprint:javascript_stripe
  // Initialize Stripe (only if keys are present)
  let stripe: Stripe | null = null;
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
    });
  }

  // Create Stripe checkout session for Pro subscription
  app.post("/api/create-checkout-session", requireAuth, async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ error: "Payment processing not configured" });
      }

      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const user = req.user;
      const { storage } = await import("./storage");

      // Create or retrieve Stripe customer
      let customerId = user.stripeCustomerId;
      
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email || undefined,
          metadata: {
            userId: user.id.toString(),
            username: user.username,
          },
        });
        customerId = customer.id;
        await storage.updateUserStripeInfo(user.id, customerId, "");
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "CHROMA Pro",
                description: "Unlimited preset saving, priority support, and advanced features",
              },
              unit_amount: 1200, // $12.00
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin || 'http://localhost:5000'}/dashboard?upgrade=success`,
        cancel_url: `${req.headers.origin || 'http://localhost:5000'}/upgrade?canceled=true`,
        metadata: {
          userId: user.id.toString(),
        },
      });

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ error: error.message || "Failed to create checkout session" });
    }
  });

  // Stripe webhook handler for subscription events
  // Note: Must use raw body for webhook signature verification
  app.post("/api/stripe-webhook", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ error: "Payment processing not configured" });
    }

    const sig = req.headers['stripe-signature'];
    
    if (!sig) {
      return res.status(400).json({ error: "No signature" });
    }

    let event: Stripe.Event;

    try {
      // Verify webhook signature for security
      // In development without webhook secret, accept events directly (INSECURE - for testing only)
      if (process.env.STRIPE_WEBHOOK_SECRET) {
        // Production: Verify the signature
        const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        event = stripe.webhooks.constructEvent(
          rawBody,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } else {
        // Development only: Log warning and accept unverified events
        console.warn("⚠️  WARNING: STRIPE_WEBHOOK_SECRET not set - accepting unverified webhook events (INSECURE)");
        event = req.body as Stripe.Event;
      }
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const { storage } = await import("./storage");

    try {
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          
          if (userId && session.subscription) {
            const subscriptionId = typeof session.subscription === 'string' 
              ? session.subscription 
              : session.subscription.id;
            
            // Upgrade user to Pro tier
            await storage.updateUserTier(parseInt(userId), "pro", null);
            await storage.updateUserStripeInfo(
              parseInt(userId),
              session.customer as string,
              subscriptionId
            );
          }
          break;
        }

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer.id;

          // Find user by Stripe customer ID
          const user = await storage.getUserByStripeCustomerId(customerId);
          
          if (user && subscription.status !== 'active') {
            // Downgrade to free tier if subscription is not active
            await storage.updateUserTier(user.id, "free", null);
          }
          break;
        }

        case 'invoice.payment_failed': {
          const invoice = event.data.object as Stripe.Invoice;
          // Handle failed payment - could send email notification
          console.log("Payment failed for customer:", invoice.customer);
          break;
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Webhook handler error:", error);
      res.status(500).json({ error: "Webhook handler failed" });
    }
  });

  // Analyze image endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { imageData } = req.body;

      if (!imageData) {
        return res.status(400).json({ error: "No image data provided" });
      }

      // Validate base64 format
      if (!imageData.startsWith('data:image/')) {
        return res.status(400).json({ error: "Invalid image data format" });
      }

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Validate buffer size (max 25MB)
      const MAX_SIZE = 25 * 1024 * 1024;
      if (imageBuffer.length > MAX_SIZE) {
        return res.status(400).json({ error: "Image too large. Maximum size is 25MB" });
      }

      // Analyze the image (Sharp will validate the image format and size)
      const analysis = await analyzeImage(imageBuffer);

      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      const message = error instanceof Error ? error.message : "Failed to analyze image";
      res.status(500).json({ error: message });
    }
  });

  // Generate preview with LUT applied
  app.post("/api/preview", async (req, res) => {
    try {
      const { imageData, gridSize, intensity } = req.body;

      if (!imageData || !gridSize || intensity === undefined) {
        return res.status(400).json({ error: "Missing required parameters: imageData, gridSize, and intensity are required" });
      }

      // Validate parameters
      const validGridSizes = ["17", "33", "65"];
      if (!validGridSizes.includes(String(gridSize))) {
        return res.status(400).json({ error: "Invalid grid size. Must be 17, 33, or 65" });
      }

      if (intensity < 0 || intensity > 100) {
        return res.status(400).json({ error: "Invalid intensity. Must be between 0 and 100" });
      }

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Validate image before processing (consistent with /api/analyze)
      try {
        const tempImage = sharp(imageBuffer, { failOn: 'none' });
        const metadata = await tempImage.metadata();
        if (!metadata.width || !metadata.height) {
          return res.status(400).json({ error: "Invalid image: missing dimensions" });
        }
        if (metadata.width < 2 || metadata.height < 2) {
          return res.status(400).json({ error: "Image too small: minimum size is 2x2 pixels" });
        }
      } catch (validationError) {
        console.error("Image validation error:", validationError);
        return res.status(400).json({ error: "Invalid or corrupted image data" });
      }

      // Check cache or generate new LUT map (no advanced controls for image-to-LUT)
      const cacheKey = `${imageData.substring(0, 100)}_${gridSize}`;
      let lutData = lutCache.get(cacheKey);

      if (!lutData) {
        const { getLUTMap } = await import("./utils/lutGenerator");
        const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize));
        lutData = { map: lutMap, gridSize: parseInt(gridSize) };
        lutCache.set(cacheKey, lutData);
      }

      // Apply LUT to create preview
      const previewBuffer = await applyLUTToImage(
        imageBuffer,
        lutData.map,
        lutData.gridSize,
        parseInt(intensity)
      );

      // Return as base64
      const previewBase64 = `data:image/jpeg;base64,${previewBuffer.toString("base64")}`;
      res.json({ previewImage: previewBase64 });
    } catch (error) {
      console.error("Preview error:", error);
      const message = error instanceof Error ? error.message : "Failed to generate preview";
      res.status(500).json({ error: message });
    }
  });

  // Generate LUT endpoint
  app.post("/api/generate-lut", requireAuth, async (req, res) => {
    try {
      console.log("[DEBUG] generate-lut request body:", JSON.stringify(req.body, null, 2));
      
      const validationResult = extendedLutGenerationSchema.safeParse(req.body);

      if (!validationResult.success) {
        console.log("[DEBUG] Validation failed:", JSON.stringify(validationResult.error, null, 2));
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validationResult.error 
        });
      }

      const { imageData, gridSize, intensity, format, precision, exportPreview } = validationResult.data;

      const userTier = req.user!.tier as "free" | "pro" | "studio";

      // Check usage limits (before tier validation, but after request validation)
      const usageCheck = await checkUsageLimit(req.user!);
      if (!usageCheck.allowed) {
        return res.status(403).json({
          error: usageCheck.reason,
          upgradeRequired: true,
          requiredTier: "creator",
          requiresPayment: usageCheck.requiresPayment || false,
          paymentAmount: usageCheck.paymentAmount,
          currentUsage: usageCheck.currentUsage,
          limit: usageCheck.limit
        });
      }

      // Tier validation for grid size
      if (!hasFeature(userTier, "gridSize", gridSize)) {
        return res.status(403).json({
          error: `Grid size ${gridSize}×${gridSize}×${gridSize} requires Pro tier. Free tier is limited to 17×17×17.`,
          upgradeRequired: true,
          requiredTier: "pro"
        });
      }

      // Tier validation for output format
      if (!hasFeature(userTier, "outputFormat", format)) {
        return res.status(403).json({
          error: `Export format .${format} requires Pro tier. Free tier can only export .cube format.`,
          upgradeRequired: true,
          requiredTier: "pro"
        });
      }

      // Convert base64 to buffer
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      const imageBuffer = Buffer.from(base64Data, "base64");

      // Validate image before processing (consistent with /api/analyze)
      try {
        const tempImage = sharp(imageBuffer, { failOn: 'none' });
        const metadata = await tempImage.metadata();
        if (!metadata.width || !metadata.height) {
          return res.status(400).json({ error: "Invalid image: missing dimensions" });
        }
        if (metadata.width < 2 || metadata.height < 2) {
          return res.status(400).json({ error: "Image too small: minimum size is 2x2 pixels" });
        }
      } catch (validationError) {
        console.error("Image validation error:", validationError);
        return res.status(400).json({ error: "Invalid or corrupted image data" });
      }

      // Generate LUT from image analysis (no manual controls)
      const lutData = await generateLUT(
        imageBuffer,
        parseInt(gridSize),
        intensity,
        EXTENSION_MAP[format as keyof typeof EXTENSION_MAP] || ".cube",
        undefined, // No advanced controls - extract from image
        precision
      );

      const timestamp = new Date().toISOString().split("T")[0];
      const formatExt = format.replace(/^\./, ''); // Remove leading dot
      const filename = `color_grade_${timestamp}_${gridSize}x${gridSize}x${gridSize}.${formatExt}`;

      // Generate preview image if requested
      let previewData: string | undefined;
      if (exportPreview) {
        const { getLUTMap } = await import("./utils/lutGenerator");
        const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize));
        const previewBuffer = await applyLUTToImage(imageBuffer, lutMap, parseInt(gridSize), intensity);
        previewData = `data:image/jpeg;base64,${previewBuffer.toString("base64")}`;
      }

      // Increment usage counter only after successful generation
      await incrementUsage(req.user!.id);

      // Send email with LUT file attachment (async, don't wait)
      if (req.user!.email) {
        sendLutEmail({
          to: req.user!.email,
          lutData,
          filename,
          format,
          gridSize: `${gridSize}×${gridSize}×${gridSize}`,
        }).catch(error => {
          console.error('Failed to send LUT email (non-blocking):', error);
        });
      }

      res.json({
        lutData,
        filename,
        format,
        gridSize,
        previewData,
      });
    } catch (error) {
      console.error("LUT generation error:", error);
      res.status(500).json({ error: "Failed to generate LUT" });
    }
  });

  // Batch preview endpoint
  app.post("/api/batch-preview", async (req, res) => {
    try {
      const { images, gridSize, intensity, advancedControls } = req.body;

      if (!images || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ error: "No images provided" });
      }

      const controls = advancedControls;

      // Process each image
      const previews = await Promise.all(
        images.map(async (img: any) => {
          try {
            const base64Data = img.imageData.replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");

            // Get or create LUT map
            const cacheKey = `${img.id}_${gridSize}_${JSON.stringify(controls)}`;
            let lutData = lutCache.get(cacheKey);

            if (!lutData) {
              const { getLUTMap } = await import("./utils/lutGenerator");
              const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize), controls);
              lutData = { map: lutMap, gridSize: parseInt(gridSize) };
              lutCache.set(cacheKey, lutData);
            }

            // Apply LUT to create preview
            const previewBuffer = await applyLUTToImage(
              imageBuffer,
              lutData.map,
              lutData.gridSize,
              parseInt(intensity)
            );

            return {
              id: img.id,
              previewData: `data:image/jpeg;base64,${previewBuffer.toString("base64")}`,
            };
          } catch (error) {
            console.error(`Preview error for image ${img.id}:`, error);
            return {
              id: img.id,
              previewData: img.imageData, // fallback to original
            };
          }
        })
      );

      res.json({ previews });
    } catch (error) {
      console.error("Batch preview error:", error);
      res.status(500).json({ error: "Failed to generate batch previews" });
    }
  });

  // Batch download endpoint
  app.post("/api/batch-download", requireAuth, async (req, res) => {
    try {
      const validationResult = batchLutRequestSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validationResult.error 
        });
      }

      const { images, gridSize, intensity, format, advancedControls, precision, exportPreview } = validationResult.data;

      const userTier = req.user!.tier as "free" | "pro" | "studio";

      // Tier validation for grid size
      if (!hasFeature(userTier, "gridSize", gridSize)) {
        return res.status(403).json({
          error: `Grid size ${gridSize}×${gridSize}×${gridSize} requires Pro tier. Free tier is limited to 17×17×17.`,
          upgradeRequired: true,
          requiredTier: "pro"
        });
      }

      // Tier validation for output format
      if (!hasFeature(userTier, "outputFormat", format)) {
        return res.status(403).json({
          error: `Export format .${format} requires Pro tier. Free tier can only export .cube format.`,
          upgradeRequired: true,
          requiredTier: "pro"
        });
      }

      const controls = advancedControls;

      const zip = new JSZip();
      const timestamp = new Date().toISOString().split("T")[0];

      // Generate LUT for each image
      await Promise.all(
        images.map(async (img, index) => {
          try {
            const base64Data = img.imageData.replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");

            const lutData = await generateLUT(
              imageBuffer,
              parseInt(gridSize),
              intensity,
              EXTENSION_MAP[format as keyof typeof EXTENSION_MAP] || ".cube",
              controls,
              precision
            );

            const imageName = img.name.replace(/\.[^/.]+$/, ""); // Remove extension
            const filename = `${imageName}_${timestamp}.${format}`;
            zip.file(filename, lutData);

            // Add preview image if requested
            if (exportPreview) {
              const { getLUTMap } = await import("./utils/lutGenerator");
              const lutMap = await getLUTMap(imageBuffer, parseInt(gridSize), controls);
              const previewBuffer = await applyLUTToImage(imageBuffer, lutMap, parseInt(gridSize), intensity);
              const previewFilename = `${imageName}_${timestamp}_preview.jpg`;
              zip.file(previewFilename, previewBuffer);
            }
          } catch (error) {
            console.error(`LUT generation error for image ${img.id}:`, error);
          }
        })
      );

      // Generate ZIP file
      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

      // Send ZIP file
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="lut_batch_${timestamp}.zip"`);
      res.send(zipBuffer);
    } catch (error) {
      console.error("Batch download error:", error);
      res.status(500).json({ error: "Failed to generate batch download" });
    }
  });

  // Parse LUT file endpoint
  app.post("/api/lut/parse", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString('utf-8');
      const format = req.body.format as 'cube' | '3dl' | undefined;
      
      const parsed = parseLUT(content, format);

      res.json({
        success: parsed.errors.length === 0,
        format: parsed.format,
        size: parsed.lut.size,
        title: parsed.lut.title,
        errors: parsed.errors,
        warnings: parsed.warnings,
        dataPoints: parsed.lut.data.length
      });
    } catch (error) {
      console.error("LUT parse error:", error);
      res.status(500).json({ error: "Failed to parse LUT file" });
    }
  });

  // Convert LUT format endpoint
  app.post("/api/lut/convert", requireAuth, dynamicRateLimiter, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString('utf-8');
      const sourceFormat = req.body.sourceFormat as 'cube' | '3dl' | 'lut' | undefined;
      // Normalize target format (remove leading dot if present)
      const targetFormatRaw = req.body.targetFormat;
      const targetFormat = (targetFormatRaw?.startsWith('.') 
        ? targetFormatRaw.substring(1) 
        : targetFormatRaw) as 'cube' | '3dl' | 'lut';
      const gridSize = req.body.gridSize ? parseInt(req.body.gridSize) : undefined;

      if (!targetFormat || !['cube', '3dl', 'lut'].includes(targetFormat)) {
        return res.status(400).json({ error: "Target format required (cube, 3dl, or lut)" });
      }

      // Parse source LUT first to detect actual format
      const parsed = parseLUT(content, sourceFormat);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      // Tier validation for conversion direction
      const userTier = req.user!.tier as "free" | "pro" | "studio";
      const actualSourceFormat = parsed.format;
      if (!canConvert(userTier, actualSourceFormat, targetFormat)) {
        return res.status(403).json({
          error: `Converting .${actualSourceFormat} → .${targetFormat} requires Pro tier. Free tier can only convert .cube → .3dl`,
          upgradeRequired: true,
          requiredTier: "pro"
        });
      }

      // Backend tier validation for grid size resampling (Pro feature)
      if (gridSize) {
        const { hasTier } = await import("./middleware/tierGuard");
        if (!hasTier(userTier, "pro")) {
          return res.status(403).json({
            error: "Grid size resampling requires Pro tier",
            upgradeRequired: true,
            requiredTier: "pro"
          });
        }

        // Validate grid size values
        if (![17, 33, 65].includes(gridSize)) {
          return res.status(400).json({ error: "Invalid grid size. Must be 17, 33, or 65" });
        }
      }

      // Convert to target format with optional grid size resampling
      const converted = convertLUT(parsed, targetFormat, gridSize);

      // Track usage
      const { storage } = await import("./storage");
      await storage.incrementConversions(req.user!.id);

      // Generate filename
      const originalName = req.file.originalname.replace(/\.[^/.]+$/, "");
      const timestamp = new Date().toISOString().split("T")[0];
      const gridSuffix = gridSize ? `_${gridSize}` : "";
      const filename = `${originalName}_converted${gridSuffix}_${timestamp}.${targetFormat}`;

      // Send as download
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(converted);
    } catch (error) {
      console.error("LUT conversion error:", error);
      res.status(500).json({ error: "Failed to convert LUT file" });
    }
  });

  // Analyze LUT quality endpoint
  app.post("/api/lut/analyze", requireAuth, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString('utf-8');
      const format = req.body.format as 'cube' | '3dl' | undefined;
      
      const parsed = parseLUT(content, format);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      // Check tier for full analysis (Pro feature)
      const userTier = req.user!.tier as "free" | "creator" | "pro" | "studio";
      const { hasTier } = await import("./middleware/tierGuard");
      const hasFullAccess = hasTier(userTier, "pro");

      // Guard against empty LUTs
      if (parsed.lut.data.length === 0) {
        return res.status(400).json({
          error: "Invalid LUT file: no data points found"
        });
      }

      // Analyze quality issues
      const analysis = {
        format: parsed.format,
        size: parsed.lut.size,
        title: parsed.lut.title,
        totalPoints: parsed.lut.data.length,
        errors: parsed.errors,
        warnings: parsed.warnings,
        quality: {
          score: 0, // 0-100 quality score
          hasInvalidPoints: false,
          outOfRangeCount: 0,
          bandingDetected: false,
          bandingScore: 0,
          maxValue: 0,
          minValue: 1,
          avgValue: 0,
          rgbStats: {
            red: { min: 1, max: 0, avg: 0 },
            green: { min: 1, max: 0, avg: 0 },
            blue: { min: 1, max: 0, avg: 0 }
          }
        },
        fullAnalysis: hasFullAccess
      };

      // Check for invalid points and out-of-range values
      let sum = 0;
      let rSum = 0, gSum = 0, bSum = 0;
      
      for (const [r, g, b] of parsed.lut.data) {
        const values = [r, g, b];
        
        // Overall stats
        for (const v of values) {
          sum += v;
          
          if (v < 0 || v > 1) {
            analysis.quality.hasInvalidPoints = true;
            analysis.quality.outOfRangeCount++;
          }
          
          if (v > analysis.quality.maxValue) {
            analysis.quality.maxValue = v;
          }
          if (v < analysis.quality.minValue) {
            analysis.quality.minValue = v;
          }
        }

        // Per-channel stats (Pro feature)
        if (hasFullAccess) {
          rSum += r;
          gSum += g;
          bSum += b;

          if (r > analysis.quality.rgbStats.red.max) analysis.quality.rgbStats.red.max = r;
          if (r < analysis.quality.rgbStats.red.min) analysis.quality.rgbStats.red.min = r;
          
          if (g > analysis.quality.rgbStats.green.max) analysis.quality.rgbStats.green.max = g;
          if (g < analysis.quality.rgbStats.green.min) analysis.quality.rgbStats.green.min = g;
          
          if (b > analysis.quality.rgbStats.blue.max) analysis.quality.rgbStats.blue.max = b;
          if (b < analysis.quality.rgbStats.blue.min) analysis.quality.rgbStats.blue.min = b;
        }
      }

      analysis.quality.avgValue = sum / (parsed.lut.data.length * 3);

      if (hasFullAccess) {
        analysis.quality.rgbStats.red.avg = rSum / parsed.lut.data.length;
        analysis.quality.rgbStats.green.avg = gSum / parsed.lut.data.length;
        analysis.quality.rgbStats.blue.avg = bSum / parsed.lut.data.length;
      }

      // Banding detection: check for repeated consecutive values
      let bandingScore = 0;
      for (let i = 1; i < parsed.lut.data.length; i++) {
        const prev = parsed.lut.data[i - 1];
        const curr = parsed.lut.data[i];
        
        if (
          Math.abs(prev[0] - curr[0]) < 0.001 &&
          Math.abs(prev[1] - curr[1]) < 0.001 &&
          Math.abs(prev[2] - curr[2]) < 0.001
        ) {
          bandingScore++;
        }
      }
      
      analysis.quality.bandingScore = bandingScore;
      // If more than 10% of consecutive points are identical, consider it banding
      analysis.quality.bandingDetected = bandingScore > parsed.lut.data.length * 0.1;

      // Calculate overall quality score (0-100)
      let qualityScore = 100;
      
      // Deduct points for out-of-range values (up to -30 points)
      const outOfRangeRatio = analysis.quality.outOfRangeCount / (parsed.lut.data.length * 3);
      qualityScore -= Math.min(30, outOfRangeRatio * 100);
      
      // Deduct points for banding (up to -40 points)
      const bandingRatio = bandingScore / parsed.lut.data.length;
      qualityScore -= Math.min(40, bandingRatio * 200);
      
      // Deduct points for parsing errors/warnings (up to -30 points)
      qualityScore -= Math.min(30, (parsed.errors.length + parsed.warnings.length) * 10);
      
      analysis.quality.score = Math.max(0, Math.round(qualityScore));

      // Free tier only gets basic preview
      if (!hasFullAccess) {
        res.json({
          ...analysis,
          quality: {
            ...analysis.quality,
            rgbStats: undefined
          },
          upgradeMessage: "Upgrade to Pro for full RGB statistics and detailed analysis"
        });
      } else {
        res.json(analysis);
      }
    } catch (error) {
      console.error("LUT analysis error:", error);
      res.status(500).json({ error: "Failed to analyze LUT file" });
    }
  });

  // Optimize LUT endpoint - clamp out-of-range values (Pro feature)
  app.post("/api/lut/optimize", requireAuth, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Tier check - Pro feature only
      const userTier = req.user!.tier as "free" | "creator" | "pro" | "studio";
      const { hasTier } = await import("./middleware/tierGuard");
      
      if (!hasTier(userTier, "pro")) {
        return res.status(403).json({
          error: "LUT optimization requires Pro tier",
          upgradeRequired: true,
          requiredTier: "pro"
        });
      }

      const content = req.file.buffer.toString('utf-8');
      const sourceFormat = req.body.sourceFormat as 'cube' | '3dl' | 'lut' | undefined;
      
      const parsed = parseLUT(content, sourceFormat);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      // Normalize output format (remove leading dot if present, default to parsed format)
      const outputFormatRaw = req.body.outputFormat;
      const outputFormat = outputFormatRaw 
        ? (outputFormatRaw.startsWith('.') ? outputFormatRaw.substring(1) : outputFormatRaw) as 'cube' | '3dl' | 'lut'
        : parsed.format;

      // Validate output format
      if (!['cube', '3dl', 'lut'].includes(outputFormat)) {
        return res.status(400).json({ error: "Output format must be cube, 3dl, or lut" });
      }

      // Guard against empty LUTs
      if (parsed.lut.data.length === 0) {
        return res.status(400).json({
          error: "Invalid LUT file: no data points found"
        });
      }

      // Optimize: clamp all values to [0, 1] range and handle NaN/invalid values
      let clampedCount = 0;
      const optimizedData: [number, number, number][] = parsed.lut.data.map(([r, g, b]) => {
        // Replace NaN with 0
        const safeR = isNaN(r) ? 0 : r;
        const safeG = isNaN(g) ? 0 : g;
        const safeB = isNaN(b) ? 0 : b;
        
        const clampedR = Math.max(0, Math.min(1, safeR));
        const clampedG = Math.max(0, Math.min(1, safeG));
        const clampedB = Math.max(0, Math.min(1, safeB));
        
        if (clampedR !== r || clampedG !== g || clampedB !== b) {
          clampedCount++;
        }
        
        return [clampedR, clampedG, clampedB];
      });

      // Create optimized LUT object
      const optimizedLUT = {
        ...parsed.lut,
        data: optimizedData
      };

      // Convert to output format
      const optimized = convertLUT(
        { ...parsed, lut: optimizedLUT },
        outputFormat
      );

      // Generate filename
      const originalName = req.file.originalname.replace(/\.[^/.]+$/, "");
      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `${originalName}_optimized_${timestamp}.${outputFormat}`;

      // Send response with stats
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("X-Optimized-Points", clampedCount.toString());
      res.setHeader("X-Total-Points", parsed.lut.data.length.toString());
      res.send(optimized);
    } catch (error) {
      console.error("LUT optimization error:", error);
      res.status(500).json({ error: "Failed to optimize LUT file" });
    }
  });

  // Dashboard stats endpoint - returns usage and saved preset count
  app.get("/api/dashboard/stats", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { storage } = await import("./storage");
      const savedPresets = await storage.getUserPresetCount(req.user.id);
      
      res.json({
        savedPresets,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Preset Management Routes
  
  // Get user's saved presets
  app.get("/api/presets", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { storage } = await import("./storage");
      const presets = await storage.getUserPresets(req.user.id);
      
      res.json(presets); // Return array directly for React Query
    } catch (error) {
      console.error("Get presets error:", error);
      res.status(500).json({ error: "Failed to fetch presets" });
    }
  });

  // Download a preset
  app.get("/api/presets/:id/download", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const presetId = parseInt(req.params.id);
      if (isNaN(presetId)) {
        return res.status(400).json({ error: "Invalid preset ID" });
      }

      const { storage } = await import("./storage");
      const preset = await storage.getPreset(presetId, req.user.id);
      
      if (!preset) {
        return res.status(404).json({ error: "Preset not found" });
      }

      // Send the LUT data as a downloadable file with proper MIME type
      const filename = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}.${preset.format}`;
      
      // Determine MIME type based on format
      let contentType = 'text/plain';
      const format = preset.format.toLowerCase();
      
      if (format === 'cube' || format === '3dl') {
        contentType = 'text/plain';
      } else if (format === 'png') {
        contentType = 'image/png';
      } else if (format === 'jpg' || format === 'jpeg') {
        contentType = 'image/jpeg';
      } else if (format === 'mp4') {
        contentType = 'video/mp4';
      } else if (format === 'mov') {
        contentType = 'video/quicktime';
      } else if (format === 'avi') {
        contentType = 'video/x-msvideo';
      } else {
        contentType = 'application/octet-stream'; // Safe fallback for unknown formats
      }
      
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Type', contentType);
      res.send(preset.lutData);
    } catch (error) {
      console.error("Download preset error:", error);
      res.status(500).json({ error: "Failed to download preset" });
    }
  });

  // Save a new preset
  app.post("/api/presets", requireAuth, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const user = req.user;
      const { storage } = await import("./storage");
      const { getMaxPresets, canSaveMorePresets } = await import("../shared/tiers");
      
      // Check preset limit based on tier
      const userTier = (user.tier || "free") as "free" | "creator" | "pro" | "studio";
      const currentPresetCount = await storage.getUserPresetCount(user.id);
      
      if (!canSaveMorePresets(userTier, currentPresetCount)) {
        const limit = getMaxPresets(userTier);
        const requiredTier = userTier === "free" ? "creator" : "pro";
        const upgradeMessage = userTier === "free" 
          ? `Free tier limit reached (${limit} presets). Upgrade to Creator for 30 presets or Pro for unlimited!`
          : `Creator tier limit reached (${limit} presets). Upgrade to Pro for unlimited preset saving!`;
          
        return res.status(403).json({
          error: upgradeMessage,
          upgradeRequired: true,
          limit,
          currentCount: currentPresetCount,
          requiredTier
        });
      }

      const name = req.body.name || `Preset ${new Date().toISOString()}`;
      const content = req.file.buffer.toString('utf-8');
      const format = req.body.format as 'cube' | '3dl' | undefined;
      
      const parsed = parseLUT(content, format);

      if (parsed.errors.length > 0) {
        return res.status(400).json({
          error: "Invalid LUT file",
          details: parsed.errors
        });
      }

      // Save to database
      const preset = await storage.createPreset({
        userId: user.id,
        name,
        description: req.body.description || null,
        lutData: content,
        format: parsed.format,
        isPublic: false,
      });

      res.json({
        message: "Preset saved successfully",
        preset: {
          id: preset.id,
          name: preset.name,
          format: preset.format,
          createdAt: preset.createdAt
        }
      });
    } catch (error) {
      console.error("Save preset error:", error);
      res.status(500).json({ error: "Failed to save preset" });
    }
  });

  // Delete a preset
  app.delete("/api/presets/:id", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const presetId = parseInt(req.params.id);
      if (isNaN(presetId)) {
        return res.status(400).json({ error: "Invalid preset ID" });
      }

      const { storage } = await import("./storage");
      const deleted = await storage.deletePreset(presetId, req.user.id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Preset not found" });
      }

      res.json({ message: "Preset deleted successfully" });
    } catch (error) {
      console.error("Delete preset error:", error);
      res.status(500).json({ error: "Failed to delete preset" });
    }
  });

  // Upload avatar
  app.post("/api/profile/avatar", requireAuth, upload.single("avatar"), async (req, res) => {
    try {
      if (!req.user || !req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Resize and optimize avatar (200x200)
      const optimizedBuffer = await sharp(req.file.buffer)
        .resize(200, 200, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 90 })
        .toBuffer();

      // Convert to base64 data URL for storage
      const avatarUrl = `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;

      const { storage } = await import("./storage");
      await storage.updateUserProfile(req.user.id, { avatarUrl });

      res.json({ avatarUrl });
    } catch (error) {
      console.error("Avatar upload error:", error);
      res.status(500).json({ error: "Failed to upload avatar" });
    }
  });

  // Upload banner
  app.post("/api/profile/banner", requireAuth, upload.single("banner"), async (req, res) => {
    try {
      if (!req.user || !req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Resize and optimize banner (1200x300)
      const optimizedBuffer = await sharp(req.file.buffer)
        .resize(1200, 300, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 85 })
        .toBuffer();

      // Convert to base64 data URL for storage
      const bannerUrl = `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;

      const { storage } = await import("./storage");
      await storage.updateUserProfile(req.user.id, { bannerUrl });

      res.json({ bannerUrl });
    } catch (error) {
      console.error("Banner upload error:", error);
      res.status(500).json({ error: "Failed to upload banner" });
    }
  });

  // Update profile info
  app.patch("/api/profile", requireAuth, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { bio, website, twitter, instagram, linkedin } = req.body;
      
      const updates: any = {};
      if (bio !== undefined) updates.bio = bio;
      if (website !== undefined) updates.website = website;
      if (twitter !== undefined) updates.twitter = twitter;
      if (instagram !== undefined) updates.instagram = instagram;
      if (linkedin !== undefined) updates.linkedin = linkedin;

      const { storage } = await import("./storage");
      await storage.updateUserProfile(req.user.id, updates);

      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Get user profile by username
  app.get("/api/profile/:username", async (req, res) => {
    try {
      const { storage } = await import("./storage");
      const user = await storage.getUserByUsername(req.params.username);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Return public profile data only
      res.json({
        username: user.username,
        tier: user.tier,
        avatarUrl: user.avatarUrl,
        bannerUrl: user.bannerUrl,
        bio: user.bio,
        website: user.website,
        twitter: user.twitter,
        instagram: user.instagram,
        linkedin: user.linkedin,
        createdAt: user.createdAt,
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ error: "Failed to get profile" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
