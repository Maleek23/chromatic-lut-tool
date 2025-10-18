# ColorKit by Untitled

## Overview
ColorKit is a professional toolkit for cinematographers and colorists, focused on LUT (Look-Up Table) conversion and analysis. It offers free tools for converting LUT files between .cube and .3dl formats and analyzing them for quality issues like banding and invalid points. The project aims to provide professional-grade features for color grading workflows, with a vision to expand into advanced functionalities like a professional preset library, custom preset saving, advanced optimization, batch processing, video LUT processing, and API access for team collaboration.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript and Vite.
- **Routing**: Wouter for client-side routing with hub-and-spoke architecture:
  - `/generate` - Image to LUT generator (main flagship feature)
  - `/tools` - Consolidated tabbed page (Convert/Analyze/Optimize)
  - `/dashboard` - User workspace with saved presets
  - `/auth` - Authentication flow
- **State Management**: Local React state, custom auth context, React Query for server state, and file upload state with drag-and-drop.
- **UI Components**: Radix UI primitives and shadcn/ui for accessible components, including a NavBar with theme toggle, tabbed interfaces, and file upload zones.
- **Styling**: Tailwind CSS for utility-first styling, CSS variables for theming (light/dark mode), and professional aesthetics.
- **Design Patterns**: Component composition, controlled components, custom hooks, tabbed navigation for tool consolidation, and debounced real-time preview updates.

### Backend
- **Runtime**: Node.js with Express.js.
- **API Design**: RESTful endpoints under `/api` for authentication and LUT processing.
- **LUT Processing**:
    - **Parser**: Handles .cube and .3dl formats, validates grid size and color values, and supports comments/metadata. Uses blue-fastest indexing order.
    - **Converter**: Converts between .cube and .3dl, supports grid resampling with trilinear interpolation, and preserves color accuracy.
    - **Analyzer**: Detects invalid points, identifies banding issues, and reports grid size/format.
- **File Handling**: Multer middleware for `multipart/form-data` with in-memory storage for transient processing; no persistent file storage.

### Data Storage
- **Database**: PostgreSQL via Neon serverless, using Drizzle ORM for type-safe operations.
- **Schema**: `users` (id, username, hashed password) and `presets` (id, name, userId, format, data, etc.) for future features. Zod for validation.
- **Session Management**: Express session with `connect-pg-simple` for PostgreSQL session storage, secured with a cookie and environment variable for the secret. Passport.js for authentication.
- **Storage Strategy**: Defaults to in-memory storage, with PostgreSQL support available when configured for user authentication and future preset library.

### System Design Choices
- **UI/UX**: Clean, modern design with a subtle gradient background, accent orb, and minimalist waveform decoration on the landing page. Feature cards have hover-elevate effects. Focus on accessibility with WCAG compliance, semantic color tokens, and no distracting animations.
- **Navigation Architecture**: Hub-and-spoke model with Image-to-LUT generation (`/generate`) as the main entry point, utility tools consolidated on `/tools` page with tabs, and user workspace on `/dashboard`. Streamlined navigation: Home | Generate | Tools | Dashboard.
- **Technical Implementations**: Image-to-LUT generation is the flagship feature. Free-tier features (Convert/Analyze/Optimize) are publicly accessible via `/tools`. Authentication is for Pro features (preset saving, advanced options). Server-side validation is enforced for all LUT operations. All CTAs emphasize image analysis and LUT generation workflow.
- **Feature Specifications**:
    - **LUT Conversion**: .cube ↔ .3dl, grid resampling, trilinear interpolation.
    - **LUT Analysis**: Banding detection, invalid point detection, out-of-range values.
    - **Authentication**: Username/password, secure hashing (bcrypt), session management.
    - **Tier-based Access Control**: Middleware enforces free/pro/studio tier requirements with dynamic rate limiting.
    - **Preset Management**: Save/delete presets with tier limits, apply presets to conversion form, and download functionality.
    - **Quality Options**: Grid size selector (17, 33, 65) with trilinear resampling.
    - **Image to LUT**: Analyze images to extract color science and generate LUTs.

## External Dependencies

- **File Processing**: Multer.
- **UI Libraries**: Radix UI, shadcn/ui, Embla Carousel, cmdk, Lucide React.
- **Development Tools**: Vite, Replit-specific plugins, TSX.
- **Database & ORM**: @neondatabase/serverless, Drizzle ORM, drizzle-zod.
- **Validation & Forms**: Zod, React Hook Form, @hookform/resolvers.
- **Styling & Utilities**: Tailwind CSS, PostCSS, Autoprefixer, class-variance-authority, clsx, tailwind-merge.
- **Date Handling**: date-fns.
- **Authentication**: Passport.js, bcrypt, express-session, connect-pg-simple.
- **Payments**: Stripe (blueprint configured, awaiting API keys).