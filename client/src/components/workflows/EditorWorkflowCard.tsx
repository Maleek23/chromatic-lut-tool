import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clapperboard, Copy, Check, Film, Layers, Wand2 } from "lucide-react";
import {
  EDITOR_TARGETS,
  EDITOR_WORKFLOWS,
  type EditorTarget,
  type EditorWorkflow,
} from "@shared/resolve-workflows";

interface Props {
  /** When set, the card shows install + apply steps for this generated LUT. */
  lutFilename?: string | null;
  intensity?: number;
}

const KIND_LABEL: Record<string, string> = {
  edit: "Edit",
  audio: "Audio",
  color: "Color",
  lut: "LUT",
  ai: "AI",
  delivery: "Deliver",
};

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-7 px-2 text-xs"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

export function EditorWorkflowCard({ lutFilename, intensity = 100 }: Props) {
  const [activeWorkflow, setActiveWorkflow] = useState<string>(EDITOR_WORKFLOWS[0]?.id ?? "");
  const [activeEditor, setActiveEditor] = useState<string>("resolve");

  const workflow: EditorWorkflow | undefined = useMemo(
    () => EDITOR_WORKFLOWS.find((w) => w.id === activeWorkflow),
    [activeWorkflow],
  );
  const editor: EditorTarget | undefined = useMemo(
    () => EDITOR_TARGETS.find((e) => e.id === activeEditor),
    [activeEditor],
  );

  // Keep editor valid if targets change.
  useEffect(() => {
    if (!EDITOR_TARGETS.some((e) => e.id === activeEditor)) {
      setActiveEditor(EDITOR_TARGETS[0]?.id ?? "resolve");
    }
  }, [activeEditor]);

  const applyText = useMemo(() => {
    if (!editor) return "";
    const lines = [
      `${editor.name}`,
      `LUT: ${lutFilename ?? "your-chroma-lut.cube"} (blend ${intensity}%)`,
      "",
      "1. Save the LUT to:",
      editor.lutFolder,
      "",
      "2. Apply:",
      ...editor.applySteps.map((s, i) => `   ${i + 1}. ${s}`),
      "",
      "Tips:",
      ...editor.notes.map((n) => `   - ${n}`),
    ];
    return lines.join("\n");
  }, [editor, lutFilename, intensity]);

  return (
    <Card className="bg-background/80 backdrop-blur-sm" data-testid="card-editor-workflow">
      <CardContent className="p-5 space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <span className="p-1 rounded bg-primary/10">
              <Clapperboard className="w-3.5 h-3.5 text-primary" />
            </span>
            Editor Workflow
            {lutFilename && (
              <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                uses your LUT
              </Badge>
            )}
          </h3>
          <CopyButton text={applyText} label="Copy recipe" />
        </div>

        <p className="text-xs text-muted-foreground">
          Your Chroma LUT works in DaVinci Resolve and other editors. Pick a target and a workflow,
          then follow the steps.
        </p>

        {/* Workflow presets */}
        <div className="flex flex-wrap gap-2">
          {EDITOR_WORKFLOWS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setActiveWorkflow(w.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeWorkflow === w.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>

        {workflow && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">{workflow.description}</p>
            <ol className="space-y-2">
              {workflow.steps.map((step, i) => (
                <li key={step.label} className="flex items-start gap-2.5 text-sm">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-primary/10 to-chart-2/10 text-primary font-semibold text-xs shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>
                    <span className="font-medium">{step.label}</span>
                    <span className="text-muted-foreground"> — {step.detail}</span>
                    <Badge variant="outline" className="ml-2 text-[9px] px-1.5 py-0 align-middle">
                      {KIND_LABEL[step.kind] ?? step.kind}
                    </Badge>
                  </span>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Layers className="w-3 h-3" /> Pages: {workflow.pages.join(" → ")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Film className="w-3 h-3" /> Outputs: {workflow.outputs.join(", ")}
              </span>
            </div>
          </div>
        )}

        {/* Editor target picker */}
        <div className="pt-1 border-t border-border/60">
          <div className="flex flex-wrap gap-2 pt-3">
            {EDITOR_TARGETS.map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setActiveEditor(e.id)}
                className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                  activeEditor === e.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {e.short}
              </button>
            ))}
          </div>

          {editor && (
            <div className="mt-3 space-y-3 text-xs">
              <div className="rounded-md bg-muted/40 p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-medium text-foreground">Save LUT to</span>
                  <CopyButton text={editor.lutFolder} label="Copy path" />
                </div>
                <code className="text-[11px] text-muted-foreground break-all">{editor.lutFolder}</code>
                <div className="mt-2 flex flex-wrap gap-1">
                  {editor.acceptsFormats.map((f) => (
                    <Badge key={f} variant="secondary" className="text-[9px] px-1.5 py-0">
                      .{f}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-medium text-foreground">Apply</span>
                <ol className="mt-1 space-y-1 text-muted-foreground list-decimal list-inside">
                  {editor.applySteps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>

              {editor.id === "resolve" && lutFilename && (
                <div className="rounded-md border border-border/60 p-3">
                  <span className="font-medium text-foreground inline-flex items-center gap-1">
                    <Wand2 className="w-3 h-3" /> Suggested Resolve node tree
                  </span>
                  <div className="mt-2 grid gap-1">
                    {["Balance", "CST / Color Management", `LUT: ${lutFilename}`, "Grain / Halation (Studio)", "Trim / Output"].map(
                      (n, i) => (
                        <div key={n} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-4 text-[10px] text-primary font-semibold">{i + 1}</span>
                          <span>{n}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default EditorWorkflowCard;
