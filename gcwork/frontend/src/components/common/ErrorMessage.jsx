import PropTypes from "prop-types";
import { AlertCircle, RefreshCw, X } from "lucide-react";

function ErrorMessage({
  message = "Something went wrong. Please try again.",
  title = "Something went wrong",
  onRetry = null,
  onClose = null,
  variant = "error",
  compact = false,
}) {
  const variants = {
    error: {
      container:
        "border-red-200 bg-red-50 text-red-800",
      icon: "text-red-600",
      title: "text-red-800",
      message: "text-red-700",
      button:
        "border-red-300 text-red-700 hover:bg-red-100",
    },

    warning: {
      container:
        "border-amber-200 bg-amber-50 text-amber-800",
      icon: "text-amber-600",
      title: "text-amber-800",
      message: "text-amber-700",
      button:
        "border-amber-300 text-amber-700 hover:bg-amber-100",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div
      role="alert"
      className={`relative w-full rounded-2xl border ${
        currentVariant.container
      } ${compact ? "p-3" : "p-5"} shadow-sm`}
    >
      {/* Close Button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close error message"
          className={`absolute right-3 top-3 rounded-lg p-1.5 transition hover:bg-black/5 ${currentVariant.icon}`}
        >
          <X size={18} />
        </button>
      )}

      <div className="flex items-start gap-3">
        {/* Error Icon */}
        <div className="mt-0.5 shrink-0">
          <AlertCircle
            size={compact ? 20 : 24}
            className={currentVariant.icon}
          />
        </div>

        {/* Error Content */}
        <div className="min-w-0 flex-1">
          <h3
            className={`font-semibold ${
              compact ? "text-sm" : "text-base"
            } ${currentVariant.title}`}
          >
            {title}
          </h3>

          <p
            className={`mt-1 ${
              compact ? "text-xs" : "text-sm"
            } ${currentVariant.message}`}
          >
            {message}
          </p>

          {/* Retry Button */}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={`mt-4 inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-semibold transition ${currentVariant.button}`}
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  onRetry: PropTypes.func,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "warning"]),
  compact: PropTypes.bool,
};

export default ErrorMessage;