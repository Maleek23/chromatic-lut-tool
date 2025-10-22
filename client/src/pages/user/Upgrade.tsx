import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Sparkles, Zap, Crown, Film, Lightbulb, Layers, Shield, Lock, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Redirect } from "wouter";
import { TIER_CONFIG, TierType } from "@/lib/tier-utils";

export default function Upgrade() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<TierType | null>(null);

  if (!user) {
    return <Redirect to="/auth" />;
  }

  const currentTier = (user.tier as TierType) || "free";

  const handleUpgrade = async (tier: TierType) => {
    if (tier === "free") return;

    try {
      setIsLoading(tier);
      const response = await apiRequest("POST", "/api/create-checkout-session", { tier });
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
      setIsLoading(null);
    }
  };

  const getTierIcon = (tier: TierType) => {
    switch (tier) {
      case "free":
        return <Lightbulb className="w-4 h-4" />;
      case "creator":
        return <Layers className="w-4 h-4" />;
      case "pro":
        return <Zap className="w-4 h-4" />;
      case "studio":
        return <Crown className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: TierType) => {
    switch (tier) {
      case "free":
        return "from-green-500/20 to-emerald-500/20 text-green-500";
      case "creator":
        return "from-blue-500/20 to-cyan-500/20 text-blue-500";
      case "pro":
        return "from-purple-500/20 to-pink-500/20 text-purple-500";
      case "studio":
        return "from-yellow-500/20 to-orange-500/20 text-yellow-500";
    }
  };

  return (
      <div className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Choose Your Plan
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional color grading tools for every creator, from hobbyists to agencies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {/* Free Tier */}
          <Card 
            className={`relative border-muted/50 bg-card/80 backdrop-blur-sm flex flex-col h-full ${currentTier === "free" ? "ring-2 ring-primary" : ""}`}
            data-testid="card-tier-free"
          >
            {currentTier === "free" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" data-testid="badge-current-tier-free">Current Plan</Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getTierColor("free")} flex items-center justify-center`}>
                  {getTierIcon("free")}
                </div>
                <CardTitle className="text-xl">Free</CardTitle>
              </div>
              <CardDescription className="text-2xl md:text-3xl font-bold">
                $0<span className="text-sm font-normal text-muted-foreground">/forever</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              <p className="text-xs text-muted-foreground font-medium mb-3">
                For new users & hobbyists
              </p>
              <ul className="space-y-2 text-sm">
                {TIER_CONFIG.free.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">No batch or AI tools</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button variant="outline" className="w-full" disabled>
                <Film className="w-4 h-4 mr-2" />
                {currentTier === "free" ? "Current Plan" : "Downgrade"}
              </Button>
            </CardFooter>
          </Card>

          {/* Creator Tier */}
          <Card 
            className={`relative border-blue-500/30 bg-gradient-to-br from-card/80 to-blue-500/5 backdrop-blur-sm flex flex-col h-full ${currentTier === "creator" ? "ring-2 ring-blue-500" : ""}`}
            data-testid="card-tier-creator"
          >
            {currentTier === "creator" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" data-testid="badge-current-tier-creator">Current Plan</Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getTierColor("creator")} flex items-center justify-center`}>
                  {getTierIcon("creator")}
                </div>
                <CardTitle className="text-xl">Creator</CardTitle>
              </div>
              <CardDescription className="text-2xl md:text-3xl font-bold">
                $7<span className="text-sm font-normal text-muted-foreground">/month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              <p className="text-xs text-muted-foreground font-medium mb-3">
                For growing colorists
              </p>
              <ul className="space-y-2 text-sm">
                {TIER_CONFIG.creator.features.map((feature, i) => {
                  const isComingSoon = feature.includes("(coming soon)");
                  const featureText = feature.replace(" (coming soon)", "");
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className="font-medium flex-1">
                        {featureText}
                        {isComingSoon && (
                          <Badge variant="outline" className="ml-2 text-xs py-0 px-1.5 h-5">
                            Coming Soon
                          </Badge>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90"
                onClick={() => handleUpgrade("creator")}
                disabled={isLoading !== null || currentTier === "creator"}
                data-testid="button-subscribe-creator"
              >
                {isLoading === "creator" ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Processing...
                  </>
                ) : currentTier === "creator" ? (
                  "Current Plan"
                ) : (
                  <>
                    <Layers className="w-4 h-4 mr-2" />
                    {currentTier === "free" ? "Upgrade" : "Switch Plan"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Tier */}
          <Card 
            className={`relative border-purple-500/30 shadow-lg shadow-purple-500/10 bg-gradient-to-br from-card/80 to-purple-500/5 backdrop-blur-sm flex flex-col h-full ${currentTier === "pro" ? "ring-2 ring-purple-500" : ""}`}
            data-testid="card-tier-pro"
          >
            {currentTier !== "pro" && currentTier !== "studio" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0" data-testid="badge-recommended">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}
            {currentTier === "pro" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" data-testid="badge-current-tier-pro">Current Plan</Badge>
              </div>
            )}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getTierColor("pro")} flex items-center justify-center`}>
                  {getTierIcon("pro")}
                </div>
                <CardTitle className="text-xl">Pro</CardTitle>
              </div>
              <CardDescription className="text-2xl md:text-3xl font-bold">
                $12<span className="text-sm font-normal text-muted-foreground">/month</span>
              </CardDescription>
              <p className="text-xs text-muted-foreground pt-1">or $99/year (save $45)</p>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              <p className="text-xs text-muted-foreground font-medium mb-3">
                For professional creators
              </p>
              <ul className="space-y-2 text-sm">
                {TIER_CONFIG.pro.features.map((feature, i) => {
                  const isComingSoon = feature.includes("(coming soon)");
                  const featureText = feature.replace(" (coming soon)", "");
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span className="font-semibold flex-1">
                        {featureText}
                        {isComingSoon && (
                          <Badge variant="outline" className="ml-2 text-xs py-0 px-1.5 h-5">
                            Coming Soon
                          </Badge>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                onClick={() => handleUpgrade("pro")}
                disabled={isLoading !== null || currentTier === "pro"}
                data-testid="button-subscribe-pro"
              >
                {isLoading === "pro" ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Processing...
                  </>
                ) : currentTier === "pro" ? (
                  "Current Plan"
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    {currentTier === "free" || currentTier === "creator" ? "Upgrade" : "Switch Plan"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Studio Tier */}
          <Card 
            className={`relative border-yellow-500/30 bg-gradient-to-br from-card/80 to-yellow-500/5 backdrop-blur-sm flex flex-col h-full ${currentTier === "studio" ? "ring-2 ring-yellow-500" : ""}`}
            data-testid="card-tier-studio"
          >
            {currentTier === "studio" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" data-testid="badge-current-tier-studio">Current Plan</Badge>
              </div>
            )}
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getTierColor("studio")} flex items-center justify-center`}>
                  {getTierIcon("studio")}
                </div>
                <CardTitle className="text-xl">Studio</CardTitle>
              </div>
              <CardDescription className="text-2xl md:text-3xl font-bold">
                $25<span className="text-sm font-normal text-muted-foreground">/month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              <p className="text-xs text-muted-foreground font-medium mb-3">
                For agencies & teams
              </p>
              <ul className="space-y-2 text-sm">
                {TIER_CONFIG.studio.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Crown className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <span className="font-semibold">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90"
                onClick={() => handleUpgrade("studio")}
                disabled={isLoading !== null || currentTier === "studio"}
                data-testid="button-subscribe-studio"
              >
                {isLoading === "studio" ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Processing...
                  </>
                ) : currentTier === "studio" ? (
                  "Current Plan"
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade to Studio
                  </>
                )}
              </Button>
            </CardFooter>
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
                <CardTitle className="text-lg">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share presets with your team, create custom branded LUTs, and access AI-powered grading
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Trust Indicators */}
        <Card className="mt-16 max-w-3xl mx-auto border-primary/20 bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-xl">Secure & Trusted Payment</CardTitle>
            <CardDescription>Your payment information is always protected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <h4 className="font-semibold text-sm">Stripe Payments</h4>
                <p className="text-xs text-muted-foreground">
                  Industry-leading payment security. We never store your card details.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Lock className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <h4 className="font-semibold text-sm">256-bit SSL</h4>
                <p className="text-xs text-muted-foreground">
                  All connections encrypted with bank-level security.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Shield className="w-5 h-5 text-purple-500" />
                  </div>
                </div>
                <h4 className="font-semibold text-sm">Privacy First</h4>
                <p className="text-xs text-muted-foreground">
                  Your images are processed in-memory and deleted immediately.
                </p>
              </div>
            </div>
            <div className="mt-6 text-center text-xs text-muted-foreground space-y-1">
              <p>Cancel anytime • No hidden fees • Instant access</p>
              <p className="text-primary font-medium">
                Protected by <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Stripe</a> payment processing
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
  );
}
