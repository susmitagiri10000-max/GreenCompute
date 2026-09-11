import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Building2, Zap, Leaf } from "lucide-react";

/**
 * Demo department data
 * This data will later be replaced by backend API data.
 */
const DEFAULT_DATA = [
  {
    department: "CSE",
    energy: 245,
    saved: 42,
  },
  {
    department: "ECE",
    energy: 218,
    saved: 36,
  },
  {
    department: "IT",
    energy: 196,
    saved: 31,
  },
  {
    department: "ME",
    energy: 172,
    saved: 28,
  },
  {
    department: "EE",
    energy: 154,
    saved: 25,
  },
  {
    department: "CE",
    energy: 138,
    saved: 21,
  },
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
      <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-white">
        {label}
      </p>

      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="mb-1 flex items-center justify-between gap-6 text-sm"
        >
          <span className="text-slate-500 dark:text-slate-400">
            {item.name}
          </span>

          <span className="font-semibold text-slate-800 dark:text-white">
            {Number(item.value).toFixed(1)} kWh
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
 * Department Bar Chart
 *
 * Shows department-wise:
 * - Energy consumption
 * - Energy saved
 * - Total energy
 * - Average energy
 */
const DepartmentBarChart = ({
  data,
  title = "Department Energy Usage",
  subtitle = "Compare energy consumption across departments",
  loading = false,
  showLegend = true,
  showGrid = true,
  height = 350,
  className = "",
}) => {
  /**
   * Use API data when available.
   * Otherwise use demo data.
   */
  const chartData = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return DEFAULT_DATA;
  }, [data]);

  /**
   * Total energy consumed.
   */
  const totalEnergy = useMemo(() => {
    return chartData.reduce(
      (total, item) => total + Number(item.energy || 0),
      0
    );
  }, [chartData]);

  /**
   * Total energy saved.
   */
  const totalSaved = useMemo(() => {
    return chartData.reduce(
      (total, item) => total + Number(item.saved || 0),
      0
    );
  }, [chartData]);

  /**
   * Find department with highest energy consumption.
   */
  const highestDepartment = useMemo(() => {
    if (chartData.length === 0) {
      return null;
    }

    return chartData.reduce((highest, current) => {
      return Number(current.energy || 0) >
        Number(highest.energy || 0)
        ? current
        : highest;
    }, chartData[0]);
  }, [chartData]);

  /**
   * Loading state.
   */
  if (loading) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      >
        <div className="mb-6">
          <div className="h-5 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="h-80 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  /**
   * Empty state.
   */
  if (!chartData || chartData.length === 0) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      >
        <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <Building2 className="h-8 w-8 text-emerald-600" />
          </div>

          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            No department data available
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Department energy information will appear here once
            GreenCompute receives monitoring data.
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
      <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-900/20">
              <Building2 className="h-5 w-5 text-emerald-600" />
            </div>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              {title}
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="flex gap-5">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total Energy
            </p>

            <p className="mt-1 flex items-center gap-1 text-xl font-bold text-slate-800 dark:text-white">
              <Zap className="h-4 w-4 text-emerald-600" />
              {totalEnergy.toFixed(0)}
              <span className="text-sm font-medium text-slate-500">
                kWh
              </span>
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Energy Saved
            </p>

            <p className="mt-1 flex items-center gap-1 text-xl font-bold text-emerald-600">
              <Leaf className="h-4 w-4" />
              {totalSaved.toFixed(0)}
              <span className="text-sm font-medium">
                kWh
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
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
              dataKey="department"
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
                fill: "#f1f5f9",
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

            {/* Energy Consumption */}
            <Bar
              dataKey="energy"
              name="Energy Used"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            />

            {/* Energy Saved */}
            <Bar
              dataKey="saved"
              name="Energy Saved"
              fill="#64748b"
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Insight */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Highest energy usage
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
            {highestDepartment?.department || "N/A"}
            <span className="ml-2 font-medium text-slate-500">
              {Number(highestDepartment?.energy || 0).toFixed(1)} kWh
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-900/20">
          <Leaf className="h-4 w-4 text-emerald-600" />

          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Reduce idle usage to improve department efficiency
          </span>
        </div>
      </div>
    </div>
  );
};

DepartmentBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      department: PropTypes.string.isRequired,
      energy: PropTypes.number,
      saved: PropTypes.number,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  loading: PropTypes.bool,
  showLegend: PropTypes.bool,
  showGrid: PropTypes.bool,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default DepartmentBarChart;