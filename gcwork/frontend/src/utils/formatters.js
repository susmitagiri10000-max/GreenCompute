// ============================================================
// GreenCompute - Formatting Utilities
// File: frontend/src/utils/formatters.js
// ============================================================

/**
 * Safely convert a value to a number.
 */
export const toNumber = (value, fallback = 0) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
};

/**
 * Format a number with comma separators.
 *
 * Example:
 * 1234567 -> "1,234,567"
 */
export const formatNumber = (
  value,
  decimals = 0
) => {
  const number = toNumber(value);

  return number.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format percentage.
 *
 * Example:
 * 87.456 -> "87.46%"
 */
export const formatPercentage = (
  value,
  decimals = 1
) => {
  const number = toNumber(value);

  return `${number.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}%`;
};

/**
 * Format energy in kWh.
 *
 * Example:
 * 245.678 -> "245.68 kWh"
 */
export const formatEnergy = (
  value,
  decimals = 2
) => {
  const number = toNumber(value);

  return `${number.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} kWh`;
};

/**
 * Format energy automatically.
 *
 * Example:
 * 0.75 -> "750 Wh"
 * 1250 -> "1.25 MWh"
 */
export const formatEnergyAuto = (
  value,
  decimals = 2
) => {
  const number = toNumber(value);

  if (number < 1) {
    return `${formatNumber(number * 1000, 0)} Wh`;
  }

  if (number >= 1000) {
    return `${formatNumber(number / 1000, decimals)} MWh`;
  }

  return `${formatNumber(number, decimals)} kWh`;
};

/**
 * Format carbon emission.
 *
 * Example:
 * 24.567 -> "24.57 kg CO₂"
 */
export const formatCarbon = (
  value,
  decimals = 2
) => {
  const number = toNumber(value);

  return `${number.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} kg CO₂`;
};

/**
 * Format carbon automatically.
 *
 * Example:
 * 0.45 -> "450 g CO₂"
 * 25 -> "25 kg CO₂"
 * 1500 -> "1.50 t CO₂"
 */
export const formatCarbonAuto = (
  value,
  decimals = 2
) => {
  const number = toNumber(value);

  if (number < 1) {
    return `${formatNumber(number * 1000, 0)} g CO₂`;
  }

  if (number >= 1000) {
    return `${formatNumber(number / 1000, decimals)} t CO₂`;
  }

  return `${formatNumber(number, decimals)} kg CO₂`;
};

/**
 * Format Indian currency.
 *
 * Example:
 * 12500 -> "₹12,500"
 */
export const formatCurrency = (
  value,
  decimals = 0
) => {
  const number = toNumber(value);

  return number.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Format money in a compact form.
 *
 * Example:
 * 1500 -> "₹1.5K"
 * 150000 -> "₹1.5L"
 * 15000000 -> "₹1.5Cr"
 */
export const formatCompactCurrency = (
  value,
  decimals = 1
) => {
  const number = toNumber(value);

  if (number >= 10000000) {
    return `₹${formatNumber(
      number / 10000000,
      decimals
    )}Cr`;
  }

  if (number >= 100000) {
    return `₹${formatNumber(
      number / 100000,
      decimals
    )}L`;
  }

  if (number >= 1000) {
    return `₹${formatNumber(
      number / 1000,
      decimals
    )}K`;
  }

  return formatCurrency(number);
};

/**
 * Format duration in hours.
 *
 * Example:
 * 5.5 -> "5h 30m"
 */
export const formatHours = (hours) => {
  const totalMinutes = Math.round(
    toNumber(hours) * 60
  );

  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  if (h === 0) {
    return `${m}m`;
  }

  if (m === 0) {
    return `${h}h`;
  }

  return `${h}h ${m}m`;
};

/**
 * Format minutes.
 *
 * Example:
 * 125 -> "2h 5m"
 */
export const formatMinutes = (minutes) => {
  const totalMinutes = Math.max(
    0,
    Math.round(toNumber(minutes))
  );

  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Format uptime in seconds.
 */
export const formatUptime = (seconds) => {
  const totalSeconds = Math.max(
    0,
    Math.floor(toNumber(seconds))
  );

  const days = Math.floor(
    totalSeconds / 86400
  );

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

/**
 * Format CPU usage.
 *
 * Example:
 * 72.456 -> "72.5%"
 */
export const formatCPU = (
  value,
  decimals = 1
) => {
  return formatPercentage(value, decimals);
};

/**
 * Format RAM usage.
 *
 * Example:
 * 64.25 -> "64.3%"
 */
export const formatRAM = (
  value,
  decimals = 1
) => {
  return formatPercentage(value, decimals);
};

/**
 * Format power in watts.
 *
 * Example:
 * 125.5 -> "125.5 W"
 */
export const formatPower = (
  value,
  decimals = 1
) => {
  const number = toNumber(value);

  return `${formatNumber(number, decimals)} W`;
};

/**
 * Format power automatically.
 *
 * Example:
 * 0.5 -> "500 mW"
 * 750 -> "750 W"
 * 1500 -> "1.5 kW"
 */
export const formatPowerAuto = (
  value,
  decimals = 2
) => {
  const number = toNumber(value);

  if (number < 1) {
    return `${formatNumber(
      number * 1000,
      0
    )} mW`;
  }

  if (number >= 1000) {
    return `${formatNumber(
      number / 1000,
      decimals
    )} kW`;
  }

  return `${formatNumber(number, decimals)} W`;
};

/**
 * Format date.
 *
 * Example:
 * "2026-09-09" -> "09 Sep 2026"
 */
export const formatDate = (
  date,
  options = {}
) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  const defaultOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      ...defaultOptions,
      ...options,
    }
  );
};

/**
 * Format date with time.
 *
 * Example:
 * "2026-09-09T14:30:00"
 * -> "09 Sep 2026, 2:30 PM"
 */
export const formatDateTime = (
  date,
  options = {}
) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  const defaultOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  return parsedDate.toLocaleString(
    "en-IN",
    {
      ...defaultOptions,
      ...options,
    }
  );
};

