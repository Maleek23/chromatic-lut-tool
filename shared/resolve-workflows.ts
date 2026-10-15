// Editor workflow presets + per-app LUT application recipes.
// Shared between client and server so the UI and API never drift.

export type ResolveStepKind = "edit" | "audio" | "color" | "lut" | "ai" | "delivery";

export interface WorkflowStep {
  label: string;
  detail: string;
  kind: ResolveStepKind;
}

export interface EditorWorkflow {
  id: string;
  name: string;
  description: string;
  /** Suggested page order, e.g. ["Media", "Edit", "Color", "Deliver"] */
  pages: string[];
  steps: WorkflowStep[];
  outputs: string[];
  accent: string;
}

export interface EditorTarget {
  id: string;
  name: string;
  short: string;
  /** Where LUTs live so they show up in the app's LUT browser. */
  lutFolder: string;
  /** Formats this editor can import. */
  acceptsFormats: string[];
  /** Step-by-step way to apply a Chroma LUT. */
  applySteps: string[];
  notes: string[];
}

export const EDITOR_TARGETS: EditorTarget[] = [
  {
    id: "resolve",
    name: "DaVinci Resolve",
    short: "Resolve",
    lutFolder: "macOS: /Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT/  •  Windows: %APPDATA%/Blackmagic Design/DaVinci Resolve/Support/LUT/  •  Linux: ~/.local/share/DaVinciResolve/LUT/",
    acceptsFormats: ["cube", "3dl", "look", "lut"],
    applySteps: [
      "Copy the .cube LUT into the LUT folder so Resolve lists it.",
      "Color page → add a node after your CST / Color Management node.",
      "Right-click the node → LUT → pick the LUT (or drag it from the LUT browser).",
      "Blend with the node Key Output gain, then trim with offset/gain.",
    ],
    notes: [
      "Resolve reads .cube (17/33/65), .3dl, and legacy .look.",
      "For HDR/DWG, keep the LUT display-referred after your CST.",
      "Studio unlocks film grain and halation nodes for extra texture.",
    ],
  },
  {
    id: "premiere",
    name: "Adobe Premiere Pro",
    short: "Premiere",
    lutFolder: "macOS: /Library/Application Support/Adobe/Common/LUTs/Creative/  •  Windows: C:\\Program Files\\Adobe\\Common\\LUTs\\Creative\\",
    acceptsFormats: ["cube", "look"],
    applySteps: [
      "Drop the .cube into the Creative (or Technical) LUTs folder.",
      "Select the clip → Lumetri Color → Basic Correction → Input LUT.",
      "Use Intensity to blend, then push with Creative → Look.",
    ],
    notes: [
      "Premiere's Lumetri reads .cube only.",
      "For log footage, apply a technical input LUT first, then the Chroma look LUT.",
    ],
  },
  {
    id: "aftereffects",
    name: "Adobe After Effects",
    short: "After Effects",
    lutFolder: "Project folder or /Library/Application Support/Adobe/Common/LUTs/",
    acceptsFormats: ["cube", "3dl"],
    applySteps: [
      "Add a Lumetri Color effect to the layer.",
      "Basic Correction → Input LUT → select the Chroma .cube.",
      "Or use Effect → Color Correction → Apply Color LUT.",
    ],
    notes: ["AE reads .cube and .3dl.", "Use 32-bit color and a Color Management pass for wide gamut."],
  },
  {
    id: "finalcut",
    name: "Final Cut Pro",
    short: "Final Cut",
    lutFolder: "~/Movies/Motion Templates.localized/ or add via the Custom LUT effect",
    acceptsFormats: ["cube"],
    applySteps: [
      "Select the clip → Effects → Custom LUT.",
      "Set the LUT to the Chroma .cube (Log or Look processing).",
      "Blend with the effect's Mix/opacity.",
    ],
    notes: ["FCP reads .cube.", "For HDR, use the HDR tools after the LUT."],
  },
  {
    id: "avid",
    name: "Avid Media Composer",
    short: "Avid",
    lutFolder: "Avid LUT folder configured in Source Settings",
    acceptsFormats: ["cube", "3dl"],
    applySteps: [
      "Link the source, then open Source Settings → Color Encoding.",
      "Choose the LUT (cube/3dl) or a Color Adapter.",
      "Refine in the Color Correction workspace.",
    ],
    notes: ["Avid's color adapter supports .cube/.3dl.", "Check the project color space before applying."],
  },
  {
    id: "capcut",
    name: "CapCut / Web Editors",
    short: "CapCut",
    lutFolder: "In-app LUT import (Adjust → LUT → Import)",
    acceptsFormats: ["cube"],
    applySteps: [
      "Adjust → LUT → Import → select the Chroma .cube.",
      "Set the intensity slider to taste.",
    ],
    notes: ["Most consumer editors accept .cube only.", "Use a 33-cube for smooth gradients."],
  },
];

