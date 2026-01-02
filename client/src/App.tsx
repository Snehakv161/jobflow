import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { JobsProvider } from "@/lib/jobs-context";
import { Layout } from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Tracker from "@/pages/Tracker";
import Opportunities from "@/pages/Opportunities";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/tracker" component={Tracker} />
        <Route path="/opportunities" component={Opportunities} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobsProvider>
        <Router />
        <Toaster />
      </JobsProvider>
    </QueryClientProvider>
  );
}

export default App;