/**
 * Format time only.
 *
 * Example:
 * "2026-09-09T14:30:00"
 * -> "2:30 PM"
 */
export const formatTime = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
    }
  );
};

/**
 * Get relative time.
 *
 * Example:
 * 2 minutes ago
 * 3 hours ago
 * Yesterday
 */
export const formatRelativeTime = (
  date
) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  const now = new Date();
  const difference =
    now.getTime() - parsedDate.getTime();

  const seconds = Math.floor(
    difference / 1000
  );

  if (seconds < 0) {
    return "Just now";
  }

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(
    seconds / 60
  );

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days}d ago`;
  }

  return formatDate(parsedDate);
};

/**
 * Format status text.
 *
 * Example:
 * "idle" -> "Idle"
 * "smart_shutdown" -> "Smart Shutdown"
 */
export const formatStatus = (status) => {
  if (!status) {
    return "Unknown";
  }

  return String(status)
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

/**
 * Format a name safely.
 *
 * Example:
 * "john doe" -> "John Doe"
 */
export const formatName = (name) => {
  if (!name) {
    return "—";
  }

  return String(name)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

/**
 * Get initials from a name.
 *
 * Example:
 * "Ritika Kar" -> "RK"
 */
export const getInitials = (
  name,
  maxInitials = 2
) => {
  if (!name) {
    return "?";
  }

  const words = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return words
    .slice(0, maxInitials)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

/**
 * Format a computer hostname.
 */
export const formatHostname = (
  hostname
) => {
  if (!hostname) {
    return "Unknown Computer";
  }

  return String(hostname).trim();
};

/**
 * Format an IP address.
 */
export const formatIPAddress = (
  ipAddress
) => {
  if (!ipAddress) {
    return "—";
  }

  return String(ipAddress).trim();
};

/**
 * Format file size.
 *
 * Example:
 * 1024 -> "1 KB"
 * 1048576 -> "1 MB"
 */
export const formatFileSize = (
  bytes,
  decimals = 2
) => {
  const number = toNumber(bytes);

  if (number === 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const index = Math.floor(
    Math.log(number) / Math.log(1024)
  );

  const safeIndex = Math.min(
    index,
    units.length - 1
  );

  const size =
    number /
    Math.pow(1024, safeIndex);

  return `${formatNumber(
    size,
    safeIndex === 0 ? 0 : decimals
  )} ${units[safeIndex]}`;
};

/**
 * Format tree equivalent.
 *
 * Example:
 * 120 -> "120 trees"
 */
export const formatTrees = (
  value,
  decimals = 1
) => {
  const number = toNumber(value);

  return `${formatNumber(
    number,
    decimals
  )} ${number === 1 ? "tree" : "trees"}`;
};

/**
 * Format CO₂ reduction.
 *
 * Example:
 * 35.5 -> "35.5% reduction"
 */
export const formatCarbonReduction = (
  value,
  decimals = 1
) => {
  return `${formatNumber(
    toNumber(value),
    decimals
  )}% reduction`;
};

/**
 * Format energy savings.
 *
 * Example:
 * 45.5 -> "45.5 kWh saved"
 */
export const formatEnergySaved = (
  value,
  decimals = 2
) => {
  return `${formatNumber(
    toNumber(value),
    decimals
  )} kWh saved`;
};

/**
 * Format a numeric value as a signed change.
 *
 * Example:
 * 12.5 -> "+12.5%"
 * -8.2 -> "-8.2%"
 */
export const formatChange = (
  value,
  decimals = 1
) => {
  const number = toNumber(value);

  const sign =
    number > 0
      ? "+"
      : "";

  return `${sign}${formatNumber(
    number,
    decimals
  )}%`;
};

/**
 * Get color meaning for a percentage change.
 *
 * Useful for dashboard trends.
 */
export const getChangeType = (value) => {
  const number = toNumber(value);

  if (number > 0) {
    return "positive";
  }

  if (number < 0) {
    return "negative";
  }

  return "neutral";
};

/**
 * Format a value with fallback text.
 */
export const formatValue = (
  value,
  fallback = "—"
) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return fallback;
  }

  return String(value);
};

/**
 * Format month name.
 *
 * Example:
 * 8 -> "September"
 */
export const formatMonth = (
  monthIndex
) => {
  const month = toNumber(
    monthIndex,
    -1
  );

  if (month < 0 || month > 11) {
    return "—";
  }

  return new Date(
    2000,
    month,
    1
  ).toLocaleDateString("en-IN", {
    month: "long",
  });
};

/**
 * Format day name.
 *
 * Example:
 * "2026-09-09" -> "Wednesday"
 */
export const formatDay = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
    }
  );
};

/**
 * Format a number for chart labels.
 */
export const formatChartValue = (
  value,
  unit = "",
  decimals = 1
) => {
  const number = toNumber(value);

  return `${formatNumber(
    number,
    decimals
  )}${unit ? ` ${unit}` : ""}`;
};

/**
 * Format report period.
 *
 * Example:
 * "week" -> "This Week"
 * "month" -> "This Month"
 */
export const formatPeriod = (period) => {
  const periods = {
    day: "Today",
    today: "Today",
    week: "This Week",
    month: "This Month",
    quarter: "This Quarter",
    year: "This Year",
  };

  return (
    periods[String(period).toLowerCase()] ||
    formatStatus(period)
  );
};

/**
 * Default export
 */
export default {
  toNumber,
  formatNumber,
  formatPercentage,
  formatEnergy,
  formatEnergyAuto,
  formatCarbon,
  formatCarbonAuto,
  formatCurrency,
  formatCompactCurrency,
  formatHours,
  formatMinutes,
  formatUptime,
  formatCPU,
  formatRAM,
  formatPower,
  formatPowerAuto,
  formatDate,
  formatDateTime,
  formatTime,
  formatRelativeTime,
  formatStatus,
  formatName,
  getInitials,
  formatHostname,
  formatIPAddress,
  formatFileSize,
  formatTrees,
  formatCarbonReduction,
  formatEnergySaved,
  formatChange,
  getChangeType,
  formatValue,
  formatMonth,
  formatDay,
  formatChartValue,
  formatPeriod,
};