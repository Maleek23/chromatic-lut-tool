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

      {/* Six-Stage Architecture Educational Section */}
      <SixStageArchitecture />

      {/* Features Overview */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Professional LUT Tools</h2>
            <p className="text-muted-foreground">Everything you need for cinema-grade color grading</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Image to LUT</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Extract cinema-grade color science from reference images using perceptual analysis
                  </p>
                </div>
              </div>
            </Card>

            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 p-8">
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

            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chart-3/20 to-purple-500/20 flex items-center justify-center shrink-0">
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

            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-purple-500" />
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

      {/* Divider */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Pricing Section */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto space-y-8 max-w-7xl">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3">Tier</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Each tier unlocks powerful tools. Start free, upgrade when you're ready.
            </p>
          </div>
          
          {/* Pricing Cards - Fixed Layout */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-end max-w-[1200px] mx-auto">
            {/* Free Tier */}
            <div className="relative w-full lg:w-[260px]">
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 flex flex-col min-h-[480px]">
                <CardHeader className="space-y-4 pb-6">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-green-500" />
                      </div>
                      Free
                    </CardTitle>
                    <CardDescription className="mt-2">New users & hobbyists</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-green-600 dark:text-green-500">$0</span>
                    <span className="text-muted-foreground">/forever</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 px-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold">3 Image-to-LUT/month</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-primary">$2.50 per additional LUT</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Output: .cube format</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Convert any LUT → .cube</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">17³ grid size only</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">25MB file size limit</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Save up to 3 LUTs</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pt-6 border-t mt-auto">
                  <Button variant="outline" className="w-full" data-testid="button-free-plan" asChild>
                    <Link href="/auth">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Creator Tier */}
            <div className="relative w-full lg:w-[260px]">
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 border-blue-500/20 flex flex-col min-h-[520px]">
                <CardHeader className="space-y-4 pb-6">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-blue-500" />
                      </div>
                      Creator
                    </CardTitle>
                    <CardDescription className="mt-2">Growing colorists</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-blue-600 dark:text-blue-500">$7</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 px-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-blue-500">Unlimited generations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-blue-500">17³ & 33³ grid sizes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Output: .cube, .3dl, .look</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Convert between 3 formats</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">50MB file size limit</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Save up to 30 LUTs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Folder organization</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pt-6 border-t mt-auto">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90" data-testid="button-creator-plan" asChild>
                    <Link href="/upgrade">Upgrade</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Pro Tier */}
            <div className="relative w-full lg:w-[260px]">
              {/* Badge positioned OUTSIDE */}
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-chart-2 text-white text-xs px-3 py-1 border-0 z-10 shadow-lg">
                Most Popular
              </Badge>
              
              <Card className="border-primary shadow-lg shadow-primary/10 hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 flex flex-col min-h-[560px]">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3 rounded-t-lg" />
                
                <CardHeader className="space-y-4 pb-6 pt-8">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-500" />
                      </div>
                      Pro
                    </CardTitle>
                    <CardDescription className="mt-2">Professional creators</CardDescription>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-purple-600 dark:text-purple-500">$12</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">or $99/year</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 px-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold">Everything in Creator</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-purple-500">LUT Analyzer tool</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-purple-500">LUT Optimizer tool</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-purple-500">All grid sizes (up to 65³)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-purple-500">All 5 formats (.cube/.3dl/.lut/.look/.xmp)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Convert between any formats</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">Unlimited saved LUTs</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pt-6 border-t mt-auto">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90" data-testid="button-pro-plan" asChild>
                    <Link href="/upgrade">Upgrade</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Studio Tier */}
            <div className="relative w-full lg:w-[260px]">
              {/* Badge positioned OUTSIDE */}
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 border-0 z-10 shadow-lg">
                Coming Soon
              </Badge>
              
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 border-yellow-500/20 opacity-90 flex flex-col min-h-[600px]">
                <CardHeader className="space-y-4 pb-6 pt-8">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-yellow-500" />
                      </div>
                      Studio
                    </CardTitle>
                    <CardDescription className="mt-2">Agencies & teams</CardDescription>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-yellow-600 dark:text-yellow-500">$25</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 px-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold">Everything in Pro</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">Branded LUTs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">Team sharing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">Batch processing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-500">AI grading</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pt-6 border-t mt-auto">
                  <Button disabled className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-60 cursor-not-allowed" data-testid="button-studio-plan">
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
