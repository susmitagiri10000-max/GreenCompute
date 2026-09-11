import PropTypes from "prop-types";
import {
  Monitor,
  Leaf,
  Moon,
  FileText,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

function ActivityFeed({
  activities = [],
  title = "Recent Activity",
  subtitle = "Latest sustainability events",
  maxItems = 6,
  loading = false,
  className = "",
}) {
  const defaultActivities = [
    {
      id: 1,
      type: "energy",
      title: "Energy saved",
      description: "Lab 204 saved 4.8 kWh through smart power management.",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "sleep",
      title: "PCs put to sleep",
      description: "12 idle computers were automatically put to sleep.",
      time: "25 minutes ago",
    },
    {
      id: 3,
      type: "monitor",
      title: "New computers detected",
      description: "8 computers started sending monitoring data.",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "carbon",
      title: "Carbon emissions reduced",
      description: "3.6 kg of CO₂ emissions were avoided today.",
      time: "2 hours ago",
    },
    {
      id: 5,
      type: "report",
      title: "Report generated",
      description: "Weekly sustainability report was generated successfully.",
      time: "3 hours ago",
    },
    {
      id: 6,
      type: "warning",
      title: "High energy usage detected",
      description: "Lab 102 is consuming more energy than usual.",
      time: "4 hours ago",
    },
  ];

  const feedItems =
    activities.length > 0 ? activities : defaultActivities;

  const visibleActivities = feedItems.slice(0, maxItems);

  const activityConfig = {
    energy: {
      icon: Zap,
      iconColor: "text-amber-600",
      iconBackground: "bg-amber-50",
    },
    sleep: {
      icon: Moon,
      iconColor: "text-indigo-600",
      iconBackground: "bg-indigo-50",
    },
    monitor: {
      icon: Monitor,
      iconColor: "text-blue-600",
      iconBackground: "bg-blue-50",
    },
    carbon: {
      icon: Leaf,
      iconColor: "text-emerald-600",
      iconBackground: "bg-emerald-50",
    },
    report: {
      icon: FileText,
      iconColor: "text-purple-600",
      iconBackground: "bg-purple-50",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-orange-600",
      iconBackground: "bg-orange-50",
    },
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      iconBackground: "bg-emerald-50",
    },
  };

  if (loading) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-5 w-36 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-52 rounded bg-slate-200" />

          <div className="mt-6 space-y-5">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex gap-3"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200" />

                <div className="flex-1">
                  <div className="h-4 w-36 rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-24 rounded bg-slate-200" />
                </div>
              </div>
            ))}
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
        hover:border-emerald-200
        hover:shadow-lg hover:shadow-slate-200/50
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-800">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
          <Clock
            size={18}
            className="text-emerald-600"
          />
        </div>
      </div>

      {/* Activity List */}
      {visibleActivities.length > 0 ? (
        <div className="mt-6">
          {visibleActivities.map((activity, index) => {
            const config =
              activityConfig[activity.type] ||
              activityConfig.success;

            const Icon = config.icon;

            return (
              <div
                key={activity.id || index}
                className="relative flex gap-3 pb-6 last:pb-0"
              >
                {/* Timeline */}
                {index !== visibleActivities.length - 1 && (
                  <span className="absolute left-5 top-10 h-[calc(100%-18px)] w-px bg-slate-200" />
                )}

                {/* Icon */}
                <div
                  className={`
                    relative z-10 flex h-10 w-10 shrink-0
                    items-center justify-center rounded-xl
                    ${config.iconBackground}
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className={config.iconColor}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h4 className="text-sm font-semibold text-slate-700">
                      {activity.title}
                    </h4>

                    {activity.time && (
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {activity.time}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50">
            <Clock
              size={22}
              className="text-slate-400"
            />
          </div>

          <h4 className="mt-4 text-sm font-semibold text-slate-700">
            No recent activity
          </h4>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
            Sustainability activities will appear here when
            your monitoring system starts collecting data.
          </p>
        </div>
      )}

      {/* Footer */}
      {visibleActivities.length > 0 && (
        <div className="mt-6 border-t border-slate-100 pt-4">
          <button
            type="button"
            className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
          >
            View all activity
          </button>
        </div>
      )}
    </div>
  );
}

ActivityFeed.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      type: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  maxItems: PropTypes.number,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default ActivityFeed;