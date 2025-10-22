import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Settings, Download, ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function CreateFromImages() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">
            How It Works
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Generate professional LUTs from reference images in three simple steps.
          </p>
        </div>
      </section>

      {/* Visual Process Diagram */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-background/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 sm:p-10">
              {/* Flowchart SVG - hidden on very small screens, simplified version shown */}
              <div className="hidden sm:block">
                <svg viewBox="0 0 700 200" className="w-full h-auto">
                  <defs>
                    <linearGradient id="step1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.2 }} />
                      <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.1 }} />
                    </linearGradient>
                    <linearGradient id="step2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
                      <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.1 }} />
                    </linearGradient>
                    <linearGradient id="step3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.2 }} />
                      <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0.1 }} />
                    </linearGradient>
                  </defs>
                  
                  <g>
                    <rect x="30" y="60" width="180" height="80" rx="8" fill="url(#step1)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <text x="120" y="90" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600" textAnchor="middle">Upload Reference</text>
                    <text x="120" y="110" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Color-graded image</text>
                    <text x="120" y="126" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">10MB max (Free tier)</text>
                  </g>
                  
                  <path d="M 215 100 L 250 100" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <g>
                    <rect x="255" y="60" width="180" height="80" rx="8" fill="url(#step2)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <text x="345" y="90" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600" textAnchor="middle">Configure Export</text>
                    <text x="345" y="110" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Grid size & format</text>
                    <text x="345" y="126" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">17³ .cube only (Free)</text>
                  </g>
                  
                  <path d="M 440 100 L 475 100" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <g>
                    <rect x="480" y="60" width="180" height="80" rx="8" fill="url(#step3)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                    <text x="570" y="90" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600" textAnchor="middle">Generate & Download</text>
                    <text x="570" y="110" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Processing ~30s</text>
                    <text x="570" y="126" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Ready to use</text>
                  </g>
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" />
                    </marker>
                  </defs>
                </svg>
              </div>
              
              {/* Mobile-friendly vertical flow */}
              <div className="sm:hidden space-y-5">
                <div className="p-5 rounded-lg border border-border/50 bg-muted/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">1</span>
                    </div>
                    <p className="font-semibold text-base">Upload Reference</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-11">Color-graded image • 10MB max (Free)</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 rotate-90" />
                </div>
                <div className="p-5 rounded-lg border border-border/50 bg-muted/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">2</span>
                    </div>
                    <p className="font-semibold text-base">Configure Export</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-11">17³ grid • .cube format (Free)</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 rotate-90" />
                </div>
                <div className="p-5 rounded-lg border border-border/50 bg-muted/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">3</span>
                    </div>
                    <p className="font-semibold text-base">Generate & Download</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-11">Processing ~30s • Ready to use</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Step-by-Step Guide</h2>
            <p className="text-base text-muted-foreground">Everything you need to know to create your first LUT</p>
          </div>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent rounded-full hidden sm:block"></div>
              <Card className="bg-background/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                        <Upload className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Step 1</div>
                        <h3 className="text-xl font-bold mb-2">Upload Reference Image</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          Select a reference image with the color grading aesthetic you want to extract. Cinema stills, professional photography, or curated Instagram posts work well.
                        </p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-4 border border-border/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-semibold">Best Practices</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-2 ml-6 list-disc leading-relaxed">
                          <li>Use properly exposed images with visible detail</li>
                          <li>Avoid over-processed or heavily filtered sources</li>
                          <li>Multiple formats supported: JPG, PNG, WEBP, HEIC, TIFF, BMP, GIF</li>
                          <li>File size limits: Free 10MB, Creator 50MB, Pro 100MB, Studio 200MB</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-chart-2/50 to-transparent rounded-full hidden sm:block"></div>
              <Card className="bg-background/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                        <Settings className="w-7 h-7 text-chart-2" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm font-medium text-chart-2 mb-1">Step 2</div>
                        <h3 className="text-xl font-bold mb-2">Configure Export Settings</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          Choose grid resolution and output format based on your workflow requirements and subscription tier.
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-muted/40 rounded-lg p-4 border border-border/30">
                          <p className="text-sm font-semibold mb-3">Grid Resolution</p>
                          <p className="text-sm text-muted-foreground mb-1.5 leading-relaxed">Free: 17×17×17 only</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">Creator+: 33³, 65³</p>
                        </div>
                        <div className="bg-muted/40 rounded-lg p-4 border border-border/30">
                          <p className="text-sm font-semibold mb-3">Output Format</p>
                          <p className="text-sm text-muted-foreground mb-1.5 leading-relaxed">Free: .cube only</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">Creator+: .3dl, .look, .xmp</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-chart-3/50 to-transparent rounded-full hidden sm:block"></div>
              <Card className="bg-background/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                        <Download className="w-7 h-7 text-chart-3" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-sm font-medium text-chart-3 mb-1">Step 3</div>
                        <h3 className="text-xl font-bold mb-2">Generate and Download</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          CHROMA processes your image through its color science pipeline and generates a production-ready LUT file.
                        </p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-4 border border-border/30">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm font-semibold">Processing Pipeline</span>
                        </div>
                        <ol className="text-sm text-muted-foreground space-y-2 ml-6 list-decimal leading-relaxed">
                          <li>Image analysis and color space conversion</li>
                          <li>Tonal zone extraction (shadows, midtones, highlights)</li>
                          <li>LUT generation with professional metadata</li>
                          <li>Download ready for installation</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Next Steps</h2>
            <p className="text-base text-muted-foreground">Learn more about LUT installation and formats</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Link href="/resources/install-luts">
              <Card className="hover-elevate active-elevate-2 bg-background/80 backdrop-blur-sm border-border/50 cursor-pointer group h-full transition-all duration-300">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg flex items-center justify-between mb-2">
                    <span>Installation Guides</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    Platform-specific guides for DaVinci Resolve, Premiere Pro, and more
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/resources/lut-formats">
              <Card className="hover-elevate active-elevate-2 bg-background/80 backdrop-blur-sm border-border/50 cursor-pointer group h-full transition-all duration-300">
                <CardHeader className="p-6">
                  <CardTitle className="text-lg flex items-center justify-between mb-2">
                    <span>Format Selection</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    Choose the right LUT format for your editing workflow
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
