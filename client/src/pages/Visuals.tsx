import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorParticles } from '@/components/visual/ColorParticles';
import { FilmGrain } from '@/components/visual/FilmGrain';
import { QualityGauge } from '@/components/visual/QualityGauge';
import { ColorCube3D } from '@/components/visual/ColorCube3D';
import { SpectrumLoader } from '@/components/visual/SpectrumLoader';
import { BeforeAfterSlider } from '@/components/visual/BeforeAfterSlider';
import { HeroSection } from '@/components/visual/HeroSection';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function Visuals() {
  const [gaugeScore, setGaugeScore] = useState(75);
  const [loaderProgress, setLoaderProgress] = useState(60);

  return (
    <div className="min-h-screen">
      {/* Hero Section Showcase */}
      <HeroSection />

      <div className="container mx-auto px-4 py-20 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">CHROMA Visual Components</h1>
          <p className="text-lg text-muted-foreground">
            Cinema-grade visual elements built with web-native technologies
          </p>
        </div>

        <Tabs defaultValue="particles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="particles">Particles</TabsTrigger>
            <TabsTrigger value="gauge">Gauge</TabsTrigger>
            <TabsTrigger value="cube">3D Cube</TabsTrigger>
            <TabsTrigger value="loader">Loader</TabsTrigger>
            <TabsTrigger value="slider">Slider</TabsTrigger>
            <TabsTrigger value="grain">Film Grain</TabsTrigger>
          </TabsList>

          {/* Color Particles Demo */}
          <TabsContent value="particles">
            <Card>
              <CardHeader>
                <CardTitle>Color Particles</CardTitle>
                <CardDescription>
                  Interactive canvas-based particle system with mouse tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-96 bg-card rounded-lg overflow-hidden border">
                  <ColorParticles count={50} speed={0.5} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-muted-foreground">Move your mouse to interact</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quality Gauge Demo */}
          <TabsContent value="gauge">
            <Card>
              <CardHeader>
                <CardTitle>Quality Score Gauge</CardTitle>
                <CardDescription>
                  Animated arc gauge with color-coded quality zones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <QualityGauge score={gaugeScore} size={250} strokeWidth={24} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adjust Score: {gaugeScore}</label>
                  <Slider
                    value={[gaugeScore]}
                    onValueChange={(v) => setGaugeScore(v[0])}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3D Color Cube Demo */}
          <TabsContent value="cube">
            <Card>
              <CardHeader>
                <CardTitle>3D Color Space Cube</CardTitle>
                <CardDescription>
                  Interactive CSS 3D cube - drag to rotate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-8">
                  <ColorCube3D size={250} rotating={true} />
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Click and drag to manually rotate the cube
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spectrum Loader Demo */}
          <TabsContent value="loader">
            <Card>
              <CardHeader>
                <CardTitle>Spectrum Loader</CardTitle>
                <CardDescription>
                  Gradient progress bar with animated shimmer effect
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SpectrumLoader progress={loaderProgress} height={8} showPercentage />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adjust Progress: {loaderProgress}%</label>
                  <Slider
                    value={[loaderProgress]}
                    onValueChange={(v) => setLoaderProgress(v[0])}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Different heights:</p>
                  <SpectrumLoader progress={loaderProgress} height={4} />
                  <SpectrumLoader progress={loaderProgress} height={12} />
                  <SpectrumLoader progress={loaderProgress} height={20} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Before/After Slider Demo */}
          <TabsContent value="slider">
            <Card>
              <CardHeader>
                <CardTitle>Before/After Comparison Slider</CardTitle>
                <CardDescription>
                  Interactive image comparison with draggable divider
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BeforeAfterSlider
                  beforeImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80"
                  afterImage="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80&sat=-100&contrast=120"
                  beforeLabel="Original"
                  afterLabel="LUT Applied"
                  defaultPosition={50}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Film Grain Demo */}
          <TabsContent value="grain">
            <Card>
              <CardHeader>
                <CardTitle>Film Grain Overlay</CardTitle>
                <CardDescription>
                  Subtle SVG-based texture for cinematic aesthetic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-64 bg-gradient-to-br from-primary to-chart-2 rounded-lg">
                    <p className="absolute bottom-4 left-4 text-white text-sm font-medium">
                      Without Grain
                    </p>
                  </div>
                  <div className="relative h-64 bg-gradient-to-br from-primary to-chart-2 rounded-lg overflow-hidden">
                    <FilmGrain opacity={0.15} animate={true} />
                    <p className="absolute bottom-4 left-4 text-white text-sm font-medium">
                      With Film Grain
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Typography Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Typography System</CardTitle>
            <CardDescription>
              Cinema-grade typefaces: Montserrat (headlines), Inter (body), JetBrains Mono (technical)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-2">Cinematic Headline</h1>
              <p className="text-sm text-muted-foreground">Montserrat Bold, -0.02em tracking</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-2">Secondary Heading</h2>
              <p className="text-sm text-muted-foreground">Montserrat Semibold</p>
            </div>
            <div>
              <p className="text-base mb-2">
                Body text uses Inter for excellent readability and professional appearance.
                This is the primary font for all interface text and descriptions.
              </p>
              <p className="text-sm text-muted-foreground">Inter Regular</p>
            </div>
            <div>
              <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                RGB(107, 45, 217) → #6b2dd9
              </code>
              <p className="text-sm text-muted-foreground mt-2">JetBrains Mono for technical values</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
