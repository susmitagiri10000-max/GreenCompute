// ============================================================
// GreenCompute - Dashboard Constants
// File: frontend/src/constants/dashboard.js
// ============================================================


// ============================================================
// DASHBOARD STAT TYPES
// ============================================================

export const DASHBOARD_STATS = {
  ENERGY_USED: "energy_used",
  CARBON_EMITTED: "carbon_emitted",
  ENERGY_SAVED: "energy_saved",
  IDLE_MACHINES: "idle_machines",
  MACHINES_RUNNING: "machines_running",
  ECO_SCORE: "eco_score",
};


// ============================================================
// DASHBOARD STAT LABELS
// ============================================================

export const DASHBOARD_STAT_LABELS = {
  [DASHBOARD_STATS.ENERGY_USED]: "Energy Used Today",
  [DASHBOARD_STATS.CARBON_EMITTED]: "CO₂ Emitted",
  [DASHBOARD_STATS.ENERGY_SAVED]: "Energy Saved",
  [DASHBOARD_STATS.IDLE_MACHINES]: "Idle Machines",
  [DASHBOARD_STATS.MACHINES_RUNNING]: "Machines Running",
  [DASHBOARD_STATS.ECO_SCORE]: "Eco Score",
};


// ============================================================
// DASHBOARD STAT UNITS
// ============================================================

export const DASHBOARD_STAT_UNITS = {
  [DASHBOARD_STATS.ENERGY_USED]: "kWh",
  [DASHBOARD_STATS.CARBON_EMITTED]: "kg",
  [DASHBOARD_STATS.ENERGY_SAVED]: "kWh",
  [DASHBOARD_STATS.IDLE_MACHINES]: "machines",
  [DASHBOARD_STATS.MACHINES_RUNNING]: "machines",
  [DASHBOARD_STATS.ECO_SCORE]: "/100",
};


// ============================================================
// DASHBOARD CHART TYPES
// ============================================================

export const DASHBOARD_CHARTS = {
  ENERGY_TREND: "energy_trend",
  CARBON_TREND: "carbon_trend",
  DEPARTMENT_ENERGY: "department_energy",
  ENERGY_DISTRIBUTION: "energy_distribution",
  ENERGY_HEATMAP: "energy_heatmap",
};


// ============================================================
// CHART TITLES
// ============================================================

export const DASHBOARD_CHART_TITLES = {
  [DASHBOARD_CHARTS.ENERGY_TREND]: "Energy Consumption",
  [DASHBOARD_CHARTS.CARBON_TREND]: "Carbon Emissions",
  [DASHBOARD_CHARTS.DEPARTMENT_ENERGY]: "Department Energy Usage",
  [DASHBOARD_CHARTS.ENERGY_DISTRIBUTION]: "Energy Distribution",
  [DASHBOARD_CHARTS.ENERGY_HEATMAP]: "Energy Consumption Heatmap",
};


// ============================================================
// DASHBOARD PERIODS
// ============================================================

export const DASHBOARD_PERIODS = {
  TODAY: "today",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};


// ============================================================
// DASHBOARD PERIOD LABELS
// ============================================================

export const DASHBOARD_PERIOD_LABELS = {
  [DASHBOARD_PERIODS.TODAY]: "Today",
  [DASHBOARD_PERIODS.WEEK]: "This Week",
  [DASHBOARD_PERIODS.MONTH]: "This Month",
  [DASHBOARD_PERIODS.YEAR]: "This Year",
};


// ============================================================
// PERIOD OPTIONS
// Useful for Dropdown components
// ============================================================

export const DASHBOARD_PERIOD_OPTIONS = [
  {
    value: DASHBOARD_PERIODS.TODAY,
    label: DASHBOARD_PERIOD_LABELS[DASHBOARD_PERIODS.TODAY],
  },
  {
    value: DASHBOARD_PERIODS.WEEK,
    label: DASHBOARD_PERIOD_LABELS[DASHBOARD_PERIODS.WEEK],
  },
  {
    value: DASHBOARD_PERIODS.MONTH,
    label: DASHBOARD_PERIOD_LABELS[DASHBOARD_PERIODS.MONTH],
  },
  {
    value: DASHBOARD_PERIODS.YEAR,
    label: DASHBOARD_PERIOD_LABELS[DASHBOARD_PERIODS.YEAR],
  },
];


