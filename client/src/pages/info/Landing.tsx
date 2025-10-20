import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Check, Lightbulb, Layers, Zap, Crown, TrendingUp } from "lucide-react";
import logoImage from "@assets/logo-full-transparent-v2.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated color orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-chart-3/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main logo - centered with side branding */}
          <div className="flex items-center justify-center mb-8 relative">
            <img src={logoImage} alt="CHROMA" className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto" />
            <div className="flex items-center text-[10px] sm:text-[11px] text-muted-foreground tracking-[0.1em] group absolute left-[calc(50%+55px)] sm:left-[calc(50%+70px)] md:left-[calc(50%+90px)] lg:left-[calc(50%+110px)]">
              <span className="transition-all duration-500 ease-in-out group-hover:translate-x-2 group-hover:opacity-0 group-hover:scale-50">By</span>
              <div className="flex items-center gap-0 ml-0.5">
                <span className="transition-all duration-500 ease-in-out group-hover:translate-x-2 group-hover:opacity-0 group-hover:scale-50">UN</span>
                <span className="text-primary mx-0.5 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rotate-180">/</span>
                <span className="transition-all duration-500 ease-in-out group-hover:-translate-x-2 group-hover:opacity-0 group-hover:scale-50">TITLD</span>
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lg sm:text-xl md:text-2xl mb-4">
              Extract <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2 font-semibold">cinema-grade color science</span> from any reference image.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground">
              Professional LUT generation for colorists and cinematographers.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button size="lg" className="text-base px-8" data-testid="button-get-started" asChild>
              <Link href="/auth">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started — Free Forever
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8" data-testid="button-learn-more" asChild>
              <Link href="/learn-more">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Image to LUT Generator */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-lg">Image to LUT Generator</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Extract <span className="text-foreground font-medium">cinema-grade color science</span> using CIE L*a*b* and K-means clustering
                </p>
              </CardContent>
            </Card>

            {/* LUT Converter */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                  <ArrowRight className="w-7 h-7 text-chart-2" />
                </div>
                <CardTitle className="text-lg">LUT Converter</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Convert between <span className="text-foreground font-medium">.cube, .3dl, and .lut</span> formats
                </p>
              </CardContent>
            </Card>

            {/* LUT Analyzer */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-chart-3" />
                </div>
                <CardTitle className="text-lg">LUT Analyzer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Quality scoring and <span className="text-foreground font-medium">banding detection</span>
                </p>
              </CardContent>
            </Card>

            {/* LUT Optimizer */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-purple-500" />
                </div>
                <CardTitle className="text-lg">LUT Optimizer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Remove invalid points and <span className="text-foreground font-medium">optimize LUTs</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Pricing Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto space-y-12 max-w-7xl">
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
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 flex flex-col h-[480px]">
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
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 border-blue-500/20 flex flex-col h-[520px]">
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
              
              <Card className="border-primary shadow-lg shadow-primary/10 hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 flex flex-col h-[560px]">
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
              
              <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 border-yellow-500/20 opacity-90 flex flex-col h-[600px]">
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

      {/* Footer */}
      <footer className="border-t py-8 px-6 bg-background">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>CHROMA • Professional LUT tools for cinematographers and colorists</p>
        </div>
      </footer>
    </div>
  );
}
