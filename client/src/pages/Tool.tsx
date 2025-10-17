import { useState, useEffect } from "react";
import { UploadZone } from "@/components/UploadZone";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { ColorStatistics } from "@/components/ColorStatistics";
import { HistogramVisualization } from "@/components/HistogramVisualization";
import { LutControls } from "@/components/LutControls";
import { DownloadSection } from "@/components/DownloadSection";
import { AdvancedControls } from "@/components/AdvancedControls";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { LutAnalysis, LutResponse, AdvancedControls as AdvancedControlsType } from "@shared/schema";

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
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [lutResult, setLutResult] = useState<LutResponse | null>(null);

  const [advancedControls, setAdvancedControls] = useState<AdvancedControlsType>({
    shadows: { brightness: 0, saturation: 0, hue: 0 },
    midtones: { brightness: 0, saturation: 0, hue: 0 },
    highlights: { brightness: 0, saturation: 0, hue: 0 },
    temperature: 0,
    tint: 0,
    splitToning: {
      shadowColor: "#000000",
      highlightColor: "#ffffff",
      balance: 50,
    },
  });

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setLutResult(null);
    setPreviewImage(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAnalysis(data);
        toast({
          title: "Analysis Complete",
          description: "Color profile extracted successfully",
        });
      };
      
      reader.readAsDataURL(file);
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

  const handleAdvancedControlsChange = (controls: AdvancedControlsType) => {
    setAdvancedControls(controls);
  };

  // Auto-update preview when controls change
  useEffect(() => {
    if (!uploadedImage || !analysis) return;

    const updatePreview = async () => {
      const formData = new FormData();
      
      const blob = await (await fetch(uploadedImage)).blob();
      formData.append("image", blob);
      formData.append("intensity", intensity.toString());
      formData.append("gridSize", gridSize);
      formData.append("controls", JSON.stringify(advancedControls));

      try {
        const response = await fetch("/api/preview", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setPreviewImage(data.preview);
        }
      } catch (error) {
        console.error("Preview error:", error);
      }
    };

    const debounce = setTimeout(() => {
      updatePreview();
    }, 300);

    return () => clearTimeout(debounce);
  }, [intensity, advancedControls, uploadedImage, analysis, gridSize]);

  const handleGenerateLut = async () => {
    if (!uploadedImage || !analysis) return;

    setIsGenerating(true);

    const formData = new FormData();
    const blob = await (await fetch(uploadedImage)).blob();
    formData.append("image", blob);
    formData.append("intensity", intensity.toString());
    formData.append("gridSize", gridSize);
    formData.append("format", format);
    formData.append("precision", precision);
    formData.append("exportPreview", exportPreview.toString());
    formData.append("controls", JSON.stringify(advancedControls));

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
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
    setAdvancedControls({
      shadows: { brightness: 0, saturation: 0, hue: 0 },
      midtones: { brightness: 0, saturation: 0, hue: 0 },
      highlights: { brightness: 0, saturation: 0, hue: 0 },
      temperature: 0,
      tint: 0,
      splitToning: {
        shadowColor: "#000000",
        highlightColor: "#ffffff",
        balance: 50,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {!uploadedImage ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Upload Your Reference Image</h1>
              <p className="text-muted-foreground">
                Choose an image with the color grade you want to capture
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
                  
                  <AdvancedControls
                    controls={advancedControls}
                    onChange={handleAdvancedControlsChange}
                  />
                  
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
