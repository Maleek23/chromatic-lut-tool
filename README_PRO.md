# CHROMATIC
### *by UN/TITLD*

> Professional LUT generation, conversion, and analysis toolkit for cinematographers and colorists.

---

## 🎬 What is Chromatic?

**Chromatic** is an industry-grade color grading toolkit that extracts authentic color science from reference images and converts it into professional LUT files. Whether you're a cinematographer matching looks from film stills, a colorist building a preset library, or a content creator exploring cinematic grades, Chromatic provides the tools you need.

### Core Philosophy

**Authentic color extraction** - Unlike generic LUT generators, Chromatic uses zone-based color analysis (shadows/midtones/highlights) to authentically capture the color science from your reference images, preserving subtle color relationships and tonal transitions.

---

## ✨ Features

### 🎨 Image-to-LUT Generation
- **Authentic Color Extraction** - Zone-based analysis captures shadows, midtones, and highlights separately
- **Adjustable Intensity** - Fine-tune the LUT strength from 0-100%
- **Multiple Grid Sizes** - 17×17×17 (free), 33×33×33, 65×65×65 (Pro)
- **Preview Generation** - Real-time preview with intensity control
- **Format Support** - Export as .cube, .3dl, or .lut formats

### 🔄 LUT Conversion
- **Universal Format Support** - Convert between .cube, .3dl, and .lut formats
- **Grid Resampling** - Resample LUTs with trilinear interpolation for smooth color transitions
- **Quality Preservation** - Maintains color accuracy across format conversions
- **Batch Processing** - Convert multiple LUTs simultaneously (Pro)

### 📊 LUT Analysis
- **Quality Scoring** - Comprehensive analysis of LUT quality and validity
- **Banding Detection** - Identifies problematic consecutive identical values
- **Range Validation** - Detects out-of-range RGB values
- **Statistics** - Min/max/average color values across all channels

### 💾 Preset Management
- **Save & Organize** - Store your favorite LUTs with custom names and descriptions
- **Quick Apply** - Instantly apply saved presets to new conversions
- **Export Anywhere** - Download presets in any supported format
- **Unlimited Storage** - Pro users get unlimited preset saving

---

## 🎯 Use Cases

### For Cinematographers
- **Film Matching** - Extract LUTs from film scans or reference stills
- **Look Development** - Build consistent color palettes across projects
- **Camera Matching** - Create conversion LUTs between different camera systems

### For Colorists
- **Client References** - Convert client-provided images into working LUTs
- **Preset Libraries** - Build and organize professional grading presets
- **Format Conversion** - Ensure compatibility across different grading software

### For Content Creators
- **Cinematic Looks** - Extract color grades from movie stills
- **Batch Grading** - Apply consistent looks across multiple clips
- **Creative Exploration** - Experiment with color palettes from photography

---

## 💎 Pricing Tiers

### Free Tier - $0/forever
Perfect for creators exploring professional color grading.

**Features:**
- ✅ Image-to-LUT generation (17×17×17 grid)
- ✅ Basic conversion (.cube → .3dl)
- ✅ Banding detection (preview only)
- ✅ .cube format export
- ✅ Community access

**Limitations:**
- Grid size: 17×17×17 only
- Conversion: One-way (.cube → .3dl)
- Preset saving: Not available
- Export formats: .cube only

### Pro Tier - $12/month or $99/year
For professional colorists and cinematographers.

**Everything in Free, plus:**
- ✅ **Unlimited Grid Sizes** - 17×17×17, 33×33×33, 65×65×65
- ✅ **All Format Conversions** - .cube ↔ .3dl ↔ .lut (bidirectional)
- ✅ **Full-Quality Analysis** - Complete banding and quality reports
- ✅ **Unlimited Preset Saving** - Organize by project or style
- ✅ **Preset Dashboard** - Manage and export your entire library
- ✅ **All Export Formats** - .cube, .3dl, and .lut
- ✅ **Priority Support** - Get help when you need it

**Coming Soon:**
- Lightroom-style preset export
- Batch processing for multiple images
- Advanced color controls (split toning, temperature, tint)

### Studio Add-on - $25/month *(Coming Soon)*
For agencies and professional YouTube colorists.

- ✅ **Custom Branded LUTs** - Add your watermark/branding
- ✅ **Team Preset Sharing** - Collaborate across your team
- ✅ **Early Access** - Experimental AI grading features
- ✅ **API Access** - Integrate into your pipeline

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Lightning-fast build tool
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management
- **shadcn/ui** - Beautiful accessible components
- **Tailwind CSS** - Utility-first styling with cinematic gradients

### Backend
- **Express.js** - Node.js server
- **PostgreSQL** - User data and presets (via Neon)
- **Drizzle ORM** - Type-safe database operations
- **Passport.js** - Authentication
- **Stripe** - Payment processing
- **Sharp** - Image processing and optimization

### LUT Processing
- **Custom Parser** - Supports .cube, .3dl, and .lut formats with auto-detection
- **Authentic Generator** - Zone-based color science extraction
- **Trilinear Interpolation** - Smooth grid resampling
- **Quality Analyzer** - Professional-grade validation

