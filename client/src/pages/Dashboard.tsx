import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useLocation } from "wouter";
import { 
  Crown, 
  Zap, 
  TrendingUp, 
  FileImage, 
  Bookmark,
  ArrowUpCircle
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

  if (!user) {
    navigate("/auth");
    return null;
  }

  const isPro = user.tier === "pro" || user.tier === "studio";
  const isStudio = user.tier === "studio";
  
  // Calculate usage percentages for free tier
  const conversionsUsed = user.conversionsThisMonth || 0;
  const conversionsLimit = 50;
  const conversionsPercent = isPro ? 0 : Math.min((conversionsUsed / conversionsLimit) * 100, 100);
  
  const previewsUsed = user.previewsToday || 0;
  const previewsLimit = 3;
  const previewsPercent = isPro ? 0 : Math.min((previewsUsed / previewsLimit) * 100, 100);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, <span className="font-medium">{user.username}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            data-testid="badge-user-tier"
            variant={isPro ? "default" : "secondary"}
            className="text-sm px-3 py-1"
          >
            {isStudio ? (
              <><Crown className="w-3 h-3 mr-1" /> Studio</>
            ) : isPro ? (
              <><Zap className="w-3 h-3 mr-1" /> Pro</>
            ) : (
              "Free"
            )}
          </Badge>
          {!isPro && (
            <Button 
              data-testid="button-upgrade-header"
              asChild
            >
              <Link href="/pricing">
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Free tier upgrade prompt */}
      {!isPro && (
        <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Unlock Pro Features
            </CardTitle>
            <CardDescription>
              Get unlimited conversions, advanced export options, and access to our professional preset library
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button data-testid="button-upgrade-card" asChild>
              <Link href="/pricing">
                View Pro Plans
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Usage Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Conversions This Month */}
        <Card data-testid="card-conversions">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversions This Month
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-conversions-count">
              {isPro ? conversionsUsed : `${conversionsUsed} / ${conversionsLimit}`}
            </div>
            {!isPro && (
              <div className="mt-2">
                <Progress value={conversionsPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {conversionsLimit - conversionsUsed} conversions remaining
                </p>
              </div>
            )}
            {isPro && (
              <p className="text-xs text-muted-foreground mt-2">
                Unlimited with Pro
              </p>
            )}
          </CardContent>
        </Card>

        {/* Previews Today */}
        <Card data-testid="card-previews">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Previews Today
            </CardTitle>
            <FileImage className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-previews-count">
              {isPro ? previewsUsed : `${previewsUsed} / ${previewsLimit}`}
            </div>
            {!isPro && (
              <div className="mt-2">
                <Progress value={previewsPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {previewsLimit - previewsUsed} previews remaining
                </p>
              </div>
            )}
            {isPro && (
              <p className="text-xs text-muted-foreground mt-2">
                Unlimited with Pro
              </p>
            )}
          </CardContent>
        </Card>

        {/* Saved Presets */}
        <Card data-testid="card-presets">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Saved Presets
            </CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-presets-count">
              {stats?.savedPresets || 0}
              {!isPro && " / 3"}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {isPro ? "Unlimited storage" : "Free tier limit"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump right into your workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Button
            data-testid="button-convert"
            variant="outline"
            className="h-auto py-4 flex flex-col items-start gap-2"
            asChild
          >
            <Link href="/tools">
              <TrendingUp className="w-5 h-5" />
              <div>
                <div className="font-semibold">Convert LUT</div>
                <div className="text-xs text-muted-foreground">
                  .cube ↔ .3dl ↔ .lut conversion
                </div>
              </div>
            </Link>
          </Button>

          <Button
            data-testid="button-analyze"
            variant="outline"
            className="h-auto py-4 flex flex-col items-start gap-2"
            asChild
          >
            <Link href="/tools">
              <FileImage className="w-5 h-5" />
              <div>
                <div className="font-semibold">Analyze Quality</div>
                <div className="text-xs text-muted-foreground">
                  Check for banding and issues
                </div>
              </div>
            </Link>
          </Button>

          <Button
            data-testid="button-presets"
            variant="outline"
            className="h-auto py-4 flex flex-col items-start gap-2"
            disabled={!isPro}
            asChild={isPro}
          >
            {isPro ? (
              <Link href="/generate">
                <Bookmark className="w-5 h-5" />
                <div>
                  <div className="font-semibold">My Presets</div>
                  <div className="text-xs text-muted-foreground">
                    Browse saved LUTs
                  </div>
                </div>
              </Link>
            ) : (
              <>
                <Bookmark className="w-5 h-5" />
                <div>
                  <div className="font-semibold">My Presets</div>
                  <div className="text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">Pro</Badge>
                  </div>
                </div>
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
