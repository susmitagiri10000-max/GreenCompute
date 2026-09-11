import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Monitor,
  BarChart3,
  Leaf,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
} from "lucide-react";

function Sidebar({
  isOpen = true,
  isMobileOpen = false,
  onToggle,
  onClose,
}) {
  const mainNavigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Labs",
      path: "/labs",
      icon: Building2,
    },
    {
      name: "Computers",
      path: "/computers",
      icon: Monitor,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Carbon Tracker",
      path: "/carbon",
      icon: Leaf,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },
  ];

  const handleNavigation = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* ================================
          MOBILE OVERLAY
      ================================= */}

      <div
        className={`
          fixed
          inset-0
          z-[90]
          bg-black/50
          transition-opacity
          duration-300
          lg:hidden
          ${
            isMobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ================================
          SIDEBAR
      ================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[100]
          flex
          h-screen
          w-72
          flex-col
          border-r
          border-slate-200
          bg-white
          shadow-xl
          transition-transform
          duration-300
          ease-in-out
          dark:border-slate-800
          dark:bg-slate-900

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:shadow-none

          ${
            isOpen
              ? "lg:w-64"
              : "lg:w-20"
          }
        `}
      >
        {/* ================================
            LOGO HEADER
        ================================= */}

        <div
          className={`
            flex
            h-16
            shrink-0
            items-center
            border-b
            border-slate-200
            dark:border-slate-800
            ${
              isOpen
                ? "justify-between px-4"
                : "justify-center"
            }
          `}
        >
          <NavLink
            to="/dashboard"
            onClick={handleNavigation}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 shadow-md shadow-emerald-600/20">
              <Leaf
                size={22}
                strokeWidth={2.2}
                className="text-white"
              />
            </div>

            {isOpen && (
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
                  Green
                  <span className="text-emerald-600">
                    Compute
                  </span>
                </span>

                <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  Sustainability
                </span>
              </div>
            )}
          </NavLink>

          {/* MOBILE CLOSE BUTTON */}

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition-colors
              hover:bg-slate-100
              hover:text-slate-700
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white
              lg:hidden
            "
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================================
            NAVIGATION
        ================================= */}

        <div className="flex-1 overflow-y-auto px-3 py-6">
          {isOpen && (
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>
          )}

          <nav className="space-y-1">
            {mainNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  title={!isOpen ? item.name : undefined}
                  className={({ isActive }) => `
                    group
                    flex
                    items-center
                    rounded-xl
                    py-3
                    text-sm
                    font-medium
                    transition-colors
                    duration-200

                    ${
                      isOpen
                        ? "gap-3 px-3"
                        : "justify-center px-2"
                    }

                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={
                          isActive ? 2.2 : 1.9
                        }
                        className="shrink-0"
                      />

                      {isOpen && (
                        <span>{item.name}</span>
                      )}

                      {isOpen && isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* ================================
              SUSTAINABILITY
          ================================= */}

          {isOpen && (
            <div className="mt-8">
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Sustainability
              </p>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/50 dark:bg-emerald-500/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                    <Zap
                      size={16}
                      className="text-white"
                      fill="currentColor"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Eco Score
                    </p>

                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      82/100
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: "82%" }}
                  />
                </div>

                <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                  Great progress! Keep saving energy.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ================================
            BOTTOM SECTION
        ================================= */}

        <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800">

          {/* SETTINGS */}

          <NavLink
            to="/settings"
            onClick={handleNavigation}
            title={!isOpen ? "Settings" : undefined}
            className={({ isActive }) => `
              mb-1
              flex
              items-center
              rounded-xl
              py-3
              text-sm
              font-medium
              transition-colors
              duration-200

              ${
                isOpen
                  ? "gap-3 px-3"
                  : "justify-center px-2"
              }

              ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800"
              }
            `}
          >
            <Settings size={19} />

            {isOpen && (
              <span>Settings</span>
            )}
          </NavLink>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={() => {
              console.log("Logout clicked");
            }}
            title={!isOpen ? "Logout" : undefined}
            className={`
              flex
              w-full
              items-center
              rounded-xl
              py-3
              text-sm
              font-medium
              text-slate-600
              transition-colors
              duration-200
              hover:bg-red-50
              hover:text-red-600
              dark:text-slate-300
              dark:hover:bg-red-500/10

              ${
                isOpen
                  ? "gap-3 px-3"
                  : "justify-center px-2"
              }
            `}
          >
            <LogOut size={19} />

            {isOpen && (
              <span>Logout</span>
            )}
          </button>

          {/* DESKTOP COLLAPSE */}

          {onToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="
                mt-2
                hidden
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                py-2
                text-slate-500
                transition
                hover:bg-slate-50
                hover:text-emerald-600
                dark:border-slate-700
                dark:hover:bg-slate-800
                lg:flex
              "
              aria-label={
                isOpen
                  ? "Collapse sidebar"
                  : "Expand sidebar"
              }
            >
              {isOpen ? (
                <ChevronLeft size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;