# CHROMA by UN/TITLD

## Overview
CHROMA is a professional toolkit for cinematographers and colorists, offering comprehensive LUT (Look-Up Table) conversion, generation, and analysis. It provides industry-standard support for all major LUT formats with a freemium pricing model. The project aims to provide an essential tool for creators and professionals in the color grading industry. Key capabilities include an Image-to-LUT generator that authentically extracts color science from reference images, and robust tools for LUT conversion and analysis to ensure quality and compatibility across professional color grading software.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes (October 20, 2025)

### UI/UX Enhancement - Professional Upload Experience (Latest)
- **Upload Components Redesigned** (Architect-approved):
  - Created `UploadZone.tsx` - Dramatic drag-and-drop for Image-to-LUT generation with 450px height, gradient backgrounds, 20x20 icons, animated glow effects, sparkle overlays on drag, and large gradient CTA button
  - Created `LutFileUpload.tsx` - Professional upload component for Convert/Analyze tools with 320px height, chart-2 color scheme, 16x16 icons, format badges, and state-driven animations
  - Both components feature loading states (Loader2 spinners), success states (CheckCircle icons), proper keyboard accessibility
- **Chroma Science Page Enhanced** (`/learn-more`):
  - Hero section: Dramatically scaled typography (5xl-7xl), "Professional Color Science" label above title, gradient text treatments
  - Professional Color Pipeline card: Larger icons (14x14), improved spacing (gap-8), shadow effects
  - Six-Stage Architecture: Larger section titles (4xl-5xl), expanded spacing (mb-24), better visual hierarchy
- **Resources Page Enhanced** (`/resources`):
  - Hero section: Added "Documentation Hub" label, larger title (4xl-7xl)
  - Resource cards: Larger icons (16x16 to 20x20), shadow-lg/shadow-2xl effects, better padding
  - Chroma Science card: Enhanced styling with larger fonts (xl-2xl)
- **Generate Page** (`/generate`): Integrated new UploadZone component with impressive animations and professional styling
- **Convert & Analyze Tools** (`/convert`, `/analyze`): Integrated LutFileUpload component, replaced old upload zones
- **E2E Testing**: All pages verified with proper styling, functionality, and state management (playwright test passed)

### Production Readiness Updates
- **File Limits Updated**: Free tier file upload limit increased from 10MB to 25MB across all configuration files (shared/tiers.ts, server/middleware/validation.ts, client/src/pages/info/Landing.tsx).
- **Legal Pages Created**: 
  - Privacy Policy (`/privacy`) - Comprehensive privacy policy covering data collection, usage, storage, security, and user rights.
  - Terms of Service (`/terms`) - Complete terms covering subscriptions, payments, acceptable use, intellectual property, and liability.
  - About Page (`/about`) - Brand story explaining CHROMA's mission, technology, UN/TITLD team, and values.
- **Footer Component**: Created reusable Footer component with links to Privacy, Terms, About, Resources, Pricing, and Contact. Added to ALL 18 pages (including 404).
- **Payment Security Trust Indicators**: Enhanced Upgrade page with security trust section featuring Stripe badge, SSL encryption messaging, and privacy-first guarantees.
- **Security Audit Completed** (October 20, 2025):
  - Created `SECURITY.md` - Comprehensive security audit documenting all vulnerabilities
  - Created `SECURITY_CHECKLIST.md` - Quick reference with exact line numbers for security fixes
  - Created `server/utils/logger.ts` - Secure logging utility (dev/production separation)
  - Identified 60+ console.log/error statements exposing sensitive data
  - Found 4 CRITICAL DEBUG logs that expose request bodies and validation errors
  - Documented all security issues requiring remediation before production launch
- **Deployment Documentation**: Created comprehensive `DEPLOYMENT.md` guide covering:
  - Pre-deployment checklist (legal, security, features)
  - Critical security fixes required before launch
  - Resend email domain verification steps
  - Stripe webhook configuration instructions
  - Mobile responsiveness testing checklist
  - Security audit recommendations
  - Monitoring and observability setup
  - Go-live decision matrix
  - Post-launch action items

### Navigation & Routing
- Routes added for `/privacy`, `/terms`, `/about` in App.tsx
- All legal pages accessible from footer navigation
- Footer component deployed to all 18 pages including error pages

## Professional Standards Verification (October 2025)
CHROMA's LUT generation pipeline has been verified against industry standards:
- **VES Technology Committee White Paper**: "Cinematic Color: From Your Monitor to the Big Screen" (2012) - Confirmed correct implementation of CIE L*a*b* perceptual color space, scene-referred vs display-referred colorimetry, and sRGB gamma encoding (2.4 exponent).
- **CIE Color Spaces (FilmLight Technical Note)**: Confirmed proper D65 white point, CIE XYZ tristimulus transformations, and Lab/LCh color space mathematics.
- **Key Verification Points**:
  - ✓ CIE L*a*b* with D65 illuminant (per CIE 1976 recommendation)
  - ✓ sRGB gamma handling (2.4 exponent with offset per VES spec)
  - ✓ K-means clustering for intelligent color sampling
  - ✓ Filmic tone curves (John Hable) for cinema-quality tonality
  - ✓ Skin tone protection using Lab distance metrics
  - ✓ Hue-preserving gamut compression (binary search in LCh space)
  - ✓ Chromatic adaptation (Gray World algorithm)
  - ✓ ACEScg support for ACES film emulation workflows
  - ✓ Blue-fastest indexing (industry standard for 3D LUTs)
  - ✓ Comprehensive LUT metadata with input requirements and color science documentation

