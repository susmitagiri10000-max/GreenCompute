import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Activity,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Edit3,
  Loader2,
  MapPin,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  Server,
  Trash2,
  Users,
  X,
  Zap,
  AlertCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| API Configuration
|--------------------------------------------------------------------------
*/

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

/*
|--------------------------------------------------------------------------
| API Helpers
|--------------------------------------------------------------------------
*/

/*
 * IMPORTANT:
 * AuthProvider uses:
 *
 * localStorage.setItem("greencompute_token", accessToken)
 *
 * So Labs.jsx must use the same key.
 */

const getToken = () => {
  return localStorage.getItem("greencompute_token");
};

/*
 * API request helper
 *
 * Protected requests send:
 *
 * Authorization: Bearer <token>
 */

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    Accept: "application/json",

    ...(options.body
      ? {
          "Content-Type": "application/json",
        }
      : {}),

    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const contentType =
    response.headers.get("content-type") || "";

  let data;

  if (contentType.includes("application/json")) {
    data = await response
      .json()
      .catch(() => null);
  } else {
    data = await response
      .text()
      .catch(() => "");
  }

  if (!response.ok) {
    let message =
      `Request failed with status ${response.status}`;

    if (
      typeof data === "object" &&
      data?.detail
    ) {
      message =
        typeof data.detail === "string"
          ? data.detail
          : JSON.stringify(data.detail);
    } else if (
      typeof data === "string" &&
      data.trim()
    ) {
      message = data;
    }

    throw new Error(message);
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Main Component
|--------------------------------------------------------------------------
*/

const Labs = () => {
  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [labs, setLabs] = useState([]);
  const [computers, setComputers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const [showModal, setShowModal] = useState(false);
  const [editingLab, setEditingLab] = useState(null);
  const [deletingLabId, setDeletingLabId] =
    useState(null);

  const [formLoading, setFormLoading] =
    useState(false);

  const [formError, setFormError] =
    useState("");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department_id: "",
    location: "",
    capacity: 0,
  });

  /*
  |--------------------------------------------------------------------------
  | Load Labs
  |--------------------------------------------------------------------------
  */

  const fetchLabs = useCallback(async () => {
    try {
      setError("");

      const data = await apiRequest("/labs/");

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid labs response from server."
        );
      }

      setLabs(data);
    } catch (err) {
      console.error(
        "Failed to load labs:",
        err
      );

      setError(
        err?.message ||
          "Unable to load labs. Please make sure the backend is running."
      );
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Load Computers
  |--------------------------------------------------------------------------
  */

  const fetchComputers =
    useCallback(async () => {
      try {
        const data =
          await apiRequest("/computers/");

        if (Array.isArray(data)) {
          setComputers(data);
        } else {
          setComputers([]);
        }
      } catch (err) {
        console.warn(
          "Could not load computers:",
          err
        );

        setComputers([]);
      }
    }, []);

  /*
  |--------------------------------------------------------------------------
  | Load Everything
  |--------------------------------------------------------------------------
  */

  const loadData = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        await Promise.all([
          fetchLabs(),
          fetchComputers(),
        ]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [fetchLabs, fetchComputers]
  );

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  /*
  |--------------------------------------------------------------------------
  | Refresh
  |--------------------------------------------------------------------------
  */

  const handleRefresh = async () => {
    await loadData(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Computer Statistics
  |--------------------------------------------------------------------------
  */

  const getLabStats = useCallback(
    (labId) => {
      const labComputers =
        computers.filter(
          (computer) =>
            Number(computer.lab_id) ===
            Number(labId)
        );

      const totalComputers =
        labComputers.length;

      const onlineComputers =
        labComputers.filter(
          (computer) =>
            computer.status === "online" ||
            computer.status === "idle"
        ).length;

      const idleComputers =
        labComputers.filter(
          (computer) =>
            computer.status === "idle"
        ).length;

      const offlineComputers =
        labComputers.filter(
          (computer) =>
            computer.status === "offline"
        ).length;

      const activeComputers =
        labComputers.filter(
          (computer) =>
            computer.status === "online"
        ).length;

      const totalPower =
        labComputers.reduce(
          (sum, computer) =>
            sum +
            Number(
              computer.power_consumption || 0
            ),
          0
        );

      const averageCpu =
        totalComputers > 0
          ? labComputers.reduce(
              (sum, computer) =>
                sum +
                Number(
                  computer.cpu_usage || 0
                ),
              0
            ) / totalComputers
          : 0;

      const averageMemory =
        totalComputers > 0
          ? labComputers.reduce(
              (sum, computer) =>
                sum +
                Number(
                  computer.memory_usage || 0
                ),
              0
            ) / totalComputers
          : 0;

      return {
        totalComputers,
        activeComputers,
        onlineComputers,
        idleComputers,
        offlineComputers,
        totalPower,
        averageCpu,
        averageMemory,
      };
    },
    [computers]
  );

  /*
  |--------------------------------------------------------------------------
  | Add Lab
  |--------------------------------------------------------------------------
  */

  const openAddModal = () => {
    setEditingLab(null);

    setFormData({
      name: "",
      code: "",
      department_id: "",
      location: "",
      capacity: 0,
    });

    setFormError("");
    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Edit Lab
  |--------------------------------------------------------------------------
  */

  const openEditModal = (lab) => {
    setEditingLab(lab);

    setFormData({
      name: lab.name || "",
      code: lab.code || "",

      department_id:
        lab.department_id !== null &&
        lab.department_id !== undefined
          ? String(lab.department_id)
          : "",

      location: lab.location || "",

      capacity:
        lab.capacity !== null &&
        lab.capacity !== undefined
          ? lab.capacity
          : 0,
    });

    setFormError("");
    setShowModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Close Modal
  |--------------------------------------------------------------------------
  */

  const closeModal = () => {
    if (formLoading) return;

    setShowModal(false);
    setEditingLab(null);
    setFormError("");
  };

  /*
  |--------------------------------------------------------------------------
  | Form Change
  |--------------------------------------------------------------------------
  */

  const handleInputChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Save Lab
  |--------------------------------------------------------------------------
  */

  const handleSaveLab = async (event) => {
    event.preventDefault();

    setFormError("");

    const name =
      formData.name.trim();

    const code =
      formData.code.trim();

    const departmentId =
      Number(formData.department_id);

    const capacity =
      Number(formData.capacity);

    if (!name) {
      setFormError(
        "Lab name is required."
      );
      return;
    }

    if (!code) {
      setFormError(
        "Lab code is required."
      );
      return;
    }

    if (
      !formData.department_id ||
      !Number.isInteger(departmentId)
    ) {
      setFormError(
        "Please enter a valid department ID."
      );
      return;
    }

    if (
      !Number.isFinite(capacity) ||
      capacity < 0
    ) {
      setFormError(
        "Capacity must be 0 or greater."
      );
      return;
    }

    const payload = {
      name,
      code,
      department_id: departmentId,
      location:
        formData.location.trim() || null,
      capacity,
    };

    try {
      setFormLoading(true);

      if (editingLab) {
        const updatedLab =
          await apiRequest(
            `/labs/${editingLab.id}`,
            {
              method: "PUT",
              body: JSON.stringify(payload),
            }
          );

        setLabs((previous) =>
          previous.map((lab) =>
            Number(lab.id) ===
            Number(editingLab.id)
              ? updatedLab
              : lab
          )
        );
      } else {
        const createdLab =
          await apiRequest(
            "/labs/",
            {
              method: "POST",
              body: JSON.stringify(payload),
            }
          );

        setLabs((previous) => [
          createdLab,
          ...previous,
        ]);
      }

      closeModal();
    } catch (err) {
      console.error(
        "Failed to save lab:",
        err
      );

      setFormError(
        err?.message ||
          "Unable to save lab. Please check the backend."
      );
    } finally {
      setFormLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Lab
  |--------------------------------------------------------------------------
  */

  const handleDeleteLab = async (lab) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${lab.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingLabId(lab.id);
      setError("");

      await apiRequest(
        `/labs/${lab.id}`,
        {
          method: "DELETE",
        }
      );

      setLabs((previous) =>
        previous.filter(
          (item) =>
            Number(item.id) !==
            Number(lab.id)
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete lab:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete lab."
      );
    } finally {
      setDeletingLabId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | View Lab
  |--------------------------------------------------------------------------
  */

  const handleViewLab = (lab) => {
    navigate(`/labs/${lab.id}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Search + Filter
  |--------------------------------------------------------------------------
  */

  const filteredLabs = useMemo(() => {
    const search =
      searchTerm
        .trim()
        .toLowerCase();

    return labs.filter((lab) => {
      const matchesSearch =
        !search ||
        String(lab.name || "")
          .toLowerCase()
          .includes(search) ||
        String(lab.code || "")
          .toLowerCase()
          .includes(search) ||
        String(lab.location || "")
          .toLowerCase()
          .includes(search) ||
        String(
          lab.department_id || ""
        ).includes(search);

      const stats =
        getLabStats(lab.id);

      let matchesStatus = true;

      if (statusFilter === "active") {
        matchesStatus =
          stats.onlineComputers > 0;
      }

      if (statusFilter === "idle") {
        matchesStatus =
          stats.idleComputers > 0 &&
          stats.onlineComputers === 0;
      }

      if (statusFilter === "offline") {
        matchesStatus =
          stats.totalComputers === 0 ||
          stats.offlineComputers > 0;
      }

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    labs,
    searchTerm,
    statusFilter,
    getLabStats,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Overall Statistics
  |--------------------------------------------------------------------------
  */

  const overallStats = useMemo(() => {
    const totalLabs =
      labs.length;

    const totalCapacity =
      labs.reduce(
        (sum, lab) =>
          sum +
          Number(
            lab.capacity || 0
          ),
        0
      );

    const totalComputers =
      computers.length;

    const onlineComputers =
      computers.filter(
        (computer) =>
          computer.status ===
            "online" ||
          computer.status ===
            "idle"
      ).length;

    const offlineComputers =
      computers.filter(
        (computer) =>
          computer.status ===
          "offline"
      ).length;

    const totalPower =
      computers.reduce(
        (sum, computer) =>
          sum +
          Number(
            computer.power_consumption ||
              0
          ),
        0
      );

    return {
      totalLabs,
      totalCapacity,
      totalComputers,
      onlineComputers,
      offlineComputers,
      totalPower,
    };
  }, [labs, computers]);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />

          <p className="text-slate-600 font-medium">
            Loading labs...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-emerald-600" />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Labs
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Manage and monitor your laboratories
                </p>
              </div>

            </div>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition"
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  refreshing
                    ? "animate-spin"
                    : ""
                }`}
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Lab
            </button>

          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />

            <div className="flex-1">
              <p className="font-semibold">
                Unable to load data
              </p>

              <p className="text-sm mt-1">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        )}

        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

          <StatCard
            icon={Building2}
            label="Total Labs"
            value={
              overallStats.totalLabs
            }
          />

          <StatCard
            icon={Users}
            label="Total Capacity"
            value={
              overallStats.totalCapacity
            }
          />

          <StatCard
            icon={Monitor}
            label="Computers"
            value={
              overallStats.totalComputers
            }
          />

          <StatCard
            icon={CheckCircle2}
            label="Online"
            value={
              overallStats.onlineComputers
            }
          />

          <StatCard
            icon={Zap}
            label="Live Power"
            value={`${overallStats.totalPower.toFixed(
              1
            )} W`}
          />

        </div>

        {/* SEARCH / FILTERS */}

        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search labs by name, code, location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />

            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">
                All Labs
              </option>

              <option value="active">
                With Online Computers
              </option>

              <option value="idle">
                Idle
              </option>

              <option value="offline">
                Offline / No Computers
              </option>
            </select>

            <div className="flex border border-slate-200 rounded-lg overflow-hidden">

              <button
                type="button"
                onClick={() =>
                  setViewMode("grid")
                }
                className={`px-4 py-2.5 text-sm ${
                  viewMode === "grid"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                Grid
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewMode("list")
                }
                className={`px-4 py-2.5 text-sm ${
                  viewMode === "list"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                List
              </button>

            </div>

          </div>
        </div>

        {/* RESULT COUNT */}

        <div className="flex items-center justify-between mb-4">

          <p className="text-sm text-slate-500">
            Showing{" "}

            <span className="font-semibold text-slate-700">
              {filteredLabs.length}
            </span>{" "}

            of{" "}

            <span className="font-semibold text-slate-700">
              {labs.length}
            </span>{" "}

            labs
          </p>

        </div>

        {/* EMPTY STATE / LAB LIST */}

        {filteredLabs.length === 0 ? (

          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

            <Building2 className="w-12 h-12 mx-auto text-slate-300" />

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No labs found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {labs.length === 0
                ? "There are no labs in the database yet."
                : "Try changing your search or filter."}
            </p>

            {labs.length === 0 && (
              <button
                type="button"
                onClick={openAddModal}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4" />
                Add First Lab
              </button>
            )}

          </div>

        ) : (

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                : "space-y-4"
            }
          >

            {filteredLabs.map(
              (lab) => (
                <LabCard
                  key={lab.id}
                  lab={lab}
                  stats={getLabStats(
                    lab.id
                  )}
                  viewMode={viewMode}
                  onView={handleViewLab}
                  onEdit={
                    openEditModal
                  }
                  onDelete={
                    handleDeleteLab
                  }
                  deleting={
                    deletingLabId ===
                    lab.id
                  }
                />
              )
            )}

          </div>

        )}
      </div>

      {/* ADD / EDIT MODAL */}

      {showModal && (
        <LabModal
          editingLab={editingLab}
          formData={formData}
          formError={formError}
          loading={formLoading}
          onChange={
            handleInputChange
          }
          onSubmit={handleSaveLab}
          onClose={closeModal}
        />
      )}

    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Stat Card
|--------------------------------------------------------------------------
*/

const StatCard = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs text-slate-500">
            {label}
          </p>

          <p className="text-xl font-bold text-slate-900 mt-1">
            {value}
          </p>
        </div>

        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>

      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Lab Card
|--------------------------------------------------------------------------
*/

const LabCard = ({
  lab,
  stats,
  viewMode,
  onView,
  onEdit,
  onDelete,
  deleting,
}) => {
  const isOnline =
    stats.onlineComputers > 0;

  const statusLabel =
    stats.totalComputers === 0
      ? "No computers"
      : stats.offlineComputers ===
        stats.totalComputers
      ? "Offline"
      : isOnline
      ? "Online"
      : "Idle";

  const statusClass =
    statusLabel === "Online"
      ? "bg-emerald-100 text-emerald-700"
      : statusLabel === "Idle"
      ? "bg-amber-100 text-amber-700"
      : statusLabel === "Offline"
      ? "bg-red-100 text-red-700"
      : "bg-slate-100 text-slate-600";

  if (viewMode === "list") {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5">

        <div className="flex flex-col xl:flex-row xl:items-center gap-5">

          <div className="flex items-center gap-4 flex-1">

            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>

            <div className="min-w-0">

              <div className="flex items-center gap-2 flex-wrap">

                <h3 className="font-semibold text-slate-900">
                  {lab.name}
                </h3>

                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                  {lab.code}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusClass}`}
                >
                  {statusLabel}
                </span>

              </div>

              <p className="text-sm text-slate-500 mt-1">
                {lab.location ||
                  "Location not specified"}
              </p>

            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">

            <Metric
              icon={Monitor}
              label="Computers"
              value={`${stats.totalComputers}/${lab.capacity}`}
            />

            <Metric
              icon={Cpu}
              label="CPU"
              value={`${stats.averageCpu.toFixed(
                1
              )}%`}
            />

            <Metric
              icon={Zap}
              label="Power"
              value={`${stats.totalPower.toFixed(
                1
              )}W`}
            />

          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() =>
                onView(lab)
              }
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
              title="View lab"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() =>
                onEdit(lab)
              }
              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
              title="Edit lab"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() =>
                onDelete(lab)
              }
              disabled={deleting}
              className="p-2 rounded-lg hover:bg-red-50 text-red-600 disabled:opacity-50"
              title="Delete lab"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition">

      {/* Card Header */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-3 min-w-0">

            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>

            <div className="min-w-0">

              <h3 className="font-semibold text-slate-900 truncate">
                {lab.name}
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                {lab.code}
              </p>

            </div>
          </div>

          <span
            className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${statusClass}`}
          >
            {statusLabel}
          </span>

        </div>

        {/* Location */}

        <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">

          <MapPin className="w-4 h-4 shrink-0" />

          <span className="truncate">
            {lab.location ||
              "Location not specified"}
          </span>

        </div>

        {/* Department */}

        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">

          <Server className="w-4 h-4 shrink-0" />

          <span>
            Department ID:{" "}
            {lab.department_id}
          </span>

        </div>

      </div>

      {/* Metrics */}

      <div className="grid grid-cols-2 border-t border-slate-100">

        <MetricBox
          icon={Monitor}
          label="Computers"
          value={`${stats.totalComputers}/${lab.capacity}`}
        />

        <MetricBox
          icon={Cpu}
          label="Avg CPU"
          value={`${stats.averageCpu.toFixed(
            1
          )}%`}
        />

        <MetricBox
          icon={Activity}
          label="Avg RAM"
          value={`${stats.averageMemory.toFixed(
            1
          )}%`}
        />

        <MetricBox
          icon={Zap}
          label="Power"
          value={`${stats.totalPower.toFixed(
            1
          )} W`}
        />

      </div>

      {/* Actions */}

      <div className="p-4 border-t border-slate-100 flex items-center gap-2">

        <button
          type="button"
          onClick={() =>
            onView(lab)
          }
          className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium"
        >
          View Details

          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            onEdit(lab)
          }
          className="p-2.5 rounded-lg border border-slate-200 text-blue-600 hover:bg-blue-50"
          title="Edit lab"
        >
          <Edit3 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            onDelete(lab)
          }
          disabled={deleting}
          className="p-2.5 rounded-lg border border-slate-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
          title="Delete lab"
        >
          {deleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>

      </div>

    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Metric
|--------------------------------------------------------------------------
*/

const Metric = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="text-center">

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">

        <Icon className="w-3.5 h-3.5" />

        {label}

      </div>

      <p className="font-semibold text-slate-800 mt-1">
        {value}
      </p>

    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Metric Box
|--------------------------------------------------------------------------
*/

const MetricBox = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="p-4 border-r border-b border-slate-100 last:border-r-0">

      <div className="flex items-center gap-2 text-xs text-slate-500">

        <Icon className="w-3.5 h-3.5" />

        {label}

      </div>

      <p className="font-semibold text-slate-800 mt-1">
        {value}
      </p>

    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Add / Edit Lab Modal
|--------------------------------------------------------------------------
*/

const LabModal = ({
  editingLab,
  formData,
  formError,
  loading,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !loading
        ) {
          onClose();
        }
      }}
    >

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between p-5 border-b border-slate-200">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              {editingLab
                ? "Edit Lab"
                : "Add New Lab"}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {editingLab
                ? "Update laboratory information"
                : "Create a new laboratory"}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Form */}

        <form onSubmit={onSubmit}>

          <div className="p-5 space-y-4">

            {formError && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">

                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />

                <span>
                  {formError}
                </span>

              </div>
            )}

            <FormField
              label="Lab Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="CSE Computer Lab 1"
              required
            />

            <FormField
              label="Lab Code"
              name="code"
              value={formData.code}
              onChange={onChange}
              placeholder="CSE-LAB-01"
              required
            />

            <FormField
              label="Department ID"
              name="department_id"
              type="number"
              min="1"
              value={
                formData.department_id
              }
              onChange={onChange}
              placeholder="1"
              required
            />

            <FormField
              label="Location"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="Block A, Ground Floor"
            />

            <FormField
              label="Capacity"
              name="capacity"
              type="number"
              min="0"
              value={formData.capacity}
              onChange={onChange}
              placeholder="60"
              required
            />

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
            >

              {loading && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}

              {editingLab
                ? "Update Lab"
                : "Create Lab"}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Form Field
|--------------------------------------------------------------------------
*/

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
}) => {
  return (
    <div>

      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 mb-1.5"
      >
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      />

    </div>
  );
};

export default Labs;