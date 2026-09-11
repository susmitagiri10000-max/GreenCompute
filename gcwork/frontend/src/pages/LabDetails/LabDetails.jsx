import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Download,
  Gauge,
  Leaf,
  Monitor,
  Power,
  RefreshCw,
  Search,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/common/Button";
import Dropdown from "../../components/ui/Dropdown";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";

import ComputerCard from "../../components/computers/ComputerCard";
import ComputerTable from "../../components/computers/ComputerTable";

const LabDetails = () => {
  const navigate = useNavigate();
  const { labId } = useParams();

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --------------------------------------------------
  // Demo Lab Data
  // Backend API will replace this later.
  // --------------------------------------------------

  const lab = {
    id: labId || 1,
    name: "CSE Computer Lab 1",
    code: "CSE-LAB-01",
    department: "CSE",
    location: "Block A • 2nd Floor",
    room: "Room 204",
    capacity: 30,

    status: "active",
    monitoring: true,

    totalComputers: 30,
    onlineComputers: 26,
    idleComputers: 3,
    offlineComputers: 1,

    energyToday: 68.4,
    energySaved: 12.6,
    carbonToday: 32.9,

    efficiency: 88,

    averageCpu: 46,
    averageRam: 61,

    uptime: "8h 42m",
    lastUpdated: "Just now",
  };

  // --------------------------------------------------
  // Demo Computer Data
  // --------------------------------------------------

  const computers = [
    {
      id: 1,
      name: "CSE-PC-001",
      hostname: "CSELAB-PC01",
      lab: lab.name,
      ip: "192.168.10.101",
      status: "online",
      cpu: 42,
      ram: 58,
      uptime: "6h 24m",
      lastActive: "Just now",
      energy: 2.84,
      carbon: 1.37,
    },
    {
      id: 2,
      name: "CSE-PC-002",
      hostname: "CSELAB-PC02",
      lab: lab.name,
      ip: "192.168.10.102",
      status: "online",
      cpu: 67,
      ram: 72,
      uptime: "7h 10m",
      lastActive: "Just now",
      energy: 3.12,
      carbon: 1.50,
    },
    {
      id: 3,
      name: "CSE-PC-003",
      hostname: "CSELAB-PC03",
      lab: lab.name,
      ip: "192.168.10.103",
      status: "idle",
      cpu: 4,
      ram: 39,
      uptime: "8h 02m",
      lastActive: "14 min ago",
      energy: 1.94,
      carbon: 0.93,
    },
    {
      id: 4,
      name: "CSE-PC-004",
      hostname: "CSELAB-PC04",
      lab: lab.name,
      ip: "192.168.10.104",
      status: "online",
      cpu: 51,
      ram: 63,
      uptime: "7h 45m",
      lastActive: "Just now",
      energy: 2.96,
      carbon: 1.42,
    },
    {
      id: 5,
      name: "CSE-PC-005",
      hostname: "CSELAB-PC05",
      lab: lab.name,
      ip: "192.168.10.105",
      status: "idle",
      cpu: 7,
      ram: 41,
      uptime: "8h 15m",
      lastActive: "18 min ago",
      energy: 1.76,
      carbon: 0.84,
    },
    {
      id: 6,
      name: "CSE-PC-006",
      hostname: "CSELAB-PC06",
      lab: lab.name,
      ip: "192.168.10.106",
      status: "online",
      cpu: 73,
      ram: 78,
      uptime: "6h 58m",
      lastActive: "Just now",
      energy: 3.45,
      carbon: 1.66,
    },
    {
      id: 7,
      name: "CSE-PC-007",
      hostname: "CSELAB-PC07",
      lab: lab.name,
      ip: "192.168.10.107",
      status: "offline",
      cpu: 0,
      ram: 0,
      uptime: "—",
      lastActive: "42 min ago",
      energy: 0,
      carbon: 0,
    },
    {
      id: 8,
      name: "CSE-PC-008",
      hostname: "CSELAB-PC08",
      lab: lab.name,
      ip: "192.168.10.108",
      status: "online",
      cpu: 38,
      ram: 52,
      uptime: "7h 31m",
      lastActive: "Just now",
      energy: 2.67,
      carbon: 1.28,
    },
    {
      id: 9,
      name: "CSE-PC-009",
      hostname: "CSELAB-PC09",
      lab: lab.name,
      ip: "192.168.10.109",
      status: "online",
      cpu: 56,
      ram: 67,
      uptime: "6h 52m",
      lastActive: "Just now",
      energy: 3.04,
      carbon: 1.46,
    },
    {
      id: 10,
      name: "CSE-PC-010",
      hostname: "CSELAB-PC10",
      lab: lab.name,
      ip: "192.168.10.110",
      status: "idle",
      cpu: 3,
      ram: 36,
      uptime: "8h 30m",
      lastActive: "21 min ago",
      energy: 1.62,
      carbon: 0.78,
    },
  ];

  // --------------------------------------------------
  // Status Options
  // --------------------------------------------------

  const statusOptions = [
    {
      value: "all",
      label: "All Computers",
    },
    {
      value: "online",
      label: "Online",
    },
    {
      value: "idle",
      label: "Idle",
    },
    {
      value: "offline",
      label: "Offline",
    },
  ];

  // --------------------------------------------------
  // Filter Computers
  // --------------------------------------------------

  const filteredComputers = useMemo(() => {
    return computers.filter((computer) => {
      const matchesSearch =
        computer.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        computer.hostname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        computer.ip
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        computer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [computers, searchTerm, statusFilter]);

  // --------------------------------------------------
  // Refresh
  // --------------------------------------------------

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setIsLoading(true);

    try {
      // Future:
      // await labService.getLabDetails(id);
      // await computerService.getLabComputers(id);

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );
    } catch (error) {
      console.error(
        "Failed to refresh lab details:",
        error
      );
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  // --------------------------------------------------
  // Computer Actions
  // --------------------------------------------------

  const handleViewComputer = (computer) => {
    console.log("View computer:", computer);
  };

  const handleComputerMenu = (computer) => {
    console.log("Computer menu:", computer);
  };

  // --------------------------------------------------
  // Export Lab Data
  // --------------------------------------------------

  const handleExport = () => {
    console.log("Export lab data:", lab.id);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ==================================================
            BACK BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={() => navigate("/labs")}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft size={17} />
          Back to Labs
        </button>

        {/* ==================================================
            LAB HEADER
        ================================================== */}

        <section className="mb-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Lab Information */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Building2 size={28} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                      {lab.name}
                    </h1>

                    <Badge
                      variant="success"
                      showDot
                      size="sm"
                    >
                      Active
                    </Badge>
                  </div>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {lab.code} • {lab.department} •{" "}
                    {lab.location}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>Room {lab.room}</span>

                    <span>Capacity: {lab.capacity}</span>

                    <span className="flex items-center gap-1.5">
                      <Wifi
                        size={13}
                        className="text-emerald-500"
                      />
                      Monitoring Connected
                    </span>

                    <span>
                      Updated {lab.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Download}
                  onClick={handleExport}
                >
                  Export
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  icon={RefreshCw}
                  loading={isRefreshing}
                  disabled={isRefreshing}
                  onClick={handleRefresh}
                >
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            LAB OVERVIEW STATS
        ================================================== */}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Computers */}
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Computers
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {lab.onlineComputers}
                  <span className="ml-1 text-lg font-medium text-slate-400">
                    / {lab.totalComputers}
                  </span>
                </p>

                <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                  {lab.onlineComputers} online
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Monitor size={21} />
              </div>
            </div>
          </Card>

          {/* Energy */}
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Energy Today
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {lab.energyToday}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  kWh consumed
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <Zap size={21} />
              </div>
            </div>
          </Card>

          {/* Carbon */}
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  CO₂ Today
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {lab.carbonToday}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  kg CO₂ emitted
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Leaf size={21} />
              </div>
            </div>
          </Card>

          {/* Efficiency */}
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Energy Efficiency
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {lab.efficiency}%
                </p>

                <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                  Excellent performance
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                <Gauge size={21} />
              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            LIVE MONITORING
        ================================================== */}

        <section className="mb-6">
          <Card>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Wifi size={22} />

                  <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Live Monitoring Active
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    GreenCompute monitoring agent is
                    receiving data from this laboratory.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-slate-500">
                    CPU Avg.
                  </p>

                  <p className="mt-1 font-bold text-slate-900 dark:text-white">
                    {lab.averageCpu}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    RAM Avg.
                  </p>

                  <p className="mt-1 font-bold text-slate-900 dark:text-white">
                    {lab.averageRam}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Uptime
                  </p>

                  <p className="mt-1 font-bold text-slate-900 dark:text-white">
                    {lab.uptime}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            COMPUTER STATUS SUMMARY
        ================================================== */}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Monitor size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Online
                </p>

                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {lab.onlineComputers}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <ActivityIcon />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Idle
                </p>

                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {lab.idleComputers}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <WifiOff size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Offline
                </p>

                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {lab.offlineComputers}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Power size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Energy Saved
                </p>

                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {lab.energySaved} kWh
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            COMPUTER CONTROLS
        ================================================== */}

        <section className="mb-6">
          <Card>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              {/* Search */}
              <div className="relative w-full xl:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search computers, hostname or IP..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">

                <Dropdown
                  options={statusOptions}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Computer Status"
                  size="sm"
                />

                <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                      viewMode === "grid"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Cards
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                      viewMode === "list"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            COMPUTER LIST
        ================================================== */}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Lab Computers
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {filteredComputers.length} computers found
              </p>
            </div>

            <Badge
              variant="info"
              size="sm"
            >
              {lab.onlineComputers} Online
            </Badge>
          </div>

          {isLoading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <LoadingSpinner
                size="lg"
                text="Loading computers..."
              />
            </div>
          ) : filteredComputers.length === 0 ? (
            <Card>
              <EmptyState
                icon={Search}
                title="No computers found"
                description="Try changing your search or status filter."
                actionLabel="Clear Search"
                onAction={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              />
            </Card>
          ) : viewMode === "grid" ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredComputers.map((computer) => (
                <ComputerCard
                  key={computer.id}
                  computer={computer}
                  name={computer.name}
                  hostname={computer.hostname}
                  lab={computer.lab}
                  ip={computer.ip}
                  status={computer.status}
                  cpu={computer.cpu}
                  ram={computer.ram}
                  uptime={computer.uptime}
                  lastActive={computer.lastActive}
                  energy={computer.energy}
                  carbon={computer.carbon}
                  onView={() =>
                    handleViewComputer(computer)
                  }
                  onMenu={() =>
                    handleComputerMenu(computer)
                  }
                />
              ))}
            </div>
          ) : (
            <Card padding="none">
              <ComputerTable
                computers={filteredComputers}
                loading={isLoading}
                onView={handleViewComputer}
                onMenu={handleComputerMenu}
              />
            </Card>
          )}
        </section>

        {/* ==================================================
            SMART SHUTDOWN INSIGHT
        ================================================== */}

        <section className="mt-6">
          <Card>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <Power size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Smart Shutdown Opportunity
                  </h3>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {lab.idleComputers} computers are currently
                    idle. Enabling smart sleep could save
                    additional energy when these machines
                    remain inactive.
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() =>
                  navigate("/settings")
                }
              >
                Configure Smart Shutdown
              </Button>
            </div>
          </Card>
        </section>

        {/* ==================================================
            LAB FOOTER SUMMARY
        ================================================== */}

        <section className="mt-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/50 dark:bg-emerald-500/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Leaf
                  size={20}
                  className="text-emerald-600 dark:text-emerald-400"
                />

                <div>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-300">
                    Lab Sustainability Performance
                  </p>

                  <p className="mt-1 text-sm text-emerald-800/80 dark:text-emerald-400/80">
                    This lab has saved{" "}
                    <strong>{lab.energySaved} kWh</strong>{" "}
                    through GreenCompute monitoring.
                  </p>
                </div>
              </div>

              <Badge
                variant="success"
                size="sm"
              >
                {lab.efficiency}% Efficient
              </Badge>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// --------------------------------------------------
// Small local icon component
// --------------------------------------------------

const ActivityIcon = () => {
  return (
    <span className="relative flex items-center justify-center">
      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
    </span>
  );
};

export default LabDetails;