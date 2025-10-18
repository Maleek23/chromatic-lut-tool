# CHROMA by UN/TITLD

## Overview
CHROMA is a professional toolkit for cinematographers and colorists, providing comprehensive LUT (Look-Up Table) conversion, generation, and analysis. It offers industry-standard support for all major LUT formats with free unlimited access to core features. The flagship Image-to-LUT generator authentically extracts color science from reference images, while conversion and analysis tools ensure quality and compatibility across professional color grading software.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript and Vite.
- **Routing**: Wouter for client-side routing with hub-and-spoke architecture:
  - `/` - Landing page with pricing tiers and feature overview
  - `/generate` - Image to LUT generator (main flagship feature)
  - `/tools` - Consolidated tabbed page (Convert/Analyze/Optimize)
  - `/dashboard` - User workspace with saved presets
  - `/auth` - Authentication flow
- **State Management**: Local React state, custom auth context, React Query for server state, and file upload state with drag-and-drop.
- **UI Components**: Radix UI primitives and shadcn/ui for accessible components, including a NavBar with theme toggle, tabbed interfaces, and file upload zones.
- **Styling**: Tailwind CSS with cinematic gradient effects, animated color orbs, film grain overlays, chromatic aberration typography, and backdrop blur for modern glass-morphism aesthetic.
- **Design Patterns**: Component composition, controlled components, custom hooks, tabbed navigation for tool consolidation, and debounced real-time preview updates.
- **SEO**: Comprehensive meta tags including Open Graph and Twitter Cards for social sharing, keyword optimization for color grading and LUT tools.

### Backend
- **Runtime**: Node.js with Express.js.
- **API Design**: RESTful endpoints under `/api` for authentication and LUT processing.
- **LUT Processing**:
    - **Parser**: Supports .cube (3D), .3dl (3D), and .lut (1D) formats with auto-detection, validates grid size and color values, supports comments/metadata. Uses industry-standard blue-fastest indexing order (R slowest → G middle → B fastest).
    - **Generator**: Authentic color science extraction from images with zone-based analysis (shadows/midtones/highlights), deriving color transforms for brightness, contrast, saturation, and color shifts. Supports advanced controls and split toning.
    - **Converter**: Converts between all supported formats (.cube ↔ .3dl ↔ .lut), supports grid resampling (17×17×17, 33×33×33, 65×65×65) with trilinear interpolation for smooth color transformations, preserves color accuracy.
    - **Analyzer**: Detects invalid points (RGB outside [0,1]), identifies banding issues (>10% consecutive identical values), reports quality metrics (min/max/avg values), provides quality scoring.
- **File Handling**: Multer middleware for `multipart/form-data` with in-memory storage for transient processing; no persistent file storage.

### LUT Format Specifications

#### .cube (3D LUT) - Primary Format ✅ IMPLEMENTED
- **Developer**: Filmic Pro
- **Compatibility**: Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, After Effects (widest support)
- **Type**: 3D color mapping (all RGB channels mapped simultaneously)
- **Grid Sizes**: Variable (17×17×17, 33×33×33, 65×65×65) for different precision levels
- **Value Range**: Normalized 0.0 to 1.0
- **Features**: 
  - Supports complex color adjustments and stylized looks
  - Fully adjustable with fine color gradation
  - Optional metadata (TITLE, DOMAIN_MIN, DOMAIN_MAX)
- **Use Cases**: Professional color grading, cinematic looks, conversion LUTs, stylized LUTs

#### .3dl (3D LUT) - Professional Format ✅ IMPLEMENTED
- **Developer**: Autodesk/Lustre
- **Compatibility**: Avid Media Composer, Adobe Premiere Pro, DaVinci Resolve, Smoke
- **Type**: 3D color mapping
- **Grid Size**: Fixed 33×33×33 (industry standard)
- **Value Range**: 12-bit integers (0-4095)
- **Features**:
  - Professional-grade precision
  - Zone-specific adjustments possible
  - Supports complex color transformations
