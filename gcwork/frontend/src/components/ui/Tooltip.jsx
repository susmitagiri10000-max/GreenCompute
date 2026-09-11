import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Reusable Tooltip Component
 *
 * Features:
 * - Top / Bottom / Left / Right positions
 * - Hover and focus support
 * - Optional delay
 * - Different sizes
 * - Dark mode
 * - Accessible tooltip
 * - Works with buttons, icons and text
 */

const Tooltip = ({
  children,
  content,
  position = "top",
  size = "md",
  delay = 150,
  disabled = false,
  className = "",
  tooltipClassName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(null);

  const showTooltip = () => {
    if (disabled || !content) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    setTimer(timeout);
  };

  const hideTooltip = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    setIsVisible(false);
  };

  // Position classes
  const positionClasses = {
    top: {
      wrapper: "bottom-full left-1/2 mb-2 -translate-x-1/2",
      arrow:
        "left-1/2 top-full -translate-x-1/2 border-x-transparent border-b-transparent",
    },

    bottom: {
      wrapper: "left-1/2 top-full mt-2 -translate-x-1/2",
      arrow:
        "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent",
    },

    left: {
      wrapper: "right-full top-1/2 mr-2 -translate-y-1/2",
      arrow:
        "left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent",
    },

    right: {
      wrapper: "left-full top-1/2 ml-2 -translate-y-1/2",
      arrow:
        "right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent",
    },
  };

  // Size classes
  const sizeClasses = {
    sm: "max-w-[180px] px-2.5 py-1.5 text-xs",

    md: "max-w-[240px] px-3 py-2 text-sm",

    lg: "max-w-[320px] px-4 py-2.5 text-sm",
  };

  const currentPosition =
    positionClasses[position] || positionClasses.top;

  const currentSize =
    sizeClasses[size] || sizeClasses.md;

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {/* Trigger */}
      {children}

      {/* Tooltip */}
      {isVisible && (
        <span
          role="tooltip"
          className={`
            pointer-events-none
            absolute
            z-[110]
            w-max
            rounded-lg
            bg-slate-900
            font-medium
            leading-5
            text-white
            shadow-xl
            dark:bg-slate-700
            ${currentPosition.wrapper}
            ${currentSize}
            ${tooltipClassName}
          `}
        >
          {content}

          {/* Tooltip Arrow */}
          <span
            className={`
              absolute
              h-0
              w-0
              border-[5px]
              border-solid
              border-slate-900
              dark:border-slate-700
              ${currentPosition.arrow}
            `}
          />
        </span>
      )}
    </span>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,

  content: PropTypes.node.isRequired,

  position: PropTypes.oneOf([
    "top",
    "bottom",
    "left",
    "right",
  ]),

  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
  ]),

  delay: PropTypes.number,

  disabled: PropTypes.bool,

  className: PropTypes.string,

  tooltipClassName: PropTypes.string,
};

export default Tooltip;