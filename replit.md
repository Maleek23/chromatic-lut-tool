# ColorKit by Untitled

## Overview

ColorKit is a professional LUT conversion and analysis toolkit for cinematographers and colorists. The application provides free-tier tools for converting LUT files between .cube and .3dl formats, and analyzing them for quality issues including banding, invalid points, and out-of-range values. Built for professional workflows with DaVinci Resolve, Premiere Pro, and other color grading software.

**Brand**: ColorKit by Untitled (Leekshotit Photography/Untitled Agency)

**Current Phase**: Phase 1 MVP Complete
- ✅ LUT format conversion (.cube ↔ .3dl)
- ✅ LUT quality analysis (banding detection, invalid points)
- ✅ Username/password authentication
- ✅ Three-tier pricing display (Free/Pro/Studio)
- ✅ Public access to core tools (no login required for Free tier)

**Planned Features** (Pro/Studio tiers):
- Professional preset LUT library
- Custom preset saving
- Advanced optimization algorithms
- Batch processing
- Video LUT processing
- API access
- Team collaboration

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript and Vite as the build tool

**Routing**: Wouter for lightweight client-side routing
- `/` - Landing page with features, pricing, and how-it-works
- `/convert` - LUT format converter (public access, no login required)
- `/analyze` - LUT quality analyzer (public access, no login required)
- `/auth` - Login and registration page
- Navigation bar with links to all pages and theme toggle

**State Management**: 
- Local React state for UI interactions
- Custom auth context provider with useAuth hook
- React Query for server state management
- File upload state management with drag-and-drop support

**UI Components**:
- Radix UI primitives for accessible, unstyled components
- shadcn/ui component library built on top of Radix UI
- NavBar component with authentication status and theme toggle
- File upload zones with drag-and-drop support
- Toast notifications for user feedback

**Styling**:
- Tailwind CSS for utility-first styling
- CSS variables for theming (light/dark mode support)
- Clean, modern design with professional aesthetics
- Tooltips on technical controls for user guidance

**Design Patterns**:
- Component composition with Radix UI's Slot pattern
- Controlled components for form inputs
- Custom hooks for reusable logic (useToast, useTheme)
- Real-time preview updates with debouncing (300ms delay)

### Backend Architecture

**Runtime**: Node.js with Express.js

**API Design**: RESTful endpoints under `/api` prefix

**Authentication Endpoints**:
- POST `/api/register` - Create new user account (username/password)
- POST `/api/login` - Authenticate user
- POST `/api/logout` - End user session
- GET `/api/user` - Get current user info

**LUT Processing Endpoints**:
- POST `/api/lut/parse` - Parse uploaded LUT file (.cube or .3dl)
- POST `/api/lut/convert` - Convert LUT between formats with optional resampling
- POST `/api/lut/analyze` - Analyze LUT for quality issues

**LUT Parser** (`server/utils/lutParser.ts`):
- Parses .cube format (Resolve/Premiere compatible)
- Parses .3dl format (industry standard)
- Blue-fastest indexing order: `r*size*size + g*size + b`
- Validates grid size and color values
- Supports comments and metadata

**LUT Converter**:
- Converts between .cube and .3dl formats
- Grid resampling with trilinear interpolation
- Maintains blue-fastest indexing order
- Preserves color accuracy during conversion
- Automatic filename generation with timestamps

**LUT Analyzer**:
- Detects invalid points (out-of-range RGB values)
- Identifies banding issues
- Reports grid size and format
- Quality warnings and recommendations

**File Handling**:
- Multer middleware for multipart/form-data handling
- In-memory storage strategy for temporary file processing
- No persistent file storage - all operations are transient

### Data Storage

**Database**: PostgreSQL via Neon serverless
- Drizzle ORM for type-safe database operations
- Schema definitions in `shared/schema.ts`
- Migration support via drizzle-kit

**Current Schema** (`shared/schema.ts`):
- `users` table: id, username, password (hashed with bcrypt)
- `presets` table: id, name, userId, format, data, isPublic, createdAt (ready for future preset library)
- Zod validation schemas for all API requests/responses
- Type-safe insert and select types using Drizzle

**Session Management**:
- Express session with secure cookie handling
- connect-pg-simple for PostgreSQL session storage
- Session secret from environment variable (SESSION_SECRET)
- Passport.js with local strategy for username/password auth

**Storage Strategy**:
- In-memory storage (MemStorage class) used as default
- PostgreSQL support available when DATABASE_URL is configured
- User authentication fully functional with in-memory storage
- Future preset library will use database storage

### External Dependencies

**File Processing**:
- Multer for handling multipart/form-data file uploads
- In-memory file processing (no persistent storage)
- LUT file parsing and validation

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

## Recent Changes (October 17, 2025)

**Phase 1 MVP Completed**:
1. Implemented username/password authentication system with secure password hashing
2. Created database schema for users and presets (ready for future features)
3. Built complete LUT parser supporting .cube and .3dl formats with blue-fastest indexing
4. Implemented LUT format converter with grid resampling and trilinear interpolation
5. Created LUT quality analyzer detecting banding, invalid points, and out-of-range values
6. Built Convert page with file upload, validation, conversion, and automatic download
7. Built Analyze page with quality analysis and detailed reporting
8. Added comprehensive pricing section to Landing page (Free/Pro/Studio tiers)
9. Verified all functionality with end-to-end tests

