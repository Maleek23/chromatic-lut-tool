// Reference: blueprint:javascript_auth_all_persistance
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/use-auth";
import { NavBar } from "@/components/NavBar";
import Landing from "@/pages/Landing";
import Generate from "@/pages/Tool";
import Tools from "@/pages/Tools";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import Upgrade from "@/pages/Upgrade";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/generate" component={Generate} />
        <Route path="/tools" component={Tools} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/upgrade" component={Upgrade} />
        <Route path="/auth" component={AuthPage} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
