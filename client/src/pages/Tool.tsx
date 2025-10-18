import { useState, useEffect } from "react";
import { UploadZone } from "@/components/UploadZone";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { ColorStatistics } from "@/components/ColorStatistics";
import { HistogramVisualization } from "@/components/HistogramVisualization";
import { LutControls } from "@/components/LutControls";
import { DownloadSection } from "@/components/DownloadSection";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { LutAnalysis, LutResponse } from "@shared/schema";

export default function Tool() {
  const { toast } = useToast();
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<LutAnalysis | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [intensity, setIntensity] = useState(100);
  const [gridSize, setGridSize] = useState<"17" | "33" | "65">("33");
  const [format, setFormat] = useState<"cube" | "3dl">("cube");
  const [precision, setPrecision] = useState<"8" | "10" | "12">("10");
  const [exportPreview, setExportPreview] = useState(false);
  const [lutType, setLutType] = useState<"creative" | "technical" | "cinematic" | "neutral">("creative");
  const [lutPurpose, setLutPurpose] = useState<"color-correction" | "look" | "grading" | "matching">("look");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [lutResult, setLutResult] = useState<LutResponse | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setLutResult(null);
    setPreviewImage(null);

    const reader = new FileReader();
    
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
          throw new Error("Analysis failed");
        }

        const data = await response.json();
        setAnalysis(data);
        toast({
          title: "Analysis Complete",
          description: "Color profile extracted successfully",
        });
      } catch (error) {
        console.error("Upload error:", error);
        toast({
          title: "Upload Failed",
          description: "Failed to analyze image. Please try again.",
          variant: "destructive",
        });
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
    if (!uploadedImage || !analysis) return;

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
          lutType,
          lutPurpose,
        }),
      });

      if (!response.ok) {
        throw new Error("LUT generation failed");
      }

      const data = await response.json();
      setLutResult(data);
      toast({
        title: "LUT Generated",
        description: "Your LUT file is ready for download",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate LUT. Please try again.",
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
    setGridSize("33");
    setFormat("cube");
    setPrecision("10");
    setExportPreview(false);
    setLutType("creative");
    setLutPurpose("look");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {!uploadedImage ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2" data-testid="heading-generator">Image to LUT Generator</h1>
              <p className="text-muted-foreground">
                Analyze any image to extract its color grading and generate a professional LUT file
              </p>
            </div>
            <UploadZone onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Analysis Dashboard */}
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center min-h-96 gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-lg text-muted-foreground">
                  Analyzing color profile...
                </p>
              </div>
            ) : analysis ? (
              <div className="grid lg:grid-cols-3 gap-8">
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
                    lutType={lutType}
                    onLutTypeChange={setLutType}
                    lutPurpose={lutPurpose}
                    onLutPurposeChange={setLutPurpose}
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
