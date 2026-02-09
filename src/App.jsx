import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Leads from "./pages/leads/Leads";
import LeadDetails from "./pages/leads/LeadDetails";
import { LeadsProvider } from "./context/LeadsContext";
import DashboardLayout from "./layouts/DashboardLayout";

// Wrapper for Dashboard Layout
const DashboardRoute = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
);

export default function App() {
  return (
    <LeadsProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Protected Routes with Layout */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardRoute />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/:id" element={<LeadDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LeadsProvider>
  );
}
