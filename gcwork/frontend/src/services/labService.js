import api from "./api";

/**
 * Get all labs
 */
export const getLabs = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.departmentId) {
    params.append("department_id", filters.departmentId);
  }

  if (filters.status) {
    params.append("status", filters.status);
  }

  if (filters.search) {
    params.append("search", filters.search);
  }

  const query = params.toString();

  return await api.get(
    query ? `/api/labs?${query}` : "/api/labs"
  );
};

/**
 * Get a single lab by ID
 */
export const getLabById = async (labId) => {
  return await api.get(`/api/labs/${labId}`);
};

/**
 * Create a new lab
 */
export const createLab = async (labData) => {
  return await api.post("/api/labs", {
    name: labData.name,
    code: labData.code || null,
    location: labData.location || null,
    department_id: labData.departmentId || null,
    description: labData.description || null,
    total_computers: labData.totalComputers || 0,
  });
};

/**
 * Update an existing lab
 */
export const updateLab = async (labId, labData) => {
  return await api.put(`/api/labs/${labId}`, {
    name: labData.name,
    code: labData.code || null,
    location: labData.location || null,
    department_id: labData.departmentId || null,
    description: labData.description || null,
    total_computers: labData.totalComputers,
  });
};

/**
 * Partially update a lab
 */
export const patchLab = async (labId, labData) => {
  return await api.patch(`/api/labs/${labId}`, labData);
};

/**
 * Delete a lab
 */
export const deleteLab = async (labId) => {
  return await api.delete(`/api/labs/${labId}`);
};

/**
 * Get lab statistics
 */
export const getLabStats = async (labId) => {
  return await api.get(`/api/labs/${labId}/stats`);
};

/**
 * Get lab computers
 */
export const getLabComputers = async (
  labId,
  filters = {}
) => {
  const params = new URLSearchParams();

  if (filters.status) {
    params.append("status", filters.status);
  }

  if (filters.search) {
    params.append("search", filters.search);
  }

  const query = params.toString();

  return await api.get(
    query
      ? `/api/labs/${labId}/computers?${query}`
      : `/api/labs/${labId}/computers`
  );
};

/**
 * Get lab energy data
 */
export const getLabEnergy = async (
  labId,
  period = "today"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/labs/${labId}/energy?${params.toString()}`
  );
};

/**
 * Get lab energy history
 */
export const getLabEnergyHistory = async (
  labId,
  period = "week"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/labs/${labId}/energy/history?${params.toString()}`
  );
};

/**
 * Get lab carbon data
 */
export const getLabCarbon = async (
  labId,
  period = "today"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/labs/${labId}/carbon?${params.toString()}`
  );
};

/**
 * Get lab carbon history
 */
export const getLabCarbonHistory = async (
  labId,
  period = "week"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/labs/${labId}/carbon/history?${params.toString()}`
  );
};

/**
 * Get lab performance
 */
export const getLabPerformance = async (labId) => {
  return await api.get(`/api/labs/${labId}/performance`);
};

/**
 * Get lab status
 */
export const getLabStatus = async (labId) => {
  return await api.get(`/api/labs/${labId}/status`);
};

/**
 * Get online computers in a lab
 */
export const getOnlineComputers = async (labId) => {
  return await api.get(
    `/api/labs/${labId}/computers/online`
  );
};

/**
 * Get idle computers in a lab
 */
export const getIdleComputers = async (labId) => {
  return await api.get(
    `/api/labs/${labId}/computers/idle`
  );
};

/**
 * Get offline computers in a lab
 */
export const getOfflineComputers = async (labId) => {
  return await api.get(
    `/api/labs/${labId}/computers/offline`
  );
};

/**
 * Get lab efficiency
 */
export const getLabEfficiency = async (
  labId,
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/labs/${labId}/efficiency?${params.toString()}`
  );
};

/**
 * Get lab energy savings
 */
export const getLabEnergySavings = async (
  labId,
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/labs/${labId}/energy/savings?${params.toString()}`
  );
};

/**
 * Get lab dashboard data
 */
export const getLabDashboard = async (labId) => {
  const [
    lab,
    stats,
    status,
    performance,
    energy,
    carbon,
    efficiency,
    energySavings,
  ] = await Promise.all([
    getLabById(labId),
    getLabStats(labId),
    getLabStatus(labId),
    getLabPerformance(labId),
    getLabEnergy(labId, "today"),
    getLabCarbon(labId, "today"),
    getLabEfficiency(labId, "month"),
    getLabEnergySavings(labId, "month"),
  ]);

  return {
    lab,
    stats,
    status,
    performance,
    energy,
    carbon,
    efficiency,
    energySavings,
  };
};

/**
 * Get all lab statistics
 */
export const getAllLabStats = async () => {
  return await api.get("/api/labs/stats");
};

/**
 * Export labs data
 */
export const exportLabs = async (
  format = "csv",
  filters = {}
) => {
  const params = new URLSearchParams();

  params.append("format", format);

  if (filters.departmentId) {
    params.append(
      "department_id",
      filters.departmentId
    );
  }

  if (filters.status) {
    params.append("status", filters.status);
  }

  return await api.get(
    `/api/labs/export?${params.toString()}`
  );
};

/**
 * Default export
 */
export default {
  getLabs,
  getLabById,
  createLab,
  updateLab,
  patchLab,
  deleteLab,
  getLabStats,
  getLabComputers,
  getLabEnergy,
  getLabEnergyHistory,
  getLabCarbon,
  getLabCarbonHistory,
  getLabPerformance,
  getLabStatus,
  getOnlineComputers,
  getIdleComputers,
  getOfflineComputers,
  getLabEfficiency,
  getLabEnergySavings,
  getLabDashboard,
  getAllLabStats,
  exportLabs,
};