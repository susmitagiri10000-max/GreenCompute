import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Leaf, TrendingDown } from "lucide-react";

/**
 * Demo data
 * Used when no data is provided from the backend.
 */
const DEFAULT_DATA = [
  { day: "Mon", carbon: 18.5, saved: 3.2 },
  { day: "Tue", carbon: 21.4, saved: 4.1 },
  { day: "Wed", carbon: 17.8, saved: 3.8 },
  { day: "Thu", carbon: 24.2, saved: 5.4 },
  { day: "Fri", carbon: 22.6, saved: 4.8 },
  { day: "Sat", carbon: 13.9, saved: 3.1 },
  { day: "Sun", carbon: 10.7, saved: 2.6 },
];

/**
 * Custom Tooltip
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-2 text-sm font-semibold text-slate-800 dark:text-white">
        {label}
      </p>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="flex items-center justify-between gap-6 text-sm"
        >
          <span className="text-slate-500 dark:text-slate-400">
            {item.name}
          </span>

          <span className="font-semibold text-slate-800 dark:text-white">
            {Number(item.value).toFixed(2)} kg
          </span>
        </div>
      ))}
    </div>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    })
  ),
  label: PropTypes.string,
};

/**
 * Carbon Area Chart
 *
 * Displays:
 * - Carbon emissions
 * - Carbon saved
 * - Total carbon
 * - Average carbon
 */
const CarbonAreaChart = ({
  data,
  title = "Carbon Emissions",
  subtitle = "Carbon footprint and savings over time",
  unit = "kg CO₂",
  loading = false,
  showLegend = true,
  showGrid = true,
  height = 320,
  className = "",
}) => {
  /**
   * Use backend data if available,
   * otherwise use demo data.
   */
  const chartData = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return DEFAULT_DATA;
  }, [data]);

  /**
   * Calculate total carbon emissions.
   */
  const totalCarbon = useMemo(() => {
    return chartData.reduce(
      (total, item) => total + Number(item.carbon || 0),
      0
    );
  }, [chartData]);

  /**
   * Calculate total carbon saved.
   */
  const totalSaved = useMemo(() => {
    return chartData.reduce(
      (total, item) => total + Number(item.saved || 0),
      0
    );
  }, [chartData]);

  /**
   * Calculate average carbon emission.
   */
  const averageCarbon = useMemo(() => {
    if (chartData.length === 0) {
      return 0;
    }

    return totalCarbon / chartData.length;
  }, [chartData, totalCarbon]);

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

        <div className="h-72 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
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
        <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <Leaf className="h-8 w-8 text-emerald-600" />
          </div>

          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            No carbon data available
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Carbon emission data will appear here once GreenCompute starts
            receiving energy monitoring data.
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
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-900/20">
              <Leaf className="h-5 w-5 text-emerald-600" />
            </div>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              {title}
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        {/* Summary */}
        <div className="flex gap-5">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total
            </p>

            <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
              {totalCarbon.toFixed(1)}
              <span className="ml-1 text-sm font-medium text-slate-500">
                kg
              </span>
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Saved
            </p>

            <p className="mt-1 flex items-center gap-1 text-xl font-bold text-emerald-600">
              <TrendingDown className="h-4 w-4" />
              {totalSaved.toFixed(1)}
              <span className="text-sm font-medium">kg</span>
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
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
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 12,
                fill: "#64748b",
              }}
              width={45}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#10b981",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            {showLegend && (
              <Legend
                verticalAlign="top"
                align="right"
                height={36}
                iconType="circle"
              />
            )}

            {/* Carbon Emissions */}
            <Area
              type="monotone"
              dataKey="carbon"
              name="Carbon Emitted"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.15}
              strokeWidth={2.5}
              activeDot={{
                r: 5,
              }}
            />

            {/* Carbon Saved */}
            <Area
              type="monotone"
              dataKey="saved"
              name="Carbon Saved"
              stroke="#64748b"
              fill="#64748b"
              fillOpacity={0.08}
              strokeWidth={2}
              activeDot={{
                r: 4,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-5 flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center dark:border-slate-800">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Average daily carbon
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
            {averageCarbon.toFixed(2)} {unit}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-900/20">
          <Leaf className="h-4 w-4 text-emerald-600" />

          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Lower carbon means a greener campus
          </span>
        </div>
      </div>
    </div>
  );
};

CarbonAreaChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      carbon: PropTypes.number,
      saved: PropTypes.number,
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

export default CarbonAreaChart;