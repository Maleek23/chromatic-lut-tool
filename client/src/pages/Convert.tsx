import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload, Download, RefreshCw, CheckCircle, AlertCircle, Crown, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import demoImageBefore from "@assets/stock_images/cinematic_film_scene_3b85db8f.jpg";
import demoImageAfter from "@assets/stock_images/cinematic_film_scene_1a3fcc2b.jpg";

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
  const [outputFormat, setOutputFormat] = useState<"cube" | "3dl">("cube");
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
      
      // Add grid size for resampling if Pro user selected a specific size
      if (gridSize !== "auto") {
        formData.append("gridSize", gridSize);
      }
      
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
      
      // Create a File object from the blob to use in the upload form
      const file = new File([blob], filename, { type: blob.type });
      setUploadedFile(file);
      
      // Parse the file immediately
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
        setParseResult(result); // Set the failed result to reflect error state in UI
        toast({
          title: "Invalid preset",
          description: result.error || "The preset file is not a valid LUT",
          variant: "destructive",
        });
        return;
      }
      
      setParseResult(result);
      
      // Switch to upload tab to show the loaded preset
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
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Convert LUTs</h1>
          <p className="text-muted-foreground">
            Convert between .cube, .3dl formats and more
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload" data-testid="tab-upload">
              <Upload className="w-4 h-4 mr-2" />
              Upload LUT
            </TabsTrigger>
            <TabsTrigger value="presets" data-testid="tab-presets" disabled={!user}>
              <Bookmark className="w-4 h-4 mr-2" />
              My Presets {!user && "(Login Required)"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload LUT File</CardTitle>
                <CardDescription>
                  Upload .cube, .3dl, or media files (.png, .jpg, .mp4)
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
                accept=".cube,.3dl,.png,.jpg,.jpeg,.mp4,.mov,.avi"
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
                    <p className="font-medium">Drop file or click to browse</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      LUTs (.cube, .3dl) • Images (.png, .jpg) • Videos (.mp4, .mov, .avi)
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

            {/* Grid Size Selector (Pro Feature) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Grid Size</label>
                {isPro && <Badge variant="default" className="text-xs"><Crown className="w-3 h-3 mr-1" />Pro</Badge>}
              </div>
              <Select 
                value={gridSize} 
                onValueChange={setGridSize}
                disabled={!isPro}
              >
                <SelectTrigger data-testid="select-grid-size">
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
          </TabsContent>

          <TabsContent value="presets">
            <Card>
              <CardHeader>
                <CardTitle>My Saved Presets</CardTitle>
                <CardDescription>
                  Load and download your saved LUT presets
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!presets || presets.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No saved presets yet. Convert a LUT and save it from the dashboard.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {presets.map((preset) => (
                      <Card key={preset.id} className={`hover-elevate ${selectedPreset === preset.id ? 'border-primary' : ''}`}>
                        <CardContent className="flex items-center justify-between gap-3 p-4">
                          <div className="flex-1">
                            <h3 className="font-medium">{preset.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {preset.format.toUpperCase()} • {new Date(preset.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleApplyPreset(preset.id, preset.name, preset.format)}
                              data-testid={`button-apply-preset-${preset.id}`}
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
                              <Download className="w-4 h-4 mr-2" />
                              Download
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
