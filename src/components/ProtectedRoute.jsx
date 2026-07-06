import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "./Loader.jsx";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // Wait until authentication is checked
  if (loading) {
    return <Loader fullScreen label="Checking session..." />;
  }

  // -------------------------------
  // 🚀 Hackathon Demo Mode
  // -------------------------------
  const demoMode = localStorage.getItem("demoMode") === "true";

  // Allow only recruiter/admin routes in demo mode
  if (demoMode) {
    if (
      allowedRoles &&
      (allowedRoles.includes("recruiter") || allowedRoles.includes("admin"))
    ) {
      return children;
    }

    // Prevent demo users from entering candidate pages
    return <Navigate to="/recruiter/dashboard" replace />;
  }

  // -------------------------------
  // Normal Authentication
  // -------------------------------
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role checking
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}