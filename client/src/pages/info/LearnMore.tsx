import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Zap,
  Check,
  AlertCircle,
  FileImage
} from "lucide-react";

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
            How CHROMA Works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep dive into the professional color science and algorithms that power CHROMA's industry-standard LUT processing
          </p>
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
                  Our flagship tool uses <span className="text-foreground font-semibold">zone-based color analysis</span> to extract the exact color science from any reference image. 
                  Unlike simple filters or presets, CHROMA analyzes your image across <span className="text-foreground font-semibold">three luminance zones</span> (shadows, midtones, highlights) 
                  to derive authentic color transformations that recreate the original grading.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Color Science Analysis
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Analyzes brightness, contrast, saturation, and hue shifts across shadow/midtone/highlight zones using industry-standard luminance calculation (0.299×R + 0.587×G + 0.114×B)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
                    Professional Output
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Generates industry-standard 3D LUTs (.cube, .3dl) compatible with DaVinci Resolve, Premiere Pro, Final Cut Pro, and all professional grading software
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
                    Precision Control
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Adjustable intensity (0-100%), multiple grid sizes (17×17×17 to 65×65×65), and 8/10/12-bit precision for perfect color accuracy
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Real-time Preview
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    See your LUT applied in real-time with adjustable intensity before export, ensuring the perfect look for your project
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
                  Convert seamlessly between all major LUT formats with <span className="text-foreground font-semibold">trilinear interpolation</span> to maintain smooth color gradients. 
                  Our converter supports bidirectional conversion between .cube (3D LUT), .3dl (Autodesk/Lustre), and .lut (1D LUT) formats with automatic format detection and validation.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    .cube Format
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Industry standard 3D LUT format. Compatible with Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve. Variable grid sizes (17³, 33³, 65³)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
                    .3dl Format
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Professional Autodesk/Lustre format. Used in Avid Media Composer, high-end broadcast workflows. Fixed 33³ grid with 12-bit precision (0-4095 range)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
                    .lut Format
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Simple 1D LUT for per-channel adjustments. Best for gamma correction and contrast curves. Smaller file size, faster processing
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
                  Ensure your LUTs meet professional standards with comprehensive quality analysis. CHROMA scans for <span className="text-foreground font-semibold">banding issues</span>, 
                  <span className="text-foreground font-semibold"> invalid color points</span>, and <span className="text-foreground font-semibold">out-of-range values</span> that could cause problems in production workflows.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <AlertCircle className="w-4 h-4 text-chart-3" />
                    Banding Detection
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Identifies consecutive identical values {'>'}10% threshold that create visible color banding in smooth gradients
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    Invalid Points
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    Detects RGB values outside the valid [0,1] range that could cause clipping or unexpected behavior
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
                    <FileImage className="w-4 h-4 text-chart-3" />
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
                  Automatically fix common LUT issues and optimize for professional workflows. Removes <span className="text-foreground font-semibold">invalid color points</span>, 
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
                    Removes invalid points and clamps RGB values to valid [0,1] range while preserving color integrity
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
    </div>
  );
}
