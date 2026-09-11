// ============================================================
// GreenCompute - Application Constants
// File: frontend/src/utils/constants.js
// ============================================================

// ============================================================
// APPLICATION
// ============================================================

export const APP_NAME = "GreenCompute";

export const APP_DESCRIPTION =
  "AI-powered Digital Sustainability Platform for Educational Institutions";

export const APP_VERSION = "1.0.0";


// ============================================================
// API
// ============================================================

export const API_TIMEOUT = 30000;

export const API_DEFAULT_PAGE_SIZE = 20;

export const API_MAX_PAGE_SIZE = 100;


// ============================================================
// USER ROLES
// ============================================================

export const USER_ROLES = {
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  MANAGER: "manager",
  FACULTY: "faculty",
  OPERATOR: "operator",
  VIEWER: "viewer",
};

export const USER_ROLE_LABELS = {
  admin: "Administrator",
  super_admin: "Super Administrator",
  manager: "Manager",
  faculty: "Faculty",
  operator: "Operator",
  viewer: "Viewer",
};


// ============================================================
// COMPUTER STATUS
// ============================================================

export const COMPUTER_STATUS = {
  ONLINE: "online",
  IDLE: "idle",
  SLEEP: "sleep",
  OFFLINE: "offline",
  SHUTDOWN: "shutdown",
  ERROR: "error",
};

export const COMPUTER_STATUS_LABELS = {
  online: "Online",
  idle: "Idle",
  sleep: "Sleeping",
  offline: "Offline",
  shutdown: "Shutdown",
  error: "Error",
};


// ============================================================
// LAB STATUS
// ============================================================

export const LAB_STATUS = {
  ACTIVE: "active",
  WARNING: "warning",
  INACTIVE: "inactive",
  OFFLINE: "offline",
};

export const LAB_STATUS_LABELS = {
  active: "Active",
  warning: "Warning",
  inactive: "Inactive",
  offline: "Offline",
};


// ============================================================
// CONNECTION STATUS
// ============================================================

export const CONNECTION_STATUS = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  ERROR: "error",
};

export const CONNECTION_STATUS_LABELS = {
  connected: "Connected",
  disconnected: "Disconnected",
  connecting: "Connecting",
  error: "Connection Error",
};


// ============================================================
// POWER STATES
// ============================================================

export const POWER_STATE = {
  RUNNING: "running",
  IDLE: "idle",
  SLEEPING: "sleeping",
  SHUTDOWN: "shutdown",
  OFFLINE: "offline",
};


// ============================================================
// COMPUTER COMMANDS
// ============================================================

export const COMPUTER_COMMANDS = {
  SLEEP: "sleep",
  SHUTDOWN: "shutdown",
  RESTART: "restart",
  WAKE: "wake",
};


// ============================================================
// MONITORING
// ============================================================

export const DEFAULT_MONITORING_INTERVAL = 60;

export const MIN_MONITORING_INTERVAL = 10;

export const MAX_MONITORING_INTERVAL = 3600;

export const DEFAULT_IDLE_THRESHOLD = 15;

export const MIN_IDLE_THRESHOLD = 1;

export const MAX_IDLE_THRESHOLD = 120;


// ============================================================
// SMART SHUTDOWN
// ============================================================

export const DEFAULT_SLEEP_AFTER = 30;

export const DEFAULT_SHUTDOWN_AFTER = 60;

export const MIN_SLEEP_AFTER = 5;

export const MAX_SLEEP_AFTER = 180;

export const MIN_SHUTDOWN_AFTER = 10;

export const MAX_SHUTDOWN_AFTER = 360;


// ============================================================
// ENERGY
// ============================================================

export const ENERGY_UNITS = {
  WH: "Wh",
  KWH: "kWh",
  MWH: "MWh",
};

export const DEFAULT_ELECTRICITY_RATE = 8;

export const MIN_ELECTRICITY_RATE = 0;

export const MAX_ELECTRICITY_RATE = 100;


