import api from "./api";

/**
 * Get all generated reports
 */
export const getReports = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.type) {
    params.append("type", filters.type);
  }

  if (filters.period) {
    params.append("period", filters.period);
  }

  if (filters.status) {
    params.append("status", filters.status);
  }

  if (filters.search) {
    params.append("search", filters.search);
  }

  const query = params.toString();

  return await api.get(
    query ? `/api/reports?${query}` : "/api/reports"
  );
};

/**
 * Get a single report by ID
 */
export const getReportById = async (reportId) => {
  return await api.get(`/api/reports/${reportId}`);
};

/**
 * Generate a new sustainability report
 */
export const generateReport = async (reportData = {}) => {
  return await api.post("/api/reports/generate", {
    report_type: reportData.reportType || "sustainability",
    period: reportData.period || "month",
    start_date: reportData.startDate || null,
    end_date: reportData.endDate || null,
    department_id: reportData.departmentId || null,
    lab_id: reportData.labId || null,
    include_charts:
      reportData.includeCharts !== undefined
        ? reportData.includeCharts
        : true,
    include_recommendations:
      reportData.includeRecommendations !== undefined
        ? reportData.includeRecommendations
        : true,
  });
};

/**
 * Generate sustainability report
 */
export const generateSustainabilityReport = async (
  period = "month",
  options = {}
) => {
  return await generateReport({
    reportType: "sustainability",
    period,
    ...options,
  });
};

/**
 * Generate energy report
 */
export const generateEnergyReport = async (
  period = "month",
  options = {}
) => {
  return await generateReport({
    reportType: "energy",
    period,
    ...options,
  });
};

/**
 * Generate carbon report
 */
export const generateCarbonReport = async (
  period = "month",
  options = {}
) => {
  return await generateReport({
    reportType: "carbon",
    period,
    ...options,
  });
};

/**
 * Generate department report
 */
export const generateDepartmentReport = async (
  departmentId,
  period = "month"
) => {
  return await generateReport({
    reportType: "department",
    period,
    departmentId,
  });
};

/**
 * Download report PDF
 */
export const downloadReport = async (reportId) => {
  const response = await api.get(`/api/reports/${reportId}/download`);

  return response;
};

/**
 * Export report as CSV
 */
export const exportReportCSV = async (
  reportId,
  options = {}
) => {
  const params = new URLSearchParams();

  params.append("format", "csv");

  if (options.period) {
    params.append("period", options.period);
  }

  return await api.get(
    `/api/reports/${reportId}/export?${params.toString()}`
  );
};

/**
 * Delete a report
 */
export const deleteReport = async (reportId) => {
  return await api.delete(`/api/reports/${reportId}`);
};

/**
 * Get report statistics
 */
export const getReportStats = async (period = "month") => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(`/api/reports/stats?${params.toString()}`);
};

/**
 * Get latest sustainability report
 */
export const getLatestReport = async () => {
  return await api.get("/api/reports/latest");
};

/**
 * Get report generation status
 */
export const getReportStatus = async (reportId) => {
  return await api.get(`/api/reports/${reportId}/status`);
};

/**
 * Generate report and return report information
 */
export const createAndGetReport = async (reportData = {}) => {
  const report = await generateReport(reportData);

  if (report?.id) {
    return await getReportById(report.id);
  }

  if (report?.report_id) {
    return await getReportById(report.report_id);
  }

  return report;
};

/**
 * Get reports dashboard data
 */
export const getReportsData = async (period = "month") => {
  const [
    reports,
    stats,
    latestReport,
  ] = await Promise.all([
    getReports({ period }),
    getReportStats(period),
    getLatestReport(),
  ]);

  return {
    reports,
    stats,
    latestReport,
  };
};

export default {
  getReports,
  getReportById,
  generateReport,
  generateSustainabilityReport,
  generateEnergyReport,
  generateCarbonReport,
  generateDepartmentReport,
  downloadReport,
  exportReportCSV,
  deleteReport,
  getReportStats,
  getLatestReport,
  getReportStatus,
  createAndGetReport,
  getReportsData,
};