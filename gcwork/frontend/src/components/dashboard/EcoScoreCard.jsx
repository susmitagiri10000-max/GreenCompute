import PropTypes from "prop-types";
import { Leaf, TrendingDown, Zap, Award } from "lucide-react";

function EcoScoreCard({
  score = 82,
  title = "Eco Score",
  subtitle = "Overall sustainability performance",
  energyEfficiency = 78,
  carbonReduction = 64,
  rank = "Excellent",
  loading = false,
  className = "",
}) {
  // Keep score between 0 and 100
  const safeScore = Math.min(100, Math.max(0, Number(score) || 0));

  // Calculate circle progress
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (safeScore / 100) * circumference;

  if (loading) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-5 w-28 rounded bg-slate-200" />

          <div className="mt-6 flex justify-center">
            <div className="h-32 w-32 rounded-full bg-slate-200" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="h-20 rounded-xl bg-slate-200" />
            <div className="h-20 rounded-xl bg-slate-200" />
          </div>
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
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <Leaf
                size={18}
                className="text-emerald-600"
              />
            </div>

            <h3 className="text-base font-semibold text-slate-800">
              {title}
            </h3>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        {/* Rank Badge */}
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <Award size={14} />
          {rank}
        </span>
      </div>

      {/* Score Circle */}
      <div className="mt-7 flex justify-center">
        <div className="relative h-36 w-36">
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 120 120"
            aria-label={`Eco Score ${safeScore} out of 100`}
            role="img"
          >
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-emerald-100"
            />

            {/* Progress Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-emerald-600 transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold tracking-tight text-slate-800">
              {safeScore}
            </span>

            <span className="text-xs font-medium text-slate-400">
              / 100
            </span>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-5 rounded-xl bg-emerald-50/70 px-4 py-3 text-center">
        <p className="text-sm font-semibold text-emerald-700">
          Your campus is doing great!
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Keep reducing idle energy consumption.
        </p>
      </div>

      {/* Performance Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {/* Energy Efficiency */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
              <Zap
                size={16}
                className="text-amber-600"
              />
            </div>

            <span className="text-xs font-medium text-slate-500">
              Efficiency
            </span>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <span className="text-lg font-bold text-slate-800">
              {energyEfficiency}%
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-700"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, energyEfficiency)
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Carbon Reduction */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
              <TrendingDown
                size={16}
                className="text-emerald-600"
              />
            </div>

            <span className="text-xs font-medium text-slate-500">
              Carbon Reduced
            </span>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <span className="text-lg font-bold text-slate-800">
              {carbonReduction}%
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, carbonReduction)
                )}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

EcoScoreCard.propTypes = {
  score: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  energyEfficiency: PropTypes.number,
  carbonReduction: PropTypes.number,
  rank: PropTypes.string,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default EcoScoreCard;