import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, HelpCircle, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { useHasGridSize, useHasFormat } from "@/lib/tier-utils";

interface LutControlsProps {
  intensity: number;
  onIntensityChange: (value: number) => void;
  gridSize: "17" | "33" | "65";
  onGridSizeChange: (value: "17" | "33" | "65") => void;
  format: "cube" | "3dl" | "lut" | "look" | "xmp" | "dctl";
  onFormatChange: (value: "cube" | "3dl" | "lut" | "look" | "xmp" | "dctl") => void;
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
  const { user } = useAuth();
  const isPro = user?.tier === "pro" || user?.tier === "studio";
  const isCreator = user?.tier === "creator" || user?.tier === "pro" || user?.tier === "studio";
  const hasGrid33 = useHasGridSize(33);
  const hasGrid65 = useHasGridSize(65);
  const hasFormat3dl = useHasFormat('3dl');
  const hasFormatLut = useHasFormat('lut');
  const hasFormatLook = useHasFormat('look');
  const hasFormatXmp = useHasFormat('xmp');
  const hasFormatDctl = useHasFormat('dctl');

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

        {/* Grid Size */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label>Grid Size</Label>
            {(!hasGrid33 || !hasGrid65) && (
              <Badge variant="outline" className="text-xs">
                <Crown className="w-3 h-3 mr-1" />
                {!hasGrid33 ? 'Creator+' : 'Pro'}
              </Badge>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>Number of color points in the LUT. Higher values create smoother gradients but larger files.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <RadioGroup
            value={gridSize}
            onValueChange={(value) => onGridSizeChange(value as "17" | "33" | "65")}
          >
            {/* 17×17×17 - Available to all tiers */}
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="17" id="grid-17" data-testid="radio-grid-17" />
              <Label htmlFor="grid-17" className="font-normal cursor-pointer">
                17×17×17 <span className="text-muted-foreground">(Standard - Free)</span>
              </Label>
            </div>
            
            {/* 33×33×33 - Available to Creator, Pro, Studio */}
            {hasGrid33 ? (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="33" id="grid-33" data-testid="radio-grid-33" />
                <Label htmlFor="grid-33" className="font-normal cursor-pointer">
                  33×33×33 <span className="text-muted-foreground">(High Quality - Creator+)</span>
                </Label>
              </div>
            ) : (
              <div className="space-y-2 pl-6 pr-3 py-2 bg-muted/30 rounded-lg border border-dashed">
                <p className="text-xs text-muted-foreground">
                  <Crown className="w-3 h-3 inline mr-1" />
                  33×33×33 grid unlocked at Creator tier
                </p>
              </div>
            )}
            
            {/* 65×65×65 - Available to Pro, Studio only */}
            {hasGrid65 ? (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="65" id="grid-65" data-testid="radio-grid-65" />
                <Label htmlFor="grid-65" className="font-normal cursor-pointer">
                  65×65×65 <span className="text-muted-foreground">(Ultra Quality - Pro)</span>
                </Label>
              </div>
            ) : (
              <div className="space-y-2 pl-6 pr-3 py-2 bg-muted/30 rounded-lg border border-dashed">
                <p className="text-xs text-muted-foreground">
                  <Crown className="w-3 h-3 inline mr-1" />
                  65×65×65 grid unlocked at Pro tier
                </p>
                {!hasGrid33 && (
                  <Link href="/upgrade">
                    <Button variant="outline" size="sm" className="w-full" data-testid="button-upgrade-grid">
                      View Plans
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </RadioGroup>
        </div>

        {/* Format Selector */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label htmlFor="format">Output Format</Label>
            {!isCreator && (
              <Badge variant="outline" className="text-xs">
                <Crown className="w-3 h-3 mr-1" />Creator+
              </Badge>
            )}
            {isCreator && !isPro && (
              <Badge variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />Pro+
              </Badge>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="text-sm">
                  <strong>Free:</strong> .cube only<br/>
                  <strong>Creator:</strong> .cube, .3dl, .look (3 formats)<br/>
                  <strong>Pro:</strong> All formats including .xmp (Lightroom)
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={format} onValueChange={(value) => onFormatChange(value as "cube" | "3dl" | "lut" | "look" | "xmp" | "dctl")}>
            <SelectTrigger id="format" data-testid="select-format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cube">.cube (Standard - All tiers)</SelectItem>
              {hasFormat3dl && <SelectItem value="3dl">.3dl (Creator+ - Autodesk)</SelectItem>}
              {hasFormatLook && <SelectItem value="look">.look (Creator+ - Nuke)</SelectItem>}
              {hasFormatLut && <SelectItem value="lut">.lut (Pro - 1D LUT)</SelectItem>}
              {hasFormatXmp && <SelectItem value="xmp">.xmp (Pro - Lightroom)</SelectItem>}
              {hasFormatDctl && <SelectItem value="dctl">.dctl (Pro - DaVinci Resolve Studio)</SelectItem>}
            </SelectContent>
          </Select>
          {!isCreator && (
            <p className="text-xs text-muted-foreground">
              <Crown className="w-3 h-3 inline mr-1" />
              Upgrade to Creator for 3 export formats (.cube, .3dl, .look)
            </p>
          )}
          {isCreator && !isPro && (
            <p className="text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Upgrade to Pro for all formats including .lut and .xmp (Lightroom presets)
            </p>
          )}
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
                <p>Higher bit depth reduces banding and preserves subtle color transitions. Use 10-bit or 12-bit for professional work.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={precision} onValueChange={(value) => onPrecisionChange(value as "8" | "10" | "12")}>
            <SelectTrigger id="precision" data-testid="select-precision">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8-bit (256 colors/channel)</SelectItem>
              <SelectItem value="10">10-bit (1024 colors/channel)</SelectItem>
              <SelectItem value="12">12-bit (4096 colors/channel)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Export Preview Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="export-preview"
            checked={exportPreview}
            onCheckedChange={onExportPreviewChange}
            data-testid="checkbox-export-preview"
          />
          <Label 
            htmlFor="export-preview" 
            className="font-normal cursor-pointer text-sm"
          >
            Export preview image with LUT
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p>Download a preview image showing the LUT effect alongside the LUT file for reference.</p>
            </TooltipContent>
          </Tooltip>
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
