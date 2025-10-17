import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BatchImage } from "@shared/schema";

interface BatchProcessorProps {
  images: BatchImage[];
  onRemoveImage: (id: string) => void;
  onClearAll: () => void;
  gridSize: string;
  intensity: number;
  format: string;
  advancedControls: any;
  selectedPresetId: string;
}

export function BatchProcessor({
  images,
  onRemoveImage,
  onClearAll,
  gridSize,
  intensity,
  format,
  advancedControls,
  selectedPresetId,
}: BatchProcessorProps) {
  const [previews, setPreviews] = useState<Map<string, string>>(new Map());
  const [isGeneratingPreviews, setIsGeneratingPreviews] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const generatePreviews = async () => {
    if (images.length === 0) return;

    setIsGeneratingPreviews(true);
    try {
      const response: any = await apiRequest("/api/batch-preview", "POST", {
        images: images.map(img => ({
          id: img.id,
          imageData: img.imageData,
          name: img.name,
        })),
        gridSize,
        intensity,
        advancedControls,
        presetId: selectedPresetId,
      });

      const newPreviews = new Map<string, string>();
      response.previews.forEach((p: { id: string; previewData: string }) => {
        newPreviews.set(p.id, p.previewData);
      });
      setPreviews(newPreviews);

      toast({
        title: "Previews Generated",
        description: `Generated ${response.previews.length} preview(s)`,
      });
    } catch (error) {
      console.error("Preview generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate previews",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPreviews(false);
    }
  };

  const downloadBatch = async () => {
    if (images.length === 0) return;

    setIsDownloading(true);
    try {
      const response = await fetch("/api/batch-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: images.map(img => ({
            id: img.id,
            imageData: img.imageData,
            name: img.name,
          })),
          gridSize,
          intensity,
          format,
          advancedControls,
          presetId: selectedPresetId,
        }),
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lut_batch_${new Date().toISOString().split("T")[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download Complete",
        description: `Downloaded ${images.length} LUT file(s) as ZIP`,
      });
    } catch (error) {
      console.error("Batch download error:", error);
      toast({
        title: "Error",
        description: "Failed to download batch",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Batch Processing ({images.length} image{images.length !== 1 ? "s" : ""})
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={generatePreviews}
            disabled={isGeneratingPreviews || images.length === 0}
            variant="outline"
            size="sm"
            data-testid="button-generate-batch-previews"
          >
            {isGeneratingPreviews ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Preview All"
            )}
          </Button>
          <Button
            onClick={downloadBatch}
            disabled={isDownloading || images.length === 0}
            size="sm"
            data-testid="button-download-batch"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download All
              </>
            )}
          </Button>
          <Button
            onClick={onClearAll}
            variant="outline"
            size="sm"
            disabled={images.length === 0}
            data-testid="button-clear-batch"
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="group relative overflow-hidden p-0" data-testid={`card-batch-image-${image.id}`}>
            <button
              onClick={() => onRemoveImage(image.id)}
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              data-testid={`button-remove-${image.id}`}
            >
              <div className="bg-destructive text-destructive-foreground rounded-full p-1 hover-elevate active-elevate-2">
                <X className="h-4 w-4" />
              </div>
            </button>
            
            <div className="aspect-square relative">
              <img
                src={previews.get(image.id) || image.imageData}
                alt={image.name}
                className="w-full h-full object-cover"
                data-testid={`img-batch-${image.id}`}
              />
              {previews.has(image.id) && (
                <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-xs py-1 px-2 text-center">
                  Preview Applied
                </div>
              )}
            </div>
            
            <div className="p-2 border-t">
              <p className="text-sm truncate" data-testid={`text-name-${image.id}`}>{image.name}</p>
            </div>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          Upload multiple images to start batch processing
        </div>
      )}
    </div>
  );
}
