# Community Edition Cleanup Guide

This guide helps you transform your current Replit workspace into the **Chromatic Community Edition** for public release.

---

## ✅ Files Already Modified (Done!)

The following files have been updated to remove Pro features:

- ✅ `shared/schema.ts` - Simplified (removed tier, Stripe fields)
- ✅ `client/src/components/LutControls.tsx` - Locked to 17×17×17, .cube only
- ✅ `client/src/pages/Convert.tsx` - Simplified, no Pro features
- ✅ `README.community.md` - Community Edition README ready
- ✅ `LICENSE` - MIT License added
- ✅ `.env.example` - Community Edition env template

---

## 🗑️ Files to DELETE

Delete these files before pushing to public repo:

```bash
# Stripe/Tier enforcement files
rm server/middleware/tierGuard.ts
rm server/middleware/validation.ts

# Pro-only pages (if they exist)
rm client/src/pages/Upgrade.tsx
rm client/src/pages/Dashboard.tsx

# Private documentation
rm COMMUNITY_SETUP.md
rm CLEANUP_GUIDE.md
```

---

## ✏️ Files to MANUALLY EDIT

### 1. **server/routes.ts**

Remove these sections:

**Lines to delete:**
```typescript
// Remove Stripe import
import Stripe from "stripe";

// Remove tier guard imports
import { requireAuth, requireTier } from "./middleware/tierGuard";
import { hasFeature, canConvert } from "./middleware/validation";

// Remove Stripe initialization (around line 54-59)
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(...);
}

// Remove Stripe checkout endpoint (around line 62-123)
app.post("/api/create-checkout-session", requireAuth, async...

// Remove Stripe webhook endpoint (around line 125-215)
app.post("/api/stripe-webhook", async...
```

**Replace ALL `requireAuth` middleware with simple check:**
```typescript
// Before (line ~218):
app.post("/api/analyze", async (req, res) => {

// After:
app.post("/api/analyze", async (req, res) => {
```

**Remove tier validation from LUT endpoints:**
```typescript
// Find lines like:
if (!hasFeature(user.tier, "gridSize", gridSize)) {
  return res.status(403).json({ error: "..." });
}

// Delete ALL tier checks like these
```

**Keep only:**
- `/api/analyze` - Image analysis
- `/api/generate-lut` - LUT generation (lock to grid=17, format=cube)
- `/api/lut/parse` - LUT parsing
- `/api/lut/convert` - LUT conversion
- `/api/profile/*` - Profile endpoints (optional)

### 2. **package.json**

**Manually remove Stripe dependencies:**

```bash
# Open package.json and remove these lines:
Line 44: "@stripe/react-stripe-js": "^5.2.0",
Line 45: "@stripe/stripe-js": "^8.1.0",
Line 78: "stripe": "^19.1.0",

# Then run:
npm install
```

### 3. **server/storage.ts**

**Remove tier-related methods:**

```typescript
// Delete these methods:
- updateUserTier()
- updateUserStripeInfo()
- getUserByStripeCustomerId()
- resetConversionCounts()
- incrementConversions()
- incrementPreviews()
```

**Keep only:**
- `createUser()`
- `getUserByUsername()`
- `getUserById()`
- `updateUserProfile()` (if keeping profiles)

### 4. **README.md**

```bash
# Replace with Community Edition README
cp README.community.md README.md
rm README.community.md
```

### 5. **client/src/App.tsx**

**Remove Pro-only routes:**

```typescript
// Remove these routes:
<Route path="/upgrade" component={Upgrade} />
<Route path="/dashboard" component={Dashboard} />
```

### 6. **client/src/hooks/use-auth.tsx** (if exists)

**Remove tier field from User type:**

```typescript
// Before:
interface User {
  id: number;
  username: string;
  email?: string;
  tier: string;  // ← Remove this
  ...
}

// After:
interface User {
  id: number;
  username: string;
  email?: string;
  ...
}
```

---

## 🔧 Post-Cleanup Steps

### 1. Update Database Schema

```bash
# Push simplified schema to database
npm run db:push --force
```

### 2. Test the App

```bash
# Start dev server
npm run dev

# Test:
# - Upload image → Generate LUT (should work)
# - Convert .cube → .3dl (should work)
# - No Pro features visible
# - No upgrade prompts
```

### 3. Create Git Branch (DO THIS IN SHELL)

```bash
# Create community edition branch
git checkout -b community-edition

# Add all changes
git add .

# Commit
git commit -m "Community Edition - Free tier only, no Pro features"

# Create new public repo on GitHub:
# Name: chromatic-community
# Visibility: PUBLIC
# Don't initialize with README

# Push to new repo
git remote add community https://github.com/YOUR_USERNAME/chromatic-community.git
git push -u community community-edition:main
```

---

## 📋 Verification Checklist

Before pushing to public GitHub:

- [ ] All Stripe code removed
- [ ] All tier checks removed
- [ ] Grid locked to 17×17×17
- [ ] Format locked to .cube export
- [ ] Conversion is .cube → .3dl only
- [ ] No upgrade prompts
- [ ] No Dashboard page
- [ ] README is Community Edition version
- [ ] LICENSE file present (MIT)
- [ ] `.env` file NOT committed
- [ ] `node_modules/` NOT committed
- [ ] No sensitive data in code
- [ ] App runs without errors
- [ ] Database schema updated

---

## 🎯 Final Structure

Your public repo should have:

```
chromatic-community/
├── client/              # React frontend (simplified)
├── server/              # Express backend (no Stripe)
├── shared/              # Shared types
├── README.md            # Community Edition README
├── LICENSE              # MIT License
├── .env.example         # Template only
├── package.json         # No Stripe deps
└── ...
```

---

## 🚀 Deploy Community Edition

### Vercel (Frontend + Backend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard:
DATABASE_URL=postgresql://...
SESSION_SECRET=...
```

Your demo will be at: `chromatic-community.vercel.app`

---

## 💡 Maintaining Two Repos

**Private Repo** (`chromatic-lut-tool`):
- Full Pro features
- Stripe integration
- Where you develop

**Public Repo** (`chromatic-community`):
- Free tier only
- No Stripe
- For portfolio/showcase

**Workflow:**
1. Develop in private repo
2. Bug fixes → cherry-pick to both repos
3. New Pro features → stay in private only
4. Core improvements → manually port to community

---

## ❓ Need Help?

If something doesn't work:
1. Check browser console for errors
2. Check server logs
3. Verify database schema matches `shared/schema.ts`
4. Make sure Stripe deps are fully removed

Good luck! 🎬
