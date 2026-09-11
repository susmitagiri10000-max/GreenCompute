import PropTypes from "prop-types";
import {
  CheckCircle2,
  Moon,
  Wifi,
  WifiOff,
  AlertCircle,
  Power,
  Activity,
} from "lucide-react";

function ComputerStatus({
  status = "online",
  label = "",
  lastUpdated = "Just now",
  showIcon = true,
  showDescription = true,
  showLastUpdated = true,
  compact = false,
  className = "",
}) {
  const statusConfig = {
    online: {
      label: "Online",
      description: "Computer is active and connected",
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      iconBackground: "bg-emerald-50",
      badgeBackground: "bg-emerald-50",
      badgeText: "text-emerald-700",
      dot: "bg-emerald-500",
    },

    idle: {
      label: "Idle",
      description: "Computer is active but currently idle",
      icon: Activity,
      iconColor: "text-amber-600",
      iconBackground: "bg-amber-50",
      badgeBackground: "bg-amber-50",
      badgeText: "text-amber-700",
      dot: "bg-amber-500",
    },

    sleep: {
      label: "Sleeping",
      description: "Computer is in sleep mode",
      icon: Moon,
      iconColor: "text-indigo-600",
      iconBackground: "bg-indigo-50",
      badgeBackground: "bg-indigo-50",
      badgeText: "text-indigo-700",
      dot: "bg-indigo-500",
    },

    offline: {
      label: "Offline",
      description: "Computer is not connected",
      icon: WifiOff,
      iconColor: "text-slate-500",
      iconBackground: "bg-slate-100",
      badgeBackground: "bg-slate-100",
      badgeText: "text-slate-600",
      dot: "bg-slate-400",
    },

    shutdown: {
      label: "Shutdown",
      description: "Computer has been shut down",
      icon: Power,
      iconColor: "text-slate-600",
      iconBackground: "bg-slate-100",
      badgeBackground: "bg-slate-100",
      badgeText: "text-slate-600",
      dot: "bg-slate-500",
    },

    error: {
      label: "Error",
      description: "Computer monitoring requires attention",
      icon: AlertCircle,
      iconColor: "text-red-600",
      iconBackground: "bg-red-50",
      badgeBackground: "bg-red-50",
      badgeText: "text-red-700",
      dot: "bg-red-500",
    },
  };

  const currentStatus =
    statusConfig[status] || statusConfig.online;

  const StatusIcon = currentStatus.icon;

  const displayLabel = label || currentStatus.label;

  /*
   * Compact status badge
   * Example:
   * 🟢 Online
   */
  if (compact) {
    return (
      <span
        className={`
          inline-flex items-center gap-2
          rounded-full px-3 py-1.5
          ${currentStatus.badgeBackground}
          ${currentStatus.badgeText}
          ${className}
        `}
      >
        <span
          className={`
            h-2 w-2 rounded-full
            ${currentStatus.dot}
            ${
              status === "online"
                ? "animate-pulse"
                : ""
            }
          `}
        />

        <span className="text-xs font-semibold">
          {displayLabel}
        </span>
      </span>
    );
  }

  return (
    <div
      className={`
        rounded-2xl border border-slate-200
        bg-white p-5 shadow-sm
        ${className}
      `}
    >
      {/* Main Status */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Icon */}
          {showIcon && (
            <div
              className={`
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl
                ${currentStatus.iconBackground}
              `}
            >
              <StatusIcon
                size={21}
                strokeWidth={2}
                className={currentStatus.iconColor}
              />
            </div>
          )}

          {/* Status Information */}
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-800">
              Computer Status
            </h3>

            {showDescription && (
              <p className="mt-1 text-xs text-slate-500">
                {currentStatus.description}
              </p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`
            inline-flex shrink-0
            items-center gap-2
            rounded-full px-3 py-1.5
            ${currentStatus.badgeBackground}
            ${currentStatus.badgeText}
            text-xs font-semibold
          `}
        >
          <span
            className={`
              h-2 w-2 rounded-full
              ${currentStatus.dot}
              ${
                status === "online"
                  ? "animate-pulse"
                  : ""
              }
            `}
          />

          {displayLabel}
        </span>
      </div>

      {/* Connection Details */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {/* Connection */}
        <div
          className="
            rounded-xl border border-slate-100
            bg-slate-50 p-3
          "
        >
          <div className="flex items-center gap-2">
            {status === "offline" ||
            status === "shutdown" ? (
              <WifiOff
                size={16}
                className="text-slate-500"
              />
            ) : (
              <Wifi
                size={16}
                className="text-emerald-500"
              />
            )}

            <span className="text-xs font-medium text-slate-500">
              Connection
            </span>
          </div>

          <p
            className={`
              mt-2 text-sm font-semibold
              ${
                status === "offline" ||
                status === "shutdown"
                  ? "text-slate-500"
                  : "text-emerald-600"
              }
            `}
          >
            {status === "offline" ||
            status === "shutdown"
              ? "Disconnected"
              : "Connected"}
          </p>
        </div>

        {/* Power State */}
        <div
          className="
            rounded-xl border border-slate-100
            bg-slate-50 p-3
          "
        >
          <div className="flex items-center gap-2">
            <Power
              size={16}
              className="text-blue-500"
            />

            <span className="text-xs font-medium text-slate-500">
              Power State
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold text-slate-700">
            {status === "sleep"
              ? "Sleep Mode"
              : status === "shutdown"
                ? "Powered Off"
                : status === "offline"
                  ? "Unknown"
                  : "Powered On"}
          </p>
        </div>
      </div>

      {/* Last Updated */}
      {showLastUpdated && (
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <Activity
            size={14}
            className="text-slate-400"
          />

          <span className="text-xs text-slate-400">
            Last updated:
          </span>

          <span className="text-xs font-medium text-slate-500">
            {lastUpdated}
          </span>
        </div>
      )}
    </div>
  );
}

ComputerStatus.propTypes = {
  status: PropTypes.oneOf([
    "online",
    "idle",
    "sleep",
    "offline",
    "shutdown",
    "error",
  ]),
  label: PropTypes.string,
  lastUpdated: PropTypes.string,
  showIcon: PropTypes.bool,
  showDescription: PropTypes.bool,
  showLastUpdated: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string,
};

export default ComputerStatus;