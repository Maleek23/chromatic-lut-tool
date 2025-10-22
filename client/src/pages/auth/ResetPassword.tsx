import { useState, useEffect } from "react";
import { Link, useLocation, Redirect } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import logoImage from "@assets/logo-full-transparent-v2.png";

export default function ResetPassword() {
  const [location] = useLocation();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Extract token from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const tokenFromUrl = params.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("No reset token found. Please use the link from your email.");
    }
  }, [location]);

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Reset Password - CHROMA by UN/TITLD";
    
    const metaTags = [
      { name: "description", content: "Create a new password for your CHROMA account." },
      { property: "og:title", content: "Reset Password - CHROMA by UN/TITLD" },
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

    return () => {
      document.title = "CHROMA by UN/TITLD";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to auth if no token and not showing error
  if (!token && !error) {
    return <Redirect to="/forgot-password" />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Branding Header */}
          <div className="text-center space-y-6">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="CHROMA" 
                className="h-20 sm:h-24 w-auto mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer" 
              />
            </Link>
          </div>

          {/* Reset Form Card */}
          <Card className="hover-elevate bg-background/80 backdrop-blur-sm border-2 transition-all duration-300">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold">Create New Password</CardTitle>
              <CardDescription>
                Choose a strong password for your CHROMA account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="space-y-6">
                  <Alert className="bg-green-500/10 border-green-500/50">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      Password successfully reset! You can now login with your new password.
                    </AlertDescription>
                  </Alert>
                  
                  <Button className="w-full bg-gradient-to-r from-primary to-chart-2" asChild data-testid="button-login">
                    <Link href="/auth">
                      Go to Login
                    </Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
                        className="pl-10"
                        data-testid="input-new-password"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className="pl-10"
                        data-testid="input-confirm-password"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-chart-2" 
                    disabled={loading || !token}
                    data-testid="button-reset-password"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Help Link */}
          {!success && (
            <p className="text-center text-sm text-muted-foreground">
              Link expired? <Link href="/forgot-password" className="text-primary hover:underline" data-testid="link-request-new">Request a new one</Link>
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
