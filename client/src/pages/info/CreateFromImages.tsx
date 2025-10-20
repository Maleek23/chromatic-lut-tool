import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Settings, Download, ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function CreateFromImages() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects - matching Landing page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-chart-3/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 via-cyan-400 to-pink-500">
              Quick Start Guide
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
            Generate professional LUTs from reference images in minutes. Extract color science from any color-graded photograph.
          </p>
        </div>
      </section>

      {/* Visual Process Diagram */}
      <section className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <h2 className="text-xl sm:text-2xl font-semibold">The Process</h2>
          <Card className="bg-background/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-8 md:p-12">
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
              <div className="sm:hidden space-y-4">
                <div className="p-4 rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-pink-500/5">
                  <p className="font-semibold text-sm mb-1">1. Upload Reference</p>
                  <p className="text-xs text-muted-foreground">Color-graded image (10MB max)</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                </div>
                <div className="p-4 rounded-lg border-2 border-chart-2/30 bg-gradient-to-br from-chart-2/10 to-cyan-400/5">
                  <p className="font-semibold text-sm mb-1">2. Configure Export</p>
                  <p className="text-xs text-muted-foreground">17³ grid, .cube only (Free)</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                </div>
                <div className="p-4 rounded-lg border-2 border-chart-3/30 bg-gradient-to-br from-chart-3/10 to-green-500/5">
                  <p className="font-semibold text-sm mb-1">3. Generate & Download</p>
                  <p className="text-xs text-muted-foreground">Processing ~30s, ready to use</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <h2 className="text-xl sm:text-2xl font-semibold">Detailed Workflow</h2>
          
          <div className="space-y-4 sm:space-y-6">
            {/* Step 1 */}
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold">Upload Reference Image</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Select a reference image with the color grading aesthetic you want to extract. Cinema stills, professional photography, or curated Instagram posts work well.
                    </p>
                    <Card className="bg-muted/30">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">Best Practices</span>
                        </div>
                        <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 ml-6 list-disc">
                          <li>Use properly exposed images with visible detail</li>
                          <li>Avoid over-processed or heavily filtered sources</li>
                          <li>Multiple formats supported: JPG, PNG, WEBP, HEIC, TIFF, BMP, GIF</li>
                          <li>File size limits: Free 10MB, Creator 50MB, Pro 100MB, Studio 200MB</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                      <Settings className="w-6 h-6 text-chart-2" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold">Configure Export Settings</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Choose grid resolution and output format based on your workflow requirements and subscription tier.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <Card className="bg-muted/30">
                        <CardContent className="p-3 sm:p-4">
                          <p className="text-sm font-medium mb-2">Grid Resolution</p>
                          <p className="text-xs text-muted-foreground mb-1">Free: 17×17×17 only</p>
                          <p className="text-xs text-muted-foreground">Creator+: 33³, 65³</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/30">
                        <CardContent className="p-3 sm:p-4">
                          <p className="text-sm font-medium mb-2">Output Format</p>
                          <p className="text-xs text-muted-foreground mb-1">Free: .cube only</p>
                          <p className="text-xs text-muted-foreground">Creator+: .3dl, .look, .xmp</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                      <Download className="w-6 h-6 text-chart-3" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-base sm:text-lg font-semibold">Generate and Download</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      CHROMA processes your image through its color science pipeline and generates a production-ready LUT file.
                    </p>
                    <Card className="bg-muted/30">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <Sparkles className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm font-medium">Processing Pipeline</span>
                        </div>
                        <ol className="text-xs sm:text-sm text-muted-foreground space-y-1.5 ml-6 list-decimal">
                          <li>Image analysis and color space conversion</li>
                          <li>Tonal zone extraction (shadows, midtones, highlights)</li>
                          <li>LUT generation with professional metadata</li>
                          <li>Download ready for installation</li>
                        </ol>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/resources/install-luts">
              <Card className="hover-elevate active-elevate-2 bg-background/80 backdrop-blur-sm cursor-pointer group h-full">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                    <span>Installation Guides</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline" />
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Platform-specific guides for DaVinci Resolve, Premiere Pro, and more
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/resources/lut-formats">
              <Card className="hover-elevate active-elevate-2 bg-background/80 backdrop-blur-sm cursor-pointer group h-full">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                    <span>Format Selection</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline" />
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
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
