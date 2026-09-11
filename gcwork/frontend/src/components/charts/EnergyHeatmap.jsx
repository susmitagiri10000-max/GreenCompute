import { useMemo } from "react";
import PropTypes from "prop-types";
import { Clock3, Leaf, Zap } from "lucide-react";

/**
 * Demo heatmap data
 *
 * Each row represents a day.
 * Each value represents energy consumption for a time slot.
 */
const DEFAULT_DATA = [
  {
    day: "Mon",
    values: [12, 18, 25, 31, 38, 42, 45, 39, 28, 20, 15, 10],
  },
  {
    day: "Tue",
    values: [10, 16, 24, 30, 40, 44, 48, 41, 30, 22, 14, 9],
  },
  {
    day: "Wed",
    values: [8, 14, 20, 27, 35, 39, 43, 37, 26, 18, 12, 8],
  },
  {
    day: "Thu",
    values: [11, 17, 26, 33, 41, 46, 51, 45, 34, 24, 16, 11],
  },
  {
    day: "Fri",
    values: [13, 19, 28, 35, 43, 49, 53, 47, 36, 25, 17, 12],
  },
  {
    day: "Sat",
    values: [7, 11, 15, 20, 24, 28, 31, 27, 19, 13, 9, 6],
  },
  {
    day: "Sun",
    values: [5, 8, 12, 16, 19, 22, 25, 21, 15, 10, 7, 5],
  },
];

/**
 * Time slots
 */
const TIME_SLOTS = [
  "08 AM",
  "09 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "01 PM",
  "02 PM",
  "03 PM",
  "04 PM",
  "05 PM",
  "06 PM",
  "07 PM",
];

/**
 * Convert energy value to a heatmap intensity class.
 */
const getIntensityClass = (value, min, max) => {
  if (max === min) {
    return "bg-emerald-400";
  }

  const ratio = (value - min) / (max - min);

  if (ratio < 0.2) {
    return "bg-emerald-100 dark:bg-emerald-950";
  }

  if (ratio < 0.4) {
    return "bg-emerald-200 dark:bg-emerald-900";
  }

  if (ratio < 0.6) {
    return "bg-emerald-300 dark:bg-emerald-700";
  }

  if (ratio < 0.8) {
    return "bg-emerald-400 dark:bg-emerald-600";
  }

  return "bg-emerald-600 dark:bg-emerald-500";
};

/**
 * Energy Heatmap
 *
 * Displays:
 * - Energy consumption by day
 * - Energy consumption by hour
 * - Lowest usage
 * - Highest usage
 * - Total energy
 */
