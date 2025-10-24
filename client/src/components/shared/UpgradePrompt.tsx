import { Lock, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TierType, getTierDisplayName } from "@/lib/tier-utils";
import { Link } from "wouter";

interface UpgradePromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requiredTier: TierType;
  feature: string;
  message: string;
}

export function UpgradePrompt({
  open,
  onOpenChange,
  requiredTier,
  feature,
  message,
}: UpgradePromptProps) {
  const getTierIcon = (tier: TierType) => {
    switch (tier) {
      case "creator":
        return <Sparkles className="w-5 h-5" />;
      case "pro":
        return <Crown className="w-5 h-5" />;
      case "studio":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Lock className="w-5 h-5" />;
    }
  };

  const getTierColor = (tier: TierType): string => {
    switch (tier) {
      case "creator":
        return "text-primary";
      case "pro":
        return "text-chart-2";
      case "studio":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-upgrade-prompt">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`${getTierColor(requiredTier)}`}>
              {getTierIcon(requiredTier)}
            </div>
            <DialogTitle>Upgrade Required</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm" data-testid="badge-required-tier">
              {getTierDisplayName(requiredTier)} Required
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            Unlock this feature and more by upgrading to{" "}
            <span className="font-semibold">{getTierDisplayName(requiredTier)}</span>.
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-upgrade"
          >
            Maybe Later
          </Button>
          <Link href="/upgrade">
            <Button className="w-full sm:w-auto" data-testid="button-upgrade-now">
              Upgrade Now
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface LockedFeatureBadgeProps {
  tier: TierType;
  className?: string;
}

export function LockedFeatureBadge({ tier, className = "" }: LockedFeatureBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={`gap-1 ${className}`}
      data-testid="badge-locked-feature"
    >
      <Lock className="w-3 h-3" />
      {getTierDisplayName(tier)}
    </Badge>
  );
}
