// ============================================================
// GreenCompute - Application Configuration
// File: frontend/src/constants/config.js
// ============================================================

// ============================================================
// APPLICATION
// ============================================================

export const APP_CONFIG = {
  NAME: "GreenCompute",

  VERSION: "1.0.0",

  DESCRIPTION:
    "AI-powered Digital Sustainability Platform for Educational Institutions",

  COMPANY: "GreenCompute",

  ENVIRONMENT:
    import.meta.env.MODE || "development",

  IS_DEVELOPMENT:
    import.meta.env.DEV,

  IS_PRODUCTION:
    import.meta.env.PROD,
};


// ============================================================
// API CONFIGURATION
// ============================================================

export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000",

  API_PREFIX: "/api",

  TIMEOUT: 30000,

  RETRY_ATTEMPTS: 3,

  RETRY_DELAY: 1000,

  HEALTH_ENDPOINT: "/health",
};


// ============================================================
// WEBSOCKET CONFIGURATION
// ============================================================

const getWebSocketURL = () => {
  const apiURL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000";

  if (apiURL.startsWith("https://")) {
    return apiURL.replace("https://", "wss://");
  }

  if (apiURL.startsWith("http://")) {
    return apiURL.replace("http://", "ws://");
  }

  return apiURL;
};

export const WEBSOCKET_CONFIG = {
  BASE_URL: getWebSocketURL(),

  ENDPOINT: "/api/ws",

  RECONNECT: true,

  RECONNECT_INTERVAL: 5000,

  MAX_RECONNECT_ATTEMPTS: 10,

  HEARTBEAT_INTERVAL: 30000,

  CONNECTION_TIMEOUT: 10000,
};


// ============================================================
// AUTHENTICATION CONFIGURATION
// ============================================================

export const AUTH_CONFIG = {
  TOKEN_KEY: "greencompute_token",

  USER_KEY: "greencompute_user",

  REFRESH_TOKEN_KEY:
    "greencompute_refresh_token",

  TOKEN_EXPIRY_BUFFER: 60,

  SESSION_TIMEOUT: 60 * 60 * 1000,

  LOGIN_REDIRECT: "/dashboard",

  LOGOUT_REDIRECT: "/login",
};


// ============================================================
// LOCAL STORAGE CONFIGURATION
// ============================================================

export const STORAGE_KEYS = {
  TOKEN: "greencompute_token",

  USER: "greencompute_user",

  REFRESH_TOKEN:
    "greencompute_refresh_token",

  THEME: "greencompute_theme",

  LANGUAGE: "greencompute_language",

  SETTINGS: "greencompute_settings",

  DASHBOARD_CONFIG:
    "greencompute_dashboard_config",

  SIDEBAR_STATE:
    "greencompute_sidebar_state",

  NOTIFICATIONS:
    "greencompute_notifications",
};


// ============================================================
// THEME CONFIGURATION
// ============================================================

export const THEME_CONFIG = {
  DEFAULT: "light",

  LIGHT: "light",

  DARK: "dark",

  SYSTEM: "system",

  STORAGE_KEY:
    STORAGE_KEYS.THEME,
};


// ============================================================
// MONITORING CONFIGURATION
// ============================================================

export const MONITORING_CONFIG = {
  ENABLED: true,

  DEFAULT_INTERVAL: 60000,

  MIN_INTERVAL: 10000,

  MAX_INTERVAL: 300000,

  HEARTBEAT_INTERVAL: 30000,

  METRICS_INTERVAL: 60000,

  IDLE_THRESHOLD: 10,

  AGENT_TIMEOUT: 120000,
};


// ============================================================
// SMART SHUTDOWN CONFIGURATION
// ============================================================

