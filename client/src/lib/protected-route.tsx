// Reference: blueprint:javascript_auth_all_persistance
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import { AppShell } from "@/components/layout/AppShell";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element | null;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}

/**
 * Authenticated app route: requires login AND renders inside the persistent
 * app shell (sidebar + topbar), so every product section shares one frame.
 */
export function AppRoute({
  path,
  component: Component,
  title,
  description,
}: {
  path: string;
  component: () => React.JSX.Element | null;
  title: string;
  description?: string;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  return (
    <Route path={path}>
      <AppShell title={title} description={description}>
        <Component />
      </AppShell>
    </Route>
  );
}
