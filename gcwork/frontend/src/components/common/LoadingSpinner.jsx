function LoadingSpinner({
  size = "md",
  text = "",
  fullScreen = false,
}) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-emerald-200 border-t-emerald-600`}
        role="status"
        aria-label="Loading"
      />

      {text && (
        <p className="text-sm font-medium text-slate-600">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default LoadingSpinner;