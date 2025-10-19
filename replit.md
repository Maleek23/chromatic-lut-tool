# CHROMA by UN/TITLD

## Overview
CHROMA is a professional toolkit for cinematographers and colorists, offering comprehensive LUT (Look-Up Table) conversion, generation, and analysis. It provides industry-standard support for all major LUT formats with a freemium pricing model: Free tier gets 3 monthly Image-to-LUT generations (resets on 1st), then $2.50 per additional LUT (pay-per-use), or upgrade to Creator tier ($7/mo) for unlimited generations. Key capabilities include an Image-to-LUT generator that authentically extracts color science from reference images, and robust tools for LUT conversion and analysis to ensure quality and compatibility across professional color grading software. The project aims to provide an essential tool for creators and professionals in the color grading industry.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes (October 19, 2025)
- **Fixed filename sync bug**: DownloadSection now properly updates filename when grid size changes between generations. Added useEffect to sync internal filename state with defaultFilename prop, preventing stale filenames from previous generations.
- **Verified Free tier restrictions**: Testing confirmed 3/month limit, 17×17×17 grid restriction, and .cube format restriction all working correctly.
- **Confirmed email delivery**: Implementation complete and working, awaiting domain verification on Resend dashboard for production use.

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript and Vite.
- **Routing**: Wouter for client-side routing with a hub-and-spoke architecture (`/`, `/generate`, `/tools`, `/dashboard`, `/auth`).
- **State Management**: Local React state, custom auth context, React Query for server state, and file upload state.
- **UI Components**: Radix UI primitives and shadcn/ui for accessible components; includes NavBar, tabbed interfaces, and file upload zones.
- **Styling**: Tailwind CSS with a cinematic aesthetic, featuring gradient effects, animated color orbs, film grain overlays, chromatic aberration typography, and backdrop blur.
- **Design Patterns**: Component composition, controlled components, custom hooks, tabbed navigation, and debounced real-time preview updates.
- **SEO**: Comprehensive meta tags (Open Graph, Twitter Cards) and keyword optimization.

### Backend
- **Runtime**: Node.js with Express.js.
- **API Design**: RESTful endpoints under `/api` for authentication and LUT processing.
- **LUT Processing**:
    - **Parser**: Supports .cube (3D), .3dl (3D), and .lut (1D) formats with auto-detection, validation, and metadata support. Uses blue-fastest indexing.
    - **Generator**: Extracts color science from images using zone-based analysis (shadows/midtones/highlights) to derive color transforms. Supports advanced controls and split toning.
    - **Converter**: Converts between supported formats (.cube ↔ .3dl ↔ .lut) with grid resampling (17x17x17, 33x33x33, 65x65x65) using trilinear interpolation.
    - **Analyzer**: Detects invalid points, identifies banding, reports quality metrics (min/max/avg values), and provides quality scoring.
    - **Optimizer**: Clamps RGB values to [0,1] range, handles invalid values, and supports format conversion during optimization.
- **File Handling**: Multer for `multipart/form-data` with in-memory storage for transient processing.

### LUT Format Specifications
- **.cube (3D LUT)**: Primary format, widely compatible (Adobe, DaVinci Resolve), variable grid sizes, normalized 0.0-1.0 range, supports complex adjustments.
- **.3dl (3D LUT)**: Professional format, compatible (Avid, Adobe, DaVinci Resolve), fixed 33x33x33 grid, 12-bit integer range, high precision.
- **.lut (1D LUT)**: Simple format, limited compatibility, 1D color mapping, fixed grid size (256/1024), normalized or integer range, limited to per-channel adjustments.
- **.aml (Advanced Multilayer LUT)**: **Planned future feature** (NOT currently implemented). Multi-layer 3D LUTs with stacking capabilities - used in specialized software with limited industry compatibility. May be added as Studio tier feature post-launch.

### Data Storage
- **Database**: PostgreSQL via Neon serverless, using Drizzle ORM.
- **Schema**: `users` (id, email, hashed password, tier) and `presets` (id, name, userId, format, data, gridSize). Zod for validation.
- **Session Management**: Express session with `connect-pg-simple` and Passport.js for authentication.
- **Storage Strategy**: In-memory for LUT processing, PostgreSQL for user data and saved presets.

### System Design Choices
- **UI/UX**: Cinematic color grading aesthetic with gradient effects, animated color orbs, film grain, chromatic aberration, and backdrop blur.
- **Navigation Architecture**: Hub-and-spoke model with Image-to-LUT generation as the main entry point, consolidated utility tools, and a user dashboard.
- **Pricing Strategy**: 
  - Free tier: 3 monthly Image-to-LUT generations (resets on 1st), then $2.50 per additional LUT (pay-per-use)
  - Creator tier ($7/mo): Unlimited Image-to-LUT generations + Lightroom presets (coming soon)
  - Pro tier ($12/mo): Unlimited + all tools (Analyzer, Optimizer) + all formats + email delivery (coming soon)
  - Studio tier ($25/mo): Team features (coming soon)
  - Stripe integration prepared for pay-per-use and subscriptions
  - **Conversion psychology**: Break-even at ~6 LUTs/month (3 free + $7.50 paid vs $7 Creator)
- **Technical Implementations**: Authentic color science extraction, industry-standard blue-fastest indexing for LUT operations, trilinear interpolation for resampling, server-side validation, and real-time preview.
- **Feature Specifications**:
    - **Image to LUT**: Authentic color extraction, zone-based analysis, intensity control, tier-dependent grid size and output format selection.
    - **LUT Conversion**: Tier-dependent format support and grid resampling capabilities.
    - **LUT Analysis**: Quality scoring, banding detection, invalid point detection, and RGB statistics with tier-based access to advanced features.
    - **LUT Optimization**: Clamps RGB values to valid range, handles invalid values, and provides optimization statistics.
    - **Authentication**: Email/password with bcrypt, session management, and tier-based feature access.
    - **Preset Management**: Saving and organization of presets with tier-dependent limits and metadata tracking.
    - **Usage Tracking**: Monthly conversions tracked for Free tier (3 free per month, resets on 1st, then pay-per-use at $2.50 per LUT). Paid tiers have unlimited generations.
    - **Email Delivery**: Automatic email delivery of generated LUT files via Resend with professional HTML template, LUT metadata, and file attachment. Implementation complete; requires domain verification on Resend dashboard for production use.
    - **Preset Management Note**: "Presets" in tier descriptions refers to saved LUTs (user-generated LUT files), NOT Lightroom .xmp or Photoshop .atn preset files (those are coming soon as Pro tier feature).

## External Dependencies

- **Image Processing**: Sharp for image analysis and manipulation.
- **File Processing**: Multer for multipart uploads.
- **UI Libraries**: Radix UI, shadcn/ui, Embla Carousel, cmdk, Lucide React.
- **Database & ORM**: @neondatabase/serverless, Drizzle ORM, drizzle-zod.
- **Validation & Forms**: Zod, React Hook Form, @hookform/resolvers.
- **Styling & Utilities**: Tailwind CSS, PostCSS, Autoprefixer, class-variance-authority, clsx, tailwind-merge.
- **Date Handling**: date-fns.
- **Authentication**: Passport.js, bcrypt, express-session, connect-pg-simple.
- **Payments**: Stripe (configured, awaiting API keys).
- **Email Service**: Resend (configured, API key provided, requires domain verification for production email delivery).