import { Link } from "wouter";
import logoImage from "@assets/logo-full-transparent-v2.png";
import { AnimatedUntitld } from "@/components/visual/AnimatedUntitld";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-20 py-12 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Link href="/">
                <img 
                  src={logoImage} 
                  alt="CHROMA" 
                  className="h-10 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer" 
                />
              </Link>
              <span className="text-[10px] text-muted-foreground">
                by <span className="font-semibold"><AnimatedUntitld /></span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Cinema-grade LUT tools.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/color-science" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Color Science
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/upgrade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">
                  About
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-support">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} UN/TITLD
          </p>
        </div>
      </div>
    </footer>
  );
}
