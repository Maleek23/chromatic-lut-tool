import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  Wand2,
  LayoutDashboard,
  RefreshCw,
  BarChart3,
  Zap,
  Clapperboard,
  BookOpen,
  Crown,
  Settings,
  LogOut,
  LogIn,
  Menu,
  Lock,
  Sun,
  Moon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/components/layout/ThemeProvider";
import { canUseAnalyzer, canUseOptimizer } from "@shared/tiers";
import type { TierType } from "@shared/tiers";
import logoImage from "@assets/logo-full-transparent-v2.png";

interface NavItem {
  href: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  testid: string;
  locked?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface AppShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AppShell({ title, description, children }: AppShellProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const tier = (user?.tier || "free") as TierType;
  const isPro = tier === "pro" || tier === "studio";
  const showUpgrade = !!user && !isPro;

  const SECTIONS: NavSection[] = [
    {
      title: "Workspace",
      items: [
        { href: "/studio", label: "Studio", hint: "Create image & video LUTs", icon: Wand2, testid: "appnav-studio" },
        { href: "/dashboard", label: "Dashboard", hint: "Usage & saved LUTs", icon: LayoutDashboard, testid: "appnav-dashboard" },
      ],
    },
    {
      title: "LUT utilities",
      items: [
        { href: "/convert", label: "Convert", hint: "Reformat LUT files", icon: RefreshCw, testid: "appnav-convert" },
        { href: "/analyze", label: "Analyze", hint: "Quality & banding scan", icon: BarChart3, testid: "appnav-analyze", locked: !canUseAnalyzer(tier) },
        { href: "/optimize", label: "Optimize", hint: "Fix invalid points", icon: Zap, testid: "appnav-optimize", locked: !canUseOptimizer(tier) },
      ],
    },
    {
      title: "Resources",
      items: [
        { href: "/workflows", label: "Workflows", hint: "Editor recipes", icon: Clapperboard, testid: "appnav-workflows" },
        { href: "/learn", label: "Learn", hint: "Color science guides", icon: BookOpen, testid: "appnav-learn" },
        { href: "/upgrade", label: "Pricing", hint: "Plans & limits", icon: Crown, testid: "appnav-pricing" },
      ],
    },
  ];

  const SidebarBody = ({ onNavigate }: { onNavigate: () => void }) => (
    <div className="flex h-full flex-col">
      <Link href={user ? "/dashboard" : "/"} onClick={onNavigate}>
        <img
          src={logoImage}
          alt="Chroma"
          className="h-8 w-auto cursor-pointer hover:opacity-90 transition-opacity"
          data-testid="appnav-logo"
        />
      </Link>

      <nav className="mt-6 flex-1 space-y-6 overflow-y-auto">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </p>
            <div className="mt-2 space-y-1">
              {section.items.map((item) => {
                const active = location === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} onClick={onNavigate}>
                    <span
                      data-testid={item.testid}
                      className={`group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors cursor-pointer ${
                        active
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border ${
                          active
                            ? "border-primary/30 bg-gradient-to-br from-primary/15 to-chart-2/15 text-primary"
                            : "border-border/60 bg-muted/40 text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 font-medium leading-none">
                          {item.label}
                          {item.locked && <Lock className="h-3 w-3 text-muted-foreground" />}
                        </span>
                        <span className="mt-1 block truncate text-xs text-muted-foreground">
                          {item.hint}
                        </span>
                      </span>
                      {active && <span className="h-5 w-1 rounded-full bg-gradient-to-b from-primary to-chart-2" />}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-6 border-t border-border/60 pt-4">
        {user ? (
          <div className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/30 px-3 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-2 text-xs font-bold text-white">
              {(user.username || user.email || "C").slice(0, 1).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{user.username || "Colorist"}</span>
              <span className="block text-xs capitalize text-muted-foreground">{tier} plan</span>
            </span>
          </div>
        ) : (
          <Link href="/auth" onClick={onNavigate}>
            <Button className="w-full" data-testid="appnav-login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border/60 bg-background/80 p-4 backdrop-blur-sm lg:block">
        <SidebarBody onNavigate={() => {}} />
      </aside>

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 md:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" data-testid="appnav-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-4">
                <SidebarBody onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-semibold leading-tight md:text-lg" data-testid="appnav-title">
                {title}
              </h1>
              {description && (
                <p className="truncate text-xs text-muted-foreground md:text-sm">{description}</p>
              )}
            </div>

            {user && (
              <Badge
                variant="outline"
                data-testid="appnav-tier"
                className="hidden text-[10px] font-semibold uppercase tracking-wider sm:inline-flex"
              >
                {tier}
              </Badge>
            )}
            {showUpgrade && (
              <Link href="/upgrade">
                <Button size="sm" data-testid="appnav-upgrade" className="bg-gradient-to-r from-primary to-chart-2 text-white">
                  <Crown className="mr-1.5 h-3.5 w-3.5" />
                  Upgrade
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              data-testid="appnav-theme"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            {user ? (
              <>
                <Link href="/settings">
                  <Button variant="ghost" size="icon" data-testid="appnav-settings" aria-label="Settings">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Log out"
                  data-testid="appnav-logout"
                  onClick={() => logoutMutation.mutate()}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button size="sm" data-testid="appnav-login-top">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </header>

        {/* Page content keeps its own layout rhythm */}
        <div className="px-4 py-6 md:px-6 md:py-8">{children}</div>
      </div>
    </div>
  );
}

export default AppShell;
