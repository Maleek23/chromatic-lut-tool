import { Link } from "wouter";
import { NavBar } from "@/components/layout/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle2, ArrowRight, XCircle, FileCode } from "lucide-react";

export default function LutFormats() {
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
            LUT Format Selection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Choose the optimal format for your color grading software and workflow. Understanding format compatibility ensures seamless integration with professional tools.
          </p>
        </div>
      </section>

      {/* Decision Tree */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Format Decision Tree</h2>
          <Card>
            <CardContent className="p-8 sm:p-12">
              {/* Decision Tree SVG - Professional design */}
              <svg viewBox="0 0 800 420" className="w-full h-auto">
                <defs>
                  <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.2 }} />
                  </linearGradient>
                  <linearGradient id="3dlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.2 }} />
                  </linearGradient>
                  <linearGradient id="lutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 0.2 }} />
                  </linearGradient>
                </defs>
                
                {/* Start Question */}
                <g>
                  <rect x="250" y="20" width="300" height="60" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                  <text x="400" y="45" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600" textAnchor="middle">What software are you using?</text>
                  <text x="400" y="64" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Select based on your editing platform</text>
                </g>
                
                {/* Branch Lines */}
                <path d="M 300 80 L 180 140" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4,4"/>
                <path d="M 400 80 L 400 140" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                <path d="M 500 80 L 620 140" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4,4"/>
                
                {/* Branch 1: .cube (Most Compatible) */}
                <g>
                  <rect x="60" y="140" width="240" height="90" rx="4" fill="url(#cubeGrad)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                  <text x="180" y="165" fill="hsl(var(--foreground))" fontSize="15" fontWeight="700" textAnchor="middle">.cube Format</text>
                  <text x="180" y="185" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">DaVinci Resolve</text>
                  <text x="180" y="200" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Premiere Pro</text>
                  <text x="180" y="215" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Final Cut Pro</text>
                </g>
                <rect x="80" y="242" width="200" height="30" rx="3" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1"/>
                <text x="180" y="262" fill="hsl(var(--primary))" fontSize="10" fontWeight="600" textAnchor="middle">RECOMMENDED FOR MOST</text>
                
                {/* Branch 2: .3dl (Professional) */}
                <g>
                  <rect x="330" y="140" width="140" height="90" rx="4" fill="url(#3dlGrad)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                  <text x="400" y="165" fill="hsl(var(--foreground))" fontSize="15" fontWeight="700" textAnchor="middle">.3dl</text>
                  <text x="400" y="185" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Avid</text>
                  <text x="400" y="200" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Nuke</text>
                  <text x="400" y="215" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Broadcast</text>
                </g>
                <rect x="340" y="242" width="120" height="30" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1"/>
                <text x="400" y="262" fill="hsl(var(--muted-foreground))" fontSize="10" fontWeight="600" textAnchor="middle">HIGH-END PRO</text>
                
                {/* Branch 3: .lut (Simple) */}
                <g>
                  <rect x="500" y="140" width="240" height="90" rx="4" fill="url(#lutGrad)" stroke="hsl(var(--border))" strokeWidth="1.5"/>
                  <text x="620" y="165" fill="hsl(var(--foreground))" fontSize="15" fontWeight="700" textAnchor="middle">.lut (1D)</text>
                  <text x="620" y="185" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Simple tone curves</text>
                  <text x="620" y="200" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Exposure/Contrast</text>
                  <text x="620" y="215" fill="hsl(var(--muted-foreground))" fontSize="11" textAnchor="middle">Limited color grading</text>
                </g>
                <rect x="520" y="242" width="200" height="30" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1"/>
                <text x="620" y="262" fill="hsl(var(--muted-foreground))" fontSize="10" fontWeight="600" textAnchor="middle">SPECIALIZED USE</text>
                
                {/* Second level */}
                <g>
                  <rect x="80" y="300" width="200" height="50" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1"/>
                  <text x="180" y="320" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">Maximum compatibility?</text>
                  <text x="180" y="338" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" textAnchor="middle">→ Use .cube</text>
                </g>
                
                <g>
                  <rect x="330" y="300" width="140" height="50" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1"/>
                  <text x="400" y="320" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">Avid/Nuke workflow?</text>
                  <text x="400" y="338" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" textAnchor="middle">→ Use .3dl</text>
                </g>
                
                <g>
                  <rect x="520" y="300" width="200" height="50" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1"/>
                  <text x="620" y="320" fill="hsl(var(--muted-foreground))" fontSize="10" textAnchor="middle">Only gamma/exposure?</text>
                  <text x="620" y="338" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" textAnchor="middle">→ Use .lut</text>
                </g>
                
                {/* Bottom Note */}
                <rect x="200" y="375" width="400" height="35" rx="4" fill="hsl(var(--primary))" fillOpacity="0.05" stroke="hsl(var(--primary))" strokeWidth="1.5"/>
                <text x="400" y="398" fill="hsl(var(--foreground))" fontSize="12" fontWeight="600" textAnchor="middle">.cube format provides optimal compatibility across professional applications</text>
              </svg>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Format Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Format Specifications</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* .cube Format */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default">Recommended</Badge>
                  <FileCode className="w-5 h-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl">.cube</CardTitle>
                <CardDescription>Industry Standard 3D LUT</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>Universal software compatibility</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>Variable grid resolutions</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>Full 3D color transforms</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>Available on Free tier</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <p className="text-xs font-medium mb-1">Compatible Software</p>
                  <p className="text-xs text-muted-foreground">DaVinci Resolve, Premiere Pro, Final Cut Pro, Photoshop, After Effects</p>
                </div>
              </CardContent>
            </Card>

            {/* .3dl Format */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">Creator+</Badge>
                  <FileCode className="w-5 h-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl">.3dl</CardTitle>
                <CardDescription>Professional Broadcast</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>12-bit precision</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>Broadcast standard</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>Professional workflows</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-4 h-4 mt-0.5" />
                    <span>Fixed 33³ grid only</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <p className="text-xs font-medium mb-1">Compatible Software</p>
                  <p className="text-xs text-muted-foreground">Avid Media Composer, Nuke, Flame, professional broadcast systems</p>
                </div>
              </CardContent>
            </Card>

            {/* .lut Format */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">Pro</Badge>
                  <FileCode className="w-5 h-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl">.lut</CardTitle>
                <CardDescription>1D Tone Curves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>Minimal file size</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                    <span>Fast processing</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-4 h-4 mt-0.5" />
                    <span>Per-channel only</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-4 h-4 mt-0.5" />
                    <span>No cross-channel grading</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <p className="text-xs font-medium mb-1">Best For</p>
                  <p className="text-xs text-muted-foreground">Gamma correction, contrast curves, technical conversion workflows</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommendation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <HelpCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Format Selection Guidance</h3>
                    <p className="text-muted-foreground">
                      For most professional workflows, <strong>.cube format</strong> provides optimal compatibility while supporting full 3D color transformations. It's the industry standard across editing platforms and works seamlessly from free to professional tiers.
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 border">
                    <div className="flex items-start gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 dark:text-green-500" />
                      <span className="text-sm font-medium">Choose .cube if:</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-6 list-disc">
                      <li>Working with DaVinci Resolve, Premiere Pro, or Final Cut Pro</li>
                      <li>Need maximum software compatibility</li>
                      <li>Starting with color grading workflows</li>
                      <li>Want free tier availability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">Continue Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/resources/create-from-images">
              <Card className="hover-elevate active-elevate-2 cursor-pointer group h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Quick Start Guide
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription>
                    Generate your first professional LUT from a reference image
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/resources/install-luts">
              <Card className="hover-elevate active-elevate-2 cursor-pointer group h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Installation Guides
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription>
                    Step-by-step instructions for professional editing software
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
