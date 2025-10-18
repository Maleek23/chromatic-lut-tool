import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown, Film, Lightbulb } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-chart-2/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Upgrade to Pro
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock unlimited grid sizes, all formats, full analysis, and preset saving for professional workflows
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier - Current */}
          <Card className="relative border-muted/50 bg-card/80 backdrop-blur-sm" data-testid="card-tier-free">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-green-500" />
                  </div>
                  Free
                </CardTitle>
                <Badge variant="outline" data-testid="badge-current-tier">Current Plan</Badge>
              </div>
              <CardDescription className="text-3xl font-bold">
                $0<span className="text-base font-normal text-muted-foreground">/forever</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">
                Perfect for creators exploring color grading
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2" data-testid="feature-free-generation">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Image → LUT generation (standard quality)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-free-conversion">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Basic conversions (.cube → .3dl)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-free-gridsizes">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Standard grid size (17×17×17)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-free-analysis">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Banding detection (preview only)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-free-formats">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Export in .cube format</span>
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
          <Card className="relative border-primary shadow-lg shadow-primary/10 bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur-sm" data-testid="card-tier-pro">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground border-0" data-testid="badge-recommended">
                <Sparkles className="w-3 h-3 mr-1" />
                Recommended
              </Badge>
            </div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-3" />
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  Pro
                </CardTitle>
              </div>
              <CardDescription className="text-3xl font-bold">
                $12<span className="text-base font-normal text-muted-foreground">/month</span>
              </CardDescription>
              <p className="text-sm text-muted-foreground pt-1">or $99/year (save $45)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">
                Everything in Free, plus:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2" data-testid="feature-pro-gridsizes">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Unlimited grid sizes (17×17×17 → 65×65×65)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-pro-formats">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">All format conversions (.cube ↔ .3dl ↔ .lut)</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-pro-analysis">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Full-quality analysis & precision exports</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-pro-presets">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Save & organize unlimited presets</span>
                </li>
                <li className="flex items-start gap-2" data-testid="feature-pro-library">
                  <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">Preset library dashboard</span>
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
                  <span className="text-sm font-semibold">Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90" 
                size="lg"
                onClick={handleUpgrade}
                disabled={isLoading}
                data-testid="button-subscribe-pro"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Subscribe to Pro
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Studio Add-on Teaser */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="border-muted/50 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🧠</span>
                <CardTitle className="text-xl">Studio Add-on</CardTitle>
                <Badge variant="outline" className="ml-auto">Coming Soon</Badge>
              </div>
              <CardDescription className="text-lg font-semibold">
                $25/month for agencies or YouTube colorists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 shrink-0" />
                  Custom branded LUTs
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 shrink-0" />
                  Team preset sharing
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 shrink-0" />
                  Early access to experimental AI grading features
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Why Upgrade Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Why Upgrade?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-muted/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <Sparkles className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Full Professional Power</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access all grid sizes (up to 65×65×65) and every LUT format for maximum quality and compatibility
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <Zap className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Build Your Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Save unlimited presets and organize them by project, style, or client for instant access
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/50 bg-card/80 backdrop-blur-sm">
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
