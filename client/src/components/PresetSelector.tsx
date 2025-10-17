import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sparkles, Save, Trash2 } from "lucide-react";
import { getAllPresets, saveCustomPreset, deleteCustomPreset } from "@shared/presets";
import type { Preset } from "@shared/schema";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PresetSelectorProps {
  selectedPresetId?: string;
  onSelectPreset: (presetId: string) => void;
  currentSettings?: Partial<Preset>;
}

export function PresetSelector({
  selectedPresetId,
  onSelectPreset,
  currentSettings,
}: PresetSelectorProps) {
  const [presets, setPresets] = useState(getAllPresets());
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState("");

  const handleSavePreset = () => {
    if (!presetName || !currentSettings) return;

    const newPreset: Preset = {
      id: `custom-${Date.now()}`,
      name: presetName,
      description: "Custom preset",
      controls: currentSettings.controls || {
        shadows: { brightness: 0, saturation: 0, hue: 0 },
        midtones: { brightness: 0, saturation: 0, hue: 0 },
        highlights: { brightness: 0, saturation: 0, hue: 0 },
        temperature: 0,
        tint: 0,
        splitToning: {
          shadowColor: "#000000",
          highlightColor: "#ffffff",
          balance: 50,
        },
      },
      intensity: currentSettings.intensity || 100,
      isCustom: true,
    };

    saveCustomPreset(newPreset);
    setPresets(getAllPresets());
    setSaveDialogOpen(false);
    setPresetName("");
  };

  const handleDeletePreset = (id: string) => {
    deleteCustomPreset(id);
    setPresets(getAllPresets());
    if (selectedPresetId === id) {
      onSelectPreset("");
    }
  };

  return (
    <Card className="p-4" data-testid="card-presets">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" data-testid="icon-sparkles" />
          <h3 className="text-sm font-medium">Presets</h3>
        </div>
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="sm" 
              variant="outline" 
              data-testid="button-save-preset"
            >
              <Save className="w-3 h-3 mr-1" />
              Save
            </Button>
          </DialogTrigger>
          <DialogContent data-testid="dialog-save-preset">
            <DialogHeader>
              <DialogTitle>Save Custom Preset</DialogTitle>
              <DialogDescription>
                Save your current settings as a reusable preset
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="preset-name">Preset Name</Label>
                <Input
                  id="preset-name"
                  data-testid="input-preset-name"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="My Custom Look"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSavePreset}
                disabled={!presetName}
                data-testid="button-confirm-save-preset"
              >
                Save Preset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-3">
          <Button
            variant={!selectedPresetId ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectPreset("")}
            className="shrink-0"
            data-testid="button-preset-none"
          >
            None
          </Button>
          {presets.map((preset) => (
            <div key={preset.id} className="relative shrink-0">
              <Button
                variant={selectedPresetId === preset.id ? "default" : "outline"}
                size="sm"
                onClick={() => onSelectPreset(preset.id)}
                className="relative"
                data-testid={`button-preset-${preset.id}`}
              >
                {preset.name}
              </Button>
              {preset.isCustom && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePreset(preset.id);
                  }}
                  data-testid={`button-delete-preset-${preset.id}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {selectedPresetId && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {presets.find((p) => p.id === selectedPresetId)?.description}
          </p>
        </div>
      )}
    </Card>
  );
}
