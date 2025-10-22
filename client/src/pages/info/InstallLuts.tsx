import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function InstallLuts() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 via-cyan-400 to-pink-500">
              LUT & Preset Installation
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
            Platform-specific installation guides for professional editing software. Video apps use LUTs, photo apps use presets.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="resolve" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              <TabsTrigger value="resolve" data-testid="tab-resolve">DaVinci Resolve</TabsTrigger>
              <TabsTrigger value="premiere" data-testid="tab-premiere">Premiere Pro</TabsTrigger>
              <TabsTrigger value="finalcut" data-testid="tab-finalcut">Final Cut Pro</TabsTrigger>
              <TabsTrigger value="photoshop" data-testid="tab-photoshop">Photoshop</TabsTrigger>
              <TabsTrigger value="lightroom" data-testid="tab-lightroom">Lightroom</TabsTrigger>
            </TabsList>

            {/* DaVinci Resolve */}
            <TabsContent value="resolve" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Installing LUTs in DaVinci Resolve</CardTitle>
                  <CardDescription>
                    DaVinci Resolve supports .cube, .3dl, and .lut formats with excellent 3D LUT support.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Download your LUT file</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate a LUT using CHROMA or download from your preferred source. Supported formats: .cube, .3dl, .lut
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Copy LUT to DaVinci folder</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Navigate to the DaVinci Resolve LUT folder:
                        </p>
                        <code className="text-xs bg-muted px-3 py-2 rounded block">
                          <strong>Mac:</strong> /Library/Application Support/Blackmagic Design/DaVinci Resolve/LUT/
                          <br /><br />
                          <strong>Windows:</strong> C:\ProgramData\Blackmagic Design\DaVinci Resolve\Support\LUT\
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Apply the LUT</h3>
                        <p className="text-sm text-muted-foreground">
                          Go to the Color tab → Open the LUT panel → Select your LUT from the dropdown menu → Drag it onto your clip
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Adjust intensity (optional)</h3>
                        <p className="text-sm text-muted-foreground">
                          Use the Key Output Gain slider in the Color Wheels panel to adjust LUT intensity from 0-100%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Pro tip:</strong> In DaVinci Resolve, you can stack multiple LUTs for creative effects. Apply a technical LUT first, then add a creative LUT on top.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Premiere Pro */}
            <TabsContent value="premiere" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Installing LUTs in Adobe Premiere Pro</CardTitle>
                  <CardDescription>
                    Premiere Pro supports .cube and .look formats for color grading.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Download your LUT file</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate a .cube LUT using CHROMA for maximum compatibility with Premiere Pro.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Copy LUT to Premiere folder</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Navigate to the Premiere Pro LUT folder:
                        </p>
                        <code className="text-xs bg-muted px-3 py-2 rounded block">
                          <strong>Mac:</strong> /Applications/Adobe Premiere Pro/Lumetri/LUTs/Technical/
                          <br /><br />
                          <strong>Windows:</strong> C:\Program Files\Adobe\Adobe Premiere Pro\Lumetri\LUTs\Technical\
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Restart Premiere Pro</h3>
                        <p className="text-sm text-muted-foreground">
                          Close and reopen Premiere Pro for the LUT to appear in the Lumetri Color panel.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Apply the LUT</h3>
                        <p className="text-sm text-muted-foreground">
                          Go to Lumetri Color panel → Basic Correction → Input LUT dropdown → Select your LUT
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Pro tip:</strong> Use "Input LUT" for technical LUTs (like LOG to Rec.709) and "Creative" section for stylistic LUTs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Final Cut Pro */}
            <TabsContent value="finalcut" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Installing LUTs in Final Cut Pro</CardTitle>
                  <CardDescription>
                    Final Cut Pro supports .cube format LUTs through custom LUT effects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Download your LUT file</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate a .cube format LUT using CHROMA for Final Cut Pro compatibility.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Copy LUT to Final Cut folder</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Create a Custom LUTs folder if it doesn't exist:
                        </p>
                        <code className="text-xs bg-muted px-3 py-2 rounded block">
                          <strong>Mac:</strong> ~/Library/Application Support/Motion/Library/Color LUTs/
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Apply the LUT</h3>
                        <p className="text-sm text-muted-foreground">
                          Select your clip → Go to Effects panel → Search for "Custom LUT" → Apply the effect → Choose your LUT from the dropdown
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Adjust settings</h3>
                        <p className="text-sm text-muted-foreground">
                          Use the Mix slider in the Custom LUT effect to control intensity from 0-100%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Pro tip:</strong> Save your LUT as a preset effect for quick application across multiple projects.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photoshop */}
            <TabsContent value="photoshop" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Installing LUTs in Adobe Photoshop</CardTitle>
                  <CardDescription>
                    Photoshop uses LUTs (not presets) via Color Lookup adjustment layers. Supports .cube, .3dl, and .look formats (CS6+).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Download your LUT file</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate a LUT using CHROMA. .cube format is recommended for maximum compatibility.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Copy LUT to Photoshop folder (optional)</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          For quick access, copy to the Photoshop LUT folder:
                        </p>
                        <code className="text-xs bg-muted px-3 py-2 rounded block">
                          <strong>Mac:</strong> /Applications/Adobe Photoshop/Presets/3DLUTs/
                          <br /><br />
                          <strong>Windows:</strong> C:\Program Files\Adobe\Adobe Photoshop\Presets\3DLUTs\
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Apply the LUT</h3>
                        <p className="text-sm text-muted-foreground">
                          Open your image → Layer menu → New Adjustment Layer → Color Lookup → Click "Load 3D LUT..." → Select your .cube file
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Adjust opacity (optional)</h3>
                        <p className="text-sm text-muted-foreground">
                          Reduce the Color Lookup layer opacity to fine-tune the LUT's intensity (0-100%)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Pro tip:</strong> Use layer masks with your Color Lookup layer to apply LUTs selectively to specific areas of your image.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lightroom */}
            <TabsContent value="lightroom" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Installing Presets in Adobe Lightroom</CardTitle>
                  <CardDescription>
                    Lightroom uses .xmp preset files (not LUTs). Available for Pro+ tier users.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold mb-1">Lightroom Uses Presets, Not LUTs</p>
                    <p className="text-sm text-muted-foreground">
                      Unlike video editing software, Lightroom uses <strong>.xmp preset files</strong> that include tone curves, split toning, and HSL adjustments. CHROMA generates complete Lightroom presets for Pro+ tier users.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Download your .xmp preset</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate a Lightroom preset (.xmp format) using CHROMA. This format is only available for Pro+ tier users.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Copy preset to Lightroom folder</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Navigate to the Lightroom presets folder:
                        </p>
                        <code className="text-xs bg-muted px-3 py-2 rounded block">
                          <strong>Mac:</strong> ~/Library/Application Support/Adobe/CameraRaw/Settings/
                          <br /><br />
                          <strong>Windows:</strong> C:\Users\[YourUsername]\AppData\Roaming\Adobe\CameraRaw\Settings\
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Restart Lightroom</h3>
                        <p className="text-sm text-muted-foreground">
                          Close and reopen Lightroom Classic for the preset to appear in the Presets panel.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Apply the preset</h3>
                        <p className="text-sm text-muted-foreground">
                          Open Develop tab → Find your preset in the Presets panel (left sidebar) → Click to apply → Adjust sliders as needed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm text-muted-foreground">
                        <strong>Pro tip:</strong> Lightroom presets are fully editable. After applying, you can tweak any slider (exposure, contrast, HSL, etc.) to fine-tune the look.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <Card className="mt-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Ready to create your own LUTs?</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate professional LUTs from any reference image using CHROMA.
                  </p>
                </div>
                <Link href="/auth">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90" data-testid="button-start-creating">
                    Start Creating
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
