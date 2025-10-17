import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { ColorStatistics } from "@/components/ColorStatistics";
import { LutControls } from "@/components/LutControls";
import { DownloadSection } from "@/components/DownloadSection";
import { PresetSelector } from "@/components/PresetSelector";
import { AdvancedControls } from "@/components/AdvancedControls";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { LutAnalysis, LutResponse, AdvancedControls as AdvancedControlsType } from "@shared/schema";
import { getPresetById } from "@shared/presets";

export default function Home() {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<LutAnalysis | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [intensity, setIntensity] = useState(100);
  const [gridSize, setGridSize] = useState<"17" | "33" | "65">("33");
  const [format, setFormat] = useState<"cube" | "3dl">("cube");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [lutResult, setLutResult] = useState<LutResponse | null>(null);

  // Advanced controls and presets
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");
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
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setUploadedImage(imageData);
      setIsAnalyzing(true);
      setAnalysis(null);
      setLutResult(null);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageData }),
        });

        if (!response.ok) throw new Error("Analysis failed");

        const data: LutAnalysis = await response.json();
        setAnalysis(data);
        
        // Generate initial preview
        await updatePreview(imageData, gridSize, intensity, advancedControls, selectedPresetId);
      } catch (error) {
        console.error("Analysis error:", error);
        toast({
          title: "Analysis Failed",
          description: "Failed to analyze the image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const updatePreview = async (
    imageData: string, 
    gs: string, 
    int: number,
    controls?: AdvancedControlsType,
    presetId?: string
  ) => {
    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData,
          gridSize: gs,
          intensity: int,
          advancedControls: controls,
          presetId,
        }),
      });

      if (!response.ok) throw new Error("Preview failed");

      const data = await response.json();
      setPreviewImage(data.previewImage);
    } catch (error) {
      console.error("Preview error:", error);
      setPreviewImage(imageData); // Fallback to original
    }
  };

  const handleIntensityChange = (value: number) => {
    setIntensity(value);
    if (uploadedImage) {
      updatePreview(uploadedImage, gridSize, value, advancedControls, selectedPresetId);
    }
  };

  const handleGridSizeChange = (value: "17" | "33" | "65") => {
    setGridSize(value);
    if (uploadedImage) {
      updatePreview(uploadedImage, value, intensity, advancedControls, selectedPresetId);
    }
  };

  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    if (presetId) {
      const preset = getPresetById(presetId);
      if (preset) {
        setAdvancedControls(preset.controls);
        setIntensity(preset.intensity);
        if (uploadedImage) {
          updatePreview(uploadedImage, gridSize, preset.intensity, preset.controls, presetId);
        }
      }
    } else {
      // Reset to defaults when no preset selected
      const defaultControls: AdvancedControlsType = {
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
      };
      setAdvancedControls(defaultControls);
      if (uploadedImage) {
        updatePreview(uploadedImage, gridSize, intensity, defaultControls, "");
      }
    }
  };

  const handleAdvancedControlsChange = (controls: AdvancedControlsType) => {
    setAdvancedControls(controls);
    setSelectedPresetId(""); // Clear preset when manually adjusting
    if (uploadedImage) {
      updatePreview(uploadedImage, gridSize, intensity, controls, "");
    }
  };

  const handleGenerateLut = async () => {
    if (!uploadedImage) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-lut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageData: uploadedImage,
          gridSize,
          intensity,
          format,
          advancedControls,
          presetId: selectedPresetId,
        }),
      });

      if (!response.ok) throw new Error("LUT generation failed");

      const data: LutResponse = await response.json();
      setLutResult(data);
      toast({
        title: "LUT Generated!",
        description: "Your color grading LUT is ready to download.",
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
    setSelectedPresetId("");
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
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {!uploadedImage ? (
          <UploadZone onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
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
                      onReset={handleReset}
                    />
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <ColorStatistics analysis={analysis} />
                  
                  <PresetSelector
                    selectedPresetId={selectedPresetId}
                    onSelectPreset={handlePresetSelect}
                    currentSettings={{
                      controls: advancedControls,
                      intensity,
                    }}
                  />
                  
                  <AdvancedControls
                    controls={advancedControls}
                    onChange={handleAdvancedControlsChange}
                  />
                  
                  <LutControls
                    intensity={intensity}
                    onIntensityChange={handleIntensityChange}
                    gridSize={gridSize}
                    onGridSizeChange={handleGridSizeChange}
                    format={format}
                    onFormatChange={setFormat}
                    onGenerate={handleGenerateLut}
                    isGenerating={isGenerating}
                  />
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          <p>
            Supports .cube and .3dl formats • Compatible with Adobe Premiere,
            Final Cut Pro, DaVinci Resolve
          </p>
        </div>
      </footer>
    </div>
  );
}
