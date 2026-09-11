// ============================================================
// GreenCompute - Calculation Utilities
// File: frontend/src/utils/calculations.js
// ============================================================

/**
 * Safely convert a value to a number.
 */
export const toNumber = (value, fallback = 0) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
};

/**
 * Clamp a value between minimum and maximum.
 */
export const clamp = (value, min = 0, max = 100) => {
  const number = toNumber(value);

  return Math.min(Math.max(number, min), max);
};

// ============================================================
// ENERGY CALCULATIONS
// ============================================================

/**
 * Calculate energy consumption in kWh.
 *
 * Formula:
 * kWh = Power(W) × Hours / 1000
 *
 * Example:
 * calculateEnergyConsumption(100, 5)
 * -> 0.5 kWh
 */
export const calculateEnergyConsumption = (
  powerWatts,
  hours
) => {
  const power = toNumber(powerWatts);
  const duration = toNumber(hours);

  if (power <= 0 || duration <= 0) {
    return 0;
  }

  return (power * duration) / 1000;
};

/**
 * Calculate energy from power and minutes.
 *
 * Example:
 * 100W computer running for 30 minutes
 * -> 0.05 kWh
 */
export const calculateEnergyFromMinutes = (
  powerWatts,
  minutes
) => {
  const power = toNumber(powerWatts);
  const duration = toNumber(minutes);

  if (power <= 0 || duration <= 0) {
    return 0;
  }

  return (power * duration) / 60000;
};

/**
 * Calculate total energy from multiple computers.
 *
 * Each computer should contain:
 * {
 *   powerWatts: 100,
 *   hours: 5
 * }
 */
export const calculateTotalEnergy = (
  computers = []
) => {
  if (!Array.isArray(computers)) {
    return 0;
  }

  return computers.reduce(
    (total, computer) => {
      return (
        total +
        calculateEnergyConsumption(
          computer.powerWatts ??
            computer.power_watts ??
            computer.power,
          computer.hours ??
            computer.operatingHours ??
            computer.operating_hours
        )
      );
    },
    0
  );
};

/**
 * Calculate daily energy consumption.
 */
export const calculateDailyEnergy = (
  powerWatts,
  operatingHours = 8
) => {
  return calculateEnergyConsumption(
    powerWatts,
    operatingHours
  );
};

/**
 * Calculate weekly energy consumption.
 */
export const calculateWeeklyEnergy = (
  powerWatts,
  dailyHours = 8,
  days = 7
) => {
  return (
    calculateDailyEnergy(
      powerWatts,
      dailyHours
    ) * days
  );
};

/**
 * Calculate monthly energy consumption.
 */
export const calculateMonthlyEnergy = (
  powerWatts,
  dailyHours = 8,
  days = 30
) => {
  return (
    calculateDailyEnergy(
      powerWatts,
      dailyHours
    ) * days
  );
};

// ============================================================
// CARBON CALCULATIONS
// ============================================================

/**
 * Calculate CO₂ emissions in kg.
 *
 * Formula:
 * CO₂ = Energy(kWh) × Emission Factor(kg CO₂/kWh)
 *
 * Default emission factor:
 * 0.708 kg CO₂/kWh
 */
export const calculateCarbonEmission = (
  energyKwh,
  emissionFactor = 0.708
) => {
  const energy = toNumber(energyKwh);
  const factor = toNumber(emissionFactor);

  if (energy <= 0 || factor <= 0) {
    return 0;
  }

  return energy * factor;
};

/**
 * Calculate carbon emission directly from
 * computer power and operating hours.
 */
export const calculateCarbonFromPower = (
  powerWatts,
  hours,
  emissionFactor = 0.708
) => {
  const energy = calculateEnergyConsumption(
    powerWatts,
    hours
  );

  return calculateCarbonEmission(
    energy,
    emissionFactor
  );
};

/**
 * Calculate total carbon emissions.
 */
export const calculateTotalCarbon = (
  energyKwh,
  emissionFactor = 0.708
) => {
  return calculateCarbonEmission(
    energyKwh,
    emissionFactor
  );
};

/**
 * Calculate carbon saved.
 */
export const calculateCarbonSaved = (
  energySavedKwh,
  emissionFactor = 0.708
) => {
  return calculateCarbonEmission(
    energySavedKwh,
    emissionFactor
  );
};

// ============================================================
// COST CALCULATIONS
// ============================================================

/**
 * Calculate electricity cost.
 *
 * Formula:
 * Cost = Energy(kWh) × Electricity Rate
 *
 * Example:
 * 100 kWh × ₹8 = ₹800
 */
export const calculateEnergyCost = (
  energyKwh,
  electricityRate = 8
) => {
  const energy = toNumber(energyKwh);
  const rate = toNumber(electricityRate);

  if (energy <= 0 || rate <= 0) {
    return 0;
  }

  return energy * rate;
};

