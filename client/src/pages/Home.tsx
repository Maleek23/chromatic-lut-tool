import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { ColorStatistics } from "@/components/ColorStatistics";
import { LutControls } from "@/components/LutControls";
import { DownloadSection } from "@/components/DownloadSection";
import { PresetSelector } from "@/components/PresetSelector";
import { AdvancedControls } from "@/components/AdvancedControls";
import { BatchProcessor } from "@/components/BatchProcessor";
import { Loader2, Image as ImageIcon, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { LutAnalysis, LutResponse, AdvancedControls as AdvancedControlsType, BatchImage } from "@shared/schema";
import { getPresetById } from "@shared/presets";

export default function Home() {
  const { toast } = useToast();
  
  // Mode state
  const [mode, setMode] = useState<"single" | "batch">("single");
  
  // Single mode state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<LutAnalysis | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Batch mode state
  const [batchImages, setBatchImages] = useState<BatchImage[]>([]);
  
  // Shared state
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
    if (mode === "batch") {
      handleBatchImageUpload(file);
      return;
    }

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

  const handleBatchImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      const newImage: BatchImage = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        imageData,
      };
      setBatchImages(prev => [...prev, newImage]);
      toast({
        title: "Image Added",
        description: `${file.name} added to batch`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBatchImage = (id: string) => {
    setBatchImages(prev => prev.filter(img => img.id !== id));
  };

  const handleClearBatch = () => {
    setBatchImages([]);
    toast({
      title: "Batch Cleared",
      description: "All images removed from batch",
    });
  };

  const handleModeToggle = () => {
    const newMode = mode === "single" ? "batch" : "single";
    setMode(newMode);
    toast({
      title: "Mode Changed",
      description: `Switched to ${newMode} mode`,
    });
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
        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border p-1 gap-1">
            <Button
              variant={mode === "single" ? "default" : "ghost"}
              size="sm"
              onClick={() => mode === "batch" && handleModeToggle()}
              data-testid="button-single-mode"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Single Image
            </Button>
            <Button
              variant={mode === "batch" ? "default" : "ghost"}
              size="sm"
              onClick={() => mode === "single" && handleModeToggle()}
              data-testid="button-batch-mode"
            >
              <Images className="h-4 w-4 mr-2" />
              Batch Processing
            </Button>
          </div>
        </div>

        {mode === "batch" ? (
          <div className="space-y-8">
            <UploadZone onImageUpload={handleImageUpload} isAnalyzing={false} multiple />
            
            <BatchProcessor
              images={batchImages}
              onRemoveImage={handleRemoveBatchImage}
              onClearAll={handleClearBatch}
              gridSize={gridSize}
              intensity={intensity}
              format={format}
              advancedControls={advancedControls}
              selectedPresetId={selectedPresetId}
            />
            
            {/* Shared Controls for Batch */}
            <div className="grid md:grid-cols-2 gap-6">
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
            </div>

            <LutControls
              intensity={intensity}
              onIntensityChange={handleIntensityChange}
              gridSize={gridSize}
              onGridSizeChange={handleGridSizeChange}
              format={format}
              onFormatChange={setFormat}
              onGenerate={handleGenerateLut}
              isGenerating={isGenerating}
              hideGenerate
            />
          </div>
        ) : !uploadedImage ? (
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
