import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { 
  Crown, 
  Zap, 
  TrendingUp, 
  FileImage, 
  Bookmark,
  ArrowUpCircle,
  AlertCircle
} from "lucide-react";

interface DashboardStats {
  savedPresets: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });

  // Auth guard - redirect to auth page if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Don't render until we know auth status
  if (!user) {
    return null;
  }

  const isPro = user.tier === "pro" || user.tier === "studio";
  const isStudio = user.tier === "studio";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cinematic animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Animated color orbs */}
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-chart-2/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-chart-3/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="container mx-auto p-6 max-w-7xl relative z-10">
        {/* Header with dramatic gradient */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <div className="relative inline-block mb-2">
              <h1 className="text-5xl font-bold tracking-tight relative">
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500/20 via-transparent to-transparent blur-sm translate-x-[-2px]">
                  Dashboard
                </span>
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-transparent via-transparent to-blue-500/20 blur-sm translate-x-[2px]">
                  Dashboard
                </span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                  Dashboard
                </span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2 font-semibold">{user.username}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge 
              data-testid="badge-user-tier"
              variant={isPro ? "default" : "secondary"}
              className={`text-sm px-4 py-2 ${isPro ? 'bg-gradient-to-r from-primary to-chart-2' : ''}`}
            >
              {isStudio ? (
                <><Crown className="w-4 h-4 mr-1" /> Studio</>
              ) : isPro ? (
                <><Zap className="w-4 h-4 mr-1" /> Pro</>
              ) : (
                "Free"
              )}
            </Badge>
            {!isPro && (
              <Button 
                data-testid="button-upgrade-header"
                className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 hover:opacity-90"
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

        {/* Free tier upgrade prompt - Cinematic style */}
        {!isPro && (
          <Card className="mb-8 border-primary/30 bg-gradient-to-br from-primary/10 via-chart-2/5 to-chart-3/10 backdrop-blur-sm overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Zap className="w-6 h-6 text-primary animate-pulse" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3">
                  Unlock Pro Features
                </span>
              </CardTitle>
              <CardDescription className="text-base">
                Get unlimited grid sizes, all formats, full analysis, unlimited preset saving, and priority support for $12/month
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button 
                data-testid="button-upgrade-card" 
                size="lg"
                className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 hover:opacity-90 transition-all duration-300"
                asChild
              >
                <Link href="/upgrade">
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to Pro
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Usage Stats Grid - Cinematic cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* LUT Generation */}
        <Card 
          data-testid="card-conversions" 
          className="border-primary/20 bg-gradient-to-br from-background to-primary/5 hover-elevate transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              LUT Generation
            </CardTitle>
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2" data-testid="text-conversions-count">
              {user.conversionsThisMonth || 0}
            </div>
            <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-chart-2 transition-all duration-500"
                style={{ width: isPro ? '100%' : `${Math.min(100, ((user.conversionsThisMonth || 0) / 3) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {isPro || user.tier === "creator" 
                ? "Unlimited generations" 
                : `${user.conversionsThisMonth || 0} / 3 this month`
              }
            </p>
          </CardContent>
        </Card>

        {/* Format Conversion */}
        <Card 
          data-testid="card-previews"
          className="border-chart-2/20 bg-gradient-to-br from-background to-chart-2/5 hover-elevate transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-chart-2/0 to-chart-2/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Format Conversions
            </CardTitle>
            <div className="p-2 rounded-lg bg-chart-2/10 group-hover:bg-chart-2/20 transition-colors">
              <FileImage className="h-4 w-4 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-chart-2 to-chart-3" data-testid="text-previews-count">
              {user.previewsToday || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Unlimited for all users
            </p>
          </CardContent>
        </Card>

        {/* Saved Presets */}
        <Card 
          data-testid="card-presets"
          className="border-chart-3/20 bg-gradient-to-br from-background to-chart-3/5 hover-elevate transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-chart-3/0 to-chart-3/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Saved Presets
            </CardTitle>
            <div className="p-2 rounded-lg bg-chart-3/10 group-hover:bg-chart-3/20 transition-colors">
              <Bookmark className="h-4 w-4 text-chart-3" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-chart-3 to-primary" data-testid="text-presets-count">
              {stats?.savedPresets || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {isPro ? "Unlimited storage" : (
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Pro feature only
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        </div>

        {/* Quick Actions - Cinematic */}
        <Card className="border-muted/50 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Quick Actions</CardTitle>
          <CardDescription className="text-base">
            Jump right into your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2">cinematic workflow</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button
            data-testid="button-convert"
            variant="outline"
            className="h-auto py-6 flex flex-col items-start gap-3 hover-elevate border-primary/20 bg-gradient-to-br from-background to-primary/5 group relative overflow-hidden"
            asChild
          >
            <Link href="/tools">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <TrendingUp className="w-6 h-6 text-primary relative z-10" />
              <div className="relative z-10">
                <div className="font-semibold text-lg">Convert LUT</div>
                <div className="text-xs text-muted-foreground">
                  .cube ↔ .3dl ↔ .lut conversion
                </div>
              </div>
            </Link>
          </Button>

          <Button
            data-testid="button-analyze"
            variant="outline"
            className="h-auto py-6 flex flex-col items-start gap-3 hover-elevate border-chart-2/20 bg-gradient-to-br from-background to-chart-2/5 group relative overflow-hidden"
            asChild
          >
            <Link href="/tools">
              <div className="absolute inset-0 bg-gradient-to-br from-chart-2/0 to-chart-2/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <FileImage className="w-6 h-6 text-chart-2 relative z-10" />
              <div className="relative z-10">
                <div className="font-semibold text-lg">Analyze Quality</div>
                <div className="text-xs text-muted-foreground">
                  Check for banding and issues
                </div>
              </div>
            </Link>
          </Button>

          <Button
            data-testid="button-presets"
            variant="outline"
            className="h-auto py-6 flex flex-col items-start gap-3 hover-elevate border-chart-3/20 bg-gradient-to-br from-background to-chart-3/5 group relative overflow-hidden"
            disabled={!isPro}
            asChild={isPro}
          >
            {isPro ? (
              <Link href="/generate">
                <div className="absolute inset-0 bg-gradient-to-br from-chart-3/0 to-chart-3/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Bookmark className="w-6 h-6 text-chart-3 relative z-10" />
                <div className="relative z-10">
                  <div className="font-semibold text-lg">My Presets</div>
                  <div className="text-xs text-muted-foreground">
                    Browse saved LUTs
                  </div>
                </div>
              </Link>
            ) : (
              <>
                <Bookmark className="w-6 h-6 text-muted-foreground" />
                <div>
                  <div className="font-semibold text-lg text-muted-foreground">My Presets</div>
                  <div className="text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">Pro Only</Badge>
                  </div>
                </div>
              </>
            )}
          </Button>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
