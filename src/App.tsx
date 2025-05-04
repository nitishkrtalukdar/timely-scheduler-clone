
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Scheduled from "./pages/Scheduled";
import CalendarPage from "./pages/CalendarPage";
import CreatePost from "./pages/CreatePost";
import Settings from "./pages/Settings";
import ChannelView from "./pages/ChannelView";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useAuthStore } from "./stores/authStore";
import { isSupabaseConfigured } from "@/lib/supabase";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

const queryClient = new QueryClient();

// ProtectedRoute component to guard routes requiring authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  // In development, allow access even if not authenticated
  const isDev = import.meta.env.DEV;
  
  if (!isAuthenticated && !isDev) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  useEffect(() => {
    // Show a toast if Supabase is not configured
    if (!isSupabaseConfigured()) {
      toast({
        title: "Supabase not configured",
        description: "Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables. Using local storage for now.",
        duration: 5000,
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Scheduled />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Layout>
                  <CalendarPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <Layout>
                  <CreatePost />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/channels/:platform" element={
              <ProtectedRoute>
                <Layout>
                  <ChannelView />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
