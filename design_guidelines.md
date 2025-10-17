# LUT Maker Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from professional creative tools like Adobe Lightroom, Capture One, and Linear's modern interface principles. This application demands visual sophistication while maintaining technical precision for color-critical workflows.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary** (professional photography tool aesthetic):
- Background: 220 15% 8% (deep charcoal, color-neutral for accurate preview)
- Surface: 220 12% 12% (subtle elevation)
- Border: 220 10% 20% (low-contrast dividers)
- Primary Accent: 200 100% 55% (vibrant cyan for CTAs and active states)
- Success: 142 70% 45% (LUT generation complete)
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 65%

**Light Mode** (optional toggle for bright environments):
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary remains: 200 100% 45% (adjusted for light background)

### B. Typography
**Font Stack**: Inter (via Google Fonts CDN) for UI, JetBrains Mono for technical data
- Hero Heading: 4xl/5xl, font-semibold (LUT Maker title)
- Section Headings: 2xl, font-semibold
- Body Text: base/lg, font-normal
- Technical Labels: sm, font-mono (RGB values, file formats)
- Button Text: sm/base, font-medium

### C. Layout System
**Tailwind Spacing Primitives**: Use units of 2, 4, 6, 8, 12, 16, 24 for consistent rhythm
- Container: max-w-7xl with px-4 md:px-8
- Section Padding: py-12 md:py-16
- Component Gaps: gap-4 to gap-8
- Card Padding: p-6 to p-8

### D. Component Library

**Upload Zone**:
- Large, centered dropzone with dashed border (200 70% 45% color, 2px)
- Icon: Cloud upload (Heroicons) at 3xl size
- Drag-active state: background 200 70% 15%, border solid
- Accepted formats badge: JPG, PNG, HEIC displayed as pills

**Analysis Dashboard** (post-upload):
- Split-screen layout: Original image (left) | LUT preview (right)
- Comparison slider for before/after toggle
- Color histogram overlay showing RGB curve distribution
- Floating color statistics card: dominant colors (5-6 color swatches), average brightness, saturation levels

**LUT Controls Panel**:
- Intensity slider (0-100%) with real-time preview update
- Grid size selector: 17x17x17, 33x33x33, 65x65x65 (radio buttons)
- Format dropdown: .cube (default), .3dl options
- Generate LUT button: full-width, primary accent, icon: Sparkles (processing state)

**Progress States**:
- Upload: Linear progress bar with percentage
- Analysis: Animated color wheel spinner with "Analyzing color profile..."
- Generation: Indeterminate progress with "Creating LUT file..."

**Download Section**:
- Success message with checkmark icon
- LUT filename preview with edit capability
- Download button with download icon (Heroicons)
- "Try another image" secondary action

**Navigation/Header**:
- App logo/title (top-left)
- Light/Dark mode toggle (top-right, moon/sun icons)
- Optional: Sample images gallery link for quick testing

### E. Animations
**Minimal, purposeful only**:
- Upload zone: Scale 1.02 on drag-over
- Comparison slider: Smooth transform on drag
- Success state: Gentle fade-in with slide-up (duration-300)
- No background animations or unnecessary motion

## Images

**Hero/Main Stage**: 
- NO traditional hero image section
- Instead, lead with functional upload zone immediately
- Background: Subtle grid pattern (220 10% 10% lines on dark background)

**Sample/Demo Images**:
- Thumbnail grid below upload zone showing 3-4 example images
- Categories: Portrait, Landscape, Food, Architecture
- Click to auto-load for quick testing
- Each ~120x120px with rounded corners

**Preview Display**:
- User-uploaded images displayed full-size within comparison viewport
- Before/After split with draggable divider
- Maintain aspect ratio with max-height constraints

## Layout Structure

1. **Header Bar**: Logo, title, mode toggle (h-16)
2. **Upload Section**: Centered, prominent dropzone (min-h-96 when empty)
3. **Analysis Workspace** (post-upload): 
   - Grid layout: lg:grid-cols-2 (side-by-side comparison)
   - Controls sidebar: lg:w-80 (sticky on scroll)
4. **Results Section**: Download card with metadata
5. **Footer**: Minimal - format support, version info

**Key Differentiator**: Tool-first design with immediate functionality, zero marketing fluff. Professional dark interface optimized for color-accurate work, drawing from photography software conventions while maintaining modern web app polish.