export const EDITOR_WORKFLOWS: EditorWorkflow[] = [
  {
    id: "ugc_ad_cut",
    name: "UGC Ad Cut",
    description: "Cut silences, caption, frame 9:16, warm look with your Chroma LUT, render H.264.",
    pages: ["Media", "Edit", "Fusion", "Color", "Deliver"],
    steps: [
      { label: "Import + sync", detail: "Bring camera/phone clips into a 9:16 timeline.", kind: "edit" },
      { label: "Cut silences", detail: "Remove dead air; or use auto-editor.", kind: "ai" },
      { label: "Captions", detail: "Transcribe with Whisper and import as text/subtitles.", kind: "ai" },
      { label: "Apply Chroma LUT", detail: "Drop the generated .cube after your CST.", kind: "lut" },
      { label: "Render", detail: "H.264, 1080x1920, high quality, AAC 320k.", kind: "delivery" },
    ],
    outputs: ["1080x1920 H.264 MP4", "burned-in or sidecar SRT"],
    accent: "from-primary to-chart-2",
  },
  {
    id: "podcast_cleanup",
    name: "Podcast Cleanup",
    description: "Remove dead air, denoise, normalize loudness, caption, render 16:9.",
    pages: ["Media", "Edit", "Fairlight", "Deliver"],
    steps: [
      { label: "Multicam sync", detail: "Sync angles by timecode or waveform.", kind: "edit" },
      { label: "Cut dead air", detail: "Silence detection pass across the timeline.", kind: "ai" },
      { label: "Audio clean-up", detail: "Denoise + loudness to -16 LUFS.", kind: "audio" },
      { label: "Captions", detail: "Whisper transcript as a subtitle track.", kind: "ai" },
      { label: "Render", detail: "H.264 1920x1080 plus a separate WAV master.", kind: "delivery" },
    ],
    outputs: ["1920x1080 H.264 MP4", "SRT", "WAV"],
    accent: "from-chart-2 to-chart-3",
  },
  {
    id: "cinematic_short",
    name: "Cinematic Short",
    description: "Tighten cuts, apply a film look with your Chroma LUT or a free DCTL, deliver 4K.",
    pages: ["Media", "Edit", "Color", "Deliver"],
    steps: [
      { label: "Ingest + color manage", detail: "Set timeline color space and input CST.", kind: "color" },
      { label: "Tighten cuts", detail: "Assembly then trim pass; markers for VFX/audio.", kind: "edit" },
      { label: "Grade", detail: "Balance, then apply the Chroma LUT or a DCTL look.", kind: "lut" },
      { label: "Grain + halation", detail: "Add texture (Resolve Studio).", kind: "color" },
      { label: "Render 4K", detail: "H.265 or ProRes master plus a web H.264 proxy.", kind: "delivery" },
    ],
    outputs: ["3840x2160 master", "web proxy MP4"],
    accent: "from-chart-3 to-primary",
  },
  {
    id: "color_match",
    name: "Color Match",
    description: "Match your uploaded reference still, then refine with a Chroma LUT.",
    pages: ["Media", "Color", "Deliver"],
    steps: [
      { label: "Pick reference", detail: "Use the uploaded image as the shot/still target.", kind: "color" },
      { label: "Match", detail: "Shot Match / Color Match to the reference still.", kind: "color" },
      { label: "Refine look", detail: "Apply the Chroma LUT and blend by intensity.", kind: "lut" },
      { label: "Render", detail: "Render the matched timeline in your delivery format.", kind: "delivery" },
    ],
    outputs: ["graded timeline", "render in delivery format"],
    accent: "from-primary to-chart-3",
  },
];

export function getEditorWorkflow(id: string): EditorWorkflow | undefined {
  return EDITOR_WORKFLOWS.find((w) => w.id === id);
}

export function getEditorTarget(id: string): EditorTarget | undefined {
  return EDITOR_TARGETS.find((e) => e.id === id);
}

export interface EditorRecipe {
  editor: EditorTarget;
  lut: string;
  blend: number;
  nodeTree?: { node: number; label: string; type: string; file?: string }[];
  steps: string[];
  tips: string[];
}

/** Build an application recipe for a Chroma LUT in the chosen editor. */
export function buildEditorRecipe(editorId: string, lutFilename: string, intensity = 100): EditorRecipe {
  const editor = getEditorTarget(editorId);
  if (!editor) {
    throw new Error(`Unknown editor: ${editorId}`);
  }
  const blend = Math.round(intensity) / 100;

  const recipe: EditorRecipe = {
    editor,
    lut: lutFilename,
    blend,
    steps: editor.applySteps,
    tips: editor.notes,
  };

  if (editor.id === "resolve") {
    recipe.nodeTree = [
      { node: 1, label: "Balance", type: "corrector" },
      { node: 2, label: "CST / Color Management", type: "color-space-transform" },
      { node: 3, label: `LUT: ${lutFilename}`, type: "lut", file: lutFilename },
      { node: 4, label: "Grain / Halation (Studio)", type: "effect" },
      { node: 5, label: "Trim / Output", type: "corrector" },
    ];
  }

  return recipe;
}

// Backwards-compatible aliases.
export const RESOLVE_WORKFLOWS = EDITOR_WORKFLOWS;
export const buildResolveRecipe = buildEditorRecipe;
export const getWorkflow = getEditorWorkflow;
