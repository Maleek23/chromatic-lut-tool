import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Zap,
  Check,
  AlertCircle,
  FileImage,
  Box,
  Layers
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

        {/* LUT Fundamentals Section */}
        <div className="mb-16">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Understanding LUTs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn the difference between 1D and 3D LUTs and how they transform color
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 1D LUT Card */}
            <Card className="border-chart-2/30 bg-gradient-to-br from-background to-chart-2/5 backdrop-blur-sm overflow-visible" data-testid="card-1d-lut-explanation">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 border border-chart-2/30">
                    <Layers className="w-6 h-6 text-chart-2" />
                  </div>
                  <CardTitle className="text-2xl">1D LUTs</CardTitle>
                </div>
                <CardDescription>Simple per-channel color mapping</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  A 1D LUT maps each input value to a single output value independently for each RGB channel. 
                  Perfect for gamma correction, contrast, and brightness adjustments.
                </p>
                
                {/* 1D LUT Diagram */}
                <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                  <svg viewBox="0 0 300 200" className="w-full h-auto">
                    {/* Input */}
                    <text x="20" y="30" className="fill-foreground text-xs font-semibold">Input RGB</text>
                    <rect x="20" y="40" width="60" height="120" className="fill-chart-2/20 stroke-chart-2" strokeWidth="2" rx="4"/>
                    
                    {/* Input Values */}
                    <text x="50" y="65" className="fill-foreground text-[10px]" textAnchor="middle">R: 128</text>
                    <text x="50" y="100" className="fill-foreground text-[10px]" textAnchor="middle">G: 64</text>
                    <text x="50" y="135" className="fill-foreground text-[10px]" textAnchor="middle">B: 192</text>
                    
                    {/* Arrows */}
                    <path d="M 85 60 L 115 80" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrowhead1d)"/>
                    <path d="M 85 95 L 115 100" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrowhead1d)"/>
                    <path d="M 85 130 L 115 120" className="stroke-primary" strokeWidth="2" markerEnd="url(#arrowhead1d)"/>
                    
                    {/* 1D Mapping */}
                    <text x="150" y="30" className="fill-foreground text-xs font-semibold" textAnchor="middle">1D Mapping</text>
                    <rect x="120" y="75" width="60" height="50" className="fill-primary/10 stroke-primary" strokeWidth="2" rx="4"/>
                    <text x="150" y="95" className="fill-foreground text-[9px]" textAnchor="middle">Per-Channel</text>
                    <text x="150" y="110" className="fill-foreground text-[9px]" textAnchor="middle">Transform</text>
                    
                    {/* Output Arrows */}
                    <path d="M 185 80 L 215 60" className="stroke-chart-3" strokeWidth="2" markerEnd="url(#arrowhead1d-out)"/>
                    <path d="M 185 100 L 215 100" className="stroke-chart-3" strokeWidth="2" markerEnd="url(#arrowhead1d-out)"/>
                    <path d="M 185 120 L 215 140" className="stroke-chart-3" strokeWidth="2" markerEnd="url(#arrowhead1d-out)"/>
                    
                    {/* Output */}
                    <text x="220" y="30" className="fill-foreground text-xs font-semibold">Output RGB</text>
                    <rect x="220" y="40" width="60" height="120" className="fill-chart-3/20 stroke-chart-3" strokeWidth="2" rx="4"/>
                    <text x="250" y="65" className="fill-foreground text-[10px]" textAnchor="middle">R: 156</text>
                    <text x="250" y="100" className="fill-foreground text-[10px]" textAnchor="middle">G: 70</text>
                    <text x="250" y="135" className="fill-foreground text-[10px]" textAnchor="middle">B: 200</text>
                    
                    {/* Arrow markers */}
                    <defs>
                      <marker id="arrowhead1d" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" className="fill-primary" />
                      </marker>
                      <marker id="arrowhead1d-out" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" className="fill-chart-3" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Controls gamma, contrast, and brightness</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Adjusts RGB balance and grey scale</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Cannot alter saturation or hue</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3D LUT Card */}
            <Card className="border-primary/30 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm overflow-visible" data-testid="card-3d-lut-explanation">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 border border-primary/30">
                    <Box className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">3D LUTs</CardTitle>
                </div>
                <CardDescription>Volumetric color space transformation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  A 3D LUT uses a color cube to map any RGB input to any RGB output, allowing full control over hue, saturation, and luminance. 
                  Essential for professional color grading.
                </p>
                
                {/* 3D LUT Cube Diagram */}
                <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                  <svg viewBox="0 0 300 220" className="w-full h-auto">
                    {/* 3D Cube representation */}
                    <g transform="translate(150, 110)">
                      {/* Back faces (lighter) */}
                      <path d="M -50,-30 L 20,-60 L 20,10 L -50,40 Z" className="fill-primary/5 stroke-primary/30" strokeWidth="1.5"/>
                      <path d="M 20,-60 L 90,-30 L 90,40 L 20,10 Z" className="fill-chart-2/5 stroke-chart-2/30" strokeWidth="1.5"/>
                      <path d="M -50,40 L 20,10 L 90,40 L 20,70 Z" className="fill-chart-3/5 stroke-chart-3/30" strokeWidth="1.5"/>
                      
                      {/* Front faces (brighter) */}
                      <path d="M -50,-30 L 20,0 L 20,70 L -50,40 Z" className="fill-primary/20 stroke-primary" strokeWidth="2"/>
                      <path d="M 20,0 L 90,30 L 90,100 L 20,70 Z" className="fill-chart-2/20 stroke-chart-2" strokeWidth="2"/>
                      <path d="M 20,0 L 90,30 L 20,60 L -50,30 Z" className="fill-chart-3/20 stroke-chart-3" strokeWidth="2"/>
                      
                      {/* Axis labels */}
                      <text x="-60" y="0" className="fill-primary text-xs font-semibold">Red</text>
                      <text x="95" y="60" className="fill-chart-2 text-xs font-semibold">Green</text>
                      <text x="0" y="90" className="fill-chart-3 text-xs font-semibold">Blue</text>
                      
                      {/* Grid points */}
                      <circle cx="0" cy="20" r="3" className="fill-foreground"/>
                      <circle cx="30" cy="10" r="3" className="fill-foreground"/>
                      <circle cx="-20" cy="30" r="3" className="fill-foreground"/>
                      <circle cx="50" cy="40" r="3" className="fill-foreground"/>
                      
                      {/* Center annotation */}
                      <text x="-40" y="-50" className="fill-foreground text-[10px] font-semibold">3D Color Cube</text>
                      <text x="-50" y="-35" className="fill-muted-foreground text-[9px]">Each point transforms</text>
                      <text x="-50" y="-23" className="fill-muted-foreground text-[9px]">R, G, and B together</text>
                    </g>
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Full volumetric color control</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Adjusts hue, saturation, and luminance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Handles cross-channel color correction</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Professional film emulation and grading</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Difference Card */}
          <Card className="mt-6 border-chart-3/30 bg-gradient-to-br from-background to-chart-3/5" data-testid="card-lut-comparison">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-chart-3" />
                    The Key Difference
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    In a <strong>1D LUT</strong>, changing the Red input only affects the Red output. 
                    In a <strong>3D LUT</strong>, changing Red can affect all RGB outputs, enabling true color grading.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Grid Sizes</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div><strong className="text-foreground">17×17×17</strong> - Preview/Proxy quality</div>
                    <div><strong className="text-foreground">33×33×33</strong> - Production quality</div>
                    <div><strong className="text-foreground">65×65×65</strong> - Master quality</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Professional Use</h3>
                  <p className="text-sm text-muted-foreground">
                    CHROMA generates <strong>3D LUTs</strong> for professional workflows, ensuring compatibility with DaVinci Resolve, Premiere Pro, Final Cut Pro, and all major color grading software.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
