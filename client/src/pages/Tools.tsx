import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Convert from "@/pages/Convert";
import Analyze from "@/pages/Analyze";
import Optimize from "@/pages/Optimize";

export default function Tools() {
  const [activeTab, setActiveTab] = useState("convert");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">LUT Tools</h1>
          <p className="text-muted-foreground">
            Convert between formats, analyze quality, and optimize your LUTs
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8" data-testid="tabs-lut-tools">
            <TabsTrigger value="convert" data-testid="tab-convert">Convert</TabsTrigger>
            <TabsTrigger value="analyze" data-testid="tab-analyze">Analyze</TabsTrigger>
            <TabsTrigger value="optimize" data-testid="tab-optimize">Optimize</TabsTrigger>
          </TabsList>

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
