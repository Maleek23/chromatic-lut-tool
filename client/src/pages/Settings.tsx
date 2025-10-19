import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { User, Crown, TrendingUp, Settings as SettingsIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const { user } = useAuth();

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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
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

        {/* Usage Statistics (Coming Soon) */}
        <Card className="opacity-60">
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>Track your monthly usage and limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Usage tracking coming soon</p>
              <p className="text-sm mt-2">
                Monitor your Image-to-LUT generations and tool usage
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
