import { Sparkles, AlertCircle, Infinity } from "lucide-react";
import { Link } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { User } from "@shared/schema";

interface UsageStatusProps {
  user: User;
}

export function UsageStatus({ user }: UsageStatusProps) {
  const isFree = user.tier === "free";
  const conversionsUsed = user.conversionsThisMonth || 0;
  const conversionsLimit = 3;
  const conversionsRemaining = Math.max(0, conversionsLimit - conversionsUsed);
  const usagePercentage = (conversionsUsed / conversionsLimit) * 100;
  const atMonthlyLimit = isFree && conversionsUsed >= conversionsLimit;

  // Show "Unlimited" badge for paid tiers
  if (!isFree) {
    return (
      <Alert className="max-w-4xl mx-auto" data-testid="alert-usage-unlimited">
        <Infinity className="h-4 w-4" />
        <AlertDescription>
          <span className="text-sm font-medium">
            Unlimited generations with the {user.tier === "creator" ? "Creator" : user.tier === "pro" ? "Pro" : "Studio"} plan
          </span>
        </AlertDescription>
      </Alert>
    );
  }

  // Free tier usage counter
  return (
    <Alert className="max-w-4xl mx-auto" data-testid="alert-usage-counter">
      {conversionsRemaining > 0 ? (
        <>
          <Sparkles className="h-4 w-4" />
          <AlertDescription className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {conversionsRemaining} {conversionsRemaining === 1 ? 'free generation' : 'free generations'} remaining
              </span>
              <span className="text-muted-foreground" data-testid="text-usage-count">
                {conversionsUsed}/{conversionsLimit} used
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            <Link href="/upgrade">
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs hover:bg-transparent" data-testid="button-upgrade-usage">
                Upgrade to Creator for unlimited generations
              </Button>
            </Link>
          </AlertDescription>
        </>
      ) : (
        <>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="space-y-2">
            <p className="text-sm font-medium">Free generations used</p>
            <p className="text-xs text-muted-foreground">
              You've used all {conversionsLimit} free generations. Pay $2.50 per LUT or upgrade to Creator ($7/mo) for unlimited.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" disabled data-testid="button-pay-per-use">
                Pay $2.50 (Soon)
              </Button>
              <Link href="/upgrade">
                <Button size="sm" className="w-full" data-testid="button-upgrade-limit">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              </Link>
            </div>
          </AlertDescription>
        </>
      )}
    </Alert>
  );
}
