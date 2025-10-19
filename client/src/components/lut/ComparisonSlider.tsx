import { useState, useRef, useEffect } from "react";
import { MoveHorizontal, MoveVertical, SplitSquareHorizontal, Maximize, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ComparisonSliderProps {
  originalImage: string;
  previewImage: string;
}

export function ComparisonSlider({
  originalImage,
  previewImage,
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<"slider" | "side-by-side">("slider");
  const [splitDirection, setSplitDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [showOriginal, setShowOriginal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    if (splitDirection === "horizontal") {
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    } else {
      const y = e.clientY - rect.top;
      const percentage = (y / rect.height) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    if (splitDirection === "horizontal") {
      const x = e.touches[0].clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    } else {
      const y = e.touches[0].clientY - rect.top;
      const percentage = (y / rect.height) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    }
  };

  const handlePanStart = (e: React.MouseEvent) => {
    // Don't start panning if clicking on the slider handle
    const target = e.target as HTMLElement;
    if (target.closest('[data-slider-handle]')) {
      return;
    }
    
    if (zoom > 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handlePanMove = (e: MouseEvent) => {
    if (isPanning && zoom > 1) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPan({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleSplitDirection = () => {
    setSplitDirection(prev => prev === "horizontal" ? "vertical" : "horizontal");
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === "slider" ? "side-by-side" : "slider");
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging, splitDirection]);

  useEffect(() => {
    if (isPanning) {
      window.addEventListener("mousemove", handlePanMove);
      window.addEventListener("mouseup", handlePanEnd);
      return () => {
        window.removeEventListener("mousemove", handlePanMove);
        window.removeEventListener("mouseup", handlePanEnd);
      };
    }
  }, [isPanning, panStart]);

  // Keyboard shortcut for toggling original/preview
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        setShowOriginal(true);
      }
    };

    const handleKeyRelease = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setShowOriginal(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }, []);

  const imageStyle = {
    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
    cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "slider" ? "default" : "outline"}
                  size="sm"
                  onClick={toggleViewMode}
                  data-testid="button-toggle-view-mode"
                >
                  {viewMode === "slider" ? <MoveHorizontal className="h-4 w-4 mr-2" /> : <SplitSquareHorizontal className="h-4 w-4 mr-2" />}
                  {viewMode === "slider" ? "Slider" : "Side-by-Side"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle view mode</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {viewMode === "slider" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSplitDirection}
                    data-testid="button-toggle-split-direction"
                  >
                    {splitDirection === "horizontal" ? <MoveHorizontal className="h-4 w-4 mr-2" /> : <MoveVertical className="h-4 w-4 mr-2" />}
                    {splitDirection === "horizontal" ? "Horizontal" : "Vertical"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle split direction</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  data-testid="button-zoom-in"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  data-testid="button-zoom-out"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom out</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetZoom}
                  disabled={zoom === 1}
                  data-testid="button-reset-zoom"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset zoom</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm text-muted-foreground font-mono">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      {viewMode === "side-by-side" ? (
        <div className="grid grid-cols-2 gap-4">
          {/* Original */}
          <div className="relative w-full aspect-video bg-card rounded-lg overflow-hidden border border-card-border">
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden"
              onMouseDown={handlePanStart}
            >
              <img
                src={originalImage}
                alt="Original"
                className="max-w-full max-h-full object-contain transition-transform"
                style={imageStyle}
                data-testid="img-original"
              />
            </div>
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium">
              Original
            </div>
          </div>

          {/* Preview */}
          <div className="relative w-full aspect-video bg-card rounded-lg overflow-hidden border border-card-border">
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden"
              onMouseDown={handlePanStart}
            >
              <img
                src={previewImage}
                alt="Preview with LUT"
                className="max-w-full max-h-full object-contain transition-transform"
                style={imageStyle}
                data-testid="img-preview"
              />
            </div>
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium">
              Preview
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative w-full aspect-video bg-card rounded-lg overflow-hidden border border-card-border"
          data-testid="comparison-slider"
          onMouseDown={handlePanStart}
        >
          {/* Full Image (Original or Preview based on spacebar) */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <img
              src={showOriginal ? originalImage : previewImage}
              alt={showOriginal ? "Original" : "Preview with LUT"}
              className="max-w-full max-h-full object-contain transition-transform"
              style={imageStyle}
            />
          </div>

          {/* Clipped Image for Split View */}
          {!showOriginal && (
            <>
              <div
                className="absolute inset-0 overflow-hidden"
                style={
                  splitDirection === "horizontal"
                    ? { width: `${sliderPosition}%` }
                    : { height: `${sliderPosition}%` }
                }
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full max-h-full object-contain transition-transform"
                    style={imageStyle}
                  />
                </div>
              </div>

              {/* Slider Handle */}
              <div
                data-slider-handle
                className={`absolute ${
                  splitDirection === "horizontal"
                    ? "top-0 bottom-0 w-1 cursor-ew-resize"
                    : "left-0 right-0 h-1 cursor-ns-resize"
                } bg-primary`}
                style={
                  splitDirection === "horizontal"
                    ? { left: `${sliderPosition}%` }
                    : { top: `${sliderPosition}%` }
                }
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full p-2 shadow-lg">
                  {splitDirection === "horizontal" ? (
                    <MoveHorizontal className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <MoveVertical className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
              </div>
            </>
          )}

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium">
            Original
          </div>
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium">
            Preview
          </div>

          {showOriginal && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-md text-sm font-medium text-primary-foreground">
              Showing Original (Hold Spacebar)
            </div>
          )}
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Press and hold <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Space</kbd> to temporarily view original
      </div>
    </div>
  );
}
