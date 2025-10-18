import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Redirect } from "wouter";

export default function Upgrade() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <Redirect to="/auth" />;
  }

  if (user.tier === "pro" || user.tier === "studio") {
    return <Redirect to="/dashboard" />;
  }

  const handleUpgrade = async () => {
    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/create-checkout-session");
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Upgrade error:", error);
      toast({
        title: "Upgrade Failed",
        description: error.message || "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Upgrade to <span className="text-primary">Pro</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock unlimited preset saving and advanced features for professional color grading workflows
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier - Current */}
          <Card className="relative" data-testid="card-tier-free">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl">Free</CardTitle>
                <Badge variant="outline" data-testid="badge-current-tier">Current Plan</Badge>
              </div>
              <CardDescription className="text-3xl font-bold">
                $0<span className="text-base font-normal text-muted-foreground">/forever</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">
                Full-featured, forever free
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2" data-testid="feature-free-generation">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited image to LUT generation</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-free-conversion">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">LUT format conversion (.cube ↔ .3dl ↔ .lut)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-free-analysis">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Quality analysis & banding detection</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-free-gridsizes">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">All grid sizes (17³, 33³, 65³)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-free-formats">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">All export formats & precision options</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                <Film className="w-4 h-4 mr-2" />
                Your Current Plan
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Tier - Upgrade Option */}
          <Card className="relative border-primary shadow-lg shadow-primary/10" data-testid="card-tier-pro">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-primary text-primary-foreground" data-testid="badge-recommended">
                <Sparkles className="w-3 h-3 mr-1" />
                Recommended
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Crown className="w-6 h-6 text-primary" />
                  Pro
                </CardTitle>
              </div>
              <CardDescription className="text-3xl font-bold">
                $15<span className="text-base font-normal text-muted-foreground">/month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">
                Everything in Free, plus:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2" data-testid="feature-pro-presets">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Save & organize unlimited presets</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-pro-library">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Access preset library dashboard</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-pro-lightroom">
                  <Check className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Lightroom-style presets (coming soon)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-pro-batch">
                  <Check className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">Batch processing (coming soon)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-pro-support">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Priority email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleUpgrade}
                disabled={isLoading}
                data-testid="button-upgrade-to-pro"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Why Upgrade?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Sparkles className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Build Your Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Save unlimited LUTs and organize them by project, style, or client for instant access
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Work Faster</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reuse your favorite color grades across projects without regenerating from scratch
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Crown className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Priority Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get fast email support for technical questions and workflow optimization
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Secure payment powered by Stripe • Cancel anytime • No hidden fees</p>
        </div>
      </div>
    </div>
  );
}
