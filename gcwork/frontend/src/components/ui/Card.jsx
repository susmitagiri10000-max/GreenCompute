import React from "react";
import PropTypes from "prop-types";

/**
 * Reusable Card Component
 *
 * Features:
 * - Header
 * - Title
 * - Description
 * - Action area
 * - Footer
 * - Different padding sizes
 * - Hover effect
 * - Border control
 * - Shadow control
 * - Dark mode
 * - Custom className
 */

const Card = ({
  children,
  title,
  description,
  headerAction,
  footer,
  padding = "md",
  hover = false,
  bordered = true,
  shadow = "sm",
  rounded = "xl",
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  onClick,
}) => {
  // Padding classes
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
    xl: "p-8",
  };

  // Shadow classes
  const shadowClasses = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  // Rounded classes
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  };

  const cardClasses = `
    w-full
    overflow-hidden
    bg-white
    dark:bg-slate-900
    ${bordered ? "border border-slate-200 dark:border-slate-700" : ""}
    ${shadowClasses[shadow] || shadowClasses.sm}
    ${roundedClasses[rounded] || roundedClasses.xl}
    ${hover ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
  `;

  const bodyPadding =
    paddingClasses[padding] !== undefined
      ? paddingClasses[padding]
      : paddingClasses.md;

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          onClick(event);
        }
      }}
    >
      {/* Header */}
      {(title || description || headerAction) && (
        <div
          className={`
            flex
            items-start
            justify-between
            gap-4
            border-b
            border-slate-200
            dark:border-slate-700
            ${bodyPadding}
            ${headerClassName}
          `}
        >
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
            )}

            {description && (
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>

          {headerAction && (
            <div className="shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div
        className={`
          ${bodyPadding}
          ${bodyClassName}
        `}
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className={`
            border-t
            border-slate-200
            bg-slate-50
            dark:border-slate-700
            dark:bg-slate-800/50
            ${bodyPadding}
            ${footerClassName}
          `}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,

  title: PropTypes.string,

  description: PropTypes.string,

  headerAction: PropTypes.node,

  footer: PropTypes.node,

  padding: PropTypes.oneOf([
    "none",
    "sm",
    "md",
    "lg",
    "xl",
  ]),

  hover: PropTypes.bool,

  bordered: PropTypes.bool,

  shadow: PropTypes.oneOf([
    "none",
    "sm",
    "md",
    "lg",
    "xl",
  ]),

  rounded: PropTypes.oneOf([
    "none",
    "sm",
    "md",
    "lg",
    "xl",
  ]),

  className: PropTypes.string,

  headerClassName: PropTypes.string,

  bodyClassName: PropTypes.string,

  footerClassName: PropTypes.string,

  onClick: PropTypes.func,
};

export default Card;