// Reference: blueprint:javascript_auth_all_persistance
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Film, Sparkles, Check, Zap } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", password: "", email: "" });

  if (user) {
    return <Redirect to="/convert" />;
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
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Column - Forms */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-2">
              CHROMATIC
            </h1>
            <div className="flex items-center justify-center gap-0 text-xs font-medium text-muted-foreground group cursor-default mb-3">
              <span className="transition-all duration-700 ease-in-out group-hover:translate-x-3 group-hover:opacity-0 group-hover:scale-0">by UN</span>
              <span className="text-primary mx-0.5 text-sm transition-all duration-700 ease-in-out group-hover:scale-150 group-hover:rotate-[360deg]">/</span>
              <span className="transition-all duration-700 ease-in-out group-hover:-translate-x-3 group-hover:opacity-0 group-hover:scale-0">TITLD</span>
            </div>
            <p className="text-muted-foreground">
              Analyze images for color grading and generate professional LUTs
            </p>
          </div>

          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register" data-testid="tab-register">Get Started</TabsTrigger>
              <TabsTrigger value="login" data-testid="tab-login">Sign In</TabsTrigger>
            </TabsList>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Start Free</CardTitle>
                  <CardDescription>Create an account to save presets and unlock Pro features</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username">Username</Label>
                      <Input
                        id="register-username"
                        type="text"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        required
                        data-testid="input-register-username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email (optional)</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        data-testid="input-register-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                        data-testid="input-register-password"
                      />
                      <p className="text-xs text-muted-foreground">
                        8+ characters, uppercase, number, special character
                      </p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerMutation.isPending}
                      data-testid="button-register"
                    >
                      {registerMutation.isPending ? "Creating account..." : "Create Free Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Sign in to access your saved presets</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">Username</Label>
                      <Input
                        id="login-username"
                        type="text"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        required
                        data-testid="input-login-username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        data-testid="input-login-password"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginMutation.isPending}
                      data-testid="button-login"
                    >
                      {loginMutation.isPending ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right Column - What You Get */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-accent p-12">
        <div className="max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">What You Get</h2>
            <p className="text-muted-foreground">
              Free tier included with your account
            </p>
          </div>

          {/* Free Features */}
          <Card>
            <CardHeader>
              <CardTitle>Free Forever</CardTitle>
              <CardDescription>Everything you need to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Format Conversion</p>
                  <p className="text-sm text-muted-foreground">Convert between .cube and .3dl formats</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Quality Analysis</p>
                  <p className="text-sm text-muted-foreground">Detect banding and invalid points</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Save Up to 3 Presets</p>
                  <p className="text-sm text-muted-foreground">Store your favorite LUT configurations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Upgrade Teaser */}
          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <CardTitle>Upgrade to Pro</CardTitle>
              </div>
              <CardDescription>$15/month for unlimited power</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Unlimited preset saves</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Advanced export quality (17/33/65 grid sizes)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Unlimited conversions and previews</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Batch processing (coming soon)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
