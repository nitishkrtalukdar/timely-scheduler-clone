
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <Layout>
                <Scheduled />
              </Layout>
            } />
            <Route path="/calendar" element={
              <Layout>
                <CalendarPage />
              </Layout>
            } />
            <Route path="/create" element={
              <Layout>
                <CreatePost />
              </Layout>
            } />
            <Route path="/settings" element={
              <Layout>
                <Settings />
              </Layout>
            } />
            <Route path="/channels/:platform" element={
              <Layout>
                <ChannelView />
              </Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
