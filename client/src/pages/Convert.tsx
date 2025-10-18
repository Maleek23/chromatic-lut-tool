import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Download, RefreshCw, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import demoImageBefore from "@assets/MEE0875492-Edit_1760788375670.png";
import demoImageAfter from "@assets/stock_images/cinematic_film_portr_38c9c7be.jpg";

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
  const [outputFormat, setOutputFormat] = useState<"3dl">("3dl");
  const [isConverting, setIsConverting] = useState(false);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setParseResult(null);
      
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
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        
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
    <div className="max-w-5xl mx-auto space-y-8">
      <Card className="border-primary/30 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20">
              <RefreshCw className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Convert LUT File</CardTitle>
              <CardDescription>
                Convert .cube files to .3dl format
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {parseResult && (
            <Alert variant={parseResult.success ? "default" : "destructive"} className="border-l-4">
              {parseResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {parseResult.success ? (
                  <>
                    <span className="font-semibold">Valid {parseResult.format.toUpperCase()} file</span> - {parseResult.size}×{parseResult.size}×{parseResult.size} grid ({parseResult.dataPoints.toLocaleString()} points)
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
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-2/20 to-chart-3/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative border-2 border-dashed rounded-lg p-12 text-center hover-elevate bg-background">
              <input
                type="file"
                accept=".cube,.3dl,.lut"
                onChange={handleFileUpload}
                className="hidden"
                id="lut-upload"
                data-testid="input-lut-file"
              />
              <label htmlFor="lut-upload" className="cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-chart-2/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                {uploadedFile ? (
                  <div>
                    <p className="font-semibold text-lg">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-lg mb-2">Drop LUT file or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      Supports .cube, .3dl, and .lut formats
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Output Format - Community Edition: .cube → .3dl only */}
          <div className="space-y-3">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Output Format
            </label>
            <Select value={outputFormat} disabled>
              <SelectTrigger data-testid="select-output-format" className="bg-muted/30">
                <SelectValue placeholder=".3dl (Autodesk/Lustre)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3dl">.3dl (Autodesk/Lustre)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Community Edition converts .cube files to .3dl format (33×33×33 grid, industry standard).
            </p>
          </div>

          {/* Convert Button */}
          <Button 
            className="w-full bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 transition-opacity" 
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
                Convert to .3dl
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
      <div className="mt-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            See LUTs in Action
          </h3>
          <p className="text-sm text-muted-foreground">
            Drag the slider to compare before and after
          </p>
        </div>
        <BeforeAfterSlider
          beforeImage={demoImageBefore}
          afterImage={demoImageAfter}
          beforeLabel="Original"
          afterLabel="With LUT"
        />
      </div>
    </div>
  );
}
