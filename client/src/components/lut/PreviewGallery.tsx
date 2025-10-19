import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Loader2 } from "lucide-react";

// Import curated reference images
import portraitRef from "@assets/stock_images/professional_portrai_7f300b03.jpg";
import landscapeRef from "@assets/stock_images/cinematic_landscape__a4c0a1f2.jpg";
import productRef from "@assets/stock_images/product_photography__e53e7ea4.jpg";
import nightRef from "@assets/stock_images/night_cityscape_urba_fe86ee69.jpg";
import interiorRef from "@assets/stock_images/modern_architecture__2142795c.jpg";

interface ReferenceImage {
  id: string;
  name: string;
  src: string;
  description: string;
}

const REFERENCE_IMAGES: ReferenceImage[] = [
  {
    id: "portrait",
    name: "Portrait",
    src: portraitRef,
    description: "Professional portrait with skin tones"
  },
  {
    id: "landscape",
    name: "Landscape",
    src: landscapeRef,
    description: "Cinematic landscape scene"
  },
  {
    id: "product",
    name: "Product",
    src: productRef,
    description: "Commercial product photography"
  },
  {
    id: "night",
    name: "Night Scene",
    src: nightRef,
    description: "Low-light urban environment"
  },
  {
    id: "interior",
    name: "Interior",
    src: interiorRef,
    description: "Natural light interior"
  }
];

interface PreviewGalleryProps {
  lutData: string; // Base64 encoded LUT data
  format: string;
  intensity: number;
}

export function PreviewGallery({ lutData, format, intensity }: PreviewGalleryProps) {
  const [loadingPreviews, setLoadingPreviews] = useState<Record<string, boolean>>({});
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});
  const [selectedRef, setSelectedRef] = useState(REFERENCE_IMAGES[0].id);

  // Generate preview for a specific reference image
  const generatePreview = async (refImage: ReferenceImage) => {
    if (previewImages[refImage.id]) {
      return; // Already have this preview
    }

    setLoadingPreviews(prev => ({ ...prev, [refImage.id]: true }));

    try {
      // Convert reference image to base64 using Promise wrapper for FileReader
      const response = await fetch(refImage.src);
      const blob = await response.blob();
      
      const imageData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Request preview from server
      const previewResponse = await fetch("/api/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData,
          lutData,
          format,
          intensity,
        }),
      });

      if (!previewResponse.ok) {
        throw new Error("Failed to generate preview");
      }

      const { previewImage } = await previewResponse.json();
      setPreviewImages(prev => ({ ...prev, [refImage.id]: previewImage }));
    } catch (error) {
      console.error("Preview generation error:", error);
    } finally {
      setLoadingPreviews(prev => ({ ...prev, [refImage.id]: false }));
    }
  };

  // Auto-generate preview for first reference image when component mounts
  useEffect(() => {
    generatePreview(REFERENCE_IMAGES[0]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>LUT Preview on Reference Footage</span>
          <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
            Real-World Test
          </Badge>
        </CardTitle>
        <CardDescription>
          See how your LUT looks when applied to different types of footage. This preview shows what the color grading will look like on your actual videos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={selectedRef} onValueChange={setSelectedRef}>
          <TabsList className="grid grid-cols-5 w-full">
            {REFERENCE_IMAGES.map(ref => (
              <TabsTrigger
                key={ref.id}
                value={ref.id}
                onClick={() => generatePreview(ref)}
                data-testid={`tab-preview-${ref.id}`}
              >
                {ref.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {REFERENCE_IMAGES.map(ref => (
            <TabsContent key={ref.id} value={ref.id} className="space-y-4 mt-6">
              <div className="text-sm text-muted-foreground text-center mb-4">
                {ref.description}
              </div>

              {loadingPreviews[ref.id] ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Applying LUT to {ref.name.toLowerCase()}...
                    </p>
                  </div>
                </div>
              ) : previewImages[ref.id] ? (
                <BeforeAfterSlider
                  beforeImage={ref.src}
                  afterImage={previewImages[ref.id]}
                  beforeLabel="Original Footage"
                  afterLabel="With Your LUT"
                />
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Click to generate preview
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 text-sm">
          <p className="font-semibold text-primary mb-2">💡 Understanding LUT Previews</p>
          <p className="text-muted-foreground">
            Your LUT was extracted from your reference image. These previews show how that color grading will look when applied to different types of footage in your video editing software.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
