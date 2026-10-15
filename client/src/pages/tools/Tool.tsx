import { useState, useEffect } from "react";
import { UploadZone } from "@/components/lut/UploadZone";
import { AnalysisProgress } from "@/components/lut/AnalysisProgress";
import { PreviewGallery } from "@/components/lut/PreviewGallery";
import { ColorStatistics } from "@/components/lut/ColorStatistics";
import { HistogramVisualization } from "@/components/lut/HistogramVisualization";
import { LutControls } from "@/components/lut/LutControls";
import { DownloadSection } from "@/components/lut/DownloadSection";
import { EditorWorkflowCard } from "@/components/workflows/EditorWorkflowCard";
import { UsageStatus } from "@/components/shared/UsageStatus";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import type { LutAnalysis, LutResponse } from "@shared/schema";
import { getUserTier, isGridSizeAllowed, isFormatAllowed } from "@/lib/tier-utils";
import { queryClient } from "@/lib/queryClient";
import { Footer } from "@/components/layout/Footer";

export default function Tool({ embedded = false }: { embedded?: boolean } = {}) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<LutAnalysis | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [intensity, setIntensity] = useState(100);
  const [gridSize, setGridSize] = useState<"17" | "33" | "65">("17");
  const [format, setFormat] = useState<"cube" | "3dl" | "lut" | "look" | "xmp" | "dctl">("cube");
  const [precision, setPrecision] = useState<"8" | "10" | "12">("10");
  const [exportPreview, setExportPreview] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [lutResult, setLutResult] = useState<LutResponse | null>(null);

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

  // Free tier has monthly generation limits (3 per month, then $2.50/LUT)
  const isFree = user.tier === "free";
  const conversionsUsed = user.conversionsThisMonth || 0;
  const conversionsLimit = 3;
  const conversionsRemaining = Math.max(0, conversionsLimit - conversionsUsed);
  const usagePercentage = (conversionsUsed / conversionsLimit) * 100;
  const atMonthlyLimit = isFree && conversionsUsed >= conversionsLimit;

  const handleImageUpload = async (file: File) => {
    // Validate file size based on user tier
    const FILE_SIZE_LIMITS: Record<string, number> = {
      free: 10 * 1024 * 1024,     // 10MB
      creator: 50 * 1024 * 1024,  // 50MB
      pro: 100 * 1024 * 1024,     // 100MB
      studio: 200 * 1024 * 1024   // 200MB
    };
    
    const maxFileSize = FILE_SIZE_LIMITS[user.tier] || FILE_SIZE_LIMITS.free;
    const maxFileSizeMB = Math.floor(maxFileSize / (1024 * 1024));
    
    if (file.size > maxFileSize) {
      toast({
        title: "File Too Large",
        description: `Your ${user.tier} tier allows files up to ${maxFileSizeMB}MB. ${user.tier === 'free' ? 'Upgrade to Creator for 50MB.' : 'Upgrade for larger file sizes.'}`,
        variant: "destructive",
      });
      return;
    }

    // Validate file type - support multiple image formats
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'image/webp', 'image/tiff', 'image/tif', 'image/bmp', 'image/gif'];
    if (!validTypes.includes(file.type) && !validTypes.includes('image/' + file.name.split('.').pop()?.toLowerCase())) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid image file (JPG, PNG, HEIC, WEBP, TIFF, BMP, or GIF).",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setLutResult(null);
    setPreviewImage(null);

    const reader = new FileReader();
    
    reader.onerror = () => {
      toast({
        title: "Upload Error",
        description: "Failed to read the image file. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    };
    
    reader.onloadend = async () => {
      const imageData = reader.result as string;
      setUploadedImage(imageData);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageData }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Analysis failed");
        }

        const data = await response.json();
        setAnalysis(data);
        toast({
          title: "Analysis Complete",
          description: "Color profile extracted successfully from your image",
        });
      } catch (error) {
        console.error("Upload error:", error);
        const message = error instanceof Error ? error.message : "Failed to analyze image";
        toast({
          title: "Analysis Failed",
          description: message + ". Please try a different image or check your connection.",
          variant: "destructive",
        });
        // Reset on error
        setUploadedImage(null);
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    reader.readAsDataURL(file);
  };

  // Auto-update preview when controls change
  useEffect(() => {
    if (!uploadedImage || !analysis) return;

    const updatePreview = async () => {
      try {
        const response = await fetch("/api/preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageData: uploadedImage,
            intensity,
            gridSize,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setPreviewImage(data.previewImage);
        }
      } catch (error) {
        console.error("Preview error:", error);
      }
    };

    const debounce = setTimeout(() => {
      updatePreview();
    }, 300);

    return () => clearTimeout(debounce);
  }, [intensity, uploadedImage, analysis, gridSize]);

  const handleGenerateLut = async () => {
    if (!uploadedImage || !analysis) {
      toast({
        title: "Cannot Generate LUT",
        description: "Please upload and analyze an image first.",
        variant: "destructive",
      });
      return;
    }

    // Check if monthly limit reached (free tier) - payment required
    if (atMonthlyLimit) {
      toast({
        title: "Payment Required",
        description: "You've used all 3 free LUT generations this month. Pay $2.50 for this LUT, or upgrade to Creator ($7/mo) for unlimited generations.",
        variant: "destructive",
      });
      return;
    }

    // Validate grid size and format are allowed for user's tier
    const userTier = getUserTier(user);
    const requestedGridSize = parseInt(gridSize);
    
    if (!isGridSizeAllowed(userTier, requestedGridSize)) {
      toast({
        title: "Grid Size Not Available",
        description: `${gridSize}×${gridSize}×${gridSize} grid requires a higher tier. Please upgrade or select a smaller grid size.`,
        variant: "destructive",
      });
      return;
    }
    
    if (!isFormatAllowed(userTier, format)) {
      toast({
        title: "Format Not Available",
        description: `${format.toUpperCase()} format requires Pro tier. Please upgrade or select .cube format.`,
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-lut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: uploadedImage,
          intensity,
          gridSize,
          format: `.${format}`,
          precision,
          exportPreview,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details?.message || "LUT generation failed");
      }

      const data = await response.json();
      setLutResult(data);
      
      // Invalidate user query to refresh usage statistics
      await queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      
      toast({
        title: "LUT Generated Successfully",
        description: `Your ${gridSize}×${gridSize}×${gridSize} .${format} LUT is ready for download`,
      });
    } catch (error) {
      console.error("Generation error:", error);
      const message = error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Generation Failed",
        description: message + ". Please try again or adjust your settings.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAnalysis(null);
    setPreviewImage(null);
    setLutResult(null);
    setIntensity(100);
    setGridSize("17");
    setFormat("cube");
    setPrecision("10");
    setExportPreview(false);
  };

  const panel = (
    <>
        {!uploadedImage ? (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10 space-y-5">
              <div className="inline-flex items-center justify-center mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20">
                  <Wand2 className="w-7 h-7 text-primary" />
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3" data-testid="heading-generator">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                    Image to LUT Generator
                  </span>
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Extract professional color grading from any image. Upload a reference image and our algorithm analyzes its color science to generate a cinema-grade LUT.
                </p>
              </div>

              {/* Usage Status */}
              <div className="pt-2">
                <UsageStatus user={user} />
              </div>
              
              {/* Feature badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Badge variant="outline" className="px-3 py-1 bg-gradient-to-r from-primary/5 to-chart-2/5 border-primary/20 text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1.5" />
                  Zone Analysis
                </Badge>
                <Badge variant="outline" className="px-3 py-1 bg-gradient-to-r from-chart-2/5 to-chart-3/5 border-chart-2/20 text-xs">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Real-Time Preview
                </Badge>
                <Badge variant="outline" className="px-3 py-1 bg-gradient-to-r from-chart-3/5 to-primary/5 border-chart-3/20 text-xs">
                  <Wand2 className="w-3 h-3 mr-1.5" />
                  Pro Export
                </Badge>
              </div>
            </div>
            
            <UploadZone onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
            
            {/* Quick info */}
            <Card className="mt-8 bg-background/80 backdrop-blur-sm">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                  <div className="p-1 rounded bg-primary/10">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  How it works
                </h3>
                <ol className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-primary/10 to-chart-2/10 text-primary font-semibold text-xs shrink-0 mt-0.5">1</span>
                    <span>Upload a color-graded reference image (movie still, photo, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-chart-2/10 to-chart-3/10 text-chart-2 font-semibold text-xs shrink-0 mt-0.5">2</span>
                    <span>Our algorithm analyzes color distribution across shadows, midtones, and highlights</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-chart-3/10 to-primary/10 text-chart-3 font-semibold text-xs shrink-0 mt-0.5">3</span>
                    <span>Generate a LUT that captures the reference image's color science</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Editor workflow preview (Resolve, Premiere, FCP, AE, Avid, CapCut) */}
            <div className="mt-8">
              <EditorWorkflowCard intensity={intensity} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Usage Status - Persistent across both views */}
            <div className="flex justify-center">
              <UsageStatus user={user} />
            </div>
            
            {/* Analysis Dashboard */}
            {isAnalyzing ? (
              <div className="max-w-4xl mx-auto">
                <AnalysisProgress isActive={isAnalyzing} />
              </div>
            ) : analysis ? (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Preview */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Show source image before LUT generation */}
                  {!lutResult && (
                    <Card className="bg-background/80 backdrop-blur-sm">
                      <CardContent className="p-5">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm">Reference Image</h3>
                            <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                              Analyzed
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Color science will be extracted from this image
                          </p>
                          <img 
                            src={uploadedImage} 
                            alt="Reference" 
                            className="w-full rounded-lg border"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Show preview gallery after LUT generation */}
                  {lutResult && (
                    <>
                      <PreviewGallery
                        lutData={lutResult.lutData}
                        format={lutResult.format}
                        intensity={intensity}
                      />
                      
                      <DownloadSection
                        lutData={lutResult.lutData}
                        defaultFilename={lutResult.filename}
                        format={lutResult.format}
                        previewData={lutResult.previewData}
                        onReset={handleReset}
                      />

                      <EditorWorkflowCard lutFilename={lutResult.filename} intensity={intensity} />
                    </>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <ColorStatistics analysis={analysis} />
                  
                  <HistogramVisualization rgbHistogram={analysis.rgbHistogram} />
                  
                  <LutControls
                    intensity={intensity}
                    onIntensityChange={setIntensity}
                    gridSize={gridSize}
                    onGridSizeChange={setGridSize}
                    format={format}
                    onFormatChange={setFormat}
                    precision={precision}
                    onPrecisionChange={setPrecision}
                    exportPreview={exportPreview}
                    onExportPreviewChange={setExportPreview}
                    onGenerate={handleGenerateLut}
                    isGenerating={isGenerating}
                  />
                </div>
              </div>
            ) : null}
          </div>
        )}
    </>
  );

  if (embedded) {
    return <div className="space-y-6">{panel}</div>;
  }

  return (
    <div className="relative min-h-screen">
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {panel}
      </main>
      <Footer />
    </div>
  );
}