### Infrastructure
- **Multer** - File upload handling (in-memory, transient)
- **Express Sessions** - PostgreSQL-backed session storage
- **Rate Limiting** - Tier-based API protection

---

## 📐 LUT Format Specifications

### .cube (3D LUT) - Primary Format ✅
- **Developer:** Filmic Pro
- **Compatibility:** Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, After Effects
- **Type:** 3D color mapping (all RGB channels mapped simultaneously)
- **Grid Sizes:** Variable (17×17×17, 33×33×33, 65×65×65)
- **Value Range:** Normalized 0.0 to 1.0
- **Use Cases:** Professional color grading, cinematic looks, conversion LUTs

### .3dl (3D LUT) - Professional Format ✅
- **Developer:** Autodesk/Lustre
- **Compatibility:** Avid Media Composer, Adobe Premiere Pro, DaVinci Resolve, Smoke
- **Type:** 3D color mapping
- **Grid Size:** Fixed 33×33×33 (industry standard)
- **Value Range:** 12-bit integers (0-4095)
- **Use Cases:** Broadcast workflows, high-end post-production

### .lut (1D LUT) - Simple Format ✅
- **Type:** 1D color mapping (each RGB channel independent)
- **Grid Size:** Typically 256 or 1024 entries per channel
- **Value Range:** Normalized 0.0 to 1.0 or 8/10/12-bit integers
- **Limitations:** Cannot perform complex color shifts
- **Use Cases:** Basic color correction, gamma adjustments, contrast curves

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/chromatic-lut-tool.git
cd chromatic-lut-tool

# Install dependencies
npm install

# Set up environment variables
# Copy .env.example to .env and fill in your values
cp .env.example .env

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...
PGHOST=...
PGUSER=...
PGPASSWORD=...
PGDATABASE=...
PGPORT=...

# Authentication
SESSION_SECRET=your-session-secret

# Stripe (optional, for payments)
STRIPE_SECRET_KEY=sk_test_...
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Optional

# Analytics (optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 📖 How It Works

### Image-to-LUT Generation

1. **Image Analysis**
   - Analyzes uploaded image using Sharp
   - Extracts dominant colors and histograms
   - Separates pixels into shadows/midtones/highlights zones

2. **Zone-Based Color Extraction**
   - **Shadows**: <33% luminance
   - **Midtones**: 33-67% luminance
   - **Highlights**: >67% luminance
   - Calculates weighted color transforms per zone

3. **LUT Generation**
   - Creates 3D color cube with selected grid size
   - Applies zone-specific brightness, contrast, saturation
   - Uses industry-standard blue-fastest indexing
   - Outputs in requested format with precision

### LUT Conversion

1. **Format Detection** - Auto-detects source format (.cube, .3dl, .lut)
2. **Parsing** - Validates grid size and color values
3. **Grid Resampling** - Uses trilinear interpolation for smooth transitions
4. **Format Conversion** - Converts to target format with precision preservation

### Quality Analysis

- **Range Validation**: Checks all RGB values are within [0,1]
- **Banding Detection**: Identifies >10% consecutive identical values
- **Statistics**: Reports min/max/average values across all channels
- **Quality Scoring**: Provides overall quality assessment

---

## 🎨 Design Philosophy

Chromatic features a **cinematic color grading aesthetic** with:

- **Animated Gradient Backgrounds** - Subtle color orbs that pulse
- **Film Grain Overlay** - Authentic texture throughout the UI
- **Chromatic Aberration Typography** - RGB-split effect on headings
- **Backdrop Blur Cards** - Modern glass-morphism design
- **Professional Color Hierarchy** - Tailwind-based design system

All UI elements follow accessibility best practices with proper contrast ratios and keyboard navigation.

---

## 🔐 Security

- **Bcrypt Password Hashing** - Industry-standard password protection
- **Express Sessions** - PostgreSQL-backed session storage
- **CSRF Protection** - Guards against cross-site request forgery
- **Rate Limiting** - Tier-based API protection
- **Secure File Uploads** - In-memory processing, no persistent storage
- **Environment Variables** - Sensitive data never committed to repo

---

## 📊 Performance

- **In-Memory Processing** - No file system writes for transient operations
- **Image Optimization** - Sharp for fast, efficient image processing
- **Trilinear Interpolation** - Smooth, accurate color transformations
- **PostgreSQL Indexing** - Fast user and preset lookups
- **Vite HMR** - Lightning-fast development

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Filmic Pro** - .cube format specification
- **Autodesk** - .3dl format specification
- **shadcn/ui** - Beautiful UI components
- **Replit** - Development platform
- **Stripe** - Payment processing
- **Neon** - Serverless PostgreSQL

---

## 📧 Contact & Support

- **Website**: [chromatic.com](https://chromatic.com) *(coming soon)*
- **Email**: support@chromatic.com
- **GitHub Issues**: [Report a bug](https://github.com/YOUR_USERNAME/chromatic-lut-tool/issues)

---

<div align="center">

**Built with ❤️ for cinematographers and colorists worldwide**

*by UN/TITLD*

</div>
