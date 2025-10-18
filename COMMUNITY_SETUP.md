# Creating the Chromatic Community Edition

This guide explains how to create the **public GitHub repository** from your private codebase.

---

## 📋 Overview

You'll create a **simplified version** of Chromatic with:
- ✅ Free tier features only
- ✅ No Stripe/payments
- ✅ No tier enforcement
- ✅ Clean, beginner-friendly code
- ✅ MIT License (open source)

---

## 🚀 Step-by-Step Setup

### 1. Create New GitHub Repository

1. Go to **github.com**
2. Click **"New repository"**
3. Name: `chromatic-community`
4. Description: `Open-source LUT generation toolkit for cinematographers`
5. **✅ Public**
6. **DON'T** initialize with README (you'll copy from here)
7. Click **Create repository**

### 2. Clone Your Private Repo Locally

```bash
# Clone your private repo to a new folder
git clone https://github.com/YOUR_USERNAME/chromatic-lut-tool.git chromatic-community
cd chromatic-community

# Remove the old git remote
git remote remove origin

# Add the new public repo as origin
git remote add origin https://github.com/YOUR_USERNAME/chromatic-community.git
```

### 3. Remove Pro Features

#### A. Remove Stripe Integration

**Delete these files:**
```bash
rm -rf server/middleware/tierGuard.ts
rm -rf server/middleware/validation.ts
```

**Edit `server/routes.ts`:**
- Remove all `import` lines for Stripe
- Remove all `requireAuth` middleware (or keep basic auth)
- Remove all tier validation checks
- Remove Stripe webhook endpoint
- Remove checkout/subscription endpoints

**Edit `package.json`:**
```json
// Remove:
"stripe": "^X.X.X",
"@stripe/stripe-js": "^X.X.X",
"@stripe/react-stripe-js": "^X.X.X"
```

#### B. Simplify Frontend Pages

**Delete these pages:**
```bash
rm client/src/pages/Upgrade.tsx
rm client/src/pages/Dashboard.tsx  # Optional: keep if you want preset demo
```

**Edit `client/src/pages/Convert.tsx`:**
- Remove Pro badges and upgrade prompts
- Lock grid size options to 17 only
- Remove .3dl and .lut format options (keep .cube only)
- Simplify UI

**Edit `client/src/components/LutControls.tsx`:**
- Remove Pro feature checks
- Lock to 17×17×17 grid
- Remove .3dl format option
- Remove all upgrade prompts

#### C. Simplify Database Schema

**Edit `shared/schema.ts`:**
```typescript
// Remove these columns from users table:
// - tier
// - tierExpiresAt  
// - stripeCustomerId
// - stripeSubscriptionId
// - conversionsThisMonth
// - previewsToday

// Keep only:
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  avatarUrl: text("avatar_url"),
  bannerUrl: text("banner_url"),
  bio: text("bio"),
  website: text("website"),
  twitter: text("twitter"),
  instagram: text("instagram"),
  linkedin: text("linkedin"),
});

// Remove presets table if you want (or keep for demo)
```

#### D. Update Environment Variables

**Edit `.env.example`:**
```bash
# Remove all Stripe variables
# Remove analytics (optional)

# Keep only:
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-here
```

### 4. Update Documentation

**Copy README:**
```bash
# Replace README.md with the Community Edition version
cp README.community.md README.md
rm README.community.md
```

**Update links:**
- Replace `YOUR_USERNAME` with your actual GitHub username
- Update demo URL once deployed

**Create LICENSE file:**
```bash
# Create MIT License
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 UN/TITLD

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

### 5. Clean Up Code

```bash
# Remove build artifacts
rm -rf node_modules
rm -rf .next
rm -rf dist
rm -rf .cache

# Remove environment files
rm .env
rm .env.local

# Remove Replit-specific files (optional)
rm .replit
rm replit.nix
```

### 6. Commit and Push

```bash
# Add all changes
git add .

# Commit
git commit -m "Initial commit - Chromatic Community Edition"

# Push to public repo
git push -u origin main
```

---

## 🎯 File Modifications Summary

### Files to DELETE:
- ❌ `server/middleware/tierGuard.ts`
- ❌ `server/middleware/validation.ts`
- ❌ `client/src/pages/Upgrade.tsx`
- ❌ `client/src/pages/Dashboard.tsx` (optional)

### Files to MODIFY:

#### `server/routes.ts`
```typescript
// Remove:
- All Stripe imports
- All tier validation
- requireAuth middleware (or simplify)
- Stripe webhook endpoint
- Checkout/subscription endpoints

// Keep:
- Basic auth (optional)
- LUT generation endpoint
- LUT conversion endpoint
- LUT analysis endpoint
- Profile endpoints (optional)
```

#### `client/src/components/LutControls.tsx`
```typescript
// Remove:
- isPro checks
- Pro badges
- Upgrade prompts
- 33×33×33 and 65×65×65 grid options
- .3dl format option

// Keep:
- 17×17×17 grid only
- .cube format only
- Basic controls
```

#### `client/src/pages/Convert.tsx`
```typescript
// Remove:
- Pro feature badges
- Grid size selector (lock to 17)
- Format options (lock to .cube)
- Upgrade prompts

// Keep:
- File upload
- Conversion logic
- Download
```

#### `shared/schema.ts`
```typescript
// Simplify users table:
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // Profile fields (optional)
});

// Remove presets table (optional - keep for demo)
```

#### `package.json`
```json
// Remove:
"stripe",
"@stripe/stripe-js",
"@stripe/react-stripe-js"

// Keep everything else
```

---

## 🚀 Deploy to Vercel

Once your public repo is ready:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to your chromatic-community repo
# - Add DATABASE_URL environment variable
# - Deploy!
```

Your demo will be at: `chromatic-community.vercel.app`

---

## ✅ Verification Checklist

Before pushing to public GitHub:

- [ ] All Stripe code removed
- [ ] All tier checks removed
- [ ] Grid locked to 17×17×17
- [ ] Format locked to .cube
- [ ] README updated (Community Edition)
- [ ] LICENSE file added (MIT)
- [ ] `.env` file NOT committed
- [ ] `node_modules/` NOT committed
- [ ] Links updated with your GitHub username
- [ ] Code commented and clean
- [ ] No sensitive data in code

---

## 📊 What You'll Have

**Private Repo** (`chromatic-lut-tool`)
- Full Pro features
- Stripe integration
- Tier enforcement
- Production deployment

**Public Repo** (`chromatic-community`)
- Free features only
- No payments
- MIT License
- Demo deployment
- Showcases your skills

---

## 💡 Tips

1. **Keep repos in sync manually** - Don't auto-sync, as you have different features
2. **Bug fixes can go to both** - Core LUT processing improvements
3. **Feature additions go to private** - New Pro features stay private
4. **Community feedback** - GitHub Issues on public repo can inform private development

---

## 🎬 You're Ready!

Once you complete these steps, you'll have:
- ✅ Clean public codebase on GitHub
- ✅ Live demo on Vercel
- ✅ Portfolio-ready showcase
- ✅ LinkedIn-ready links
- ✅ Protected Pro features in private repo

Questions? Check the main README or open an issue!