/**
 * Calculate daily electricity cost.
 */
export const calculateDailyCost = (
  powerWatts,
  operatingHours = 8,
  electricityRate = 8
) => {
  const energy = calculateDailyEnergy(
    powerWatts,
    operatingHours
  );

  return calculateEnergyCost(
    energy,
    electricityRate
  );
};

/**
 * Calculate monthly electricity cost.
 */
export const calculateMonthlyCost = (
  powerWatts,
  dailyHours = 8,
  days = 30,
  electricityRate = 8
) => {
  const energy = calculateMonthlyEnergy(
    powerWatts,
    dailyHours,
    days
  );

  return calculateEnergyCost(
    energy,
    electricityRate
  );
};

/**
 * Calculate money saved from energy savings.
 */
export const calculateMoneySaved = (
  energySavedKwh,
  electricityRate = 8
) => {
  return calculateEnergyCost(
    energySavedKwh,
    electricityRate
  );
};

// ============================================================
// SAVINGS CALCULATIONS
// ============================================================

/**
 * Calculate energy saved.
 *
 * Formula:
 * Energy Saved = Baseline Energy - Actual Energy
 */
export const calculateEnergySaved = (
  baselineEnergy,
  actualEnergy
) => {
  const baseline = toNumber(
    baselineEnergy
  );

  const actual = toNumber(actualEnergy);

  return Math.max(
    0,
    baseline - actual
  );
};

/**
 * Calculate energy savings percentage.
 */
export const calculateEnergySavingsPercentage = (
  baselineEnergy,
  actualEnergy
) => {
  const baseline = toNumber(
    baselineEnergy
  );

  if (baseline <= 0) {
    return 0;
  }

  const saved = calculateEnergySaved(
    baselineEnergy,
    actualEnergy
  );

  return (saved / baseline) * 100;
};

/**
 * Calculate carbon reduction percentage.
 */
export const calculateCarbonReductionPercentage = (
  baselineCarbon,
  actualCarbon
) => {
  const baseline = toNumber(
    baselineCarbon
  );

  if (baseline <= 0) {
    return 0;
  }

  const actual = toNumber(actualCarbon);

  return clamp(
    ((baseline - actual) / baseline) *
      100,
    0,
    100
  );
};

// ============================================================
// COMPUTER UTILIZATION
// ============================================================

/**
 * Calculate average CPU usage.
 */
export const calculateAverageCPU = (
  computers = []
) => {
  if (
    !Array.isArray(computers) ||
    computers.length === 0
  ) {
    return 0;
  }

  const values = computers.map(
    (computer) =>
      toNumber(
        computer.cpu ??
          computer.cpuUsage ??
          computer.cpu_usage
      )
  );

  return (
    values.reduce(
      (sum, value) => sum + value,
      0
    ) / values.length
  );
};

/**
 * Calculate average RAM usage.
 */
export const calculateAverageRAM = (
  computers = []
) => {
  if (
    !Array.isArray(computers) ||
    computers.length === 0
  ) {
    return 0;
  }

  const values = computers.map(
    (computer) =>
      toNumber(
        computer.ram ??
          computer.ramUsage ??
          computer.ram_usage
      )
  );

  return (
    values.reduce(
      (sum, value) => sum + value,
      0
    ) / values.length
  );
};

/**
 * Calculate utilization score.
 *
 * Higher utilization generally means
 * better hardware utilization.
 */
export const calculateUtilizationScore = (
  cpuUsage,
  ramUsage
) => {
  const cpu = clamp(cpuUsage);
  const ram = clamp(ramUsage);

  return (cpu + ram) / 2;
};

// ============================================================
// IDLE / WASTE CALCULATIONS
// ============================================================

/**
 * Calculate idle energy waste.
 *
 * Formula:
 * Idle Waste = Idle Power × Idle Hours / 1000
 */
export const calculateIdleEnergyWaste = (
  powerWatts,
  idleHours
) => {
  return calculateEnergyConsumption(
    powerWatts,
    idleHours
  );
};

/**
 * Calculate idle energy waste percentage.
 */
export const calculateIdleWastePercentage = (
  totalEnergy,
  idleEnergy
) => {
  const total = toNumber(totalEnergy);

  if (total <= 0) {
    return 0;
  }

  return clamp(
    (toNumber(idleEnergy) / total) *
      100,
    0,
    100
  );
};

/**
 * Calculate potential savings from smart shutdown.
 */
