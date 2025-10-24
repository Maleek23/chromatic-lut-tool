// Reference: blueprint:javascript_auth_all_persistance
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { AuthProvider } from "@/hooks/use-auth";
import { NavBar } from "@/components/layout/NavBar";
import { ProtectedRoute } from "@/lib/protected-route";
import { CinemaBackground } from "@/components/visual/CinemaBackground";
import { ColorParticles3D } from "@/components/visual/ColorParticles3D";
import Home from "@/pages/Home";
import Generate from "@/pages/tools/Tool";
import Tools from "@/pages/tools/Tools";
import Convert from "@/pages/tools/Convert";
import Analyze from "@/pages/tools/Analyze";
import Optimize from "@/pages/tools/Optimize";
import AuthPage from "@/pages/auth/AuthPage";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Upgrade from "@/pages/user/Upgrade";
import LearnMore from "@/pages/info/LearnMore";
import AccountSettings from "@/pages/user/AccountSettings";
import Dashboard from "@/pages/user/Dashboard";
import Resources from "@/pages/info/Resources";
import InstallLuts from "@/pages/info/InstallLuts";
import LutFormats from "@/pages/info/LutFormats";
import CreateFromImages from "@/pages/info/CreateFromImages";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";
import About from "@/pages/info/About";
import Support from "@/pages/info/Support";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/visuals">
          {() => {
            window.location.href = '/';
            return null;
          }}
        </Route>
        <Route path="/generate" component={Generate} />
        <Route path="/tools" component={Tools} />
        <ProtectedRoute path="/convert" component={Convert} />
        <ProtectedRoute path="/analyze" component={Analyze} />
        <ProtectedRoute path="/optimize" component={Optimize} />
        <Route path="/color-science" component={LearnMore} />
        <Route path="/resources" component={Resources} />
        <Route path="/resources/install-luts" component={InstallLuts} />
        <Route path="/resources/lut-formats" component={LutFormats} />
        <Route path="/resources/create-from-images" component={CreateFromImages} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/about" component={About} />
        <Route path="/support" component={Support} />
        <ProtectedRoute path="/settings" component={AccountSettings} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/upgrade" component={Upgrade} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
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
            <div className="min-h-screen bg-background relative">
              {/* Technical grid pattern - extends everywhere including header/footer */}
              <div 
                className="fixed inset-0 pointer-events-none z-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px'
                }}
              />
              
              <div className="relative z-10">
                <Toaster />
                <Router />
              </div>
            </div>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
