import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function Analyze() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Analyze LUTs</h1>
          <p className="text-muted-foreground">
            Detect banding, invalid points, and visualize tone curves
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload LUT for Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-12 text-center hover-elevate">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="font-medium">Drop LUT file or click to browse</p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports .cube and .3dl formats
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
