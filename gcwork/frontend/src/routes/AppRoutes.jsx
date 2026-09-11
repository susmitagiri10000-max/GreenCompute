// ============================================================
// GreenCompute - Application Routes
// File: frontend/src/routes/AppRoutes.jsx
// ============================================================

import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";

// Dashboard Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Labs from "../pages/Labs/Labs";
import LabDetails from "../pages/LabDetails/LabDetails";
import Computers from "../pages/Computers/Computers";
import Analytics from "../pages/Analytics/Analytics";
import Carbon from "../pages/Carbon/Carbon";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";

// Route Protection
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route element={<MainLayout />}>

        {/* Home */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

      </Route>

      {/* ============== PROTECTED DASHBOARD ROUTES ============== */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Labs */}
        <Route
          path="/labs"
          element={<Labs />}
        />

        {/* Lab Details */}
        <Route
          path="/labs/:labId"
          element={<LabDetails />}
        />

        {/* Computers */}
        <Route
          path="/computers"
          element={<Computers />}
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Carbon */}
        <Route
          path="/carbon"
          element={<Carbon />}
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      {/* ================= FALLBACK ================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
};

export default AppRoutes;