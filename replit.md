# LUT Maker

## Overview

LUT Maker is a professional color grading tool that allows users to analyze images and generate Look-Up Tables (LUTs) for video and photo editing. Users can upload images, view detailed color analysis, preview LUT effects in real-time, and download professional .cube or .3dl LUT files. The application features a sophisticated dark-mode interface inspired by professional creative tools like Adobe Lightroom and Capture One.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript and Vite as the build tool

**Routing**: Wouter for lightweight client-side routing

**State Management**: 
- React Query (TanStack Query) for server state management and API caching
- Local React state for UI interactions
- Custom context providers for theme management

**UI Components**:
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library built on top of Radix UI
- Custom components for domain-specific features (ComparisonSlider, ColorStatistics, LutControls, UploadZone)

**Styling**:
- Tailwind CSS for utility-first styling
- CSS variables for theming (light/dark mode support)
- Custom design system following professional photography tool aesthetics
- Inter font for UI, JetBrains Mono for technical data
- Color-neutral dark background (220 15% 8%) for accurate color preview

**Design Patterns**:
- Component composition with Radix UI's Slot pattern
- Controlled components for form inputs
- Custom hooks for reusable logic (useToast, useIsMobile, useTheme)

### Backend Architecture

**Runtime**: Node.js with Express.js

**API Design**: RESTful endpoints under `/api` prefix
- POST `/api/analyze` - Image color analysis
- POST `/api/preview` - Generate LUT preview with applied effects
- POST `/api/generate` - Generate downloadable LUT files

**Image Processing**:
- Sharp library for high-performance image manipulation
- In-memory processing with Buffer handling
- Base64 image encoding for client-server communication
- Color analysis algorithms for extracting dominant colors, histograms, brightness, and saturation

**LUT Generation**:
- Custom algorithms to derive color transforms from image analysis
- Support for multiple grid sizes (17x17x17, 33x33x33, 65x65x65)
- Multiple output formats (.cube, .3dl)
- Intensity control (0-100%) for LUT strength
- LUT caching system using Map for preview generation performance

**File Handling**:
- Multer middleware for multipart/form-data handling
- In-memory storage strategy for temporary file processing
- No persistent file storage - all operations are transient

### Data Storage

**Database**: PostgreSQL via Neon serverless
- Drizzle ORM for type-safe database operations
- Schema definitions in `shared/schema.ts`
- Migration support via drizzle-kit

**Current Schema**:
- User management (in-memory fallback via MemStorage class)
- LUT analysis response schemas (dominantColors, averageBrightness, averageSaturation, rgbHistogram)
- LUT generation request/response schemas with Zod validation

**Session Management**:
- Express session handling
- connect-pg-simple for PostgreSQL session storage
- Cookie-based authentication

**Note**: The application currently uses an in-memory storage fallback (MemStorage) for user data, but the infrastructure supports PostgreSQL through Drizzle ORM when DATABASE_URL is configured.

### External Dependencies

**Image Processing**:
- Sharp - High-performance image processing library for Node.js
- Supports JPG, PNG, HEIC formats

**UI Libraries**:
- Radix UI component primitives (accordion, dialog, dropdown, popover, slider, etc.)
- Embla Carousel for image carousels
- cmdk for command palette functionality
- Lucide React for icons

**Development Tools**:
- Vite for fast development and optimized production builds
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TSX for TypeScript execution in development

**Database & ORM**:
- @neondatabase/serverless for PostgreSQL connection
- Drizzle ORM for type-safe queries
- drizzle-zod for schema validation integration

**Validation & Forms**:
- Zod for runtime type validation
- React Hook Form with @hookform/resolvers for form management

**Styling & Utilities**:
- Tailwind CSS with PostCSS and Autoprefixer
- class-variance-authority for component variant management
- clsx and tailwind-merge for conditional class composition

**Date Handling**:
- date-fns for date manipulation and formatting