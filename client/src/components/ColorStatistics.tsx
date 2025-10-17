import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LutAnalysis } from "@shared/schema";

interface ColorStatisticsProps {
  analysis: LutAnalysis;
}

export function ColorStatistics({ analysis }: ColorStatisticsProps) {
  return (
    <Card data-testid="color-statistics">
      <CardHeader className="space-y-0 pb-4">
        <CardTitle className="text-lg">Color Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dominant Colors */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Dominant Colors
          </h4>
          <div className="flex flex-wrap gap-2">
            {analysis.dominantColors.map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-12 h-12 rounded-md border border-border"
                  style={{ backgroundColor: color.hex }}
                  data-testid={`color-swatch-${index}`}
                />
                <div className="text-xs space-y-1">
                  <div className="font-mono text-muted-foreground">
                    {color.hex.toUpperCase()}
                  </div>
                  <div className="text-muted-foreground">
                    {color.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              Avg. Brightness
            </div>
            <div className="text-2xl font-semibold font-mono" data-testid="text-brightness">
              {analysis.averageBrightness.toFixed(1)}%
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              Avg. Saturation
            </div>
            <div className="text-2xl font-semibold font-mono" data-testid="text-saturation">
              {analysis.averageSaturation.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* RGB Histogram Preview */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            RGB Distribution
          </h4>
          <div className="space-y-2">
            <HistogramBar
              label="R"
              data={analysis.rgbHistogram.red}
              color="rgb(239, 68, 68)"
            />
            <HistogramBar
              label="G"
              data={analysis.rgbHistogram.green}
              color="rgb(34, 197, 94)"
            />
            <HistogramBar
              label="B"
              data={analysis.rgbHistogram.blue}
              color="rgb(59, 130, 246)"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HistogramBar({
  label,
  data,
  color,
}: {
  label: string;
  data: number[];
  color: string;
}) {
  const max = Math.max(...data);
  const normalized = data.map((v) => (v / max) * 100);

  return (
    <div className="flex items-center gap-2">
      <div className="w-4 text-xs font-mono text-muted-foreground">{label}</div>
      <div className="flex-1 h-8 bg-muted rounded-sm overflow-hidden flex items-end">
        {normalized.map((height, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: `${height}%`,
              backgroundColor: color,
              opacity: 0.8,
            }}
          />
        ))}
      </div>
    </div>
  );
}