export const calculateShutdownSavings = ({
  powerWatts = 0,
  idleHours = 0,
  days = 1,
} = {}) => {
  const dailySavings =
    calculateEnergyConsumption(
      powerWatts,
      idleHours
    );

  const totalSavings =
    dailySavings * toNumber(days);

  return {
    energyKwh: totalSavings,
    carbonKg:
      calculateCarbonEmission(
        totalSavings
      ),
    money:
      calculateEnergyCost(totalSavings),
  };
};

// ============================================================
// EFFICIENCY CALCULATIONS
// ============================================================

/**
 * Calculate energy efficiency.
 *
 * Returns percentage based on actual
 * consumption compared with baseline.
 */
export const calculateEfficiency = (
  baselineEnergy,
  actualEnergy
) => {
  const baseline = toNumber(
    baselineEnergy
  );

  const actual = toNumber(actualEnergy);

  if (baseline <= 0) {
    return 0;
  }

  return clamp(
    (1 - actual / baseline) * 100,
    0,
    100
  );
};

/**
 * Calculate efficiency score from
 * energy savings and utilization.
 */
export const calculateEfficiencyScore = (
  energySavingsPercentage,
  utilizationScore
) => {
  const savings = clamp(
    energySavingsPercentage
  );

  const utilization = clamp(
    utilizationScore
  );

  return (
    savings * 0.6 +
    utilization * 0.4
  );
};

// ============================================================
// ECO SCORE
// ============================================================

/**
 * Calculate GreenCompute Eco Score.
 *
 * Factors:
 * - Energy efficiency: 40%
 * - Carbon reduction: 30%
 * - Idle reduction: 20%
 * - Smart shutdown adoption: 10%
 */
export const calculateEcoScore = ({
  energyEfficiency = 0,
  carbonReduction = 0,
  idleReduction = 0,
  smartShutdownAdoption = 0,
} = {}) => {
  const energy = clamp(
    energyEfficiency
  );

  const carbon = clamp(
    carbonReduction
  );

  const idle = clamp(
    idleReduction
  );

  const shutdown = clamp(
    smartShutdownAdoption
  );

  const score =
    energy * 0.4 +
    carbon * 0.3 +
    idle * 0.2 +
    shutdown * 0.1;

  return Math.round(
    clamp(score, 0, 100)
  );
};

/**
 * Get Eco Score grade.
 */
export const getEcoScoreGrade = (
  score
) => {
  const value = clamp(score);

  if (value >= 90) return "A+";
  if (value >= 80) return "A";
  if (value >= 70) return "B";
  if (value >= 60) return "C";
  if (value >= 50) return "D";

  return "E";
};

/**
 * Get Eco Score label.
 */
export const getEcoScoreLabel = (
  score
) => {
  const value = clamp(score);

  if (value >= 90) return "Excellent";
  if (value >= 80) return "Very Good";
  if (value >= 70) return "Good";
  if (value >= 60) return "Average";
  if (value >= 50) return "Needs Improvement";

  return "Critical";
};

// ============================================================
// TREES EQUIVALENT
// ============================================================

/**
 * Calculate approximate tree equivalent.
 *
 * Default assumption:
 * 1 tree absorbs approximately 21 kg CO₂/year.
 */
export const calculateTreeEquivalent = (
  carbonSavedKg,
  carbonPerTree = 21
) => {
  const carbon = toNumber(
    carbonSavedKg
  );

  const treeFactor = toNumber(
    carbonPerTree
  );

  if (
    carbon <= 0 ||
    treeFactor <= 0
  ) {
    return 0;
  }

  return carbon / treeFactor;
};

// ============================================================
// FORECAST CALCULATIONS
// ============================================================

/**
 * Calculate average daily consumption.
 */
export const calculateAverageDailyEnergy = (
  totalEnergy,
  numberOfDays
) => {
  const energy = toNumber(totalEnergy);
  const days = toNumber(numberOfDays);

  if (energy <= 0 || days <= 0) {
    return 0;
  }

  return energy / days;
};

/**
 * Forecast energy consumption.
 *
 * Example:
 * 10 kWh/day × 30 days = 300 kWh
 */
export const forecastEnergy = (
  averageDailyEnergy,
  numberOfDays
) => {
  return (
    toNumber(averageDailyEnergy) *
    toNumber(numberOfDays)
  );
};

/**
 * Forecast electricity bill.
 */
export const forecastElectricityBill = (
  averageDailyEnergy,
  numberOfDays,
  electricityRate = 8
) => {
  const energy = forecastEnergy(
    averageDailyEnergy,
    numberOfDays
  );

  return calculateEnergyCost(
    energy,
    electricityRate
  );
};

/**
 * Forecast carbon emissions.
 */
export const forecastCarbon = (
  averageDailyEnergy,
  numberOfDays,
  emissionFactor = 0.708
) => {
  const energy = forecastEnergy(
    averageDailyEnergy,
    numberOfDays
  );

  return calculateCarbonEmission(
    energy,
    emissionFactor
  );
};

