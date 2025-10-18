import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Crown, Check, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-32">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          
          {/* Animated color orbs */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-chart-2/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-chart-3/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
          
          {/* Film grain overlay */}
          <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          {/* Brand with chromatic effect */}
          <div className="space-y-3">
            <div className="relative inline-block">
              <h1 className="text-7xl md:text-8xl font-bold tracking-tight relative">
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500/20 via-transparent to-transparent blur-sm translate-x-[-2px]">
                  CHROMATIC
                </span>
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-transparent via-transparent to-blue-500/20 blur-sm translate-x-[2px]">
                  CHROMATIC
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                  CHROMATIC
                </span>
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-0 text-sm font-medium text-muted-foreground group cursor-default">
              <span className="transition-all duration-700 ease-in-out group-hover:translate-x-4 group-hover:opacity-0">by UN</span>
              <span className="text-primary mx-1 text-lg transition-all duration-700 ease-in-out group-hover:scale-150 group-hover:rotate-180">
                /
              </span>
              <span className="transition-all duration-700 ease-in-out group-hover:-translate-x-4 group-hover:opacity-0">TITLD</span>
            </div>
          </div>

          {/* Value Prop with color accent */}
          <div className="relative">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Extract <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3 font-semibold">authentic color grading</span> from any reference image. 
              Professional LUT generation for colorists and cinematographers.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button size="lg" className="text-base px-8 group relative overflow-hidden" data-testid="button-get-started">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Your First LUT
                </span>
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" variant="outline" className="text-base px-8 backdrop-blur-sm" data-testid="button-explore-tools">
                Explore Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Features with color-coded icons */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <Card className="border-primary/30 hover-elevate bg-background/50 backdrop-blur-sm transition-all duration-300 group">
              <CardContent className="pt-8 pb-6 space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Image to LUT</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload color-graded images and extract authentic color science into professional LUT files
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate bg-background/50 backdrop-blur-sm transition-all duration-300 group">
              <CardContent className="pt-8 pb-6 space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-chart-2" />
                </div>
                <h3 className="font-semibold text-lg">Convert & Analyze</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Convert between .cube and .3dl formats. Detect banding, invalid points, and quality issues
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate bg-background/50 backdrop-blur-sm transition-all duration-300 group">
              <CardContent className="pt-8 pb-6 space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-6 h-6 text-chart-3" />
                </div>
                <h3 className="font-semibold text-lg">Pro Features</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Save unlimited presets, batch processing, Lightroom-style presets, and advanced optimization
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Color spectrum visualization */}
          <div className="mt-16 relative">
            <div className="flex gap-1 justify-center h-20 items-end opacity-40">
              {[...Array(32)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 rounded-t transition-all duration-1000 ease-in-out"
                  style={{
                    height: `${30 + Math.sin(i * 0.5) * 20 + Math.random() * 10}%`,
                    background: `hsl(${i * 11.25}, 70%, 60%)`,
                    animationDelay: `${i * 50}ms`,
                    animation: 'pulse 3s ease-in-out infinite'
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        {/* Film strip decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-8 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-12 border-2 border-foreground mb-2" />
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-12 border-2 border-foreground mb-2" />
          ))}
        </div>

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you need more power
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="space-y-4 pb-8">
                <div>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <CardDescription className="mt-2">Full-featured, forever free</CardDescription>
                </div>
                <div>
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground text-lg ml-2">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Unlimited image to LUT generation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">LUT format conversion (.cube ↔ .3dl)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Quality analysis & banding detection</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Grid sizes (17x17x17, 33x33x33, 65x65x65)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">All export formats & precision options</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/auth" className="w-full">
                  <Button variant="outline" size="lg" className="w-full" data-testid="button-free-plan">
                    Get Started Free
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Pro Tier */}
            <Card className="border-primary shadow-lg shadow-primary/10 scale-105 hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 relative overflow-hidden">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3" />
              
              <CardHeader className="space-y-4 pb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Pro</CardTitle>
                    <CardDescription className="mt-2">For professional colorists</CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground border-0">Popular</Badge>
                </div>
                <div>
                  <span className="text-5xl font-bold">$15</span>
                  <span className="text-muted-foreground text-lg ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm font-medium">Everything in Free, plus:</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Save & organize unlimited presets</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Access preset library dashboard</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Lightroom-style presets (coming soon)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Batch processing (coming soon)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Priority email support</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/auth" className="w-full">
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90" data-testid="button-pro-plan">
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Studio Tier */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="space-y-4 pb-8">
                <div>
                  <CardTitle className="text-2xl">Studio</CardTitle>
                  <CardDescription className="mt-2">For teams & studios</CardDescription>
                </div>
                <div>
                  <span className="text-5xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground font-medium">Everything in Pro, plus:</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Video LUT processing (planned)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Full API access (planned)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Team collaboration (planned)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Priority support (planned)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Custom integrations (planned)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="lg" className="w-full" disabled data-testid="button-studio-plan">
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 bg-background">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Chromatic by UN/TITLD • Professional LUT tools for cinematographers and colorists</p>
        </div>
      </footer>
    </div>
  );
}
