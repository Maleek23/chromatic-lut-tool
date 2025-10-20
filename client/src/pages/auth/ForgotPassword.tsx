import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import logoImage from "@assets/logo-full-transparent-v2.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Forgot Password - CHROMA by UN/TITLD";
    
    const metaTags = [
      { name: "description", content: "Reset your CHROMA password. Enter your email to receive password reset instructions." },
      { property: "og:title", content: "Forgot Password - CHROMA by UN/TITLD" },
      { property: "og:description", content: "Reset your CHROMA account password." },
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

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-chart-2/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
      </div>

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
          <Card className="bg-background/80 backdrop-blur-sm border-2">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
              <CardDescription>
                Enter your email and we'll send you instructions to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="space-y-6">
                  <Alert className="bg-green-500/10 border-green-500/50">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      If an account exists with that email, we've sent password reset instructions. Please check your inbox.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full" asChild data-testid="button-back-to-login">
                      <Link href="/auth">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-chart-2" 
                      disabled={loading}
                      data-testid="button-send-reset"
                    >
                      {loading ? "Sending..." : "Send Reset Instructions"}
                    </Button>

                    <Button variant="ghost" className="w-full" asChild data-testid="button-back">
                      <Link href="/auth">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                      </Link>
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Security Notice */}
          <p className="text-center text-sm text-muted-foreground">
            For security reasons, you won't receive an email if the account doesn't exist.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
