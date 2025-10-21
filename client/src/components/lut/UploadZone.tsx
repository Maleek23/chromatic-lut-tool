import { useCallback, useState, useRef, useId, useEffect } from "react";
import { CloudUpload, Image as ImageIcon, Sparkles, Loader2, Zap, Palette, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColorParticles } from "@/components/visual/ColorParticles";

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
      {/* Cinematic background with color science accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated color particles */}
        <ColorParticles count={20} speed={0.3} />
        
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(var(--primary-rgb), 0.08) 0%, transparent 50%),
              radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(var(--chart-2-rgb), 0.05) 0%, transparent 50%),
              linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)
            `,
            transition: 'background 0.4s ease',
          }}
        />
        
        {/* Color science spectrum orbs */}
        <div className={`absolute top-1/4 right-1/3 w-72 h-72 bg-primary/15 rounded-full blur-3xl transition-all duration-1000 ${isDragging ? 'scale-140 opacity-100' : 'scale-100 opacity-50'}`} 
          style={{ 
            animation: isDragging ? 'pulse 2s ease-in-out infinite' : 'float 7s ease-in-out infinite',
          }} 
        />
        <div className={`absolute bottom-1/3 left-1/4 w-64 h-64 bg-chart-2/12 rounded-full blur-3xl transition-all duration-1000 ${isDragging ? 'scale-140 opacity-100' : 'scale-100 opacity-40'}`} 
          style={{ 
            animation: isDragging ? 'pulse 2s ease-in-out infinite 0.5s' : 'float 9s ease-in-out infinite 1s',
          }} 
        />
        
        {/* Sophisticated grid overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${isDragging ? 'opacity-25' : 'opacity-0'}`}
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.15) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
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
        {/* Cinema-grade icon with color accents */}
        <div className={`
          relative transition-all duration-600 ease-out
          ${isDragging ? 'scale-110 -rotate-3' : 'group-hover:scale-105'}
        `}>
          {/* Cinematic glow rings */}
          <div className={`absolute inset-0 rounded-full transition-all duration-700 ${isDragging || isAnalyzing ? 'opacity-100 scale-140' : 'opacity-0 scale-100'}`}>
            <div className="absolute inset-0 rounded-full bg-primary/25 blur-2xl animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-chart-2/15 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          {/* Professional icon container */}
          <div className={`
            relative p-10 rounded-full
            bg-gradient-to-br from-card via-card to-primary/5
            border-2 transition-all duration-400
            ${isAnalyzing ? 'animate-pulse border-primary/40' : ''}
            ${isDragging ? 'border-primary/50 shadow-lg shadow-primary/20' : 'border-border'}
          `}>
            {/* Subtle inner glow */}
            <div className={`absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 to-chart-2/5 blur-xl transition-opacity ${isDragging || isAnalyzing ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Icon */}
            <div className="relative z-10">
              {isAnalyzing ? (
                <Loader2 className="w-24 h-24 text-primary animate-spin" />
              ) : isDragging ? (
                <div className="relative">
                  <Sparkles className="w-24 h-24 text-primary animate-pulse" />
                  <Zap className="absolute top-0 left-0 w-24 h-24 text-chart-2 animate-ping opacity-60" />
                </div>
              ) : (
                <div className="relative">
                  <CloudUpload className="w-24 h-24 text-foreground/60 transition-all group-hover:text-primary group-hover:-translate-y-1" />
                  <Palette className="absolute -bottom-2 -right-2 w-8 h-8 text-chart-2 opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-12" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cinematic typography with subtle gradient */}
        <div className="text-center space-y-4">
          <h3 className={`
            text-4xl md:text-5xl font-bold transition-all duration-300
            bg-gradient-to-r from-foreground via-foreground to-primary/70 bg-clip-text text-transparent
            ${isDragging ? 'scale-105' : ''}
          `}>
            {isAnalyzing ? (
              <span className="inline-flex items-center gap-3">
                <Wand2 className="w-10 h-10 text-primary animate-spin" />
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
              ? "Analyzing with cinema-grade color science algorithms" 
              : isDragging
              ? "Release to extract professional color grading"
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
            
            {/* Cinema-grade CTA button */}
            <Button 
              size="lg" 
              variant="default"
              className={`
                pointer-events-auto mt-2 text-lg px-10 py-6
                bg-gradient-to-r from-primary to-chart-2
                hover:shadow-xl hover:shadow-primary/30 hover:scale-105
                transition-all duration-300 border border-primary/20
                relative overflow-hidden group/btn
              `}
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              data-testid="button-select-file"
            >
              {/* Subtle shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              
              <ImageIcon className="w-5 h-5 mr-2" />
              <span className="font-semibold">Select Image</span>
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
