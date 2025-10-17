import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Palette, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function NavBar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" className="gap-2 hover-elevate" data-testid="button-home">
            <Palette className="w-5 h-5 text-primary" />
            <span className="font-semibold">LUT Maker</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button 
              variant={location === "/" ? "default" : "ghost"} 
              size="sm"
              data-testid="nav-home"
            >
              Home
            </Button>
          </Link>
          <Link href="/tool">
            <Button 
              variant={location === "/tool" ? "default" : "ghost"} 
              size="sm"
              data-testid="nav-tool"
            >
              Tool
            </Button>
          </Link>
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
    </nav>
  );
}
