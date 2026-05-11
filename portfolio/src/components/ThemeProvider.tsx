"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; toggle: () => void };

const Ctx = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [shutterActive, setShutterActive] = useState(false);
  const [shutterColor, setShutterColor] = useState("#0D0D0D");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    applySelection(initial);
    setMounted(true);
  }, []);

  function applySelection(t: Theme) {
    const root = document.documentElement;
    if (t === "dark") {
      root.style.setProperty("--selection-bg", "#F2F2F2");
      root.style.setProperty("--selection-fg", "#0D0D0D");
    } else {
      root.style.setProperty("--selection-bg", "#0A0A0A");
      root.style.setProperty("--selection-fg", "#FAF9F6");
    }
  }

  const toggle = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    setShutterColor(next === "dark" ? "#0D0D0D" : "#FAF9F6");
    setShutterActive(true);

    setTimeout(() => {
      setTheme(next);
      applySelection(next);
      localStorage.setItem("theme", next);
    }, 350);

    setTimeout(() => setShutterActive(false), 750);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <Ctx.Provider value={{ theme, toggle }}>
      <div
        className={`shutter-overlay ${shutterActive ? "shutter-active" : ""}`}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shutter-blade"
            style={{ background: shutterColor }}
          />
        ))}
      </div>
      <div
        className="min-h-screen transition-colors duration-0"
        style={{
          background: mounted ? (isDark ? "#0D0D0D" : "#FAF9F6") : "#FAF9F6",
          color: mounted ? (isDark ? "#F2F2F2" : "#0A0A0A") : "#0A0A0A",
        }}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
}
