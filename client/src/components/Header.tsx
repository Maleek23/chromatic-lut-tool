import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-md">
          <Palette className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-semibold">LUT Maker</h1>
      </div>
      
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
    </header>
  );
}