const EnergyHeatmap = ({
  data,
  title = "Energy Usage Heatmap",
  subtitle = "Identify high-energy usage periods across the week",
  loading = false,
  showLegend = true,
  className = "",
}) => {
  /**
   * Use backend data if available.
   * Otherwise use demo data.
   */
  const heatmapData = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return DEFAULT_DATA;
  }, [data]);

  /**
   * Flatten all values.
   */
  const allValues = useMemo(() => {
    return heatmapData.flatMap((row) =>
      Array.isArray(row.values) ? row.values : []
    );
  }, [heatmapData]);

  /**
   * Minimum energy value.
   */
  const minValue = useMemo(() => {
    if (allValues.length === 0) {
      return 0;
    }

    return Math.min(...allValues);
  }, [allValues]);

  /**
   * Maximum energy value.
   */
  const maxValue = useMemo(() => {
    if (allValues.length === 0) {
      return 0;
    }

    return Math.max(...allValues);
  }, [allValues]);

  /**
   * Total energy.
   */
  const totalEnergy = useMemo(() => {
    return allValues.reduce(
      (total, value) => total + Number(value || 0),
      0
    );
  }, [allValues]);

  /**
   * Find highest energy usage period.
   */
  const highestUsage = useMemo(() => {
    if (heatmapData.length === 0) {
      return null;
    }

    let highest = {
      value: -Infinity,
      day: "",
      time: "",
    };

    heatmapData.forEach((row) => {
      if (!Array.isArray(row.values)) {
        return;
      }

      row.values.forEach((value, index) => {
        if (Number(value) > highest.value) {
          highest = {
            value: Number(value),
            day: row.day,
            time: TIME_SLOTS[index] || "",
          };
        }
      });
    });

    return highest;
  }, [heatmapData]);

  /**
   * Loading state.
   */
  if (loading) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      >
        <div className="mb-6">
          <div className="h-5 w-52 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

          <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, rowIndex) => (
            <div
              key={`loading-row-${rowIndex}`}
              className="flex gap-2"
            >
              <div className="h-8 w-12 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />

              {Array.from({ length: 12 }).map(
                (_, columnIndex) => (
                  <div
                    key={`loading-cell-${rowIndex}-${columnIndex}`}
                    className="h-8 flex-1 animate-pulse rounded bg-slate-100 dark:bg-slate-800"
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /**
   * Empty state.
   */
  if (!heatmapData || heatmapData.length === 0) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      >
        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <div className="mb-4 rounded-full bg-emerald-50 p-4 dark:bg-emerald-900/20">
            <Clock3 className="h-8 w-8 text-emerald-600" />
          </div>

          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            No heatmap data available
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Energy usage patterns will appear here after GreenCompute
            receives monitoring data.
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
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
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
            Total Usage
          </p>

          <p className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
            {totalEnergy.toFixed(0)}
            <span className="ml-1 text-sm font-medium text-slate-500">
              kWh
            </span>
          </p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="min-w-[780px]">
          {/* Time Header */}
          <div className="mb-2 grid grid-cols-[60px_repeat(12,minmax(42px,1fr))] gap-1">
            <div />

            {TIME_SLOTS.map((time) => (
              <div
                key={time}
                className="text-center text-[10px] font-medium text-slate-500 dark:text-slate-400 sm:text-xs"
              >
                {time}
              </div>
            ))}
          </div>

          {/* Heatmap Rows */}
          <div className="space-y-1">
            {heatmapData.map((row) => (
              <div
                key={row.day}
                className="grid grid-cols-[60px_repeat(12,minmax(42px,1fr))] gap-1"
              >
                {/* Day */}
                <div className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {row.day}
                </div>

                {/* Cells */}
                {TIME_SLOTS.map((time, index) => {
                  const value = Number(
                    row.values?.[index] || 0
                  );

                  return (
                    <div
                      key={`${row.day}-${time}`}
                      title={`${row.day}, ${time}: ${value} kWh`}
                      className={`group relative flex h-9 cursor-pointer items-center justify-center rounded-md transition-all duration-200 hover:scale-105 hover:ring-2 hover:ring-emerald-500 hover:ring-offset-1 ${getIntensityClass(
                        value,
                        minValue,
                        maxValue
                      )}`}
                    >
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-white">
                        {value}
                      </span>

                      {/* Hover Tooltip */}
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                        <p className="font-semibold">
                          {row.day} • {time}
                        </p>

                        <p className="mt-1 text-slate-300">
                          Energy: {value} kWh
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Low
            </span>

            <div className="flex gap-1">
              <span className="h-4 w-5 rounded bg-emerald-100 dark:bg-emerald-950" />
              <span className="h-4 w-5 rounded bg-emerald-200 dark:bg-emerald-900" />
              <span className="h-4 w-5 rounded bg-emerald-300 dark:bg-emerald-700" />
              <span className="h-4 w-5 rounded bg-emerald-400 dark:bg-emerald-600" />
              <span className="h-4 w-5 rounded bg-emerald-600 dark:bg-emerald-500" />
            </div>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              High
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Values shown in kWh
          </p>
        </div>
      )}

      {/* Footer Insights */}
      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 dark:border-slate-800">
        {/* Highest Usage */}
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Peak usage
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
            {highestUsage?.day || "N/A"}{" "}
            {highestUsage?.time || ""}
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {Number(highestUsage?.value || 0).toFixed(1)} kWh
          </p>
        </div>

        {/* Green Insight */}
        <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
          <div className="flex items-start gap-2">
            <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

            <div>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                GreenCompute Insight
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-700/80 dark:text-emerald-400/80">
                Focus smart sleep and shutdown rules on peak
                usage periods to reduce unnecessary energy waste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EnergyHeatmap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  loading: PropTypes.bool,
  showLegend: PropTypes.bool,
  className: PropTypes.string,
};

export default EnergyHeatmap;