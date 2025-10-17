import { useCallback, useState } from "react";
import { CloudUpload, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export function UploadZone({ onImageUpload, isAnalyzing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  return (
    <div
      className={`
        relative min-h-96 border-2 border-dashed rounded-lg
        transition-all duration-300 flex flex-col items-center justify-center
        cursor-pointer hover-elevate
        ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-border"
        }
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById("file-input")?.click()}
      data-testid="upload-zone"
    >
      <input
        id="file-input"
        type="file"
        accept="image/jpeg,image/png,image/heic,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isAnalyzing}
        data-testid="input-file"
      />

      <div className="flex flex-col items-center gap-6 pointer-events-none">
        <div className="p-6 rounded-full bg-primary/10">
          <CloudUpload className="w-16 h-16 text-primary" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold">
            {isAnalyzing ? "Analyzing image..." : "Upload an image"}
          </h3>
          <p className="text-muted-foreground">
            Drag and drop or click to select
          </p>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary" className="font-mono text-xs">
            JPG
          </Badge>
          <Badge variant="secondary" className="font-mono text-xs">
            PNG
          </Badge>
          <Badge variant="secondary" className="font-mono text-xs">
            HEIC
          </Badge>
          <Badge variant="secondary" className="font-mono text-xs">
            WEBP
          </Badge>
        </div>
      </div>
    </div>
  );
}