// ============================================================
// CARBON
// ============================================================

export const CARBON_UNITS = {
  GRAMS: "g",
  KILOGRAMS: "kg",
  TONNES: "t",
};

// Default assumption; institution settings can override this.
export const DEFAULT_EMISSION_FACTOR = 0.708;

export const MIN_EMISSION_FACTOR = 0;

export const MAX_EMISSION_FACTOR = 5;


// ============================================================
// TIME PERIODS
// ============================================================

export const PERIODS = {
  TODAY: "today",
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  QUARTER: "quarter",
  YEAR: "year",
};

export const PERIOD_LABELS = {
  today: "Today",
  day: "Today",
  week: "This Week",
  month: "This Month",
  quarter: "This Quarter",
  year: "This Year",
};


// ============================================================
// DATE FORMATS
// ============================================================

export const DATE_FORMATS = {
  DD_MM_YYYY: "DD/MM/YYYY",
  MM_DD_YYYY: "MM/DD/YYYY",
  YYYY_MM_DD: "YYYY-MM-DD",
  DD_MMM_YYYY: "DD MMM YYYY",
};


// ============================================================
// REPORT TYPES
// ============================================================

export const REPORT_TYPES = {
  SUSTAINABILITY: "sustainability",
  ENERGY: "energy",
  CARBON: "carbon",
  DEPARTMENT: "department",
  LAB: "lab",
  COMPUTER: "computer",
  MONTHLY: "monthly",
  WEEKLY: "weekly",
};

export const REPORT_TYPE_LABELS = {
  sustainability: "Sustainability Report",
  energy: "Energy Report",
  carbon: "Carbon Report",
  department: "Department Report",
  lab: "Lab Report",
  computer: "Computer Report",
  monthly: "Monthly Report",
  weekly: "Weekly Report",
};


// ============================================================
// FILE EXPORT FORMATS
// ============================================================

export const EXPORT_FORMATS = {
  CSV: "csv",
  PDF: "pdf",
  JSON: "json",
  XLSX: "xlsx",
};

export const EXPORT_FORMAT_LABELS = {
  csv: "CSV",
  pdf: "PDF",
  json: "JSON",
  xlsx: "Excel",
};


// ============================================================
// NOTIFICATION TYPES
// ============================================================

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};


// ============================================================
// NOTIFICATION EVENTS
// ============================================================

export const NOTIFICATION_EVENTS = {
  COMPUTER_IDLE: "computer_idle",
  COMPUTER_OFFLINE: "computer_offline",
  COMPUTER_ONLINE: "computer_online",
  SHUTDOWN_STARTED: "shutdown_started",
  SHUTDOWN_COMPLETED: "shutdown_completed",
  ENERGY_LIMIT: "energy_limit",
  CARBON_LIMIT: "carbon_limit",
  REPORT_READY: "report_ready",
  AGENT_DISCONNECTED: "agent_disconnected",
  SYSTEM_ERROR: "system_error",
};


// ============================================================
// ENERGY GOALS
// ============================================================

export const DEFAULT_ENERGY_GOAL = 20;

export const DEFAULT_CARBON_GOAL = 15;

export const DEFAULT_COST_SAVING_GOAL = 10;


// ============================================================
// ECO SCORE
// ============================================================

export const ECO_SCORE = {
  MIN: 0,
  MAX: 100,
};

export const ECO_SCORE_GRADES = {
  EXCELLENT: "A+",
  VERY_GOOD: "A",
  GOOD: "B",
  AVERAGE: "C",
  NEEDS_IMPROVEMENT: "D",
  CRITICAL: "E",
};

export const ECO_SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  VERY_GOOD: 80,
  GOOD: 70,
  AVERAGE: 60,
  NEEDS_IMPROVEMENT: 50,
};


// ============================================================
// ECO SCORE WEIGHTS
// ============================================================