- **Use Cases**: Broadcast workflows, high-end post-production, professional color grading

#### .lut (1D LUT) - Simple Format ✅ IMPLEMENTED
- **Compatibility**: Various software programs (limited compared to 3D formats)
- **Type**: 1D color mapping (each RGB channel independent)
- **Grid Size**: Typically 256 or 1024 entries per channel
- **Value Range**: Normalized 0.0 to 1.0 or 8/10/12-bit integers
- **Features**:
  - Simple, fast processing
  - Smaller file sizes
  - Limited to per-channel adjustments
- **Limitations**: Cannot perform complex color shifts (e.g., changing specific hue without affecting others)
- **Use Cases**: Basic color correction, gamma adjustments, contrast curves, simple looks

#### .aml (Advanced Multilayer LUT) - Future Feature 🔮 PLANNED
- **Type**: Multi-layer 3D LUT with stacking capabilities
- **Features**:
  - Multiple layers of adjustments applied simultaneously
  - Complex color grading effects in single file
  - Advanced metadata and layer management
- **Compatibility**: Specialized color grading programs only
- **Status**: Planned for Studio tier as advanced feature

### Data Storage
- **Database**: PostgreSQL via Neon serverless, using Drizzle ORM for type-safe operations.
- **Schema**: `users` (id, username, hashed password, tier) and `presets` (id, name, userId, format, data, gridSize, etc.). Zod for validation.
- **Session Management**: Express session with `connect-pg-simple` for PostgreSQL session storage, secured with a cookie and environment variable for the secret. Passport.js for authentication.
- **Storage Strategy**: In-memory for LUT processing, PostgreSQL for user data and saved presets.

### System Design Choices
- **UI/UX**: Cinematic color grading aesthetic with gradient effects, animated color orbs, film grain overlays, chromatic aberration on headings, backdrop blur cards, and professional visual hierarchy.
- **Navigation Architecture**: Hub-and-spoke model with Image-to-LUT generation (`/generate`) as the main entry point, utility tools consolidated on `/tools` page with tabs, and user workspace on `/dashboard`. Streamlined navigation: Home | Generate | Tools | Dashboard.
- **Pricing Strategy**: 4-tier system fully implemented with feature gating
    - **Free Tier ($0/forever)**: Standard quality features - Image→LUT generation (17×17×17 grid), basic conversions (.cube→.3dl), banding detection (preview only), export in .cube format, no preset saving, community access. Perfect for creators exploring color grading.
    - **Creator Tier ($6-7/month)**: Mid-tier option - 33×33×33 grid size, .cube format only, 20-30 preset limit, priority processing queue. For content creators who need better quality than free.
    - **Pro Tier ($12/month or $99/year)**: Everything in Creator plus - Unlimited grid sizes (17×17×17→65×65×65), all format conversions (.cube↔.3dl↔.lut), full-quality analysis & precision exports, unlimited presets, preset library dashboard, Lightroom-style presets (coming), batch processing (coming), priority support.
    - **Studio Add-on ($25/month, coming soon)**: For agencies or YouTube colorists - Custom branded LUTs, team preset sharing, early access to experimental AI grading features.
    - Authentication required for all features. Stripe integration handles subscriptions with automatic tier upgrades via webhooks.
    - Test accounts available: free_test_user, creator_test_user, pro_test_user, studio_test_user (all use password "test123")
- **Technical Implementations**: 
  - Image-to-LUT generation uses authentic color science extraction with zone-based analysis
  - All LUT operations use industry-standard blue-fastest indexing (index = r×size² + g×size + b)
  - Trilinear interpolation ensures smooth resampling between grid sizes
  - Server-side validation enforced for all LUT operations
  - Real-time preview with intensity control
