# CHROMA by UN/TITLD

## Overview
CHROMA is a professional toolkit for cinematographers and colorists, offering comprehensive LUT (Look-Up Table) conversion, generation, and analysis. It provides industry-standard support for all major LUT formats with a freemium pricing model. The project aims to provide an essential tool for creators and professionals in the color grading industry, featuring an Image-to-LUT generator that authentically extracts color science from reference images, and robust tools for LUT conversion and analysis.

## Recent Changes
- **2025-10-24**: Comprehensive cinema-grade visual refinement - reduced hero glow to subtle multi-layer system (opacity 0.15/0.12/0.08 with mix-blend-mode screen, 8s breathing animation), updated grid to fixed overlay with gradient masks for seamless top/bottom fade (0-10%, 90-100%), reduced header/footer to glassmorphism effect (bg/20 with 20px blur) with embedded grid overlays (0.08 opacity matching main grid), achieving atmospheric professional aesthetic that flows organically across entire page. Removed "by UN/TITLD" from header, moved UN/TITLD animation to footer copyright only.
- **2025-10-24**: Completed comprehensive color consistency audit across entire application - systematically replaced ALL hardcoded color values (purple-500, cyan-500, blue-500, pink-500, hex colors in SVGs) with semantic tokens (primary, chart-2, chart-3) in 9 files: AuthPage, Upgrade, Convert, InstallLuts, LutFormats, SixStageArchitecture, UpgradePrompt, ColorCube3D, PreviewGallery. Warm coral pink aesthetic now consistently applied throughout app.
- **2025-10-24**: Added subtle technical grid pattern (24px) to main background extending across entire app including header/footer for professional blueprint aesthetic. Added centered ambient coral pink/blue-purple/red glow to hero section.
- **2025-10-24**: Updated color palette to cinematic warmth spectrum - coral salmon pink accent (12°), matching logo's brightest colors. Blue-purple primary (240°) → coral pink (12°) → red (0°) gradient for warm, inviting aesthetic.
- **2025-10-24**: Enlarged logo to h-32/h-40, centered layout with "By UN/TITLD" below, reduced headline size for better visual hierarchy. UN/TITLD animation speed increased to 300ms for snappier interaction.
- **2025-10-24**: Fixed 5 production-critical LUT generator bugs: NaN propagation in gamma correction, division by zero in tonemap/clustering/image preprocessing, floating-point precision in gamut mapping, silent failures on corrupted images.
- **2025-10-22**: Substantially improved Settings, Generate, and Tools pages with director-level UI/UX enhancements - refined layouts, better spacing, improved visual hierarchy, cleaner cards, professional aesthetics using CHROMA gradient colors throughout.
- **2025-10-22**: Director-level UI/UX enhancements to header and footer - reduced header height (h-14), refined active states with gradient bottom borders, compact footer with single-row layout, improved tier badge design, tighter spacing throughout.
- **2025-10-22**: Fixed Landing and How It Works pages to use CHROMA gradient palette consistently - replaced all literal color gradients with semantic tokens (primary, chart-2, chart-3).
- **2025-10-22**: Completed systematic page consistency audit - fixed all pages to use correct gradient colors and removed all nested CinemaBackground wrappers for optimal performance.
- **2025-10-22**: Simplified Dashboard layout - removed Color Scopes histogram section and Live Preview workspace. Dashboard now features only Quick Actions (4 cards), Recent Activity, and Usage Stats.
- **2025-10-22**: Reduced UploadZone height from 500px to 280px with smaller icons (48px) and more compact typography for professional, space-efficient design.

## User Preferences
Preferred communication style: Simple, everyday language.
Color Scheme: Cinematic warmth spectrum - blue-purple primary (240° brand identity), coral salmon pink chart-2 (12° matching logo), red chart-3 (0°). Warm, inviting, high-contrast gradient. ALL pages use semantic tokens consistently.
Design: Cinema-grade professional aesthetic with translucent cards, minimal layout, no childish or overly decorative elements

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript and Vite.
- **Routing**: Wouter for client-side routing.
- **State Management**: Local React state, custom auth context, React Query for server state.
- **UI Components**: Radix UI primitives and shadcn/ui for accessible components.
- **Typography**: Inter font family exclusively for clean, professional aesthetic.
- **Styling**: Professional minimalism - static backgrounds with simple gradients, translucent cards with backdrop blur, smooth hover effects, and gradient icon accents. No decorative animations.
- **Card Pattern**: Consistent across all pages - `bg-background/80 backdrop-blur-sm hover-elevate transition-all duration-300` for sleek, interactive depth.
- **Icon Containers**: Gradient backgrounds (w-10/w-12 h-10/h-12 rounded-xl bg-gradient-to-br from-{color}/20 to-{color}/20) for visual hierarchy on key features.
- **Visual Components**: Only science-based visualizations that demonstrate actual color processing (ColorCube3D for 3D L*a*b* color space, tone curve graphs, color cluster displays, gamut visualization, histogram charts, before/after LUT comparisons, quality gauges).
- **CinemaBackground**: Centralized static background component with simple gradient (no animations or orbs), providing consistent minimal theming across all pages. Single instance in App.tsx ensures optimal performance.
- **Design Patterns**: Component composition, controlled components, custom hooks, tabbed navigation, debounced real-time preview updates.
- **SEO**: Comprehensive meta tags (Open Graph, Twitter Cards) and keyword optimization.

