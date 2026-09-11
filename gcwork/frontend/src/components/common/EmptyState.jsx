import PropTypes from "prop-types";
import { Inbox, Plus, RefreshCw } from "lucide-react";

function EmptyState({
  title = "No data available",
  message = "There is nothing to display here yet.",
  icon: Icon = Inbox,
  actionLabel = "",
  onAction = null,
  actionType = "primary",
  className = "",
}) {
  const actionStyles = {
    primary:
      "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700",
    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
    outline:
      "border border-emerald-600 bg-transparent text-emerald-600 hover:bg-emerald-50",
  };

  return (
    <div
      className={`flex min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center ${className}`}
    >
      {/* Icon */}
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
        <Icon
          size={32}
          strokeWidth={1.8}
          className="text-emerald-600"
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>

      {/* Message */}
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={`mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${actionStyles[actionType]}`}
        >
          {actionType === "refresh" ? (
            <RefreshCw size={16} />
          ) : (
            <Plus size={16} />
          )}

          {actionLabel}
        </button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.elementType,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  actionType: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "refresh",
  ]),
  className: PropTypes.string,
};

export default EmptyState;