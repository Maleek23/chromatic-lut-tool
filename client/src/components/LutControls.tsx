import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LutControlsProps {
  intensity: number;
  onIntensityChange: (value: number) => void;
  gridSize: "17" | "33" | "65";
  onGridSizeChange: (value: "17" | "33" | "65") => void;
  format: "cube" | "3dl";
  onFormatChange: (value: "cube" | "3dl") => void;
  onGenerate: () => void;
  isGenerating: boolean;
  hideGenerate?: boolean;
}

export function LutControls({
  intensity,
  onIntensityChange,
  gridSize,
  onGridSizeChange,
  format,
  onFormatChange,
  onGenerate,
  isGenerating,
  hideGenerate = false,
}: LutControlsProps) {
  return (
    <Card>
      <CardHeader className="space-y-0 pb-4">
        <CardTitle className="text-lg">LUT Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Intensity Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="intensity">Intensity</Label>
            <span className="text-sm font-mono text-muted-foreground" data-testid="text-intensity">
              {intensity}%
            </span>
          </div>
          <Slider
            id="intensity"
            min={0}
            max={100}
            step={1}
            value={[intensity]}
            onValueChange={([value]) => onIntensityChange(value)}
            data-testid="slider-intensity"
          />
        </div>

        {/* Grid Size */}
        <div className="space-y-3">
          <Label>Grid Size</Label>
          <RadioGroup
            value={gridSize}
            onValueChange={(value) => onGridSizeChange(value as "17" | "33" | "65")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="17" id="grid-17" data-testid="radio-grid-17" />
              <Label htmlFor="grid-17" className="font-normal cursor-pointer">
                17×17×17 <span className="text-muted-foreground">(Fast)</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="33" id="grid-33" data-testid="radio-grid-33" />
              <Label htmlFor="grid-33" className="font-normal cursor-pointer">
                33×33×33 <span className="text-muted-foreground">(Balanced)</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="65" id="grid-65" data-testid="radio-grid-65" />
              <Label htmlFor="grid-65" className="font-normal cursor-pointer">
                65×65×65 <span className="text-muted-foreground">(Quality)</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Format Selector */}
        <div className="space-y-3">
          <Label htmlFor="format">Output Format</Label>
          <Select value={format} onValueChange={(value) => onFormatChange(value as "cube" | "3dl")}>
            <SelectTrigger id="format" data-testid="select-format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cube">.cube (Standard)</SelectItem>
              <SelectItem value="3dl">.3dl (Autodesk)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        {!hideGenerate && (
          <Button
            className="w-full"
            size="lg"
            onClick={onGenerate}
            disabled={isGenerating}
            data-testid="button-generate"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating LUT...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate LUT
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
