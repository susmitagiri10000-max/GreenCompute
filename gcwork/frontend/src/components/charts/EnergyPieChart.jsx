import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Zap, Leaf } from "lucide-react";

/**
 * Demo data
 * This will later be replaced with backend API data.
 */
const DEFAULT_DATA = [
  {
    name: "CSE Lab",
    value: 245,
  },
  {
    name: "ECE Lab",
    value: 218,
  },
  {
    name: "IT Lab",
    value: 196,
  },
  {
    name: "Mechanical Lab",
    value: 172,
  },
  {
    name: "Electrical Lab",
    value: 154,
  },
  {
    name: "Civil Lab",
    value: 138,
  },
];

/**
 * Chart colors
 */
const COLORS = [
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#64748b",
  "#94a3b8",
];

/**
 * Custom Tooltip
 */
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const item = payload[0];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold text-slate-800 dark:text-white">
        {item.name}
      </p>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Energy:{" "}
        <span className="font-semibold text-slate-800 dark:text-white">
          {Number(item.value).toFixed(1)} kWh
        </span>
      </p>
    </div>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    })
  ),
};

/**
 * Custom Legend
 */
const renderLegend = (props) => {
  const { payload } = props;

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
      {payload?.map((entry, index) => (
        <div
          key={`legend-${entry.value}-${index}`}
          className="flex items-center gap-2"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: entry.color,
            }}
          />

          <span className="text-xs text-slate-600 dark:text-slate-400">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

renderLegend.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      color: PropTypes.string,
    })
  ),
};

/**
 * Energy Pie Chart
 *
 * Displays department/lab-wise energy distribution.
 */
const EnergyPieChart = ({
  data,
  title = "Energy Distribution",
  subtitle = "Energy consumption by department",
  loading = false,
  showLegend = true,
  height = 360,
  className = "",
}) => {
  /**
   * Use API data if available.
   * Otherwise use demo data.
   */
  const chartData = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return DEFAULT_DATA;
  }, [data]);

  /**
   * Calculate total energy.
   */
  const totalEnergy = useMemo(() => {
    return chartData.reduce(
      (total, item) => total + Number(item.value || 0),
      0
    );
  }, [chartData]);

  /**
   * Find highest consuming department/lab.
   */
  const highestConsumer = useMemo(() => {
    if (chartData.length === 0) {
      return null;
    }

    return chartData.reduce((highest, current) => {
      return Number(current.value || 0) >
        Number(highest.value || 0)
        ? current
        : highest;
    }, chartData[0]);
  }, [chartData]);

  /**
   * Loading state
   */
  if (loading) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      >
        <div className="mb-6">
          <div className="h-5 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="flex min-h-[360px] items-center justify-center">
          <div className="h-56 w-56 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  /**
   * Empty state
   */
  if (!chartData || chartData.length === 0) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      >
        <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <Zap className="h-8 w-8 text-emerald-600" />
          </div>

          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            No energy data available
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Energy distribution will appear here once GreenCompute starts
            receiving monitoring data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-900/20">
              <Zap className="h-5 w-5 text-emerald-600" />
            </div>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              {title}
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        {/* Total Energy */}
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total
          </p>

          <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
            {totalEnergy.toFixed(0)}
            <span className="ml-1 text-sm font-medium text-slate-500">
              kWh
            </span>
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius="52%"
              outerRadius="75%"
              paddingAngle={2}
              cornerRadius={5}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            {showLegend && (
              <Legend
                content={renderLegend}
                verticalAlign="bottom"
              />
            )}

            {/* Center Text */}
            <text
              x="50%"
              y="42%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-800 dark:fill-white"
            >
              <tspan
                x="50%"
                dy="-4"
                fontSize="22"
                fontWeight="700"
              >
                {totalEnergy.toFixed(0)}
              </tspan>

              <tspan
                x="50%"
                dy="24"
                fontSize="12"
                fill="#64748b"
              >
                kWh
              </tspan>
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight */}
      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Highest consumption
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
            {highestConsumer?.name || "N/A"}

            <span className="ml-2 font-medium text-slate-500">
              {Number(highestConsumer?.value || 0).toFixed(1)} kWh
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-900/20">
          <Leaf className="h-4 w-4 text-emerald-600" />

          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Monitor high-use labs to reduce energy waste
          </span>
        </div>
      </div>
    </div>
  );
};

EnergyPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  loading: PropTypes.bool,
  showLegend: PropTypes.bool,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default EnergyPieChart;