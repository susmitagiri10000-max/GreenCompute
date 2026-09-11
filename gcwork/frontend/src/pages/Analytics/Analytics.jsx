import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  Download,
  Gauge,
  Leaf,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

import EnergyLineChart from "../../components/charts/EnergyLineChart";
import CarbonAreaChart from "../../components/charts/CarbonAreaChart";
import DepartmentBarChart from "../../components/charts/DepartmentBarChart";
import EnergyPieChart from "../../components/charts/EnergyPieChart";
import EnergyHeatmap from "../../components/charts/EnergyHeatmap";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Dropdown from "../../components/ui/Dropdown";

import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Analytics = () => {
  // ==================================================
  // STATE
  // ==================================================

  const [timeRange, setTimeRange] = useState("7d");
  const [department, setDepartment] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ==================================================
  // FILTER OPTIONS
  // ==================================================

  const timeRangeOptions = [
    {
      value: "7d",
      label: "Last 7 Days",
    },
    {
      value: "30d",
      label: "Last 30 Days",
    },
    {
      value: "90d",
      label: "Last 90 Days",
    },
    {
      value: "1y",
      label: "Last 12 Months",
    },
  ];

  const departmentOptions = [
    {
      value: "all",
      label: "All Departments",
    },
    {
      value: "CSE",
      label: "CSE",
    },
    {
      value: "ECE",
      label: "ECE",
    },
    {
      value: "IT",
      label: "IT",
    },
    {
      value: "ME",
      label: "Mechanical",
    },
    {
      value: "EE",
      label: "Electrical",
    },
    {
      value: "CE",
      label: "Civil",
    },
    {
      value: "AI & DS",
      label: "AI & Data Science",
    },
  ];

  // ==================================================
  // ANALYTICS SUMMARY
  // ==================================================

  const analytics = {
    totalEnergy: 1248.6,
    previousEnergy: 1385.2,

    energySaved: 186.4,

    carbonEmitted: 599.3,
    carbonSaved: 89.5,

    cost: 11238,
    previousCost: 12467,

    efficiency: 86.8,
    previousEfficiency: 81.4,

    idleHours: 428.5,

    totalComputers: 156,
    activeComputers: 142,

    ecoScore: 88,
  };

  // ==================================================
  // ENERGY CONSUMPTION TREND DATA
  // ==================================================

  const energyTrendData = useMemo(
    () => [
      {
        name: "Mon",
        energy: 152,
      },
      {
        name: "Tue",
        energy: 178,
      },
      {
        name: "Wed",
        energy: 164,
      },
      {
        name: "Thu",
        energy: 191,
      },
      {
        name: "Fri",
        energy: 175,
      },
      {
        name: "Sat",
        energy: 143,
      },
      {
        name: "Sun",
        energy: 146,
      },
    ],
    []
  );

  // ==================================================
  // CALCULATIONS
  // ==================================================

  const calculatedMetrics = useMemo(() => {
    const energyChange =
      analytics.previousEnergy !== 0
        ? ((analytics.totalEnergy - analytics.previousEnergy) /
            analytics.previousEnergy) *
          100
        : 0;

    const costChange =
      analytics.previousCost !== 0
        ? ((analytics.cost - analytics.previousCost) /
            analytics.previousCost) *
          100
        : 0;

    const efficiencyChange =
      analytics.efficiency - analytics.previousEfficiency;

    return {
      energyChange,
      costChange,
      efficiencyChange,
    };
  }, [
    analytics.totalEnergy,
    analytics.previousEnergy,
    analytics.cost,
    analytics.previousCost,
    analytics.efficiency,
    analytics.previousEfficiency,
  ]);

  // ==================================================
  // REFRESH
  // ==================================================

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setIsLoading(true);

    try {
      /*
       * Later this can be replaced with the real
       * backend analytics API call.
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );
    } catch (error) {
      console.error("Failed to refresh analytics:", error);
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  // ==================================================
  // DOWNLOAD HELPER
  // ==================================================

  const downloadFile = (content, fileName, mimeType) => {
    try {
      const blob = new Blob([content], {
        type: mimeType,
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      /*
       * Release the temporary object URL after
       * the download has been triggered.
       */
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("File download failed:", error);
    }
  };

  // ==================================================
  // EXPORT ANALYTICS
  // ==================================================

  const handleExport = () => {
    try {
      const selectedTimeRange =
        timeRangeOptions.find(
          (option) => option.value === timeRange
        )?.label || timeRange;

      const selectedDepartment =
        departmentOptions.find(
          (option) => option.value === department
        )?.label || department;

      const rows = [
        ["GREENCOMPUTE ANALYTICS EXPORT"],
        [],
        ["Analytics Period", selectedTimeRange],
        ["Department", selectedDepartment],
        [],
        ["Metric", "Value", "Unit"],
        [
          "Energy Consumed",
          analytics.totalEnergy,
          "kWh",
        ],
        [
          "Previous Period Energy",
          analytics.previousEnergy,
          "kWh",
        ],
        [
          "Energy Saved",
          analytics.energySaved,
          "kWh",
        ],
        [
          "CO2 Emissions",
          analytics.carbonEmitted,
          "kg",
        ],
        [
          "CO2 Saved",
          analytics.carbonSaved,
          "kg",
        ],
        [
          "Estimated Energy Cost",
          analytics.cost,
          "INR",
        ],
        [
          "Previous Energy Cost",
          analytics.previousCost,
          "INR",
        ],
        [
          "Energy Efficiency",
          analytics.efficiency,
          "%",
        ],
        [
          "Previous Efficiency",
          analytics.previousEfficiency,
          "%",
        ],
        [
          "Idle Computer Hours",
          analytics.idleHours,
          "hours",
        ],
        [
          "Active Computers",
          analytics.activeComputers,
          "computers",
        ],
        [
          "Total Computers",
          analytics.totalComputers,
          "computers",
        ],
        [
          "Eco Score",
          analytics.ecoScore,
          "/100",
        ],
        [],
        ["ENERGY CONSUMPTION TREND"],
        ["Day", "Energy", "Unit"],
        ...energyTrendData.map((item) => [
          item.name,
          item.energy,
          "kWh",
        ]),
        [],
        [
          "Generated On",
          new Date().toLocaleString("en-IN"),
        ],
      ];

      const csvContent = rows
        .map((row) =>
          row
            .map((value) => {
              const safeValue = String(
                value ?? ""
              ).replace(/"/g, '""');

              return `"${safeValue}"`;
            })
            .join(",")
        )
        .join("\n");

      const date = new Date()
        .toISOString()
        .slice(0, 10);

      downloadFile(
        csvContent,
        `GreenCompute_Analytics_${date}.csv`,
        "text/csv;charset=utf-8;"
      );
    } catch (error) {
      console.error("Export analytics failed:", error);
    }
  };

  // ==================================================
  // GENERATE REPORT
  // ==================================================

  const handleGenerateReport = () => {
    try {
      const selectedTimeRange =
        timeRangeOptions.find(
          (option) => option.value === timeRange
        )?.label || timeRange;

      const selectedDepartment =
        departmentOptions.find(
          (option) => option.value === department
        )?.label || department;

      const energyTrendTotal =
        energyTrendData.reduce(
          (total, item) =>
            total + (Number(item.energy) || 0),
          0
        );

      const energyTrendAverage =
        energyTrendData.length > 0
          ? energyTrendTotal /
            energyTrendData.length
          : 0;

      const report = `
============================================================
                 GREENCMPUTE ANALYTICS REPORT
============================================================

Generated On:
${new Date().toLocaleString("en-IN")}

Analytics Period:
${selectedTimeRange}

Department:
${selectedDepartment}


============================================================
                      ENERGY SUMMARY
============================================================

Energy Consumed:
${analytics.totalEnergy.toLocaleString("en-IN")} kWh

Previous Period Energy:
${analytics.previousEnergy.toLocaleString("en-IN")} kWh

Energy Saved:
${analytics.energySaved.toLocaleString("en-IN")} kWh

Energy Change:
${calculatedMetrics.energyChange.toFixed(1)}%


============================================================
                      CARBON SUMMARY
============================================================

CO2 Emissions:
${analytics.carbonEmitted.toLocaleString("en-IN")} kg

CO2 Saved:
${analytics.carbonSaved.toLocaleString("en-IN")} kg


============================================================
                         COST
============================================================

Estimated Energy Cost:
INR ${analytics.cost.toLocaleString("en-IN")}

Previous Energy Cost:
INR ${analytics.previousCost.toLocaleString("en-IN")}

Cost Change:
${calculatedMetrics.costChange.toFixed(1)}%


============================================================
                       EFFICIENCY
============================================================

Current Efficiency:
${analytics.efficiency}%

Previous Efficiency:
${analytics.previousEfficiency}%

Efficiency Improvement:
${calculatedMetrics.efficiencyChange.toFixed(1)}%


============================================================
                    COMPUTER USAGE
============================================================

Idle Computer Hours:
${analytics.idleHours}

Active Computers:
${analytics.activeComputers}

Total Computers:
${analytics.totalComputers}

Active Computer Percentage:
${
  analytics.totalComputers > 0
    ? Math.round(
        (analytics.activeComputers /
          analytics.totalComputers) *
          100
      )
    : 0
}%


============================================================
                    ECO PERFORMANCE
============================================================

Eco Score:
${analytics.ecoScore}/100

Performance:
Excellent


============================================================
              ENERGY CONSUMPTION TREND
============================================================

${energyTrendData
  .map(
    (item) =>
      `${item.name.padEnd(10)} ${item.energy} kWh`
  )
  .join("\n")}

------------------------------------------------------------

Total Trend Energy:
${energyTrendTotal.toFixed(1)} kWh

Average Daily Energy:
${energyTrendAverage.toFixed(1)} kWh


============================================================
                    INSIGHTS
============================================================

1. Energy consumption is trending lower compared
   with the previous monitoring period.

2. ${analytics.idleHours} idle computer hours were
   detected.

3. Overall energy efficiency improved by
   ${calculatedMetrics.efficiencyChange.toFixed(1)}%.

4. Current Eco Score is ${analytics.ecoScore}/100.


============================================================
                         STATUS
============================================================

GreenCompute Analytics Engine

Analytics system operational

============================================================

This report was generated by GreenCompute.
`;

      const date = new Date()
        .toISOString()
        .slice(0, 10);

      downloadFile(
        report,
        `GreenCompute_Report_${date}.txt`,
        "text/plain;charset=utf-8;"
      );
    } catch (error) {
      console.error(
        "Generate report failed:",
        error
      );
    }
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <section className="mb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <BarChart3 size={28} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Analytics
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Understand energy consumption, carbon
                  emissions, efficiency and sustainability
                  performance across your institution.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Badge
                    variant="success"
                    showDot
                    size="sm"
                  >
                    Live Analytics
                  </Badge>

                  <span className="text-xs text-slate-400">
                    Data updated continuously
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

              <Button
                variant="primary"
                size="sm"
                onClick={handleGenerateReport}
              >
                Generate Report
              </Button>

            </div>
          </div>
        </section>

        {/* ==================================================
            FILTER BAR
        ================================================== */}

        <section className="mb-6">
          <Card>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-2">
                <CalendarDays
                  size={18}
                  className="text-emerald-600 dark:text-emerald-400"
                />

                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Analytics Period
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">

                <Dropdown
                  options={timeRangeOptions}
                  value={timeRange}
                  onChange={setTimeRange}
                  placeholder="Time Range"
                  size="sm"
                />

                <Dropdown
                  options={departmentOptions}
                  value={department}
                  onChange={setDepartment}
                  placeholder="Department"
                  size="sm"
                />

                <span className="text-xs text-slate-400">
                  Showing{" "}
                  {timeRange === "7d"
                    ? "7 days"
                    : timeRange === "30d"
                    ? "30 days"
                    : timeRange === "90d"
                    ? "90 days"
                    : "12 months"}
                </span>

              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            KPI CARDS
        ================================================== */}

        {isLoading ? (
          <div className="mb-6 flex min-h-[180px] items-center justify-center rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            <LoadingSpinner
              size="lg"
              text="Updating analytics..."
            />

          </div>
        ) : (
          <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Energy */}

            <Card>
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Energy Consumed
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {analytics.totalEnergy.toLocaleString()}
                    <span className="ml-1 text-base font-medium text-slate-400">
                      kWh
                    </span>
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs">

                    <TrendingDown
                      size={14}
                      className="text-emerald-500"
                    />

                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {Math.abs(
                        calculatedMetrics.energyChange
                      ).toFixed(1)}
                      %
                    </span>

                    <span className="text-slate-400">
                      vs previous period
                    </span>

                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <Zap size={21} />
                </div>

              </div>
            </Card>

            {/* Energy Saved */}

            <Card>
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Energy Saved
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {analytics.energySaved}
                    <span className="ml-1 text-base font-medium text-slate-400">
                      kWh
                    </span>
                  </p>

                  <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Through smart optimization
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Leaf size={21} />
                </div>

              </div>
            </Card>

            {/* Carbon */}

            <Card>
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    CO₂ Emissions
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {analytics.carbonEmitted}
                    <span className="ml-1 text-base font-medium text-slate-400">
                      kg
                    </span>
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs">

                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {analytics.carbonSaved} kg saved
                    </span>

                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
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
                    {analytics.efficiency}%
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs">

                    <TrendingUp
                      size={14}
                      className="text-emerald-500"
                    />

                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      +{calculatedMetrics.efficiencyChange.toFixed(
                        1
                      )}
                      %
                    </span>

                    <span className="text-slate-400">
                      improvement
                    </span>

                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <Gauge size={21} />
                </div>

              </div>
            </Card>

          </section>
        )}

        {/* ==================================================
            MAIN ENERGY CHART
        ================================================== */}

        <section className="mb-6">
          <EnergyLineChart
            title="Energy Consumption Trend"
            subtitle="Daily electricity consumption across monitored computers"
            unit="kWh"
            height={360}
            data={energyTrendData}
          />
        </section>

        {/* ==================================================
            CARBON + PIE
        ================================================== */}

        <section className="mb-6 grid gap-6 xl:grid-cols-2">

          <CarbonAreaChart
            title="Carbon Emissions & Savings"
            subtitle="Compare emitted and avoided CO₂ over time"
            height={350}
          />

          <EnergyPieChart
            title="Energy Consumption by Lab"
            subtitle="Distribution of energy usage across laboratories"
            height={350}
          />

        </section>

        {/* ==================================================
            DEPARTMENT COMPARISON
        ================================================== */}

        <section className="mb-6">
          <DepartmentBarChart
            title="Department Energy Performance"
            subtitle="Energy consumption and savings by department"
            height={380}
          />
        </section>

        {/* ==================================================
            HEATMAP
        ================================================== */}

        <section className="mb-6">
          <EnergyHeatmap
            title="Energy Usage Heatmap"
            subtitle="Identify peak energy consumption periods"
          />
        </section>

        {/* ==================================================
            PERFORMANCE CARDS
        ================================================== */}

        <section className="mb-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Cost */}

          <Card>
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <span className="text-lg font-bold">
                  ₹
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Estimated Energy Cost
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  ₹
                  {analytics.cost.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  {Math.abs(
                    calculatedMetrics.costChange
                  ).toFixed(1)}
                  % lower
                </p>
              </div>

            </div>
          </Card>

          {/* Idle Hours */}

          <Card>
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <Activity size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Idle Computer Hours
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {analytics.idleHours}
                </p>

                <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                  Optimization opportunity
                </p>
              </div>

            </div>
          </Card>

          {/* Computers */}

          <Card>
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                <Activity size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Active Computers
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {analytics.activeComputers}

                  <span className="ml-1 text-sm font-medium text-slate-400">
                    / {analytics.totalComputers}
                  </span>
                </p>

                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  {Math.round(
                    (analytics.activeComputers /
                      analytics.totalComputers) *
                      100
                  )}
                  % active
                </p>
              </div>

            </div>
          </Card>

          {/* Eco Score */}

          <Card>
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Leaf size={19} />
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Eco Score
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {analytics.ecoScore}

                  <span className="text-sm font-medium text-slate-400">
                    /100
                  </span>
                </p>

                <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Excellent
                </p>
              </div>

            </div>
          </Card>

        </section>

        {/* ==================================================
            INSIGHTS
        ================================================== */}

        <section className="mb-6">
          <Card>

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Sustainability Insights
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Key observations from your energy data
                </p>
              </div>

              <Badge
                variant="success"
                size="sm"
              >
                AI Ready
              </Badge>

            </div>

            <div className="grid gap-4 md:grid-cols-3">

              {/* Insight 1 */}

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-500/5">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <TrendingDown size={18} />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Energy Reduction
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Energy consumption is trending lower
                  compared with the previous monitoring
                  period.
                </p>

              </div>

              {/* Insight 2 */}

              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/40 dark:bg-amber-500/5">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <Activity size={18} />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Idle Usage
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {analytics.idleHours} idle computer
                  hours were detected. Smart sleep can
                  reduce unnecessary consumption.
                </p>

              </div>

              {/* Insight 3 */}

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-500/5">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Zap size={18} />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Efficiency Improvement
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Overall energy efficiency improved by{" "}
                  {calculatedMetrics.efficiencyChange.toFixed(
                    1
                  )}
                  % during this period.
                </p>

              </div>

            </div>
          </Card>
        </section>

        {/* ==================================================
            AI ANALYTICS PREVIEW
        ================================================== */}

        <section className="mb-6">

          <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 dark:border-emerald-900/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 sm:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-3xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Leaf size={14} />
                  AI Sustainability Analytics
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Turn energy data into smarter
                  sustainability decisions.
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  GreenCompute will use historical energy
                  patterns, computer activity, lab schedules
                  and carbon data to forecast future usage
                  and recommend energy-saving actions.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                  <Badge
                    variant="success"
                    size="sm"
                  >
                    Energy Forecast
                  </Badge>

                  <Badge
                    variant="info"
                    size="sm"
                  >
                    Waste Detection
                  </Badge>

                  <Badge
                    variant="purple"
                    size="sm"
                  >
                    Carbon Forecast
                  </Badge>

                  <Badge
                    variant="cyan"
                    size="sm"
                  >
                    Smart Recommendations
                  </Badge>

                </div>
              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400">
                <BarChart3 size={38} />
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================
            FOOTER STATUS
        ================================================== */}

        <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">

          <span>
            GreenCompute Analytics Engine
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Analytics system operational
          </span>

        </div>

      </main>
    </div>
  );
};

export default Analytics;