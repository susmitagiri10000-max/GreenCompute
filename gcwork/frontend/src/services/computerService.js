import api from "./api";

/*
 * Get all computers
 *
 * Optional filters:
 * - labId
 * - departmentId
 * - status
 * - search
 */
export const getComputers = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.labId) {
    params.append("lab_id", filters.labId);
  }

  if (filters.departmentId) {
    params.append("department_id", filters.departmentId);
  }

  if (filters.status) {
    params.append("status", filters.status);
  }

  if (filters.search) {
    params.append("search", filters.search);
  }

  const queryString = params.toString();

  const endpoint = queryString
    ? `/api/computers?${queryString}`
    : "/api/computers";

  return await api.get(endpoint);
};

/*
 * Get a single computer by ID
 */
export const getComputerById = async (computerId) => {
  return await api.get(
    `/api/computers/${computerId}`
  );
};

/*
 * Add a new computer
 */
export const createComputer = async (computerData) => {
  return await api.post(
    "/api/computers",
    computerData
  );
};

/*
 * Update computer information
 */
export const updateComputer = async (
  computerId,
  computerData
) => {
  return await api.put(
    `/api/computers/${computerId}`,
    computerData
  );
};

/*
 * Partially update computer
 */
export const patchComputer = async (
  computerId,
  computerData
) => {
  return await api.patch(
    `/api/computers/${computerId}`,
    computerData
  );
};

/*
 * Delete a computer
 */
export const deleteComputer = async (computerId) => {
  return await api.delete(
    `/api/computers/${computerId}`
  );
};

/*
 * Get computer current status
 */
export const getComputerStatus = async (computerId) => {
  return await api.get(
    `/api/computers/${computerId}/status`
  );
};

/*
 * Get computer performance
 *
 * Returns CPU, RAM, disk, uptime etc.
 */
export const getComputerPerformance = async (
  computerId
) => {
  return await api.get(
    `/api/computers/${computerId}/performance`
  );
};

/*
 * Get computer energy consumption
 */
export const getComputerEnergy = async (
  computerId,
  period = "today"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/computers/${computerId}/energy?${params.toString()}`
  );
};

/*
 * Get computer carbon emissions
 */
export const getComputerCarbon = async (
  computerId,
  period = "today"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/computers/${computerId}/carbon?${params.toString()}`
  );
};

/*
 * Get computer activity history
 */
export const getComputerActivity = async (
  computerId,
  limit = 50
) => {
  const params = new URLSearchParams({
    limit: String(limit),
  });

  return await api.get(
    `/api/computers/${computerId}/activity?${params.toString()}`
  );
};

/*
 * Get computer energy history
 */
export const getComputerEnergyHistory = async (
  computerId,
  period = "week"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/computers/${computerId}/energy/history?${params.toString()}`
  );
};

/*
 * Get all idle computers
 */
export const getIdleComputers = async () => {
  return await api.get("/api/computers/idle");
};

/*
 * Get all online computers
 */
export const getOnlineComputers = async () => {
  return await api.get("/api/computers/online");
};

/*
 * Get all offline computers
 */
export const getOfflineComputers = async () => {
  return await api.get("/api/computers/offline");
};

/*
 * Get all sleeping computers
 */
export const getSleepingComputers = async () => {
  return await api.get("/api/computers/sleeping");
};

/*
 * Get computers belonging to a specific lab
 */
export const getComputersByLab = async (labId) => {
  return await api.get(
    `/api/labs/${labId}/computers`
  );
};

/*
 * Get computer statistics
 */
export const getComputerStats = async () => {
  return await api.get(
    "/api/computers/statistics"
  );
};

/*
 * Send a command to a computer
 *
 * Supported commands later:
 * - sleep
 * - shutdown
 * - wake
 * - restart
 */
export const sendComputerCommand = async (
  computerId,
  command
) => {
  return await api.post(
    `/api/computers/${computerId}/command`,
    {
      command,
    }
  );
};

/*
 * Put computer into sleep mode
 */
export const sleepComputer = async (computerId) => {
  return await sendComputerCommand(
    computerId,
    "sleep"
  );
};

/*
 * Shutdown computer
 */
export const shutdownComputer = async (computerId) => {
  return await sendComputerCommand(
    computerId,
    "shutdown"
  );
};

/*
 * Restart computer
 */
export const restartComputer = async (computerId) => {
  return await sendComputerCommand(
    computerId,
    "restart"
  );
};

/*
 * Wake computer
 */
export const wakeComputer = async (computerId) => {
  return await sendComputerCommand(
    computerId,
    "wake"
  );
};

/*
 * Get monitoring agent information
 */
export const getAgentStatus = async (computerId) => {
  return await api.get(
    `/api/computers/${computerId}/agent`
  );
};

/*
 * Send heartbeat
 *
 * Used by monitoring agent to tell backend
 * that the computer is still active.
 */
export const sendHeartbeat = async (
  computerId,
  heartbeatData = {}
) => {
  return await api.post(
    `/api/computers/${computerId}/heartbeat`,
    heartbeatData
  );
};

/*
 * Send live monitoring metrics
 *
 * Used later by monitor-agent.
 */
export const sendMetrics = async (
  computerId,
  metrics
) => {
  return await api.post(
    `/api/computers/${computerId}/metrics`,
    metrics
  );
};

/*
 * Export computer list
 */
export const exportComputers = async (
  format = "csv",
  filters = {}
) => {
  const params = new URLSearchParams();

  params.append("format", format);

  if (filters.labId) {
    params.append("lab_id", filters.labId);
  }

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
    `/api/computers/export?${params.toString()}`
  );
};