import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Subscriptions from "./pages/Subscriptions";
import Finance from "./pages/Finance";
import Customers from "./pages/Customers";
import ApiKeys from "./pages/ApiKeys";
import Users from "./pages/Users";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/api-keys" element={<ApiKeys />} />
          <Route path="/users" element={<Users />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
