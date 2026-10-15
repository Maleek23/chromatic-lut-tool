import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { Footer } from "@/components/layout/Footer";
import { 
  Crown, 
  Zap, 
  TrendingUp, 
  Upload,
  BarChart3,
  Layers,
  ArrowUpCircle,
  Sparkles,
  Repeat,
  FileText,
  Clock,
  Lock
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

  // Auth guard
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const isPro = user.tier === "pro" || user.tier === "studio";
  const isStudio = user.tier === "studio";

  return (
      <div>
        {/* Header */}
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, <span className="text-primary font-medium">{user.username}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                data-testid="badge-user-tier"
                variant={isPro ? "default" : "secondary"}
                className={`px-3 py-1 ${isPro ? 'bg-gradient-to-r from-primary to-chart-2' : ''}`}
              >
                {isStudio ? <><Crown className="w-3 h-3 mr-1" /> Studio</> : isPro ? <><Zap className="w-3 h-3 mr-1" /> Pro</> : "Free"}
              </Badge>
              {!isPro && (
                <Button size="sm" data-testid="button-upgrade-header" className="bg-gradient-to-r from-primary to-chart-2" asChild>
                  <Link href="/upgrade">
                    <ArrowUpCircle className="w-3 h-3 mr-1" />
                    Upgrade
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto p-6 max-w-4xl">
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <Card className="border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Jump into your workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* Generate New LUT */}
                  <Link href="/studio">
                    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer border-primary/30 bg-gradient-to-br from-primary/5 to-chart-2/5" data-testid="card-action-generate">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold mb-0.5">Generate New LUT</h4>
                            <p className="text-xs text-muted-foreground">Create from reference image</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Convert Format */}
                  <Link href="/convert">
                    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer border-chart-2/30 bg-gradient-to-br from-chart-2/5 to-chart-3/5" data-testid="card-action-convert">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20 flex items-center justify-center flex-shrink-0">
                            <Repeat className="w-5 h-5 text-chart-2" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold mb-0.5">Convert Format</h4>
                            <p className="text-xs text-muted-foreground">Transform existing LUTs</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Analyze Quality */}
                  <Link href={isPro ? "/analyze" : "#"} onClick={(e) => !isPro && (e.preventDefault(), navigate("/upgrade"))}>
                    <Card className={`overflow-hidden transition-all duration-300 cursor-pointer border-chart-3/30 bg-gradient-to-br from-chart-3/5 to-primary/5 ${isPro ? 'hover-elevate active-elevate-2' : 'opacity-60'}`} data-testid="card-action-analyze">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="w-5 h-5 text-chart-3" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="font-semibold">Analyze Quality</h4>
                              {!isPro && (
                                <Badge variant="secondary" className="px-1.5 py-0.5 text-[10px]">
                                  <Crown className="w-2.5 h-2.5 mr-0.5" />
                                  PRO
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">Scan for banding & issues</p>
                          </div>
                          {!isPro && <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Browse Resources */}
                  <Link href="/resources">
                    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer border-border/50 bg-background/50" data-testid="card-action-resources">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold mb-0.5">Browse Resources</h4>
                            <p className="text-xs text-muted-foreground">Guides & documentation</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                </div>
              </CardContent>
            </Card>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Recent Activity */}
              <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest work</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.conversionsThisMonth > 0 ? (
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">LUT Generated</p>
                            <p className="text-xs text-muted-foreground">This month · {user.conversionsThisMonth} {user.conversionsThisMonth === 1 ? 'generation' : 'generations'}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">No recent activity</p>
                        <p className="text-xs mt-1">Generate your first LUT to get started</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Your Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">LUTs Generated</span>
                    </div>
                    <Badge variant="secondary" data-testid="text-conversions-count">
                      {user.conversionsThisMonth || 0} / {isPro ? "∞" : "3"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-chart-2" />
                      <span className="text-sm font-medium">Conversions</span>
                    </div>
                    <Badge variant="secondary" data-testid="text-previews-count">
                      {user.previewsToday || 0}
                    </Badge>
                  </div>

                  {!isPro && (
                    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20">
                      <p className="text-sm font-medium mb-2">Unlock Pro Tools</p>
                      <p className="text-xs text-muted-foreground mb-3">65x65 grids, optimizer, unlimited LUTs</p>
                      <Button size="sm" className="w-full bg-gradient-to-r from-primary to-chart-2" asChild data-testid="button-upgrade-card">
                        <Link href="/upgrade">
                          <Zap className="w-3 h-3 mr-2" />
                          Upgrade to Pro
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
  );
}