// ============================================================
// ACTIVITY TYPES
// ============================================================

export const ACTIVITY_TYPES = {
  COMPUTER_ONLINE: "computer_online",
  COMPUTER_OFFLINE: "computer_offline",
  COMPUTER_IDLE: "computer_idle",
  COMPUTER_SLEEP: "computer_sleep",
  COMPUTER_SHUTDOWN: "computer_shutdown",

  ENERGY_SAVED: "energy_saved",
  CARBON_SAVED: "carbon_saved",

  LAB_CONNECTED: "lab_connected",
  LAB_DISCONNECTED: "lab_disconnected",

  REPORT_GENERATED: "report_generated",

  GOAL_REACHED: "goal_reached",
  GOAL_PROGRESS: "goal_progress",

  SYSTEM_ALERT: "system_alert",
};


// ============================================================
// ACTIVITY LABELS
// ============================================================

export const ACTIVITY_LABELS = {
  [ACTIVITY_TYPES.COMPUTER_ONLINE]: "Computer Online",
  [ACTIVITY_TYPES.COMPUTER_OFFLINE]: "Computer Offline",
  [ACTIVITY_TYPES.COMPUTER_IDLE]: "Computer Idle",
  [ACTIVITY_TYPES.COMPUTER_SLEEP]: "Computer Sleeping",
  [ACTIVITY_TYPES.COMPUTER_SHUTDOWN]: "Computer Shutdown",

  [ACTIVITY_TYPES.ENERGY_SAVED]: "Energy Saved",
  [ACTIVITY_TYPES.CARBON_SAVED]: "Carbon Saved",

  [ACTIVITY_TYPES.LAB_CONNECTED]: "Lab Connected",
  [ACTIVITY_TYPES.LAB_DISCONNECTED]: "Lab Disconnected",

  [ACTIVITY_TYPES.REPORT_GENERATED]: "Report Generated",

  [ACTIVITY_TYPES.GOAL_REACHED]: "Goal Reached",
  [ACTIVITY_TYPES.GOAL_PROGRESS]: "Goal Progress",

  [ACTIVITY_TYPES.SYSTEM_ALERT]: "System Alert",
};


// ============================================================
// ACTIVITY FEED SETTINGS
// ============================================================

export const ACTIVITY_FEED_CONFIG = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
  REFRESH_INTERVAL: 60000,
};


// ============================================================
// DASHBOARD REFRESH SETTINGS
// ============================================================

export const DASHBOARD_REFRESH = {
  DEFAULT_INTERVAL: 60000,
  FAST_INTERVAL: 30000,
  SLOW_INTERVAL: 300000,
  DISABLED: 0,
};


// ============================================================
// DASHBOARD DEFAULT VALUES
// ============================================================

export const DASHBOARD_DEFAULTS = {
  PERIOD: DASHBOARD_PERIODS.WEEK,

  ENERGY_USED: 0,
  CARBON_EMITTED: 0,
  ENERGY_SAVED: 0,

  IDLE_MACHINES: 0,
  MACHINES_RUNNING: 0,

  ECO_SCORE: 0,

  GOAL_CURRENT: 0,
  GOAL_TARGET: 100,

  ACTIVITY_LIMIT: 10,

  REFRESH_INTERVAL: DASHBOARD_REFRESH.DEFAULT_INTERVAL,
};


// ============================================================
// SUSTAINABILITY GOALS
// ============================================================

export const SUSTAINABILITY_GOALS = {
  ENERGY_REDUCTION: "energy_reduction",
  CARBON_REDUCTION: "carbon_reduction",
  ENERGY_SAVINGS: "energy_savings",
  CARBON_SAVINGS: "carbon_savings",
};


// ============================================================
// GOAL LABELS
// ============================================================

