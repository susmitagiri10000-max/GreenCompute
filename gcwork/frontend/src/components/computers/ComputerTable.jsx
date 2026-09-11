import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Search,
  Filter,
  Monitor,
  Wifi,
  Moon,
  WifiOff,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Zap,
  Leaf,
} from "lucide-react";

function ComputerTable({
  computers = [],
  loading = false,
  onView = null,
  onMenu = null,
  pageSize = 8,
  className = "",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const defaultComputers = [
    {
      id: 1,
      name: "CSE-PC-001",
      hostname: "CSE-LAB1-PC01",
      labName: "CSE Lab 1",
      status: "online",
      cpuUsage: 42,
      memoryUsage: 68,
      uptime: "5h 32m",
      energyToday: 2.84,
      carbonToday: 2.22,
      lastActive: "2 min ago",
    },
    {
      id: 2,
      name: "CSE-PC-002",
      hostname: "CSE-LAB1-PC02",
      labName: "CSE Lab 1",
      status: "idle",
      cpuUsage: 8,
      memoryUsage: 41,
      uptime: "4h 18m",
      energyToday: 1.92,
      carbonToday: 1.50,
      lastActive: "18 min ago",
    },
    {
      id: 3,
      name: "CSE-PC-003",
      hostname: "CSE-LAB1-PC03",
      labName: "CSE Lab 1",
      status: "online",
      cpuUsage: 56,
      memoryUsage: 72,
      uptime: "6h 05m",
      energyToday: 3.21,
      carbonToday: 2.51,
      lastActive: "1 min ago",
    },
    {
      id: 4,
      name: "CSE-PC-004",
      hostname: "CSE-LAB1-PC04",
      labName: "CSE Lab 1",
      status: "offline",
      cpuUsage: 0,
      memoryUsage: 0,
      uptime: "0h 0m",
      energyToday: 0,
      carbonToday: 0,
      lastActive: "2 hours ago",
    },
    {
      id: 5,
      name: "CSE-PC-005",
      hostname: "CSE-LAB2-PC01",
      labName: "CSE Lab 2",
      status: "sleep",
      cpuUsage: 0,
      memoryUsage: 12,
      uptime: "3h 45m",
      energyToday: 0.84,
      carbonToday: 0.66,
      lastActive: "35 min ago",
    },
  ];

  const data =
    computers.length > 0 ? computers : defaultComputers;

  const statusConfig = {
    online: {
      label: "Online",
      background: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
      icon: Wifi,
    },
    idle: {
      label: "Idle",
      background: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-500",
      icon: Moon,
    },
    sleep: {
      label: "Sleeping",
      background: "bg-indigo-50",
      text: "text-indigo-700",
      dot: "bg-indigo-500",
      icon: Moon,
    },
    offline: {
      label: "Offline",
      background: "bg-slate-100",
      text: "text-slate-600",
      dot: "bg-slate-400",
      icon: WifiOff,
    },
  };

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((previous) =>
        previous === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const filteredAndSortedComputers = useMemo(() => {
    const filtered = data.filter((computer) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        computer.name?.toLowerCase().includes(search) ||
        computer.hostname?.toLowerCase().includes(search) ||
        computer.labName?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        computer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (
        typeof valueA === "string" &&
        typeof valueB === "string"
      ) {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return sortDirection === "asc" ? -1 : 1;
      }

      if (valueA > valueB) {
        return sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [
    data,
    searchTerm,
    statusFilter,
    sortField,
    sortDirection,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAndSortedComputers.length / pageSize
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * pageSize;

  const paginatedComputers =
    filteredAndSortedComputers.slice(
      startIndex,
      startIndex + pageSize
    );

  const changePage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div
      className={`
        overflow-hidden rounded-2xl
        border border-slate-200
        bg-white shadow-sm
        ${className}
      `}
    >
      {/* Header */}
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                <Monitor
                  size={18}
                  className="text-emerald-600"
                />
              </div>

              <h2 className="text-lg font-bold text-slate-800">
                Computers
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Monitor computer status, resource usage and
              sustainability metrics.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            <span className="font-semibold text-slate-800">
              {filteredAndSortedComputers.length}
            </span>{" "}
            computers found
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="
                pointer-events-none
                absolute left-3 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search computer, hostname or lab..."
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-2.5 pl-10 pr-4
                text-sm text-slate-700
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-emerald-500
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500/20
              "
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter
              size={17}
              className="
                pointer-events-none
                absolute left-3 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <select
              value={statusFilter}
              onChange={handleStatusFilter}
              className="
                w-full appearance-none
                rounded-xl
                border border-slate-200
                bg-slate-50
                py-2.5 pl-10 pr-10
                text-sm font-medium
                text-slate-600
                outline-none
                transition
                focus:border-emerald-500
                focus:bg-white
                focus:ring-2
                focus:ring-emerald-500/20
                md:w-48
              "
            >
              <option value="all">
                All Status
              </option>

              <option value="online">
                Online
              </option>

              <option value="idle">
                Idle
              </option>

              <option value="sleep">
                Sleeping
              </option>

              <option value="offline">
                Offline
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-4 p-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="animate-pulse"
            >
              <div className="h-16 rounded-xl bg-slate-100" />
            </div>
          ))}
        </div>
      ) : paginatedComputers.length === 0 ? (
        /* Empty State */
        <div className="flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
            <Monitor
              size={26}
              className="text-slate-400"
            />
          </div>

          <h3 className="mt-4 text-base font-semibold text-slate-700">
            No computers found
          </h3>

          <p className="mt-2 max-w-sm text-sm text-slate-400">
            Try changing your search term or status filter.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="px-5 py-4 text-left">
                    <button
                      type="button"
                      onClick={() => handleSort("name")}
                      className="
                        inline-flex items-center gap-2
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-slate-500
                        hover:text-emerald-600
                      "
                    >
                      Computer
                      <ArrowUpDown size={13} />
                    </button>
                  </th>

                  <th className="px-5 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Lab
                    </span>
                  </th>

                  <th className="px-5 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </span>
                  </th>

                  <th className="px-5 py-4 text-left">
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("cpuUsage")
                      }
                      className="
                        inline-flex items-center gap-2
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-slate-500
                        hover:text-emerald-600
                      "
                    >
                      CPU
                      <ArrowUpDown size={13} />
                    </button>
                  </th>

                  <th className="px-5 py-4 text-left">
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("memoryUsage")
                      }
                      className="
                        inline-flex items-center gap-2
                        text-xs font-semibold
                        uppercase tracking-wider
                        text-slate-500
                        hover:text-emerald-600
                      "
                    >
                      RAM
                      <ArrowUpDown size={13} />
                    </button>
                  </th>

                  <th className="px-5 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Energy
                    </span>
                  </th>

                  <th className="px-5 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      CO₂
                    </span>
                  </th>

                  <th className="px-5 py-4 text-right">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedComputers.map(
                  (computer) => {
                    const config =
                      statusConfig[
                        computer.status
                      ] || statusConfig.online;

                    const StatusIcon = config.icon;

                    return (
                      <tr
                        key={computer.id}
                        className="
                          border-b border-slate-100
                          transition
                          last:border-0
                          hover:bg-emerald-50/30
                        "
                      >
                        {/* Computer */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                              <Monitor
                                size={18}
                                className="text-emerald-600"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-slate-700">
                                {computer.name}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-400">
                                {computer.hostname ||
                                  "No hostname"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Lab */}
                        <td className="px-5 py-4">
                          <span className="text-sm text-slate-600">
                            {computer.labName ||
                              "—"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span
                            className={`
                              inline-flex
                              items-center gap-2
                              rounded-full
                              px-3 py-1.5
                              text-xs font-semibold
                              ${config.background}
                              ${config.text}
                            `}
                          >
                            <span
                              className={`
                                h-2 w-2 rounded-full
                                ${config.dot}
                                ${
                                  computer.status ===
                                  "online"
                                    ? "animate-pulse"
                                    : ""
                                }
                              `}
                            />

                            {config.label}
                          </span>
                        </td>

                        {/* CPU */}
                        <td className="px-5 py-4">
                          <div className="w-24">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-700">
                                {Math.round(
                                  Number(
                                    computer.cpuUsage
                                  ) || 0
                                )}
                                %
                              </span>
                            </div>

                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-blue-500"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      Number(
                                        computer.cpuUsage
                                      ) || 0
                                    )
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* RAM */}
                        <td className="px-5 py-4">
                          <div className="w-24">
                            <span className="text-xs font-semibold text-slate-700">
                              {Math.round(
                                Number(
                                  computer.memoryUsage
                                ) || 0
                              )}
                              %
                            </span>

                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-purple-500"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      Number(
                                        computer.memoryUsage
                                      ) || 0
                                    )
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Energy */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Zap
                              size={15}
                              className="text-amber-500"
                            />

                            <span className="text-sm font-semibold text-slate-700">
                              {formatNumber(
                                computer.energyToday
                              )}{" "}
                              <span className="text-xs font-normal text-slate-400">
                                kWh
                              </span>
                            </span>
                          </div>
                        </td>

                        {/* Carbon */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Leaf
                              size={15}
                              className="text-emerald-500"
                            />

                            <span className="text-sm font-semibold text-slate-700">
                              {formatNumber(
                                computer.carbonToday
                              )}{" "}
                              <span className="text-xs font-normal text-slate-400">
                                kg
                              </span>
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {onView && (
                              <button
                                type="button"
                                onClick={() =>
                                  onView(
                                    computer.id
                                  )
                                }
                                className="
                                  rounded-lg p-2
                                  text-slate-400
                                  transition
                                  hover:bg-emerald-50
                                  hover:text-emerald-600
                                "
                                aria-label={`View ${computer.name}`}
                              >
                                <Eye size={17} />
                              </button>
                            )}

                            {onMenu && (
                              <button
                                type="button"
                                onClick={() =>
                                  onMenu(
                                    computer.id
                                  )
                                }
                                className="
                                  rounded-lg p-2
                                  text-slate-400
                                  transition
                                  hover:bg-slate-100
                                  hover:text-slate-700
                                "
                                aria-label={`More options for ${computer.name}`}
                              >
                                <MoreVertical
                                  size={17}
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 p-4 lg:hidden">
            {paginatedComputers.map(
              (computer) => {
                const config =
                  statusConfig[
                    computer.status
                  ] || statusConfig.online;

                return (
                  <div
                    key={computer.id}
                    className="
                      rounded-xl
                      border border-slate-200
                      bg-white p-4
                      transition
                      hover:border-emerald-200
                    "
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                          <Monitor
                            size={18}
                            className="text-emerald-600"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-bold text-slate-700">
                            {computer.name}
                          </h3>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            {computer.labName ||
                              "Unknown Lab"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`
                          inline-flex shrink-0
                          items-center gap-2
                          rounded-full px-2.5 py-1
                          text-[11px] font-semibold
                          ${config.background}
                          ${config.text}
                        `}
                      >
                        <span
                          className={`
                            h-1.5 w-1.5 rounded-full
                            ${config.dot}
                          `}
                        />

                        {config.label}
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[11px] text-slate-400">
                          CPU
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-700">
                          {Math.round(
                            Number(
                              computer.cpuUsage
                            ) || 0
                          )}
                          %
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-[11px] text-slate-400">
                          RAM
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-700">
                          {Math.round(
                            Number(
                              computer.memoryUsage
                            ) || 0
                          )}
                          %
                        </p>
                      </div>

                      <div className="rounded-lg bg-amber-50/50 p-3">
                        <p className="text-[11px] text-slate-400">
                          Energy
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-700">
                          {formatNumber(
                            computer.energyToday
                          )}{" "}
                          kWh
                        </p>
                      </div>

                      <div className="rounded-lg bg-emerald-50/50 p-3">
                        <p className="text-[11px] text-slate-400">
                          CO₂
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-700">
                          {formatNumber(
                            computer.carbonToday
                          )}{" "}
                          kg
                        </p>
                      </div>
                    </div>

                    {/* Last Active */}
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-xs text-slate-400">
                        Last active
                      </span>

                      <span className="text-xs font-medium text-slate-600">
                        {computer.lastActive ||
                          "Unknown"}
                      </span>
                    </div>

                    {/* Actions */}
                    {(onView || onMenu) && (
                      <div className="mt-3 flex gap-2">
                        {onView && (
                          <button
                            type="button"
                            onClick={() =>
                              onView(
                                computer.id
                              )
                            }
                            className="
                              flex flex-1
                              items-center
                              justify-center
                              gap-2 rounded-lg
                              bg-emerald-50
                              px-3 py-2
                              text-xs font-semibold
                              text-emerald-700
                              transition
                              hover:bg-emerald-100
                            "
                          >
                            <Eye size={15} />
                            View Details
                          </button>
                        )}

                        {onMenu && (
                          <button
                            type="button"
                            onClick={() =>
                              onMenu(
                                computer.id
                              )
                            }
                            className="
                              rounded-lg
                              border border-slate-200
                              px-3 py-2
                              text-slate-500
                              transition
                              hover:bg-slate-50
                            "
                            aria-label={`More options for ${computer.name}`}
                          >
                            <MoreVertical
                              size={16}
                            />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredAndSortedComputers.length ===
                0
                  ? 0
                  : startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-700">
                {Math.min(
                  startIndex + pageSize,
                  filteredAndSortedComputers.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filteredAndSortedComputers.length}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  changePage(safeCurrentPage - 1)
                }
                disabled={safeCurrentPage === 1}
                className="
                  rounded-lg border
                  border-slate-200
                  p-2 text-slate-500
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
                aria-label="Previous page"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="min-w-[70px] text-center text-xs font-medium text-slate-500">
                Page {safeCurrentPage} of{" "}
                {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  changePage(safeCurrentPage + 1)
                }
                disabled={
                  safeCurrentPage === totalPages
                }
                className="
                  rounded-lg border
                  border-slate-200
                  p-2 text-slate-500
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
                aria-label="Next page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

ComputerTable.propTypes = {
  computers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      name: PropTypes.string,
      hostname: PropTypes.string,
      labName: PropTypes.string,
      status: PropTypes.oneOf([
        "online",
        "idle",
        "sleep",
        "offline",
      ]),
      cpuUsage: PropTypes.number,
      memoryUsage: PropTypes.number,
      uptime: PropTypes.string,
      energyToday: PropTypes.number,
      carbonToday: PropTypes.number,
      lastActive: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  onView: PropTypes.func,
  onMenu: PropTypes.func,
  pageSize: PropTypes.number,
  className: PropTypes.string,
};

export default ComputerTable;