export const SMART_SHUTDOWN_CONFIG = {
  ENABLED: true,

  DEFAULT_IDLE_THRESHOLD: 15,

  DEFAULT_SLEEP_AFTER: 30,

  DEFAULT_SHUTDOWN_AFTER: 120,

  MIN_IDLE_THRESHOLD: 5,

  MAX_IDLE_THRESHOLD: 240,

  COUNTDOWN_SECONDS: 60,

  HOLIDAY_MODE: true,

  EXAM_MODE: true,

  SCHEDULE_BASED_SHUTDOWN: true,
};


// ============================================================
// ENERGY CONFIGURATION
// ============================================================

export const ENERGY_CONFIG = {
  DEFAULT_COMPUTER_POWER: 150,

  DEFAULT_MONITOR_POWER: 30,

  DEFAULT_TOTAL_POWER: 180,

  DEFAULT_ELECTRICITY_RATE: 8,

  UNIT: "kWh",

  POWER_UNIT: "W",

  MAX_REASONABLE_POWER: 2000,
};


// ============================================================
// CARBON CONFIGURATION
// ============================================================

export const CARBON_CONFIG = {
  DEFAULT_EMISSION_FACTOR: 0.708,

  UNIT: "kg CO₂",

  EMISSION_UNIT:
    "kg CO₂/kWh",

  TREE_EQUIVALENT_FACTOR: 21,
};


// ============================================================
// CURRENCY CONFIGURATION
// ============================================================

export const CURRENCY_CONFIG = {
  CODE: "INR",

  SYMBOL: "₹",

  LOCALE: "en-IN",

  DEFAULT_RATE: 8,
};


// ============================================================
// PAGINATION CONFIGURATION
// ============================================================

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,

  DEFAULT_PAGE_SIZE: 10,

  SMALL_PAGE_SIZE: 5,

  LARGE_PAGE_SIZE: 25,

  MAX_PAGE_SIZE: 100,
};


// ============================================================
// SEARCH CONFIGURATION
// ============================================================

export const SEARCH_CONFIG = {
  MIN_LENGTH: 2,

  MAX_LENGTH: 100,

  DEBOUNCE_DELAY: 300,
};


// ============================================================
// FILE UPLOAD CONFIGURATION
// ============================================================

export const FILE_CONFIG = {
  MAX_FILE_SIZE:
    10 * 1024 * 1024,

  MAX_IMAGE_SIZE:
    5 * 1024 * 1024,

  ACCEPTED_REPORT_FORMATS: [
    ".pdf",
    ".csv",
  ],

  ACCEPTED_DATA_FORMATS: [
    ".csv",
    ".xlsx",
    ".xls",
  ],

  ACCEPTED_IMAGE_FORMATS: [
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
  ],
};


// ============================================================
// REPORT CONFIGURATION
// ============================================================

export const REPORT_CONFIG = {
  DEFAULT_PERIOD: "month",

  DEFAULT_FORMAT: "pdf",

  MAX_REPORTS_PER_PAGE: 10,

  INCLUDE_CHARTS: true,

  INCLUDE_RECOMMENDATIONS: true,

  INCLUDE_CARBON_DATA: true,

  INCLUDE_DEPARTMENT_RANKING: true,
};


// ============================================================
// NOTIFICATION CONFIGURATION
// ============================================================

export const NOTIFICATION_CONFIG = {
  DEFAULT_DURATION: 5000,

  SUCCESS_DURATION: 4000,

  ERROR_DURATION: 7000,

  WARNING_DURATION: 6000,

  INFO_DURATION: 5000,

  MAX_NOTIFICATIONS: 5,

  POSITION: "top-right",
};


// ============================================================
// UI CONFIGURATION
// ============================================================

export const UI_CONFIG = {
  SIDEBAR_WIDTH: 256,

  MOBILE_BREAKPOINT: 768,

  TABLET_BREAKPOINT: 1024,

  DESKTOP_BREAKPOINT: 1280,

  ANIMATION_DURATION: 300,

  MODAL_ANIMATION_DURATION: 200,

  TOOLTIP_DELAY: 300,
};