export const SUSTAINABILITY_GOAL_LABELS = {
  [SUSTAINABILITY_GOALS.ENERGY_REDUCTION]:
    "Energy Reduction",

  [SUSTAINABILITY_GOALS.CARBON_REDUCTION]:
    "Carbon Reduction",

  [SUSTAINABILITY_GOALS.ENERGY_SAVINGS]:
    "Energy Savings",

  [SUSTAINABILITY_GOALS.CARBON_SAVINGS]:
    "Carbon Savings",
};


// ============================================================
// ECO SCORE
// ============================================================

export const ECO_SCORE = {
  MIN: 0,
  MAX: 100,

  EXCELLENT_MIN: 90,
  GOOD_MIN: 75,
  AVERAGE_MIN: 60,
  NEEDS_IMPROVEMENT_MIN: 40,
};


// ============================================================
// ECO SCORE LABELS
// ============================================================

export const ECO_SCORE_LABELS = {
  EXCELLENT: "Excellent",
  GOOD: "Good",
  AVERAGE: "Average",
  NEEDS_IMPROVEMENT: "Needs Improvement",
  POOR: "Poor",
};


// ============================================================
// ECO SCORE COLORS / UI VARIANTS
// ============================================================

export const ECO_SCORE_VARIANTS = {
  EXCELLENT: "success",
  GOOD: "success",
  AVERAGE: "warning",
  NEEDS_IMPROVEMENT: "warning",
  POOR: "danger",
};


// ============================================================
// DASHBOARD LIMITS
// ============================================================

export const DASHBOARD_LIMITS = {
  MAX_RECENT_ACTIVITIES: 50,
  DEFAULT_RECENT_ACTIVITIES: 10,

  MAX_TOP_COMPUTERS: 10,
  DEFAULT_TOP_COMPUTERS: 5,

  MAX_TOP_DEPARTMENTS: 10,
  DEFAULT_TOP_DEPARTMENTS: 5,
};


// ============================================================
// DASHBOARD DISPLAY SETTINGS
// ============================================================

export const DASHBOARD_DISPLAY = {
  SHOW_STATS: true,
  SHOW_ECO_SCORE: true,
  SHOW_GOAL_PROGRESS: true,
  SHOW_ACTIVITY_FEED: true,

  SHOW_ENERGY_CHART: true,
  SHOW_CARBON_CHART: true,
  SHOW_DEPARTMENT_CHART: true,
  SHOW_DISTRIBUTION_CHART: true,
  SHOW_HEATMAP: true,
};


// ============================================================
// DASHBOARD API ENDPOINTS
// Centralized endpoint references
// ============================================================

export const DASHBOARD_ENDPOINTS = {
  OVERVIEW: "/api/dashboard/overview",
  STATS: "/api/dashboard/stats",

  ENERGY_TODAY: "/api/dashboard/energy/today",
  CARBON_TODAY: "/api/dashboard/carbon/today",

  ENERGY_CHART: "/api/dashboard/energy/chart",
  CARBON_CHART: "/api/dashboard/carbon/chart",

  DEPARTMENT_ENERGY: "/api/dashboard/departments/energy",
  ENERGY_DISTRIBUTION: "/api/dashboard/energy/distribution",

  ENERGY_HEATMAP: "/api/dashboard/energy/heatmap",

  SUSTAINABILITY_GOAL:
    "/api/dashboard/sustainability-goal",

  ECO_SCORE:
    "/api/dashboard/eco-score",

  ACTIVITY:
    "/api/dashboard/activity",

  ONLINE_COMPUTERS:
    "/api/dashboard/computers/online",

  IDLE_COMPUTERS:
    "/api/dashboard/computers/idle",

  OFFLINE_COMPUTERS:
    "/api/dashboard/computers/offline",

  REFRESH:
    "/api/dashboard/refresh",
};


// ============================================================
// DASHBOARD NOTIFICATION MESSAGES
// ============================================================

