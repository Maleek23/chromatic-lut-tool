import { useCallback, useState, useRef, useId, useEffect } from "react";
import { CloudUpload, Image as ImageIcon, Sparkles, Loader2, Zap, Palette, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
  multiple?: boolean;
}

export function UploadZone({ onImageUpload, isAnalyzing, multiple = false }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

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
      ref={containerRef}
      className={`
        relative min-h-[500px] border-2 rounded-3xl overflow-hidden
        transition-all duration-500 flex flex-col items-center justify-center
        cursor-pointer group
        ${
          isDragging
            ? "border-primary shadow-2xl shadow-primary/30 scale-[1.02]"
            : "border-border/30 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
        }
        ${isAnalyzing ? "pointer-events-none" : ""}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isAnalyzing && inputRef.current?.click()}
      data-testid="upload-zone"
    >
      {/* Subtle minimal background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(var(--primary-rgb, 23, 23, 23), 0.04) 0%, transparent 50%),
              linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)
            `,
            transition: 'background 0.5s ease',
          }}
        />
        
        {/* Subtle animated orb */}
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-foreground/5 rounded-full blur-3xl transition-all duration-1000 ${isDragging ? 'scale-125 opacity-100' : 'scale-100 opacity-40'}`} 
          style={{ 
            animation: isDragging ? 'none' : 'float 8s ease-in-out infinite',
          }} 
        />
        
        {/* Minimal grid overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${isDragging ? 'opacity-20' : 'opacity-0'}`}
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Scan line effect when analyzing */}
        {isAnalyzing && (
          <div 
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              animation: 'scan 2s linear infinite',
            }}
          />
        )}
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

      <div className="flex flex-col items-center gap-8 pointer-events-none relative z-10 px-6 max-w-2xl">
        {/* Minimal icon container */}
        <div className={`
          relative transition-all duration-500 ease-out
          ${isDragging ? 'scale-105' : 'group-hover:scale-102'}
        `}>
          {/* Subtle outer glow */}
          <div className={`absolute inset-0 rounded-full transition-all duration-700 ${isDragging || isAnalyzing ? 'opacity-100 scale-125' : 'opacity-0 scale-100'}`}>
            <div className="absolute inset-0 rounded-full bg-foreground/10 blur-2xl" />
          </div>
          
          {/* Clean icon container */}
          <div className={`
            relative p-10 rounded-full
            bg-card border border-border
            transition-all duration-300
            ${isAnalyzing ? 'animate-pulse' : ''}
            ${isDragging ? 'border-foreground/20 bg-muted' : ''}
          `}>
            {/* Icon */}
            <div className="relative z-10">
              {isAnalyzing ? (
                <Loader2 className="w-24 h-24 text-foreground animate-spin" />
              ) : isDragging ? (
                <Sparkles className="w-24 h-24 text-foreground" />
              ) : (
                <CloudUpload className="w-24 h-24 text-foreground/70 transition-all group-hover:text-foreground group-hover:-translate-y-1" />
              )}
            </div>
          </div>
        </div>

        {/* Clean minimal text */}
        <div className="text-center space-y-4">
          <h3 className={`
            text-4xl md:text-5xl font-bold transition-all duration-300 text-foreground
            ${isDragging ? 'scale-102' : ''}
          `}>
            {isAnalyzing ? (
              <span className="inline-flex items-center gap-3">
                <Wand2 className="w-10 h-10 text-foreground animate-spin" />
                Extracting Colors
              </span>
            ) : isDragging ? (
              "Drop to Analyze"
            ) : multiple ? (
              "Upload Images"
            ) : (
              "Upload Reference Image"
            )}
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            {isAnalyzing 
              ? "Analyzing with professional color science algorithms" 
              : isDragging
              ? "Release to extract color grading"
              : `Drag and drop ${multiple ? "images" : "your image"} here, or click to browse`
            }
          </p>
        </div>

        {/* File Formats & CTA */}
        {!isAnalyzing && (
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Format badges with stagger animation */}
            <div className="flex flex-wrap gap-3 justify-center">
              {['JPG', 'PNG', 'HEIC', 'WEBP', 'TIFF'].map((format, i) => (
                <Badge 
                  key={format}
                  variant="secondary" 
                  className={`
                    font-mono text-sm px-4 py-1.5 
                    transition-all duration-300 hover-elevate
                    ${isDragging ? 'scale-110 border-primary/50' : ''}
                  `}
                  style={{
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  {format}
                </Badge>
              ))}
            </div>
            
            {/* Clean CTA button */}
            <Button 
              size="lg" 
              variant="default"
              className="pointer-events-auto mt-2 text-lg px-10 py-6"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              data-testid="button-select-file"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">Select Image</span>
            </Button>

            {/* Subtle hint text */}
            <p className="text-sm text-muted-foreground/60 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Professional color grading in seconds
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
