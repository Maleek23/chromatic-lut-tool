import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Loader2, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LutControlsProps {
  intensity: number;
  onIntensityChange: (value: number) => void;
  gridSize: "17" | "33" | "65";
  onGridSizeChange: (value: "17" | "33" | "65") => void;
  format: "cube" | "3dl";
  onFormatChange: (value: "cube" | "3dl") => void;
  precision: "8" | "10" | "12";
  onPrecisionChange: (value: "8" | "10" | "12") => void;
  exportPreview: boolean;
  onExportPreviewChange: (value: boolean) => void;
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
  precision,
  onPrecisionChange,
  exportPreview,
  onExportPreviewChange,
  onGenerate,
  isGenerating,
  hideGenerate = false,
}: LutControlsProps) {
  // Community Edition: Always locked to free tier
  // Grid size: 17x17x17 only
  // Format: .cube only

  return (
    <Card>
      <CardHeader className="space-y-0 pb-4">
        <CardTitle className="text-lg">LUT Generation Settings</CardTitle>
        <p className="text-xs text-muted-foreground mt-2">
          Authentic color extraction from your reference image
        </p>
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

        {/* Grid Size - Community Edition: Locked to 17x17x17 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label>Grid Size</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>Number of color points in the LUT. 17×17×17 provides industry-standard quality.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 w-full p-3 rounded-lg bg-muted/30 border">
              <Label htmlFor="grid-17" className="font-normal cursor-default flex-1">
                17×17×17 <span className="text-muted-foreground">(Industry Standard)</span>
              </Label>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Community Edition uses 17×17×17 grid for optimal compatibility across all color grading software.
          </p>
        </div>

        {/* Format Selector - Community Edition: .cube only */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="format">Output Format</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>.cube format is universally supported by DaVinci Resolve, Adobe Premiere Pro, Final Cut Pro, and more.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value="cube" disabled>
            <SelectTrigger id="format" data-testid="select-format">
              <SelectValue placeholder=".cube (Universal)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cube">.cube (Universal)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            .cube format works with all major color grading software including DaVinci Resolve, Premiere Pro, and Final Cut Pro.
          </p>
        </div>

        {/* Precision Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="precision">Color Precision</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>Higher bit depth provides more color accuracy. 10-bit is recommended for most uses.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={precision} onValueChange={(value) => onPrecisionChange(value as "8" | "10" | "12")}>
            <SelectTrigger id="precision" data-testid="select-precision">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8-bit (Standard)</SelectItem>
              <SelectItem value="10">10-bit (Recommended)</SelectItem>
              <SelectItem value="12">12-bit (High Precision)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Export Preview Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="export-preview" 
            checked={exportPreview}
            onCheckedChange={(checked) => onExportPreviewChange(checked as boolean)}
            data-testid="checkbox-export-preview"
          />
          <Label htmlFor="export-preview" className="text-sm font-normal cursor-pointer">
            Generate preview image
          </Label>
        </div>

        {/* Generate Button */}
        {!hideGenerate && (
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full"
            size="lg"
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
