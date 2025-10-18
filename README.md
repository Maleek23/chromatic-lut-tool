<div align="center">
  <img src="docs/images/logos/chromatic-wordmark.png" alt="Chromatic Logo" width="600"/>
  
  <h3>Professional LUT Toolkit for Cinematographers & Colorists</h3>
  
  <p>
    <strong>Extract authentic color grading from images • Convert LUT formats • Analyze quality</strong>
  </p>

  <p>
    <a href="https://chromatic-lut-tool-1.onrender.com">
      <img src="https://img.shields.io/badge/Live_Demo-Visit_Site-8b5cf6?style=for-the-badge&logo=vercel" alt="Live Demo"/>
    </a>
    <a href="#features">
      <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" alt="Status"/>
    </a>
  </p>
</div>

---

## 🎨 What is Chromatic?

Chromatic is a professional toolkit for cinematographers and colorists that allows you to **extract color grading from any reference image** and generate industry-standard LUT files. It supports all major formats (.cube, .3dl, .lut) and integrates seamlessly with DaVinci Resolve, Adobe Premiere Pro, and Final Cut Pro.

### 📸 Screenshots

<div align="center">
  <img src="docs/images/screenshots/landing.png" alt="Landing Page" width="100%"/>
  <p><em>Stunning landing page with tiered pricing</em></p>
</div>

<div align="center">
  <img src="docs/images/screenshots/generate.png" alt="Image to LUT Generator" width="100%"/>
  <p><em>Flagship Image-to-LUT generation tool</em></p>
</div>

<div align="center">
  <img src="docs/images/screenshots/tools.png" alt="LUT Tools" width="100%"/>
  <p><em>Convert, analyze, and optimize LUT files</em></p>
</div>

---

## ✨ Features

### 🎬 Image-to-LUT Generation (Flagship Feature)
- **Authentic Color Science Extraction** - Zone-based analysis (shadows/midtones/highlights)
- **Professional Grid Sizes** - 17×17×17, 33×33×33, 65×65×65 (Free: 17 only, Pro: all sizes)
- **Multiple Formats** - Export as .cube, .3dl, or .lut (Free: .cube only)
- **Precision Control** - 8-bit, 10-bit, or 12-bit output
- **Real-time Preview** - See LUT applied to your image instantly
- **Intensity Control** - Adjust strength from 0-100%

### 🔄 LUT Conversion
- **Format Support** - .cube ↔ .3dl ↔ .lut (Free: basic, Pro: full)
- **Grid Resampling** - Trilinear interpolation for smooth color transformations
- **Precision Preservation** - Maintains color accuracy across conversions
- **Auto-detection** - Automatically identifies LUT format

### 📊 LUT Analysis
- **Quality Scoring** - Comprehensive LUT quality assessment
- **Banding Detection** - Identify problematic color gradients (Free: preview only, Pro: full analysis)
- **Invalid Point Detection** - Find RGB values outside [0,1] range
- **RGB Statistics** - Min/max/avg analysis across all channels
- **Format Validation** - Ensure LUT meets industry standards

### 💎 Professional Features
- **Preset Management** - Save and organize unlimited LUTs (Pro only)
- **User Dashboard** - Track usage and manage presets
- **Authentication** - Secure user accounts with tier-based access
- **Stripe Integration** - Seamless Pro tier upgrades ($12/month or $99/year)

---

## 🚀 Live Demo

