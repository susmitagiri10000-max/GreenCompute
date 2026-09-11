import PropTypes from "prop-types";
import {
  Monitor,
  Wifi,
  Moon,
  WifiOff,
  Zap,
  Leaf,
  TrendingDown,
  Activity,
} from "lucide-react";

function LabStats({
  totalComputers = 0,
  onlineComputers = 0,
  idleComputers = 0,
  offlineComputers = 0,
  energyToday = 0,
  carbonToday = 0,
  energySaved = 0,
  efficiency = 0,
  loading = false,
  className = "",
}) {
  const total = Math.max(Number(totalComputers) || 0, 0);
  const online = Math.max(Number(onlineComputers) || 0, 0);
  const idle = Math.max(Number(idleComputers) || 0, 0);
  const offline = Math.max(Number(offlineComputers) || 0, 0);

  const safeEfficiency = Math.min(
    100,
    Math.max(0, Number(efficiency) || 0)
  );

  const formatNumber = (value, decimals = 2) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });

  const stats = [
    {
      title: "Total Computers",
      value: total,
      unit: "PCs",
      icon: Monitor,
      iconColor: "text-blue-600",
      iconBackground: "bg-blue-50",
    },
    {
      title: "Online",
      value: online,
      unit: "PCs",
      icon: Wifi,
      iconColor: "text-emerald-600",
      iconBackground: "bg-emerald-50",
    },
    {
      title: "Idle",
      value: idle,
      unit: "PCs",
      icon: Moon,
      iconColor: "text-amber-600",
      iconBackground: "bg-amber-50",
    },
    {
      title: "Offline",
      value: offline,
      unit: "PCs",
      icon: WifiOff,
      iconColor: "text-slate-500",
      iconBackground: "bg-slate-100",
    },
  ];

  if (loading) {
    return (
      <div
        className={`
          grid gap-4
          sm:grid-cols-2
          lg:grid-cols-4
          ${className}
        `}
      >
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              rounded-2xl border border-slate-200
              bg-white p-5 shadow-sm
            "
          >
            <div className="animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-10 w-10 rounded-xl bg-slate-200" />
              </div>

              <div className="mt-5 h-8 w-20 rounded bg-slate-200" />

              <div className="mt-3 h-3 w-24 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Computer Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                group rounded-2xl
                border border-slate-200
                bg-white p-5 shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-emerald-200
                hover:shadow-lg
                hover:shadow-slate-200/50
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold tracking-tight text-slate-800">
                      {formatNumber(stat.value, 0)}
                    </span>

                    <span className="text-xs font-medium text-slate-400">
                      {stat.unit}
                    </span>
                  </div>
                </div>

                <div
                  className={`
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    transition-transform duration-300
                    group-hover:scale-110
                    ${stat.iconBackground}
                  `}
                >
                  <Icon
                    size={19}
                    strokeWidth={2}
                    className={stat.iconColor}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sustainability Statistics */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Energy Today */}
        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            transition-all duration-300
            hover:border-amber-200
            hover:shadow-lg
            hover:shadow-slate-200/50
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl bg-amber-50
              "
            >
              <Zap
                size={19}
                className="text-amber-600"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Energy Today
              </p>

              <p className="mt-1 text-xl font-bold text-slate-800">
                {formatNumber(energyToday)}
                <span className="ml-1 text-xs font-medium text-slate-400">
                  kWh
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Carbon Today */}
        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            transition-all duration-300
            hover:border-emerald-200
            hover:shadow-lg
            hover:shadow-slate-200/50
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl bg-emerald-50
              "
            >
              <Leaf
                size={19}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                CO₂ Emitted Today
              </p>

              <p className="mt-1 text-xl font-bold text-slate-800">
                {formatNumber(carbonToday)}
                <span className="ml-1 text-xs font-medium text-slate-400">
                  kg
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Energy Saved */}
        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            transition-all duration-300
            hover:border-blue-200
            hover:shadow-lg
            hover:shadow-slate-200/50
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl bg-blue-50
              "
            >
              <TrendingDown
                size={19}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Energy Saved
              </p>

              <p className="mt-1 text-xl font-bold text-slate-800">
                {formatNumber(energySaved)}
                <span className="ml-1 text-xs font-medium text-slate-400">
                  kWh
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Efficiency */}
        <div
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 shadow-sm
            transition-all duration-300
            hover:border-indigo-200
            hover:shadow-lg
            hover:shadow-slate-200/50
          "
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl bg-indigo-50
                "
              >
                <Activity
                  size={19}
                  className="text-indigo-600"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Energy Efficiency
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800">
                  {Math.round(safeEfficiency)}%
                </p>
              </div>
            </div>
          </div>

          {/* Efficiency Progress */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="
                h-full rounded-full
                bg-indigo-500
                transition-all duration-700
              "
              style={{
                width: `${safeEfficiency}%`,
              }}
            />
          </div>

          <p className="mt-2 text-[11px] text-slate-400">
            Overall lab performance
          </p>
        </div>
      </div>
    </div>
  );
}

LabStats.propTypes = {
  totalComputers: PropTypes.number,
  onlineComputers: PropTypes.number,
  idleComputers: PropTypes.number,
  offlineComputers: PropTypes.number,
  energyToday: PropTypes.number,
  carbonToday: PropTypes.number,
  energySaved: PropTypes.number,
  efficiency: PropTypes.number,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default LabStats;