// ============================================================
// DASHBOARD CONFIGURATION
// ============================================================

export const DASHBOARD_CONFIG = {
  REFRESH_INTERVAL: 60000,

  ACTIVITY_LIMIT: 10,

  TOP_COMPUTERS_LIMIT: 5,

  TOP_DEPARTMENTS_LIMIT: 5,

  DEFAULT_PERIOD: "week",

  SHOW_ECO_SCORE: true,

  SHOW_GOAL_PROGRESS: true,

  SHOW_ACTIVITY_FEED: true,

  SHOW_HEATMAP: true,
};


// ============================================================
// CHART CONFIGURATION
// ============================================================

export const CHART_CONFIG = {
  DEFAULT_HEIGHT: 320,

  MOBILE_HEIGHT: 250,

  ANIMATION_DURATION: 800,

  SHOW_GRID: true,

  SHOW_TOOLTIP: true,

  SHOW_LEGEND: true,

  RESPONSIVE: true,
};


// ============================================================
// AI CONFIGURATION
// ============================================================

export const AI_CONFIG = {
  ENABLED: true,

  RECOMMENDATIONS_ENABLED: true,

  FORECAST_ENABLED: true,

  WASTE_DETECTION_ENABLED: true,

  ECO_SCORE_ENABLED: true,

  DEFAULT_FORECAST_DAYS: 7,

  MAX_RECOMMENDATIONS: 10,
};


// ============================================================
// FEATURE FLAGS
// ============================================================

export const FEATURES = {
  AUTHENTICATION: true,

  DASHBOARD: true,

  LAB_MONITORING: true,

  COMPUTER_MONITORING: true,

  ENERGY_TRACKING: true,

  CARBON_TRACKING: true,

  SMART_SHUTDOWN: true,

  ANALYTICS: true,

  AI_RECOMMENDATIONS: true,

  REPORTS: true,

  WEBSOCKETS: true,

  NOTIFICATIONS: true,

  DARK_MODE: true,

  EXPORT_CSV: true,

  PDF_REPORTS: true,
};


// ============================================================
// ENVIRONMENT VARIABLES
// ============================================================

export const ENV_CONFIG = {
  API_URL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8000",

  APP_ENV:
    import.meta.env.VITE_APP_ENV ||
    "development",

  APP_NAME:
    import.meta.env.VITE_APP_NAME ||
    "GreenCompute",

  ENABLE_ANALYTICS:
    import.meta.env.VITE_ENABLE_ANALYTICS ===
    "true",

  ENABLE_DEBUG:
    import.meta.env.VITE_ENABLE_DEBUG ===
    "true",
};


// ============================================================
// SECURITY CONFIGURATION
// ============================================================

export const SECURITY_CONFIG = {
  TOKEN_STORAGE:
    "localStorage",

  PASSWORD_MIN_LENGTH: 8,

  PASSWORD_MAX_LENGTH: 128,

  MAX_LOGIN_ATTEMPTS: 5,

  SESSION_WARNING_TIME:
    5 * 60 * 1000,
};


// ============================================================
// DATE & TIME CONFIGURATION
// ============================================================

export const DATE_TIME_CONFIG = {
  DEFAULT_LOCALE: "en-IN",

  DEFAULT_TIMEZONE:
    "Asia/Kolkata",

  DATE_FORMAT: "DD/MM/YYYY",

  TIME_FORMAT: "HH:mm",

  DATETIME_FORMAT:
    "DD/MM/YYYY HH:mm",

  FIRST_DAY_OF_WEEK: 1,
};


// ============================================================
// DEFAULT APPLICATION SETTINGS
// ============================================================

