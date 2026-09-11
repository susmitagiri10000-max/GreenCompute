import PropTypes from "prop-types";
import {
  RefreshCw,
  CalendarDays,
  Plus,
  Download,
} from "lucide-react";

function DashboardHeader({
  userName = "Admin",
  subtitle = "Monitor your campus energy and sustainability performance.",
  date = "",
  onRefresh = null,
  onAddComputer = null,
  onDownloadReport = null,
  loading = false,
  className = "",
}) {
  const today = new Date();

  const formattedDate =
    date ||
    today.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div
      className={`
        flex flex-col gap-5
        rounded-2xl border border-slate-200
        bg-white p-5 shadow-sm
        sm:p-6
        lg:flex-row lg:items-center lg:justify-between
        ${className}
      `}
    >
      {/* Left Section */}
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays
            size={16}
            className="text-emerald-600"
          />

          <span>{formattedDate}</span>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Welcome back,{" "}
          <span className="text-emerald-600">
            {userName}
          </span>
          !
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {subtitle}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Refresh Button */}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="
              inline-flex items-center justify-center
              gap-2 rounded-xl border border-slate-200
              bg-white px-4 py-2.5
              text-sm font-semibold text-slate-600
              transition-all duration-200
              hover:border-emerald-200
              hover:bg-emerald-50
              hover:text-emerald-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>
        )}

        {/* Download Report */}
        {onDownloadReport && (
          <button
            type="button"
            onClick={onDownloadReport}
            className="
              inline-flex items-center justify-center
              gap-2 rounded-xl border border-slate-200
              bg-white px-4 py-2.5
              text-sm font-semibold text-slate-600
              transition-all duration-200
              hover:border-emerald-200
              hover:bg-emerald-50
              hover:text-emerald-700
            "
          >
            <Download size={17} />

            <span className="hidden sm:inline">
              Report
            </span>
          </button>
        )}

        {/* Add Computer */}
        {onAddComputer && (
          <button
            type="button"
            onClick={onAddComputer}
            className="
              inline-flex items-center justify-center
              gap-2 rounded-xl bg-emerald-600
              px-4 py-2.5 text-sm font-semibold
              text-white shadow-md
              shadow-emerald-600/20
              transition-all duration-200
              hover:bg-emerald-700
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-emerald-500
              focus:ring-offset-2
            "
          >
            <Plus size={17} />

            <span>
              Add Computer
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

DashboardHeader.propTypes = {
  userName: PropTypes.string,
  subtitle: PropTypes.string,
  date: PropTypes.string,
  onRefresh: PropTypes.func,
  onAddComputer: PropTypes.func,
  onDownloadReport: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default DashboardHeader;