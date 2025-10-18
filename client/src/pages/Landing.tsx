import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Crown, 
  Check, 
  ArrowRight, 
  TrendingUp, 
  FileImage, 
  Bookmark,
  ArrowUpCircle,
  AlertCircle,
  Lightbulb,
  Layers
} from "lucide-react";

interface DashboardStats {
  savedPresets: number;
}

export default function Landing() {
  const { user } = useAuth();
  
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });

  const isPro = user && (user.tier === "pro" || user.tier === "studio");
  const isStudio = user && user.tier === "studio";

  // If user is logged in, show dashboard
  if (user) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated background similar to landing */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-chart-2/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
        </div>

        <div className="container mx-auto p-6 max-w-7xl relative z-10">
          {/* Dashboard Header with gradient */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Welcome back, <span className="font-semibold text-foreground">{user.username}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                data-testid="badge-user-tier"
                variant={isPro ? "default" : "secondary"}
                className={`text-sm px-4 py-2 ${isPro ? 'bg-gradient-to-r from-primary to-chart-2 text-primary-foreground border-0' : ''}`}
              >
                {isStudio ? (
                  <><Crown className="w-4 h-4 mr-1.5" /> Studio</>
                ) : isPro ? (
                  <><Zap className="w-4 h-4 mr-1.5" /> Pro</>
                ) : (
                  "Free Tier"
                )}
              </Badge>
              {!isPro && (
                <Button 
                  data-testid="button-upgrade-header"
                  className="bg-gradient-to-r from-primary to-chart-2 hover:opacity-90"
                  asChild
                >
                  <Link href="/upgrade">
                    <ArrowUpCircle className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Free tier upgrade prompt with enhanced design */}
          {!isPro && (
            <Card className="mb-8 border-primary/30 bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-chart-2/5 animate-pulse" style={{ animationDuration: '3s' }} />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  Unlock Pro Features
                </CardTitle>
                <CardDescription className="text-base">
                  Get unlimited grid sizes, all formats, full analysis, unlimited preset saving, and priority support for just $12/month
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Button data-testid="button-upgrade-card" className="bg-gradient-to-r from-primary to-chart-2 hover:opacity-90" asChild>
                  <Link href="/upgrade">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Pro — $12/month
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Usage Stats Grid with enhanced cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* LUT Generation */}
            <Card data-testid="card-conversions" className="hover-elevate transition-all duration-300 border-primary/20 bg-gradient-to-br from-background to-primary/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-primary" />
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  LUT Generation
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-primary" data-testid="text-conversions-count">
                  {user.conversionsThisMonth || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Check className="w-3 h-3 text-primary" />
                  Unlimited for all users
                </p>
              </CardContent>
            </Card>

            {/* Format Conversion */}
            <Card data-testid="card-previews" className="hover-elevate transition-all duration-300 border-chart-2/20 bg-gradient-to-br from-background to-chart-2/5 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-2 via-chart-3 to-chart-2" />
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Format Conversions
                </CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20 group-hover:scale-110 transition-transform">
                  <FileImage className="h-4 w-4 text-chart-2" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-chart-2" data-testid="text-previews-count">
                  {user.previewsToday || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Check className="w-3 h-3 text-chart-2" />
                  Unlimited for all users
                </p>
              </CardContent>
            </Card>

            {/* Saved Presets */}
            <Card data-testid="card-presets" className={`hover-elevate transition-all duration-300 ${isPro ? 'border-chart-3/20 bg-gradient-to-br from-background to-chart-3/5' : 'border-muted-foreground/20 bg-gradient-to-br from-background to-muted/50'} backdrop-blur-sm relative overflow-hidden group`}>
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isPro ? 'from-chart-3 via-primary to-chart-3' : 'from-muted-foreground to-muted-foreground/50'}`} />
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Saved Presets
                </CardTitle>
                <div className={`p-2 rounded-lg ${isPro ? 'bg-gradient-to-br from-chart-3/20 to-primary/20' : 'bg-muted'} group-hover:scale-110 transition-transform`}>
                  <Bookmark className={`h-4 w-4 ${isPro ? 'text-chart-3' : 'text-muted-foreground'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold text-transparent bg-clip-text ${isPro ? 'bg-gradient-to-r from-foreground to-chart-3' : 'bg-gradient-to-r from-muted-foreground to-muted-foreground/50'}`} data-testid="text-presets-count">
                  {stats?.savedPresets || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  {isPro ? (
                    <>
                      <Check className="w-3 h-3 text-chart-3" />
                      Unlimited storage
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3" />
                      Pro feature only
                    </>
                  )}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions with enhanced design */}
          <Card className="backdrop-blur-sm bg-background/80 border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-base">
                Jump right into your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/generate">
                <Card className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 border-primary/30 bg-gradient-to-br from-background to-primary/5 group">
                  <CardContent className="pt-6 pb-6 flex flex-col items-start gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-chart-2/20 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">Generate LUT</div>
                      <div className="text-sm text-muted-foreground">
                        Image → LUT conversion
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/tools">
                <Card className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 border-chart-2/30 bg-gradient-to-br from-background to-chart-2/5 group">
                  <CardContent className="pt-6 pb-6 flex flex-col items-start gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-3/20 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-chart-2" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">Convert LUT</div>
                      <div className="text-sm text-muted-foreground">
                        .cube ↔ .3dl ↔ .lut conversion
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/tools">
                <Card className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 border-chart-3/30 bg-gradient-to-br from-background to-chart-3/5 group">
                  <CardContent className="pt-6 pb-6 flex flex-col items-start gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-chart-3/20 to-primary/20 group-hover:scale-110 transition-transform">
                      <FileImage className="w-6 h-6 text-chart-3" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">Analyze Quality</div>
                      <div className="text-sm text-muted-foreground">
                        Check for banding and issues
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If not logged in, show landing page
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24 md:py-32">
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
          {/* Brand with chromatic effect - Mobile First */}
          <div className="space-y-3 w-full">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground font-bold text-center px-4" 
                style={{ 
                  fontSize: 'clamp(2rem, 8.5vw, 6rem)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em'
                }}>
              CHROMA
            </h1>
            
            <div className="flex items-center justify-center gap-0 text-sm font-medium text-muted-foreground group cursor-default">
              <span className="transition-all duration-700 ease-in-out group-hover:translate-x-4 group-hover:opacity-0">by UN</span>
              <span className="text-primary mx-1 text-lg transition-all duration-700 ease-in-out group-hover:scale-150 group-hover:rotate-180">
                /
              </span>
              <span className="transition-all duration-700 ease-in-out group-hover:-translate-x-4 group-hover:opacity-0">TITLD</span>
            </div>
          </div>

          {/* Value Prop with color accent */}
          <div className="relative px-6">
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed" 
               style={{ fontSize: 'clamp(0.95rem, 4vw, 1.5rem)' }}>
              Extract <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3 font-semibold">authentic color grading</span> from any reference image. 
              Professional LUT generation for colorists and cinematographers.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button size="lg" className="text-base px-8 group relative overflow-hidden" data-testid="button-get-started-free">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started — Free Forever
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

          {/* Core Tools Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 px-4">
            <Card className="border-primary/20 hover-elevate bg-card/80 backdrop-blur-sm transition-all duration-300 group">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Image to LUT Generator</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Extract color grading from any reference image
                </p>
              </CardContent>
            </Card>

            <Card className="border-chart-2/20 hover-elevate bg-card/80 backdrop-blur-sm transition-all duration-300 group">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-chart-2/10 to-chart-3/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-chart-2/20">
                  <ArrowRight className="w-7 h-7 text-chart-2" />
                </div>
                <h3 className="font-semibold text-lg">LUT Converter</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Convert between .cube, .3dl, and .lut formats
                </p>
              </CardContent>
            </Card>

            <Card className="border-chart-3/20 hover-elevate bg-card/80 backdrop-blur-sm transition-all duration-300 group">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-chart-3/10 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-chart-3/20">
                  <TrendingUp className="w-7 h-7 text-chart-3" />
                </div>
                <h3 className="font-semibold text-lg">LUT Analyzer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Quality scoring and banding detection
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/30 hover-elevate bg-card/80 backdrop-blur-sm transition-all duration-300 group">
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/30">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">LUT Optimizer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Remove invalid points and optimize LUTs
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Features by Tool */}
          <div className="mt-20 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">What You Get at Each Tier</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              All features split by pricing tier - know exactly what you're getting
            </p>

            <div className="grid gap-8">
              {/* Image to LUT Generator */}
              <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    Image to LUT Generator
                  </CardTitle>
                  <CardDescription>Extract color grading from reference images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-3">Free</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> 17×17×17 grid only</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> .cube format only</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Basic intensity control</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Preview generation</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-blue-500">Creator</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Up to 33×33×33 grid</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> .cube format only</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Priority processing queue</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> 20-30 saved presets</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-gradient-to-r from-purple-500 to-pink-500">Pro</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> All grid sizes (→65×65×65)</li>
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> All formats (.cube/.3dl/.lut)</li>
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> 8/10/12-bit precision</li>
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> Unlimited presets</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-gradient-to-r from-yellow-500 to-orange-500">Studio</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Everything in Pro</li>
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Custom branded LUTs</li>
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Batch processing</li>
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Team sharing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* LUT Converter */}
              <Card className="border-chart-2/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-chart-2" />
                    </div>
                    LUT Converter
                  </CardTitle>
                  <CardDescription>Convert between .cube, .3dl, and .lut formats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-3">Free</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> .cube → .3dl only</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> No grid resampling</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Auto format detection</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-blue-500">Creator</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> .cube → .3dl only</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> No grid resampling</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Priority queue</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-gradient-to-r from-purple-500 to-pink-500">Pro</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> All formats (.cube/.3dl/.lut)</li>
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> Grid resampling (17/33/65)</li>
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> Precision preservation</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-gradient-to-r from-yellow-500 to-orange-500">Studio</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Everything in Pro</li>
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Batch conversion</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* LUT Analyzer */}
              <Card className="border-chart-3/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-chart-3" />
                    </div>
                    LUT Analyzer
                  </CardTitle>
                  <CardDescription>Quality scoring and banding detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-3">Free</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Banding preview only</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Basic quality score</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Format validation</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-blue-500">Creator</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Banding preview only</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Quality score</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Format validation</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-gradient-to-r from-purple-500 to-pink-500">Pro</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> Full banding analysis</li>
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> Invalid point detection</li>
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> RGB statistics (min/max/avg)</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-gradient-to-r from-yellow-500 to-orange-500">Studio</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Everything in Pro</li>
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Batch analysis</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* LUT Optimizer */}
              <Card className="border-primary/30 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    LUT Optimizer
                  </CardTitle>
                  <CardDescription>Clean and optimize LUT files</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-3">Free</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Remove invalid points</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Basic optimization</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-blue-500">Creator</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Remove invalid points</li>
                        <li className="flex items-start gap-2"><Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> Basic optimization</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-gradient-to-r from-purple-500 to-pink-500">Pro</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> Advanced optimization</li>
                        <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" /> File size reduction</li>
                      </ul>
                    </div>
                    <div>
                      <Badge className="mb-3 bg-gradient-to-r from-yellow-500 to-orange-500">Studio</Badge>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Everything in Pro</li>
                        <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /> Batch optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
      <section className="px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
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
          <div className="text-center space-y-3 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              Perfect for creators exploring color grading
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Tier */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="space-y-3 pb-6">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-green-500" />
                    </div>
                    Free
                  </CardTitle>
                  <CardDescription className="mt-2 text-xs">New users & hobbyists</CardDescription>
                </div>
                <div>
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground text-sm ml-1">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Image to LUT (17×17×17, .cube)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Converter (.cube → .3dl)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Analyzer (preview only)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Optimizer (basic)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-xs">1-3 saved presets</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/auth" className="w-full">
                  <Button variant="outline" className="w-full" data-testid="button-free-plan">
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Creator Tier */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 border-blue-500/20">
              <CardHeader className="space-y-3 pb-6">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Layers className="w-4 h-4 text-blue-500" />
                    </div>
                    Creator
                  </CardTitle>
                  <CardDescription className="mt-2 text-xs">Growing colorists</CardDescription>
                </div>
                <div>
                  <span className="text-4xl font-bold">$7</span>
                  <span className="text-muted-foreground text-sm ml-1">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Image to LUT (33×33×33, .cube)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Converter (.cube → .3dl)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Analyzer (preview only)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Optimizer (basic)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-xs">20-30 saved presets</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-xs">Priority processing queue</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/upgrade" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90" data-testid="button-creator-plan">
                    Upgrade
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Pro Tier */}
            <Card className="border-primary shadow-lg shadow-primary/10 sm:scale-105 hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3" />
              <Badge className="absolute -top-2 right-4 bg-gradient-to-r from-primary to-chart-2 text-white text-[10px] px-2 py-0.5 border-0">Most Popular</Badge>
              
              <CardHeader className="space-y-3 pb-6">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-500" />
                    </div>
                    Pro
                  </CardTitle>
                  <CardDescription className="mt-2 text-xs">Professional creators</CardDescription>
                </div>
                <div>
                  <span className="text-4xl font-bold">$12</span>
                  <span className="text-muted-foreground text-sm ml-1">/mo</span>
                  <div className="mt-1">
                    <span className="text-[10px] text-muted-foreground">or $99/year</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Image to LUT (all grids, all formats)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Converter (all formats + resampling)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Analyzer (full analysis)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Optimizer (advanced)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Unlimited presets</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/upgrade" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90" data-testid="button-pro-plan">
                    Upgrade
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Studio Tier */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300 border-yellow-500/20">
              <CardHeader className="space-y-3 pb-6">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                      <Crown className="w-4 h-4 text-yellow-500" />
                    </div>
                    Studio
                  </CardTitle>
                  <CardDescription className="mt-2 text-xs">Agencies & teams</CardDescription>
                </div>
                <div>
                  <span className="text-4xl font-bold">$25</span>
                  <span className="text-muted-foreground text-sm ml-1">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-6">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Everything in Pro</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Batch processing (all tools)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Custom branded LUTs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">Team sharing & collaboration</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Crown className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold">AI grading (coming soon)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/upgrade" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90" data-testid="button-studio-plan">
                    Upgrade
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 bg-background">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>CHROMA by UN/TITLD • Professional LUT tools for cinematographers and colorists</p>
        </div>
      </footer>
    </div>
  );
}
