import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, CheckCircle2, RotateCcw } from "lucide-react";

interface DownloadSectionProps {
  lutData: string;
  defaultFilename: string;
  format: string;
  onReset: () => void;
}

export function DownloadSection({
  lutData,
  defaultFilename,
  format,
  onReset,
}: DownloadSectionProps) {
  const [filename, setFilename] = useState(defaultFilename);

  const handleDownload = () => {
    const blob = new Blob([lutData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-chart-2 bg-chart-2/5">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-chart-2">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">LUT Generated Successfully!</h3>
            <p className="text-sm text-muted-foreground">
              Your {format.toUpperCase()} file is ready to download
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Filename</label>
          <Input
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            data-testid="input-filename"
          />
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={handleDownload}
            data-testid="button-download"
          >
            <Download className="w-4 h-4 mr-2" />
            Download LUT
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
