import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import Landing from "./pages/Landing";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";
import Classroom from "./pages/Classroom";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorApplication from "./pages/InstructorApplication";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recording from "./pages/Recording";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/classroom/:sessionId" element={<Classroom />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/apply" element={<InstructorApplication />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recordings/:sessionId" element={<Recording />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <RoleSwitcher />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;