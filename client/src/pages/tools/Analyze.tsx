import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, AlertCircle, AlertTriangle, Info, Sparkles, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BeforeAfterSlider } from "@/components/lut/BeforeAfterSlider";
import { LutFileUpload } from "@/components/lut/LutFileUpload";
import demoImageBefore from "@assets/stock_images/cinematic_film_scene_3b85db8f.jpg";
import demoImageAfter from "@assets/stock_images/cinematic_film_scene_1a3fcc2b.jpg";
import { Footer } from "@/components/layout/Footer";
import { CinemaBackground } from "@/components/visual/CinemaBackground";

interface QualityInfo {
  hasInvalidPoints: boolean;
  outOfRangeCount: number;
  bandingDetected: boolean;
  maxValue: number;
  minValue: number;
  avgValue: number;
}

interface AnalysisResult {
  format: string;
  size: number;
  title?: string;
  totalPoints: number;
  errors: string[];
  warnings: string[];
  quality: QualityInfo;
}

export default function Analyze() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setAnalysisResult(null);
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const response = await fetch("/api/lut/analyze", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        setAnalysisResult(result);
      } else {
        const error = await response.json();
        toast({
          title: "Analysis failed",
          description: error.error || "Failed to analyze LUT file",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "An error occurred during analysis",
        variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
  };

  const getQualityScore = (quality: QualityInfo): { score: number; label: string; variant: "default" | "secondary" | "destructive" } => {
    let score = 100;
    
    if (quality.hasInvalidPoints) score -= 30;
    if (quality.bandingDetected) score -= 20;
    if (quality.outOfRangeCount > 0) score -= Math.min(50, quality.outOfRangeCount / 10);
    
    if (score >= 80) return { score, label: "Excellent", variant: "default" };
    if (score >= 60) return { score, label: "Good", variant: "secondary" };
    return { score, label: "Issues Detected", variant: "destructive" };
  };

  return (
    <CinemaBackground variant="subtle">
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <Card className="border-chart-2/30 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20">
              <BarChart3 className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <CardTitle>Upload LUT for Analysis</CardTitle>
              <CardDescription>
                Detect banding, invalid points, and quality issues
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Upload Zone */}
          <LutFileUpload
            onFileUpload={handleFileUpload}
            isProcessing={isAnalyzing}
            uploadedFile={uploadedFile}
            acceptedFormats={[".cube", ".3dl"]}
          />
        </CardContent>
      </Card>

      {analysisResult && (
        <div data-testid="analysis-results">
          {/* File Info */}
          <Card className="border-primary/30 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>File Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Format</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2">{analysisResult.format.toUpperCase()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Grid Size</p>
                  <p className="text-2xl font-bold">
                    {analysisResult.size}×{analysisResult.size}×{analysisResult.size}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Points</p>
                  <p className="text-2xl font-bold">{analysisResult.totalPoints.toLocaleString()}</p>
                </div>
                {analysisResult.title && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Title</p>
                    <p className="text-lg font-semibold truncate">{analysisResult.title}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quality Analysis */}
          <Card className="border-chart-3/30 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-chart-3/20 to-primary/20">
                    <Sparkles className="w-5 h-5 text-chart-3" />
                  </div>
                  <CardTitle>Quality Analysis</CardTitle>
                </div>
                <Badge 
                  variant={getQualityScore(analysisResult.quality).variant}
                  className={
                    getQualityScore(analysisResult.quality).variant === "default" 
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" 
                      : ""
                  }
                >
                  {getQualityScore(analysisResult.quality).label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant={analysisResult.quality.hasInvalidPoints ? "destructive" : "default"} className="border-l-4">
                {analysisResult.quality.hasInvalidPoints ? (
                  <AlertCircle className="h-5 w-5" />
                ) : (
                  <CheckCircle className="h-5 w-5" />
                )}
                <AlertTitle className="font-semibold">Invalid Points</AlertTitle>
                <AlertDescription>
                  {analysisResult.quality.hasInvalidPoints
                    ? `Found ${analysisResult.quality.outOfRangeCount} out-of-range values`
                    : "All RGB values are within valid range [0,1]"}
                </AlertDescription>
              </Alert>

              <Alert variant={analysisResult.quality.bandingDetected ? "destructive" : "default"} className="border-l-4">
                {analysisResult.quality.bandingDetected ? (
                  <AlertTriangle className="h-5 w-5" />
                ) : (
                  <CheckCircle className="h-5 w-5" />
                )}
                <AlertTitle className="font-semibold">Banding Detection</AlertTitle>
                <AlertDescription>
                  {analysisResult.quality.bandingDetected
                    ? "Potential color banding detected (many consecutive identical values)"
                    : "No significant banding detected"}
                </AlertDescription>
              </Alert>

              <Alert className="border-l-4 border-l-primary/50">
                <Info className="h-5 w-5" />
                <AlertTitle className="font-semibold">Value Range</AlertTitle>
                <AlertDescription>
                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase">Min</p>
                      <p className="font-mono font-semibold">{analysisResult.quality.minValue.toFixed(4)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase">Max</p>
                      <p className="font-mono font-semibold">{analysisResult.quality.maxValue.toFixed(4)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase">Average</p>
                      <p className="font-mono font-semibold">{analysisResult.quality.avgValue.toFixed(4)}</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Warnings */}
          {analysisResult.warnings.length > 0 && (
            <Alert variant="default" className="border-l-4 border-l-yellow-500">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <AlertTitle className="font-semibold">Warnings</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {analysisResult.warnings.map((warning, i) => (
                    <li key={i} className="text-sm">{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Errors */}
          {analysisResult.errors.length > 0 && (
            <Alert variant="destructive" className="border-l-4">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="font-semibold">Errors</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {analysisResult.errors.map((error, i) => (
                    <li key={i} className="text-sm">{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Demo Section */}
      <Card className="border-primary/30 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>LUT Impact Visualization</CardTitle>
              <CardDescription>
                See how color grading LUTs transform your footage
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BeforeAfterSlider
            beforeImage={demoImageBefore}
            afterImage={demoImageAfter}
            beforeLabel="Original Footage"
            afterLabel="With LUT Applied"
          />
        </CardContent>
      </Card>
      </div>
      
      <Footer />
    </CinemaBackground>
  );
}
