import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Check, Lightbulb, Layers, Zap, Crown, TrendingUp } from "lucide-react";
import logoImage from "@assets/logo-full-transparent-v2.png";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/visual/HeroSection";
import { SixStageArchitecture } from "@/components/education/SixStageArchitecture";

export default function Landing() {
  return (
    <>
      {/* Cinema-Grade Hero Section */}
      <HeroSection />

      {/* Gradient blending: Hero to Six-Stage */}
      <div className="relative -mt-12 h-20 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Six-Stage Architecture Educational Section */}
      <SixStageArchitecture />

      {/* Gradient blending: Six-Stage to Features */}
      <div className="relative -mt-8 h-16 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Features Overview */}
      <section className="relative z-10 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Professional LUT Tools</h2>
            <p className="text-muted-foreground">Everything you need for cinema-grade color grading</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 p-6 border-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Image, Video & Pair to LUT</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Look-inspired grades from stills and clips, plus exact before/after frame-pair solving with measured ΔE accuracy
                  </p>
                </div>
              </div>
            </Card>

            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 p-6 border-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6 text-chart-2" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Convert & Optimize</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Convert between all major formats and optimize for maximum quality
                  </p>
                </div>
              </div>
            </Card>

            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 p-6 border-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quality Analysis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Deep quality scoring, banding detection, and professional metrics
                  </p>
                </div>
              </div>
            </Card>

            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 p-6 border-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">VES + CIE Standards</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Built on industry standards for accurate, professional color science
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Gradient blending: Features to Pricing */}
      <div className="relative -mt-4 h-20 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
      </div>

      {/* Pricing Section */}
      <section className="relative z-10 py-10 px-4">
        <div className="w-full mx-auto space-y-8 max-w-6xl">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3">Simple, Transparent</span> Pricing
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Professional tools for every stage of your workflow
            </p>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:flex lg:items-end lg:justify-center gap-6 max-w-6xl mx-auto">
            {/* Free Tier */}
            <Card className="hover-elevate backdrop-blur-sm transition-all duration-300 flex flex-col border-0 h-[360px] lg:w-64 relative overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
              <CardHeader className="space-y-2 pb-4 relative z-10">
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-chart-2 shadow-lg shadow-primary/50"></span>
                  Free
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">$0</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                <CardDescription className="text-xs">For trying out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex-1 px-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">3 generations/month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">.cube format</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">17³ grid size</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Save up to 3 LUTs</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pt-4 mt-auto">
                <Button variant="outline" size="sm" className="w-full" data-testid="button-free-plan" asChild>
                  <Link href="/auth">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Creator Tier */}
            <Card className="hover-elevate backdrop-blur-sm transition-all duration-300 flex flex-col border-0 h-[440px] lg:w-64 relative overflow-hidden bg-gradient-to-br from-chart-2/20 via-background to-background/95">
              <CardHeader className="space-y-2 pb-4 relative z-10">
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-chart-2 to-chart-3 shadow-lg shadow-chart-2/50"></span>
                  Creator
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">$7</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                <CardDescription className="text-xs">For independent work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex-1 px-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Unlimited generations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">17³ & 33³ grid sizes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">.cube, .3dl, .look</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Save up to 30 LUTs</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pt-4 mt-auto">
                <Button size="sm" className="w-full" data-testid="button-creator-plan" asChild>
                  <Link href="/upgrade">Upgrade</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Tier */}
            <Card className="hover-elevate backdrop-blur-sm transition-all duration-300 flex flex-col border-0 relative h-[520px] lg:w-72 bg-gradient-to-br from-primary/25 via-chart-2/15 to-background/95 shadow-xl shadow-primary/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <Badge className="bg-gradient-to-r from-primary to-chart-2 text-white text-xs px-3 py-1 border-0 shadow-lg shadow-primary/50">
                  Popular
                </Badge>
              </div>
              <CardHeader className="space-y-2 pb-4 relative z-10">
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-chart-3 to-primary shadow-lg shadow-chart-3/50"></span>
                  Pro
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold bg-gradient-to-r from-chart-3 to-primary bg-clip-text text-transparent">$12</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                <CardDescription className="text-xs">For professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex-1 px-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Everything in Creator</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Analyzer & Optimizer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Up to 65³ grid size</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">All formats incl. Resolve .dctl</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Unlimited storage</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pt-4 mt-auto">
                <Button size="sm" className="w-full" data-testid="button-pro-plan" asChild>
                  <Link href="/upgrade">Upgrade</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Studio Tier */}
            <Card className="hover-elevate backdrop-blur-sm transition-all duration-300 flex flex-col border-0 relative h-[600px] lg:w-64 bg-gradient-to-br from-chart-3/25 via-primary/15 to-background/95">
              <CardHeader className="space-y-2 pb-4 relative z-10">
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-chart-3 shadow-lg shadow-primary/50"></span>
                  Studio
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent">$25</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                <CardDescription className="text-xs">For teams & agencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 flex-1 px-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Everything in Pro</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Branded LUTs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Team collaboration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-xs text-muted-foreground">Batch processing</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 pt-4 mt-auto">
                <Button size="sm" className="w-full" data-testid="button-studio-plan" asChild>
                  <Link href="/upgrade">Upgrade</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Gradient blending: Pricing to Footer */}
      <div className="relative h-12 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />
      </div>

      <Footer />
    </>
  );
}
