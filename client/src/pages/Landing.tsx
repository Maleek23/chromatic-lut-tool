import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Crown, Check, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-32 overflow-hidden">
        {/* Subtle creative background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
          {/* Brand */}
          <div className="space-y-3">
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight">
              CHROMATIC
            </h1>
            <div className="flex items-center justify-center gap-0 text-sm font-medium text-muted-foreground group cursor-default">
              <span className="transition-all duration-700 ease-in-out group-hover:translate-x-4 group-hover:opacity-0">by UN</span>
              <span className="text-primary mx-1 text-lg transition-all duration-700 ease-in-out group-hover:scale-150">/</span>
              <span className="transition-all duration-700 ease-in-out group-hover:-translate-x-4 group-hover:opacity-0">TITLD</span>
            </div>
          </div>

          {/* Value Prop */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Extract authentic color grading from any reference image. 
            Professional LUT generation for colorists and cinematographers.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/generate">
              <Button size="lg" className="text-base px-8" data-testid="button-get-started">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Your First LUT
              </Button>
            </Link>
            <Link href="/tools">
              <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-explore-tools">
                Explore Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <Card className="border-primary/50 hover-elevate">
              <CardContent className="pt-8 pb-6 space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Image to LUT</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upload color-graded images and extract authentic color science into professional LUT files
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="pt-8 pb-6 space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Convert & Analyze</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Convert between .cube and .3dl formats. Detect banding, invalid points, and quality issues
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="pt-8 pb-6 space-y-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Pro Features</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Save unlimited presets, batch processing, Lightroom-style presets, and advanced optimization
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you need more power
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card className="hover-elevate">
              <CardHeader className="space-y-4 pb-8">
                <div>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <CardDescription className="mt-2">Perfect for trying it out</CardDescription>
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
                    <span className="text-sm">Image to LUT generation</span>
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
                    <span className="text-sm">Basic grid sizes (17x17x17, 33x33x33)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Up to 5 conversions/day</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/generate" className="w-full">
                  <Button variant="outline" size="lg" className="w-full" data-testid="button-free-plan">
                    Get Started Free
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Pro Tier */}
            <Card className="border-primary shadow-lg shadow-primary/10 scale-105 hover-elevate">
              <CardHeader className="space-y-4 pb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Pro</CardTitle>
                    <CardDescription className="mt-2">For professional colorists</CardDescription>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Popular</Badge>
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
                    <span className="text-sm">Unlimited conversions & generations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Save unlimited custom presets</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Advanced grid size (65x65x65)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Lightroom-style presets (coming soon)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Batch processing (coming soon)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/auth" className="w-full">
                  <Button size="lg" className="w-full" data-testid="button-pro-plan">
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Studio Tier */}
            <Card className="hover-elevate">
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
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Chromatic by UN/TITLD • Professional LUT tools for cinematographers and colorists</p>
        </div>
      </footer>
    </div>
  );
}
