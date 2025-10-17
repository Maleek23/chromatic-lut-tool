import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, RefreshCw } from "lucide-react";

export default function Convert() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<"cube" | "3dl">("cube");
  const [isConverting, setIsConverting] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleConvert = () => {
    // TODO: Implement conversion
    setIsConverting(true);
    setTimeout(() => setIsConverting(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Convert LUTs</h1>
          <p className="text-muted-foreground">
            Convert between .cube, .3dl, and other LUT formats
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload LUT File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Zone */}
            <div className="border-2 border-dashed rounded-lg p-12 text-center hover-elevate">
              <input
                type="file"
                accept=".cube,.3dl"
                onChange={handleFileUpload}
                className="hidden"
                id="lut-upload"
                data-testid="input-lut-file"
              />
              <label htmlFor="lut-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                {uploadedFile ? (
                  <div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">Drop LUT file or click to browse</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supports .cube and .3dl formats
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Output Format */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Output Format</label>
              <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as "cube" | "3dl")}>
                <SelectTrigger data-testid="select-output-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cube">.cube (Standard)</SelectItem>
                  <SelectItem value="3dl">.3dl (Autodesk)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Convert Button */}
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleConvert}
              disabled={!uploadedFile || isConverting}
              data-testid="button-convert"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Convert LUT
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
