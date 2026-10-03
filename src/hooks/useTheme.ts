import { useEffect, useState } from "react";
type Theme = "light" | "dark";
function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem("portfolio-theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}
export function useTheme() {
  const [preference, setPreference] = useState<Theme | null>(storedTheme);
  const [systemDark, setSystemDark] = useState(
    () => matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const theme = preference ?? (systemDark ? "dark" : "light");
  useEffect(() => {
    const query = matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setPreference(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {
      /* Theme works without storage. */
    }
  }
  return { theme, toggleTheme };
}
