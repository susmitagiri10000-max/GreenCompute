import PropTypes from "prop-types";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wifi,
  WifiOff,
  Activity,
  Clock3,
} from "lucide-react";

function LabStatus({
  status = "active",
  label = "",
  lastUpdated = "Just now",
  showLastUpdated = true,
  showConnection = true,
  compact = false,
  className = "",
}) {
  const statusConfig = {
    active: {
      label: "Active",
      description: "Lab is operating normally",
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      iconBackground: "bg-emerald-50",
      badgeBackground: "bg-emerald-50",
      badgeText: "text-emerald-700",
      dot: "bg-emerald-500",
    },

    warning: {
      label: "Attention Required",
      description: "Some computers need attention",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      iconBackground: "bg-amber-50",
      badgeBackground: "bg-amber-50",
      badgeText: "text-amber-700",
      dot: "bg-amber-500",
    },

    inactive: {
      label: "Inactive",
      description: "No active computers detected",
      icon: Activity,
      iconColor: "text-slate-500",
      iconBackground: "bg-slate-100",
      badgeBackground: "bg-slate-100",
      badgeText: "text-slate-600",
      dot: "bg-slate-400",
    },

    offline: {
      label: "Offline",
      description: "Monitoring agent is offline",
      icon: XCircle,
      iconColor: "text-red-600",
      iconBackground: "bg-red-50",
      badgeBackground: "bg-red-50",
      badgeText: "text-red-700",
      dot: "bg-red-500",
    },
  };

  const currentStatus =
    statusConfig[status] || statusConfig.active;

  const StatusIcon = currentStatus.icon;

  const displayLabel = label || currentStatus.label;

  // Compact version
  if (compact) {
    return (
      <div
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
            ${status === "active" ? "animate-pulse" : ""}
          `}
        />

        <span className="text-xs font-semibold">
          {displayLabel}
        </span>
      </div>
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

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-800">
              Lab Status
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {currentStatus.description}
            </p>
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
              ${status === "active" ? "animate-pulse" : ""}
            `}
          />

          {displayLabel}
        </span>
      </div>

      {/* Connection Information */}
      {showConnection && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              {status === "offline" ? (
                <WifiOff
                  size={16}
                  className="text-red-500"
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
                  status === "offline"
                    ? "text-red-600"
                    : "text-emerald-600"
                }
              `}
            >
              {status === "offline"
                ? "Disconnected"
                : "Connected"}
            </p>
          </div>

          {/* Monitoring */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <Activity
                size={16}
                className="text-blue-500"
              />

              <span className="text-xs font-medium text-slate-500">
                Monitoring
              </span>
            </div>

            <p
              className={`
                mt-2 text-sm font-semibold
                ${
                  status === "offline"
                    ? "text-slate-500"
                    : "text-blue-600"
                }
              `}
            >
              {status === "offline"
                ? "Unavailable"
                : "Running"}
            </p>
          </div>
        </div>
      )}

      {/* Last Updated */}
      {showLastUpdated && (
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <Clock3
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

LabStatus.propTypes = {
  status: PropTypes.oneOf([
    "active",
    "warning",
    "inactive",
    "offline",
  ]),
  label: PropTypes.string,
  lastUpdated: PropTypes.string,
  showLastUpdated: PropTypes.bool,
  showConnection: PropTypes.bool,
  compact: PropTypes.bool,
  className: PropTypes.string,
};

export default LabStatus;