import PropTypes from "prop-types";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98]",

    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:scale-[0.98]",

    outline:
      "border border-emerald-600 bg-transparent text-emerald-600 hover:bg-emerald-50 active:scale-[0.98]",

    danger:
      "bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 active:scale-[0.98]",

    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
            aria-hidden="true"
          />

          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "danger",
    "ghost",
  ]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;