import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Settings, Crown, Menu } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import logoImage from "@assets/logo-full-transparent-v2.png";
import { AnimatedUntitld } from "@/components/visual/AnimatedUntitld";

export function NavBar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link href="/" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant="ghost"
          size="sm"
          data-testid="nav-home"
          className={`${mobile ? "w-full justify-start" : "relative"} ${
            location === "/" 
              ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-chart-2" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {user ? "Dashboard" : "Home"}
        </Button>
      </Link>
      <Link href="/generate" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant="ghost"
          size="sm"
          data-testid="nav-generate"
          className={`${mobile ? "w-full justify-start" : "relative"} ${
            location === "/generate" 
              ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-chart-2" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Generate
        </Button>
      </Link>
      <Link href="/tools" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant="ghost"
          size="sm"
          data-testid="nav-tools"
          className={`${mobile ? "w-full justify-start" : "relative"} ${
            location === "/tools" 
              ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-chart-2" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Tools
        </Button>
      </Link>
      <Link href="/color-science" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant="ghost"
          size="sm"
          data-testid="nav-color-science"
          className={`${mobile ? "w-full justify-start" : "relative"} ${
            location === "/color-science" 
              ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-chart-2" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Science
        </Button>
      </Link>
      <Link href="/resources/create-from-images" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant="ghost"
          size="sm"
          data-testid="nav-how-it-works"
          className={`${mobile ? "w-full justify-start" : "relative"} ${
            location === "/resources/create-from-images" 
              ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-chart-2" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          How It Works
        </Button>
      </Link>
    </>
  );

  const UserSection = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {user ? (
        <>
          {!mobile && (
            <Badge 
              variant="outline" 
              className="text-[10px] uppercase tracking-wider font-semibold bg-gradient-to-r from-primary/5 to-chart-2/5 text-primary border-primary/30 px-2 py-0.5" 
              data-testid="user-tier-badge"
            >
              {user.tier}
            </Badge>
          )}
          {user.tier !== "pro" && user.tier !== "studio" && (
            <Link href="/upgrade" onClick={() => mobile && setOpen(false)}>
              <Button
                size="sm"
                data-testid="button-upgrade"
                className={`bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white shadow-sm ${mobile ? "w-full justify-start" : ""}`}
              >
                <Crown className="w-3.5 h-3.5 mr-1.5" />
                Upgrade
              </Button>
            </Link>
          )}
          <Link href="/settings" onClick={() => mobile && setOpen(false)}>
            <Button
              variant="ghost"
              size={mobile ? "sm" : "icon"}
              data-testid="button-settings"
              className={mobile ? "w-full justify-start" : ""}
            >
              <Settings className="w-4 h-4" />
              {mobile && <span className="ml-2">Settings</span>}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size={mobile ? "sm" : "icon"}
            onClick={() => {
              logoutMutation.mutate();
              mobile && setOpen(false);
            }}
            data-testid="button-logout"
            className={mobile ? "w-full justify-start" : ""}
          >
            <LogOut className="w-4 h-4" />
            {mobile && <span className="ml-2">Logout</span>}
          </Button>
        </>
      ) : (
        <Link href="/auth" onClick={() => mobile && setOpen(false)}>
          <Button size="sm" data-testid="button-login" className={mobile ? "w-full justify-start" : ""}>
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo with by UN/TITLD */}
        <div className="flex items-center gap-2.5">
          <Link href="/">
            <img 
              src={logoImage} 
              alt="Chroma" 
              className="h-8 w-auto hover:scale-105 transition-transform duration-300 cursor-pointer" 
              data-testid="button-home"
            />
          </Link>
          <div className="flex flex-col gap-1 hidden sm:flex">
            <span className="text-[8px] text-muted-foreground/50 leading-none">by</span>
            <span className="text-[9px] font-semibold text-muted-foreground/70 leading-none"><AnimatedUntitld /></span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
          <NavLinks />
          <div className="h-6 w-px bg-border/50 mx-2" />
          <div className="flex items-center gap-1.5">
            <UserSection />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks mobile />
                <div className="border-t pt-4">
                  <UserSection mobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
