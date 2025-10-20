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
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 border border-border/50 relative overflow-hidden">
                  {/* Dark background with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-black/95" />
                  
                  <svg viewBox="0 0 320 240" className="w-full h-auto relative z-10">
                    <defs>
                      {/* Gradients for faces */}
                      <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 0.4 }} />
                        <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 0.2 }} />
                      </linearGradient>
                      <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.5 }} />
                        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0.3 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* 3D Cube */}
                    <g transform="translate(160, 130)">
                      {/* Back edges (dashed, subtle) */}
                      <line x1="-60" y1="-40" x2="30" y2="-70" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.3"/>
                      <line x1="30" y1="-70" x2="30" y2="0" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.3"/>
                      <line x1="30" y1="0" x2="-60" y2="30" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.3"/>
                      
                      {/* Top face (purple gradient) */}
                      <path d="M -60,-40 L 30,-70 L 120,-40 L 30,-10 Z" fill="url(#purpleGrad)" stroke="#a78bfa" strokeWidth="2.5"/>
                      
                      {/* Right face (green gradient) */}
                      <path d="M 120,-40 L 120,30 L 30,60 L 30,-10 Z" fill="url(#greenGrad)" stroke="#10b981" strokeWidth="2.5"/>
                      
                      {/* Left face (darker purple) */}
                      <path d="M -60,-40 L -60,30 L 30,60 L 30,-10 Z" fill="#7c3aed" fillOpacity="0.25" stroke="#a78bfa" strokeWidth="2.5"/>
                      
                      {/* Front edges (cyan, bright) */}
                      <line x1="-60" y1="30" x2="30" y2="60" stroke="#06b6d4" strokeWidth="2.5"/>
                      <line x1="30" y1="60" x2="120" y2="30" stroke="#06b6d4" strokeWidth="2.5"/>
                      <line x1="120" y1="30" x2="120" y2="-40" stroke="#06b6d4" strokeWidth="2.5"/>
                      <line x1="-60" y1="30" x2="-60" y2="-40" stroke="#06b6d4" strokeWidth="2.5"/>
                      
                      {/* Grid points (white dots) */}
                      <circle cx="-30" cy="-20" r="3.5" fill="white" opacity="0.9"/>
                      <circle cx="10" cy="10" r="3.5" fill="white" opacity="0.9"/>
                      <circle cx="50" cy="0" r="3.5" fill="white" opacity="0.9"/>
                      <circle cx="75" cy="15" r="3.5" fill="white" opacity="0.9"/>
                      <circle cx="-10" cy="30" r="3.5" fill="white" opacity="0.9"/>
                      <circle cx="60" cy="-25" r="3.5" fill="white" opacity="0.9"/>
                      
                      {/* Axis labels with glow */}
                      <text x="-85" y="10" fill="#06b6d4" fontSize="13" fontWeight="600" style={{ filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))' }}>Red</text>
                      <text x="125" y="10" fill="#10b981" fontSize="13" fontWeight="600" style={{ filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))' }}>Green</text>
                      <text x="10" y="85" fill="#a78bfa" fontSize="13" fontWeight="600" style={{ filter: 'drop-shadow(0 0 4px rgba(167, 139, 250, 0.5))' }}>Blue</text>
                      
                      {/* Title and description */}
                      <text x="0" y="-95" fill="white" fontSize="15" fontWeight="700" textAnchor="middle">3D Color Cube</text>
                      <text x="0" y="-78" fill="#94a3b8" fontSize="11" textAnchor="middle">Each point transforms R, G, and B together</text>
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
                  Our flagship tool uses <span className="text-foreground font-semibold">cinema-grade color science</span> to extract authentic color grading from reference images. 
                  Unlike simple filters or presets, CHROMA implements a professional pipeline using <span className="text-foreground font-semibold">CIE L*a*b* perceptual color space</span>, 
                  <span className="text-foreground font-semibold">K-means clustering</span> (12 clusters), <span className="text-foreground font-semibold">filmic tone curves</span>, 
                  and <span className="text-foreground font-semibold">hue-preserving gamut compression</span> to recreate the exact color science from your reference image.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-primary/5 via-chart-2/5 to-chart-3/5 rounded-lg p-5 border border-primary/20">
                <h3 className="text-sm font-semibold mb-3 text-foreground">Professional Color Science Pipeline</h3>
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
                    Built on VES Technology Committee and CIE color science standards. Uses sRGB gamma (2.4 exponent), D65 illuminant, and blue-fastest indexing for professional compatibility
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-2" />
                    Professional Output
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Generates production-ready 3D LUTs (.cube, .3dl, .look, .lut, .xmp) with comprehensive metadata compatible with all professional color grading software
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-3" />
                    Precision Control
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Adjustable intensity (0-100%), multiple grid sizes (17³ to 65³), and 8/10/12-bit precision. Supports ACEScg for ACES film emulation workflows
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
