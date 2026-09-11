import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

// The context and provider intentionally live together in this module.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

const TOKEN_KEY = "greencompute_token";
const USER_KEY = "greencompute_user";

const getStoredAuth = () => {
  try {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    let user = null;
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }

    return { token: storedToken, user };
  } catch (error) {
    console.error("Failed to restore authentication:", error);
    return { token: null, user: null };
  }
};

const AuthProvider = ({ children }) => {
  const [{ token, user }, setAuth] = useState(getStoredAuth);
  const loading = false;

  /*
   * Login
   *
   * Backend authentication later will return:
   * {
   *   access_token: "...",
   *   user: {...}
   * }
   */
  const login = useCallback((accessToken, userData) => {
    try {
      localStorage.setItem(TOKEN_KEY, accessToken);

      if (userData) {
        localStorage.setItem(
          USER_KEY,
          JSON.stringify(userData)
        );
      }

      setAuth({ token: accessToken, user: userData || null });

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }, []);

  /*
   * Logout
   */
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      setAuth({ token: null, user: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  /*
   * Update user information
   */
  const updateUser = useCallback((userData) => {
    try {
      if (userData) {
        localStorage.setItem(
          USER_KEY,
          JSON.stringify(userData)
        );
      } else {
        localStorage.removeItem(USER_KEY);
      }

      setAuth((currentAuth) => ({
        token: currentAuth.token,
        user: userData || null,
      }));
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }, []);

  /*
   * Authentication status
   */
  const isAuthenticated = Boolean(token);

  /*
   * Context value
   */
  const contextValue = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated,
      login,
      logout,
      updateUser,
    }),
    [
      user,
      token,
      loading,
      isAuthenticated,
      login,
      logout,
      updateUser,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;