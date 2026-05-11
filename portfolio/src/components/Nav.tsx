"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export function Nav() {
  const [time, setTime] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Baghdad",
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="fixed top-0 w-full px-5 md:px-12 py-5 md:py-6 flex justify-between items-start text-[10px] uppercase tracking-[0.2em] font-medium z-50 mix-blend-difference text-white">
      <div>
        <a href="#" className="hover:opacity-60 transition-opacity">
          Hacko
        </a>
      </div>

      <div className="hidden md:flex gap-10">
        {["Work", "About", "Expertise", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:opacity-60 transition-opacity"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-start gap-5">
        <div className="text-right">
          <div className="hidden sm:block">Kirkuk, Iraq</div>
          <div className="mt-0 sm:mt-1 tabular-nums">{time}</div>
          <button
            onClick={toggle}
            className="mt-2 hover:opacity-60 transition-opacity"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "● Dark" : "○ Light"}
          </button>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden hover:opacity-60 transition-opacity text-sm leading-none mt-0.5"
          aria-label="Menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md md:hidden flex flex-col px-5 py-6 gap-5 mix-blend-normal text-white">
          {["Work", "About", "Expertise", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
