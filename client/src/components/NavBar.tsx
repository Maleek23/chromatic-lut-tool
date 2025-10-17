import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Droplets, Moon, Sun, LogIn, LogOut, User } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";

export function NavBar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" className="gap-2 hover-elevate" data-testid="button-home">
            <Droplets className="w-5 h-5 text-primary" />
            <div className="flex flex-col items-start leading-none">
              <span className="font-semibold">ColorKit</span>
              <span className="text-xs text-muted-foreground">by Untitled</span>
            </div>
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
          <Link href="/convert">
            <Button 
              variant={location === "/convert" ? "default" : "ghost"} 
              size="sm"
              data-testid="nav-convert"
            >
              Convert
            </Button>
          </Link>
          <Link href="/analyze">
            <Button 
              variant={location === "/analyze" ? "default" : "ghost"} 
              size="sm"
              data-testid="nav-analyze"
            >
              Analyze
            </Button>
          </Link>
          <Link href="/optimize">
            <Button 
              variant={location === "/optimize" ? "default" : "ghost"} 
              size="sm"
              data-testid="nav-optimize"
            >
              Optimize
            </Button>
          </Link>

          {user ? (
            <>
              <div className="flex items-center gap-2 px-3" data-testid="user-info">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.username}</span>
                <Badge variant="secondary" className="text-xs uppercase">
                  {user.tier}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button size="sm" data-testid="button-login">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}

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
