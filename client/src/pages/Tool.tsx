import { useState, useEffect } from "react";
import { UploadZone } from "@/components/UploadZone";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { ColorStatistics } from "@/components/ColorStatistics";
import { HistogramVisualization } from "@/components/HistogramVisualization";
import { LutControls } from "@/components/LutControls";
import { DownloadSection } from "@/components/DownloadSection";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import type { LutAnalysis, LutResponse } from "@shared/schema";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getUserTier, isGridSizeAllowed, isFormatAllowed } from "@/lib/tier-utils";

export default function Tool() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<LutAnalysis | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [intensity, setIntensity] = useState(100);
  const [gridSize, setGridSize] = useState<"17" | "33" | "65">("17"); // Start with universally available grid
  const [format, setFormat] = useState<"cube" | "3dl" | "lut">("cube");
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

  const isFree = user.tier === "free";
  const conversionsUsed = user.conversionsThisMonth || 0;
  const conversionsLimit = 5;
  const conversionsRemaining = Math.max(0, conversionsLimit - conversionsUsed);
  const usagePercentage = (conversionsUsed / conversionsLimit) * 100;

  const handleImageUpload = async (file: File) => {
    // Validate file size (max 25MB)
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 25MB.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif', 'image/webp', 'image/tiff', 'image/tif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid image file (JPG, PNG, HEIC, WEBP, or TIFF).",
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
          format,
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
    setGridSize("17"); // Reset to universally available grid
    setFormat("cube");
    setPrecision("10");
    setExportPreview(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {!uploadedImage ? (
          <div className="max-w-3xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <svg 
                    className="w-8 h-8 text-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="heading-generator">
                Image to LUT Generator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Extract color grading from any image and convert it into a professional LUT file. 
                Upload a color-graded reference image and let our algorithm analyze its color science.
              </p>

              {/* Free Tier Usage Counter */}
              {isFree && (
                <Alert className="max-w-md mx-auto mt-6" data-testid="alert-usage-counter">
                  {conversionsRemaining > 0 ? (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <AlertDescription className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">
                            {conversionsRemaining} {conversionsRemaining === 1 ? 'generation' : 'generations'} remaining this month
                          </span>
                          <span className="text-muted-foreground" data-testid="text-usage-count">
                            {conversionsUsed}/{conversionsLimit}
                          </span>
                        </div>
                        <Progress value={usagePercentage} className="h-2" />
                        <Link href="/upgrade">
                          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs hover:bg-transparent" data-testid="button-upgrade-usage">
                            Upgrade for unlimited generations →
                          </Button>
                        </Link>
                      </AlertDescription>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="space-y-2">
                        <p className="text-sm font-medium">Monthly limit reached</p>
                        <p className="text-xs text-muted-foreground">
                          You've used all {conversionsLimit} free generations this month. Your limit resets at the start of next month.
                        </p>
                        <Link href="/upgrade">
                          <Button size="sm" className="w-full mt-2" data-testid="button-upgrade-limit">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Upgrade for Unlimited
                          </Button>
                        </Link>
                      </AlertDescription>
                    </>
                  )}
                </Alert>
              )}
              
              {/* Feature badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Zone-Based Analysis
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Real-Time Preview
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Professional Export
                </span>
              </div>
            </div>
            
            <UploadZone onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
            
            {/* Quick info */}
            <div className="mt-8 p-6 rounded-lg border bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How it works
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary font-medium text-xs mt-0.5">1</span>
                  <span>Upload a color-graded reference image (movie still, photo, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary font-medium text-xs mt-0.5">2</span>
                  <span>Our algorithm analyzes color distribution across shadows, midtones, and highlights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary font-medium text-xs mt-0.5">3</span>
                  <span>Generate a LUT that captures the reference image's color science</span>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Analysis Dashboard */}
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center min-h-96 gap-6">
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-semibold">
                    Analyzing color profile...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Extracting color science from your image
                  </p>
                </div>
              </div>
            ) : analysis ? (
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Main Preview */}
                <div className="lg:col-span-2 space-y-6">
                  <ComparisonSlider
                    originalImage={uploadedImage}
                    previewImage={previewImage || uploadedImage}
                  />
                  
                  {lutResult && (
                    <DownloadSection
                      lutData={lutResult.lutData}
                      defaultFilename={lutResult.filename}
                      format={lutResult.format}
                      previewData={lutResult.previewData}
                      onReset={handleReset}
                    />
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
      </main>
    </div>
  );
}