export const ECO_SCORE_WEIGHTS = {
  ENERGY_EFFICIENCY: 0.4,
  CARBON_REDUCTION: 0.3,
  IDLE_REDUCTION: 0.2,
  SMART_SHUTDOWN: 0.1,
};


// ============================================================
// DASHBOARD
// ============================================================

export const DASHBOARD_REFRESH_INTERVAL = 60000;

export const DASHBOARD_ACTIVITY_LIMIT = 10;

export const DASHBOARD_TOP_COMPUTERS_LIMIT = 10;

export const DASHBOARD_TOP_LABS_LIMIT = 10;

export const DASHBOARD_TOP_DEPARTMENTS_LIMIT = 10;


// ============================================================
// CHART TYPES
// ============================================================

export const CHART_TYPES = {
  LINE: "line",
  AREA: "area",
  BAR: "bar",
  PIE: "pie",
  HEATMAP: "heatmap",
};


// ============================================================
// CHART PERIOD OPTIONS
// ============================================================

export const CHART_PERIOD_OPTIONS = [
  {
    value: "week",
    label: "7 Days",
  },
  {
    value: "month",
    label: "30 Days",
  },
  {
    value: "quarter",
    label: "3 Months",
  },
  {
    value: "year",
    label: "12 Months",
  },
];


// ============================================================
// DAYS OF WEEK
// ============================================================

export const DAYS_OF_WEEK = [
  {
    value: 0,
    short: "Sun",
    label: "Sunday",
  },
  {
    value: 1,
    short: "Mon",
    label: "Monday",
  },
  {
    value: 2,
    short: "Tue",
    label: "Tuesday",
  },
  {
    value: 3,
    short: "Wed",
    label: "Wednesday",
  },
  {
    value: 4,
    short: "Thu",
    label: "Thursday",
  },
  {
    value: 5,
    short: "Fri",
    label: "Friday",
  },
  {
    value: 6,
    short: "Sat",
    label: "Saturday",
  },
];


// ============================================================
// MONTHS
// ============================================================

export const MONTHS = [
  {
    value: 0,
    short: "Jan",
    label: "January",
  },
  {
    value: 1,
    short: "Feb",
    label: "February",
  },
  {
    value: 2,
    short: "Mar",
    label: "March",
  },
  {
    value: 3,
    short: "Apr",
    label: "April",
  },
  {
    value: 4,
    short: "May",
    label: "May",
  },
  {
    value: 5,
    short: "Jun",
    label: "June",
  },
  {
    value: 6,
    short: "Jul",
    label: "July",
  },
  {
    value: 7,
    short: "Aug",
    label: "August",
  },
  {
    value: 8,
    short: "Sep",
    label: "September",
  },
  {
    value: 9,
    short: "Oct",
    label: "October",
  },
  {
    value: 10,
    short: "Nov",
    label: "November",
  },
  {
    value: 11,
    short: "Dec",
    label: "December",
  },
];


// ============================================================
// LANGUAGES
// ============================================================

export const LANGUAGES = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "bn",
    label: "বাংলা",
  },
  {
    value: "hi",
    label: "हिन्दी",
  },
];


// ============================================================
// TIMEZONES
// ============================================================

export const TIMEZONES = [
  {
    value: "Asia/Kolkata",
    label: "India Standard Time (IST)",
  },
  {
    value: "UTC",
    label: "UTC",
  },
];


// ============================================================
// UI
// ============================================================

export const UI_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
};

export const UI_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  INFO: "info",
};


// ============================================================
// PAGINATION
// ============================================================

export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [
  10,
  20,
  50,
  100,
];


// ============================================================
// LOCAL STORAGE KEYS
// ============================================================

export const STORAGE_KEYS = {
  TOKEN: "greencompute_token",
  USER: "greencompute_user",
  THEME: "greencompute_theme",
  LANGUAGE: "greencompute_language",
  SETTINGS: "greencompute_settings",
};


// ============================================================
// FORM VALIDATION
// ============================================================

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,

  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,

  MIN_DESCRIPTION_LENGTH: 0,
  MAX_DESCRIPTION_LENGTH: 500,
};


