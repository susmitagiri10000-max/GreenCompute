import PropTypes from "prop-types";
import {
  Monitor,
  Users,
  Zap,
  Leaf,
  ArrowRight,
  MoreVertical,
  Wifi,
  WifiOff,
} from "lucide-react";

function LabCard({
  id,
  name = "Computer Lab",
  location = "",
  department = "",
  totalComputers = 0,
  onlineComputers = 0,
  idleComputers = 0,
  offlineComputers = 0,
  energyToday = 0,
  carbonToday = 0,
  status = "active",
  onView = null,
  onMenu = null,
  className = "",
}) {
  const safeTotal = Math.max(Number(totalComputers) || 0, 0);
  const safeOnline = Math.max(Number(onlineComputers) || 0, 0);
  const safeIdle = Math.max(Number(idleComputers) || 0, 0);
  const safeOffline = Math.max(Number(offlineComputers) || 0, 0);

  const onlinePercentage =
    safeTotal > 0
      ? Math.round((safeOnline / safeTotal) * 100)
      : 0;

  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    },
    warning: {
      label: "Attention",
      className: "bg-amber-50 text-amber-700",
      dot: "bg-amber-500",
    },
    inactive: {
      label: "Inactive",
      className: "bg-slate-100 text-slate-600",
      dot: "bg-slate-400",
    },
    offline: {
      label: "Offline",
      className: "bg-red-50 text-red-700",
      dot: "bg-red-500",
    },
  };

  const currentStatus =
    statusConfig[status] || statusConfig.active;

  return (
    <div
      className={`
        group relative overflow-hidden
        rounded-2xl border border-slate-200
        bg-white p-5 shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-emerald-200
        hover:shadow-lg
        hover:shadow-slate-200/50
        ${className}
      `}
    >
      {/* Top Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Lab Icon */}
          <div
            className="
              flex h-12 w-12 shrink-0
              items-center justify-center
              rounded-xl bg-emerald-50
              transition-transform duration-300
              group-hover:scale-105
            "
          >
            <Monitor
              size={23}
              strokeWidth={2}
              className="text-emerald-600"
            />
          </div>

          {/* Lab Information */}
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-slate-800">
              {name}
            </h3>

            {(department || location) && (
              <p className="mt-1 truncate text-xs text-slate-500">
                {department}
                {department && location ? " • " : ""}
                {location}
              </p>
            )}
          </div>
        </div>

        {/* Menu */}
        {onMenu && (
          <button
            type="button"
            onClick={() => onMenu(id)}
            aria-label={`More options for ${name}`}
            className="
              shrink-0 rounded-lg p-2
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <MoreVertical size={19} />
          </button>
        )}
      </div>

      {/* Status */}
      <div className="mt-5 flex items-center justify-between">
        <span
          className={`
            inline-flex items-center gap-2
            rounded-full px-3 py-1.5
            text-xs font-semibold
            ${currentStatus.className}
          `}
        >
          <span
            className={`
              h-2 w-2 rounded-full
              ${currentStatus.dot}
              ${status === "active" ? "animate-pulse" : ""}
            `}
          />

          {currentStatus.label}
        </span>

        <span className="text-xs font-medium text-slate-400">
          {onlinePercentage}% online
        </span>
      </div>

      {/* Computer Overview */}
      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor
              size={17}
              className="text-slate-500"
            />

            <span className="text-sm font-medium text-slate-600">
              Computers
            </span>
          </div>

          <span className="text-lg font-bold text-slate-800">
            {safeTotal}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="
              h-full rounded-full
              bg-emerald-500
              transition-all duration-700
            "
            style={{
              width: `${Math.min(100, onlinePercentage)}%`,
            }}
          />
        </div>

        {/* Computer Status */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-sm font-bold text-emerald-600">
              {safeOnline}
            </p>
            <p className="text-[11px] text-slate-400">
              Online
            </p>
          </div>

          <div className="border-x border-slate-200 text-center">
            <p className="text-sm font-bold text-amber-600">
              {safeIdle}
            </p>
            <p className="text-[11px] text-slate-400">
              Idle
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-slate-500">
              {safeOffline}
            </p>
            <p className="text-[11px] text-slate-400">
              Offline
            </p>
          </div>
        </div>
      </div>

      {/* Sustainability Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Energy */}
        <div
          className="
            rounded-xl border border-slate-100
            bg-white p-3.5
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                flex h-8 w-8 items-center
                justify-center rounded-lg
                bg-amber-50
              "
            >
              <Zap
                size={16}
                className="text-amber-600"
              />
            </div>

            <span className="text-xs font-medium text-slate-500">
              Energy Today
            </span>
          </div>

          <p className="mt-3 text-lg font-bold text-slate-800">
            {Number(energyToday).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
            <span className="ml-1 text-xs font-medium text-slate-400">
              kWh
            </span>
          </p>
        </div>

        {/* Carbon */}
        <div
          className="
            rounded-xl border border-slate-100
            bg-white p-3.5
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                flex h-8 w-8 items-center
                justify-center rounded-lg
                bg-emerald-50
              "
            >
              <Leaf
                size={16}
                className="text-emerald-600"
              />
            </div>

            <span className="text-xs font-medium text-slate-500">
              CO₂ Today
            </span>
          </div>

          <p className="mt-3 text-lg font-bold text-slate-800">
            {Number(carbonToday).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
            <span className="ml-1 text-xs font-medium text-slate-400">
              kg
            </span>
          </p>
        </div>
      </div>

      {/* Monitoring Status */}
      <div className="mt-4 flex items-center gap-2">
        {status === "offline" ? (
          <>
            <WifiOff
              size={15}
              className="text-red-500"
            />
            <span className="text-xs text-red-600">
              Monitoring agent offline
            </span>
          </>
        ) : (
          <>
            <Wifi
              size={15}
              className="text-emerald-500"
            />
            <span className="text-xs text-slate-500">
              Monitoring active
            </span>
          </>
        )}
      </div>

      {/* View Details */}
      {onView && (
        <button
          type="button"
          onClick={() => onView(id)}
          className="
            mt-5 flex w-full
            items-center justify-center
            gap-2 rounded-xl
            border border-emerald-200
            bg-emerald-50
            px-4 py-2.5
            text-sm font-semibold
            text-emerald-700
            transition-all duration-200
            hover:bg-emerald-100
            active:scale-[0.98]
          "
        >
          View Lab Details

          <ArrowRight
            size={16}
            className="
              transition-transform duration-200
              group-hover:translate-x-1
            "
          />
        </button>
      )}
    </div>
  );
}

LabCard.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  location: PropTypes.string,
  department: PropTypes.string,
  totalComputers: PropTypes.number,
  onlineComputers: PropTypes.number,
  idleComputers: PropTypes.number,
  offlineComputers: PropTypes.number,
  energyToday: PropTypes.number,
  carbonToday: PropTypes.number,
  status: PropTypes.oneOf([
    "active",
    "warning",
    "inactive",
    "offline",
  ]),
  onView: PropTypes.func,
  onMenu: PropTypes.func,
  className: PropTypes.string,
};

export default LabCard;