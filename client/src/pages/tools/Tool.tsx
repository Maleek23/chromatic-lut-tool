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
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Wand2,
  CheckCircle2,
  Upload,
  BarChart3,
  SlidersHorizontal,
  Eye,
  Download,
  ArrowLeft,
  ArrowRight,
  Check,
  Image as ImageIcon,
  Film,
  GitCompare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import type { LutAnalysis, LutResponse } from "@shared/schema";
import { getUserTier, isGridSizeAllowed, isFormatAllowed } from "@/lib/tier-utils";
import { queryClient } from "@/lib/queryClient";
import { Footer } from "@/components/layout/Footer";

type FlowStep = "source" | "analyze" | "refine" | "preview" | "export";

const STEP_ORDER: FlowStep[] = ["source", "analyze", "refine", "preview", "export"];

const STEPS: Array<{ id: FlowStep; label: string; hint: string; icon: LucideIcon }> = [
  { id: "source", label: "Source", hint: "Image, video, or pair", icon: Upload },
  { id: "analyze", label: "Analyze", hint: "Extract color science", icon: BarChart3 },
  { id: "refine", label: "Refine", hint: "Intensity, grid, format", icon: SlidersHorizontal },
  { id: "preview", label: "Preview", hint: "Before / after", icon: Eye },
  { id: "export", label: "Export", hint: "Download & deliver", icon: Download },
];

/** Human rating for the measured ΔE fidelity of a solved pair LUT. */
function fidelityRating(meanDeltaE: number): { label: string; detail: string } {
  if (meanDeltaE < 2)
    return { label: "Excellent", detail: "Near-indistinguishable from the graded frame." };
  if (meanDeltaE < 5)
    return { label: "Good", detail: "Faithful match; minor smoothing in sparse colors." };
  if (meanDeltaE < 10)
    return { label: "Approximate", detail: "Captures the look; check sparse or extreme colors." };
  return { label: "Rough", detail: "The pair may be mismatched — verify same shot and framing." };
}

