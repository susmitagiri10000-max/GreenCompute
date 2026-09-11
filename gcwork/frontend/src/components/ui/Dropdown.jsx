import {
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import PropTypes from "prop-types";

import {
  ChevronDown,
  Check,
} from "lucide-react";

/**
 * Reusable Dropdown Component
 *
 * Features:
 * - Custom trigger
 * - Selectable options
 * - Icons
 * - Check mark for selected item
 * - Click outside to close
 * - ESC key support
 * - Different sizes
 * - Different positions
 * - Disabled options
 * - Dark mode
 * - Keyboard accessible
 * - Portal based menu
 * - Prevents overflow clipping
 */

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  searchable = false,
  size = "md",
  position = "bottom-left",
  className = "",
  menuClassName = "",
  optionClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // ==================================================
  // SELECTED OPTION
  // ==================================================

  const selectedOption = options.find(
    (option) => option.value === value
  );

  // ==================================================
  // FILTER OPTIONS
  // ==================================================

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : options;

  // ==================================================
  // CALCULATE MENU POSITION
  // ==================================================

  const updateMenuPosition = () => {
    if (!dropdownRef.current) return;

    const trigger =
      dropdownRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const menuWidth = Math.max(
      trigger.width,
      180
    );

    const estimatedMenuHeight = Math.min(
      Math.max(filteredOptions.length * 40 + 8, 48),
      240
    );

    let left = trigger.left;

    let top = trigger.bottom + 8;

    // ----------------------------------------------
    // RIGHT ALIGNMENT
    // ----------------------------------------------

    if (
      position === "bottom-right" ||
      position === "top-right"
    ) {
      left =
        trigger.right - menuWidth;
    }

    // ----------------------------------------------
    // TOP POSITION
    // ----------------------------------------------

    if (
      position === "top-left" ||
      position === "top-right"
    ) {
      top =
        trigger.top -
        estimatedMenuHeight -
        8;
    }

    // ----------------------------------------------
    // KEEP INSIDE VIEWPORT - LEFT
    // ----------------------------------------------

    if (left < 8) {
      left = 8;
    }

    // ----------------------------------------------
    // KEEP INSIDE VIEWPORT - RIGHT
    // ----------------------------------------------

    if (
      left + menuWidth >
      viewportWidth - 8
    ) {
      left =
        viewportWidth -
        menuWidth -
        8;
    }

    // ----------------------------------------------
    // IF BOTTOM MENU DOES NOT FIT
    // OPEN ABOVE
    // ----------------------------------------------

    if (
      position.startsWith("bottom") &&
      top + estimatedMenuHeight >
        viewportHeight - 8
    ) {
      top =
        trigger.top -
        estimatedMenuHeight -
        8;
    }

    // ----------------------------------------------
    // IF TOP MENU DOES NOT FIT
    // OPEN BELOW
    // ----------------------------------------------

    if (
      position.startsWith("top") &&
      top < 8
    ) {
      top = trigger.bottom + 8;
    }

    setMenuPosition({
      top,
      left,
      width: menuWidth,
    });
  };

  // ==================================================
  // UPDATE POSITION WHEN OPEN
  // ==================================================

  useEffect(() => {
    if (!isOpen) return;

    updateMenuPosition();

    const handleResize = () => {
      updateMenuPosition();
    };

    const handleScroll = () => {
      updateMenuPosition();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      true
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
        true
      );
    };
  }, [
    isOpen,
    position,
    filteredOptions.length,
  ]);

  // ==================================================
  // CLICK OUTSIDE
  // ==================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        const menuElement =
          document.getElementById(
            "greencompute-dropdown-menu"
          );

        if (
          menuElement &&
          menuElement.contains(event.target)
        ) {
          return;
        }

        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==================================================
  // ESC KEY
  // ==================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // ==================================================
  // FOCUS SEARCH
  // ==================================================

  useEffect(() => {
    if (
      isOpen &&
      searchable &&
      searchInputRef.current
    ) {
      searchInputRef.current.focus();
    }
  }, [
    isOpen,
    searchable,
  ]);

  // ==================================================
  // SIZES
  // ==================================================

  const sizeClasses = {
    sm: {
      trigger:
        "min-h-9 px-3 text-xs",
      icon: 15,
      menu: "text-xs",
      option:
        "px-3 py-2",
    },

    md: {
      trigger:
        "min-h-10 px-3.5 text-sm",
      icon: 17,
      menu: "text-sm",
      option:
        "px-3.5 py-2.5",
    },

    lg: {
      trigger:
        "min-h-12 px-4 text-base",
      icon: 19,
      menu: "text-base",
      option:
        "px-4 py-3",
    },
  };

  const currentSize =
    sizeClasses[size] ||
    sizeClasses.md;

  // ==================================================
  // SELECT OPTION
  // ==================================================

  const handleSelect = (option) => {
    if (option.disabled) {
      return;
    }

    onChange(option.value);

    setIsOpen(false);
    setSearchTerm("");
  };

  // ==================================================
  // KEYBOARD
  // ==================================================

  const handleTriggerKeyDown = (
    event
  ) => {
    if (disabled) {
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "ArrowDown"
    ) {
      event.preventDefault();

      setIsOpen(
        (previous) => !previous
      );
    }
  };

  // ==================================================
  // DROPDOWN MENU
  // ==================================================

  const dropdownMenu =
    isOpen &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            id="greencompute-dropdown-menu"
            className={`
              fixed
              z-[9999]
              min-w-[180px]
              overflow-hidden
              rounded-xl
              border
              border-slate-200
              bg-white
              shadow-2xl
              dark:border-slate-700
              dark:bg-slate-900
              ${menuClassName}
            `}
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              width: `${menuPosition.width}px`,
            }}
          >
            {/* SEARCH */}
            {searchable && (
              <div
                className="
                  border-b
                  border-slate-200
                  p-2
                  dark:border-slate-700
                "
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search..."
                  className="
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-slate-50
                    px-3
                    py-2
                    text-sm
                    text-slate-700
                    outline-none
                    focus:border-emerald-500
                    focus:ring-2
                    focus:ring-emerald-500/20
                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:text-slate-200
                  "
                />
              </div>
            )}

            {/* OPTIONS */}
            <div
              className="
                max-h-60
                overflow-y-auto
                py-1
              "
              role="listbox"
            >
              {filteredOptions.length >
              0 ? (
                filteredOptions.map(
                  (option) => {
                    const isSelected =
                      option.value ===
                      value;

                    return (
                      <button
                        key={
                          option.value
                        }
                        type="button"
                        role="option"
                        aria-selected={
                          isSelected
                        }
                        disabled={
                          option.disabled
                        }
                        onClick={() =>
                          handleSelect(
                            option
                          )
                        }
                        className={`
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-3
                          text-left
                          transition
                          ${currentSize.option}
                          ${currentSize.menu}

                          ${
                            option.disabled
                              ? "cursor-not-allowed opacity-40"
                              : "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                          }

                          ${
                            isSelected
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "text-slate-700 dark:text-slate-300"
                          }

                          ${optionClassName}
                        `}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          {option.icon && (
                            <span className="shrink-0">
                              {
                                option.icon
                              }
                            </span>
                          )}

                          <span className="truncate">
                            {
                              option.label
                            }
                          </span>
                        </span>

                        {isSelected && (
                          <Check
                            size={16}
                            className="
                              shrink-0
                              text-emerald-600
                              dark:text-emerald-400
                            "
                          />
                        )}
                      </button>
                    );
                  }
                )
              ) : (
                <div
                  className="
                    px-4
                    py-6
                    text-center
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  No options found
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <>
      <div
        ref={dropdownRef}
        className={`relative w-full ${className}`}
      >
        {/* LABEL */}

        {label && (
          <label
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            {label}
          </label>
        )}

        {/* TRIGGER */}

        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => {
            if (!disabled) {
              setIsOpen(
                (previous) =>
                  !previous
              );
            }
          }}
          onKeyDown={
            handleTriggerKeyDown
          }
          className={`
            flex
            w-full
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-white
            text-left
            text-slate-700
            shadow-sm
            outline-none
            transition
            hover:border-slate-300
            focus:border-emerald-500
            focus:ring-2
            focus:ring-emerald-500/20
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-200
            dark:hover:border-slate-600
            ${currentSize.trigger}
          `}
        >
          <span
            className={
              selectedOption
                ? "flex min-w-0 items-center gap-2 truncate"
                : "truncate text-slate-400 dark:text-slate-500"
            }
          >
            {selectedOption?.icon && (
              <span className="shrink-0">
                {
                  selectedOption.icon
                }
              </span>
            )}

            <span className="truncate">
              {selectedOption
                ? selectedOption.label
                : placeholder}
            </span>
          </span>

          <ChevronDown
            size={currentSize.icon}
            className={`
              shrink-0
              text-slate-400
              transition-transform
              duration-200
              ${
                isOpen
                  ? "rotate-180"
                  : ""
              }
            `}
          />
        </button>
      </div>

      {/* PORTAL MENU */}

      {dropdownMenu}
    </>
  );
};

// ==================================================
// PROP TYPES
// ==================================================

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label:
        PropTypes.string
          .isRequired,

      value:
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]).isRequired,

      icon: PropTypes.node,

      disabled:
        PropTypes.bool,
    })
  ),

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  onChange:
    PropTypes.func.isRequired,

  placeholder:
    PropTypes.string,

  label:
    PropTypes.string,

  disabled:
    PropTypes.bool,

  searchable:
    PropTypes.bool,

  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
  ]),

  position: PropTypes.oneOf([
    "bottom-left",
    "bottom-right",
    "top-left",
    "top-right",
  ]),

  className:
    PropTypes.string,

  menuClassName:
    PropTypes.string,

  optionClassName:
    PropTypes.string,
};

export default Dropdown;