export const DASHBOARD_MESSAGES = {
  REFRESH_SUCCESS:
    "Dashboard data refreshed successfully.",

  REFRESH_ERROR:
    "Unable to refresh dashboard data.",

  NO_DATA:
    "No dashboard data available.",

  NO_ACTIVITY:
    "No recent activity found.",

  NO_CHART_DATA:
    "No chart data available.",

  LOADING:
    "Loading dashboard data...",
};


// ============================================================
// DASHBOARD QUICK ACTIONS
// ============================================================

export const DASHBOARD_QUICK_ACTIONS = {
  REFRESH: "refresh",
  GENERATE_REPORT: "generate_report",
  ADD_COMPUTER: "add_computer",
  VIEW_LABS: "view_labs",
  VIEW_COMPUTERS: "view_computers",
  VIEW_ANALYTICS: "view_analytics",
};


// ============================================================
// DEFAULT DASHBOARD CONFIGURATION
// ============================================================

export const DEFAULT_DASHBOARD_CONFIG = {
  period: DASHBOARD_DEFAULTS.PERIOD,

  refreshInterval:
    DASHBOARD_DEFAULTS.REFRESH_INTERVAL,

  activityLimit:
    DASHBOARD_DEFAULTS.ACTIVITY_LIMIT,

  display: DASHBOARD_DISPLAY,

  charts: {
    energyTrend: true,
    carbonTrend: true,
    departmentEnergy: true,
    energyDistribution: true,
    heatmap: true,
  },
};


// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get a readable period label
 */
export const getDashboardPeriodLabel = (period) => {
  return (
    DASHBOARD_PERIOD_LABELS[period] ||
    "Unknown Period"
  );
};


/**
 * Get activity label
 */
export const getActivityLabel = (activityType) => {
  return (
    ACTIVITY_LABELS[activityType] ||
    "Activity"
  );
};


/**
 * Get Eco Score label
 */
export const getEcoScoreLabel = (score) => {
  const numericScore = Number(score) || 0;

  if (numericScore >= ECO_SCORE.EXCELLENT_MIN) {
    return ECO_SCORE_LABELS.EXCELLENT;
  }

  if (numericScore >= ECO_SCORE.GOOD_MIN) {
    return ECO_SCORE_LABELS.GOOD;
  }

  if (numericScore >= ECO_SCORE.AVERAGE_MIN) {
    return ECO_SCORE_LABELS.AVERAGE;
  }

  if (
    numericScore >=
    ECO_SCORE.NEEDS_IMPROVEMENT_MIN
  ) {
    return ECO_SCORE_LABELS.NEEDS_IMPROVEMENT;
  }

  return ECO_SCORE_LABELS.POOR;
};


/**
 * Get Eco Score variant
 */
export const getEcoScoreVariant = (score) => {
  const label = getEcoScoreLabel(score);

  return (
    ECO_SCORE_VARIANTS[label] ||
    "default"
  );
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  DASHBOARD_STATS,
  DASHBOARD_STAT_LABELS,
  DASHBOARD_STAT_UNITS,

  DASHBOARD_CHARTS,
  DASHBOARD_CHART_TITLES,

  DASHBOARD_PERIODS,
  DASHBOARD_PERIOD_LABELS,
  DASHBOARD_PERIOD_OPTIONS,

  ACTIVITY_TYPES,
  ACTIVITY_LABELS,
  ACTIVITY_FEED_CONFIG,

  DASHBOARD_REFRESH,
  DASHBOARD_DEFAULTS,

  SUSTAINABILITY_GOALS,
  SUSTAINABILITY_GOAL_LABELS,

  ECO_SCORE,
  ECO_SCORE_LABELS,
  ECO_SCORE_VARIANTS,

  DASHBOARD_LIMITS,
  DASHBOARD_DISPLAY,

  DASHBOARD_ENDPOINTS,
  DASHBOARD_MESSAGES,

  DASHBOARD_QUICK_ACTIONS,
  DEFAULT_DASHBOARD_CONFIG,

  getDashboardPeriodLabel,
  getActivityLabel,
  getEcoScoreLabel,
  getEcoScoreVariant,
};