import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NavBar } from "@/components/NavBar";
import Landing from "@/pages/Landing";
import Convert from "@/pages/Convert";
import Analyze from "@/pages/Analyze";
import Optimize from "@/pages/Optimize";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/convert" component={Convert} />
        <Route path="/analyze" component={Analyze} />
        <Route path="/optimize" component={Optimize} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
