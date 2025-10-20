# Pre-Production Security Fixes - Quick Reference

**Use this checklist to verify all security issues are resolved before deployment.**

---

## 🔴 CRITICAL - Remove DEBUG Logs (4 locations)

### File: `server/api/routes.ts`

**Line 420 - Remove:**
```javascript
console.log("[DEBUG] generate-lut request body:", JSON.stringify(req.body, null, 2));
```
**Risk:** Exposes entire request body including base64 image data

---

**Line 425 - Remove:**
```javascript
console.log("[DEBUG] Validation failed:", JSON.stringify(validationResult.error, null, 2));
```
**Risk:** Exposes validation errors with user input

---

**Line 499 - Remove:**
```javascript
console.log(`[DEBUG] Creating filename with gridSize: ${gridSize}, format: ${formatExt}`);
```
**Risk:** Exposes internal file generation details

---

**Line 501 - Remove:**
```javascript
console.log(`[DEBUG] Generated filename: ${filename}`);
```
**Risk:** Exposes generated filenames and timing patterns

---

## 🟠 HIGH Priority - Console.error Cleanup

### Server-Side Files (28 locations)

**File: `server/api/routes.ts`**
- [ ] Line 97: `console.error("Usage stats error:", error);`
- [ ] Line 170: `console.error("Stripe checkout error:", error);`
- [ ] Line 203: `console.warn("⚠️ WARNING: STRIPE_WEBHOOK_SECRET not set...");` *(keep this warning)*
- [ ] Line 207: `console.error("Webhook signature verification failed:", err.message);`
- [ ] Line 255: `console.log("Payment failed for customer:", invoice.customer);`
- [ ] Line 262: `console.error("Webhook handler error:", error);`
- [ ] Line 294: `console.error("Base64 decode error:", error);`
- [ ] Line 333: `console.error("Image validation error:", validationError);`
- [ ] Line 342: `console.error("Analysis error:", error);`
- [ ] Line 384: `console.error("Image validation error:", validationError);`
- [ ] Line 411: `console.error("Preview error:", error);`
- [ ] Line 483: `console.error("Image validation error:", validationError);`
- [ ] Line 524: `console.error('Failed to send LUT email (non-blocking):', error);`
- [ ] Line 536: `console.error("LUT generation error:", error);`
- [ ] Line 583: `console.error(\`Preview error for image \${img.id}:\`, error);`
- [ ] Line 594: `console.error("Batch preview error:", error);`
- [ ] Line 667: `console.error(\`LUT generation error for image \${img.id}:\`, error);`
- [ ] Line 680: `console.error("Batch download error:", error);`
- [ ] Line 707: `console.error("LUT parse error:", error);`
- [ ] Line 797: `console.error("LUT conversion error:", error);`
- [ ] Line 957: `console.error("LUT analysis error:", error);`
- [ ] Line 1054: `console.error("LUT optimization error:", error);`
- [ ] Line 1073: `console.error("Dashboard stats error:", error);`
- [ ] Line 1092: `console.error("Get presets error:", error);`
- [ ] Line 1143: `console.error("Download preset error:", error);`
- [ ] Line 1216: `console.error("Save preset error:", error);`
- [ ] Line 1242: `console.error("Delete preset error:", error);`
- [ ] Line 1282: `console.error("Update preset folder error:", error);`
- [ ] Line 1308: `console.error("Avatar upload error:", error);`
- [ ] Line 1334: `console.error("Banner upload error:", error);`
- [ ] Line 1360: `console.error("Profile update error:", error);`
- [ ] Line 1389: `console.error("Get profile error:", error);`

**File: `server/features/email/sender.ts`**
- [ ] Line 129: `console.error('Resend email error:', error);`
- [ ] Line 133: `console.log('LUT email sent successfully:', data);`
- [ ] Line 136: `console.error('Failed to send LUT email:', error);`

### Client-Side Files (11 locations)

**File: `client/src/components/lut/PreviewGallery.tsx`**
- [ ] Line 107: `console.error("Preview generation error:", error);`

