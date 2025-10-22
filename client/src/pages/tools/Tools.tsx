import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, BarChart3, Zap } from "lucide-react";
import Convert from "@/pages/tools/Convert";
import Analyze from "@/pages/tools/Analyze";
import Optimize from "@/pages/tools/Optimize";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { UpgradePrompt } from "@/components/shared/UpgradePrompt";
import { canUseAnalyzer, canUseOptimizer, getUpgradeMessage } from "@shared/tiers";
import type { TierType } from "@shared/tiers";
import { Footer } from "@/components/layout/Footer";

export default function Tools() {
  const [activeTab, setActiveTab] = useState("convert");
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<"analyzer" | "optimizer" | "tools">("analyzer");
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Auth guard - redirect to auth page if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Don't render until we know auth status
  if (!user) {
    return null;
  }

  const userTier = (user.tier || "free") as TierType;
  const hasAnalyzerAccess = canUseAnalyzer(userTier);
  const hasOptimizerAccess = canUseOptimizer(userTier);

  const handleTabChange = (value: string) => {
    // Check analyzer access
    if (value === "analyze" && !hasAnalyzerAccess) {
      setUpgradeFeature("analyzer");
      setShowUpgradePrompt(true);
      return;
    }

    // Check optimizer access
    if (value === "optimize" && !hasOptimizerAccess) {
      setUpgradeFeature("optimizer");
      setShowUpgradePrompt(true);
      return;
    }

    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              LUT Tools
            </span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Professional utilities for converting formats, analyzing quality, and optimizing your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3 font-medium">
              color grading workflows
            </span>
          </p>
        </div>

        {/* Upgrade Prompt Dialog */}
        <UpgradePrompt
          open={showUpgradePrompt}
          onOpenChange={setShowUpgradePrompt}
          requiredTier="pro"
          feature={upgradeFeature === "analyzer" ? "LUT Analyzer" : "LUT Optimizer"}
          message={getUpgradeMessage(upgradeFeature, userTier)}
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="inline-flex gap-1 bg-muted/50 backdrop-blur-sm p-1 rounded-lg" data-testid="tabs-lut-tools">
              <TabsTrigger 
                value="convert" 
                data-testid="tab-convert"
                className="relative px-5 py-2 rounded-md text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-chart-2 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Convert
              </TabsTrigger>
              <TabsTrigger 
                value="analyze" 
                data-testid="tab-analyze"
                className="relative px-5 py-2 rounded-md text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-2 data-[state=active]:to-chart-3 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze
                {!hasAnalyzerAccess && (
                  <Badge className="ml-2 bg-gradient-to-r from-chart-3 to-primary text-white text-[9px] px-1.5 py-0 border-0 h-4">
                    PRO
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="optimize" 
                data-testid="tab-optimize"
                className="relative px-5 py-2 rounded-md text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-3 data-[state=active]:to-primary data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Optimize
                {!hasOptimizerAccess && (
                  <Badge className="ml-2 bg-gradient-to-r from-chart-3 to-primary text-white text-[9px] px-1.5 py-0 border-0 h-4">
                    PRO
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="convert" className="mt-0">
            <Convert />
          </TabsContent>

          <TabsContent value="analyze" className="mt-0">
            <Analyze />
          </TabsContent>

          <TabsContent value="optimize" className="mt-0">
            <Optimize />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
}
