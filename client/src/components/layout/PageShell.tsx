import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";

const WIDTHS: Record<string, string> = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
};

interface PageShellProps {
  /** Small icon shown above the title. */
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Buttons/links shown under the subtitle. */
  actions?: ReactNode;
  /** Optional content rendered to the right of the hero (e.g. usage status). */
  aside?: ReactNode;
  width?: "md" | "lg" | "xl";
  children: ReactNode;
  className?: string;
}

/**
 * The single page frame used across Chroma.
 * Keeps hero spacing, background texture, max-width and footer identical everywhere.
 */
export function PageShell({
  icon,
  title,
  subtitle,
  actions,
  aside,
  width = "xl",
  children,
  className = "",
}: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Shared background texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(107, 124, 237, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107, 124, 237, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          imageRendering: "pixelated",
          maskImage: `linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)`,
        }}
      />

      <main className={`relative z-10 mx-auto px-4 md:px-6 py-8 md:py-12 ${WIDTHS[width]} ${className}`}>
        <header className="mb-10 max-w-3xl space-y-4">
          <div className="flex items-start gap-4">
            {icon && (
              <div className="shrink-0 rounded-lg border border-border bg-muted/40 p-3 text-foreground">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && <div className="flex flex-wrap items-center gap-3 pt-1">{actions}</div>}
          {aside && <div className="pt-2">{aside}</div>}
        </header>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default PageShell;
