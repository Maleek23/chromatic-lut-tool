import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { Clapperboard, Copy, Check, ArrowRight, Wand2 } from "lucide-react";
import { Link } from "wouter";
import { EDITOR_TARGETS, EDITOR_WORKFLOWS } from "@shared/resolve-workflows";

function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function Workflows() {
  const [active, setActive] = useState(EDITOR_WORKFLOWS[0]?.id ?? "");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
        <div className="text-center mb-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20">
            <Clapperboard className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
              Editor Workflows
            </span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Take a Chroma LUT from your reference image into DaVinci Resolve, Premiere Pro, Final Cut
            Pro, After Effects, Avid, or CapCut — with a step-by-step recipe for each.
          </p>
          <div className="flex justify-center gap-2 pt-1">
            <Link href="/generate">
              <Button className="bg-gradient-to-r from-primary to-chart-2 text-white">
                Generate a LUT <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Workflow picker */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {EDITOR_WORKFLOWS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setActive(w.id)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                active === w.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>

        {/* Workflow detail */}
        {EDITOR_WORKFLOWS.filter((w) => w.id === active).map((w) => (
          <Card key={w.id} className="mb-10 bg-background/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{w.name}</h2>
                <p className="text-sm text-muted-foreground">{w.description}</p>
              </div>
              <ol className="space-y-3">
                {w.steps.map((s, i) => (
                  <li key={s.label} className="flex items-start gap-3 text-sm">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-primary/10 to-chart-2/10 text-primary font-semibold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>
                      <span className="font-medium">{s.label}</span>
                      <span className="text-muted-foreground"> — {s.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <Badge variant="outline">Pages: {w.pages.join(" → ")}</Badge>
                <Badge variant="outline">Outputs: {w.outputs.join(", ")}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Editor targets */}
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-primary" /> Apply your LUT per editor
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {EDITOR_TARGETS.map((e) => (
            <Card key={e.id} className="bg-background/80 backdrop-blur-sm">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{e.name}</h3>
                  <div className="flex gap-1">
                    {e.acceptsFormats.map((f) => (
                      <Badge key={f} variant="secondary" className="text-[9px] px-1.5 py-0">
                        .{f}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-md bg-muted/40 p-3">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-medium">LUT folder</span>
                    <CopyLine text={e.lutFolder} />
                  </div>
                  <code className="text-[11px] text-muted-foreground break-all">{e.lutFolder}</code>
                </div>
                <ol className="space-y-1.5 text-xs text-muted-foreground list-decimal list-inside">
                  {e.applySteps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <ul className="space-y-1 text-[11px] text-muted-foreground/80 list-disc list-inside">
                  {e.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
