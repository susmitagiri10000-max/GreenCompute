import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, Cpu, MemoryStick, RefreshCw, Search, Wifi, WifiOff, Zap } from "lucide-react";
import api from "../../services/api";

const format = (value, digits = 1) => Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: digits });

const Computers = () => {
  const [computers, setComputers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [labFilter, setLabFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async (showSpinner = true) => {
    if (showSpinner) setIsLoading(true);
    setError("");
    try {
      const [computerData, labData] = await Promise.all([
        api.get("/computers/"),
        api.get("/labs/"),
      ]);
      setComputers(Array.isArray(computerData) ? computerData : []);
      setLabs(Array.isArray(labData) ? labData : []);
    } catch (err) {
      setError(err.message || "Unable to load live computer telemetry.");
    } finally {
      if (showSpinner) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(true);
    const timer = setInterval(() => loadData(false), 10000);
    return () => clearInterval(timer);
  }, [loadData]);

  const labMap = useMemo(
    () => Object.fromEntries(labs.map((lab) => [lab.id, lab])),
    [labs]
  );

  const enriched = useMemo(
    () => computers.map((computer) => ({
      ...computer,
      labName: labMap[computer.lab_id]?.name || `Lab #${computer.lab_id}`,
      department: labMap[computer.lab_id]?.department_name || "—",
    })),
    [computers, labMap]
  );

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return enriched
      .filter((computer) => {
        const matchesSearch = !q || [computer.name, computer.hostname, computer.ip_address, computer.labName]
          .some((value) => String(value || "").toLowerCase().includes(q));
        const matchesStatus = statusFilter === "all" || computer.status === statusFilter;
        const matchesLab = labFilter === "all" || String(computer.lab_id) === labFilter;
        return matchesSearch && matchesStatus && matchesLab;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [enriched, searchTerm, statusFilter, labFilter]);

  const stats = useMemo(() => ({
    total: enriched.length,
    online: enriched.filter((x) => x.status === "online").length,
    idle: enriched.filter((x) => x.status === "idle").length,
    offline: enriched.filter((x) => x.status === "offline").length,
    avgCpu: enriched.length ? enriched.reduce((s, x) => s + Number(x.cpu_usage || 0), 0) / enriched.length : 0,
  }), [enriched]);

  const refresh = async () => {
    setIsRefreshing(true);
    await loadData(false);
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Computers</h1>
          <p className="mt-1 text-sm text-slate-500">Live telemetry from computers running the GreenCompute monitoring agent.</p>
        </div>
        <button onClick={refresh} disabled={isRefreshing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60">
          <RefreshCw size={17} className={isRefreshing ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["Total", stats.total, "text-slate-800"],
          ["Online", stats.online, "text-emerald-600"],
          ["Idle", stats.idle, "text-amber-600"],
          ["Offline", stats.offline, "text-slate-500"],
        ].map(([label, value, color]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search computer or hostname..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:bg-white" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
            <option value="all">All Status</option><option value="online">Online</option><option value="idle">Idle</option><option value="offline">Offline</option>
          </select>
          <select value={labFilter} onChange={(e) => setLabFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
            <option value="all">All Labs</option>
            {labs.map((lab) => <option key={lab.id} value={String(lab.id)}>{lab.name}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">Loading live telemetry...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">No computers match the current filters.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((computer) => {
            const online = computer.status !== "offline";
            return (
              <div key={computer.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-slate-800">{computer.name}</h2>
                    <p className="mt-1 text-xs text-slate-500">{computer.hostname}</p>
                    <p className="mt-1 text-xs text-slate-400">{computer.labName}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${online ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {online ? <Wifi size={13} /> : <WifiOff size={13} />} {computer.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Metric icon={<Cpu size={16} />} label="CPU" value={`${format(computer.cpu_usage)}%`} />
                  <Metric icon={<MemoryStick size={16} />} label="RAM" value={`${format(computer.memory_usage)}%`} />
                  <Metric icon={<Zap size={16} />} label="Power est." value={`${format(computer.power_consumption)} W`} />
                  <Metric icon={<Activity size={16} />} label="Last seen" value={computer.last_seen_at ? new Date(`${computer.last_seen_at}Z`).toLocaleTimeString() : "—"} />
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
                  <div className="flex justify-between"><span>IP</span><span className="font-medium text-slate-700">{computer.ip_address || "—"}</span></div>
                  <div className="mt-1 flex justify-between"><span>Department</span><span className="font-medium text-slate-700">{computer.department}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Energy note:</strong> CPU/RAM values are live machine telemetry. Power and energy are estimated from the configured machine power model; a physical power meter is needed for wall-socket measurement.
      </div>
    </div>
  );
};

const Metric = ({ icon, label, value }) => (
  <div className="rounded-xl border border-slate-100 bg-white p-3">
    <div className="flex items-center gap-2 text-slate-400">{icon}<span className="text-xs">{label}</span></div>
    <p className="mt-1 text-sm font-bold text-slate-700">{value}</p>
  </div>
);

export default Computers;
