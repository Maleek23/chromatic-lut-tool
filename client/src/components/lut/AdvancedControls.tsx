import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings2, Palette, HelpCircle } from "lucide-react";
import type { AdvancedControls as AdvancedControlsType } from "@shared/schema";

interface AdvancedControlsProps {
  controls: AdvancedControlsType;
  onChange: (controls: AdvancedControlsType) => void;
}

export function AdvancedControls({ controls, onChange }: AdvancedControlsProps) {
  const updateZone = (
    zone: "shadows" | "midtones" | "highlights",
    key: "brightness" | "saturation" | "hue",
    value: number
  ) => {
    onChange({
      ...controls,
      [zone]: {
        ...controls[zone],
        [key]: value,
      },
    });
  };

  const updateTemperature = (value: number) => {
    onChange({ ...controls, temperature: value });
  };

  const updateTint = (value: number) => {
    onChange({ ...controls, tint: value });
  };

  const updateSplitToning = (
    key: "shadowColor" | "highlightColor" | "balance",
    value: string | number
  ) => {
    onChange({
      ...controls,
      splitToning: {
        ...controls.splitToning,
        [key]: value,
      },
    });
  };

  return (
    <Card className="p-4" data-testid="card-advanced-controls">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="w-4 h-4 text-primary" data-testid="icon-settings" />
        <h3 className="text-sm font-medium">Advanced Controls</h3>
      </div>

      <Tabs defaultValue="zones" className="w-full">
        <TabsList className="grid w-full grid-cols-2" data-testid="tabs-advanced">
          <TabsTrigger value="zones" data-testid="tab-zones">Zones</TabsTrigger>
          <TabsTrigger value="color" data-testid="tab-color">Color</TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="space-y-4 mt-4">
          {/* Shadows */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold">Shadows</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Brightness</span>
                <span className="text-xs font-mono" data-testid="value-shadows-brightness">
                  {controls.shadows.brightness}
                </span>
              </div>
              <Slider
                value={[controls.shadows.brightness]}
                onValueChange={([value]) => updateZone("shadows", "brightness", value)}
                min={-100}
                max={100}
                step={1}
                data-testid="slider-shadows-brightness"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Saturation</span>
                <span className="text-xs font-mono" data-testid="value-shadows-saturation">
                  {controls.shadows.saturation}
                </span>
              </div>
              <Slider
                value={[controls.shadows.saturation]}
                onValueChange={([value]) => updateZone("shadows", "saturation", value)}
                min={-100}
                max={100}
                step={1}
                data-testid="slider-shadows-saturation"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Hue</span>
                <span className="text-xs font-mono" data-testid="value-shadows-hue">
                  {controls.shadows.hue}°
                </span>
              </div>
              <Slider
                value={[controls.shadows.hue]}
                onValueChange={([value]) => updateZone("shadows", "hue", value)}
                min={-180}
                max={180}
                step={1}
                data-testid="slider-shadows-hue"
              />
            </div>
          </div>

          {/* Midtones */}
          <div className="space-y-3 pt-3 border-t border-border">
            <Label className="text-xs font-semibold">Midtones</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Brightness</span>
                <span className="text-xs font-mono" data-testid="value-midtones-brightness">
                  {controls.midtones.brightness}
                </span>
              </div>
              <Slider
                value={[controls.midtones.brightness]}
                onValueChange={([value]) => updateZone("midtones", "brightness", value)}
                min={-100}
                max={100}
                step={1}
                data-testid="slider-midtones-brightness"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Saturation</span>
                <span className="text-xs font-mono" data-testid="value-midtones-saturation">
                  {controls.midtones.saturation}
                </span>
              </div>
              <Slider
                value={[controls.midtones.saturation]}
                onValueChange={([value]) => updateZone("midtones", "saturation", value)}
                min={-100}
                max={100}
                step={1}
                data-testid="slider-midtones-saturation"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Hue</span>
                <span className="text-xs font-mono" data-testid="value-midtones-hue">
                  {controls.midtones.hue}°
                </span>
              </div>
              <Slider
                value={[controls.midtones.hue]}
                onValueChange={([value]) => updateZone("midtones", "hue", value)}
                min={-180}
                max={180}
                step={1}
                data-testid="slider-midtones-hue"
              />
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-3 pt-3 border-t border-border">
            <Label className="text-xs font-semibold">Highlights</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Brightness</span>
                <span className="text-xs font-mono" data-testid="value-highlights-brightness">
                  {controls.highlights.brightness}
                </span>
              </div>
              <Slider
                value={[controls.highlights.brightness]}
                onValueChange={([value]) => updateZone("highlights", "brightness", value)}
                min={-100}
                max={100}
                step={1}
                data-testid="slider-highlights-brightness"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Saturation</span>
                <span className="text-xs font-mono" data-testid="value-highlights-saturation">
                  {controls.highlights.saturation}
                </span>
              </div>
              <Slider
                value={[controls.highlights.saturation]}
                onValueChange={([value]) => updateZone("highlights", "saturation", value)}
                min={-100}
                max={100}
                step={1}
                data-testid="slider-highlights-saturation"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Hue</span>
                <span className="text-xs font-mono" data-testid="value-highlights-hue">
                  {controls.highlights.hue}°
                </span>
              </div>
              <Slider
                value={[controls.highlights.hue]}
                onValueChange={([value]) => updateZone("highlights", "hue", value)}
                min={-180}
                max={180}
                step={1}
                data-testid="slider-highlights-hue"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="color" className="space-y-4 mt-4">
          {/* Temperature */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Label className="text-xs">Temperature</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Shift colors toward warm (orange/yellow) or cool (blue) tones.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-xs font-mono" data-testid="value-temperature">
                {controls.temperature}
              </span>
            </div>
            <Slider
              value={[controls.temperature]}
              onValueChange={([value]) => updateTemperature(value)}
              min={-100}
              max={100}
              step={1}
              data-testid="slider-temperature"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Cool</span>
              <span>Warm</span>
            </div>
          </div>

          {/* Tint */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Label className="text-xs">Tint</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>Adjust the green-magenta color balance to remove color casts.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <span className="text-xs font-mono" data-testid="value-tint">
                {controls.tint}
              </span>
            </div>
            <Slider
              value={[controls.tint]}
              onValueChange={([value]) => updateTint(value)}
              min={-100}
              max={100}
              step={1}
              data-testid="slider-tint"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Green</span>
              <span>Magenta</span>
            </div>
          </div>

          {/* Split Toning */}
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Palette className="w-3 h-3" />
              <Label className="text-xs font-semibold">Split Toning</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3 h-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p>Add different colors to shadows and highlights separately for creative toning effects.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Shadow Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={controls.splitToning.shadowColor}
                  onChange={(e) => updateSplitToning("shadowColor", e.target.value)}
                  className="w-16 h-9 p-1 cursor-pointer"
                  data-testid="input-shadow-color"
                />
                <Input
                  type="text"
                  value={controls.splitToning.shadowColor}
                  onChange={(e) => updateSplitToning("shadowColor", e.target.value)}
                  className="flex-1 font-mono text-xs"
                  data-testid="input-shadow-color-text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Highlight Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={controls.splitToning.highlightColor}
                  onChange={(e) => updateSplitToning("highlightColor", e.target.value)}
                  className="w-16 h-9 p-1 cursor-pointer"
                  data-testid="input-highlight-color"
                />
                <Input
                  type="text"
                  value={controls.splitToning.highlightColor}
                  onChange={(e) => updateSplitToning("highlightColor", e.target.value)}
                  className="flex-1 font-mono text-xs"
                  data-testid="input-highlight-color-text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Balance</Label>
                <span className="text-xs font-mono" data-testid="value-split-balance">
                  {controls.splitToning.balance}
                </span>
              </div>
              <Slider
                value={[controls.splitToning.balance]}
                onValueChange={([value]) => updateSplitToning("balance", value)}
                min={0}
                max={100}
                step={1}
                data-testid="slider-split-balance"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
