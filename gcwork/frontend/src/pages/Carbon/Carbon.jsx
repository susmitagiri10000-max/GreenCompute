import { useMemo, useState } from "react";
import {
  ArrowDown,
  BarChart3,
  CalendarDays,
  Download,
  Leaf,
  RefreshCw,
  Sprout,
  Target,
  TreePine,
  TrendingDown,
  Zap,
} from "lucide-react";

import CarbonAreaChart from "../../components/charts/CarbonAreaChart";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Dropdown from "../../components/ui/Dropdown";
import ProgressBar from "../../components/ui/ProgressBar";

import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Carbon = () => {
  // ==================================================
  // STATE
  // ==================================================

  const [timeRange, setTimeRange] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ==================================================
  // TIME RANGE OPTIONS
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

  // ==================================================
  // DEMO CARBON DATA
  // Backend will replace this later.
  // ==================================================

  const carbonData = {
    emittedToday: 78.4,
    emittedPeriod: 599.3,

    carbonSaved: 89.5,

    monthlyTarget: 750,
    monthlySaved: 186.4,

    treesEquivalent: 4.1,

    moneySaved: 1678,

    reductionPercentage: 13.7,

    ecoScore: 88,

    previousPeriod: 694.8,

    yearlyReduction: 1248.6,
  };

  // ==================================================
  // CALCULATIONS
  // ==================================================

  const calculations = useMemo(() => {
    const emissionChange =
      ((carbonData.emittedPeriod -
        carbonData.previousPeriod) /
        carbonData.previousPeriod) *
      100;

    const targetProgress =
      (carbonData.monthlySaved /
        carbonData.monthlyTarget) *
      100;

    const remainingTarget = Math.max(
      carbonData.monthlyTarget -
        carbonData.monthlySaved,
      0
    );

    return {
      emissionChange,
      targetProgress: Math.min(targetProgress, 100),
      remainingTarget,
    };
  }, [carbonData]);

  // ==================================================
  // REFRESH
  // ==================================================

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setIsLoading(true);

    try {
      // Future backend integration:
      //
      // await carbonService.getCarbonData({
      //   timeRange,
      // });

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );
    } catch (error) {
      console.error(
        "Failed to refresh carbon data:",
        error
      );
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  };

  // ==================================================
  // EXPORT
  // ==================================================

  const handleExport = () => {
    console.log("Export carbon report");
  };

  // ==================================================
  // GENERATE REPORT
  // ==================================================

  const handleGenerateReport = () => {
    console.log("Generate carbon report");
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

        {/* ==================================================
            HEADER
        ================================================== */}

        <section className="mb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Leaf size={28} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Carbon Tracker
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Track CO₂ emissions, carbon savings,
                  environmental impact and sustainability
                  progress across your institution.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Badge
                    variant="success"
                    showDot
                    size="sm"
                  >
                    Carbon Monitoring Active
                  </Badge>

                  <span className="text-xs text-slate-400">
                    Real-time sustainability tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}

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
            FILTER
        ================================================== */}

        <section className="mb-6">
          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-2">
                <CalendarDays
                  size={18}
                  className="text-emerald-600 dark:text-emerald-400"
                />

                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Tracking Period
                </span>
              </div>

              <Dropdown
                options={timeRangeOptions}
                value={timeRange}
                onChange={setTimeRange}
                placeholder="Select period"
                size="sm"
              />
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
              text="Updating carbon data..."
            />
          </div>
        ) : (
          <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* CO2 Emitted */}

            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    CO₂ Emitted
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {carbonData.emittedPeriod}
                    <span className="ml-1 text-base font-medium text-slate-400">
                      kg
                    </span>
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs">
                    <TrendingDown
                      size={14}
                      className="text-emerald-500"
                    />

                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {Math.abs(
                        calculations.emissionChange
                      ).toFixed(1)}
                      %
                    </span>

                    <span className="text-slate-400">
                      vs previous period
                    </span>
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <BarChart3 size={21} />
                </div>
              </div>
            </Card>

            {/* CO2 Saved */}

            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    CO₂ Saved
                  </p>

                  <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {carbonData.carbonSaved}
                    <span className="ml-1 text-base font-medium text-slate-400">
                      kg
                    </span>
                  </p>

                  <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Through GreenCompute
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <TrendingDown size={21} />
                </div>
              </div>
            </Card>

            {/* Trees */}

            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Trees Equivalent
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {carbonData.treesEquivalent}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Approximate annual absorption
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <TreePine size={21} />
                </div>
              </div>
            </Card>

            {/* Eco Score */}

            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Eco Score
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {carbonData.ecoScore}
                    <span className="text-base font-medium text-slate-400">
                      /100
                    </span>
                  </p>

                  <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Excellent performance
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Sprout size={21} />
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* ==================================================
            CARBON TREND
        ================================================== */}

        <section className="mb-6">
          <CarbonAreaChart
            title="Carbon Emissions & Savings"
            subtitle="Track emitted and avoided CO₂ over the selected period"
            height={380}
          />
        </section>

        {/* ==================================================
            IMPACT + GOAL
        ================================================== */}

        <section className="mb-6 grid gap-6 xl:grid-cols-2">

          {/* Environmental Impact */}

          <Card>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Environmental Impact
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Your estimated positive environmental
                  contribution.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Leaf size={20} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  CO₂ Avoided
                </p>

                <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {carbonData.carbonSaved} kg
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <ArrowDown size={13} />
                  Reduced emissions
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tree Equivalent
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {carbonData.treesEquivalent}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <TreePine size={13} />
                  Trees
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Energy Saved
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  186.4 kWh
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <Zap size={13} />
                  Smart optimization
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Money Saved
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  ₹
                  {carbonData.moneySaved.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <ArrowDown size={13} />
                  Estimated savings
                </div>
              </div>
            </div>
          </Card>

          {/* Carbon Goal */}

          <Card>
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Carbon Reduction Goal
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Monthly carbon reduction target.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Target size={20} />
              </div>
            </div>

            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {carbonData.monthlySaved}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    kg
                  </span>
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  carbon reduced
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {carbonData.monthlyTarget} kg
                </p>

                <p className="text-xs text-slate-400">
                  monthly target
                </p>
              </div>
            </div>

            <ProgressBar
              value={calculations.targetProgress}
              max={100}
              label="Goal Progress"
              showPercentage
              variant="success"
              size="lg"
              animated
            />

            <div className="mt-5 flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3 dark:bg-emerald-500/5">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Remaining to target
              </span>

              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {calculations.remainingTarget.toFixed(1)} kg
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Target size={14} />

              <span>
                Keep optimizing idle computers to reach
                your target faster.
              </span>
            </div>
          </Card>
        </section>

        {/* ==================================================
            CARBON REDUCTION STATISTICS
        ================================================== */}

        <section className="mb-6 grid gap-6 md:grid-cols-3">

          {/* Reduction */}

          <Card>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <TrendingDown size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Emission Reduction
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {carbonData.reductionPercentage}%
                </p>

                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  Compared with baseline
                </p>
              </div>
            </div>
          </Card>

          {/* Yearly */}

          <Card>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                <Leaf size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Yearly CO₂ Reduction
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {carbonData.yearlyReduction}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    kg
                  </span>
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Estimated annual impact
                </p>
              </div>
            </div>
          </Card>

          {/* Savings */}

          <Card>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <ArrowDown size={22} />
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Financial Savings
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  ₹
                  {carbonData.moneySaved.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  From reduced energy usage
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            HOW GREENC OMPUTE REDUCES CARBON
        ================================================== */}

        <section className="mb-6">
          <Card>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                How GreenCompute Reduces Carbon
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Smart energy management creates measurable
                environmental impact.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">

              {/* Step 1 */}

              <div className="relative rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  01
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Monitor
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  GreenCompute monitors computer activity,
                  energy usage and idle periods in real time.
                </p>
              </div>

              {/* Step 2 */}

              <div className="relative rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                  02
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Optimize
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Idle computers can automatically enter
                  sleep mode according to configured rules.
                </p>
              </div>

              {/* Step 3 */}

              <div className="relative rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  03
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Reduce Carbon
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Reduced electricity consumption results in
                  lower estimated carbon emissions.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            AI CARBON INSIGHT
        ================================================== */}

        <section className="mb-6">
          <div className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 dark:border-emerald-900/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 sm:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Sprout size={14} />
                  AI Carbon Intelligence
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Make your campus greener with
                  data-driven decisions.
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Future GreenCompute AI models will forecast
                  carbon emissions, identify high-impact
                  optimization opportunities and recommend
                  actions to improve your sustainability score.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge
                    variant="success"
                    size="sm"
                  >
                    Carbon Forecast
                  </Badge>

                  <Badge
                    variant="info"
                    size="sm"
                  >
                    Emission Detection
                  </Badge>

                  <Badge
                    variant="purple"
                    size="sm"
                  >
                    AI Recommendations
                  </Badge>
                </div>
              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400">
                <TreePine size={40} />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            FOOTER STATUS
        ================================================== */}

        <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <span>
            GreenCompute Carbon Intelligence Engine
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Carbon monitoring operational
          </span>
        </div>
      </main>
    </div>
  );
};

export default Carbon;