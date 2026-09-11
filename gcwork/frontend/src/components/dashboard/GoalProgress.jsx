import PropTypes from "prop-types";
import { Target, Leaf, CalendarDays, TrendingUp } from "lucide-react";

function GoalProgress({
  title = "Sustainability Goal",
  subtitle = "Reduce campus energy consumption",
  current = 720,
  target = 1000,
  unit = "kWh",
  deadline = "31 Dec 2026",
  progress = null,
  showRemaining = true,
  loading = false,
  className = "",
}) {
  // Calculate progress automatically if it is not provided
  const calculatedProgress =
    target > 0 ? (Number(current) / Number(target)) * 100 : 0;

  const progressValue =
    progress !== null && progress !== undefined
      ? Number(progress)
      : calculatedProgress;

  const safeProgress = Math.min(
    100,
    Math.max(0, progressValue || 0)
  );

  const remaining = Math.max(
    Number(target) - Number(current),
    0
  );

  if (loading) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="h-10 w-10 rounded-xl bg-slate-200" />
          </div>

          <div className="mt-6 h-4 w-full rounded-full bg-slate-200" />

          <div className="mt-4 flex justify-between">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-4 w-24 rounded bg-slate-200" />
          </div>

          <div className="mt-6 h-16 rounded-xl bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        rounded-2xl border border-slate-200 bg-white
        p-6 shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:border-emerald-200
        hover:shadow-lg hover:shadow-slate-200/50
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
            <Target
              size={21}
              className="text-emerald-600"
              strokeWidth={2}
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

        {/* Percentage */}
        <div className="text-right">
          <p className="text-2xl font-bold text-emerald-600">
            {Math.round(safeProgress)}%
          </p>

          <p className="text-[11px] text-slate-400">
            completed
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-7">
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-1000 ease-out"
            style={{
              width: `${safeProgress}%`,
            }}
          />
        </div>

        {/* Current / Target */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">
            {Number(current).toLocaleString()} {unit}
          </span>

          <span className="text-slate-400">
            Goal: {Number(target).toLocaleString()} {unit}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {/* Remaining */}
        {showRemaining && (
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                <Leaf
                  size={16}
                  className="text-emerald-600"
                />
              </div>

              <span className="text-xs font-medium text-slate-500">
                Remaining
              </span>
            </div>

            <p className="mt-3 text-lg font-bold text-slate-800">
              {remaining.toLocaleString()} {unit}
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
              To reach your target
            </p>
          </div>
        )}

        {/* Deadline */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <CalendarDays
                size={16}
                className="text-blue-600"
              />
            </div>

            <span className="text-xs font-medium text-slate-500">
              Deadline
            </span>
          </div>

          <p className="mt-3 text-lg font-bold text-slate-800">
            {deadline}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Keep moving towards the goal
          </p>
        </div>
      </div>

      {/* Motivation */}
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
        <TrendingUp
          size={19}
          className="shrink-0 text-emerald-600"
        />

        <p className="text-xs leading-5 text-slate-600">
          {safeProgress >= 100
            ? "Amazing! You have achieved your sustainability goal."
            : safeProgress >= 75
              ? "Excellent progress! You are very close to reaching your goal."
              : safeProgress >= 50
                ? "Great work! Keep reducing energy consumption to reach your goal."
                : "Every saved unit of energy brings your campus closer to a greener future."}
        </p>
      </div>
    </div>
  );
}

GoalProgress.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  current: PropTypes.number,
  target: PropTypes.number,
  unit: PropTypes.string,
  deadline: PropTypes.string,
  progress: PropTypes.number,
  showRemaining: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default GoalProgress;