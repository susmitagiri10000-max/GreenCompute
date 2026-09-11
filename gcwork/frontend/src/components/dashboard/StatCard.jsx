import PropTypes from "prop-types";

function StatCard({
  title,
  value,
  unit = "",
  icon: Icon,
  iconColor = "text-emerald-600",
  iconBackground = "bg-emerald-50",
  trend = null,
  trendLabel = "",
  trendPositive = true,
  description = "",
  loading = false,
  className = "",
}) {
  if (loading) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-11 w-11 rounded-xl bg-slate-200" />
          </div>

          <div className="mt-5 h-8 w-32 rounded bg-slate-200" />

          <div className="mt-4 h-4 w-40 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        group rounded-2xl border border-slate-200 bg-white p-5
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:border-emerald-200
        hover:shadow-lg hover:shadow-slate-200/50
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500">
            {title}
          </p>
        </div>

        {/* Icon */}
        {Icon && (
          <div
            className={`
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl transition-transform duration-300
              group-hover:scale-110
              ${iconBackground}
            `}
          >
            <Icon
              size={21}
              strokeWidth={2}
              className={iconColor}
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          {value}
        </span>

        {unit && (
          <span className="text-sm font-medium text-slate-500">
            {unit}
          </span>
        )}
      </div>

      {/* Trend / Description */}
      <div className="mt-3 flex min-h-[20px] items-center gap-2">
        {trend !== null && trend !== undefined && (
          <span
            className={`
              inline-flex items-center rounded-full px-2 py-1
              text-xs font-semibold
              ${
                trendPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }
            `}
          >
            {trendPositive ? "↑" : "↓"} {trend}
          </span>
        )}

        {trendLabel && (
          <span className="text-xs text-slate-400">
            {trendLabel}
          </span>
        )}

        {description && !trend && !trendLabel && (
          <span className="text-xs text-slate-400">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  unit: PropTypes.string,
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  iconBackground: PropTypes.string,
  trend: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  trendLabel: PropTypes.string,
  trendPositive: PropTypes.bool,
  description: PropTypes.string,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default StatCard;