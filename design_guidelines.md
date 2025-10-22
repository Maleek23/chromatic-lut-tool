# CHROMA Design Guidelines

## Design Approach
Minimal, professional interface focused on color science tools. No decorative elements - only functional visualizations that demonstrate actual color processing.

## Core Design Elements

### Color Palette
**Primary Colors** (color science spectrum):
- Primary: #6b2dd9 (purple)
- Chart 2: #00d4ff (cyan)  
- Chart 3: #ff0080 (magenta)
- Background: #0a0a0a (deep black)

**Neutral Scale**:
- Foreground: Near white
- Muted: Gray tones for secondary text
- Border: Subtle dividers

### Layout System
**Spacing**: Consistent units (4, 8, 12, 16, 24px) for rhythm
- Container: max-w-7xl with responsive padding
- Section padding: py-12 to py-20
- Component gaps: gap-4 to gap-8
- Card padding: p-6 to p-8

### Component Style
**Minimal Aesthetic**:
- Clean borders with subtle rounded corners
- Backdrop blur for depth
- Subtle animated orbs for visual interest
- No decorative overlays or particles
- Focus on content and functionality

**Interactive Elements**:
- Clear hover states
- Smooth transitions
- Accessible focus indicators

### Science-Based Visualizations Only
**Allowed visuals** (these demonstrate actual color science):
- ColorCube3D: Shows L*a*b* 3D color space
- Tone curve graphs: Shows filmic S-curves
- Color cluster grids: Shows K-means clustering results
- Gamut comparisons: Shows color space boundaries
- Skin tone zones: Shows protected color ranges
- White balance indicators: Shows chromatic adaptation

**NOT allowed**:
- Decorative particles
- Film grain overlays
- Before/after sliders (unless showing real LUT results)
- Any visual that doesn't demonstrate color science

## Navigation & Footer
- Minimal design
- Essential links only
- No gradients or decorative effects
- Clean typography
- Consistent with overall minimal theme
