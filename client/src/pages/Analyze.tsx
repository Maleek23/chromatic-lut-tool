import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import demoImageBefore from "@assets/stock_images/cinematic_film_scene_3b85db8f.jpg";
import demoImageAfter from "@assets/stock_images/cinematic_film_scene_1a3fcc2b.jpg";

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Analyze LUTs</h1>
          <p className="text-muted-foreground">
            Detect banding, invalid points, and quality issues in your LUT files
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload LUT for Analysis</CardTitle>
              <CardDescription>
                Upload a .cube or .3dl file to analyze its quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-12 text-center hover-elevate">
                <input
                  type="file"
                  accept=".cube,.3dl"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="lut-analyze-upload"
                  data-testid="input-analyze-file"
                />
                <label htmlFor="lut-analyze-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  {uploadedFile ? (
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                      {isAnalyzing && (
                        <p className="text-sm text-muted-foreground mt-2">Analyzing...</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium">Drop LUT file or click to browse</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supports .cube and .3dl formats
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {analysisResult && (
            <>
              {/* File Info */}
              <Card>
                <CardHeader>
                  <CardTitle>File Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Format</p>
                      <p className="font-medium">{analysisResult.format.toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Grid Size</p>
                      <p className="font-medium">
                        {analysisResult.size}x{analysisResult.size}x{analysisResult.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Points</p>
                      <p className="font-medium">{analysisResult.totalPoints.toLocaleString()}</p>
                    </div>
                    {analysisResult.title && (
                      <div>
                        <p className="text-sm text-muted-foreground">Title</p>
                        <p className="font-medium">{analysisResult.title}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quality Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Quality Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Quality</span>
                    <Badge variant={getQualityScore(analysisResult.quality).variant}>
                      {getQualityScore(analysisResult.quality).label}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <Alert variant={analysisResult.quality.hasInvalidPoints ? "destructive" : "default"}>
                      {analysisResult.quality.hasInvalidPoints ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>Invalid Points</AlertTitle>
                      <AlertDescription>
                        {analysisResult.quality.hasInvalidPoints
                          ? `Found ${analysisResult.quality.outOfRangeCount} out-of-range values`
                          : "All RGB values are within valid range [0,1]"}
                      </AlertDescription>
                    </Alert>

                    <Alert variant={analysisResult.quality.bandingDetected ? "destructive" : "default"}>
                      {analysisResult.quality.bandingDetected ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>Banding Detection</AlertTitle>
                      <AlertDescription>
                        {analysisResult.quality.bandingDetected
                          ? "Potential color banding detected (many consecutive identical values)"
                          : "No significant banding detected"}
                      </AlertDescription>
                    </Alert>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Value Range</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 space-y-1 text-sm">
                          <div>Min: {analysisResult.quality.minValue.toFixed(4)}</div>
                          <div>Max: {analysisResult.quality.maxValue.toFixed(4)}</div>
                          <div>Average: {analysisResult.quality.avgValue.toFixed(4)}</div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              {/* Warnings */}
              {analysisResult.warnings.length > 0 && (
                <Alert variant="default">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warnings</AlertTitle>
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
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Errors</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {analysisResult.errors.map((error, i) => (
                        <li key={i} className="text-sm">{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          {/* Demo Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>LUT Impact Visualization</CardTitle>
              <CardDescription>
                See how color grading LUTs transform your footage
              </CardDescription>
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
      </div>
    </div>
  );
}
