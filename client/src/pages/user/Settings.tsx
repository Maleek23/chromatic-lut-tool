import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { User, Crown, TrendingUp, Settings as SettingsIcon, Zap, Sun, Moon, Palette } from "lucide-react";
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
        return 'bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20';
      case 'creator':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/20';
      case 'pro':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-500 border-purple-500/20';
      case 'studio':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20';
      default:
        return '';
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
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account and subscription</p>
          </div>
        </div>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-lg" data-testid="text-user-email">{user.email}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <p className="text-lg" data-testid="text-username">{user.username || 'Not set'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize your visual experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Theme</label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="hover-elevate"
                  data-testid="button-theme-toggle"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="capitalize">{theme}</span>
                <span className="text-xs">mode active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Tier */}
        <Card className={getTierColor(user.tier)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getTierIcon(user.tier)}
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-2xl font-bold capitalize" data-testid="text-user-tier">
                  {user.tier}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.tier === 'free' && 'Get started with core features'}
                  {user.tier === 'creator' && 'Perfect for growing colorists'}
                  {user.tier === 'pro' && 'Full professional toolkit'}
                  {user.tier === 'studio' && 'Enterprise-grade features'}
                </p>
              </div>
              <Badge variant="outline" className={`text-lg px-4 py-2 ${getTierColor(user.tier)}`}>
                {user.tier.toUpperCase()}
              </Badge>
            </div>

            {user.tier === 'free' && (
              <>
                <Separator />
                <div className="bg-background/50 rounded-lg p-4 space-y-3">
                  <p className="font-semibold">Upgrade for more features:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span>
                      Unlimited Image-to-LUT generations
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">•</span>
                      Higher quality 33×33×33 grids (Creator)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">•</span>
                      LUT Analyzer & Optimizer tools (Pro)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">•</span>
                      Maximum quality 65×65×65 grids (Pro)
                    </li>
                  </ul>
                  <Link href="/upgrade">
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500" data-testid="button-upgrade">
                      Upgrade Plan
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Usage Statistics
            </CardTitle>
            <CardDescription>Track your monthly Image-to-LUT generation usage</CardDescription>
          </CardHeader>
          <CardContent>
            {usageLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50 animate-pulse" />
                <p>Loading usage data...</p>
              </div>
            ) : usageStats ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Image-to-LUT Generations This Month</label>
                    <span className="text-2xl font-bold" data-testid="text-usage-count">
                      {usageStats.unlimited ? (
                        <Badge variant="outline" className="text-lg px-3 py-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-500">
                          Unlimited ∞
                        </Badge>
                      ) : (
                        `${usageStats.conversionsThisMonth} / ${usageStats.limit}`
                      )}
                    </span>
                  </div>

                  {!usageStats.unlimited && (
                    <>
                      <Progress 
                        value={(usageStats.conversionsThisMonth / usageStats.limit) * 100}
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{usageStats.conversionsRemaining} generations remaining</span>
                        <span>
                          Resets {new Date(usageStats.lastResetDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {!usageStats.unlimited && usageStats.conversionsRemaining <= 2 && usageStats.conversionsRemaining > 0 && (
                  <>
                    <Separator />
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500 mb-2">
                        ⚠️ Running Low on Generations
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        You only have {usageStats.conversionsRemaining} generation{usageStats.conversionsRemaining !== 1 ? 's' : ''} left this month. 
                        Upgrade to Creator tier for unlimited generations.
                      </p>
                      <Link href="/upgrade">
                        <Button size="sm" className="w-full" data-testid="button-upgrade-usage">
                          Upgrade Now
                        </Button>
                      </Link>
                    </div>
                  </>
                )}

                {!usageStats.unlimited && usageStats.conversionsRemaining === 0 && (
                  <>
                    <Separator />
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <p className="text-sm font-medium text-red-600 dark:text-red-500 mb-2">
                        ❌ Monthly Limit Reached
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        You've used all {usageStats.limit} Image-to-LUT generations for this month. 
                        Upgrade to Creator tier for unlimited generations, or wait for your limit to reset.
                      </p>
                      <Link href="/upgrade">
                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700" data-testid="button-upgrade-limit">
                          Upgrade to Continue
                        </Button>
                      </Link>
                    </div>
                  </>
                )}

                <Separator />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">What counts towards your limit?</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Each Image-to-LUT generation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-muted-foreground">•</span>
                      LUT Converter is always unlimited (all tiers)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-muted-foreground">•</span>
                      Previews don't count towards your limit
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Unable to load usage statistics</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
