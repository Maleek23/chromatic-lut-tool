import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { User, Crown, TrendingUp, Settings as SettingsIcon, Zap, Sun, Moon, Palette, Mail, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Footer } from "@/components/layout/Footer";

type UsageStats = {
  tier: string;
  conversionsThisMonth: number;
  totalConversions: number;
  limit: number;
  unlimited: boolean;
  payPerUse: boolean;
  pricePerUse: number;
  lastResetDate: string;
  conversionsRemaining: number;
};

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Fetch usage statistics
  const { data: usageStats, isLoading: usageLoading } = useQuery<UsageStats>({
    queryKey: ['/api/usage'],
    enabled: !!user,
  });

  // ProtectedRoute ensures user is always logged in when reaching this component
  if (!user) return null;

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'free':
        return 'from-primary/10 to-chart-2/10 border-primary/30';
      case 'creator':
        return 'from-chart-2/10 to-chart-3/10 border-chart-2/30';
      case 'pro':
        return 'from-chart-3/10 to-primary/10 border-chart-3/30';
      case 'studio':
        return 'from-primary/10 to-chart-3/10 border-primary/30';
      default:
        return 'from-primary/10 to-chart-2/10 border-primary/30';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'free':
        return 'bg-gradient-to-r from-primary to-chart-2';
      case 'creator':
        return 'bg-gradient-to-r from-chart-2 to-chart-3';
      case 'pro':
        return 'bg-gradient-to-r from-chart-3 to-primary';
      case 'studio':
        return 'bg-gradient-to-r from-primary to-chart-3';
      default:
        return 'bg-gradient-to-r from-primary to-chart-2';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'creator':
        return <TrendingUp className="w-4 h-4" />;
      case 'pro':
      case 'studio':
        return <Crown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-chart-2/10">
              <SettingsIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Account & Appearance */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Information */}
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium" data-testid="text-user-email">{user.email}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Username</p>
                      <p className="text-sm font-medium" data-testid="text-username">{user.username || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Settings */}
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium mb-0.5">Theme Mode</p>
                    <p className="text-xs text-muted-foreground">
                      Currently using <span className="capitalize font-medium">{theme}</span> mode
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleTheme}
                    className="hover-elevate shrink-0"
                    data-testid="button-theme-toggle"
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Usage Statistics
                  </CardTitle>
                  {usageStats?.unlimited && (
                    <Badge className="bg-gradient-to-r from-primary to-chart-2 text-white text-[10px] px-2 py-0.5 border-0">
                      UNLIMITED
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-xs">Monthly Image-to-LUT generation usage</CardDescription>
              </CardHeader>
              <CardContent>
                {usageLoading ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <Zap className="w-8 h-8 mx-auto mb-2 opacity-50 animate-pulse" />
                    <p className="text-xs">Loading usage data...</p>
                  </div>
                ) : usageStats ? (
                  <div className="space-y-4">
                    {!usageStats.unlimited ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">This Month</span>
                            <span className="font-bold text-lg" data-testid="text-usage-count">
                              {usageStats.conversionsThisMonth} <span className="text-muted-foreground font-normal text-sm">/ {usageStats.limit}</span>
                            </span>
                          </div>
                          <Progress 
                            value={(usageStats.conversionsThisMonth / usageStats.limit) * 100}
                            className="h-1.5"
                          />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{usageStats.conversionsRemaining} remaining</span>
                            <span>
                              Resets {new Date(usageStats.lastResetDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        {usageStats.conversionsRemaining === 0 && (
                          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                            <p className="text-xs font-medium text-destructive mb-1.5">
                              Monthly limit reached
                            </p>
                            <p className="text-xs text-muted-foreground mb-2">
                              Upgrade to Creator for unlimited generations
                            </p>
                            <Link href="/upgrade">
                              <Button size="sm" variant="destructive" className="w-full h-8 text-xs" data-testid="button-upgrade-limit">
                                Upgrade Now
                              </Button>
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-chart-2/10 text-primary text-sm font-medium">
                          <Zap className="w-3.5 h-3.5" />
                          Unlimited Generations
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">No limits on your creativity</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p className="text-xs">Unable to load usage data</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Subscription */}
          <div className="space-y-6">
            {/* Current Plan */}
            <Card className={`bg-gradient-to-br ${getTierColor(user.tier)} backdrop-blur-sm`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  {getTierIcon(user.tier)}
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Badge variant="outline" className={`${getTierBadgeColor(user.tier)} text-white border-0 text-xs px-3 py-1 uppercase tracking-wide font-semibold`} data-testid="text-user-tier">
                    {user.tier}
                  </Badge>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {user.tier === 'free' && 'Get started with core features'}
                    {user.tier === 'creator' && 'Perfect for growing colorists'}
                    {user.tier === 'pro' && 'Full professional toolkit'}
                    {user.tier === 'studio' && 'Enterprise-grade features'}
                  </p>
                </div>

                {user.tier === 'free' && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <p className="text-xs font-semibold">Upgrade Benefits:</p>
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary shrink-0 mt-0.5">✓</span>
                          <span>Unlimited generations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary shrink-0 mt-0.5">✓</span>
                          <span>Higher quality grids</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary shrink-0 mt-0.5">✓</span>
                          <span>Advanced tools (Pro)</span>
                        </li>
                      </ul>
                      <Link href="/upgrade">
                        <Button className="w-full h-9 text-xs bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90" data-testid="button-upgrade">
                          <Crown className="w-3.5 h-3.5 mr-1.5" />
                          Upgrade Plan
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </>
                )}

                {user.tier !== 'free' && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Link href="/upgrade">
                        <Button variant="outline" className="w-full h-9 text-xs hover-elevate">
                          View All Plans
                        </Button>
                      </Link>
                    </div>
                  </>
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
