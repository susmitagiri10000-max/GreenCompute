import PropTypes from "prop-types";
import {
  Monitor,
  Cpu,
  MemoryStick,
  Clock3,
  Zap,
  Leaf,
  Wifi,
  WifiOff,
  Moon,
  MoreVertical,
  ArrowRight,
} from "lucide-react";

function ComputerCard({
  id,
  name = "Computer-01",
  hostname = "",
  labName = "",
  ipAddress = "",
  status = "online",
  cpuUsage = 0,
  memoryUsage = 0,
  uptime = "0h 0m",
  lastActive = "Just now",
  energyToday = 0,
  carbonToday = 0,
  onView = null,
  onMenu = null,
  className = "",
}) {
  const safeCpu = Math.min(100, Math.max(0, Number(cpuUsage) || 0));
  const safeMemory = Math.min(
    100,
    Math.max(0, Number(memoryUsage) || 0)
  );

  const statusConfig = {
    online: {
      label: "Online",
      text: "text-emerald-700",
      background: "bg-emerald-50",
      icon: Wifi,
      dot: "bg-emerald-500",
    },

    idle: {
      label: "Idle",
      text: "text-amber-700",
      background: "bg-amber-50",
      icon: Moon,
      dot: "bg-amber-500",
    },

    offline: {
      label: "Offline",
      text: "text-slate-600",
      background: "bg-slate-100",
      icon: WifiOff,
      dot: "bg-slate-400",
    },
  };

  const currentStatus =
    statusConfig[status] || statusConfig.online;

  const StatusIcon = currentStatus.icon;

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
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {/* Computer Icon */}
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

          {/* Computer Details */}
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-slate-800">
              {name}
            </h3>

            {hostname && (
              <p className="mt-1 truncate text-xs text-slate-500">
                {hostname}
              </p>
            )}

            {(labName || ipAddress) && (
              <p className="mt-1 truncate text-[11px] text-slate-400">
                {labName}
                {labName && ipAddress ? " • " : ""}
                {ipAddress}
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
            ${currentStatus.background}
            ${currentStatus.text}
          `}
        >
          <span
            className={`
              h-2 w-2 rounded-full
              ${currentStatus.dot}
              ${status === "online" ? "animate-pulse" : ""}
            `}
          />

          {currentStatus.label}
        </span>

        <div className="flex items-center gap-1.5">
          <StatusIcon
            size={14}
            className={currentStatus.text}
          />

          <span className="text-xs text-slate-400">
            Monitoring
          </span>
        </div>
      </div>

      {/* CPU & Memory */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {/* CPU */}
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu
                size={16}
                className="text-blue-600"
              />

              <span className="text-xs font-medium text-slate-500">
                CPU
              </span>
            </div>

            <span className="text-sm font-bold text-slate-800">
              {Math.round(safeCpu)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${safeCpu}%`,
              }}
            />
          </div>
        </div>

        {/* Memory */}
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MemoryStick
                size={16}
                className="text-purple-600"
              />

              <span className="text-xs font-medium text-slate-500">
                RAM
              </span>
            </div>

            <span className="text-sm font-bold text-slate-800">
              {Math.round(safeMemory)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{
                width: `${safeMemory}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-100 bg-white p-3">
          <div className="flex items-center gap-2">
            <Clock3
              size={15}
              className="text-slate-400"
            />

            <span className="text-[11px] font-medium text-slate-500">
              Uptime
            </span>
          </div>

          <p className="mt-2 text-sm font-bold text-slate-800">
            {uptime}
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-3">
          <div className="flex items-center gap-2">
            <Clock3
              size={15}
              className="text-slate-400"
            />

            <span className="text-[11px] font-medium text-slate-500">
              Last Active
            </span>
          </div>

          <p className="mt-2 truncate text-sm font-bold text-slate-800">
            {lastActive}
          </p>
        </div>
      </div>

      {/* Energy & Carbon */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {/* Energy */}
        <div
          className="
            rounded-xl border border-amber-100
            bg-amber-50/50 p-3.5
          "
        >
          <div className="flex items-center gap-2">
            <Zap
              size={16}
              className="text-amber-600"
            />

            <span className="text-xs font-medium text-slate-500">
              Energy
            </span>
          </div>

          <p className="mt-2 text-lg font-bold text-slate-800">
            {Number(energyToday).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
            <span className="ml-1 text-[11px] font-medium text-slate-400">
              kWh
            </span>
          </p>
        </div>

        {/* Carbon */}
        <div
          className="
            rounded-xl border border-emerald-100
            bg-emerald-50/50 p-3.5
          "
        >
          <div className="flex items-center gap-2">
            <Leaf
              size={16}
              className="text-emerald-600"
            />

            <span className="text-xs font-medium text-slate-500">
              CO₂
            </span>
          </div>

          <p className="mt-2 text-lg font-bold text-slate-800">
            {Number(carbonToday).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
            <span className="ml-1 text-[11px] font-medium text-slate-400">
              kg
            </span>
          </p>
        </div>
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
          View Computer Details

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

ComputerCard.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  hostname: PropTypes.string,
  labName: PropTypes.string,
  ipAddress: PropTypes.string,
  status: PropTypes.oneOf([
    "online",
    "idle",
    "offline",
  ]),
  cpuUsage: PropTypes.number,
  memoryUsage: PropTypes.number,
  uptime: PropTypes.string,
  lastActive: PropTypes.string,
  energyToday: PropTypes.number,
  carbonToday: PropTypes.number,
  onView: PropTypes.func,
  onMenu: PropTypes.func,
  className: PropTypes.string,
};

export default ComputerCard;