import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
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
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-card rounded-lg overflow-hidden border border-card-border"
      data-testid="comparison-slider"
    >
      {/* Original Image (Right Side) */}
      <div className="absolute inset-0">
        <img
          src={previewImage}
          alt="Preview with LUT"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Clipped Original (Left Side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={originalImage}
          alt="Original"
          className="w-full h-full object-contain"
          style={{ width: "100vw", maxWidth: containerRef.current?.clientWidth }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full p-2 shadow-lg">
          <MoveHorizontal className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium">
        Original
      </div>
      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium">
        Preview
      </div>
    </div>
  );
}
