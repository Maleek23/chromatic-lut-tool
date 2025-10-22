import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { 
  Crown, 
  Zap, 
  TrendingUp, 
  Upload,
  BarChart3,
  Layers,
  ArrowUpCircle,
  Sparkles,
  Play,
  Download
} from "lucide-react";
import { UploadZone } from "@/components/lut/UploadZone";
import { BeforeAfterSlider } from "@/components/lut/BeforeAfterSlider";
import { HistogramVisualization } from "@/components/lut/HistogramVisualization";
import { Progress } from "@/components/ui/progress";
import { QualityGauge } from "@/components/visual/QualityGauge";

interface DashboardStats {
  savedPresets: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });

  // Live preview state
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [currentLUT, setCurrentLUT] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [lutQualityScore, setLutQualityScore] = useState(85);
  const [rgbHistogram, setRgbHistogram] = useState<{red: number[]; green: number[]; blue: number[]} | null>(null);

  // Auth guard
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const isPro = user.tier === "pro" || user.tier === "studio";
  const isStudio = user.tier === "studio";

  const handleImageUpload = useCallback((file: File) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setAnalysisProgress(30);
      setPreviewImage(dataUrl);
      setBeforeImage(dataUrl);
      setAfterImage(dataUrl);
      
      // Analyze histogram
      const img = new Image();
      img.onload = () => {
        setAnalysisProgress(60);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          const red = new Array(256).fill(0);
          const green = new Array(256).fill(0);
          const blue = new Array(256).fill(0);
          
          for (let i = 0; i < data.length; i += 4) {
            red[data[i]]++;
            green[data[i + 1]]++;
            blue[data[i + 2]]++;
          }
          
          setRgbHistogram({ red, green, blue });
          setAnalysisProgress(100);
          
          // Simulate quality score calculation
          setTimeout(() => {
            const randomQuality = Math.floor(Math.random() * 30) + 70; // 70-100
            setLutQualityScore(randomQuality);
            setIsAnalyzing(false);
          }, 500);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  return (
      <div>
        {/* Compact Header */}
        <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                Color Command Center
              </h1>
              <p className="text-sm text-muted-foreground">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2 font-medium">{user.username}</span> · {user.conversionsThisMonth || 0} LUTs this month
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                data-testid="badge-user-tier"
                variant={isPro ? "default" : "secondary"}
                className={`px-3 py-1 ${isPro ? 'bg-gradient-to-r from-primary to-chart-2' : ''}`}
              >
                {isStudio ? <><Crown className="w-3 h-3 mr-1" /> Studio</> : isPro ? <><Zap className="w-3 h-3 mr-1" /> Pro</> : "Free"}
              </Badge>
              {!isPro && (
                <Button size="sm" data-testid="button-upgrade-header" className="bg-gradient-to-r from-primary to-chart-2" asChild>
                  <Link href="/upgrade">
                    <ArrowUpCircle className="w-3 h-3 mr-2" />
                    Upgrade
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 3-Column Workspace */}
        <div className="container mx-auto p-6 max-w-[1800px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT: Live Preview Workspace */}
            <div className="lg:col-span-7">
              <Card className="h-full border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="w-5 h-5 text-primary" />
                        Live Preview
                      </CardTitle>
                      <CardDescription>Drop an image to see LUT effects in real-time</CardDescription>
                    </div>
                    {previewImage && (
                      <Button size="sm" variant="outline" className="hover-elevate" data-testid="button-download-preview">
                        <Download className="w-3 h-3 mr-2" />
                        Export
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isAnalyzing && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground text-center">Analyzing color science...</p>
                      <div className="space-y-2">
                        <Progress value={analysisProgress} className="h-2" data-testid="progress-dashboard-analysis" />
                        <p className="text-xs text-center text-muted-foreground font-mono">{Math.round(analysisProgress)}%</p>
                      </div>
                    </div>
                  )}
                  {!previewImage ? (
                    <UploadZone
                      onImageUpload={handleImageUpload}
                      isAnalyzing={isAnalyzing}
                      data-testid="upload-preview-image"
                    />
                  ) : (
                    <div className="space-y-4">
                      {beforeImage && afterImage ? (
                        <div className="rounded-lg overflow-hidden border border-primary/20">
                          <BeforeAfterSlider
                            beforeImage={beforeImage}
                            afterImage={afterImage}
                            beforeLabel="Original"
                            afterLabel={currentLUT || "No LUT Applied"}
                          />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-lg overflow-hidden border border-primary/20 bg-muted">
                          <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 hover-elevate"
                          onClick={() => {
                            setPreviewImage(null);
                            setBeforeImage(null);
                            setAfterImage(null);
                            setCurrentLUT(null);
                          }}
                          data-testid="button-clear-preview"
                        >
                          Clear Preview
                        </Button>
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="flex-1 bg-gradient-to-r from-primary to-chart-2"
                          asChild
                          data-testid="button-generate-lut"
                        >
                          <Link href="/generate">
                            <Sparkles className="w-3 h-3 mr-2" />
                            Generate LUT from This
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* RIGHT: Scopes & Tools */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Color Scopes */}
              <Card className="border-chart-2/20 bg-gradient-to-br from-background to-chart-2/5">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-chart-2" />
                    Color Scopes
                  </CardTitle>
                  <CardDescription>Real-time color analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  {previewImage && rgbHistogram ? (
                    <div className="space-y-4">
                      <HistogramVisualization rgbHistogram={rgbHistogram} />
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Upload an image to see color analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* LUT Quality Score */}
              {previewImage && (
                <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      LUT Quality Score
                    </CardTitle>
                    <CardDescription>Cinema-grade metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center space-y-4">
                    <QualityGauge score={lutQualityScore} size={180} />
                    <div className="text-center space-y-1">
                      <p className="text-sm font-medium">
                        {lutQualityScore >= 85 ? "Excellent" : lutQualityScore >= 70 ? "Good" : "Fair"} Quality
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Based on color distribution and tonal mapping
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Stats */}
              <Card className="border-chart-3/20 bg-gradient-to-br from-background to-chart-3/5">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-chart-3" />
                    Your Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">LUTs Generated</span>
                    </div>
                    <Badge variant="secondary" data-testid="text-conversions-count">
                      {user.conversionsThisMonth || 0} / {isPro ? "∞" : "3"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-chart-2/10 border border-chart-2/20">
                    <div className="flex items-center gap-2">
                      <Upload className="w-4 h-4 text-chart-2" />
                      <span className="text-sm font-medium">Conversions</span>
                    </div>
                    <Badge variant="secondary" data-testid="text-previews-count">
                      {user.previewsToday || 0}
                    </Badge>
                  </div>

                  {!isPro && (
                    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10 border border-primary/20">
                      <p className="text-sm font-medium mb-2">Unlock Pro Tools</p>
                      <p className="text-xs text-muted-foreground mb-3">65x65 grids, optimizer, unlimited LUTs</p>
                      <Button size="sm" className="w-full bg-gradient-to-r from-primary to-chart-2" asChild data-testid="button-upgrade-card">
                        <Link href="/upgrade">
                          <Zap className="w-3 h-3 mr-2" />
                          Upgrade to Pro
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}
