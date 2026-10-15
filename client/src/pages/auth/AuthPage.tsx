// Reference: blueprint:javascript_auth_all_persistance
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Zap, Film, Sparkles, Palette, Crown, ArrowRight, Layers, Star, Shield, Briefcase, Building2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import logoImage from "@assets/logo-full-transparent-v2.png";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    email: "", 
    password: "", 
    tier: "free",
    occupation: "",
    company: "",
    yearsExperience: ""
  });

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
    return <Redirect to="/studio" />;
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
    <>
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left Column - Forms */}
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Branding Header with Logo */}
            <div className="text-center space-y-6">
              <Link href="/">
                <img 
                  src={logoImage} 
                  alt="CHROMA" 
                  className="h-20 sm:h-24 w-auto mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer" 
                />
              </Link>
              
              <div className="flex items-center justify-center gap-0 text-sm font-medium text-muted-foreground group cursor-default">
                <span className="transition-all duration-700 ease-in-out group-hover:translate-x-4 group-hover:opacity-0">by UN</span>
                <span className="text-primary mx-1 text-lg transition-all duration-700 ease-in-out group-hover:scale-150 group-hover:rotate-180">/</span>
                <span className="transition-all duration-700 ease-in-out group-hover:-translate-x-4 group-hover:opacity-0">TITLD</span>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Professional Color Science
                </Badge>
                <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto px-4">
                  Extract <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-chart-2 to-chart-3 font-semibold">cinema-quality color grading</span> from any reference image
                </p>
              </div>
            </div>

            {/* Enhanced Form Tabs */}
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm p-1.5 h-12">
                <TabsTrigger 
                  value="register" 
                  data-testid="tab-register"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-chart-2 data-[state=active]:text-primary-foreground transition-all duration-300 text-sm font-semibold"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started Free
                </TabsTrigger>
                <TabsTrigger 
                  value="login" 
                  data-testid="tab-login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-chart-2 data-[state=active]:to-primary data-[state=active]:text-primary-foreground transition-all duration-300 text-sm font-semibold"
                >
                  Sign In
                </TabsTrigger>
              </TabsList>

              <TabsContent value="register" className="mt-6">
                <Card className="hover-elevate border-muted/50 bg-background/80 backdrop-blur-sm shadow-2xl transition-all duration-300">
                  <CardHeader className="space-y-2 pb-6">
                    <CardTitle className="text-2xl sm:text-3xl">Start Creating</CardTitle>
                    <CardDescription className="text-sm">Choose your plan and unlock professional color grading</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-6">
                      {/* Enhanced Tier Selection */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-foreground">Choose Your Plan</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {/* Free Tier */}
                          <div
                            onClick={() => setRegisterData({ ...registerData, tier: "free" })}
                            data-testid="tier-card-free"
                            className={`group p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              registerData.tier === "free"
                                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                : "border-muted hover:border-primary/50 hover-elevate"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ${registerData.tier === "free" ? "ring-2 ring-primary" : ""}`}>
                                <Sparkles className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-bold text-base">Free</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground leading-tight">3 generations/month</p>
                              <p className="text-xs text-muted-foreground leading-tight">$2.50 per additional</p>
                              <p className="text-xs font-semibold text-primary mt-2">$0/forever</p>
                            </div>
                          </div>

                          {/* Creator Tier */}
                          <div
                            onClick={() => setRegisterData({ ...registerData, tier: "creator" })}
                            data-testid="tier-card-creator"
                            className={`group p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                              registerData.tier === "creator"
                                ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                : "border-muted hover:border-primary/50 hover-elevate"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-chart-2/10 flex items-center justify-center ${registerData.tier === "creator" ? "ring-2 ring-primary" : ""}`}>
                                <Layers className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-bold text-base">Creator</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground leading-tight">Unlimited generations</p>
                              <p className="text-xs text-muted-foreground leading-tight">3 export formats</p>
                              <p className="text-xs font-semibold text-primary mt-2">$7/month</p>
                            </div>
                          </div>

                          {/* Pro Tier */}
                          <div
                            onClick={() => setRegisterData({ ...registerData, tier: "pro" })}
                            data-testid="tier-card-pro"
                            className={`group p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg relative ${
                              registerData.tier === "pro"
                                ? "border-chart-2 bg-chart-2/10 shadow-lg shadow-chart-2/20"
                                : "border-muted hover:border-chart-2/50 hover-elevate"
                            }`}
                          >
                            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-chart-2 to-chart-3 text-white text-[10px] px-2 py-0.5 border-0">
                              <Star className="w-2.5 h-2.5 mr-1" />
                              Popular
                            </Badge>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-3/10 flex items-center justify-center ${registerData.tier === "pro" ? "ring-2 ring-chart-2" : ""}`}>
                                <Zap className="w-4 h-4 text-chart-2" />
                              </div>
                              <span className="font-bold text-base">Pro</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground leading-tight">All tools & formats</p>
                              <p className="text-xs text-muted-foreground leading-tight">Batch processing</p>
                              <p className="text-xs font-semibold text-chart-2 mt-2">$12/month</p>
                            </div>
                          </div>

                          {/* Studio Tier */}
                          <div
                            data-testid="tier-card-studio-disabled"
                            className="p-4 rounded-lg border-2 border-muted/50 opacity-50 cursor-not-allowed relative"
                          >
                            <Badge className="absolute -top-2 -right-2 bg-muted text-muted-foreground text-[10px] px-2 py-0.5 border-0">
                              Soon
                            </Badge>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 flex items-center justify-center">
                                <Crown className="w-4 h-4 text-yellow-500/50" />
                              </div>
                              <span className="font-bold text-base text-muted-foreground">Studio</span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground leading-tight">Team collaboration</p>
                              <p className="text-xs text-muted-foreground leading-tight">AI-powered tools</p>
                              <p className="text-xs font-semibold text-muted-foreground mt-2">$25/month</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-sm font-medium">Email Address</Label>
                        <Input
                          id="register-email"
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          required
                          data-testid="input-email"
                          className="bg-background/50 border-muted h-11"
                          placeholder="you@example.com"
                        />
                        <p className="text-xs text-muted-foreground">
                          Used for account recovery and LUT delivery
                        </p>
                      </div>

                      {/* Password Input */}
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-sm font-medium">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                          data-testid="input-password"
                          className="bg-background/50 border-muted h-11"
                          placeholder="••••••••"
                        />
                        <p className="text-xs text-muted-foreground">
                          At least 8 characters recommended
                        </p>
                      </div>

                      {/* Professional Details */}
                      <div className="space-y-4 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <Label className="text-sm font-semibold">Tell us about yourself (optional)</Label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-occupation" className="text-sm font-medium">What do you do?</Label>
                          <Select
                            value={registerData.occupation}
                            onValueChange={(value) => setRegisterData({ ...registerData, occupation: value })}
                          >
                            <SelectTrigger className="bg-background/50 border-muted h-11" data-testid="select-occupation">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cinematographer">Cinematographer</SelectItem>
                              <SelectItem value="colorist">Colorist</SelectItem>
                              <SelectItem value="editor">Video Editor</SelectItem>
                              <SelectItem value="director">Director</SelectItem>
                              <SelectItem value="photographer">Photographer</SelectItem>
                              <SelectItem value="content_creator">Content Creator</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="hobbyist">Hobbyist</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="register-company" className="text-sm font-medium">Company/Studio</Label>
                            <Input
                              id="register-company"
                              type="text"
                              value={registerData.company}
                              onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                              data-testid="input-company"
                              className="bg-background/50 border-muted h-11"
                              placeholder="Freelance"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="register-experience" className="text-sm font-medium">Experience</Label>
                            <Select
                              value={registerData.yearsExperience}
                              onValueChange={(value) => setRegisterData({ ...registerData, yearsExperience: value })}
                            >
                              <SelectTrigger className="bg-background/50 border-muted h-11" data-testid="select-experience">
                                <SelectValue placeholder="Years" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beginner">Just starting</SelectItem>
                                <SelectItem value="1-2">1-2 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="6-10">6-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-primary-foreground shadow-lg font-semibold text-base" 
                        disabled={registerMutation.isPending}
                        data-testid="button-signup"
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Film className="w-5 h-5 mr-2 animate-spin" />
                            Creating your account...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Create Free Account
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground pt-2">
                        By signing up, you agree to our{" "}
                        <Link href="/terms" className="text-primary hover:underline">Terms</Link>
                        {" "}and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="login" className="mt-6">
                <Card className="border-muted/50 bg-card/90 backdrop-blur-sm shadow-2xl">
                  <CardHeader className="space-y-2 pb-6">
                    <CardTitle className="text-2xl sm:text-3xl">Welcome Back</CardTitle>
                    <CardDescription className="text-sm">Continue your color grading journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-sm font-medium">Email Address</Label>
                        <Input
                          id="login-email"
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                          data-testid="input-email"
                          className="bg-background/50 border-muted h-11"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                          <Link 
                            href="/forgot-password" 
                            className="text-xs text-primary hover:underline"
                            data-testid="link-forgot-password"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="login-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                          data-testid="input-password"
                          className="bg-background/50 border-muted h-11"
                          placeholder="••••••••"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-gradient-to-r from-chart-2 to-primary hover:from-chart-2/90 hover:to-primary/90 text-primary-foreground shadow-lg font-semibold text-base" 
                        disabled={loginMutation.isPending}
                        data-testid="button-login"
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Film className="w-5 h-5 mr-2 animate-spin" />
                            Signing you in...
                          </>
                        ) : (
                          <>
                            <Palette className="w-5 h-5 mr-2" />
                            Sign In to CHROMA
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

        {/* Right Column - Enhanced Benefits Showcase */}
        <div className="hidden lg:flex flex-col items-center justify-center p-12 relative bg-muted/20 backdrop-blur-sm border-l border-muted/50">
          <div className="max-w-lg space-y-10">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-chart-2 shadow-2xl shadow-primary/30">
                <Film className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-5xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-foreground">
                    Free Forever
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  Professional tools at no cost
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-4">
              {/* Feature 1 */}
              <Card className="border-muted/50 bg-card/50 backdrop-blur-sm hover-elevate transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/20 p-2.5 mt-0.5">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1">Cinema-Quality LUT Generation</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Extract authentic color science from reference images with our VES/CIE-verified pipeline
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="border-muted/50 bg-card/50 backdrop-blur-sm hover-elevate transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-chart-2/20 p-2.5 mt-0.5">
                      <Check className="w-5 h-5 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1">Universal Format Support</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Export to .cube, .3dl, .lut, .look, and .xmp for DaVinci Resolve, Premiere, Final Cut Pro
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="border-muted/50 bg-card/50 backdrop-blur-sm hover-elevate transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-chart-3/20 p-2.5 mt-0.5">
                      <Check className="w-5 h-5 text-chart-3" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1">Professional Color Analysis</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Banding detection, quality metrics, and precision optimization tools
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upgrade CTA */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-chart-2/10 backdrop-blur-sm shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10 opacity-50 blur-xl" />
              
              <CardContent className="p-6 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Upgrade to Pro</p>
                    <p className="text-sm text-muted-foreground">$12/month or $99/year</p>
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">65×65×65 master quality grids</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">Batch processing (10 files at once)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">Unlimited preset library</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">Priority support</span>
                  </div>
                </div>

                <Link href="/upgrade">
                  <Button className="w-full mt-5 bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90" data-testid="button-upgrade-cta">
                    <Crown className="w-4 h-4 mr-2" />
                    View All Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
