import api from "./api";

/*
 * Get complete analytics overview
 *
 * Returns:
 * - Total energy
 * - Energy saved
 * - CO2 emissions
 * - CO2 saved
 * - Cost
 * - Efficiency
 */
export const getAnalyticsOverview = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/overview?${params.toString()}`
  );
};

/*
 * Get energy analytics
 */
export const getEnergyAnalytics = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/energy?${params.toString()}`
  );
};

/*
 * Get carbon analytics
 */
export const getCarbonAnalytics = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/carbon?${params.toString()}`
  );
};

/*
 * Get energy consumption trend
 *
 * period:
 * day / week / month / year
 */
export const getEnergyTrend = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/energy/trend?${params.toString()}`
  );
};

/*
 * Get carbon emission trend
 */
export const getCarbonTrend = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/carbon/trend?${params.toString()}`
  );
};

/*
 * Get energy saved over time
 */
export const getEnergySavingsTrend = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/energy/savings?${params.toString()}`
  );
};

/*
 * Get department-wise analytics
 */
export const getDepartmentAnalytics = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/departments?${params.toString()}`
  );
};

/*
 * Get analytics for a specific department
 */
export const getDepartmentDetails = async (
  departmentId,
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/departments/${departmentId}?${params.toString()}`
  );
};

/*
 * Get lab-wise analytics
 */
export const getLabAnalytics = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/labs?${params.toString()}`
  );
};

/*
 * Get computer-wise analytics
 */
export const getComputerAnalytics = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/computers?${params.toString()}`
  );
};

/*
 * Get energy consumption by hour
 *
 * Used for energy heatmap.
 */
export const getHourlyEnergy = async (
  period = "week"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/energy/hourly?${params.toString()}`
  );
};

/*
 * Get energy heatmap
 */
export const getEnergyHeatmap = async (
  period = "week"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/energy/heatmap?${params.toString()}`
  );
};

/*
 * Get peak energy consumption periods
 */
export const getPeakConsumption = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/energy/peak?${params.toString()}`
  );
};

/*
 * Get idle energy waste
 */
export const getIdleEnergyWaste = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/idle-waste?${params.toString()}`
  );
};

/*
 * Get energy efficiency analysis
 */
export const getEfficiencyAnalytics = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/efficiency?${params.toString()}`
  );
};

/*
 * Get Eco Score analytics
 */
export const getEcoScoreAnalytics = async () => {
  return await api.get(
    "/api/analytics/eco-score"
  );
};

/*
 * Get sustainability goal analytics
 */
export const getSustainabilityGoals = async () => {
  return await api.get(
    "/api/analytics/sustainability-goals"
  );
};

/*
 * Get cost / electricity bill analytics
 */
export const getCostAnalytics = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/cost?${params.toString()}`
  );
};

/*
 * Get monthly bill forecast
 */
export const getBillForecast = async () => {
  return await api.get(
    "/api/analytics/forecast/bill"
  );
};

/*
 * Get tomorrow's energy forecast
 */
export const getEnergyForecast = async () => {
  return await api.get(
    "/api/analytics/forecast/energy"
  );
};

/*
 * Get carbon emission forecast
 */
export const getCarbonForecast = async () => {
  return await api.get(
    "/api/analytics/forecast/carbon"
  );
};

/*
 * Get waste detection results
 *
 * Identifies:
 * - Long idle computers
 * - High energy devices
 * - Unusual consumption
 * - After-hours usage
 */
export const getWasteDetection = async () => {
  return await api.get(
    "/api/analytics/waste-detection"
  );
};

/*
 * Get sustainability recommendations
 *
 * AI recommendations will be connected later.
 */
export const getRecommendations = async () => {
  return await api.get(
    "/api/analytics/recommendations"
  );
};

/*
 * Get department ranking
 */
export const getDepartmentRanking = async (
  period = "month"
) => {
  const params = new URLSearchParams({
    period,
  });

  return await api.get(
    `/api/analytics/departments/ranking?${params.toString()}`
  );
};

/*
 * Get top energy consuming computers
 */
export const getTopEnergyConsumers = async (
  limit = 10,
  period = "month"
) => {
  const params = new URLSearchParams({
    limit: String(limit),
    period,
  });

  return await api.get(
    `/api/analytics/top-energy-consumers?${params.toString()}`
  );
};

/*
 * Get top energy saving computers/labs
 */
export const getTopEnergySavers = async (
  limit = 10,
  period = "month"
) => {
  const params = new URLSearchParams({
    limit: String(limit),
    period,
  });

  return await api.get(
    `/api/analytics/top-energy-savers?${params.toString()}`
  );
};

/*
 * Get complete analytics data
 *
 * Useful for loading the Analytics page.
 */
export const getAnalyticsData = async (
  period = "month"
) => {
  const [
    overview,
    energy,
    carbon,
    energyTrend,
    carbonTrend,
    departmentAnalytics,
    labAnalytics,
    heatmap,
    peakConsumption,
    idleWaste,
    efficiency,
    ecoScore,
    cost,
    billForecast,
    energyForecast,
    carbonForecast,
    wasteDetection,
    recommendations,
  ] = await Promise.all([
    getAnalyticsOverview(period),
    getEnergyAnalytics(period),
    getCarbonAnalytics(period),
    getEnergyTrend(period),
    getCarbonTrend(period),
    getDepartmentAnalytics(period),
    getLabAnalytics(period),
    getEnergyHeatmap("week"),
    getPeakConsumption(period),
    getIdleEnergyWaste(period),
    getEfficiencyAnalytics(period),
    getEcoScoreAnalytics(),
    getCostAnalytics(period),
    getBillForecast(),
    getEnergyForecast(),
    getCarbonForecast(),
    getWasteDetection(),
    getRecommendations(),
  ]);

  return {
    overview,
    energy,
    carbon,
    energyTrend,
    carbonTrend,
    departmentAnalytics,
    labAnalytics,
    heatmap,
    peakConsumption,
    idleWaste,
    efficiency,
    ecoScore,
    cost,
    billForecast,
    energyForecast,
    carbonForecast,
    wasteDetection,
    recommendations,
  };
};