### Backend
- **Runtime**: Node.js with Express.js.
- **API Design**: RESTful endpoints under `/api` for authentication and LUT processing.
- **LUT Processing**:
    - **Parser**: Supports .cube (3D), .3dl (3D), and .lut (1D) with auto-detection, validation, metadata.
    - **Generator**: Professional color science pipeline (ACEScg conversion, denoising, K-means clustering, dense histograms, skin tone detection, Lab/LCh operations, filmic tone curves, gamut mapping). Exports to .cube, .3dl, .lut, .look, .xmp.
    - **Converter**: Converts between supported formats with grid resampling (17x17x17, 33x33x33, 65x65x65) using trilinear interpolation.
    - **Analyzer**: Detects invalid points, identifies banding, reports quality metrics, and provides quality scoring.
    - **Optimizer**: Clamps RGB values to [0,1], handles invalid values, supports format conversion.
- **File Handling**: Multer for `multipart/form-data` with in-memory storage.

### Data Storage
- **Database**: PostgreSQL via Neon serverless, using Drizzle ORM.
- **Schema**: Users (id, email, password, tier, profile details, usage), presets (id, name, userId, folder, format, lutData), password_reset_tokens.
- **Session Management**: Express session with `connect-pg-simple` and Passport.js.

### System Design Choices
- **UI/UX**: Strict minimalism - clean, professional interface focused on functionality and color science tools only.
- **Navigation Architecture**: Hub-and-spoke model with Image-to-LUT generation as the main entry point.
- **Pricing Strategy**: Freemium model with Free, Creator, Pro, and Studio tiers, integrated with Stripe.
- **Technical Implementations**: Professional color science pipeline verified against VES/CIE standards (ACEScg/Lab/LCh transforms, k-means clustering, filmic tone curves, gamut mapping, skin tone protection, blue-fastest indexing, trilinear interpolation, server-side validation, real-time preview).
- **Feature Specifications**:
    - **Image to LUT**: Cinema-grade color extraction, tier-dependent grid size and output format.
    - **LUT Conversion**: Tier-dependent format support and grid resampling.
    - **LUT Analysis**: Quality scoring, banding/invalid point detection, RGB statistics.
    - **LUT Optimization**: Clamps RGB values.
    - **Authentication**: Email/password with crypto.scrypt hashing, session management, tier-based feature access, password reset.
    - **User Profiles**: Professional details (occupation, company, experience), bio, social links (website, Twitter, Instagram, LinkedIn), editable in Account Settings.
    - **Preset Management**: Saving and organization with tier-dependent limits and metadata.
    - **Usage Tracking**: Monthly conversions tracked for Free tier.
    - **Email Delivery**: Automatic email delivery of generated LUT files and password reset emails via Resend.
    - **Support Page**: Comprehensive support center (`/support`) with email contact (hello@untitld.co), FAQ section, and documentation links.

## External Dependencies

- **Image Processing**: Sharp.
- **File Processing**: Multer.
- **UI Libraries**: Radix UI, shadcn/ui, Embla Carousel, cmdk, Lucide React.
- **Database & ORM**: @neondatabase/serverless, Drizzle ORM, drizzle-zod.
- **Validation & Forms**: Zod, React Hook Form, @hookform/resolvers.
- **Styling & Utilities**: Tailwind CSS, PostCSS, Autoprefixer, class-variance-authority, clsx, tailwind-merge.
- **Date Handling**: date-fns.
- **Authentication**: Passport.js, bcrypt, express-session, connect-pg-simple.
- **Payments**: Stripe.
- **Email Service**: Resend.