**UI Enhancements (Phase 1.1)**:
1. Added professional hero image to Landing page with gradient overlay for visual appeal
2. Created BeforeAfterSlider component for interactive LUT comparison
3. Integrated before/after demo sliders on Convert page showing LUT effects
4. Integrated before/after demo sliders on Analyze page for visual demonstration
5. All visual improvements verified with end-to-end tests

**Architecture Decisions**:
- Free tier features (Convert/Analyze) are publicly accessible without login
- Authentication required only for future Pro features (presets, batch processing)
- LUT indexing uses blue-fastest order (r*size*size + g*size + b) for color accuracy
- Server-side validation enforced for all LUT operations
- In-memory storage for Phase 1; database ready for Phase 2 preset library

**Security**:
- Password hashing with bcrypt
- Session management with secure cookies
- API responses sanitized (no password hash leakage)
- Input validation with Zod schemas

**Pro Tier Implementation (Phase 2 - October 17, 2025)**:
1. PostgreSQL Storage Layer - Full CRUD operations with Drizzle ORM, conditional fallback to MemStorage
2. Tier-Based Access Control - Server middleware enforcing tier requirements (free/pro/studio hierarchy)
3. Rate Limiting - Dynamic limits per tier (free: 10/15min, pro: 100/15min, studio: 1000/15min)
4. Dashboard Page - Real-time usage stats, preset management, tier display with upgrade prompts
5. Preset Management - Save/delete presets with tier limits (free: 3 max, pro: unlimited)
6. Export Quality Options - Grid size selector (17x17x17, 33x33x33, 65x65x65) with actual trilinear resampling
7. Usage Tracking - Conversion and preview counters persisted to database
8. Stripe Integration - Blueprint configured, ready for payment flow when API keys provided
9. Security Enhancements - Password complexity requirements (8+ chars, uppercase, number, special)
10. Comprehensive Testing - All features verified with end-to-end playwright tests

**Bug Fixes**:
1. Dashboard Stats Cache - Fixed React Query staleTime (Infinity → 0) to ensure fresh preset counts
2. Grid Size Resampling - Normalized targetFormat parameter to handle both 'cube' and '.cube' formats correctly

**Verification**:
- ✅ All Pro tier features tested and passing
- ✅ Grid size resampling confirmed working (17/33/65 produce exact expected output sizes)
- ✅ Dashboard displays accurate real-time statistics from database
- ✅ Tier-based access control enforced on both client and server
- ✅ Rate limiting active and respecting tier levels
- ✅ Preset save/delete operations persisting correctly to PostgreSQL

**Preset Toggle and Apply System (Phase 3 - October 18, 2025)**:
1. Branding Enhancement - Changed Palette icon to Pipette (chroma dropper) icon across navbar, landing, and auth pages
2. File Upload Support - Extended Multer validation to support .cube, .3dl, .png, .jpg, .jpeg, .mp4, .mov, .avi formats
3. Convert Page Tabs UI - Implemented controlled tabs switching between "Upload LUT" and "My Presets" modes
4. Preset Selector UI - Built preset card list with Apply and Download buttons for each saved preset
5. Preset Apply Functionality - Complete workflow: fetches preset → parses → loads into conversion form → switches to upload tab
6. Error Handling - Comprehensive validation: checks response.ok, parseResponse.ok, and result.success before proceeding
7. State Management - Clears stale parseResult and uploadedFile on failures to prevent invalid conversions
8. MIME Type Support - Proper Content-Type headers for downloads (text/plain for LUTs, video/quicktime for MOV, video/x-msvideo for AVI, etc.)
9. Storage Interface - Added getPreset method to IStorage, implemented in both MemStorage and PostgresStorage
10. API Routes - GET /api/presets/:id/download endpoint with proper filename and MIME type handling
11. End-to-End Testing - All preset workflows verified: create, list, apply, download, error handling

**Verification**:
- ✅ Preset apply flow loads LUT into conversion form and switches tabs automatically
- ✅ Error handling prevents conversions with invalid/failed presets
- ✅ MIME types correctly set for all supported file formats
- ✅ UI state properly reflects validation failures
- ✅ Download functionality works for all preset types
- ✅ Comprehensive e2e tests verify complete user workflows

**Authentication & Messaging Improvements (Phase 3.1 - October 18, 2025)**:
1. Login Error Messages - Enhanced error specificity for better UX:
   - "User not found. Please register first." when username doesn't exist
   - "Incorrect password. Please try again." when password is wrong
   - Modified LocalStrategy in server/auth.ts to differentiate errors
   - Updated /api/login endpoint to use custom callback returning JSON error messages
2. IMAGE to LUT Feature Repositioning - Emphasized image analysis as the MAIN feature:
   - Landing hero: "Analyze any image for color grading and convert to professional LUTs"
   - Features section: "Image Analysis - Analyze any image (color graded footage, reference stills) to extract color science and generate LUTs"
   - How It Works: "Upload Image or LUT → Analyze & Extract → Analyze & Optimize → Convert & Export"
   - Pro tier features: "Image color analysis & LUT extraction" (removed "coming soon" tag)
   - AuthPage tagline: "Analyze images for color grading and generate professional LUTs"
3. Brand Identity - Pipette icon represents chroma/color sampling (not generic palette)

**Verification**:
- ✅ Login error messages tested and working correctly via e2e tests
- ✅ Image analysis positioned as primary feature across all marketing copy
- ✅ Messaging consistency verified across Landing, Auth, and feature pages
- ✅ No contradictions between "available now" and "coming soon" features

**Pending** (requires user action):
- Stripe payment flow activation (waiting for STRIPE_SECRET_KEY and VITE_STRIPE_PUBLIC_KEY from user)