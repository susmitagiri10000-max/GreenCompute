import { NavLink } from "react-router-dom";
import {
  X,
  Home,
  LayoutDashboard,
  Building2,
  Monitor,
  BarChart3,
  Leaf,
  FileText,
  Settings,
  LogIn,
} from "lucide-react";

function MobileMenu({
  isOpen = false,
  onClose,
}) {
  const navigationLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
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
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close mobile menu"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm"
      />

      {/* Mobile Menu */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-md shadow-emerald-600/20">
              <Leaf
                size={21}
                strokeWidth={2.2}
                className="text-white"
              />
            </div>

            <div className="leading-none">
              <span className="text-lg font-bold tracking-tight text-slate-800">
                Green<span className="text-emerald-600">Compute</span>
              </span>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                Sustainability
              </p>
            </div>
          </NavLink>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </p>

          <nav className="space-y-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.2 : 1.9}
                      />

                      <span>{link.name}</span>

                      {isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sustainability Card */}
          <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
                <Leaf
                  size={19}
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Go Green
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Save energy. Reduce carbon.
                </p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100">
              <div
                className="h-full rounded-full bg-emerald-600"
                style={{ width: "82%" }}
              />
            </div>

            <p className="mt-2 text-xs font-medium text-emerald-700">
              Eco Score: 82/100
            </p>
          </div>
        </div>

        {/* Bottom Login */}
        <div className="shrink-0 border-t border-slate-200 p-4">
          <NavLink
            to="/login"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all duration-200 hover:bg-emerald-700 active:scale-[0.98]"
          >
            <LogIn size={18} />
            Login
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;