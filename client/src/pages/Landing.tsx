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
  AlertCircle
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
          {/* Brand with chromatic effect */}
          <div className="space-y-3 w-full px-4">
            <div className="relative w-full flex justify-center">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight relative" style={{ maxWidth: '100%', fontSize: 'clamp(2.25rem, 10vw, 6rem)' }}>
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500/20 via-transparent to-transparent blur-sm translate-x-[-1px] sm:translate-x-[-2px] hidden md:inline">
                  CHROMATIC
                </span>
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-transparent via-transparent to-blue-500/20 blur-sm translate-x-[1px] sm:translate-x-[2px] hidden md:inline">
                  CHROMATIC
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground block">
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
          <div className="relative px-4">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                  Convert between formats and analyze LUT quality with professional-grade tools
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
                  Unlimited presets, all formats, full grid sizes, and advanced batch processing
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
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Free Tier */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="space-y-4 pb-8">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span className="text-3xl">🟩</span> Free
                  </CardTitle>
                  <CardDescription className="mt-2">Perfect for creators exploring color grading</CardDescription>
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
                    <span className="text-sm">Image → LUT generation (standard quality)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Basic LUT conversions (.cube → .3dl)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Standard grid size (17×17×17)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Banding detection (preview only)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Export in .cube format</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Community access & feedback forum</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/auth" className="w-full">
                  <Button variant="outline" size="lg" className="w-full" data-testid="button-free-plan">
                    Get Started — Free Forever
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
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <span className="text-3xl">🟨</span> Pro
                    </CardTitle>
                    <CardDescription className="mt-2">For professional colorists and creators</CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground border-0">Popular</Badge>
                </div>
                <div>
                  <span className="text-5xl font-bold">$12</span>
                  <span className="text-muted-foreground text-lg ml-2">/month</span>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">or $99/year</span>
                  </div>
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
                    <span className="text-sm">Unlimited grid sizes (17×17×17 → 65×65×65)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">All LUT format conversions (.cube ↔ .3dl ↔ .lut)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Full-quality analysis & precision exports</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Save & organize unlimited presets</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Preset library dashboard</span>
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
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/upgrade" className="w-full">
                  <Button size="lg" className="w-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90" data-testid="button-pro-plan">
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Studio Tier (Coming Soon) */}
            <Card className="hover-elevate bg-background/80 backdrop-blur-sm transition-all duration-300">
              <CardHeader className="space-y-4 pb-8">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <span className="text-3xl">🧠</span> Studio
                  </CardTitle>
                  <CardDescription className="mt-2">For agencies or YouTube colorists</CardDescription>
                </div>
                <div>
                  <span className="text-5xl font-bold">$25</span>
                  <span className="text-muted-foreground text-lg ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Custom branded LUTs</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Team preset sharing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-muted-foreground/40 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">Early access to experimental AI grading features</span>
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
