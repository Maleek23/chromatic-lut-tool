import { Link } from "wouter";
import logoImage from "@assets/logo-full-transparent-v2.png";
import { AnimatedUntitld } from "@/components/visual/AnimatedUntitld";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-20 py-6 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo + Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="CHROMA" 
                className="h-8 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer" 
              />
            </Link>
            <span className="text-xs text-muted-foreground/80">Cinema-grade LUT tools</span>
          </div>

          {/* Navigation Links - Compact Single Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground/50 font-medium text-[11px]">Product</span>
              <Link href="/color-science" className="text-muted-foreground hover:text-foreground transition-colors">
                Color Science
              </Link>
              <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                Resources
              </Link>
              <Link href="/upgrade" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </div>
            
            <div className="h-3 w-px bg-border/40 hidden md:block" />
            
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground/50 font-medium text-[11px]">Company</span>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">
                About
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-support">
                Support
              </Link>
            </div>
            
            <div className="h-3 w-px bg-border/40 hidden md:block" />
            
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground/50 font-medium text-[11px]">Legal</span>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
                Terms
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground/60 whitespace-nowrap">
            © {currentYear} <AnimatedUntitld />
          </div>
        </div>
      </div>
    </footer>
  );
}
