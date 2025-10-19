# CHROMA by UN/TITLD

## Overview
CHROMA is a professional toolkit for cinematographers and colorists, offering comprehensive LUT (Look-Up Table) conversion, generation, and analysis. It provides industry-standard support for all major LUT formats with a freemium pricing model. The project aims to provide an essential tool for creators and professionals in the color grading industry. Key capabilities include an Image-to-LUT generator that authentically extracts color science from reference images, and robust tools for LUT conversion and analysis to ensure quality and compatibility across professional color grading software.

## User Preferences
Preferred communication style: Simple, everyday language.

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
- **File Handling**: Multer for `multipart/form-data` with in-memory storage.

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
- **Pricing Strategy**: Freemium model: Free tier (3 monthly Image-to-LUT generations, then pay-per-use), Creator tier ($7/mo for unlimited), Pro tier ($12/mo for unlimited, all tools, all formats), Studio tier ($25/mo for team features). Stripe integration is prepared.
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