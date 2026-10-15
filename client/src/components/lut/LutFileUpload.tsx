import { useCallback, useRef, useState } from "react";
import { Upload, FileType, Loader2, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LutFileUploadProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
  uploadedFile: File | null;
  acceptedFormats?: string[];
}

export function LutFileUpload({ 
  onFileUpload, 
  isProcessing, 
  uploadedFile,
  acceptedFormats = [".cube", ".3dl", ".lut"]
}: LutFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files[0]) {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
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
      if (files[0]) {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  return (
    <div
      className={`
        relative min-h-[320px] border-2 border-dashed rounded-xl
        transition-all duration-300 flex flex-col items-center justify-center
        cursor-pointer group
        bg-gradient-to-br from-background to-chart-2/5
        ${
          isDragging
            ? "border-chart-2 bg-chart-2/15 scale-[1.01] shadow-xl shadow-chart-2/20"
            : "border-border/50 hover:border-chart-2/50 hover:shadow-lg"
        }
        ${isProcessing ? "pointer-events-none opacity-75" : ""}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isProcessing && inputRef.current?.click()}
      data-testid="lut-upload-zone"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br from-chart-2/5 via-transparent to-chart-3/5 transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats.join(",")}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isProcessing}
        data-testid="input-lut-file"
      />

      <div className="flex flex-col items-center gap-6 pointer-events-none relative z-10 px-6">
        {/* Icon Container */}
        {uploadedFile && !isProcessing ? (
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-chart-2/20 transition-all duration-500">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/20 to-chart-2/20 blur-lg" />
            <CheckCircle className="w-16 h-16 text-green-500 relative z-10" />
          </div>
        ) : (
          <div className={`
            relative p-6 rounded-2xl bg-gradient-to-br from-chart-2/20 to-chart-3/20
            transition-all duration-500
            ${isDragging ? 'scale-110 rotate-3' : 'group-hover:scale-105'}
            ${isProcessing ? 'animate-pulse' : ''}
          `}>
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-chart-2/30 to-chart-3/30 blur-lg transition-opacity ${isDragging ? 'opacity-100' : 'opacity-0'}`} />
            
            {isProcessing ? (
              <Loader2 className="w-16 h-16 text-chart-2 animate-spin relative z-10" />
            ) : (
              <FileType className="w-16 h-16 text-chart-2 relative z-10 transition-transform group-hover:scale-110" />
            )}
          </div>
        )}

        {/* Text Content */}
        <div className="text-center space-y-2">
          {uploadedFile && !isProcessing ? (
            <>
              <h3 className="text-2xl font-bold text-foreground">
                {uploadedFile.name}
              </h3>
              <p className="text-base text-muted-foreground">
                Click to select a different file
              </p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-foreground">
                {isProcessing ? "Processing LUT..." : isDragging ? "Drop to Upload" : "Upload LUT File"}
              </h3>
              <p className="text-base text-muted-foreground max-w-sm">
                {isProcessing 
                  ? "Analyzing your LUT file" 
                  : isDragging
                  ? "Release to start processing"
                  : "Drag and drop or click to browse"
                }
              </p>
            </>
          )}
        </div>

        {/* File Formats */}
        {!isProcessing && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {acceptedFormats.map((format) => (
                <Badge key={format} variant="secondary" className="font-mono text-sm px-3 py-1">
                  {format.replace(".", "").toUpperCase()}
                </Badge>
              ))}
            </div>
            
            {!uploadedFile && (
              <Button 
                size="lg" 
                variant="default"
                className="pointer-events-auto mt-1 bg-gradient-to-r from-chart-2 to-chart-3 hover:opacity-90 px-6"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                data-testid="button-select-lut"
              >
                <Upload className="w-5 h-5 mr-2" />
                Select File
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
