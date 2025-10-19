// Reference: blueprint:javascript_auth_all_persistance
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/use-auth";
import { NavBar } from "@/components/NavBar";
import { ProtectedRoute } from "@/lib/protected-route";
import Landing from "@/pages/Landing";
import Generate from "@/pages/Tool";
import Tools from "@/pages/Tools";
import AuthPage from "@/pages/AuthPage";
import Upgrade from "@/pages/Upgrade";
import LearnMore from "@/pages/LearnMore";
import Settings from "@/pages/Settings";
import Resources from "@/pages/Resources";
import InstallLuts from "@/pages/InstallLuts";
import LutFormats from "@/pages/LutFormats";
import CreateFromImages from "@/pages/CreateFromImages";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/generate" component={Generate} />
        <Route path="/tools" component={Tools} />
        <Route path="/learn-more" component={LearnMore} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/install-luts" component={InstallLuts} />
        <Route path="/resources/lut-formats" component={LutFormats} />
        <Route path="/resources/create-from-images" component={CreateFromImages} />
        <ProtectedRoute path="/settings" component={Settings} />
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