**Chroma Science Page**: Renamed from "How It Works" to "Chroma Science" (/color-science route) to reflect professional positioning and brand consistency. Page showcases six-stage cinema-grade pipeline verified against VES/CIE standards (verified by architect).

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript and Vite.
- **Routing**: Wouter for client-side routing with a hub-and-spoke architecture.
- **State Management**: Local React state, custom auth context, React Query for server state.
- **UI Components**: Radix UI primitives and shadcn/ui for accessible components.
- **Styling**: Tailwind CSS with a cinematic aesthetic, featuring gradient effects, animated color orbs, film grain overlays, chromatic aberration typography, and backdrop blur.
- **Design Patterns**: Component composition, controlled components, custom hooks, tabbed navigation, and debounced real-time preview updates.
- **SEO**: Comprehensive meta tags (Open Graph, Twitter Cards) and keyword optimization.

### Backend
- **Runtime**: Node.js with Express.js.
- **API Design**: RESTful endpoints under `/api` for authentication and LUT processing.
- **LUT Processing**:
    - **Parser**: Supports .cube (3D), .3dl (3D), and .lut (1D) formats with auto-detection, validation, and metadata support.
    - **Generator**: Professional color science pipeline for cinema-quality LUT generation including preprocessing (ACEScg conversion, denoising), advanced feature extraction (K-means clustering, dense histograms, skin tone detection), perceptual color space operations (Lab/LCh), filmic tone curves (John Hable-style), and gamut mapping (ACES/Rec.2020 → Rec.709). Exports to .cube, .3dl, .lut, .look, and .xmp.
    - **Converter**: Converts between supported formats with grid resampling (17x17x17, 33x33x33, 65x65x65) using trilinear interpolation.
    - **Analyzer**: Detects invalid points, identifies banding, reports quality metrics, and provides quality scoring.
    - **Optimizer**: Clamps RGB values to [0,1] range, handles invalid values, and supports format conversion during optimization.
- **File Handling**: Multer for `multipart/form-data` with in-memory storage. File size limits: Free 25MB, Creator 50MB, Pro 100MB, Studio 200MB.

### LUT Format Specifications
- **.cube (3D LUT)**: Primary format, widely compatible (Adobe, DaVinci Resolve), variable grid sizes. Available for all tiers.
- **.3dl (3D LUT)**: Professional format, compatible (Avid, Adobe, DaVinci Resolve), fixed 33x33x33 grid. Available for Creator+ tiers.
- **.look (3D LUT)**: Autodesk/Nuke format, used in VFX pipelines, variable grid sizes. Available for Creator+ tiers.
- **.lut (1D LUT)**: Simple format, 1D color mapping. Available for Pro+ tiers.
- **.xmp (Adobe Lightroom Preset)**: Complete Lightroom preset with tone curve, split toning, HSL adjustments, and metadata. Available for Pro+ tiers.

### Data Storage
- **Database**: PostgreSQL via Neon serverless, using Drizzle ORM.
- **Schema**: `users` (id, email, hashed password, tier) and `presets` (id, name, userId, folder, format, lutData, isPublic, createdAt).
- **Session Management**: Express session with `connect-pg-simple` and Passport.js.
- **Storage Strategy**: In-memory for LUT processing, PostgreSQL for user data and saved presets.

### System Design Choices
- **UI/UX**: Cinematic color grading aesthetic.
- **Navigation Architecture**: Hub-and-spoke model with Image-to-LUT generation as the main entry point.
- **Pricing Strategy**: Freemium model: Free tier (3 monthly Image-to-LUT generations with 25MB file limit, then $2.50 pay-per-use), Creator tier ($7/mo for unlimited), Pro tier ($12/mo for unlimited, all tools, all formats), Studio tier ($25/mo for team features). Stripe integration configured, webhook setup required for production.
- **Technical Implementations**: Professional color science pipeline with ACEScg/Lab/LCh perceptual transforms, k-means clustering, filmic tone curves, gamut mapping, skin tone protection, industry-standard blue-fastest indexing, trilinear interpolation, server-side validation, and real-time preview.
- **Feature Specifications**:
    - **Image to LUT**: Cinema-grade color extraction, tier-dependent grid size and output format selection.
    - **LUT Conversion**: Tier-dependent format support and grid resampling.
    - **LUT Analysis**: Quality scoring, banding detection, invalid point detection, RGB statistics with tier-based access.
    - **LUT Optimization**: Clamps RGB values to valid range.
    - **Authentication**: Email/password with bcrypt, session management, and tier-based feature access.
    - **Preset Management**: Saving and organization of presets with tier-dependent limits and metadata tracking; Creator+ users can organize into folders.
    - **Usage Tracking**: Monthly conversions tracked for Free tier.
    - **Email Delivery**: Automatic email delivery of generated LUT files via Resend.

## External Dependencies

- **Image Processing**: Sharp.
- **File Processing**: Multer.
- **UI Libraries**: Radix UI, shadcn/ui, Embla Carousel, cmdk, Lucide React.
- **Database & ORM**: @neondatabase/serverless, Drizzle ORM, drizzle-zod.
- **Validation & Forms**: Zod, React Hook Form, @hookform/resolvers.
- **Styling & Utilities**: Tailwind CSS, PostCSS, Autoprefixer, class-variance-authority, clsx, tailwind-merge.
- **Date Handling**: date-fns.
- **Authentication**: Passport.js, bcrypt, express-session, connect-pg-simple.
- **Payments**: Stripe (configured).
- **Email Service**: Resend (configured, requires domain verification).