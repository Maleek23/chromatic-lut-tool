import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Upload, Settings, Download, ArrowRight, CheckCircle2, Clock, Lightbulb, Sparkles } from "lucide-react";

export default function CreateFromImages() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/resources">
              <Button variant="ghost" size="sm" data-testid="button-back-resources">
                ← Back to Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 mb-6">
            <Zap className="w-7 h-7 text-green-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            5-Minute Quick Start
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Get your first professional LUT in 5 minutes. No experience needed - just follow these simple steps!
          </p>
          
          <div className="flex items-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white">
              <Clock className="w-3 h-3 mr-1" />
              5 minutes
            </Badge>
            <Badge variant="outline">
              Beginner Friendly
            </Badge>
          </div>
        </div>
      </section>

      {/* Visual Flowchart */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-border/50">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6 text-center text-white">The Process</h2>
              
              {/* Flowchart SVG */}
              <svg viewBox="0 0 600 200" className="w-full h-auto">
                <defs>
                  <linearGradient id="step1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0.8 }} />
                  </linearGradient>
                  <linearGradient id="step2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0.8 }} />
                  </linearGradient>
                  <linearGradient id="step3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 0.8 }} />
                  </linearGradient>
                </defs>
                
                {/* Step 1 */}
                <g>
                  <rect x="20" y="70" width="140" height="60" rx="8" fill="url(#step1)" stroke="#10b981" strokeWidth="2"/>
                  <text x="90" y="95" fill="white" fontSize="13" fontWeight="600" textAnchor="middle">1. Upload Image</text>
                  <text x="90" y="115" fill="white" fontSize="10" textAnchor="middle" opacity="0.9">Any color-graded</text>
                  <text x="90" y="128" fill="white" fontSize="10" textAnchor="middle" opacity="0.9">reference photo</text>
                </g>
                
                {/* Arrow 1 */}
                <path d="M 165 100 L 215 100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                {/* Step 2 */}
                <g>
                  <rect x="220" y="70" width="140" height="60" rx="8" fill="url(#step2)" stroke="#3b82f6" strokeWidth="2"/>
                  <text x="290" y="95" fill="white" fontSize="13" fontWeight="600" textAnchor="middle">2. Choose Settings</text>
                  <text x="290" y="115" fill="white" fontSize="10" textAnchor="middle" opacity="0.9">Grid size & format</text>
                  <text x="290" y="128" fill="white" fontSize="10" textAnchor="middle" opacity="0.9">(Free: 17³, .cube)</text>
                </g>
                
                {/* Arrow 2 */}
                <path d="M 365 100 L 415 100" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                {/* Step 3 */}
                <g>
                  <rect x="420" y="70" width="140" height="60" rx="8" fill="url(#step3)" stroke="#a855f7" strokeWidth="2"/>
                  <text x="490" y="95" fill="white" fontSize="13" fontWeight="600" textAnchor="middle">3. Download LUT</text>
                  <text x="490" y="115" fill="white" fontSize="10" textAnchor="middle" opacity="0.9">Ready to use in</text>
                  <text x="490" y="128" fill="white" fontSize="10" textAnchor="middle" opacity="0.9">any editing software</text>
                </g>
                
                {/* Arrow markers */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#06b6d4" />
                  </marker>
                </defs>
              </svg>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Step-by-Step Guide</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <Card className="border-green-500/30 bg-gradient-to-br from-background to-green-500/5">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
                    <Upload className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Step 1: Upload Your Reference Image</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose any image with color grading you love - a movie still, Instagram photo, or professional photography. The better the reference, the better your LUT!
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        Pro Tips:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Use well-lit images with good exposure</li>
                        <li>Avoid images with heavy filters or extreme editing</li>
                        <li>JPG, PNG work best (Free: max 5MB)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-blue-500/30 bg-gradient-to-br from-background to-blue-500/5">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                    <Settings className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Step 2: Choose Your Settings</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pick your grid size and output format. Don't worry - we'll guide you through the options!
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-semibold mb-2">Grid Size</p>
                        <p className="text-xs text-muted-foreground mb-2">Free tier: 17×17×17 (Preview quality)</p>
                        <p className="text-xs text-muted-foreground">Upgrade for 33³ or 65³ (higher precision)</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-semibold mb-2">Output Format</p>
                        <p className="text-xs text-muted-foreground mb-2">Free tier: .cube (works everywhere)</p>
                        <p className="text-xs text-muted-foreground">Upgrade for .3dl, .lut, .look, .xmp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-background to-purple-500/5">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                    <Download className="w-6 h-6 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Step 3: Download and Apply</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      CHROMA processes your image (takes ~30 seconds) and generates your LUT. Download it and you're ready to go!
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        What Happens Next?
                      </p>
                      <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                        <li>CHROMA analyzes your image's color science</li>
                        <li>Extracts tonal zones (shadows, midtones, highlights)</li>
                        <li>Generates a professional LUT file</li>
                        <li>You download and install in your editing software</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to create your first LUT?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Sign up free and generate your first 3 LUTs. No credit card required!
              </p>
              <Link href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90" data-testid="button-get-started">
                  Start Creating — Free Forever
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">What to Read Next</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/resources/install-luts">
              <Card className="hover-elevate active-elevate-2 cursor-pointer group h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    How to Install LUTs
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription>
                    Step-by-step guides for DaVinci Resolve, Premiere Pro, and more
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/resources/lut-formats">
              <Card className="hover-elevate active-elevate-2 cursor-pointer group h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Which Format Should I Use?
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription>
                    Simple guide to choosing the right format for your software
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
