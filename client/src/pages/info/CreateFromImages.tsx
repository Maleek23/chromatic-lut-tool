import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Settings, Download, ArrowRight, Lightbulb, Sparkles, Image as ImageIcon } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { ColorCube3D } from "@/components/visual/ColorCube3D";

export default function CreateFromImages() {
  return (
    <div className="min-h-screen relative">

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Generate professional LUTs from reference images in three simple steps.
          </p>
        </div>
      </section>

      {/* Visual Process Diagram */}
      <section className="relative z-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
              {/* Desktop flow */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-primary/5 to-chart-2/5">
                    <div className="text-sm font-medium mb-1 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">1. Upload</div>
                    <div className="text-xs text-muted-foreground">Reference image</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-chart-2/5 to-chart-3/5">
                    <div className="text-sm font-medium mb-1 bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">2. Configure</div>
                    <div className="text-xs text-muted-foreground">Grid & format</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-chart-3/5 to-primary/5">
                    <div className="text-sm font-medium mb-1 bg-gradient-to-r from-chart-3 to-primary bg-clip-text text-transparent">3. Generate</div>
                    <div className="text-xs text-muted-foreground">Download LUT</div>
                  </div>
                </div>
              </div>
              
              {/* Mobile flow */}
              <div className="sm:hidden space-y-4">
                <div className="text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-primary/5 to-chart-2/5">
                  <div className="text-sm font-medium mb-1 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">1. Upload</div>
                  <div className="text-xs text-muted-foreground">Reference image</div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                </div>
                <div className="text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-chart-2/5 to-chart-3/5">
                  <div className="text-sm font-medium mb-1 bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">2. Configure</div>
                  <div className="text-xs text-muted-foreground">Grid & format</div>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-primary rotate-90" />
                </div>
                <div className="text-center py-6 px-4 border border-border/50 rounded-md bg-gradient-to-br from-chart-3/5 to-primary/5">
                  <div className="text-sm font-medium mb-1 bg-gradient-to-r from-chart-3 to-primary bg-clip-text text-transparent">3. Generate</div>
                  <div className="text-xs text-muted-foreground">Download LUT</div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="space-y-12">
            {/* Step 1 */}
            <Card className="overflow-hidden bg-background/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left: Content */}
                  <div className="p-8 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-primary/30 bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center">
                        <span className="text-base font-mono text-primary">1</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold">Upload Reference Image</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Select a reference image with the color grading aesthetic you want to extract. Cinema stills, professional photography, or curated Instagram posts work well.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 space-y-2 pl-14">
                      <p className="text-xs font-medium text-foreground">Requirements:</p>
                      <ul className="text-xs text-muted-foreground space-y-1.5 pl-4 list-disc leading-relaxed">
                        <li>Properly exposed images with visible detail</li>
                        <li>Supported: JPG, PNG, WEBP, HEIC, TIFF, BMP, GIF</li>
                        <li>Size limits: Free 10MB, Creator 50MB, Pro 100MB, Studio 200MB</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right: Visual */}
                  <div className="bg-gradient-to-br from-primary/5 to-chart-2/5 p-8 flex items-center justify-center border-l border-border/30">
                    <div className="w-full max-w-xs">
                      <div className="aspect-square rounded-lg border-2 border-dashed border-primary/30 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-sm font-medium">Drop image here</p>
                          <p className="text-xs text-muted-foreground">or click to browse</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="overflow-hidden bg-background/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left: Visual */}
                  <div className="bg-gradient-to-br from-chart-2/5 to-chart-3/5 p-6 flex items-center justify-center border-r border-border/30">
                    <div className="w-full flex flex-col items-center gap-4">
                      <ColorCube3D size={240} rotating={true} />
                      <p className="text-xs text-center text-muted-foreground font-mono">3D LUT Color Space</p>
                    </div>
                  </div>
                  
                  {/* Right: Content */}
                  <div className="p-8 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-chart-2/30 bg-gradient-to-br from-chart-2/10 to-chart-3/10 flex items-center justify-center">
                        <span className="text-base font-mono text-chart-2">2</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold">Configure Export Settings</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Choose grid resolution and output format based on your workflow requirements and subscription tier.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pl-14">
                      <div className="space-y-1.5">
                        <p className="text-xs font-medium">Grid Resolution</p>
                        <p className="text-xs text-muted-foreground">Free: 17×17×17</p>
                        <p className="text-xs text-muted-foreground">Creator+: 33³, 65³</p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-xs font-medium">Output Format</p>
                        <p className="text-xs text-muted-foreground">Free: .cube</p>
                        <p className="text-xs text-muted-foreground">Creator+: .3dl, .look, .xmp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="overflow-hidden bg-background/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left: Content */}
                  <div className="p-8 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-chart-3/30 bg-gradient-to-br from-chart-3/10 to-primary/10 flex items-center justify-center">
                        <span className="text-base font-mono text-chart-3">3</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-bold">Generate and Download</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          CHROMA processes your image through its color science pipeline and generates a production-ready LUT file.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 space-y-2 pl-14">
                      <p className="text-xs font-medium text-foreground">Processing Pipeline:</p>
                      <ol className="text-xs text-muted-foreground space-y-1.5 pl-4 list-decimal leading-relaxed">
                        <li>Image analysis and color space conversion</li>
                        <li>Tonal zone extraction (shadows, midtones, highlights)</li>
                        <li>LUT generation with professional metadata</li>
                        <li>Download ready for installation</li>
                      </ol>
                    </div>
                  </div>
                  
                  {/* Right: Visual */}
                  <div className="bg-gradient-to-br from-chart-3/5 to-primary/5 p-8 flex items-center justify-center border-l border-border/30">
                    <svg viewBox="0 0 200 200" className="w-full max-w-xs">
                      <defs>
                        <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--chart-3))" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" />
                        </linearGradient>
                      </defs>
                      {/* Grid */}
                      <g stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3">
                        {[0, 50, 100, 150, 200].map(v => (
                          <g key={v}>
                            <line x1="20" y1={v * 0.9 + 10} x2="190" y2={v * 0.9 + 10} />
                            <line x1={v * 0.85 + 20} y1="10" x2={v * 0.85 + 20} y2="190" />
                          </g>
                        ))}
                      </g>
                      {/* S-Curve */}
                      <path
                        d="M 20 190 Q 60 170, 80 130 T 140 50 T 190 10"
                        fill="none"
                        stroke="url(#curveGrad)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <text x="100" y="205" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">
                        Input →
                      </text>
                      <text x="5" y="100" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10" transform="rotate(-90 5 100)">
                        Output →
                      </text>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-lg font-semibold">Next Steps</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/resources/install-luts">
              <div className="hover-elevate active-elevate-2 p-5 border border-border rounded-md cursor-pointer group transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Installation Guides</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  DaVinci Resolve, Premiere Pro, and more
                </p>
              </div>
            </Link>
            
            <Link href="/resources/lut-formats">
              <div className="hover-elevate active-elevate-2 p-5 border border-border rounded-md cursor-pointer group transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Format Selection</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Choose the right LUT format for your workflow
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