**Try it now:** [https://chromatic-lut-tool-1.onrender.com](https://chromatic-lut-tool-1.onrender.com)

### Free Tier Features:
- ✅ Image-to-LUT generation (17×17×17 grid)
- ✅ Basic format conversion (.cube → .3dl)
- ✅ Banding detection preview
- ✅ Export in .cube format
- ✅ Community access

### Pro Tier ($12/month or $99/year):
- 🚀 All Free features +
- 🚀 Unlimited grid sizes (17/33/65)
- 🚀 All format conversions (.cube ↔ .3dl ↔ .lut)
- 🚀 Full-quality analysis & precision exports
- 🚀 Save unlimited presets
- 🚀 Preset library dashboard
- 🚀 Priority support

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for lightning-fast builds
- **Tailwind CSS** for responsive design
- **shadcn/ui** for accessible components
- **Radix UI** primitives
- **TanStack Query** for server state management
- **Wouter** for client-side routing

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** (Neon serverless)
- **Drizzle ORM** for type-safe database operations
- **Passport.js** for authentication
- **Multer** for file uploads
- **Sharp** for image processing

### Integrations
- **Stripe** for payments & subscriptions
- **Session management** with PostgreSQL store
- **bcrypt** for password hashing

### Deployment
- **Render.com** for production hosting
- **Neon** for serverless PostgreSQL
- **PWA Support** - Installable on mobile devices
- **Mobile Optimized** - Touch-friendly UI for phones/tablets

---

## 📱 Mobile & PWA Support

Chromatic is fully optimized for mobile devices:

- ✅ **Responsive Design** - Works on phones, tablets, and desktop
- ✅ **Hamburger Menu** - Clean navigation on small screens
- ✅ **Touch-Friendly** - 44px minimum tap targets
- ✅ **PWA Installable** - Add to home screen like a native app
- ✅ **Offline Support** - Service worker for offline functionality
- ✅ **Safe Area Insets** - iPhone X+ notch support

---

## 🏗️ Architecture

### LUT Processing Engine

**Blue-Fastest Indexing:**
```javascript
// Industry-standard indexing order
index = r × size² + g × size + b
```

**Trilinear Interpolation:**
- Smooth color transformations during grid resampling
- Preserves gradient quality across all formats

**Zone-Based Color Analysis:**
- Shadows: Luminance < 33%
- Midtones: Luminance 33-67%
- Highlights: Luminance > 67%

**Color Science:**
```javascript
// Luminance calculation
L = 0.299×R + 0.587×G + 0.114×B
```

### Database Schema

**Users Table:**
- Authentication (username, hashed password)
- Tier management (free, pro, studio)
- Stripe integration (customer ID, subscription ID)
- Usage tracking (conversions, previews)

**Presets Table:**
- User-saved LUTs
- Metadata (name, description, format)
- Public/private visibility

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Maleek23/chromatic-lut-tool.git
cd chromatic-lut-tool

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL, SESSION_SECRET, STRIPE keys

# Push database schema
npm run db:push

# Start development server
npm run dev
```

---

## 🔐 Environment Variables

```env
DATABASE_URL=postgresql://user:password@host/database
SESSION_SECRET=your-random-secret-key
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
NODE_ENV=development
```

---

## 🎯 Project Structure

```
chromatic-lut-tool/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities
│   ├── public/            # Static assets
│   └── index.html         # Entry HTML
├── server/                # Backend Express app
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Database operations
│   ├── auth.ts            # Authentication logic
│   └── utils/             # LUT processing utilities
├── shared/                # Shared types & schemas
│   └── schema.ts          # Drizzle database schema
└── docs/                  # Documentation & assets
    └── images/
        ├── logos/         # Brand logos
        └── screenshots/   # App screenshots
```

---

## 🧪 Testing

```bash
# Run type checking
npm run check

# Run end-to-end tests (Playwright)
# Tests are auto-configured for mobile & desktop
```

---

## 📄 License

**Proprietary** - All rights reserved by UN/TITLD

This is the **private main branch** with full Pro features. For the public Community Edition (free tier only), see:
- Public Repo: [chromatic-community](https://github.com/Maleek23/chromatic-community)

---

## 👨‍💻 Developer

**Created by UN/TITLD**

- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- Twitter: [@YourTwitter]

---

## 🙏 Acknowledgments

- **Sharp** for image processing
- **Radix UI** for accessible primitives
- **shadcn/ui** for beautiful components
- **Neon** for serverless PostgreSQL
- **Render** for reliable hosting

---

<div align="center">
  <img src="docs/images/logos/chromatic-icon-square.png" alt="Chromatic Icon" width="100"/>
  
  <p><strong>Chromatic by UN/TITLD</strong></p>
  <p><em>Professional Color Grading, Simplified.</em></p>
</div>
