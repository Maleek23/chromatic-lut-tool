import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RefreshCw, BarChart3, Zap } from "lucide-react";
import Convert from "@/pages/Convert";
import Analyze from "@/pages/Analyze";
import Optimize from "@/pages/Optimize";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function Tools() {
  const [activeTab, setActiveTab] = useState("convert");
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

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Animated color orbs */}
        <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-chart-2/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-chart-3/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight relative">
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500/20 via-transparent to-transparent blur-sm translate-x-[-2px]">
                LUT Tools
              </span>
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-transparent via-transparent to-blue-500/20 blur-sm translate-x-[2px]">
                LUT Tools
              </span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                LUT Tools
              </span>
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between formats, analyze quality, and optimize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3 font-semibold">color grading workflows</span>
          </p>
        </div>

        {/* Tabs with gradient accents */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 gap-2 bg-muted/50 backdrop-blur-sm p-1.5 rounded-xl" data-testid="tabs-lut-tools">
              <TabsTrigger 
                value="convert" 
                data-testid="tab-convert"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-chart-2 data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Convert
              </TabsTrigger>
              <TabsTrigger 
                value="analyze" 
                data-testid="tab-analyze"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-2 data-[state=active]:to-chart-3 data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze
              </TabsTrigger>
              <TabsTrigger 
                value="optimize" 
                data-testid="tab-optimize"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-3 data-[state=active]:to-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Optimize
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
    </div>
  );
}
