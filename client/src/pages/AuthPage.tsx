// Reference: blueprint:javascript_auth_all_persistance
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Zap, Film, Sparkles, Palette, Crown, ArrowRight } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", password: "", tier: "free" });

  // SEO Meta Tags
  useEffect(() => {
    // Set page title
    document.title = "Sign Up - CHROMA by UN/TITLD | Professional LUT Generator & Color Grading Tools";
    
    // Create or update meta tags
    const metaTags = [
      { name: "description", content: "Create your free CHROMA account and access professional LUT generation, format conversion, and color grading tools. Start with our free tier or upgrade for advanced features." },
      { property: "og:title", content: "Sign Up - CHROMA by UN/TITLD | Professional LUT Generator" },
      { property: "og:description", content: "Join thousands of colorists and cinematographers using CHROMA for professional color grading. Free tier includes LUT generation and format conversion." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.href },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sign Up - CHROMA by UN/TITLD | Professional LUT Generator" },
      { name: "twitter:description", content: "Create your free account and access professional color grading tools. LUT generation, format conversion, and more." },
      { name: "keywords", content: "LUT generator, color grading, signup, cinematography, colorist, image to LUT, .cube, .3dl, professional color grading, free LUT tools" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "CHROMA by UN/TITLD";
    };
  }, []);

  if (user) {
    return <Redirect to="/generate" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerData);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated gradient background - matching landing page */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Animated color orbs - matching landing page timing */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-chart-2/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-chart-3/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left Column - Forms */}
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-md space-y-6 sm:space-y-8">
            {/* Branding Header - matching landing page */}
            <div className="text-center space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                CHROMA
              </h1>
              
              <div className="flex items-center justify-center gap-0 text-sm font-medium text-muted-foreground group cursor-default">
                <span className="transition-all duration-700 ease-in-out group-hover:translate-x-4 group-hover:opacity-0">by UN</span>
                <span className="text-primary mx-1 text-lg transition-all duration-700 ease-in-out group-hover:scale-150 group-hover:rotate-180">/</span>
                <span className="transition-all duration-700 ease-in-out group-hover:-translate-x-4 group-hover:opacity-0">TITLD</span>
              </div>
              
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto px-4">
                Extract <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3 font-semibold">authentic color grading</span> from any reference image
              </p>
            </div>

            {/* Enhanced Form Tabs */}
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm p-1.5">
                <TabsTrigger 
                  value="register" 
                  data-testid="tab-register"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-chart-2 data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </TabsTrigger>
                <TabsTrigger 
                  value="login" 
                  data-testid="tab-login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-2 data-[state=active]:to-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  Sign In
                </TabsTrigger>
              </TabsList>

              <TabsContent value="register" className="mt-4 sm:mt-6">
                <Card className="border-muted/50 bg-card/80 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-xl sm:text-2xl">Start Creating</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Pick your plan, unlock your creativity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      {/* Tier Selection */}
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm text-muted-foreground">Choose Your Tier</Label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div
                            onClick={() => setRegisterData({ ...registerData, tier: "free" })}
                            data-testid="tier-card-free"
                            className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              registerData.tier === "free"
                                ? "border-primary bg-primary/5"
                                : "border-muted hover:border-muted-foreground/50"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">Free</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">3 free LUTs</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">$5 per extra</p>
                          </div>

                          <div
                            onClick={() => setRegisterData({ ...registerData, tier: "creator" })}
                            data-testid="tier-card-creator"
                            className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              registerData.tier === "creator"
                                ? "border-blue-500 bg-blue-500/5"
                                : "border-muted hover:border-muted-foreground/50"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">Creator</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">$7/mo</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Unlimited gen</p>
                          </div>

                          <div
                            onClick={() => setRegisterData({ ...registerData, tier: "pro" })}
                            data-testid="tier-card-pro"
                            className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              registerData.tier === "pro"
                                ? "border-purple-500 bg-purple-500/5"
                                : "border-muted hover:border-muted-foreground/50"
                            }`}
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">Pro</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">$12/mo</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">All tools</p>
                          </div>

                          <div
                            data-testid="tier-card-studio-disabled"
                            className="p-3 sm:p-4 rounded-lg border-2 border-muted opacity-50 cursor-not-allowed"
                          >
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                              <span className="font-semibold text-sm sm:text-base">Studio</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Coming Soon</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 leading-tight">Team tools</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="register-email" className="text-xs sm:text-sm">Email Address</Label>
                        <Input
                          id="register-email"
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                          data-testid="input-email"
                          className="bg-background/50 border-muted text-sm sm:text-base"
                          placeholder="you@example.com"
                        />
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          Use a valid email for account recovery
                        </p>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="register-password" className="text-xs sm:text-sm">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                          data-testid="input-password"
                          className="bg-background/50 border-muted text-sm sm:text-base"
                          placeholder="••••••••"
                        />
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          8+ characters recommended
                        </p>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-primary-foreground shadow-lg" 
                        disabled={registerMutation.isPending}
                        data-testid="button-signup"
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Film className="w-4 h-4 mr-2 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Create Free Account
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="login" className="mt-4 sm:mt-6">
                <Card className="border-muted/50 bg-card/80 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-xl sm:text-2xl">Welcome Back</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Continue your color grading journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="login-email" className="text-xs sm:text-sm">Email Address</Label>
                        <Input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                          data-testid="input-email"
                          className="bg-background/50 border-muted text-sm sm:text-base"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="login-password" className="text-xs sm:text-sm">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                          data-testid="input-password"
                          className="bg-background/50 border-muted text-sm sm:text-base"
                          placeholder="••••••••"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-chart-2 to-primary hover:from-chart-2/90 hover:to-primary/90 text-primary-foreground shadow-lg" 
                        disabled={loginMutation.isPending}
                        data-testid="button-login"
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Film className="w-4 h-4 mr-2 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          <>
                            <Palette className="w-4 h-4 mr-2" />
                            Sign In
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Column - Enhanced Features */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 relative">
          <div className="max-w-lg space-y-8">
            {/* Animated icon */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-chart-2 mb-6 animate-pulse" style={{ animationDuration: '3s' }}>
                <Film className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-4xl font-bold mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                  Free Toolkit
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Included with your free account
              </p>
            </div>

            {/* Free Features Card */}
            <Card className="border-muted/50 bg-card/80 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Free Forever
                </CardTitle>
                <CardDescription className="text-base">No limits on essentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">3 Free Image-to-LUT Generations</p>
                    <p className="text-sm text-muted-foreground">Then $5 per additional LUT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Basic Format Conversion</p>
                    <p className="text-sm text-muted-foreground">.cube → .3dl conversions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Banding Detection</p>
                    <p className="text-sm text-muted-foreground">Preview quality analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Export in .cube Format</p>
                    <p className="text-sm text-muted-foreground">All precision options (8/10/12-bit)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Upgrade Teaser */}
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-chart-2/5 backdrop-blur-sm shadow-2xl relative overflow-hidden">
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary opacity-20 blur-xl" />
              
              <CardHeader className="relative">
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <CardTitle className="text-2xl">Unlock Pro</CardTitle>
                </div>
                <CardDescription className="text-base">
                  $12/month or $99/year for power users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 relative">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">All grid sizes (17×17×17 → 65×65×65)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">All format conversions (.cube ↔ .3dl ↔ .lut)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Full-quality analysis & precision exports</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Unlimited preset saving & organization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Priority support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