function StepNav({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}) {
  if (!onBack && !onNext) return null;
  return (
    <div className="flex items-center justify-between gap-3">
      {onBack ? (
        <Button variant="outline" onClick={onBack} data-testid="button-step-back">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <span />
      )}
      {onNext && (
        <Button onClick={onNext} disabled={nextDisabled} data-testid="button-step-next">
          {nextLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default function Tool({ embedded = false }: { embedded?: boolean } = {}) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | "pair">("image");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [beforeURL, setBeforeURL] = useState<string | null>(null);
  const [afterURL, setAfterURL] = useState<string | null>(null);
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
  const [step, setStep] = useState<FlowStep>("source");

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

    // Video -> LUT path: frames are sampled across the clip and merged.
    const isVideo =
      file.type.startsWith("video/") ||
      /\.(mp4|mov|webm|mkv|avi|m4v|mpeg|mpg)$/i.test(file.name);
    if (isVideo) {
      if (user.tier === "free") {
        toast({
          title: "Video-to-LUT is a paid feature",
          description: "Upgrade to Creator to generate a LUT from a video clip.",
          variant: "destructive",
        });
        return;
      }
      setLutResult(null);
      setPreviewImage(null);
      setMediaType("video");
      setVideoFile(file);
      setUploadedImage(URL.createObjectURL(file));
      // Unlocks the controls/generate step; stats panels are hidden for video.
      setAnalysis({ source: "video" } as unknown as LutAnalysis);
      toast({
        title: "Video loaded",
        description: "Frames will be sampled across the clip and averaged into one LUT.",
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

  const clearSourceFiles = () => {
    if (uploadedImage?.startsWith("blob:")) URL.revokeObjectURL(uploadedImage);
    if (beforeURL?.startsWith("blob:")) URL.revokeObjectURL(beforeURL);
    if (afterURL?.startsWith("blob:")) URL.revokeObjectURL(afterURL);
    setUploadedImage(null);
    setVideoFile(null);
    setBeforeFile(null);
    setAfterFile(null);
    setBeforeURL(null);
    setAfterURL(null);
    setAnalysis(null);
    setPreviewImage(null);
    setLutResult(null);
  };

  const setSourceType = (next: "image" | "video" | "pair") => {
    if (next === mediaType) return;
    clearSourceFiles();
    setMediaType(next);
    setStep("source");
  };

  const handlePairUpload = (slot: "before" | "after", file: File) => {
    const FILE_SIZE_LIMITS: Record<string, number> = {
      free: 10 * 1024 * 1024,
      creator: 50 * 1024 * 1024,
      pro: 100 * 1024 * 1024,
      studio: 200 * 1024 * 1024,
    };
    const maxFileSize = FILE_SIZE_LIMITS[user.tier] || FILE_SIZE_LIMITS.free;
    if (file.size > maxFileSize) {
      toast({
        title: "File Too Large",
        description: `Your ${user.tier} tier allows files up to ${Math.floor(maxFileSize / (1024 * 1024))}MB.`,
        variant: "destructive",
      });
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File Type",
        description: "Pair frames must be still images (JPG, PNG, WEBP, ...).",
        variant: "destructive",
      });
      return;
    }
    if (user.tier === "free") {
      toast({
        title: "Before/after extraction is a paid feature",
        description: "Upgrade to Creator to solve a LUT from a frame pair.",
        variant: "destructive",
      });
      return;
    }

    const url = URL.createObjectURL(file);
    const nextBeforeFile = slot === "before" ? file : beforeFile;
    const nextAfterFile = slot === "after" ? file : afterFile;
    const nextBeforeURL = slot === "before" ? url : beforeURL;
    const nextAfterURL = slot === "after" ? url : afterURL;
    // Revoke a replaced blob URL for the same slot.
    const prevURL = slot === "before" ? beforeURL : afterURL;
    if (prevURL?.startsWith("blob:")) URL.revokeObjectURL(prevURL);

    setLutResult(null);
    setPreviewImage(null);
    if (slot === "before") {
      setBeforeFile(file);
      setBeforeURL(url);
    } else {
      setAfterFile(file);
      setAfterURL(url);
    }

    if (nextBeforeFile && nextAfterFile && nextBeforeURL && nextAfterURL) {
      // Both frames present — unlocks analyze/refine/generate. Stats panels
      // stay hidden for pairs; correspondence replaces them.
      setAnalysis({ source: "pair" } as unknown as LutAnalysis);
      toast({
        title: "Frame pair ready",
        description: "The exact grade will be solved from before → after.",
      });
    } else {
      setAnalysis(null);
      toast({
        title: slot === "before" ? "Before frame loaded" : "After frame loaded",
        description: "Upload the other frame of the same shot.",
      });
    }
  };

  // Auto-update preview when controls change
  useEffect(() => {
    // Video previews come from the generation response, not this live image preview.
    if (mediaType !== "image" || !uploadedImage || !analysis) return;

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
  }, [intensity, uploadedImage, analysis, gridSize, mediaType]);

  const pairReady = mediaType === "pair" && !!beforeURL && !!afterURL;
  const hasSource = !!uploadedImage || pairReady;
  const analysisReady = !!analysis && !isAnalyzing;
  // Clamp the visible step so the flow can never show a step without its input.
  const activeStep: FlowStep = !hasSource ? "source" : step;

  // Move forward automatically once the source is analyzed / the LUT exists.
  useEffect(() => {
    if (!lutResult && analysisReady && step === "source") {
      setStep("analyze");
    }
  }, [lutResult, analysisReady, step]);

  useEffect(() => {
    if (lutResult) {
      setStep("preview");
    }
  }, [lutResult]);

  const isStepLocked = (s: FlowStep): boolean => {
    switch (s) {
      case "source":
        return false;
      case "analyze":
      case "refine":
        return !hasSource;
      case "preview":
        return !analysisReady;
      case "export":
        return !lutResult;
    }
  };

  const goStep = (next: FlowStep) => {
    if (isStepLocked(next)) {
      const missing =
        next === "export"
          ? "Generate a LUT first."
          : next === "preview"
            ? "Analyze a source first."
            : "Upload a source first.";
      toast({
        title: "Step locked",
        description: missing,
      });
      return;
    }
    setStep(next);
  };

  const handleGenerateLut = async () => {
    if (!hasSource || !analysis) {
      toast({
        title: "Cannot Generate LUT",
        description: "Please provide a source first (image, video, or frame pair).",
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
      let response: Response;

      if (mediaType === "pair") {
        if (!beforeFile || !afterFile) {
          throw new Error("Upload both the before and after frames first.");
        }
        const form = new FormData();
        form.append("before", beforeFile);
        form.append("after", afterFile);
        form.append("intensity", String(intensity));
        form.append("gridSize", gridSize);
        form.append("format", `.${format}`);
        form.append("precision", precision);
        form.append("exportPreview", String(exportPreview));
        response = await fetch("/api/generate-paired-lut", {
          method: "POST",
          body: form,
        });
      } else if (mediaType === "video") {
        if (!videoFile) {
          throw new Error("Video file is no longer available. Please re-upload.");
        }
        const form = new FormData();
        form.append("video", videoFile);
        form.append("intensity", String(intensity));
        form.append("gridSize", gridSize);
        form.append("format", `.${format}`);
        form.append("precision", precision);
        form.append("exportPreview", String(exportPreview));
        response = await fetch("/api/generate-video-lut", {
          method: "POST",
          body: form,
        });
      } else {
        response = await fetch("/api/generate-lut", {
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
      }

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
    clearSourceFiles();
    setMediaType("image");
    setStep("source");
    setIntensity(100);
    setGridSize("17");
    setFormat("cube");
    setPrecision("10");
    setExportPreview(false);
  };

  const panel = (
    <>
      {/* Guided step rail — always visible so the flow reads as one pipeline */}
      <div className="mx-auto mb-6 max-w-4xl">
        <ol className="flex items-start gap-1" data-testid="studio-steps">
          {STEPS.map((s, i) => {
            const activeIdx = STEP_ORDER.indexOf(activeStep);
            const done = i < activeIdx;
            const current = i === activeIdx;
            const locked = isStepLocked(s.id);
            const Icon = s.icon;
            return (
              <li key={s.id} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => goStep(s.id)}
                  data-testid={`studio-step-${s.id}`}
                  className={`flex w-full flex-col items-center gap-1.5 rounded-lg px-1 py-2 text-center transition-colors ${
                    current
                      ? "text-foreground"
                      : locked
                        ? "cursor-not-allowed text-muted-foreground/60"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                      done
                        ? "border-primary bg-primary text-primary-foreground"
                        : current
                          ? "border-primary/50 bg-primary/10 text-primary"
                          : "border-border bg-muted/40"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </span>
                  <span className="text-xs font-medium leading-none">{s.label}</span>
                  <span className="hidden text-[11px] leading-tight text-muted-foreground sm:block">
                    {s.hint}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
        {!hasSource ? (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10 space-y-5">
              {/* The page shell provides the hero in Studio; only show our own
                  title block when this generator is used as a standalone page. */}
              {!embedded && (
                <>
                  <div className="inline-flex items-center justify-center mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20">
                      <Wand2 className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3" data-testid="heading-generator">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                        Image &amp; Video to LUT Generator
                      </span>
                    </h1>
                    <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                      Extract professional color grading from any image or video clip. Upload a reference and our algorithm analyzes its color science to generate a cinema-grade LUT.
                    </p>
                  </div>
                </>
              )}

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
                <Badge variant="outline" className="px-3 py-1 bg-gradient-to-r from-primary/5 to-chart-3/5 border-primary/20 text-xs">
                  <Sparkles className="w-3 h-3 mr-1.5" />
                  Video to LUT
                </Badge>
                <Badge variant="outline" className="px-3 py-1 bg-gradient-to-r from-chart-2/5 to-primary/5 border-chart-2/20 text-xs">
                  <GitCompare className="w-3 h-3 mr-1.5" />
                  Before / After Solve
                </Badge>
              </div>
            </div>

            {/* Source-type selector */}
            <div className="mx-auto mt-6 grid max-w-2xl grid-cols-3 gap-2" data-testid="source-type-picker">
              {(
                [
                  { id: "image", label: "Single image", hint: "Look-inspired", icon: ImageIcon },
                  { id: "video", label: "Video clip", hint: "Averaged frames", icon: Film },
                  { id: "pair", label: "Before / After", hint: "Exact solve", icon: GitCompare },
                ] as const
              ).map((opt) => {
                const Icon = opt.icon;
                const selected = mediaType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSourceType(opt.id)}
                    data-testid={`source-type-${opt.id}`}
                    className={`rounded-lg border px-3 py-2.5 text-center transition-colors ${
                      selected
                        ? "border-primary/50 bg-primary/10 text-foreground"
                        : "border-border/60 bg-muted/20 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="mx-auto mb-1 h-4 w-4" />
                    <span className="block text-xs font-semibold">{opt.label}</span>
                    <span className="block text-[11px] text-muted-foreground">{opt.hint}</span>
                  </button>
                );
              })}
            </div>

            {mediaType === "pair" ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {(
                  [
                    { slot: "before", title: "Before — ungraded", desc: "The flat/log frame, same shot.", url: beforeURL },
                    { slot: "after", title: "After — graded", desc: "The final look of the same shot.", url: afterURL },
                  ] as const
                ).map(({ slot, title, desc, url }) => (
                  <Card key={slot} className="bg-background/80 backdrop-blur-sm">
                    <CardContent className="space-y-3 p-4">
                      <div>
                        <h3 className="text-sm font-semibold">{title}</h3>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      {url ? (
                        <div className="space-y-2">
                          <img
                            src={url}
                            alt={title}
                            className="max-h-56 w-full rounded-lg border object-contain"
                          />
                          <UploadZone
                            onImageUpload={(file) => handlePairUpload(slot, file)}
                            isAnalyzing={isAnalyzing}
                          />
                        </div>
                      ) : (
                        <UploadZone
                          onImageUpload={(file) => handlePairUpload(slot, file)}
                          isAnalyzing={isAnalyzing}
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <UploadZone onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
            )}
            
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

          </div>
        ) : (
          <div className="space-y-6">
            {activeStep === "source" ? (
              <div className="space-y-6">
                <Card className="bg-background/80 backdrop-blur-sm">
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">
                        {mediaType === "video" ? "Video clip" : "Reference image"}
                      </h3>
                      <Badge variant="outline" className="px-2 py-0.5 text-[10px]">
                        {analysisReady ? "Analyzed" : "Uploaded"}
                      </Badge>
                    </div>
                    {mediaType === "video" ? (
                      <video
                        src={uploadedImage ?? undefined}
                        controls
                        className="w-full rounded-lg border"
                        data-testid="video-reference"
                      />
                    ) : (
                      uploadedImage && (
                        <img
                          src={uploadedImage}
                          alt="Reference"
                          className="max-h-[420px] w-full rounded-lg border object-contain"
                        />
                      )
                    )}
                  </CardContent>
                </Card>
                <StepNav
                  onBack={handleReset}
                  onNext={() => goStep("analyze")}
                  nextLabel="Continue to analyze"
                  nextDisabled={!hasSource}
                />
              </div>
            ) : activeStep === "analyze" ? (
              <div className="space-y-6">
                <StepNav
                  onBack={() => setStep("source")}
                  onNext={() => goStep("refine")}
                  nextLabel="Continue to refine"
                  nextDisabled={!analysisReady}
                />
                {isAnalyzing ? (
                  <div className="mx-auto max-w-4xl">
                    <AnalysisProgress isActive={isAnalyzing} />
                  </div>
                ) : !analysis ? (
                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardContent className="p-5 text-sm text-muted-foreground">
                      Analysis is not available yet. Go back and re-upload your source.
                    </CardContent>
                  </Card>
                ) : mediaType === "pair" ? (
                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardContent className="space-y-4 p-5">
                      <div>
                        <h3 className="text-sm font-semibold">Correspondence check</h3>
                        <p className="text-sm text-muted-foreground">
                          Both frames must show the <span className="font-medium text-foreground">same shot</span> —
                          same framing, same moment. The solver measures the exact per-color
                          mapping from left to right, so mismatched frames produce a wrong LUT.
                        </p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">BEFORE — UNGRADED</p>
                          {beforeURL && (
                            <img
                              src={beforeURL}
                              alt="Before frame"
                              className="max-h-64 w-full rounded-lg border object-contain"
                            />
                          )}
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">AFTER — GRADED</p>
                          {afterURL && (
                            <img
                              src={afterURL}
                              alt="After frame"
                              className="max-h-64 w-full rounded-lg border object-contain"
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : mediaType === "video" ? (
                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardContent className="space-y-3 p-5">
                      <h3 className="text-sm font-semibold">Frame sampling plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Frames are sampled evenly across the whole clip and merged with a
                        trimmed mean, so a single dark or flashy frame cannot drag the grade
                        around. Generation returns the frame count and clip duration.
                      </p>
                      <video
                        src={uploadedImage ?? undefined}
                        controls
                        className="w-full rounded-lg border"
                        data-testid="video-analyze"
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 lg:grid-cols-2">
                    <ColorStatistics analysis={analysis} />
                    <HistogramVisualization rgbHistogram={analysis.rgbHistogram} />
                  </div>
                )}
              </div>
            ) : activeStep === "refine" ? (
              <div className="mx-auto max-w-2xl space-y-6">
                <StepNav
                  onBack={() => setStep("analyze")}
                  onNext={() => goStep("preview")}
                  nextLabel="Continue to preview"
                  nextDisabled={!analysisReady}
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
            ) : activeStep === "preview" ? (
              <div className="space-y-6">
                <StepNav
                  onBack={() => setStep("refine")}
                  onNext={lutResult ? () => goStep("export") : undefined}
                  nextLabel="Continue to export"
                />
                {!lutResult ? (
                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Live preview</h3>
                        <Badge variant="outline" className="px-2 py-0.5 text-[10px]">
                          Pre-generation
                        </Badge>
                      </div>
                      {mediaType === "pair" ? (
                        beforeURL && (
                          <img
                            src={beforeURL}
                            alt="Before frame"
                            className="max-h-[480px] w-full rounded-lg border object-contain"
                            data-testid="image-pair-before"
                          />
                        )
                      ) : mediaType === "video" ? (
                        <video
                          src={uploadedImage ?? undefined}
                          controls
                          className="w-full rounded-lg border"
                          data-testid="video-preview"
                        />
                      ) : previewImage ? (
                        <img
                          src={previewImage}
                          alt="Graded preview"
                          className="max-h-[480px] w-full rounded-lg border object-contain"
                          data-testid="image-preview"
                        />
                      ) : (
                        uploadedImage && (
                          <img
                            src={uploadedImage}
                            alt="Reference"
                            className="max-h-[480px] w-full rounded-lg border object-contain"
                          />
                        )
                      )}
                      <p className="text-xs text-muted-foreground">
                        Tune intensity and grid size in Refine, then generate the LUT to unlock
                        export previews.
                      </p>
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleGenerateLut}
                        disabled={isGenerating}
                        data-testid="button-generate-preview"
                      >
                        {isGenerating ? "Generating LUT..." : "Generate LUT"}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {lutResult.previewData && (
                      <Card className="bg-background/80 backdrop-blur-sm">
                        <CardContent className="space-y-3 p-5">
                          <h3 className="text-sm font-semibold">Graded frame</h3>
                          <img
                            src={lutResult.previewData}
                            alt="Graded result"
                            className="max-h-[480px] w-full rounded-lg border object-contain"
                            data-testid="image-result"
                          />
                        </CardContent>
                      </Card>
                    )}
                    {mediaType === "pair" && lutResult.fidelity && (
                      <Card className="border-primary/30 bg-primary/5" data-testid="fidelity-card">
                        <CardContent className="space-y-3 p-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold">Measured accuracy</h3>
                            <Badge
                              variant="outline"
                              className="border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold"
                            >
                              {fidelityRating(lutResult.fidelity.meanDeltaE).label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {fidelityRating(lutResult.fidelity.meanDeltaE).detail}
                          </p>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="rounded-lg border border-border/60 bg-background/60 p-2.5">
                              <p className="text-lg font-bold" data-testid="fidelity-mean">
                                {lutResult.fidelity.meanDeltaE.toFixed(2)}
                              </p>
                              <p className="text-[11px] text-muted-foreground">Mean ΔE</p>
                            </div>
                            <div className="rounded-lg border border-border/60 bg-background/60 p-2.5">
                              <p className="text-lg font-bold" data-testid="fidelity-max">
                                {lutResult.fidelity.maxDeltaE.toFixed(1)}
                              </p>
                              <p className="text-[11px] text-muted-foreground">Max ΔE</p>
                            </div>
                            <div className="rounded-lg border border-border/60 bg-background/60 p-2.5">
                              <p className="text-lg font-bold" data-testid="fidelity-coverage">
                                {(lutResult.fidelity.coverage * 100).toFixed(1)}%
                              </p>
                              <p className="text-[11px] text-muted-foreground">Cell coverage</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    {mediaType === "pair" && lutResult.sourcePreview && (
                      <Card className="bg-background/80 backdrop-blur-sm">
                        <CardContent className="space-y-3 p-5">
                          <h3 className="text-sm font-semibold">Before vs solved grade</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground">BEFORE</p>
                              <img
                                src={lutResult.sourcePreview}
                                alt="Before frame"
                                className="max-h-64 w-full rounded-lg border object-contain"
                                data-testid="image-pair-result-before"
                              />
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-medium text-muted-foreground">LUT APPLIED</p>
                              {lutResult.previewData ? (
                                <img
                                  src={lutResult.previewData}
                                  alt="Solved grade applied"
                                  className="max-h-64 w-full rounded-lg border object-contain"
                                  data-testid="image-pair-result-after"
                                />
                              ) : (
                                <p className="text-xs text-muted-foreground">
                                  Enable “Export preview image” in Refine to see the graded frame here.
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <PreviewGallery
                      lutData={lutResult.lutData}
                      format={lutResult.format}
                      intensity={intensity}
                    />
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <StepNav onBack={() => setStep("preview")} />
                {lutResult ? (
                  <>
                    <DownloadSection
                      lutData={lutResult.lutData}
                      defaultFilename={lutResult.filename}
                      format={lutResult.format}
                      previewData={lutResult.previewData}
                      onReset={handleReset}
                    />
                    <EditorWorkflowCard lutFilename={lutResult.filename} intensity={intensity} />
                  </>
                ) : (
                  <Card className="bg-background/80 backdrop-blur-sm">
                    <CardContent className="p-5 text-sm text-muted-foreground">
                      Generate a LUT first — your download and editor recipes will appear here.
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
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
