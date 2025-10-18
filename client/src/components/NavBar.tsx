import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogIn, LogOut, User, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import logoImage from "@assets/logo.png";

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
    </>
  );

  const UserSection = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {user ? (
        <>
          <div className={`flex items-center gap-2 ${mobile ? 'py-2' : 'px-3'}`} data-testid="user-info">
            <User className="w-4 h-4" />
            <span className="text-sm">{user.username}</span>
            <Badge variant="secondary" className="text-xs uppercase">
              {user.tier}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logoutMutation.mutate();
              mobile && setOpen(false);
            }}
            data-testid="button-logout"
            className={mobile ? "w-full justify-start" : ""}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
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
          <Button variant="ghost" className="hover-elevate px-2 sm:px-3" data-testid="button-home">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={logoImage} alt="Chroma" className="w-7 h-7 sm:w-8 sm:h-8" />
              <div className="flex flex-col items-start leading-none">
                <span className="font-bold text-lg sm:text-xl tracking-tight">CHROMA</span>
                <div className="hidden sm:flex items-center gap-0 text-[10px] font-medium text-muted-foreground group">
                  <span className="transition-all duration-500 ease-in-out group-hover:translate-x-2 group-hover:opacity-0 group-hover:scale-50">by UN</span>
                  <span className="text-primary mx-0.5 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:rotate-180">/</span>
                  <span className="transition-all duration-500 ease-in-out group-hover:-translate-x-2 group-hover:opacity-0 group-hover:scale-50">TITLD</span>
                </div>
              </div>
            </div>
          </Button>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <NavLinks />
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
