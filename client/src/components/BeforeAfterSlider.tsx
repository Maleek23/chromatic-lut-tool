import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After"
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState([50]);

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-video rounded-md overflow-hidden border bg-muted" data-testid="before-after-slider">
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-contain"
        />
        
        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition[0]}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
          style={{ left: `${sliderPosition[0]}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-primary-foreground" />
              <div className="w-0.5 h-4 bg-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-md text-sm font-medium border">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-md text-sm font-medium border">
          {afterLabel}
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{beforeLabel}</span>
          <span>{afterLabel}</span>
        </div>
        <Slider
          value={sliderPosition}
          onValueChange={setSliderPosition}
          min={0}
          max={100}
          step={1}
          className="w-full"
          data-testid="slider-before-after"
        />
      </div>
    </div>
  );
}
