import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  // ============================================
  // DESKTOP SIDEBAR
  // ============================================

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  // ============================================
  // MOBILE SIDEBAR
  // ============================================

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  // ============================================
  // OPEN MOBILE SIDEBAR
  // ============================================

  const openMobileSidebar = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setMobileSidebarOpen(true);
  };

  // ============================================
  // CLOSE MOBILE SIDEBAR
  // ============================================

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  // ============================================
  // TOGGLE DESKTOP SIDEBAR
  // ============================================

  const toggleDesktopSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-900
        dark:bg-slate-950
        dark:text-white
      "
    >

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        onToggle={toggleDesktopSidebar}
        onClose={closeMobileSidebar}
      />

      {/* ==========================================
          MAIN AREA
      ========================================== */}

      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ${
            sidebarOpen
              ? "lg:pl-64"
              : "lg:pl-20"
          }
        `}
      >

        {/* ========================================
            MOBILE HEADER
        ======================================== */}

        <header
          className="
            sticky
            top-0
            z-[200]
            flex
            h-16
            w-full
            items-center
            border-b
            border-slate-200
            bg-white
            px-4
            shadow-sm
            dark:border-slate-800
            dark:bg-slate-950
            lg:hidden
          "
        >

          {/* ======================================
              MOBILE MENU BUTTON
          ====================================== */}

          <button
            type="button"
            onClick={openMobileSidebar}
            className="
              relative
              z-[210]
              flex
              h-11
              w-11
              shrink-0
              cursor-pointer
              touch-manipulation
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-sm
              transition
              active:scale-95
              hover:bg-slate-100
              hover:text-emerald-600
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
              dark:hover:bg-slate-800
              dark:hover:text-emerald-400
            "
            aria-label="Open sidebar"
            aria-expanded={mobileSidebarOpen}
            aria-controls="mobile-sidebar"
          >
            <Menu
              size={24}
              strokeWidth={2.2}
            />
          </button>

          {/* ======================================
              MOBILE LOGO
          ====================================== */}

          <div
            className="
              ml-3
              flex
              items-center
              gap-2
            "
          >

            {/* Logo */}

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-emerald-600
                text-white
                shadow-sm
              "
            >
              <span className="text-sm font-bold">
                G
              </span>
            </div>

            {/* Brand */}

            <span
              className="
                text-lg
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              Green
              <span className="text-emerald-600">
                Compute
              </span>
            </span>

          </div>
        </header>

        {/* ========================================
            PAGE CONTENT
        ======================================== */}

        <main
          className="
            min-h-[calc(100vh-4rem)]
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;