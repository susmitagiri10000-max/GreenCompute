import React from "react";
import PropTypes from "prop-types";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock3,
  Wifi,
  WifiOff,
  Loader2,
  Info,
} from "lucide-react";

/**
 * Reusable Badge Component
 *
 * Supports:
 * - Different variants
 * - Status icons
 * - Different sizes
 * - Dot indicator
 * - Outline style
 * - Dark mode
 * - Custom className
 */

const Badge = ({
  children,
  variant = "default",
  size = "md",
  showIcon = false,
  showDot = false,
  outline = false,
  className = "",
}) => {
  const variants = {
    default: {
      solid:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
      outline:
        "border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300",
      dot: "bg-slate-500",
    },

    success: {
      solid:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
      outline:
        "border-emerald-500 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },

    warning: {
      solid:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
      outline:
        "border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-400",
      dot: "bg-amber-500",
    },

    danger: {
      solid:
        "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
      outline:
        "border-red-500 text-red-700 dark:border-red-400 dark:text-red-400",
      dot: "bg-red-500",
    },

    info: {
      solid:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
      outline:
        "border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-400",
      dot: "bg-blue-500",
    },

    purple: {
      solid:
        "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",
      outline:
        "border-purple-500 text-purple-700 dark:border-purple-400 dark:text-purple-400",
      dot: "bg-purple-500",
    },

    cyan: {
      solid:
        "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400",
      outline:
        "border-cyan-500 text-cyan-700 dark:border-cyan-400 dark:text-cyan-400",
      dot: "bg-cyan-500",
    },

    online: {
      solid:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
      outline:
        "border-emerald-500 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400",
      dot: "bg-emerald-500",
    },

    idle: {
      solid:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
      outline:
        "border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-400",
      dot: "bg-amber-500",
    },

    offline: {
      solid:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      outline:
        "border-slate-400 text-slate-600 dark:border-slate-600 dark:text-slate-400",
      dot: "bg-slate-400",
    },

    error: {
      solid:
        "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
      outline:
        "border-red-500 text-red-700 dark:border-red-400 dark:text-red-400",
      dot: "bg-red-500",
    },
  };

  const sizes = {
    xs: {
      wrapper: "px-2 py-0.5 text-[10px] gap-1",
      icon: 11,
      dot: "h-1.5 w-1.5",
    },

    sm: {
      wrapper: "px-2.5 py-1 text-xs gap-1.5",
      icon: 13,
      dot: "h-1.5 w-1.5",
    },

    md: {
      wrapper: "px-3 py-1.5 text-sm gap-1.5",
      icon: 15,
      dot: "h-2 w-2",
    },

    lg: {
      wrapper: "px-3.5 py-2 text-base gap-2",
      icon: 17,
      dot: "h-2.5 w-2.5",
    },
  };

  const icons = {
    success: CheckCircle2,
    warning: AlertCircle,
    danger: XCircle,
    info: Info,
    online: Wifi,
    idle: Clock3,
    offline: WifiOff,
    error: XCircle,
    default: Info,
    purple: Info,
    cyan: Info,
  };

  const currentVariant = variants[variant] || variants.default;
  const currentSize = sizes[size] || sizes.md;

  const Icon = icons[variant] || Info;

  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        justify-center
        whitespace-nowrap
        rounded-full
        font-medium
        transition-colors
        ${currentSize.wrapper}
        ${
          outline
            ? `border bg-transparent ${currentVariant.outline}`
            : currentVariant.solid
        }
        ${className}
      `}
    >
      {/* Dot indicator */}
      {showDot && (
        <span
          className={`
            shrink-0
            rounded-full
            ${currentSize.dot}
            ${currentVariant.dot}
          `}
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      {showIcon && (
        <Icon
          size={currentSize.icon}
          strokeWidth={2}
          aria-hidden="true"
        />
      )}

      {/* Badge text */}
      <span>{children}</span>
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,

  variant: PropTypes.oneOf([
    "default",
    "success",
    "warning",
    "danger",
    "info",
    "purple",
    "cyan",
    "online",
    "idle",
    "offline",
    "error",
  ]),

  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),

  showIcon: PropTypes.bool,

  showDot: PropTypes.bool,

  outline: PropTypes.bool,

  className: PropTypes.string,
};

export default Badge;