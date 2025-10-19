import { Link } from "wouter";
import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Upload, Settings, Download, ArrowRight, CheckCircle2, Clock, Lightbulb, Sparkles } from "lucide-react";

export default function CreateFromImages() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4">
            <Link href="/resources">
              <Button variant="ghost" size="sm" data-testid="button-back-resources">
                ← Resources
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Quick Start Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Generate professional LUTs from reference images in minutes. Follow this streamlined workflow to extract color science from any color-graded photograph.
          </p>
        </div>
      </section>

      {/* Visual Process Diagram */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">The Process</h2>
          <Card>
            <CardContent className="p-8 sm:p-12">
              {/* Flowchart SVG - More sophisticated design */}
              <svg viewBox="0 0 700 200" className="w-full h-auto">
                <defs>
                  <linearGradient id="step1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.2 }} />
                  </linearGradient>
                  <linearGradient id="step2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.2 }} />
                  </linearGradient>
                  <linearGradient id="step3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.2 }} />
                  </linearGradient>
                  <linearGradient id="arrow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#64748b' }} />
                    <stop offset="100%" style={{ stopColor: '#475569' }} />
                  </linearGradient>
                </defs>
                
                {/* Step 1 */}
                <g>
                  <rect x="30" y="60" width="180" height="80" rx="4" fill="url(#step1)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                  <text x="120" y="90" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600" textAnchor="middle">Upload Reference</text>
                  <text x="120" y="110" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Color-graded image</text>
                  <text x="120" y="126" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">5MB max (Free tier)</text>
                </g>
                
                {/* Arrow 1 */}
                <path d="M 215 100 L 250 100" stroke="url(#arrow)" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="232" y="90" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">1</text>
                
                {/* Step 2 */}
                <g>
                  <rect x="255" y="60" width="180" height="80" rx="4" fill="url(#step2)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                  <text x="345" y="90" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600" textAnchor="middle">Configure Export</text>
                  <text x="345" y="110" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Grid size & format</text>
                  <text x="345" y="126" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">17³ .cube (Free)</text>
                </g>
                
                {/* Arrow 2 */}
                <path d="M 440 100 L 475 100" stroke="url(#arrow)" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="457" y="90" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">2</text>
                
                {/* Step 3 */}
                <g>
                  <rect x="480" y="60" width="180" height="80" rx="4" fill="url(#step3)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                  <text x="570" y="90" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600" textAnchor="middle">Generate & Download</text>
                  <text x="570" y="110" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Processing ~30s</text>
                  <text x="570" y="126" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Ready to use</text>
                </g>
                
                {/* Arrow markers */}
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Detailed Workflow</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center border">
                      <Upload className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Upload Reference Image</h3>
                      <p className="text-muted-foreground">
                        Select a reference image with the color grading aesthetic you want to extract. Cinema stills, professional photography, or curated Instagram posts work well.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      <div className="flex items-start gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <span className="text-sm font-medium">Best Practices</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-2 ml-6 list-disc">
                        <li>Use properly exposed images with visible detail in shadows and highlights</li>
                        <li>Avoid over-processed or heavily filtered sources</li>
                        <li>JPG or PNG format, 5MB maximum on Free tier</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center border">
                      <Settings className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Configure Export Settings</h3>
                      <p className="text-muted-foreground">
                        Choose grid resolution and output format based on your workflow requirements and subscription tier.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 border">
                        <p className="text-sm font-medium mb-2">Grid Resolution</p>
                        <p className="text-xs text-muted-foreground mb-1">Free: 17×17×17</p>
                        <p className="text-xs text-muted-foreground">Creator+: 33³, 65³</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 border">
                        <p className="text-sm font-medium mb-2">Output Format</p>
                        <p className="text-xs text-muted-foreground mb-1">Free: .cube</p>
                        <p className="text-xs text-muted-foreground">Creator+: .3dl, .look, .xmp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center border">
                      <Download className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Generate and Download</h3>
                      <p className="text-muted-foreground">
                        CHROMA processes your image through its color science pipeline and generates a production-ready LUT file.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      <div className="flex items-start gap-2 mb-3">
                        <Sparkles className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <span className="text-sm font-medium">Processing Pipeline</span>
                      </div>
                      <ol className="text-sm text-muted-foreground space-y-1.5 ml-6 list-decimal">
                        <li>Image analysis and color space conversion</li>
                        <li>Tonal zone extraction (shadows, midtones, highlights)</li>
                        <li>LUT generation with professional metadata</li>
                        <li>Download ready for installation in editing software</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">Continue Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/resources/install-luts">
              <Card className="hover-elevate active-elevate-2 cursor-pointer group h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    How to Install LUTs
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription>
                    Installation guides for DaVinci Resolve, Premiere Pro, and other professional software
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/resources/lut-formats">
              <Card className="hover-elevate active-elevate-2 cursor-pointer group h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Format Selection Guide
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription>
                    Choose the right LUT format for your editing workflow and software
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
