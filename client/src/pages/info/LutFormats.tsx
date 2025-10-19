import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle2, ArrowRight, XCircle } from "lucide-react";

export default function LutFormats() {
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6">
            <HelpCircle className="w-7 h-7 text-purple-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Which Format Should I Use?
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Confused about .cube vs .3dl vs .lut? This simple guide will help you choose the right format for your software and workflow.
          </p>
        </div>
      </section>

      {/* Decision Tree */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-border/50">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6 text-center text-white">Quick Decision Tree</h2>
              
              {/* Decision Tree SVG */}
              <svg viewBox="0 0 700 400" className="w-full h-auto">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.8 }} />
                  </linearGradient>
                  <linearGradient id="3dlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
                  </linearGradient>
                  <linearGradient id="lutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.8 }} />
                    <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0.8 }} />
                  </linearGradient>
                </defs>
                
                {/* Start Question */}
                <g>
                  <rect x="225" y="20" width="250" height="50" rx="8" fill="#334155" stroke="#475569" strokeWidth="2"/>
                  <text x="350" y="40" fill="white" fontSize="13" fontWeight="600" textAnchor="middle">What software are you using?</text>
                  <text x="350" y="58" fill="#94a3b8" fontSize="11" textAnchor="middle">Choose your editing platform</text>
                </g>
                
                {/* Branch Lines */}
                <path d="M 250 70 L 150 130" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5"/>
                <path d="M 350 70 L 350 130" stroke="#06b6d4" strokeWidth="2"/>
                <path d="M 450 70 L 550 130" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5"/>
                
                {/* Branch 1: .cube (Most Compatible) */}
                <g>
                  <rect x="50" y="130" width="200" height="80" rx="8" fill="url(#cubeGrad)" stroke="#a855f7" strokeWidth="2"/>
                  <text x="150" y="155" fill="white" fontSize="14" fontWeight="700" textAnchor="middle">.cube</text>
                  <text x="150" y="175" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">✓ DaVinci Resolve</text>
                  <text x="150" y="190" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">✓ Premiere Pro</text>
                  <text x="150" y="205" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">✓ Final Cut Pro</text>
                </g>
                <text x="150" y="225" fill="#a855f7" fontSize="10" fontWeight="600" textAnchor="middle">BEST FOR MOST USERS</text>
                
                {/* Branch 2: .3dl (Professional) */}
                <g>
                  <rect x="280" y="130" width="140" height="80" rx="8" fill="url(#3dlGrad)" stroke="#3b82f6" strokeWidth="2"/>
                  <text x="350" y="155" fill="white" fontSize="14" fontWeight="700" textAnchor="middle">.3dl</text>
                  <text x="350" y="175" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">✓ Avid</text>
                  <text x="350" y="190" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">✓ Nuke</text>
                  <text x="350" y="205" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">✓ Broadcast</text>
                </g>
                <text x="350" y="225" fill="#3b82f6" fontSize="10" fontWeight="600" textAnchor="middle">HIGH-END PRO</text>
                
                {/* Branch 3: .lut (Simple) */}
                <g>
                  <rect x="450" y="130" width="200" height="80" rx="8" fill="url(#lutGrad)" stroke="#10b981" strokeWidth="2"/>
                  <text x="550" y="155" fill="white" fontSize="14" fontWeight="700" textAnchor="middle">.lut (1D)</text>
                  <text x="550" y="175" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">Simple adjustments</text>
                  <text x="550" y="190" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">Contrast/Exposure</text>
                  <text x="550" y="205" fill="white" fontSize="11" textAnchor="middle" opacity="0.9">Not for color grading</text>
                </g>
                <text x="550" y="225" fill="#10b981" fontSize="10" fontWeight="600" textAnchor="middle">RARELY NEEDED</text>
                
                {/* Second level questions */}
                <g>
                  <rect x="100" y="260" width="180" height="40" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
                  <text x="190" y="278" fill="#94a3b8" fontSize="11" textAnchor="middle">Need compatibility?</text>
                  <text x="190" y="293" fill="white" fontSize="12" fontWeight="600" textAnchor="middle">→ Use .cube</text>
                </g>
                
                <g>
                  <rect x="310" y="260" width="180" height="40" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
                  <text x="400" y="278" fill="#94a3b8" fontSize="11" textAnchor="middle">Using Avid/Nuke?</text>
                  <text x="400" y="293" fill="white" fontSize="12" fontWeight="600" textAnchor="middle">→ Use .3dl</text>
                </g>
                
                <g>
                  <rect x="460" y="260" width="180" height="40" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
                  <text x="550" y="278" fill="#94a3b8" fontSize="11" textAnchor="middle">Just gamma/contrast?</text>
                  <text x="550" y="293" fill="white" fontSize="12" fontWeight="600" textAnchor="middle">→ Use .lut</text>
                </g>
                
                {/* Bottom Recommendation */}
                <rect x="150" y="330" width="400" height="50" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>
                <text x="350" y="350" fill="white" fontSize="13" fontWeight="700" textAnchor="middle">RECOMMENDED: 95% OF USERS SHOULD USE .CUBE</text>
                <text x="350" y="368" fill="#e9d5ff" fontSize="11" textAnchor="middle">Maximum compatibility • Works everywhere • Free tier available</text>
              </svg>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Format Comparison Cards */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Format Details</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* .cube Format */}
            <Card className="border-purple-500/30 bg-gradient-to-br from-background to-purple-500/5">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white">
                  Recommended
                </Badge>
                <CardTitle className="text-2xl">.cube</CardTitle>
                <CardDescription>Industry Standard 3D LUT</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Works in 99% of software</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Variable grid sizes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Full color grading</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Available on Free tier</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-semibold mb-1">Best For:</p>
                  <p className="text-xs text-muted-foreground">DaVinci Resolve, Premiere Pro, Final Cut Pro, Photoshop, After Effects</p>
                </div>
              </CardContent>
            </Card>

            {/* .3dl Format */}
            <Card className="border-blue-500/30 bg-gradient-to-br from-background to-blue-500/5">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  Creator+ Tier
                </Badge>
                <CardTitle className="text-2xl">.3dl</CardTitle>
                <CardDescription>Professional Broadcast</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>12-bit precision</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Broadcast standard</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>High-end workflows</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-4 h-4" />
                    <span>Fixed 33³ grid only</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-semibold mb-1">Best For:</p>
                  <p className="text-xs text-muted-foreground">Avid Media Composer, Nuke, Flame, professional broadcast</p>
                </div>
              </CardContent>
            </Card>

            {/* .lut Format */}
            <Card className="border-green-500/30 bg-gradient-to-br from-background to-green-500/5">
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  Pro Tier
                </Badge>
                <CardTitle className="text-2xl">.lut</CardTitle>
                <CardDescription>Simple 1D Adjustments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Smallest file size</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Fast processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-4 h-4" />
                    <span>Per-channel only</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <XCircle className="w-4 h-4" />
                    <span>No cross-channel color</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs font-semibold mb-1">Best For:</p>
                  <p className="text-xs text-muted-foreground">Gamma correction, contrast curves, technical conversion only</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Recommendation */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3">Still Not Sure?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you're just getting started with LUTs, we <strong>strongly recommend .cube format</strong>. It works in all major editing software, is available on the free tier, and supports professional color grading.
                  </p>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Choose .cube if:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>You're using DaVinci Resolve, Premiere Pro, or Final Cut Pro</li>
                      <li>You want maximum compatibility</li>
                      <li>You're new to LUTs and color grading</li>
                      <li>You want to start with the free tier</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to create your first LUT?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start with .cube format on the free tier - works everywhere, professional quality, no credit card needed!
              </p>
              <Link href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90" data-testid="button-get-started">
                  Get Started — Free Forever
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