// ============================================================
// DEFAULT COMPUTER POWER
// ============================================================

export const DEFAULT_COMPUTER_POWER = 120;

export const MIN_COMPUTER_POWER = 10;

export const MAX_COMPUTER_POWER = 2000;


// ============================================================
// DEFAULT SETTINGS
// ============================================================

export const DEFAULT_SETTINGS = {
  language: "en",
  timezone: "Asia/Kolkata",
  dateFormat: "DD MMM YYYY",

  monitoringEnabled: true,
  monitoringInterval: 60,
  collectHardware: true,
  collectPowerData: true,

  smartShutdownEnabled: true,
  idleThreshold: 15,
  sleepAfter: 30,
  shutdownAfter: 60,
  scheduleBasedShutdown: true,
  holidayMode: true,
  examMode: false,

  defaultPower: DEFAULT_COMPUTER_POWER,
  electricityRate: DEFAULT_ELECTRICITY_RATE,
  emissionFactor: DEFAULT_EMISSION_FACTOR,

  emailNotifications: true,
  idleAlerts: true,
  shutdownAlerts: true,
  weeklyReports: true,
  monthlyReports: true,
};


// ============================================================
// AGENT
// ============================================================

export const AGENT_STATUS = {
  ONLINE: "online",
  OFFLINE: "offline",
  CONNECTING: "connecting",
  ERROR: "error",
};

export const AGENT_HEARTBEAT_INTERVAL = 30000;

export const AGENT_METRICS_INTERVAL = 60000;


// ============================================================
// HTTP STATUS
// ============================================================

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};


// ============================================================
// SORT OPTIONS
// ============================================================

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
};

export const COMPUTER_SORT_OPTIONS = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "cpu",
    label: "CPU Usage",
  },
  {
    value: "ram",
    label: "RAM Usage",
  },
  {
    value: "energy",
    label: "Energy Consumption",
  },
];


// ============================================================
// FILTER OPTIONS
// ============================================================

export const COMPUTER_STATUS_FILTERS = [
  {
    value: "all",
    label: "All Computers",
  },
  {
    value: COMPUTER_STATUS.ONLINE,
    label: "Online",
  },
  {
    value: COMPUTER_STATUS.IDLE,
    label: "Idle",
  },
  {
    value: COMPUTER_STATUS.SLEEP,
    label: "Sleeping",
  },
  {
    value: COMPUTER_STATUS.OFFLINE,
    label: "Offline",
  },
];

export const LAB_STATUS_FILTERS = [
  {
    value: "all",
    label: "All Labs",
  },
  {
    value: LAB_STATUS.ACTIVE,
    label: "Active",
  },
  {
    value: LAB_STATUS.WARNING,
    label: "Warning",
  },
  {
    value: LAB_STATUS.INACTIVE,
    label: "Inactive",
  },
  {
    value: LAB_STATUS.OFFLINE,
    label: "Offline",
  },
];


// ============================================================
// AI RECOMMENDATIONS
// ============================================================

export const RECOMMENDATION_TYPES = {
  ENERGY_SAVING: "energy_saving",
  CARBON_REDUCTION: "carbon_reduction",
  IDLE_WASTE: "idle_waste",
  SMART_SHUTDOWN: "smart_shutdown",
  SCHEDULE_OPTIMIZATION: "schedule_optimization",
  HARDWARE: "hardware",
  BEHAVIOR: "behavior",
};

export const RECOMMENDATION_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
};


// ============================================================
// SUCCESS / ERROR MESSAGES
// ============================================================

