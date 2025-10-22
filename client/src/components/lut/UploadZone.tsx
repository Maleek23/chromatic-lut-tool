import { useCallback, useState, useRef, useId } from "react";
import { CloudUpload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
  multiple?: boolean;
}

export function UploadZone({ onImageUpload, isAnalyzing, multiple = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

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
        relative min-h-[280px] border-2 rounded-xl overflow-hidden
        transition-all duration-300 flex flex-col items-center justify-center
        cursor-pointer group
        ${
          isDragging
            ? "border-primary shadow-lg shadow-primary/20"
            : "border-border/30 hover:border-primary/50"
        }
        ${isAnalyzing ? "pointer-events-none" : ""}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isAnalyzing && inputRef.current?.click()}
      data-testid="upload-zone"
    >
      {/* Simple background gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-background via-background to-primary/5" />

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,image/webp,image/tiff,image/tif"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isAnalyzing}
        multiple={multiple}
        data-testid="input-file"
      />

      <div className="flex flex-col items-center gap-4 pointer-events-none relative z-10 px-6 max-w-2xl">
        {/* Compact icon container */}
        <div className={`
          relative p-4 rounded-full
          bg-card border-2 transition-all duration-300
          ${isDragging ? 'border-primary/50 shadow-lg shadow-primary/10' : 'border-border'}
        `}>
          <div className="relative z-10">
            {isAnalyzing ? (
              <Loader2 className="w-12 h-12 text-primary" />
            ) : (
              <CloudUpload className={`w-12 h-12 transition-colors ${isDragging ? 'text-primary' : 'text-foreground/60'}`} />
            )}
          </div>
        </div>

        {/* Compact typography */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold">
            {isAnalyzing ? "Analyzing Image" : isDragging ? "Drop to Analyze" : multiple ? "Upload Images" : "Upload Reference Image"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg">
            {isAnalyzing 
              ? "Processing color science..." 
              : isDragging
              ? "Release to extract color grading"
              : `Drag and drop ${multiple ? "images" : "your image"} here, or click to browse`
            }
          </p>
        </div>

        {/* File formats and button */}
        {!isAnalyzing && (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-wrap gap-2 justify-center">
              {['JPG', 'PNG', 'HEIC', 'WEBP', 'TIFF'].map((format) => (
                <Badge 
                  key={format}
                  variant="secondary" 
                  className="font-mono text-xs px-2 py-0.5"
                >
                  {format}
                </Badge>
              ))}
            </div>
            
            <Button 
              size="sm" 
              variant="default"
              className="pointer-events-auto mt-1"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              data-testid="button-select-file"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              <span>Select Image</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
