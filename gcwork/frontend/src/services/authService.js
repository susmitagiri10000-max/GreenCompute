import api from "./api";

/*
 * Login user
 *
 * Backend:
 * POST /api/auth/login
 */
export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response;
};

/*
 * Register a new user
 *
 * Backend:
 * POST /api/auth/register
 */
export const register = async (userData) => {
  const response = await api.post(
    "/api/auth/register",
    userData
  );

  return response;
};

/*
 * Get currently authenticated user
 *
 * Backend:
 * GET /api/auth/me
 */
export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");

  return response;
};

/*
 * Refresh access token
 *
 * Backend:
 * POST /api/auth/refresh
 */
export const refreshToken = async (refreshTokenValue) => {
  const response = await api.post(
    "/api/auth/refresh",
    {
      refresh_token: refreshTokenValue,
    }
  );

  return response;
};

/*
 * Logout user
 *
 * Backend:
 * POST /api/auth/logout
 */
export const logout = async () => {
  try {
    const response = await api.post("/api/auth/logout");

    return response;
  } catch (error) {
    /*
     * Even if backend logout fails,
     * frontend can still clear local authentication.
     */
    console.error("Logout API failed:", error);

    return null;
  }
};

/*
 * Change password
 *
 * Backend:
 * POST /api/auth/change-password
 */
export const changePassword = async (
  currentPassword,
  newPassword
) => {
  const response = await api.post(
    "/api/auth/change-password",
    {
      current_password: currentPassword,
      new_password: newPassword,
    }
  );

  return response;
};

/*
 * Forgot password
 *
 * Backend:
 * POST /api/auth/forgot-password
 */
export const forgotPassword = async (email) => {
  const response = await api.post(
    "/api/auth/forgot-password",
    {
      email,
    }
  );

  return response;
};

/*
 * Reset password
 *
 * Backend:
 * POST /api/auth/reset-password
 */
export const resetPassword = async (
  token,
  newPassword
) => {
  const response = await api.post(
    "/api/auth/reset-password",
    {
      token,
      new_password: newPassword,
    }
  );

  return response;
};

/*
 * Check whether user has a stored token
 */
export const hasToken = () => {
  return Boolean(
    localStorage.getItem("greencompute_token")
  );
};

/*
 * Get stored authentication token
 */
export const getStoredToken = () => {
  return localStorage.getItem("greencompute_token");
};

/*
 * Get stored user
 */
export const getStoredUser = () => {
  const storedUser =
    localStorage.getItem("greencompute_user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

/*
 * Clear local authentication data
 */
export const clearAuthData = () => {
  localStorage.removeItem("greencompute_token");
  localStorage.removeItem("greencompute_user");
};