export const MESSAGES = {
  SUCCESS: {
    SAVED: "Changes saved successfully.",
    CREATED: "Created successfully.",
    UPDATED: "Updated successfully.",
    DELETED: "Deleted successfully.",
    REPORT_GENERATED:
      "Report generated successfully.",
  },

  ERROR: {
    GENERIC:
      "Something went wrong. Please try again.",
    NETWORK:
      "Unable to connect to the server.",
    UNAUTHORIZED:
      "Your session has expired. Please login again.",
    FORBIDDEN:
      "You do not have permission to perform this action.",
    NOT_FOUND:
      "The requested resource was not found.",
    VALIDATION:
      "Please check the entered information.",
  },
};


// ============================================================
// ENVIRONMENT
// ============================================================

export const ENVIRONMENT = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  APP_NAME,
  APP_DESCRIPTION,
  APP_VERSION,

  API_TIMEOUT,
  API_DEFAULT_PAGE_SIZE,
  API_MAX_PAGE_SIZE,

  USER_ROLES,
  USER_ROLE_LABELS,

  COMPUTER_STATUS,
  COMPUTER_STATUS_LABELS,

  LAB_STATUS,
  LAB_STATUS_LABELS,

  CONNECTION_STATUS,
  CONNECTION_STATUS_LABELS,

  POWER_STATE,
  COMPUTER_COMMANDS,

  DEFAULT_MONITORING_INTERVAL,
  MIN_MONITORING_INTERVAL,
  MAX_MONITORING_INTERVAL,

  DEFAULT_IDLE_THRESHOLD,
  MIN_IDLE_THRESHOLD,
  MAX_IDLE_THRESHOLD,

  DEFAULT_SLEEP_AFTER,
  DEFAULT_SHUTDOWN_AFTER,
  MIN_SLEEP_AFTER,
  MAX_SLEEP_AFTER,
  MIN_SHUTDOWN_AFTER,
  MAX_SHUTDOWN_AFTER,

  ENERGY_UNITS,
  DEFAULT_ELECTRICITY_RATE,
  MIN_ELECTRICITY_RATE,
  MAX_ELECTRICITY_RATE,

  CARBON_UNITS,
  DEFAULT_EMISSION_FACTOR,
  MIN_EMISSION_FACTOR,
  MAX_EMISSION_FACTOR,

  PERIODS,
  PERIOD_LABELS,
  DATE_FORMATS,

  REPORT_TYPES,
  REPORT_TYPE_LABELS,

  EXPORT_FORMATS,
  EXPORT_FORMAT_LABELS,

  NOTIFICATION_TYPES,
  NOTIFICATION_EVENTS,

  DEFAULT_ENERGY_GOAL,
  DEFAULT_CARBON_GOAL,
  DEFAULT_COST_SAVING_GOAL,

  ECO_SCORE,
  ECO_SCORE_GRADES,
  ECO_SCORE_THRESHOLDS,
  ECO_SCORE_WEIGHTS,

  DASHBOARD_REFRESH_INTERVAL,
  DASHBOARD_ACTIVITY_LIMIT,
  DASHBOARD_TOP_COMPUTERS_LIMIT,
  DASHBOARD_TOP_LABS_LIMIT,
  DASHBOARD_TOP_DEPARTMENTS_LIMIT,

  CHART_TYPES,
  CHART_PERIOD_OPTIONS,

  DAYS_OF_WEEK,
  MONTHS,

  LANGUAGES,
  TIMEZONES,

  UI_SIZES,
  UI_VARIANTS,

  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,

  STORAGE_KEYS,
  VALIDATION,

  DEFAULT_COMPUTER_POWER,
  MIN_COMPUTER_POWER,
  MAX_COMPUTER_POWER,

  DEFAULT_SETTINGS,

  AGENT_STATUS,
  AGENT_HEARTBEAT_INTERVAL,
  AGENT_METRICS_INTERVAL,

  HTTP_STATUS,

  SORT_DIRECTIONS,
  COMPUTER_SORT_OPTIONS,

  COMPUTER_STATUS_FILTERS,
  LAB_STATUS_FILTERS,

  RECOMMENDATION_TYPES,
  RECOMMENDATION_PRIORITY,

  MESSAGES,
  ENVIRONMENT,
};