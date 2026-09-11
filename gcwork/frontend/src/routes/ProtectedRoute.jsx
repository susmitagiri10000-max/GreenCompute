// ============================================================
// GreenCompute - Protected Route
// File: frontend/src/routes/ProtectedRoute.jsx
// ============================================================

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/common/LoadingSpinner";


// ============================================================
// PROTECTED ROUTE COMPONENT
// ============================================================

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // ----------------------------------------------------------
  // Show loading screen while authentication is being checked
  // ----------------------------------------------------------

  if (loading) {
    return (
      <LoadingSpinner
        size="lg"
        text="Checking authentication..."
        fullscreen
      />
    );
  }

  // ----------------------------------------------------------
  // User is NOT authenticated
  // Redirect to Login page
  // ----------------------------------------------------------

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // ----------------------------------------------------------
  // User is authenticated
  // Allow access to protected page
  // ----------------------------------------------------------

  return children;
};

export default ProtectedRoute;