**File: `client/src/pages/user/Upgrade.tsx`**
- [ ] Line 37: `console.error("Upgrade error:", error);`

**File: `client/src/pages/tools/Analyze.tsx`**
- [ ] Line 65: `console.error("Analysis error:", error);`

**File: `client/src/pages/tools/Convert.tsx`**
- [ ] Line 110: `console.error("Parse error:", error);`
- [ ] Line 177: `console.error("Conversion error:", error);`
- [ ] Line 246: `console.error("Apply preset error:", error);`
- [ ] Line 287: `console.error("Download error:", error);`

**File: `client/src/pages/tools/Tool.tsx`**
- [ ] Line 130: `console.error("Upload error:", error);`
- [ ] Line 170: `console.error("Preview error:", error);`
- [ ] Line 257: `console.error("Generation error:", error);`

---

## 🟡 MEDIUM Priority - Sanitize Error Messages

### File: `client/src/lib/queryClient.ts`

**Line 3-8 - Replace:**
```typescript
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}
```

**With:**
```typescript
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    // Generic error - don't expose server details
    throw new Error("Request failed. Please try again.");
  }
}
```

---

### File: `client/src/hooks/use-auth.tsx`

**Lines 44-50 - Replace:**
```typescript
onError: (error: Error) => {
  toast({
    title: "Login failed",
    description: error.message, // ❌ Raw server error
    variant: "destructive",
  });
},
```

**With:**
```typescript
onError: (error: Error) => {
  toast({
    title: "Login failed",
    description: "Invalid email or password. Please try again.",
    variant: "destructive",
  });
},
```

**Lines 61-68 - Replace:**
```typescript
onError: (error: Error) => {
  toast({
    title: "Registration failed",
    description: error.message, // ❌ Raw server error
    variant: "destructive",
  });
},
```

**With:**
```typescript
onError: (error: Error) => {
  toast({
    title: "Registration failed",
    description: "Unable to create account. Please try again or use a different email.",
    variant: "destructive",
  });
},
```

---

## ✅ Verification Steps

### Step 1: Search for Remaining Issues
```bash
# Find any remaining DEBUG logs
grep -rn "\[DEBUG\]" server/

# Find any remaining console.log
grep -rn "console\.log" server/

# Find any remaining console.error
grep -rn "console\.error" server/
grep -rn "console\.error" client/src/
```

### Step 2: Test Error Handling
1. Navigate to `/generate` while logged out → Should show generic error
2. Try to generate LUT with invalid data → Should show generic error  
3. Try to login with wrong password → Should show "Invalid email or password"
4. Open browser console → Should be clean (no error logs)

### Step 3: Environment Check
```bash
# Verify NODE_ENV is set to production
echo $NODE_ENV
# Should output: production

# Verify no secrets in client code
grep -rn "import.meta.env\." client/src/
# Should return: NO RESULTS
```

---

## 📋 Final Production Checklist

Before deploying:
- [ ] All 4 DEBUG logs removed from `server/api/routes.ts`
- [ ] All console.error replaced with logger.error
- [ ] All console.log replaced with logger.dev.log  
- [ ] Error messages sanitized in `queryClient.ts`
- [ ] Error messages sanitized in `use-auth.tsx`
- [ ] `NODE_ENV=production` set in deployment environment
- [ ] Browser console is clean (test in production mode)
- [ ] `npm audit` shows no critical vulnerabilities
- [ ] All 4 verification steps above completed ✅

---

## 🔧 Recommended Replacements

**Instead of:**
```javascript
console.error("Something failed:", error);
```

**Use:**
```javascript
import { logger } from "./utils/logger";
logger.error("Something failed", error);
```

**Instead of:**
```javascript
console.log("Debug info:", data);
```

**Use:**
```javascript
import { logger } from "./utils/logger";
logger.dev.log("Debug info:", data); // Only logs in development
```

---

*Use this checklist in conjunction with `SECURITY.md` for full context.*