- **Feature Specifications**:
    - **Image to LUT**: Authentic color extraction, zone-based analysis (shadows/midtones/highlights), intensity control (0-100%), grid size selection (Free: 17 only, Pro: 17/33/65), format output (Free: .cube only, Pro: .cube/.3dl/.lut), precision (8/10/12-bit), optional preview generation.
    - **LUT Conversion**: Format support (Free: .cube→.3dl basic, Pro: .cube↔.3dl↔.lut full), grid resampling with trilinear interpolation (Pro only for all sizes), format auto-detection, precision preservation.
    - **LUT Analysis**: Quality scoring, banding detection (Free: preview only, Pro: full analysis), invalid point detection, out-of-range value reporting, RGB statistics (min/max/avg), format validation.
    - **Authentication**: Username/password with bcrypt hashing, session management, tier-based feature access enforced at middleware level.
    - **Preset Management**: Preset saving (Free: 0, Pro: unlimited), organize by project/style, apply to conversion, download in any format, metadata tracking.

## External Dependencies

- **Image Processing**: Sharp for image analysis and manipulation.
- **File Processing**: Multer for multipart uploads.
- **UI Libraries**: Radix UI, shadcn/ui, Embla Carousel, cmdk, Lucide React.
- **Development Tools**: Vite, Replit-specific plugins, TSX.
- **Database & ORM**: @neondatabase/serverless, Drizzle ORM, drizzle-zod.
- **Validation & Forms**: Zod, React Hook Form, @hookform/resolvers.
- **Styling & Utilities**: Tailwind CSS, PostCSS, Autoprefixer, class-variance-authority, clsx, tailwind-merge.
- **Date Handling**: date-fns.
- **Authentication**: Passport.js, bcrypt, express-session, connect-pg-simple.
- **Payments**: Stripe (blueprint configured, awaiting API keys).

## Technical Notes

### LUT Indexing and Ordering
All 3D LUT operations use **blue-fastest indexing order**:
- Loop order: R (slowest) → G (middle) → B (fastest)
- Array index calculation: `index = r × size² + g × size + b`
- This matches industry standards for .cube, .3dl, and professional color grading software
- Trilinear interpolation uses this indexing for accurate color lookups

### Color Science Implementation
- Zone-based analysis separates pixels into shadows (<33% luminance), midtones (33-67%), highlights (>67%)
- Weighted color transforms applied based on zone distribution
- RGB ↔ HSL conversions for saturation adjustments
- Luminance calculation: `0.299×R + 0.587×G + 0.114×B`
- Contrast and brightness applied zone-specifically for natural results

### Image Processing Security
- **Sharp Pipeline**: Single-pass processing with security safeguards
  - `limitInputPixels: 268402689` (max 16384×16384) prevents resource exhaustion attacks
  - `failOn: 'none'` tolerates minor image corruption/unknown chunks
  - `toColorspace('srgb')` ensures consistent color channel ordering across formats
  - No intermediate PNG round-trips for optimal performance
- **Processing Flow**: decode → resize → sRGB conversion → alpha removal → raw extraction
- **Applied To**: analyzeImage(), deriveColorTransform(), applyLUTToImage()

### Quality Assurance
- All RGB values validated to be within [0,1] range
- Banding detection checks for >10% consecutive identical values
- Grid size validation (2-256 for .cube, fixed 33 for .3dl)
- Format-specific validation (12-bit for .3dl, normalized for .cube)
- Trilinear interpolation preserves smooth gradients during resampling

## Recent Changes

### October 2025
- **Rebranding**: Changed from "CHROMATIC" to "CHROMA by UN/TITLD" across all UI components
- **4-Tier Pricing**: Implemented complete tier system (Free, Creator, Pro, Studio) with backend middleware for feature gating
- **Light Theme Improvements**: Enhanced contrast for borders (88%→84%), text (45%→38%), and inputs for better visibility
- **Security Hardening**: Fixed Sharp image processing with secure single-pass pipeline, proper pixel limits, and sRGB color space conversion
- **Test Accounts**: Created test_user accounts for each tier with password "test123"
