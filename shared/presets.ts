import { Preset } from "./schema";

export const BUILTIN_PRESETS: Preset[] = [
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Hollywood blockbuster look with teal shadows and orange highlights",
    intensity: 75,
    isCustom: false,
    controls: {
      shadows: { brightness: -10, saturation: 20, hue: 180 },
      midtones: { brightness: 5, saturation: 10, hue: 0 },
      highlights: { brightness: 10, saturation: 15, hue: 30 },
      temperature: 15,
      tint: -5,
      splitToning: {
        shadowColor: "#0a4f5c",
        highlightColor: "#ff8c42",
        balance: 55,
      },
    },
  },
  {
    id: "vintage",
    name: "Vintage",
    description: "Classic film photography with warm tones and faded colors",
    intensity: 85,
    isCustom: false,
    controls: {
      shadows: { brightness: 15, saturation: -20, hue: 20 },
      midtones: { brightness: 0, saturation: -15, hue: 15 },
      highlights: { brightness: -5, saturation: -10, hue: 25 },
      temperature: 25,
      tint: 10,
      splitToning: {
        shadowColor: "#5c4a3a",
        highlightColor: "#f4e8d0",
        balance: 45,
      },
    },
  },
  {
    id: "film-noir",
    name: "Film Noir",
    description: "Classic black and white with high contrast",
    intensity: 90,
    isCustom: false,
    controls: {
      shadows: { brightness: -25, saturation: -100, hue: 0 },
      midtones: { brightness: 0, saturation: -100, hue: 0 },
      highlights: { brightness: 20, saturation: -100, hue: 0 },
      temperature: 0,
      tint: 0,
      splitToning: {
        shadowColor: "#000000",
        highlightColor: "#ffffff",
        balance: 50,
      },
    },
  },
  {
    id: "warm-sunset",
    name: "Warm Sunset",
    description: "Golden hour warmth with enhanced oranges and yellows",
    intensity: 70,
    isCustom: false,
    controls: {
      shadows: { brightness: -5, saturation: 15, hue: 25 },
      midtones: { brightness: 10, saturation: 25, hue: 20 },
      highlights: { brightness: 15, saturation: 20, hue: 15 },
      temperature: 40,
      tint: 5,
      splitToning: {
        shadowColor: "#8b4513",
        highlightColor: "#ffcc66",
        balance: 60,
      },
    },
  },
  {
    id: "cool-blue",
    name: "Cool Blue",
    description: "Modern cool tones with enhanced blues and cyans",
    intensity: 65,
    isCustom: false,
    controls: {
      shadows: { brightness: 0, saturation: 20, hue: -100 },
      midtones: { brightness: 5, saturation: 15, hue: -80 },
      highlights: { brightness: 10, saturation: 10, hue: -60 },
      temperature: -30,
      tint: -10,
      splitToning: {
        shadowColor: "#1a3a52",
        highlightColor: "#a8d8ea",
        balance: 45,
      },
    },
  },
  {
    id: "vibrant",
    name: "Vibrant",
    description: "Punchy saturated colors for social media",
    intensity: 80,
    isCustom: false,
    controls: {
      shadows: { brightness: -10, saturation: 40, hue: 0 },
      midtones: { brightness: 5, saturation: 50, hue: 0 },
      highlights: { brightness: 10, saturation: 35, hue: 0 },
      temperature: 10,
      tint: 0,
      splitToning: {
        shadowColor: "#1a1a1a",
        highlightColor: "#ffffff",
        balance: 50,
      },
    },
  },
  {
    id: "matte",
    name: "Matte",
    description: "Lifted blacks and faded colors for a modern look",
    intensity: 75,
    isCustom: false,
    controls: {
      shadows: { brightness: 25, saturation: -25, hue: 0 },
      midtones: { brightness: 5, saturation: -15, hue: 0 },
      highlights: { brightness: -10, saturation: -20, hue: 0 },
      temperature: 5,
      tint: -5,
      splitToning: {
        shadowColor: "#3a3a3a",
        highlightColor: "#e0e0e0",
        balance: 50,
      },
    },
  },
  {
    id: "portrait",
    name: "Portrait",
    description: "Flattering skin tones with soft highlights",
    intensity: 60,
    isCustom: false,
    controls: {
      shadows: { brightness: 5, saturation: -10, hue: 15 },
      midtones: { brightness: 10, saturation: 5, hue: 10 },
      highlights: { brightness: 15, saturation: -5, hue: 5 },
      temperature: 20,
      tint: 5,
      splitToning: {
        shadowColor: "#4a3a2a",
        highlightColor: "#ffeedd",
        balance: 55,
      },
    },
  },
];

// Helper to get preset by ID (checks both builtin and custom)
export function getPresetById(id: string): Preset | undefined {
  // Check builtin presets first
  const builtinPreset = BUILTIN_PRESETS.find((p) => p.id === id);
  if (builtinPreset) return builtinPreset;
  
  // Check custom presets
  const customPresets = getCustomPresets();
  return customPresets.find((p) => p.id === id);
}

// Helper to get all presets (builtin + custom from localStorage)
export function getAllPresets(): Preset[] {
  const customPresets = getCustomPresets();
  return [...BUILTIN_PRESETS, ...customPresets];
}

// Get custom presets from localStorage
export function getCustomPresets(): Preset[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem("custom_presets");
    if (!stored) return [];
    return JSON.parse(stored) as Preset[];
  } catch {
    return [];
  }
}

// Save custom preset to localStorage
export function saveCustomPreset(preset: Preset): void {
  if (typeof window === "undefined") return;
  
  try {
    const customPresets = getCustomPresets();
    const existingIndex = customPresets.findIndex((p) => p.id === preset.id);
    
    if (existingIndex >= 0) {
      customPresets[existingIndex] = preset;
    } else {
      customPresets.push(preset);
    }
    
    localStorage.setItem("custom_presets", JSON.stringify(customPresets));
  } catch (error) {
    console.error("Failed to save custom preset:", error);
  }
}

// Delete custom preset
export function deleteCustomPreset(id: string): void {
  if (typeof window === "undefined") return;
  
  try {
    const customPresets = getCustomPresets();
    const filtered = customPresets.filter((p) => p.id !== id);
    localStorage.setItem("custom_presets", JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete custom preset:", error);
  }
}
