import { useMemo, useState, useEffect, useCallback } from "react";

import {
  Activity,
  AlertTriangle,
  Cloud,
  Cpu,
  Leaf,
  Monitor,
  RefreshCw,
  Server,
  Zap,
} from "lucide-react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import EcoScoreCard from "../../components/dashboard/EcoScoreCard";
import GoalProgress from "../../components/dashboard/GoalProgress";
import ActivityFeed from "../../components/dashboard/ActivityFeed";

import EnergyLineChart from "../../components/charts/EnergyLineChart";
import CarbonAreaChart from "../../components/charts/CarbonAreaChart";
import DepartmentBarChart from "../../components/charts/DepartmentBarChart";
import EnergyPieChart from "../../components/charts/EnergyPieChart";
import EnergyHeatmap from "../../components/charts/EnergyHeatmap";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";

import { getDashboardData } from "../../services/dashboardService";

const Dashboard = () => {
  // ============================================================
  // STATE
  // ============================================================

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [error, setError] = useState("");

  const [backendData, setBackendData] = useState({
    labs: [],
    computers: [],
    energy: [],
    carbon: [],
  });

  // ============================================================
  // LOAD DASHBOARD DATA
  // ============================================================

  const loadDashboardData = useCallback(async (showLoader = false) => {
    if (showLoader) {
      setIsLoading(true);
    }

    setError("");

    try {
      const data = await getDashboardData();

      setBackendData({
        labs: Array.isArray(data?.labs) ? data.labs : [],
        computers: Array.isArray(data?.computers)
          ? data.computers
          : [],
        energy: Array.isArray(data?.energy)
          ? data.energy
          : [],
        carbon: Array.isArray(data?.carbon)
          ? data.carbon
          : [],
      });

      setLastUpdated(new Date());
    } catch (err) {
      console.error("Dashboard API error:", err);

      setError(
        err?.message ||
          "Unable to load dashboard data from the backend."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // ============================================================
  // INITIAL DASHBOARD LOAD
  // ============================================================

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadDashboardData(true);
    }, 0);

    const intervalId = window.setInterval(() => {
      loadDashboardData(false);
    }, 10000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [loadDashboardData]);

  // ============================================================
  // REFRESH DASHBOARD
  // ============================================================

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);
    setError("");

    try {
      await loadDashboardData(false);
    } catch (err) {
      console.error("Dashboard refresh error:", err);

      setError(
        err?.message ||
          "Unable to refresh dashboard data."
      );

      setIsRefreshing(false);
    }
  }, [isRefreshing, loadDashboardData]);

  // ============================================================
  // DASHBOARD CALCULATIONS
  // ============================================================

  const dashboardData = useMemo(() => {
    const computers = backendData.computers || [];
    const energy = backendData.energy || [];
    const carbon = backendData.carbon || [];

    // ----------------------------------------------------------
    // COMPUTER STATISTICS
    // ----------------------------------------------------------

    const totalMachines = computers.length;

    const machinesRunning = computers.filter((computer) => {
      const status = String(
        computer?.status || ""
      ).toLowerCase();

      return (
        status === "online" ||
        status === "running" ||
        status === "active"
      );
    }).length;

    const idleMachines = computers.filter((computer) => {
      const status = String(
        computer?.status || ""
      ).toLowerCase();

      return status === "idle";
    }).length;

    // ----------------------------------------------------------
    // ENERGY STATISTICS
    // ----------------------------------------------------------

    const energyToday = energy.reduce(
      (total, item) =>
        total +
        Number(
          item?.energy_consumed ??
            item?.energyConsumed ??
            0
        ),
      0
    );

    const energyPower = energy.reduce(
      (total, item) =>
        total +
        Number(
          item?.power_consumption ??
            item?.powerConsumption ??
            0
        ),
      0
    );

    // ----------------------------------------------------------
    // CARBON STATISTICS
    // ----------------------------------------------------------

    const carbonToday = carbon.reduce(
      (total, item) =>
        total +
        Number(
          item?.carbon_emission ??
            item?.carbonEmission ??
            0
        ),
      0
    );

    // ----------------------------------------------------------
    // DERIVED / DEMO VALUES
    // ----------------------------------------------------------

    // No fake savings number: savings require a measured baseline.
    const energySaved = 0;

    const ecoScore =
      totalMachines > 0
        ? Math.min(
            100,
            Math.max(
              0,
              Math.round(
                100 -
                  (idleMachines / totalMachines) * 100
              )
            )
          )
        : 0;

    return {
      energyToday: Number(
        energyToday.toFixed(1)
      ),

      energyChange: 0,

      carbonToday: Number(
        carbonToday.toFixed(1)
      ),

      carbonChange: 0,

      energySaved,

      energySavedChange: 0,

      idleMachines,

      idleMachinesChange: 0,

      machinesRunning,

      totalMachines,

      ecoScore,

      powerConsumption: Number(
        energyPower.toFixed(1)
      ),

      sustainabilityGoal: {
        current: energySaved,
        target: 1000,
        unit: "kWh",
        deadline: "December 2026",
      },
    };
  }, [backendData]);

  // ============================================================
  // LAST UPDATED TIME
  // ============================================================

  const formattedUpdatedTime = useMemo(() => {
    return lastUpdated.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [lastUpdated]);

  // ============================================================
  // MACHINE RUNNING PERCENTAGE
  // ============================================================

  const machineRunningPercentage =
    dashboardData.totalMachines > 0
      ? Math.round(
          (dashboardData.machinesRunning /
            dashboardData.totalMachines) *
            100
        )
      : 0;

  // ============================================================
  // ECO SCORE RANK
  // ============================================================

  const ecoRank =
    dashboardData.ecoScore >= 90
      ? "Outstanding"
      : dashboardData.ecoScore >= 75
      ? "Excellent"
      : dashboardData.ecoScore >= 60
      ? "Good"
      : "Needs Improvement";

  // ============================================================
  // ENERGY CHART DATA
  // ============================================================

  const energyChartData = useMemo(() => {
    return backendData.energy.map((item, index) => ({
      name: item.recorded_at
        ? new Date(`${item.recorded_at}Z`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
        : `Reading ${index + 1}`,
      energy: Number(item.energy_consumed ?? item.energyConsumed ?? 0),
    })).reverse();
  }, [backendData.energy]);

  const carbonChartData = useMemo(() => {
    return backendData.carbon.map((item, index) => ({
      day: item.recorded_at
        ? new Date(`${item.recorded_at}Z`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
        : `Reading ${index + 1}`,
      carbon: Number(item.carbon_emission ?? item.carbonEmission ?? 0),
      saved: 0,
    })).reverse();
  }, [backendData.carbon]);

  const departmentChartData = useMemo(() => {
    const labMap = Object.fromEntries((backendData.labs || []).map((lab) => [lab.id, lab]));
    const totals = {};
    (backendData.energy || []).forEach((item) => {
      const computer = (backendData.computers || []).find((c) => c.id === item.computer_id);
      const lab = computer ? labMap[computer.lab_id] : null;
      const department = lab?.department_name || "Unknown";
      totals[department] = (totals[department] || 0) + Number(item.energy_consumed || 0);
    });
    return Object.entries(totals).map(([department, energy]) => ({ department, energy, saved: 0 }));
  }, [backendData]);

  const labPieData = useMemo(() => {
    const labMap = Object.fromEntries((backendData.labs || []).map((lab) => [lab.id, lab]));
    const totals = {};
    (backendData.energy || []).forEach((item) => {
      const computer = (backendData.computers || []).find((c) => c.id === item.computer_id);
      const labName = computer ? (labMap[computer.lab_id]?.name || `Lab #${computer.lab_id}`) : "Unknown";
      totals[labName] = (totals[labName] || 0) + Number(item.energy_consumed || 0);
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [backendData]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ======================================================
            DASHBOARD HEADER
        ====================================================== */}

        <DashboardHeader
          title="Dashboard"
          subtitle="Monitor your campus energy and sustainability performance."
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* ======================================================
            LAST UPDATED
        ====================================================== */}

        <div className="mb-6 flex items-center justify-end gap-2 text-xs text-slate-500 dark:text-slate-400">
          <RefreshCw
            size={13}
            className={
              isRefreshing
                ? "animate-spin"
                : ""
            }
          />

          {isRefreshing
            ? "Refreshing dashboard..."
            : `Last updated at ${formattedUpdatedTime}`}
        </div>

        {/* ======================================================
            ERROR MESSAGE
        ====================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ======================================================
            INITIAL LOADING
        ====================================================== */}

        {isLoading && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex h-10 w-10 items-center justify-center">
              <RefreshCw
                size={24}
                className="animate-spin text-emerald-600"
              />
            </div>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Loading dashboard data...
            </p>
          </div>
        )}

        {/* ======================================================
            TOP STAT CARDS
        ====================================================== */}

        <section
          aria-label="Dashboard statistics"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatCard
            title="Energy Used Today"
            value={dashboardData.energyToday}
            unit="kWh"
            icon={Zap}
            trend={dashboardData.energyChange}
            trendLabel="vs yesterday"
            description="Total electricity consumption today"
          />

          <StatCard
            title="CO₂ Emitted"
            value={dashboardData.carbonToday}
            unit="kg"
            icon={Cloud}
            trend={dashboardData.carbonChange}
            trendLabel="vs yesterday"
            description="Estimated carbon emissions today"
          />

          <StatCard
            title="Energy Saved"
            value={dashboardData.energySaved}
            unit="kWh"
            icon={Leaf}
            trend={dashboardData.energySavedChange}
            trendLabel="this week"
            description="Energy saved through smart actions"
          />

          <StatCard
            title="Idle Machines"
            value={dashboardData.idleMachines}
            unit="PCs"
            icon={Monitor}
            trend={dashboardData.idleMachinesChange}
            trendLabel="current"
            description="Machines currently detected as idle"
          />
        </section>

        {/* ======================================================
            ECO SCORE + GOAL
        ====================================================== */}

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <EcoScoreCard
            score={dashboardData.ecoScore}
            rank={ecoRank}
            efficiency={machineRunningPercentage}
            carbonReduction={0}
          />

          <div className="lg:col-span-2">
            <GoalProgress
              current={
                dashboardData.sustainabilityGoal.current
              }
              target={
                dashboardData.sustainabilityGoal.target
              }
              unit={
                dashboardData.sustainabilityGoal.unit
              }
              deadline={
                dashboardData.sustainabilityGoal.deadline
              }
            />
          </div>
        </section>

        {/* ======================================================
            COMPUTER INFRASTRUCTURE
        ====================================================== */}

        <section className="mt-6">
          <Card
            title="Computer Infrastructure"
            description="Current status of monitored computers across campus."
            headerAction={
              <Badge
                variant="online"
                showDot
                size="sm"
              >
                Monitoring Active
              </Badge>
            }
          >
            <div className="grid gap-5 md:grid-cols-3">

              {/* Running */}

              <div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <Monitor size={20} />
                  </div>

                  <Badge
                    variant="success"
                    size="sm"
                  >
                    Online
                  </Badge>
                </div>

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Machines Running
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                  {dashboardData.machinesRunning}
                </p>

                <div className="mt-4">
                  <ProgressBar
                    value={
                      dashboardData.machinesRunning
                    }
                    max={
                      dashboardData.totalMachines || 1
                    }
                    showPercentage
                    size="sm"
                  />
                </div>
              </div>

              {/* Idle */}

              <div className="rounded-2xl bg-amber-50 p-5 dark:bg-amber-500/10">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                    <Activity size={20} />
                  </div>

                  <Badge
                    variant="idle"
                    showDot
                    size="sm"
                  >
                    Idle
                  </Badge>
                </div>

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Idle Machines
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                  {dashboardData.idleMachines}
                </p>

                <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
                  Consider enabling smart sleep
                </p>
              </div>

              {/* Total */}

              <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/70">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    <Server size={20} />
                  </div>

                  <Badge
                    variant="default"
                    size="sm"
                  >
                    Total
                  </Badge>
                </div>

                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  Monitored Machines
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                  {dashboardData.totalMachines}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  {machineRunningPercentage}% currently active
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ======================================================
            ENERGY + CARBON
        ====================================================== */}

        <section className="mt-6 grid gap-6 xl:grid-cols-2">

          <CarbonAreaChart
            data={carbonChartData}
            title="Carbon Emissions"
            subtitle="CO₂ emitted and saved over the last 7 days"
            height={340}
          />

          <EnergyLineChart
            data={energyChartData}
            title="Energy Consumption"
            subtitle="Energy usage recorded by monitored computers"
            unit="kWh"
            height={340}
          />

        </section>

        {/* ======================================================
            DEPARTMENT ANALYSIS
        ====================================================== */}

        <section className="mt-6 grid gap-6 xl:grid-cols-2">

          <DepartmentBarChart
            data={departmentChartData}
            title="Department Energy Usage"
            subtitle="Energy consumption and savings by department"
            height={350}
          />

          <EnergyPieChart
            data={labPieData}
            title="Energy Distribution"
            subtitle="Energy consumption across laboratories"
            height={350}
          />

        </section>

        {/* ======================================================
            ENERGY HEATMAP
        ====================================================== */}

        <section className="mt-6">
          <EnergyHeatmap
            title="Energy Consumption Heatmap"
            subtitle="Hourly energy usage pattern across the week"
          />
        </section>

        {/* ======================================================
            ACTIVITY + AI INSIGHT
        ====================================================== */}

        <section className="mt-6 grid gap-6 xl:grid-cols-3">

          <div className="xl:col-span-2">
            <ActivityFeed />
          </div>

          <Card
            title="AI Sustainability Insight"
            description="Automated recommendation based on current usage."
          >
            <div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-500/10">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <Leaf size={22} />
              </div>

              <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">
                Reduce evening energy waste
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Several computers remain active after laboratory
                hours. Enabling smart shutdown could reduce
                unnecessary energy consumption.
              </p>

              <div className="mt-5 rounded-xl border border-emerald-200 bg-white p-4 dark:border-emerald-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">

                  <span className="text-xs text-slate-500">
                    Estimated monthly saving
                  </span>

                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    Baseline required
                  </span>

                </div>
              </div>

            </div>
          </Card>

        </section>

        {/* ======================================================
            SYSTEM STATUS
        ====================================================== */}

        <section className="mt-6">
          <Card
            title="System Status"
            description="Current GreenCompute platform monitoring status."
          >

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Monitoring Agent */}

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Cpu size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    Monitoring Agent
                  </p>

                  <Badge
                    variant="success"
                    showDot
                    size="xs"
                  >
                    Operational
                  </Badge>
                </div>

              </div>

              {/* API Server */}

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Cloud size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    API Server
                  </p>

                  <Badge
                    variant="success"
                    showDot
                    size="xs"
                  >
                    Operational
                  </Badge>
                </div>

              </div>

              {/* Database */}

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <Server size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    Database
                  </p>

                  <Badge
                    variant="success"
                    showDot
                    size="xs"
                  >
                    Connected
                  </Badge>
                </div>

              </div>

              {/* Alerts */}

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <AlertTriangle size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    Active Alerts
                  </p>

                  <Badge
                    variant="warning"
                    showDot
                    size="xs"
                  >
                    {dashboardData.idleMachines} alerts
                  </Badge>
                </div>

              </div>

            </div>

          </Card>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;