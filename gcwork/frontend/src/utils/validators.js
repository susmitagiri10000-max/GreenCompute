// ============================================================
// GreenCompute - Validation Utilities
// File: frontend/src/utils/validators.js
// ============================================================

// ============================================================
// BASIC HELPERS
// ============================================================

/**
 * Check whether a value is empty.
 */
export const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    String(value).trim() === ""
  );
};

/**
 * Check whether a value is not empty.
 */
export const isRequired = (value) => {
  return !isEmpty(value);
};

/**
 * Trim a value safely.
 */
export const sanitizeText = (value) => {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
};


// ============================================================
// EMAIL VALIDATION
// ============================================================

/**
 * Validate email address.
 */
export const isValidEmail = (email) => {
  if (isEmpty(email)) {
    return false;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(
    String(email).trim()
  );
};

/**
 * Get email validation error.
 */
export const validateEmail = (
  email,
  required = true
) => {
  if (isEmpty(email)) {
    return required
      ? "Email is required."
      : "";
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email address.";
  }

  return "";
};


// ============================================================
// PASSWORD VALIDATION
// ============================================================

export const MIN_PASSWORD_LENGTH = 6;

export const MAX_PASSWORD_LENGTH = 128;

/**
 * Check password length.
 */
export const isValidPassword = (
  password
) => {
  if (isEmpty(password)) {
    return false;
  }

  const value = String(password);

  return (
    value.length >= MIN_PASSWORD_LENGTH &&
    value.length <= MAX_PASSWORD_LENGTH
  );
};

/**
 * Validate password.
 */
export const validatePassword = (
  password,
  options = {}
) => {
  const {
    required = true,
    minLength = MIN_PASSWORD_LENGTH,
    maxLength = MAX_PASSWORD_LENGTH,
  } = options;

  if (isEmpty(password)) {
    return required
      ? "Password is required."
      : "";
  }

  const value = String(password);

  if (value.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  }

  if (value.length > maxLength) {
    return `Password must not exceed ${maxLength} characters.`;
  }

  return "";
};

/**
 * Check password strength.
 */
export const getPasswordStrength = (
  password
) => {
  if (isEmpty(password)) {
    return {
      score: 0,
      label: "None",
      level: "none",
    };
  }

  const value = String(password);

  let score = 0;

  if (value.length >= 6) {
    score += 1;
  }

  if (value.length >= 10) {
    score += 1;
  }

  if (/[a-z]/.test(value)) {
    score += 1;
  }

  if (/[A-Z]/.test(value)) {
    score += 1;
  }

  if (/[0-9]/.test(value)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(value)) {
    score += 1;
  }

  if (score <= 2) {
    return {
      score,
      label: "Weak",
      level: "weak",
    };
  }

  if (score <= 4) {
    return {
      score,
      label: "Medium",
      level: "medium",
    };
  }

  return {
    score,
    label: "Strong",
    level: "strong",
  };
};


// ============================================================
// CONFIRM PASSWORD
// ============================================================

/**
 * Validate confirm password.
 */
export const validateConfirmPassword = (
  password,
  confirmPassword
) => {
  if (isEmpty(confirmPassword)) {
    return "Please confirm your password.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return "";
};


// ============================================================
// NAME VALIDATION
// ============================================================

/**
 * Validate person's name.
 */
export const validateName = (
  name,
  options = {}
) => {
  const {
    required = true,
    minLength = 2,
    maxLength = 100,
  } = options;

  if (isEmpty(name)) {
    return required
      ? "Name is required."
      : "";
  }

  const value = sanitizeText(name);

  if (value.length < minLength) {
    return `Name must be at least ${minLength} characters.`;
  }

  if (value.length > maxLength) {
    return `Name must not exceed ${maxLength} characters.`;
  }

  if (!/^[A-Za-zÀ-ÿ\s.'-]+$/.test(value)) {
    return "Name contains invalid characters.";
  }

  return "";
};


// ============================================================
// PHONE VALIDATION
// ============================================================

/**
 * Validate Indian phone number.
 */
export const isValidPhone = (phone) => {
  if (isEmpty(phone)) {
    return false;
  }

  const value = String(phone)
    .replace(/\s+/g, "")
    .replace(/-/g, "");

  return /^[6-9]\d{9}$/.test(value);
};

/**
 * Validate phone number.
 */
export const validatePhone = (
  phone,
  required = false
) => {
  if (isEmpty(phone)) {
    return required
      ? "Phone number is required."
      : "";
  }

  if (!isValidPhone(phone)) {
    return "Please enter a valid 10-digit phone number.";
  }

  return "";
};


// ============================================================
// URL VALIDATION
// ============================================================

/**
 * Validate URL.
 */
export const isValidURL = (url) => {
  if (isEmpty(url)) {
    return false;
  }

  try {
    const parsedURL = new URL(url);

    return (
      parsedURL.protocol === "http:" ||
      parsedURL.protocol === "https:"
    );
  } catch {
    return false;
  }
};

/**
 * Validate URL.
 */
export const validateURL = (
  url,
  required = false
) => {
  if (isEmpty(url)) {
    return required
      ? "URL is required."
      : "";
  }

  if (!isValidURL(url)) {
    return "Please enter a valid URL.";
  }

  return "";
};


// ============================================================
// NUMBER VALIDATION
// ============================================================

/**
 * Check whether a value is a valid number.
 */
export const isValidNumber = (value) => {
  if (isEmpty(value)) {
    return false;
  }

  return Number.isFinite(Number(value));
};

/**
 * Validate number.
 */
export const validateNumber = (
  value,
  options = {}
) => {
  const {
    required = false,
    min = null,
    max = null,
    integer = false,
  } = options;

  if (isEmpty(value)) {
    return required
      ? "This field is required."
      : "";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Please enter a valid number.";
  }

  if (integer && !Number.isInteger(number)) {
    return "Please enter a whole number.";
  }

  if (min !== null && number < min) {
    return `Value must be at least ${min}.`;
  }

  if (max !== null && number > max) {
    return `Value must not exceed ${max}.`;
  }

  return "";
};


// ============================================================
// ENERGY VALIDATION
// ============================================================

/**
 * Validate computer power in watts.
 */
export const validatePower = (
  power,
  required = true
) => {
  return validateNumber(power, {
    required,
    min: 10,
    max: 2000,
  });
};

/**
 * Validate electricity rate.
 */
export const validateElectricityRate = (
  rate,
  required = true
) => {
  return validateNumber(rate, {
    required,
    min: 0,
    max: 100,
  });
};

/**
 * Validate emission factor.
 */
export const validateEmissionFactor = (
  factor,
  required = true
) => {
  return validateNumber(factor, {
    required,
    min: 0,
    max: 5,
  });
};

/**
 * Validate energy value.
 */
export const validateEnergy = (
  energy,
  required = true
) => {
  return validateNumber(energy, {
    required,
    min: 0,
  });
};


// ============================================================
// MONITORING VALIDATION
// ============================================================

/**
 * Validate monitoring interval.
 *
 * Value is in seconds.
 */
export const validateMonitoringInterval = (
  interval
) => {
  return validateNumber(interval, {
    required: true,
    min: 10,
    max: 3600,
    integer: true,
  });
};

/**
 * Validate idle threshold.
 *
 * Value is in minutes.
 */
export const validateIdleThreshold = (
  threshold
) => {
  return validateNumber(threshold, {
    required: true,
    min: 1,
    max: 120,
    integer: true,
  });
};

/**
 * Validate sleep-after duration.
 */
export const validateSleepAfter = (
  minutes
) => {
  return validateNumber(minutes, {
    required: true,
    min: 5,
    max: 180,
    integer: true,
  });
};

/**
 * Validate shutdown-after duration.
 */
export const validateShutdownAfter = (
  minutes
) => {
  return validateNumber(minutes, {
    required: true,
    min: 10,
    max: 360,
    integer: true,
  });
};


// ============================================================
// LAB VALIDATION
// ============================================================

/**
 * Validate lab name.
 */
export const validateLabName = (
  name
) => {
  if (isEmpty(name)) {
    return "Lab name is required.";
  }

  const value = sanitizeText(name);

  if (value.length < 2) {
    return "Lab name must be at least 2 characters.";
  }

  if (value.length > 100) {
    return "Lab name must not exceed 100 characters.";
  }

  return "";
};

/**
 * Validate lab code.
 */
export const validateLabCode = (
  code,
  required = false
) => {
  if (isEmpty(code)) {
    return required
      ? "Lab code is required."
      : "";
  }

  const value = sanitizeText(code);

  if (value.length < 2) {
    return "Lab code must be at least 2 characters.";
  }

  if (value.length > 20) {
    return "Lab code must not exceed 20 characters.";
  }

  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return "Lab code can contain only letters, numbers, - and _.";
  }

  return "";
};

/**
 * Validate lab location.
 */
export const validateLocation = (
  location,
  required = false
) => {
  if (isEmpty(location)) {
    return required
      ? "Location is required."
      : "";
  }

  if (sanitizeText(location).length > 200) {
    return "Location must not exceed 200 characters.";
  }

  return "";
};


// ============================================================
// COMPUTER VALIDATION
// ============================================================

/**
 * Validate computer name.
 */
export const validateComputerName = (
  name
) => {
  if (isEmpty(name)) {
    return "Computer name is required.";
  }

  const value = sanitizeText(name);

  if (value.length < 2) {
    return "Computer name must be at least 2 characters.";
  }

  if (value.length > 100) {
    return "Computer name must not exceed 100 characters.";
  }

  return "";
};

/**
 * Validate hostname.
 */
export const validateHostname = (
  hostname
) => {
  if (isEmpty(hostname)) {
    return "Hostname is required.";
  }

  const value = sanitizeText(hostname);

  if (value.length > 255) {
    return "Hostname is too long.";
  }

  if (
    !/^[A-Za-z0-9][A-Za-z0-9.-]*$/.test(
      value
    )
  ) {
    return "Please enter a valid hostname.";
  }

  return "";
};

/**
 * Validate IPv4 address.
 */
export const isValidIPv4 = (ip) => {
  if (isEmpty(ip)) {
    return false;
  }

  const parts = String(ip).trim().split(".");

  if (parts.length !== 4) {
    return false;
  }

  return parts.every((part) => {
    if (!/^\d+$/.test(part)) {
      return false;
    }

    const number = Number(part);

    return number >= 0 && number <= 255;
  });
};

/**
 * Validate IP address.
 */
export const validateIPAddress = (
  ip,
  required = false
) => {
  if (isEmpty(ip)) {
    return required
      ? "IP address is required."
      : "";
  }

  if (!isValidIPv4(ip)) {
    return "Please enter a valid IPv4 address.";
  }

  return "";
};


// ============================================================
// DESCRIPTION VALIDATION
// ============================================================

/**
 * Validate description.
 */
export const validateDescription = (
  description,
  options = {}
) => {
  const {
    required = false,
    maxLength = 500,
  } = options;

  if (isEmpty(description)) {
    return required
      ? "Description is required."
      : "";
  }

  if (
    sanitizeText(description).length >
    maxLength
  ) {
    return `Description must not exceed ${maxLength} characters.`;
  }

  return "";
};


// ============================================================
// DATE VALIDATION
// ============================================================

/**
 * Check whether a date is valid.
 */
export const isValidDate = (date) => {
  if (isEmpty(date)) {
    return false;
  }

  const parsedDate = new Date(date);

  return !Number.isNaN(
    parsedDate.getTime()
  );
};

/**
 * Validate date.
 */
export const validateDate = (
  date,
  required = false
) => {
  if (isEmpty(date)) {
    return required
      ? "Date is required."
      : "";
  }

  if (!isValidDate(date)) {
    return "Please enter a valid date.";
  }

  return "";
};

/**
 * Validate date range.
 */
export const validateDateRange = (
  startDate,
  endDate
) => {
  if (isEmpty(startDate)) {
    return "Start date is required.";
  }

  if (isEmpty(endDate)) {
    return "End date is required.";
  }

  if (
    !isValidDate(startDate) ||
    !isValidDate(endDate)
  ) {
    return "Please enter valid dates.";
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    return "Start date cannot be after end date.";
  }

  return "";
};


// ============================================================
// TIME VALIDATION
// ============================================================

/**
 * Validate HH:MM time format.
 */
export const isValidTime = (time) => {
  if (isEmpty(time)) {
    return false;
  }

  return /^([01]\d|2[0-3]):[0-5]\d$/.test(
    String(time).trim()
  );
};

/**
 * Validate time.
 */
export const validateTime = (
  time,
  required = false
) => {
  if (isEmpty(time)) {
    return required
      ? "Time is required."
      : "";
  }

  if (!isValidTime(time)) {
    return "Please enter time in HH:MM format.";
  }

  return "";
};


// ============================================================
// LOGIN VALIDATION
// ============================================================

/**
 * Validate login form.
 */
export const validateLoginForm = (
  formData = {}
) => {
  const errors = {};

  const emailError = validateEmail(
    formData.email,
    true
  );

  const passwordError = validatePassword(
    formData.password,
    {
      required: true,
    }
  );

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};


// ============================================================
// REGISTER VALIDATION
// ============================================================

/**
 * Validate registration form.
 */
export const validateRegisterForm = (
  formData = {}
) => {
  const errors = {};

  const nameError = validateName(
    formData.name,
    {
      required: true,
    }
  );

  const emailError = validateEmail(
    formData.email,
    true
  );

  const passwordError = validatePassword(
    formData.password,
    {
      required: true,
    }
  );

  const confirmPasswordError =
    validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

  if (nameError) {
    errors.name = nameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  if (confirmPasswordError) {
    errors.confirmPassword =
      confirmPasswordError;
  }

  return errors;
};


// ============================================================
// LAB FORM VALIDATION
// ============================================================

/**
 * Validate lab form.
 */
export const validateLabForm = (
  formData = {}
) => {
  const errors = {};

  const nameError = validateLabName(
    formData.name
  );

  const codeError = validateLabCode(
    formData.code,
    false
  );

  const locationError =
    validateLocation(
      formData.location,
      false
    );

  const descriptionError =
    validateDescription(
      formData.description,
      {
        required: false,
      }
    );

  if (nameError) {
    errors.name = nameError;
  }

  if (codeError) {
    errors.code = codeError;
  }

  if (locationError) {
    errors.location = locationError;
  }

  if (descriptionError) {
    errors.description =
      descriptionError;
  }

  return errors;
};


// ============================================================
// COMPUTER FORM VALIDATION
// ============================================================

/**
 * Validate computer form.
 */
export const validateComputerForm = (
  formData = {}
) => {
  const errors = {};

  const nameError =
    validateComputerName(
      formData.name
    );

  const hostnameError =
    validateHostname(
      formData.hostname
    );

  const ipError =
    validateIPAddress(
      formData.ipAddress ??
        formData.ip_address,
      false
    );

  const powerError =
    validatePower(
      formData.powerWatts ??
        formData.power_watts ??
        formData.power,
      true
    );

  if (nameError) {
    errors.name = nameError;
  }

  if (hostnameError) {
    errors.hostname =
      hostnameError;
  }

  if (ipError) {
    errors.ipAddress = ipError;
  }

  if (powerError) {
    errors.powerWatts = powerError;
  }

  return errors;
};


// ============================================================
// SETTINGS VALIDATION
// ============================================================

/**
 * Validate GreenCompute settings.
 */
export const validateSettings = (
  settings = {}
) => {
  const errors = {};

  const monitoringError =
    validateMonitoringInterval(
      settings.monitoringInterval
    );

  const idleThresholdError =
    validateIdleThreshold(
      settings.idleThreshold
    );

  const sleepAfterError =
    validateSleepAfter(
      settings.sleepAfter
    );

  const shutdownAfterError =
    validateShutdownAfter(
      settings.shutdownAfter
    );

  const powerError =
    validatePower(
      settings.defaultPower,
      true
    );

  const rateError =
    validateElectricityRate(
      settings.electricityRate,
      true
    );

  const emissionError =
    validateEmissionFactor(
      settings.emissionFactor,
      true
    );

  if (monitoringError) {
    errors.monitoringInterval =
      monitoringError;
  }

  if (idleThresholdError) {
    errors.idleThreshold =
      idleThresholdError;
  }

  if (sleepAfterError) {
    errors.sleepAfter =
      sleepAfterError;
  }

  if (shutdownAfterError) {
    errors.shutdownAfter =
      shutdownAfterError;
  }

  if (powerError) {
    errors.defaultPower =
      powerError;
  }

  if (rateError) {
    errors.electricityRate =
      rateError;
  }

  if (emissionError) {
    errors.emissionFactor =
      emissionError;
  }

  return errors;
};


// ============================================================
// REPORT FORM VALIDATION
// ============================================================

/**
 * Validate report generation form.
 */
export const validateReportForm = (
  formData = {}
) => {
  const errors = {};

  if (isEmpty(formData.reportType)) {
    errors.reportType =
      "Report type is required.";
  }

  if (isEmpty(formData.period)) {
    errors.period =
      "Report period is required.";
  }

  if (
    formData.startDate &&
    formData.endDate
  ) {
    const dateError =
      validateDateRange(
        formData.startDate,
        formData.endDate
      );

    if (dateError) {
      errors.dateRange = dateError;
    }
  }

  return errors;
};


// ============================================================
// FORM HELPERS
// ============================================================

/**
 * Check whether a form has validation errors.
 */
export const hasErrors = (
  errors = {}
) => {
  return Object.keys(errors).length > 0;
};

/**
 * Get first validation error.
 */
export const getFirstError = (
  errors = {}
) => {
  const keys = Object.keys(errors);

  if (keys.length === 0) {
    return "";
  }

  return errors[keys[0]];
};

/**
 * Remove empty validation errors.
 */
export const cleanErrors = (
  errors = {}
) => {
  return Object.fromEntries(
    Object.entries(errors).filter(
      ([, value]) =>
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
    )
  );
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  isEmpty,
  isRequired,
  sanitizeText,

  isValidEmail,
  validateEmail,

  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  isValidPassword,
  validatePassword,
  getPasswordStrength,
  validateConfirmPassword,

  validateName,

  isValidPhone,
  validatePhone,

  isValidURL,
  validateURL,

  isValidNumber,
  validateNumber,

  validatePower,
  validateElectricityRate,
  validateEmissionFactor,
  validateEnergy,

  validateMonitoringInterval,
  validateIdleThreshold,
  validateSleepAfter,
  validateShutdownAfter,

  validateLabName,
  validateLabCode,
  validateLocation,

  validateComputerName,
  validateHostname,
  isValidIPv4,
  validateIPAddress,

  validateDescription,

  isValidDate,
  validateDate,
  validateDateRange,

  isValidTime,
  validateTime,

  validateLoginForm,
  validateRegisterForm,
  validateLabForm,
  validateComputerForm,
  validateSettings,
  validateReportForm,

  hasErrors,
  getFirstError,
  cleanErrors,
};