export const DEFAULT_SETTINGS = {
  language: "en",

  timezone: "Asia/Kolkata",

  dateFormat: "DD/MM/YYYY",

  monitoringEnabled: true,

  monitoringInterval:
    MONITORING_CONFIG.DEFAULT_INTERVAL,

  collectHardware: true,

  collectPowerData: true,

  smartShutdownEnabled: true,

  idleThreshold:
    SMART_SHUTDOWN_CONFIG.DEFAULT_IDLE_THRESHOLD,

  sleepAfter:
    SMART_SHUTDOWN_CONFIG.DEFAULT_SLEEP_AFTER,

  shutdownAfter:
    SMART_SHUTDOWN_CONFIG.DEFAULT_SHUTDOWN_AFTER,

  scheduleBasedShutdown: true,

  holidayMode: true,

  examMode: true,

  defaultPower:
    ENERGY_CONFIG.DEFAULT_TOTAL_POWER,

  electricityRate:
    ENERGY_CONFIG.DEFAULT_ELECTRICITY_RATE,

  emissionFactor:
    CARBON_CONFIG.DEFAULT_EMISSION_FACTOR,

  emailNotifications: true,

  idleAlerts: true,

  shutdownAlerts: true,

  weeklyReports: true,

  monthlyReports: true,
};


// ============================================================
// APPLICATION URLS
// ============================================================

export const APP_URLS = {
  HOME: "/",

  LOGIN: "/login",

  DASHBOARD: "/dashboard",

  LABS: "/labs",

  COMPUTERS: "/computers",

  ANALYTICS: "/analytics",

  CARBON: "/carbon",

  REPORTS: "/reports",

  SETTINGS: "/settings",
};


// ============================================================
// EXTERNAL LINKS
// ============================================================

export const EXTERNAL_LINKS = {
  GITHUB:
    "https://github.com",

  LINKEDIN:
    "https://linkedin.com",

  DOCUMENTATION:
    "#",

  SUPPORT:
    "mailto:hello@greencompute.com",
};


// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get API URL
 */
export const getApiUrl = (endpoint = "") => {
  const baseUrl =
    API_CONFIG.BASE_URL.replace(/\/$/, "");

  const cleanEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  return `${baseUrl}${cleanEndpoint}`;
};


/**
 * Get WebSocket URL
 */
export const getWebSocketUrl = (
  endpoint = WEBSOCKET_CONFIG.ENDPOINT
) => {
  const baseUrl =
    WEBSOCKET_CONFIG.BASE_URL.replace(
      /\/$/,
      ""
    );

  const cleanEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  return `${baseUrl}${cleanEndpoint}`;
};


/**
 * Check if feature is enabled
 */
export const isFeatureEnabled = (
  featureName
) => {
  return Boolean(
    FEATURES[featureName]
  );
};


/**
 * Check production environment
 */
export const isProduction = () => {
  return APP_CONFIG.IS_PRODUCTION;
};


/**
 * Check development environment
 */
export const isDevelopment = () => {
  return APP_CONFIG.IS_DEVELOPMENT;
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  APP_CONFIG,
  API_CONFIG,
  WEBSOCKET_CONFIG,
  AUTH_CONFIG,
  STORAGE_KEYS,
  THEME_CONFIG,

  MONITORING_CONFIG,
  SMART_SHUTDOWN_CONFIG,

  ENERGY_CONFIG,
  CARBON_CONFIG,
  CURRENCY_CONFIG,

  PAGINATION_CONFIG,
  SEARCH_CONFIG,
  FILE_CONFIG,
  REPORT_CONFIG,
  NOTIFICATION_CONFIG,

  UI_CONFIG,
  DASHBOARD_CONFIG,
  CHART_CONFIG,
  AI_CONFIG,

  FEATURES,
  ENV_CONFIG,
  SECURITY_CONFIG,
  DATE_TIME_CONFIG,

  DEFAULT_SETTINGS,

  APP_URLS,
  EXTERNAL_LINKS,

  getApiUrl,
  getWebSocketUrl,
  isFeatureEnabled,
  isProduction,
  isDevelopment,
};