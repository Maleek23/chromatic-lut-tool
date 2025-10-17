import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Download, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import demoImageBefore from "@assets/stock_images/cinematic_film_scene_3b85db8f.jpg";
import demoImageAfter from "@assets/stock_images/cinematic_film_scene_1a3fcc2b.jpg";

interface ParseResult {
  success: boolean;
  format: string;
  size: number;
  title?: string;
  errors: string[];
  warnings: string[];
  dataPoints: number;
}

export default function Convert() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<"cube" | "3dl">("cube");
  const [isConverting, setIsConverting] = useState(false);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setParseResult(null);
      
      // Parse the file to validate it
      const formData = new FormData();
      formData.append("file", file);
      
      try {
        const response = await fetch("/api/lut/parse", {
          method: "POST",
          body: formData,
        });
        
        if (response.ok) {
          const result = await response.json();
          setParseResult(result);
          
          if (!result.success) {
            toast({
              title: "Invalid LUT File",
              description: result.errors.join(", "),
              variant: "destructive",
            });
          } else {
            toast({
              title: "LUT validated successfully",
              description: `Valid ${result.format.toUpperCase()} file detected`,
            });
          }
        } else {
          const error = await response.json();
          toast({
            title: "Validation failed",
            description: error.error || "Failed to parse LUT file",
            variant: "destructive",
          });
          
          // Set a failed parse result
          setParseResult({
            success: false,
            format: "unknown",
            size: 0,
            errors: [error.error || "Failed to parse LUT file"],
            warnings: [],
            dataPoints: 0
          });
        }
      } catch (error) {
        console.error("Parse error:", error);
        toast({
          title: "Validation failed",
          description: "An error occurred while validating the file",
          variant: "destructive",
        });
        
        setParseResult({
          success: false,
          format: "unknown",
          size: 0,
          errors: ["An error occurred while validating the file"],
          warnings: [],
          dataPoints: 0
        });
      }
    }
  };

  const handleConvert = async () => {
    if (!uploadedFile) return;

    setIsConverting(true);
    
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("targetFormat", outputFormat);
      
      const response = await fetch("/api/lut/convert", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Download the converted file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        
        // Get filename from Content-Disposition header
        const contentDisposition = response.headers.get("Content-Disposition");
        const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
        const filename = filenameMatch ? filenameMatch[1] : `converted.${outputFormat}`;
        
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "Conversion successful",
          description: `LUT converted to ${outputFormat.toUpperCase()} format`,
        });
      } else {
        const error = await response.json();
        toast({
          title: "Conversion failed",
          description: error.error || "Failed to convert LUT file",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Conversion error:", error);
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
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
            <CardDescription>
              Upload your existing LUT file to convert between formats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {parseResult && (
              <Alert variant={parseResult.success ? "default" : "destructive"}>
                {parseResult.success ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {parseResult.success ? (
                    <>
                      Valid {parseResult.format.toUpperCase()} file - {parseResult.size}x{parseResult.size}x{parseResult.size} grid ({parseResult.dataPoints} points)
                      {parseResult.warnings.length > 0 && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          Warnings: {parseResult.warnings.join(", ")}
                        </div>
                      )}
                    </>
                  ) : (
                    <>Invalid LUT: {parseResult.errors.join(", ")}</>
                  )}
                </AlertDescription>
              </Alert>
            )}
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
              disabled={!uploadedFile || isConverting || !parseResult?.success}
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
            {uploadedFile && !parseResult?.success && (
              <p className="text-sm text-destructive text-center">
                File validation failed. Please upload a valid LUT file.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Demo Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>See LUTs in Action</CardTitle>
            <CardDescription>
              Compare before and after applying color grading LUTs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BeforeAfterSlider
              beforeImage={demoImageBefore}
              afterImage={demoImageAfter}
              beforeLabel="Original Footage"
              afterLabel="With LUT Applied"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
