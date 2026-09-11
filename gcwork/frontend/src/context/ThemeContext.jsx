/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const ThemeContext = createContext(null);

const THEME_KEY = "greencompute_theme";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  // Use system preference if no saved theme exists
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDark ? "dark" : "light";
};

const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme);

  /*
   * Apply theme to the HTML document.
   */
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  /*
   * Change theme.
   */
  const setTheme = useCallback((newTheme) => {
    if (newTheme !== "light" && newTheme !== "dark") {
      console.warn(
        'Theme must be either "light" or "dark".'
      );
      return;
    }

    setThemeState(newTheme);
  }, []);

  /*
   * Toggle between light and dark mode.
   */
  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  }, []);

  /*
   * Check whether dark mode is active.
   */
  const isDark = theme === "dark";

  /*
   * Context value.
   */
  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark,
    }),
    [theme, setTheme, toggleTheme, isDark]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;