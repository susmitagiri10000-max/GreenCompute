// ============================================================
// GreenCompute - Application Route Constants
// File: frontend/src/constants/routes.js
// ============================================================

// ============================================================
// PUBLIC ROUTES
// ============================================================

export const PUBLIC_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
};


// ============================================================
// DASHBOARD ROUTES
// ============================================================

export const DASHBOARD_ROUTES = {
  DASHBOARD: "/dashboard",
  LABS: "/labs",
  COMPUTERS: "/computers",
  ANALYTICS: "/analytics",
  CARBON: "/carbon",
  REPORTS: "/reports",
  SETTINGS: "/settings",
};


// ============================================================
// DYNAMIC ROUTES
// ============================================================

export const DYNAMIC_ROUTES = {
  LAB_DETAILS: (labId) => `/labs/${labId}`,
};


// ============================================================
// ALL APPLICATION ROUTES
// ============================================================

export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...DASHBOARD_ROUTES,
  ...DYNAMIC_ROUTES,
};


// ============================================================
// ROUTE PATH HELPERS
// ============================================================

export const getLabDetailsRoute = (labId) => {
  return `/labs/${labId}`;
};


// ============================================================
// ROUTE GROUPS
// Useful for navigation, menus and permissions
// ============================================================

export const PUBLIC_ROUTE_PATHS = [
  PUBLIC_ROUTES.HOME,
  PUBLIC_ROUTES.LOGIN,
];

export const PROTECTED_ROUTE_PATHS = [
  DASHBOARD_ROUTES.DASHBOARD,
  DASHBOARD_ROUTES.LABS,
  DASHBOARD_ROUTES.COMPUTERS,
  DASHBOARD_ROUTES.ANALYTICS,
  DASHBOARD_ROUTES.CARBON,
  DASHBOARD_ROUTES.REPORTS,
  DASHBOARD_ROUTES.SETTINGS,
];


// ============================================================
// ROUTE METADATA
// Useful for sidebar, breadcrumbs and page titles
// ============================================================

export const ROUTE_METADATA = {
  [PUBLIC_ROUTES.HOME]: {
    title: "GreenCompute",
    label: "Home",
    isPublic: true,
  },

  [PUBLIC_ROUTES.LOGIN]: {
    title: "Login | GreenCompute",
    label: "Login",
    isPublic: true,
  },

  [DASHBOARD_ROUTES.DASHBOARD]: {
    title: "Dashboard | GreenCompute",
    label: "Dashboard",
    isPublic: false,
  },

  [DASHBOARD_ROUTES.LABS]: {
    title: "Labs | GreenCompute",
    label: "Labs",
    isPublic: false,
  },

  [DASHBOARD_ROUTES.COMPUTERS]: {
    title: "Computers | GreenCompute",
    label: "Computers",
    isPublic: false,
  },

  [DASHBOARD_ROUTES.ANALYTICS]: {
    title: "Analytics | GreenCompute",
    label: "Analytics",
    isPublic: false,
  },

  [DASHBOARD_ROUTES.CARBON]: {
    title: "Carbon Tracker | GreenCompute",
    label: "Carbon Tracker",
    isPublic: false,
  },

  [DASHBOARD_ROUTES.REPORTS]: {
    title: "Reports | GreenCompute",
    label: "Reports",
    isPublic: false,
  },

  [DASHBOARD_ROUTES.SETTINGS]: {
    title: "Settings | GreenCompute",
    label: "Settings",
    isPublic: false,
  },
};


// ============================================================
// DEFAULT ROUTE
// ============================================================

export const DEFAULT_ROUTE = ROUTES.HOME;

export const DEFAULT_AUTHENTICATED_ROUTE =
  ROUTES.DASHBOARD;

export const DEFAULT_UNAUTHENTICATED_ROUTE =
  ROUTES.LOGIN;


// ============================================================
// ROUTE CHECK HELPERS
// ============================================================

export const isPublicRoute = (pathname) => {
  return PUBLIC_ROUTE_PATHS.includes(pathname);
};

export const isProtectedRoute = (pathname) => {
  return PROTECTED_ROUTE_PATHS.includes(pathname);
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  PUBLIC_ROUTES,
  DASHBOARD_ROUTES,
  DYNAMIC_ROUTES,
  ROUTES,
  getLabDetailsRoute,
  PUBLIC_ROUTE_PATHS,
  PROTECTED_ROUTE_PATHS,
  ROUTE_METADATA,
  DEFAULT_ROUTE,
  DEFAULT_AUTHENTICATED_ROUTE,
  DEFAULT_UNAUTHENTICATED_ROUTE,
  isPublicRoute,
  isProtectedRoute,
};