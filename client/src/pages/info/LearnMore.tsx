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
      {/* Animated background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-chart-2/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="container mx-auto px-4 py-20 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
            Cinema-Grade Chroma Science
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            CHROMA implements professional chroma science standards verified against VES Technology Committee and CIE specifications for production-ready LUT generation
          </p>
        </div>

        {/* Professional Pipeline Overview */}
        <div className="mb-16">
          <Card className="border-primary/30 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm">
            <CardHeader className="text-center space-y-3 pb-6">
              <CardTitle className="text-3xl md:text-4xl font-bold">Professional Color Pipeline</CardTitle>
              <CardDescription className="text-base max-w-2xl mx-auto">
                Unlike simple filters or presets, CHROMA uses cinema-grade chroma science to extract authentic grading from reference images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Industry Standards</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Built on VES Technology Committee white papers and CIE chroma science specifications. Uses D65 illuminant, sRGB gamma (2.4 exponent), and blue-fastest indexing
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                      <Box className="w-5 h-5 text-chart-2" />
                    </div>
                    <h3 className="font-semibold text-lg">Perceptual Color Space</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    CIE L*a*b* perceptually uniform transformations ensure natural-looking color grading that matches human vision, not just mathematical RGB manipulation
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-chart-3" />
                    </div>
                    <h3 className="font-semibold text-lg">Production Ready</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generates 3D LUTs with comprehensive metadata compatible with DaVinci Resolve, Premiere Pro, Final Cut Pro, and all professional color grading software
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Six-Stage Professional Pipeline */}
        <div className="mb-16">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Six-Stage Chroma Science Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional pipeline for cinema-quality color extraction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  Perceptually uniform color space (CIE 1976) with D65 white point. Enables natural-looking grading that matches human vision, not just math.
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
                  12-cluster intelligent sampling extracts dominant colors and comprehensive coverage from reference images for authentic color mapping.
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
                  John Hable-style shoulder/toe curves create cinema-quality tonality with smooth highlight rolloff and shadow detail preservation.
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
                  Lab distance-based preservation maintains natural skin tones even under aggressive color grading, critical for professional workflows.
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
                  Hue-preserving binary search in LCh space ensures Rec.709 compliance while maintaining color intent for broadcast delivery.
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
                  Gray World algorithm provides automatic white balance correction, essential for consistent color across varied lighting conditions.
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
                  <span className="text-foreground font-semibold">K-means clustering</span> (12 clusters), <span className="text-foreground font-semibold">filmic tone curves</span>, 
                  and <span className="text-foreground font-semibold">hue-preserving gamut compression</span> to recreate the exact chroma science from your reference image.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 via-chart-2/5 to-chart-3/5 rounded-lg p-5 border border-primary/20">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Professional Chroma Science Pipeline</h3>
                <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">1.</span>
                    <span><strong className="text-foreground">CIE L*a*b* Color Space:</strong> Perceptually uniform transformations (VES/CIE standards) with D65 white point</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">2.</span>
                    <span><strong className="text-foreground">K-means Clustering:</strong> Intelligent color sampling with 12 clusters for comprehensive color coverage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">3.</span>
                    <span><strong className="text-foreground">Filmic Tone Curves:</strong> John Hable-style shoulder/toe curves for cinema-quality tonality</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">4.</span>
                    <span><strong className="text-foreground">Skin Tone Protection:</strong> Lab distance-based preservation to maintain natural skin tones</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">5.</span>
                    <span><strong className="text-foreground">Gamut Compression:</strong> Hue-preserving binary search in LCh space for Rec.709 compliance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-semibold">6.</span>
                    <span><strong className="text-foreground">Chromatic Adaptation:</strong> Gray World algorithm for automatic white balance correction</span>
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
                    Built on VES Technology Committee and CIE chroma science standards. Uses sRGB gamma (2.4 exponent), D65 illuminant, and blue-fastest indexing for professional compatibility
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
