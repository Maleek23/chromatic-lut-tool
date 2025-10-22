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
    <>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
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
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                  </div>
                  <Alert className="bg-green-500/10 border-green-500/20">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription>
                      Check your email for password reset instructions. The link will expire in 1 hour.
                    </AlertDescription>
                  </Alert>
                  <Link href="/auth">
                    <Button className="w-full" variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9"
                        required
                        disabled={loading}
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading}
                    data-testid="button-submit"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>

                  <Link href="/auth">
                    <Button type="button" className="w-full" variant="outline" data-testid="button-back">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </Link>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
