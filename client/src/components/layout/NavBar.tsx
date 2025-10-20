import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogIn, LogOut, User, Menu, Settings, Crown } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import logoImage from "@assets/logo-full-transparent-v2.png";

export function NavBar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logoutMutation } = useAuth();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link href="/" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant={location === "/" ? "default" : "ghost"} 
          size="sm"
          data-testid="nav-home"
          className={mobile ? "w-full justify-start" : ""}
        >
          Home
        </Button>
      </Link>
      <Link href="/generate" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant={location === "/generate" ? "default" : "ghost"} 
          size="sm"
          data-testid="nav-generate"
          className={mobile ? "w-full justify-start" : ""}
        >
          Generate
        </Button>
      </Link>
      <Link href="/tools" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant={location === "/tools" ? "default" : "ghost"} 
          size="sm"
          data-testid="nav-tools"
          className={mobile ? "w-full justify-start" : ""}
        >
          Tools
        </Button>
      </Link>
      <Link href="/how-it-works" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant={location === "/how-it-works" ? "default" : "ghost"} 
          size="sm"
          data-testid="nav-how-it-works"
          className={mobile ? "w-full justify-start" : ""}
        >
          How It Works
        </Button>
      </Link>
      <Link href="/resources" onClick={() => mobile && setOpen(false)}>
        <Button 
          variant={location.startsWith("/resources") ? "default" : "ghost"} 
          size="sm"
          data-testid="nav-resources"
          className={mobile ? "w-full justify-start" : ""}
        >
          Resources
        </Button>
      </Link>
    </>
  );

  const UserSection = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {user ? (
        <>
          {mobile && (
            <div className="flex items-center gap-2 py-2" data-testid="user-info">
              <User className="w-4 h-4" />
              <span className="text-sm">{user.username}</span>
              <Badge variant="secondary" className="text-xs uppercase">
                {user.tier}
              </Badge>
            </div>
          )}
          {!mobile && (
            <Badge variant="secondary" className="text-xs uppercase" data-testid="user-tier-badge">
              {user.tier}
            </Badge>
          )}
          {user.tier !== "pro" && user.tier !== "studio" && (
            <Link href="/upgrade" onClick={() => mobile && setOpen(false)}>
              <Button
                variant="default"
                size={mobile ? "sm" : "sm"}
                data-testid="button-upgrade"
                className={mobile ? "w-full justify-start" : ""}
              >
                <Crown className="w-4 h-4 mr-2" />
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
    <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Button variant="ghost" className="hover-elevate px-2" data-testid="button-home">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="Chroma" className="h-11 w-auto" />
              <div className="hidden lg:flex items-center text-[10px] font-medium text-muted-foreground tracking-[0.15em] group">
                <span className="transition-all duration-500 ease-in-out group-hover:translate-x-2 group-hover:opacity-0 group-hover:scale-50">by</span>
                <div className="flex items-center gap-0 ml-0.5">
                  <span className="transition-all duration-500 ease-in-out group-hover:translate-x-2 group-hover:opacity-0 group-hover:scale-50">UN</span>
                  <span className="text-primary mx-0.5 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rotate-180">/</span>
                  <span className="transition-all duration-500 ease-in-out group-hover:-translate-x-2 group-hover:opacity-0 group-hover:scale-50">TITLD</span>
                </div>
              </div>
            </div>
          </Button>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <NavLinks />
          <div className="border-l pl-2 ml-2 flex items-center gap-2">
            <UserSection />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle-mobile"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
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
