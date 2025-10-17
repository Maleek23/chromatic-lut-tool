import { useCallback, useState } from "react";
import { CloudUpload, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
  multiple?: boolean;
}

export function UploadZone({ onImageUpload, isAnalyzing, multiple = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter(file => file.type.startsWith("image/"));
      
      if (multiple) {
        imageFiles.forEach(file => onImageUpload(file));
      } else if (imageFiles[0]) {
        onImageUpload(imageFiles[0]);
      }
    },
    [onImageUpload, multiple]
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
      const files = e.target.files ? Array.from(e.target.files) : [];
      
      if (multiple) {
        files.forEach(file => onImageUpload(file));
      } else if (files[0]) {
        onImageUpload(files[0]);
      }
    },
    [onImageUpload, multiple]
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
        multiple={multiple}
        data-testid="input-file"
      />

      <div className="flex flex-col items-center gap-6 pointer-events-none">
        <div className="p-6 rounded-full bg-primary/10">
          <CloudUpload className="w-16 h-16 text-primary" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold">
            {isAnalyzing ? "Analyzing image..." : multiple ? "Upload images" : "Upload an image"}
          </h3>
          <p className="text-muted-foreground">
            Drag and drop or click to select{multiple ? " (multiple files supported)" : ""}
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
