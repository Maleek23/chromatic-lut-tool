import { useEffect, useState } from "react";
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
  AlertCircle,
  Sparkles,
  Activity,
  Clock
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

  // Animated counter effect
  const [displayConversions, setDisplayConversions] = useState(0);
  const [displayPreviews, setDisplayPreviews] = useState(0);

  useEffect(() => {
    const conversionsTarget = user.conversionsThisMonth || 0;
    const previewsTarget = user.previewsToday || 0;
    
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setDisplayConversions(Math.floor(conversionsTarget * easeOut));
      setDisplayPreviews(Math.floor(previewsTarget * easeOut));
      
      if (currentStep >= steps) {
        setDisplayConversions(conversionsTarget);
        setDisplayPreviews(previewsTarget);
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [user.conversionsThisMonth, user.previewsToday]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cinematic animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Animated color orbs - more dramatic */}
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-chart-2/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-primary/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] bg-chart-3/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
        
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
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2 tabular-nums" data-testid="text-conversions-count">
              {displayConversions}
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
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-chart-2 to-chart-3 tabular-nums" data-testid="text-previews-count">
              {displayPreviews}
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
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-chart-3 to-primary tabular-nums" data-testid="text-presets-count">
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

        {/* Tier Benefits - What You Can Do */}
        <Card className="border-muted/50 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-chart-3 via-primary to-chart-2" />
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              {isStudio ? (
                <><Crown className="w-6 h-6 text-amber-500" /> Studio Tier Benefits</>
              ) : isPro ? (
                <><Zap className="w-6 h-6 text-primary" /> Pro Tier Benefits</>
              ) : (
                <><Sparkles className="w-6 h-6 text-muted-foreground" /> Free Tier</>
              )}
            </CardTitle>
            <CardDescription className="text-base">
              {isPro ? "Everything unlocked" : "Your current capabilities"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
                <div className="p-1.5 rounded-md bg-primary/20">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Image to LUT</p>
                  <p className="text-xs text-muted-foreground">
                    {isPro ? "Unlimited generations" : "3 per month"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-chart-2/10 to-transparent border border-chart-2/20">
                <div className="p-1.5 rounded-md bg-chart-2/20">
                  <FileImage className="w-4 h-4 text-chart-2" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Grid Sizes</p>
                  <p className="text-xs text-muted-foreground">
                    {isPro ? "17×17×17, 33×33×33, 65×65×65" : "17×17×17 only"}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-3 rounded-lg ${isPro ? 'bg-gradient-to-r from-chart-3/10 to-transparent border border-chart-3/20' : 'bg-muted/50 border border-muted'}`}>
                <div className={`p-1.5 rounded-md ${isPro ? 'bg-chart-3/20' : 'bg-muted'}`}>
                  <Bookmark className={`w-4 h-4 ${isPro ? 'text-chart-3' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${!isPro && 'text-muted-foreground'}`}>Preset Saving</p>
                  <p className="text-xs text-muted-foreground">
                    {isPro ? "Unlimited storage" : "Pro feature"}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-3 rounded-lg ${isPro ? 'bg-gradient-to-r from-primary/10 to-transparent border border-primary/20' : 'bg-muted/50 border border-muted'}`}>
                <div className={`p-1.5 rounded-md ${isPro ? 'bg-primary/20' : 'bg-muted'}`}>
                  <Zap className={`w-4 h-4 ${isPro ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${!isPro && 'text-muted-foreground'}`}>LUT Optimizer</p>
                  <p className="text-xs text-muted-foreground">
                    {isPro ? "Fix banding & artifacts" : "Pro feature"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity - Cinematic Timeline */}
        <Card className="mt-8 border-muted/50 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Activity className="w-6 h-6 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-base">
              Your latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2">color grading</span> workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.conversionsThisMonth > 0 || user.previewsToday > 0 ? (
              <div className="space-y-3">
                {user.conversionsThisMonth > 0 && (
                  <div className="flex items-start gap-4 group p-3 rounded-lg hover-elevate border border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Generated {user.conversionsThisMonth} LUT{user.conversionsThisMonth > 1 ? 's' : ''}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        This month
                      </p>
                    </div>
                  </div>
                )}
                {user.previewsToday > 0 && (
                  <div className="flex items-start gap-4 group p-3 rounded-lg hover-elevate border border-chart-2/10 bg-gradient-to-r from-chart-2/5 to-transparent">
                    <div className="p-2 rounded-lg bg-chart-2/20 group-hover:bg-chart-2/30 transition-colors">
                      <TrendingUp className="w-4 h-4 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Converted {user.previewsToday} format{user.previewsToday > 1 ? 's' : ''}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Today
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                  <Activity className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">No activity yet</p>
                <Button asChild variant="outline" className="hover-elevate">
                  <Link href="/generate">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Your First LUT
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
