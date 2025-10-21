import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 mt-12 md:mt-20 py-8 md:py-12 bg-gradient-to-t from-primary/5 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">CHROMA</h3>
            <p className="text-sm text-muted-foreground">
              Cinema-grade LUT tools for professionals and creators.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Product</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link href="/color-science" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Chroma Science
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/upgrade" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Company</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-about">
                  About
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-support">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Legal</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/40 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} UN/TITLD. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              Powered by <span className="text-primary font-medium">professional chroma science</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
