# CHROMA by UN/TITLD

## Overview
CHROMA is a professional toolkit for cinematographers and colorists, offering comprehensive LUT (Look-Up Table) conversion, generation, and analysis. It provides industry-standard support for all major LUT formats with a freemium pricing model. The project aims to provide an essential tool for creators and professionals in the color grading industry, featuring an Image-to-LUT generator that authentically extracts color science from reference images, and robust tools for LUT conversion and analysis.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript and Vite.
- **Routing**: Wouter for client-side routing.
- **State Management**: Local React state, custom auth context, React Query for server state.
- **UI Components**: Radix UI primitives and shadcn/ui for accessible components.
- **Typography**: Inter font family exclusively for clean, professional aesthetic.
- **Styling**: Strict minimalism - static backgrounds with simple gradients, no decorative animations or effects.
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