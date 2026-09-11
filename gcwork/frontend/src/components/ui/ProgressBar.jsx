import React from "react";
import PropTypes from "prop-types";

/**
 * Reusable Progress Bar Component
 *
 * Features:
 * - Percentage based progress
 * - Different sizes
 * - Different variants
 * - Optional label
 * - Optional percentage
 * - Optional value display
 * - Animated progress
 * - Striped style
 * - Rounded design
 * - Dark mode
 * - Accessible
 */

const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  showPercentage = false,
  showValue = false,
  valueText,
  variant = "success",
  size = "md",
  animated = true,
  striped = false,
  rounded = true,
  className = "",
  trackClassName = "",
  barClassName = "",
}) => {
  // Prevent invalid values
  const safeMax = max > 0 ? max : 100;

  const safeValue = Math.min(
    Math.max(Number(value) || 0, 0),
    safeMax
  );

  // Calculate percentage
  const percentage = Math.round(
    (safeValue / safeMax) * 100
  );

  // Progress variants
  const variantClasses = {
    success: "bg-emerald-500",
    primary: "bg-emerald-600",
    info: "bg-blue-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
    slate: "bg-slate-500",
  };

  // Progress bar sizes
  const sizeClasses = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
    xl: "h-6",
  };

  const progressColor =
    variantClasses[variant] || variantClasses.success;

  const progressHeight =
    sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      {(label || showPercentage || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {/* Label */}
          {label ? (
            <span className="min-w-0 truncate text-sm font-medium text-slate-700 dark:text-slate-300">
              {label}
            </span>
          ) : (
            <span />
          )}

          {/* Value */}
          <div className="shrink-0 text-sm font-medium text-slate-600 dark:text-slate-400">
            {showValue && (
              <span>
                {valueText || `${safeValue} / ${safeMax}`}
              </span>
            )}

            {showValue && showPercentage && (
              <span className="mx-1">•</span>
            )}

            {showPercentage && (
              <span>{percentage}%</span>
            )}
          </div>
        </div>
      )}

      {/* Progress Track */}
      <div
        className={`
          w-full
          overflow-hidden
          bg-slate-100
          dark:bg-slate-800
          ${progressHeight}
          ${rounded ? "rounded-full" : "rounded-none"}
          ${trackClassName}
        `}
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-label={label || "Progress"}
      >
        {/* Progress Fill */}
        <div
          className={`
            h-full
            ${progressColor}
            ${rounded ? "rounded-full" : "rounded-none"}
            ${animated ? "transition-all duration-700 ease-out" : ""}
            ${striped ? "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%)] bg-[length:1rem_1rem]" : ""}
            ${barClassName}
          `}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,

  max: PropTypes.number,

  label: PropTypes.string,

  showPercentage: PropTypes.bool,

  showValue: PropTypes.bool,

  valueText: PropTypes.string,

  variant: PropTypes.oneOf([
    "success",
    "primary",
    "info",
    "warning",
    "danger",
    "purple",
    "cyan",
    "slate",
  ]),

  size: PropTypes.oneOf([
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
  ]),

  animated: PropTypes.bool,

  striped: PropTypes.bool,

  rounded: PropTypes.bool,

  className: PropTypes.string,

  trackClassName: PropTypes.string,

  barClassName: PropTypes.string,
};

export default ProgressBar;