// ============================================================
// SUSTAINABILITY GOALS
// ============================================================

/**
 * Calculate sustainability goal progress.
 *
 * Example:
 * target = 1000 kWh
 * achieved = 650 kWh
 * -> 65%
 */
export const calculateGoalProgress = (
  current,
  target
) => {
  const currentValue = toNumber(current);
  const targetValue = toNumber(target);

  if (targetValue <= 0) {
    return 0;
  }

  return clamp(
    (currentValue / targetValue) * 100,
    0,
    100
  );
};

/**
 * Calculate remaining goal value.
 */
export const calculateGoalRemaining = (
  current,
  target
) => {
  return Math.max(
    0,
    toNumber(target) -
      toNumber(current)
  );
};

// ============================================================
// SHUTDOWN CALCULATIONS
// ============================================================

/**
 * Calculate recommended shutdown time.
 */
export const calculateRecommendedShutdownTime = ({
  idleMinutes = 0,
  thresholdMinutes = 30,
} = {}) => {
  const idle = toNumber(idleMinutes);
  const threshold =
    toNumber(thresholdMinutes);

  return Math.max(
    0,
    threshold - idle
  );
};

/**
 * Check whether a computer should enter
 * smart shutdown mode.
 */
export const shouldTriggerShutdown = ({
  idleMinutes = 0,
  idleThreshold = 30,
  isOnline = true,
  scheduleAllowsShutdown = true,
  holidayMode = false,
  examMode = false,
} = {}) => {
  if (!isOnline) {
    return false;
  }

  if (!scheduleAllowsShutdown) {
    return false;
  }

  if (examMode) {
    return false;
  }

  if (
    toNumber(idleMinutes) <
    toNumber(idleThreshold)
  ) {
    return false;
  }

  if (holidayMode) {
    return true;
  }

  return true;
};

// ============================================================
// DASHBOARD HELPERS
// ============================================================

/**
 * Calculate dashboard summary.
 */
export const calculateDashboardSummary = ({
  totalEnergy = 0,
  baselineEnergy = 0,
  emissionFactor = 0.708,
  electricityRate = 8,
} = {}) => {
  const energy = toNumber(
    totalEnergy
  );

  const baseline = toNumber(
    baselineEnergy
  );

  const energySaved =
    calculateEnergySaved(
      baseline,
      energy
    );

  const carbon =
    calculateCarbonEmission(
      energy,
      emissionFactor
    );

  const carbonSaved =
    calculateCarbonSaved(
      energySaved,
      emissionFactor
    );

  const cost =
    calculateEnergyCost(
      energy,
      electricityRate
    );

  const moneySaved =
    calculateMoneySaved(
      energySaved,
      electricityRate
    );

  const savingsPercentage =
    calculateEnergySavingsPercentage(
      baseline,
      energy
    );

  return {
    energy,
    energySaved,
    carbon,
    carbonSaved,
    cost,
    moneySaved,
    savingsPercentage,
  };
};

// ============================================================
// ROUNDING
// ============================================================

/**
 * Round number to specified decimal places.
 */
export const roundNumber = (
  value,
  decimals = 2
) => {
  const number = toNumber(value);
  const factor = Math.pow(
    10,
    decimals
  );

  return (
    Math.round(
      number * factor
    ) / factor
  );
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  toNumber,
  clamp,

  calculateEnergyConsumption,
  calculateEnergyFromMinutes,
  calculateTotalEnergy,
  calculateDailyEnergy,
  calculateWeeklyEnergy,
  calculateMonthlyEnergy,

  calculateCarbonEmission,
  calculateCarbonFromPower,
  calculateTotalCarbon,
  calculateCarbonSaved,

  calculateEnergyCost,
  calculateDailyCost,
  calculateMonthlyCost,
  calculateMoneySaved,

  calculateEnergySaved,
  calculateEnergySavingsPercentage,
  calculateCarbonReductionPercentage,

  calculateAverageCPU,
  calculateAverageRAM,
  calculateUtilizationScore,

  calculateIdleEnergyWaste,
  calculateIdleWastePercentage,
  calculateShutdownSavings,

  calculateEfficiency,
  calculateEfficiencyScore,

  calculateEcoScore,
  getEcoScoreGrade,
  getEcoScoreLabel,

  calculateTreeEquivalent,

  calculateAverageDailyEnergy,
  forecastEnergy,
  forecastElectricityBill,
  forecastCarbon,

  calculateGoalProgress,
  calculateGoalRemaining,

  calculateRecommendedShutdownTime,
  shouldTriggerShutdown,

  calculateDashboardSummary,

  roundNumber,
};