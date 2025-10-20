import { useCallback, useState, useRef, useId } from "react";
import { CloudUpload, Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";
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
        relative min-h-[450px] border-2 border-dashed rounded-2xl
        transition-all duration-300 flex flex-col items-center justify-center
        cursor-pointer group
        bg-gradient-to-br from-background to-primary/5
        ${
          isDragging
            ? "border-primary bg-primary/15 scale-[1.01] shadow-2xl shadow-primary/20"
            : "border-border/50 hover:border-primary/50 hover:shadow-xl"
        }
        ${isAnalyzing ? "pointer-events-none opacity-75" : ""}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isAnalyzing && inputRef.current?.click()}
      data-testid="upload-zone"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`} />
      </div>

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

      <div className="flex flex-col items-center gap-8 pointer-events-none relative z-10 px-6">
        {/* Icon Container */}
        <div className={`
          relative p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-chart-2/20
          transition-all duration-500
          ${isDragging ? 'scale-110 rotate-3' : 'group-hover:scale-105'}
          ${isAnalyzing ? 'animate-pulse' : ''}
        `}>
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-chart-2/30 blur-xl transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`} />
          
          {isAnalyzing ? (
            <Loader2 className="w-20 h-20 text-primary animate-spin relative z-10" />
          ) : isDragging ? (
            <Sparkles className="w-20 h-20 text-primary relative z-10" />
          ) : (
            <CloudUpload className="w-20 h-20 text-primary relative z-10 transition-transform group-hover:scale-110" />
          )}
        </div>

        {/* Text Content */}
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary/70 bg-clip-text text-transparent">
            {isAnalyzing ? "Extracting Color Science..." : isDragging ? "Drop to Upload" : multiple ? "Upload Images" : "Upload Reference Image"}
          </h3>
          <p className="text-lg text-muted-foreground max-w-md">
            {isAnalyzing 
              ? "Analyzing your image with professional color science algorithms" 
              : isDragging
              ? "Release to start color analysis"
              : `Drag and drop${multiple ? " images" : ""} or click to browse`
            }
          </p>
        </div>

        {/* File Formats */}
        {!isAnalyzing && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="font-mono text-sm px-3 py-1">
                JPG
              </Badge>
              <Badge variant="secondary" className="font-mono text-sm px-3 py-1">
                PNG
              </Badge>
              <Badge variant="secondary" className="font-mono text-sm px-3 py-1">
                HEIC
              </Badge>
              <Badge variant="secondary" className="font-mono text-sm px-3 py-1">
                WEBP
              </Badge>
              <Badge variant="secondary" className="font-mono text-sm px-3 py-1">
                TIFF
              </Badge>
            </div>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              variant="default"
              className="pointer-events-auto mt-2 bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 text-lg px-8"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              data-testid="button-select-file"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Select Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
