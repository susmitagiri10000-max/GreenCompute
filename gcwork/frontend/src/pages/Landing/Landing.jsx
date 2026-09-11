import { Link } from "react-router-dom";

import {
  ArrowRight,
  Leaf,
  Monitor,
  Zap,
  Cloud,
  BarChart3,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Monitor,
      title: "Smart Lab Monitoring",
      description:
        "Monitor computers, CPU usage, RAM, uptime and activity across all computer labs in real time.",
    },
    {
      icon: Zap,
      title: "Energy Intelligence",
      description:
        "Track electricity consumption and identify computers that are wasting energy.",
    },
    {
      icon: Leaf,
      title: "Carbon Tracking",
      description:
        "Calculate CO₂ emissions and measure the environmental impact of your institution.",
    },
    {
      icon: Cpu,
      title: "Smart Shutdown",
      description:
        "Automatically put idle computers to sleep or shut them down according to smart rules.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Understand energy trends, savings, department performance and sustainability goals.",
    },
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description:
        "Get intelligent recommendations to reduce energy consumption and improve efficiency.",
    },
  ];

  const benefits = [
    "Reduce unnecessary computer energy consumption",
    "Automatically detect idle systems",
    "Track real-time energy and carbon emissions",
    "Generate sustainability reports",
    "Improve laboratory efficiency",
    "Make data-driven sustainability decisions",
  ];

  const stats = [
    {
      value: "30%",
      label: "Potential Energy Savings",
    },
    {
      value: "24/7",
      label: "Computer Monitoring",
    },
    {
      value: "AI",
      label: "Powered Insights",
    },
    {
      value: "100%",
      label: "Data Driven",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/20">
        
        {/* Background decorations */}
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />

        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-500/10" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Hero Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-800 dark:bg-slate-900/80 dark:text-emerald-400">
                <Leaf size={16} />
                AI-Powered Digital Sustainability
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Build a
                <span className="text-emerald-600 dark:text-emerald-400">
                  {" "}
                  Greener Campus
                </span>{" "}
                with Smarter Computing
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                GreenCompute helps educational institutions monitor
                computer energy usage, reduce carbon emissions,
                automate idle systems and make smarter sustainability
                decisions with AI.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                >
                  Explore Features
                </a>
              </div>

              {/* Trust points */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />
                  Real-time Monitoring
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />
                  AI Insights
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />
                  Carbon Tracking
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-emerald-400/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                {/* Fake dashboard header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-500">
                      GreenCompute
                    </p>

                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Sustainability Dashboard
                    </h3>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Leaf size={18} />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 py-4">

                  <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                    <p className="text-xs text-slate-500">
                      Energy Today
                    </p>

                    <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      245 kWh
                    </p>

                    <p className="mt-1 text-xs text-emerald-600">
                      ↓ 18% vs yesterday
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                    <p className="text-xs text-slate-500">
                      CO₂ Emitted
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
                      118 kg
                    </p>

                    <p className="mt-1 text-xs text-emerald-600">
                      ↓ 12.4 kg saved
                    </p>
                  </div>

                </div>

                {/* Chart */}
                <div className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">

                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        Energy Consumption
                      </p>

                      <p className="text-xs text-slate-500">
                        Last 7 days
                      </p>
                    </div>

                    <BarChart3
                      size={18}
                      className="text-emerald-500"
                    />
                  </div>

                  <div className="flex h-36 items-end gap-2">
                    {[55, 72, 48, 85, 62, 42, 30].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex flex-1 items-end"
                        >
                          <div
                            className="w-full rounded-t-md bg-emerald-500/80 transition hover:bg-emerald-600"
                            style={{
                              height: `${height}%`,
                            }}
                          />
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>

                </div>

                {/* Bottom status */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      42 computers online
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-emerald-600">
                    Eco Score 86
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-y border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-slate-100 px-4 py-4 text-center dark:border-slate-800 md:border-r last:border-r-0"
            >
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="bg-slate-50 py-20 dark:bg-slate-900/50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <Leaf size={17} />
                WHY GREENC OMPUTE
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Every computer can contribute to a greener campus.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
                Educational institutions operate hundreds or even
                thousands of computers every day. Computers that stay
                powered on while unused can consume significant
                amounts of electricity.
              </p>

              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                GreenCompute transforms this hidden energy waste into
                measurable sustainability data and actionable
                recommendations.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />

                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sustainability card */}
            <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl dark:border-emerald-900/50 dark:bg-slate-900">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Cloud size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                Measure. Reduce. Sustain.
              </h3>

              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                Turn computer energy consumption into clear
                sustainability metrics and continuously improve your
                institution's environmental performance.
              </p>

              <div className="mt-8 space-y-5">

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Energy Efficiency
                    </span>

                    <span className="font-semibold text-emerald-600">
                      86%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full w-[86%] rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                      Carbon Reduction
                    </span>

                    <span className="font-semibold text-emerald-600">
                      72%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full w-[72%] rounded-full bg-emerald-500" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="bg-white py-20 dark:bg-slate-950"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Powerful Platform
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Everything you need for digital sustainability
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              One platform to monitor, analyze and reduce the
              environmental impact of your computing infrastructure.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section
        id="impact"
        className="overflow-hidden bg-emerald-600 py-20 text-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-100">
                Sustainability Impact
              </span>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Turn energy savings into measurable environmental impact.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-emerald-50">
                GreenCompute helps institutions understand how their
                digital infrastructure affects energy consumption,
                carbon emissions and operational costs.
              </p>

              <Link
                to="/login"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Start Monitoring
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <Leaf size={24} />
                <p className="mt-4 text-3xl font-bold">
                  12.4 kg
                </p>
                <p className="mt-1 text-sm text-emerald-100">
                  CO₂ saved today
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <Zap size={24} />
                <p className="mt-4 text-3xl font-bold">
                  42 kWh
                </p>
                <p className="mt-1 text-sm text-emerald-100">
                  Energy saved
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <Monitor size={24} />
                <p className="mt-4 text-3xl font-bold">
                  128
                </p>
                <p className="mt-1 text-sm text-emerald-100">
                  Computers monitored
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <BarChart3 size={24} />
                <p className="mt-4 text-3xl font-bold">
                  86
                </p>
                <p className="mt-1 text-sm text-emerald-100">
                  Eco Score
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <ShieldCheck size={28} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Ready to make your campus greener?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Start monitoring your digital infrastructure and turn
            unused computing energy into measurable sustainability
            savings.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            Get Started with GreenCompute
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Landing;