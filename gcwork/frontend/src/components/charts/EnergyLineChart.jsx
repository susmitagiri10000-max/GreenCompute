import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Zap, TrendingUp } from "lucide-react";

function CustomTooltip({
  active,
  payload,
  label,
  unit,
}) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const energyValue = payload[0]?.value ?? 0;

  return (
    <div
      className="
        rounded-xl border border-slate-200
        bg-white px-4 py-3
        shadow-lg
      "
    >
      <p className="text-xs font-semibold text-slate-500">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />

        <span className="text-sm font-bold text-slate-800">
          {Number(energyValue).toLocaleString(
            "en-IN",
            {
              maximumFractionDigits: 2,
            }
          )}{" "}
          {unit}
        </span>
      </div>
    </div>
  );
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  unit: PropTypes.string,
};

function EnergyLineChart({
  data = [],
  title = "Energy Consumption",
  subtitle = "Energy usage trend over time",
  unit = "kWh",
  loading = false,
  showLegend = true,
  showGrid = true,
  height = 320,
  className = "",
}) {
  const chartData = Array.isArray(data) ? data : [];

  const totalEnergy = chartData.reduce(
    (total, item) => total + (Number(item.energy) || 0),
    0
  );

  const averageEnergy =
    chartData.length > 0
      ? totalEnergy / chartData.length
      : 0;

  if (loading) {
    return (
      <div
        className={`
          rounded-2xl border border-slate-200
          bg-white p-6 shadow-sm
          ${className}
        `}
      >
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div>
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="mt-2 h-4 w-56 rounded bg-slate-200" />
            </div>

            <div className="h-10 w-10 rounded-xl bg-slate-200" />
          </div>

          <div className="mt-6 h-[320px] rounded-xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        rounded-2xl border border-slate-200
        bg-white p-6 shadow-sm
        transition-all duration-300
        hover:border-emerald-200
        hover:shadow-lg
        hover:shadow-slate-200/50
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl bg-emerald-50
            "
          >
            <Zap
              size={21}
              strokeWidth={2}
              className="text-emerald-600"
            />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-800">
              {title}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="flex gap-5 sm:text-right">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Total
            </p>

            <p className="mt-1 text-lg font-bold text-slate-800">
              {totalEnergy.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 1,
                }
              )}
              <span className="ml-1 text-xs font-medium text-slate-400">
                {unit}
              </span>
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Average
            </p>

            <p className="mt-1 text-lg font-bold text-emerald-600">
              {averageEnergy.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 1,
                }
              )}
              <span className="ml-1 text-xs font-medium text-slate-400">
                {unit}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        className="mt-6 w-full"
        style={{ height }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 5,
            }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
            )}

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              width={45}
              tickFormatter={(value) =>
                `${value}`
              }
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#cbd5e1",
                strokeDasharray: "4 4",
              }}
            />

            {showLegend && (
              <Legend
                verticalAlign="top"
                align="right"
                height={30}
                iconType="circle"
                wrapperStyle={{
                  fontSize: "12px",
                  color: "#64748b",
                }}
                formatter={() =>
                  `Energy (${unit})`
                }
              />
            )}

            <Line
              type="monotone"
              dataKey="energy"
              name="Energy"
              stroke="#059669"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#ffffff",
                stroke: "#059669",
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: "#ffffff",
                stroke: "#059669",
              }}
              animationDuration={900}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight */}
      <div
        className="
          mt-5 flex items-start gap-3
          rounded-xl border border-emerald-100
          bg-emerald-50/60 p-4
        "
      >
        <TrendingUp
          size={18}
          className="mt-0.5 shrink-0 text-emerald-600"
        />

        <div>
          <p className="text-xs font-semibold text-emerald-700">
            Energy monitoring insight
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Track this trend to identify high-consumption
            periods and reduce unnecessary computer energy
            usage.
          </p>
        </div>
      </div>
    </div>
  );
}

EnergyLineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      energy: PropTypes.number,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  unit: PropTypes.string,
  loading: PropTypes.bool,
  showLegend: PropTypes.bool,
  showGrid: PropTypes.bool,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default EnergyLineChart;