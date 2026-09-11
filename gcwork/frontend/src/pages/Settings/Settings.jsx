import React, { useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  Clock3,
  Computer,
  Download,
  Globe,
  Leaf,
  Lock,
  MonitorCog,
  Moon,
  RefreshCw,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  Sun,
  Zap,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Dropdown from "../../components/ui/Dropdown";
import ProgressBar from "../../components/ui/ProgressBar";
import Button from "../../components/common/Button";

const Settings = () => {
  // ==================================================
  // STATE
  // ==================================================

  const [activeSection, setActiveSection] =
    useState("general");

  const [isSaving, setIsSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  // ==================================================
  // SETTINGS STATE
  // ==================================================

  const [settings, setSettings] = useState({
    // Profile
    name: "GreenCompute Admin",
    email: "admin@greencompute.edu",
    institution: "GreenCompute University",

    // General
    language: "en",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",

    // Monitoring
    monitoringEnabled: true,
    monitoringInterval: "60",
    collectHardware: true,
    collectPowerData: true,

    // Smart Shutdown
    smartShutdownEnabled: true,
    idleThreshold: "15",
    sleepAfter: "30",
    shutdownAfter: "120",
    scheduleBasedShutdown: true,
    holidayMode: true,
    examMode: false,

    // Energy
    defaultPower: "150",
    electricityRate: "8.5",
    emissionFactor: "0.708",

    // Notifications
    emailNotifications: true,
    idleAlerts: true,
    shutdownAlerts: true,
    weeklyReports: true,
    monthlyReports: true,
  });

  // ==================================================
  // NAVIGATION SECTIONS
  // ==================================================

  const sections = [
    {
      id: "general",
      label: "General",
      icon: SettingsIcon,
    },
    {
      id: "monitoring",
      label: "Monitoring",
      icon: MonitorCog,
    },
    {
      id: "shutdown",
      label: "Smart Shutdown",
      icon: Moon,
    },
    {
      id: "energy",
      label: "Energy & Carbon",
      icon: Zap,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      icon: ShieldCheck,
    },
  ];

  // ==================================================
  // DROPDOWN OPTIONS
  // ==================================================

  const languageOptions = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "bn",
      label: "বাংলা",
    },
    {
      value: "hi",
      label: "हिन्दी",
    },
  ];

  const timezoneOptions = [
    {
      value: "Asia/Kolkata",
      label: "India Standard Time (IST)",
    },
    {
      value: "Asia/Dhaka",
      label: "Bangladesh Standard Time",
    },
    {
      value: "Asia/Singapore",
      label: "Singapore Time",
    },
  ];

  const dateFormatOptions = [
    {
      value: "DD/MM/YYYY",
      label: "DD/MM/YYYY",
    },
    {
      value: "MM/DD/YYYY",
      label: "MM/DD/YYYY",
    },
    {
      value: "YYYY-MM-DD",
      label: "YYYY-MM-DD",
    },
  ];

  const monitoringIntervalOptions = [
    {
      value: "30",
      label: "Every 30 seconds",
    },
    {
      value: "60",
      label: "Every 1 minute",
    },
    {
      value: "120",
      label: "Every 2 minutes",
    },
    {
      value: "300",
      label: "Every 5 minutes",
    },
  ];

  const idleThresholdOptions = [
    {
      value: "5",
      label: "5 minutes",
    },
    {
      value: "10",
      label: "10 minutes",
    },
    {
      value: "15",
      label: "15 minutes",
    },
    {
      value: "20",
      label: "20 minutes",
    },
    {
      value: "30",
      label: "30 minutes",
    },
  ];

  const sleepOptions = [
    {
      value: "15",
      label: "15 minutes",
    },
    {
      value: "30",
      label: "30 minutes",
    },
    {
      value: "45",
      label: "45 minutes",
    },
    {
      value: "60",
      label: "60 minutes",
    },
  ];

  const shutdownOptions = [
    {
      value: "60",
      label: "1 hour",
    },
    {
      value: "120",
      label: "2 hours",
    },
    {
      value: "180",
      label: "3 hours",
    },
    {
      value: "240",
      label: "4 hours",
    },
  ];

  // ==================================================
  // HANDLERS
  // ==================================================

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setSaved(false);
  };

  // ==================================================
  // SAVE SETTINGS
  // ==================================================

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    setSaved(false);

    try {
      // Future backend integration:
      //
      // await settingsService.updateSettings(settings);

      await new Promise((resolve) =>
        setTimeout(resolve, 900)
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to save settings:",
        error
      );
    } finally {
      setIsSaving(false);
    }
  };

  // ==================================================
  // RESET
  // ==================================================

  const handleReset = () => {
    setSettings({
      name: "GreenCompute Admin",
      email: "admin@greencompute.edu",
      institution: "GreenCompute University",

      language: "en",
      timezone: "Asia/Kolkata",
      dateFormat: "DD/MM/YYYY",

      monitoringEnabled: true,
      monitoringInterval: "60",
      collectHardware: true,
      collectPowerData: true,

      smartShutdownEnabled: true,
      idleThreshold: "15",
      sleepAfter: "30",
      shutdownAfter: "120",
      scheduleBasedShutdown: true,
      holidayMode: true,
      examMode: false,

      defaultPower: "150",
      electricityRate: "8.5",
      emissionFactor: "0.708",

      emailNotifications: true,
      idleAlerts: true,
      shutdownAlerts: true,
      weeklyReports: true,
      monthlyReports: true,
    });

    setSaved(false);
  };

  // ==================================================
  // TOGGLE COMPONENT
  // ==================================================

  const Toggle = ({
    enabled,
    onChange,
    label,
    description,
  }) => {
    return (
      <div className="flex items-center justify-between gap-4 py-4">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {label}
          </p>

          {description && (
            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onChange}
          aria-pressed={enabled}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            enabled
              ? "bg-emerald-500"
              : "bg-slate-300 dark:bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
              enabled
                ? "left-6"
                : "left-1"
            }`}
          />
        </button>
      </div>
    );
  };

  // ==================================================
  // RENDER GENERAL
  // ==================================================

  const renderGeneral = () => (
    <div className="space-y-6">

      {/* Profile */}

      <Card>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Institution Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Basic information about your GreenCompute
            organization.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Administrator Name
            </label>

            <input
              type="text"
              value={settings.name}
              onChange={(e) =>
                handleChange(
                  "name",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                handleChange(
                  "email",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Institution Name
            </label>

            <input
              type="text"
              value={settings.institution}
              onChange={(e) =>
                handleChange(
                  "institution",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>
      </Card>

      {/* Localization */}

      <Card>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Localization
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Configure language, timezone and date
            preferences.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Dropdown
            label="Language"
            options={languageOptions}
            value={settings.language}
            onChange={(value) =>
              handleChange("language", value)
            }
          />

          <Dropdown
            label="Timezone"
            options={timezoneOptions}
            value={settings.timezone}
            onChange={(value) =>
              handleChange("timezone", value)
            }
          />

          <Dropdown
            label="Date Format"
            options={dateFormatOptions}
            value={settings.dateFormat}
            onChange={(value) =>
              handleChange("dateFormat", value)
            }
          />
        </div>
      </Card>
    </div>
  );

  // ==================================================
  // RENDER MONITORING
  // ==================================================

  const renderMonitoring = () => (
    <div className="space-y-6">

      <Card>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Computer Monitoring
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configure how GreenCompute collects
              computer telemetry.
            </p>
          </div>

          <MonitorCog
            size={22}
            className="text-emerald-500"
          />
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Toggle
            enabled={settings.monitoringEnabled}
            onChange={() =>
              handleToggle("monitoringEnabled")
            }
            label="Enable computer monitoring"
            description="Allow the monitoring agent to collect computer activity and performance data."
          />

          <Toggle
            enabled={settings.collectHardware}
            onChange={() =>
              handleToggle("collectHardware")
            }
            label="Collect hardware information"
            description="Collect CPU, memory, disk and hardware details from monitored computers."
          />

          <Toggle
            enabled={settings.collectPowerData}
            onChange={() =>
              handleToggle("collectPowerData")
            }
            label="Collect power usage data"
            description="Use collected system information to estimate energy consumption."
          />
        </div>

        <div className="mt-5 max-w-md">
          <Dropdown
            label="Monitoring Interval"
            options={monitoringIntervalOptions}
            value={settings.monitoringInterval}
            onChange={(value) =>
              handleChange(
                "monitoringInterval",
                value
              )
            }
          />
        </div>
      </Card>

      {/* Agent Status */}

      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Monitoring Agent
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Current agent connectivity overview.
            </p>
          </div>

          <Badge
            variant="success"
            showDot
          >
            Connected
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400">
              Active Agents
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              142
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400">
              Last Sync
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              42 sec
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-400">
              Health
            </p>

            <p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
              99.2%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  // ==================================================
  // RENDER SMART SHUTDOWN
  // ==================================================

  const renderShutdown = () => (
    <div className="space-y-6">

      <Card>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Smart Shutdown
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Automatically reduce energy waste from
              inactive computers.
            </p>
          </div>

          <Moon
            size={22}
            className="text-emerald-500"
          />
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Toggle
            enabled={settings.smartShutdownEnabled}
            onChange={() =>
              handleToggle(
                "smartShutdownEnabled"
              )
            }
            label="Enable Smart Shutdown"
            description="Allow GreenCompute to automatically manage idle computer power states."
          />

          <Toggle
            enabled={settings.scheduleBasedShutdown}
            onChange={() =>
              handleToggle(
                "scheduleBasedShutdown"
              )
            }
            label="Schedule-based shutdown"
            description="Use lab timetables and working hours to determine when computers can be powered down."
          />

          <Toggle
            enabled={settings.holidayMode}
            onChange={() =>
              handleToggle("holidayMode")
            }
            label="Holiday mode"
            description="Automatically apply power-saving rules during configured holidays."
          />

          <Toggle
            enabled={settings.examMode}
            onChange={() =>
              handleToggle("examMode")
            }
            label="Exam mode"
            description="Temporarily reduce automatic shutdown actions during examination periods."
          />
        </div>
      </Card>

      {/* Shutdown Rules */}

      <Card>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Power Management Rules
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Configure when inactive computers should
            change their power state.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <Dropdown
            label="Idle Detection Threshold"
            options={idleThresholdOptions}
            value={settings.idleThreshold}
            onChange={(value) =>
              handleChange(
                "idleThreshold",
                value
              )
            }
          />

          <Dropdown
            label="Sleep After"
            options={sleepOptions}
            value={settings.sleepAfter}
            onChange={(value) =>
              handleChange("sleepAfter", value)
            }
          />

          <Dropdown
            label="Shutdown After"
            options={shutdownOptions}
            value={settings.shutdownAfter}
            onChange={(value) =>
              handleChange(
                "shutdownAfter",
                value
              )
            }
          />
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-500/5">
          <div className="flex items-start gap-3">
            <Leaf
              size={19}
              className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
            />

            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Current optimization rule
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                Computers idle for{" "}
                {settings.idleThreshold} minutes can
                enter sleep mode after{" "}
                {settings.sleepAfter} minutes and
                shutdown after{" "}
                {settings.shutdownAfter} minutes,
                subject to timetable and holiday rules.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Estimated Savings */}

      <Card>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Estimated Impact
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Current smart shutdown performance.
            </p>
          </div>

          <Zap
            size={21}
            className="text-emerald-500"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-slate-400">
              Energy Saved
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              186.4 kWh
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              CO₂ Avoided
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              89.5 kg
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Idle Hours Reduced
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              428.5
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  // ==================================================
  // RENDER ENERGY
  // ==================================================

  const renderEnergy = () => (
    <div className="space-y-6">

      <Card>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Energy Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Configure energy estimation parameters.
            </p>
          </div>

          <Zap
            size={22}
            className="text-emerald-500"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Default Computer Power
            </label>

            <div className="relative">
              <input
                type="number"
                value={settings.defaultPower}
                onChange={(e) =>
                  handleChange(
                    "defaultPower",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-14 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                watts
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Electricity Rate
            </label>

            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={settings.electricityRate}
                onChange={(e) =>
                  handleChange(
                    "electricityRate",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-12 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                ₹/kWh
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Grid Emission Factor
            </label>

            <div className="relative">
              <input
                type="number"
                step="0.001"
                value={settings.emissionFactor}
                onChange={(e) =>
                  handleChange(
                    "emissionFactor",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-20 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                kg CO₂/kWh
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            Energy is estimated using computer power
            consumption and active hours. Carbon emissions
            are calculated using the configured grid
            emission factor.
          </p>
        </div>
      </Card>

      {/* Formula */}

      <Card>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Calculation Method
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            GreenCompute uses transparent calculations
            for sustainability metrics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-3 flex items-center gap-2">
              <Zap
                size={17}
                className="text-amber-500"
              />

              <h3 className="font-semibold text-slate-900 dark:text-white">
                Energy
              </h3>
            </div>

            <code className="block rounded-xl bg-slate-900 px-4 py-3 text-sm text-emerald-400">
              kWh = Power × Hours / 1000
            </code>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-3 flex items-center gap-2">
              <Leaf
                size={17}
                className="text-emerald-500"
              />

              <h3 className="font-semibold text-slate-900 dark:text-white">
                Carbon
              </h3>
            </div>

            <code className="block rounded-xl bg-slate-900 px-4 py-3 text-sm text-emerald-400">
              CO₂ = Energy × Emission Factor
            </code>
          </div>
        </div>
      </Card>
    </div>
  );

  // ==================================================
  // RENDER NOTIFICATIONS
  // ==================================================

  const renderNotifications = () => (
    <div className="space-y-6">

      <Card>
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Notification Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Choose which sustainability events you
              want to receive.
            </p>
          </div>

          <Bell
            size={22}
            className="text-emerald-500"
          />
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          <Toggle
            enabled={settings.emailNotifications}
            onChange={() =>
              handleToggle(
                "emailNotifications"
              )
            }
            label="Email notifications"
            description="Receive important GreenCompute alerts and updates by email."
          />

          <Toggle
            enabled={settings.idleAlerts}
            onChange={() =>
              handleToggle("idleAlerts")
            }
            label="Idle computer alerts"
            description="Get notified when unusual or excessive computer idle time is detected."
          />

          <Toggle
            enabled={settings.shutdownAlerts}
            onChange={() =>
              handleToggle("shutdownAlerts")
            }
            label="Smart shutdown alerts"
            description="Receive notifications when automatic power actions are performed."
          />

          <Toggle
            enabled={settings.weeklyReports}
            onChange={() =>
              handleToggle("weeklyReports")
            }
            label="Weekly sustainability reports"
            description="Receive a weekly summary of energy, carbon and savings."
          />

          <Toggle
            enabled={settings.monthlyReports}
            onChange={() =>
              handleToggle("monthlyReports")
            }
            label="Monthly sustainability reports"
            description="Receive a detailed monthly sustainability report."
          />
        </div>
      </Card>

      {/* Notification Preview */}

      <Card>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notification Preview
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Example of a GreenCompute sustainability
            alert.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-500/5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Leaf size={19} />
            </div>

            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Energy saving milestone reached
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Your campus has saved 186.4 kWh this
                month through smart power management.
              </p>

              <p className="mt-2 text-xs text-slate-400">
                GreenCompute • Just now
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  // ==================================================
  // RENDER SECURITY
  // ==================================================

  const renderSecurity = () => (
    <div className="space-y-6">

      <Card>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Account Security
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage account security and authentication.
            </p>
          </div>

          <Lock
            size={22}
            className="text-emerald-500"
          />
        </div>

        <div className="space-y-4">

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Password
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Last changed recently
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                console.log(
                  "Change password clicked"
                )
              }
            >
              Change Password
            </Button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 text-emerald-500"
              />

              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  JWT Authentication
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Secure token-based authentication is
                  enabled for your account.
                </p>
              </div>
            </div>

            <Badge
              variant="success"
              showDot
            >
              Enabled
            </Badge>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                Active Sessions
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                1 active session detected.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                console.log(
                  "Sign out sessions clicked"
                )
              }
            >
              Sign Out Other Sessions
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={21}
            className="mt-0.5 text-emerald-500"
          />

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Security Notice
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Never share your GreenCompute password,
              JWT tokens or API credentials with anyone.
              Production authentication will be handled
              securely by the FastAPI backend.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  // ==================================================
  // SELECT ACTIVE CONTENT
  // ==================================================

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return renderGeneral();

      case "monitoring":
        return renderMonitoring();

      case "shutdown":
        return renderShutdown();

      case "energy":
        return renderEnergy();

      case "notifications":
        return renderNotifications();

      case "security":
        return renderSecurity();

      default:
        return renderGeneral();
    }
  };

  // ==================================================
  // MAIN RENDER
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
                <SettingsIcon size={28} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Settings
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Configure GreenCompute monitoring,
                  energy optimization, smart shutdown and
                  notification preferences.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Badge
                    variant="success"
                    showDot
                    size="sm"
                  >
                    System Configured
                  </Badge>

                  <span className="text-xs text-slate-400">
                    Changes are saved securely
                  </span>
                </div>
              </div>
            </div>

            {/* Header Actions */}

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={RefreshCw}
                onClick={handleReset}
              >
                Reset
              </Button>

              <Button
                variant="primary"
                size="sm"
                icon={Save}
                loading={isSaving}
                disabled={isSaving}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </section>

        {/* ==================================================
            SAVED MESSAGE
        ================================================== */}

        {saved && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-500/5 dark:text-emerald-400">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
              <Check size={15} />
            </div>

            <div>
              <p className="font-semibold">
                Settings saved successfully
              </p>

              <p className="text-xs opacity-80">
                Your GreenCompute configuration has been
                updated.
              </p>
            </div>
          </div>
        )}

        {/* ==================================================
            SETTINGS LAYOUT
        ================================================== */}

        <section className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">

          {/* ==================================================
              SIDEBAR
          ================================================== */}

          <aside>
            <Card padding="sm">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;

                  const isActive =
                    activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() =>
                        setActiveSection(
                          section.id
                        )
                      }
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                    >
                      <Icon size={17} />

                      <span>
                        {section.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Sustainability card */}

              <div className="mt-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-4 dark:from-emerald-500/10 dark:to-teal-500/5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Leaf size={17} />
                </div>

                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Eco Score
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Your current sustainability score.
                </p>

                <div className="mt-3">
                  <ProgressBar
                    value={88}
                    max={100}
                    showPercentage
                    variant="success"
                    size="sm"
                  />
                </div>
              </div>
            </Card>
          </aside>

          {/* ==================================================
              CONTENT
          ================================================== */}

          <div className="min-w-0">
            {renderContent()}
          </div>
        </section>

        {/* ==================================================
            QUICK CONFIGURATION
        ================================================== */}

        <section className="mt-6">
          <Card>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <Computer size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Monitoring
                  </p>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {settings.monitoringEnabled
                      ? "Enabled"
                      : "Disabled"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Moon size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Smart Shutdown
                  </p>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {settings.smartShutdownEnabled
                      ? "Enabled"
                      : "Disabled"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <Clock3 size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Idle Threshold
                  </p>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {settings.idleThreshold} min
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                  <Globe size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Timezone
                  </p>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    IST
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ==================================================
            FOOTER STATUS
        ================================================== */}

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <span>
            GreenCompute Configuration Center
          </span>

          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Configuration system operational
          </span>
        </div>
      </main>
    </div>
  );
};

export default Settings;