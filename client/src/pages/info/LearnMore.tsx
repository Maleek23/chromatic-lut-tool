import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Zap,
  Check,
  Box,
  Layers
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function LearnMore() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-br from-background via-background to-primary/5" />

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary/80">Professional Color Science</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground leading-tight">
            Cinema-Grade<br />Chroma Science
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Industry-verified color science pipeline built on VES Technology Committee and CIE specifications for production-ready LUT generation
          </p>
        </div>

        {/* Professional Pipeline Overview */}
        <div className="mb-24">
          <Card className="border-primary/30 bg-gradient-to-br from-background via-background/50 to-primary/5 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center space-y-4 pb-8 pt-8">
              <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
                Professional Color Pipeline
              </CardTitle>
              <CardDescription className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Unlike simple filters or presets, CHROMA uses cinema-grade chroma science to extract authentic grading from reference images
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4 group">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-chart-2/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Check className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl">Industry Standards</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed pl-1">
                    Built on VES Technology Committee white papers and CIE chroma science specifications with industry-standard color space transformations
                  </p>
                </div>
                <div className="space-y-4 group">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-chart-2/30 to-chart-3/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Box className="w-7 h-7 text-chart-2" />
                    </div>
                    <h3 className="font-bold text-xl">Perceptual Color Space</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed pl-1">
                    CIE L*a*b* perceptually uniform transformations ensure natural-looking color grading that matches human vision, not just mathematical RGB manipulation
                  </p>
                </div>
                <div className="space-y-4 group">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-chart-3/30 to-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Layers className="w-7 h-7 text-chart-3" />
                    </div>
                    <h3 className="font-bold text-xl">Production Ready</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed pl-1">
                    Generates 3D LUTs with comprehensive metadata compatible with DaVinci Resolve, Premiere Pro, Final Cut Pro, and all professional color grading software
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Six-Stage Professional Pipeline */}
        <div className="mb-24">
          <div className="text-center space-y-5 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary/70 bg-clip-text text-transparent">
              Six-Stage Chroma Science Architecture
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional pipeline for cinema-quality color extraction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Stage 1: CIE Lab */}
            <Card className="border-primary/30 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <CardTitle className="text-lg">CIE L*a*b* Transform</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Perceptually uniform color space (CIE 1976) ensures natural-looking grading that matches human vision, not just mathematical RGB manipulation.
                </p>
              </CardContent>
            </Card>

            {/* Stage 2: K-means */}
            <Card className="border-chart-2/30 bg-gradient-to-br from-background to-chart-2/5 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-chart-2">2</span>
                  </div>
                  <CardTitle className="text-lg">K-means Clustering</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Intelligent multi-cluster sampling extracts dominant colors and comprehensive coverage from reference images for authentic color mapping.
                </p>
              </CardContent>
            </Card>

            {/* Stage 3: Filmic Curves */}
            <Card className="border-chart-3/30 bg-gradient-to-br from-background to-chart-3/5 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-chart-3">3</span>
                  </div>
                  <CardTitle className="text-lg">Filmic Tone Curves</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Cinema-grade shoulder/toe curves create professional tonality with smooth highlight rolloff and shadow detail preservation.
                </p>
              </CardContent>
            </Card>

            {/* Stage 4: Skin Protection */}
            <Card className="border-primary/30 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <CardTitle className="text-lg">Skin Tone Protection</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Perceptual preservation maintains natural skin tones even under aggressive color grading, critical for professional workflows.
                </p>
              </CardContent>
            </Card>

            {/* Stage 5: Gamut Compression */}
            <Card className="border-chart-2/30 bg-gradient-to-br from-background to-chart-2/5 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-chart-2">5</span>
                  </div>
                  <CardTitle className="text-lg">Gamut Compression</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Hue-preserving gamut compression ensures broadcast compliance while maintaining color intent for professional delivery.
                </p>
              </CardContent>
            </Card>

            {/* Stage 6: Chromatic Adaptation */}
            <Card className="border-chart-3/30 bg-gradient-to-br from-background to-chart-3/5 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-chart-3">6</span>
                  </div>
                  <CardTitle className="text-lg">Chromatic Adaptation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Automatic white balance correction provides consistent color across varied lighting conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Tool Cards */}
        <div className="space-y-12">
          {/* Image to LUT Generator */}
          <Card className="border-primary/30 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm hover-elevate">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 border border-primary/30">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">Image to LUT Generator</CardTitle>
              </div>
              <CardDescription className="text-base">
                Extract authentic color grading directly from reference images
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Our flagship tool uses <span className="text-foreground font-semibold">cinema-grade chroma science</span> to extract authentic color grading from reference images. 
                  Unlike simple filters or presets, CHROMA implements a professional pipeline using <span className="text-foreground font-semibold">CIE L*a*b* perceptual color space</span>, 
                  <span className="text-foreground font-semibold">intelligent clustering</span>, <span className="text-foreground font-semibold">cinema-grade tone curves</span>, 
                  and <span className="text-foreground font-semibold">hue-preserving gamut compression</span> to recreate the exact chroma science from your reference image.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 via-chart-2/5 to-chart-3/5 rounded-lg p-5 border border-primary/20">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Professional Chroma Science Pipeline</h3>
                <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">1.</span>
                    <span><strong className="text-foreground">CIE L*a*b* Color Space:</strong> Perceptually uniform transformations using industry-standard color science</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">2.</span>
                    <span><strong className="text-foreground">Intelligent Clustering:</strong> Multi-cluster sampling for comprehensive color coverage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">3.</span>
                    <span><strong className="text-foreground">Cinema-Grade Tone Curves:</strong> Professional shoulder/toe curves for film-quality tonality</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">4.</span>
                    <span><strong className="text-foreground">Skin Tone Protection:</strong> Perceptual preservation to maintain natural skin tones</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">5.</span>
                    <span><strong className="text-foreground">Gamut Compression:</strong> Hue-preserving compression for broadcast compliance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">6.</span>
                    <span><strong className="text-foreground">Chromatic Adaptation:</strong> Automatic white balance correction</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Industry Standards
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Built on VES Technology Committee and CIE chroma science standards with industry-standard color transformations for professional compatibility
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
                    Professional Output
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Generates production-ready 3D LUTs with comprehensive metadata. Free tier: .cube only. Creator: .cube/.3dl/.look. Pro: All 5 formats (.cube/.3dl/.lut/.look/.xmp). Compatible with DaVinci Resolve, Premiere Pro, Final Cut Pro
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
                    Precision Control
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Adjustable intensity (0-100%). Grid sizes: Free (17³), Creator (17³/33³), Pro (17³/33³/65³). Precision: 8/10-bit all tiers, 12-bit Pro+. Supports ACEScg for ACES film emulation workflows
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Real-time Preview
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    See your LUT applied in real-time with adjustable intensity before export, ensuring the perfect look for your professional project
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LUT Converter */}
          <Card className="border-chart-2/30 bg-gradient-to-br from-background to-chart-2/5 backdrop-blur-sm hover-elevate">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 border border-chart-2/30">
                  <ArrowRight className="w-6 h-6 text-chart-2" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">LUT Format Converter</CardTitle>
              </div>
              <CardDescription className="text-base">
                Universal format conversion with intelligent resampling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Convert between LUT formats with <span className="text-foreground font-semibold">trilinear interpolation</span> to maintain smooth color gradients. 
                  Free tier can convert any LUT to .cube format. Creator+ can convert between .cube, .3dl, and .look formats. Pro tier supports full bidirectional conversion between all standard formats (.cube, .3dl, .lut, .look). Note: .xmp is export-only.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    .cube Format
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    <strong>All tiers:</strong> Industry standard 3D LUT format. Compatible with Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve. Variable grid sizes (17³, 33³, 65³)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
                    .3dl & .look Formats
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    <strong>Creator+:</strong> Professional Autodesk/Lustre formats (.3dl, .look) for high-end broadcast and VFX workflows. Used in Avid, Nuke, Flame
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
                    .lut & .xmp Formats
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    <strong>Pro+:</strong> Simple 1D LUT (.lut) for per-channel adjustments and Adobe Lightroom presets (.xmp) with tone curves and color adjustments
                  </p>
                </div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Smart Resampling:</span> When converting between different grid sizes, 
                  CHROMA uses trilinear interpolation to preserve smooth color transitions and prevent banding artifacts
                </p>
              </div>
            </CardContent>
          </Card>

          {/* LUT Analyzer */}
          <Card className="border-chart-3/30 bg-gradient-to-br from-background to-chart-3/5 backdrop-blur-sm hover-elevate">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20 border border-chart-3/30">
                  <TrendingUp className="w-6 h-6 text-chart-3" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">LUT Quality Analyzer</CardTitle>
              </div>
              <CardDescription className="text-base">
                Professional quality scoring and issue detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Pro tier only:</span> Ensure your LUTs meet professional standards with comprehensive quality analysis. Scans for <span className="text-foreground font-semibold">banding issues</span>, 
                  <span className="text-foreground font-semibold"> invalid color points</span>, and <span className="text-foreground font-semibold">out-of-range values</span> that could cause problems in production workflows.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Check className="w-4 h-4 text-chart-3" />
                    Banding Detection
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Identifies consecutive identical values creating visible color banding in smooth gradients
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Check className="w-4 h-4 text-primary" />
                    Invalid Points
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Detects RGB values outside the valid range that could cause clipping or unexpected behavior
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4 text-chart-2" />
                    Quality Scoring
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Comprehensive quality score based on value distribution, smooth gradients, and professional standards
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Box className="w-4 h-4 text-chart-3" />
                    RGB Statistics
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Detailed min/max/average RGB values per channel to understand your LUT's color characteristics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LUT Optimizer */}
          <Card className="border-primary/30 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm hover-elevate">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 border border-primary/30">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl">LUT Optimizer</CardTitle>
              </div>
              <CardDescription className="text-base">
                Clean and optimize LUTs for production use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">Pro tier only:</span> Automatically fix common LUT issues and optimize for professional workflows. Removes <span className="text-foreground font-semibold">invalid color points</span>, 
                  clamps out-of-range values, and ensures your LUTs are production-ready for any color grading software.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Check className="w-4 h-4 text-primary" />
                    Automatic Cleanup
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Removes invalid points and clamps RGB values to valid range while preserving color integrity
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Check className="w-4 h-4 text-chart-2" />
                    Format Validation
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Ensures LUT meets format specifications (.cube grid sizes, .3dl 12-bit values, proper structure)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
