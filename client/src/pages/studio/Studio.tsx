import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, BarChart3, Zap, Wand2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { PageShell } from "@/components/layout/PageShell";
import { UpgradePrompt } from "@/components/shared/UpgradePrompt";
import Tool from "@/pages/tools/Tool";
import Convert from "@/pages/tools/Convert";
import Analyze from "@/pages/tools/Analyze";
import Optimize from "@/pages/tools/Optimize";
import { canUseAnalyzer, canUseOptimizer, getUpgradeMessage } from "@shared/tiers";
import type { TierType } from "@shared/tiers";

type StudioTab = "create" | "analyze" | "convert" | "optimize";

export default function Studio() {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<StudioTab>("create");
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState<"analyzer" | "optimizer" | "tools">("analyzer");

  useEffect(() => {
    // Wait for the auth query to settle before deciding, so we don't bounce.
    if (!isLoading && !user) navigate("/auth");
  }, [user, isLoading, navigate]);

  if (isLoading || !user) return null;

  const userTier = (user.tier || "free") as TierType;
  const hasAnalyzerAccess = canUseAnalyzer(userTier);
  const hasOptimizerAccess = canUseOptimizer(userTier);

  const handleTabChange = (value: string) => {
    if (value === "analyze" && !hasAnalyzerAccess) {
      setUpgradeFeature("analyzer");
      setShowUpgradePrompt(true);
      return;
    }
    if (value === "optimize" && !hasOptimizerAccess) {
      setUpgradeFeature("optimizer");
      setShowUpgradePrompt(true);
      return;
    }
    setActiveTab(value as StudioTab);
  };

  return (
    <PageShell
      icon={<Wand2 className="w-7 h-7 text-primary" />}
      title="Studio"
      subtitle={
        <>
          One workspace for the whole LUT pipeline —{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3 font-medium">
            create, analyze, convert, optimize
          </span>
          .
        </>
      }
    >
      <UpgradePrompt
        open={showUpgradePrompt}
        onOpenChange={setShowUpgradePrompt}
        requiredTier="pro"
        feature={upgradeFeature === "analyzer" ? "LUT Analyzer" : "LUT Optimizer"}
        message={getUpgradeMessage(upgradeFeature, userTier)}
      />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="inline-flex gap-1 bg-muted/50 backdrop-blur-sm p-1 rounded-lg" data-testid="tabs-studio">
            <TabsTrigger
              value="create"
              data-testid="tab-create"
              className="px-5 py-2 rounded-md text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-chart-2 data-[state=active]:text-white"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Create
            </TabsTrigger>
            <TabsTrigger
              value="analyze"
              data-testid="tab-analyze"
              className="px-5 py-2 rounded-md text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-2 data-[state=active]:to-chart-3 data-[state=active]:text-white"
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
              value="convert"
              data-testid="tab-convert"
              className="px-5 py-2 rounded-md text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-chart-2 data-[state=active]:text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Convert
            </TabsTrigger>
            <TabsTrigger
              value="optimize"
              data-testid="tab-optimize"
              className="px-5 py-2 rounded-md text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-3 data-[state=active]:to-primary data-[state=active]:text-white"
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

        <TabsContent value="create" className="mt-0">
          <Tool embedded />
        </TabsContent>
        <TabsContent value="analyze" className="mt-0">
          <Analyze />
        </TabsContent>
        <TabsContent value="convert" className="mt-0">
          <Convert />
        </TabsContent>
        <TabsContent value="optimize" className="mt-0">
          <Optimize />
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
