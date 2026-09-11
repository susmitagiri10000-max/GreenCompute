import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

/**
 * Reusable Modal Component
 *
 * Features:
 * - Backdrop overlay
 * - Close button
 * - ESC key support
 * - Prevents body scrolling
 * - Multiple sizes
 * - Optional footer
 * - Optional close-on-backdrop
 * - Responsive design
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = "",
}) => {
  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Prevent body scrolling while modal is open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // Modal width classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-[95vw]",
  };

  const modalSize = sizeClasses[size] || sizeClasses.md;

  // Close when clicking backdrop
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
      onMouseDown={handleBackdropClick}
    >
      <div
        className={`
          ${modalSize}
          ${className}
          flex
          max-h-[90vh]
          w-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          animate-[modalIn_0.2s_ease-out]
          dark:border-slate-700
          dark:bg-slate-900
        `}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        {(title || description || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-700">
            <div className="min-w-0 flex-1">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-slate-900 dark:text-white"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400"
                >
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="
                  inline-flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-500
                  transition
                  hover:bg-slate-100
                  hover:text-slate-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-emerald-500
                  focus:ring-offset-2
                  dark:text-slate-400
                  dark:hover:bg-slate-800
                  dark:hover:text-slate-200
                  dark:focus:ring-offset-slate-900
                "
              >
                <X size={20} strokeWidth={2} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-end dark:border-slate-700 dark:bg-slate-800/50">
            {footer}
          </div>
        )}
      </div>

      {/* Modal animation */}
      <style>
        {`
          @keyframes modalIn {
            from {
              opacity: 0;
              transform: scale(0.96) translateY(8px);
            }

            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "full",
  ]),
  showCloseButton: PropTypes.bool,
  closeOnBackdrop: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  className: PropTypes.string,
};

export default Modal;