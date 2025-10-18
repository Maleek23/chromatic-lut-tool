import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload, Download, RefreshCw, CheckCircle, AlertCircle, Crown, Bookmark, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import demoImageBefore from "@assets/MEE0875492-Edit_1760788375670.png";
import demoImageAfter from "@assets/stock_images/cinematic_film_portr_38c9c7be.jpg";

interface Preset {
  id: number;
  name: string;
  format: string;
  createdAt: string;
}

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
  const [outputFormat, setOutputFormat] = useState<"cube" | "3dl" | "lut">("cube");
  const [gridSize, setGridSize] = useState<string>("auto");
  const [isConverting, setIsConverting] = useState(false);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("upload");
  const { toast } = useToast();
  const { user } = useAuth();
  
  const isPro = user && (user.tier === "pro" || user.tier === "studio");

  // Fetch user's saved presets
  const { data: presets } = useQuery<Preset[]>({
    queryKey: ["/api/presets"],
    enabled: !!user,
  });

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
      
      if (gridSize !== "auto") {
        formData.append("gridSize", gridSize);
      }
      
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

  const handleApplyPreset = async (presetId: number, presetName: string, presetFormat: string) => {
    try {
      const response = await fetch(`/api/presets/${presetId}/download`);
      
      if (!response.ok) {
        toast({
          title: "Failed to load preset",
          description: "Could not download preset data",
          variant: "destructive",
        });
        return;
      }
      
      const blob = await response.blob();
      const filename = `${presetName.replace(/[^a-zA-Z0-9]/g, '_')}.${presetFormat}`;
      
      const file = new File([blob], filename, { type: blob.type });
      setUploadedFile(file);
      
      const formData = new FormData();
      formData.append("file", file);
      
      const parseResponse = await fetch("/api/lut/parse", {
        method: "POST",
        body: formData,
      });
      
      if (!parseResponse.ok) {
        setParseResult(null);
        setUploadedFile(null);
        toast({
          title: "Failed to parse preset",
          description: "The preset file could not be parsed",
          variant: "destructive",
        });
        return;
      }
      
      const result = await parseResponse.json();
      
      if (!result.success) {
        setParseResult(result);
        toast({
          title: "Invalid preset",
          description: result.error || "The preset file is not a valid LUT",
          variant: "destructive",
        });
        return;
      }
      
      setParseResult(result);
      setActiveTab("upload");
      
      toast({
        title: "Preset loaded",
        description: `${presetName} is ready for conversion`,
      });
    } catch (error) {
      console.error("Apply preset error:", error);
      toast({
        title: "Failed to load preset",
        description: "An error occurred while loading the preset",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPreset = async (presetId: number) => {
    try {
      const response = await fetch(`/api/presets/${presetId}/download`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        
        const contentDisposition = response.headers.get("Content-Disposition");
        const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
        const filename = filenameMatch ? filenameMatch[1] : `preset.cube`;
        
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "Preset downloaded",
          description: `Downloaded ${filename}`,
        });
      } else {
        toast({
          title: "Download failed",
          description: "Failed to download preset",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "An error occurred during download",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="upload" data-testid="tab-upload" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-chart-2 data-[state=active]:text-primary-foreground">
            <Upload className="w-4 h-4 mr-2" />
            Upload LUT
          </TabsTrigger>
          <TabsTrigger value="presets" data-testid="tab-presets" disabled={!user} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-2 data-[state=active]:to-chart-3 data-[state=active]:text-primary-foreground">
            <Bookmark className="w-4 h-4 mr-2" />
            My Presets {!user && "(Login Required)"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="border-primary/30 bg-background/50 backdrop-blur-sm hover-elevate transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/20">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Upload LUT File</CardTitle>
                  <CardDescription>
                    Convert between .cube and .3dl formats
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

              {/* Output Format */}
              <div className="space-y-3">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Output Format
                  {!isPro && (
                    <Badge variant="outline" className="text-xs">
                      <Crown className="w-3 h-3 mr-1" />Pro Feature
                    </Badge>
                  )}
                </label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as "cube" | "3dl" | "lut")}>
                  <SelectTrigger data-testid="select-output-format" className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cube">.cube (3D LUT - Free)</SelectItem>
                    {isPro && <SelectItem value="3dl">.3dl (3D LUT - Pro)</SelectItem>}
                    {isPro && <SelectItem value="lut">.lut (1D LUT - Pro)</SelectItem>}
                  </SelectContent>
                </Select>
                {!isPro && (
                  <p className="text-xs text-muted-foreground">
                    <Crown className="w-3 h-3 inline mr-1" />
                    Upgrade to Pro for .3dl and .lut export formats
                  </p>
                )}
              </div>

              {/* Grid Size Selector (Pro Feature) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">Grid Size</label>
                  {isPro ? (
                    <Badge className="bg-gradient-to-r from-primary to-chart-2 text-primary-foreground border-0">
                      <Crown className="w-3 h-3 mr-1" />Pro
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Crown className="w-3 h-3 mr-1" />Pro Feature
                    </Badge>
                  )}
                </div>
                <Select 
                  value={gridSize} 
                  onValueChange={setGridSize}
                  disabled={!isPro}
                >
                  <SelectTrigger data-testid="select-grid-size" className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (keep original)</SelectItem>
                    <SelectItem value="17">17×17×17 (Standard)</SelectItem>
                    <SelectItem value="33">33×33×33 (High Quality)</SelectItem>
                    <SelectItem value="65">65×65×65 (Ultra Quality)</SelectItem>
                  </SelectContent>
                </Select>
                {!isPro && (
                  <p className="text-xs text-muted-foreground">
                    Upgrade to Pro to resample LUTs with custom grid sizes
                  </p>
                )}
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
        </TabsContent>

        <TabsContent value="presets">
          <Card className="border-chart-2/30 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/20">
                  <Bookmark className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <CardTitle>My Saved Presets</CardTitle>
                  <CardDescription>
                    Load and download your saved LUT presets
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!presets || presets.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-chart-2/10 to-chart-3/10 flex items-center justify-center">
                    <Bookmark className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    No saved presets yet. Convert a LUT and save it from the dashboard.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {presets.map((preset) => (
                    <Card key={preset.id} className={`hover-elevate transition-all duration-300 ${selectedPreset === preset.id ? 'border-primary ring-2 ring-primary/20' : ''}`}>
                      <CardContent className="flex items-center justify-between gap-3 p-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{preset.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {preset.format.toUpperCase()} • {new Date(preset.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApplyPreset(preset.id, preset.name, preset.format)}
                            data-testid={`button-apply-preset-${preset.id}`}
                            className="bg-gradient-to-r from-primary to-chart-2"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Apply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadPreset(preset.id)}
                            data-testid={`button-download-preset-${preset.id}`}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
