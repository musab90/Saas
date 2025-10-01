import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SuperAdminAuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import SuperAdminLogin from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionPlans from "./pages/SubscriptionPlans";
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
    <SuperAdminAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SuperAdminLogin />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/tenants" 
              element={
                <PrivateRoute>
                  <Tenants />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/subscriptions" 
              element={
                <PrivateRoute>
                  <Subscriptions />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/subscription-plans" 
              element={
                <PrivateRoute>
                  <SubscriptionPlans />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/finance" 
              element={
                <PrivateRoute>
                  <Finance />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/customers" 
              element={
                <PrivateRoute>
                  <Customers />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/api-keys" 
              element={
                <PrivateRoute>
                  <ApiKeys />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/users" 
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/logs" 
              element={
                <PrivateRoute>
                  <Logs />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SuperAdminAuthProvider>
  </QueryClientProvider>
);

export default App;
