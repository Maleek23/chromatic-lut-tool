import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LutFileUpload } from "@/components/lut/LutFileUpload";
import { Footer } from "@/components/layout/Footer";
import { AlertCircle, CheckCircle2, Download, Sparkles } from "lucide-react";
import { canUseOptimizer } from "@shared/tiers";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { User } from "@shared/schema";
import { Link } from "wouter";

interface OptimizationResult {
  blob: Blob;
  filename: string;
  stats: {
    optimizedPoints: number;
    totalPoints: number;
  };
}

export default function Optimize() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const optimizeMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await apiRequest("/api/lut/optimize", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Optimization failed");
      }
      
      const blob = await response.blob();
      const filename = response.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/"/g, "") || "optimized.cube";
      const optimizedPoints = parseInt(response.headers.get("X-Optimized-Points") || "0");
      const totalPoints = parseInt(response.headers.get("X-Total-Points") || "0");
      
      return {
        blob,
        filename,
        stats: { optimizedPoints, totalPoints }
      };
    },
    onSuccess: (data) => {
      setOptimizationResult(data);
    },
    onError: (error: Error) => {
      console.error("Optimization failed:", error);
    },
  });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setOptimizationResult(null);
  };

  const handleOptimize = () => {
    if (uploadedFile) {
      optimizeMutation.mutate(uploadedFile);
    }
  };

  const handleDownload = () => {
    if (optimizationResult) {
      const url = URL.createObjectURL(optimizationResult.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = optimizationResult.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const canAccess = user && canUseOptimizer(user.tier as any);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            LUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2">Optimizer</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Remove invalid points, reduce banding, and smooth your LUTs
          </p>
        </div>

        {!canAccess ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Upgrade to Pro for LUT Optimizer
              </CardTitle>
              <CardDescription>
                The LUT Optimizer is available on Pro and Studio tiers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">What the Optimizer does:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Removes invalid RGB values outside [0,1] range</li>
                  <li>Smooths color gradients to reduce banding</li>
                  <li>Fixes discontinuities in LUT data</li>
                  <li>Optimizes file size while preserving quality</li>
                </ul>
              </div>
              <Button className="w-full" data-testid="button-upgrade-optimizer" asChild>
                <Link href="/upgrade">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Upload LUT to Optimize</CardTitle>
                <CardDescription>
                  Supported formats: .cube, .3dl (up to 100MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LutFileUpload
                  onFileUpload={handleFileUpload}
                  isProcessing={optimizeMutation.isPending}
                  uploadedFile={uploadedFile}
                  acceptedFormats={[".cube", ".3dl"]}
                />

                {uploadedFile && !optimizationResult && (
                  <div className="mt-6 flex justify-center">
                    <Button
                      size="lg"
                      onClick={handleOptimize}
                      disabled={optimizeMutation.isPending}
                      className="bg-gradient-to-r from-primary to-chart-2"
                      data-testid="button-start-optimization"
                    >
                      {optimizeMutation.isPending ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Optimize LUT
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {optimizeMutation.isError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to optimize LUT. {optimizeMutation.error?.message || "Please try again."}
                </AlertDescription>
              </Alert>
            )}

            {optimizationResult && (
              <Card className="border-green-500/20 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-500">
                    <CheckCircle2 className="w-5 h-5" />
                    Optimization Complete
                  </CardTitle>
                  <CardDescription>
                    {optimizationResult.stats.optimizedPoints > 0 
                      ? `Fixed ${optimizationResult.stats.optimizedPoints} invalid points out of ${optimizationResult.stats.totalPoints} total`
                      : "LUT is already optimized - no invalid points found"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-background/50">
                      <p className="text-sm text-muted-foreground mb-1">Invalid Points Fixed</p>
                      <p className="text-2xl font-bold">{optimizationResult.stats.optimizedPoints}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50">
                      <p className="text-sm text-muted-foreground mb-1">Total Points</p>
                      <p className="text-2xl font-bold">{optimizationResult.stats.totalPoints}</p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 to-chart-2"
                    data-testid="button-download-optimized"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Optimized LUT
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
