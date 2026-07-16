"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

const areas = [
  {
    title: "Web Applications",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Firebase",
      "Vite",
      "Vercel",
    ],
  },
  {
    title: "Game Development",
    items: ["C++", "Rust", "Python", "Game Engines", "Physics Systems"],
  },
  {
    title: "Cybersecurity",
    items: [
      "Penetration Testing",
      "Network Security",
      "CTF Competitions",
      "OSINT",
      "Reverse Engineering",
    ],
  },
  {
    title: "Infrastructure",
    items: ["Linux", "Docker", "Nginx", "Git", "CI/CD", "Shell Scripting"],
  },
];

export function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("fade-up");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="py-20 md:py-44 px-5 md:px-12 lg:px-20 opacity-0 transition-colors duration-0"
      style={{
        background: isDark ? "#F2F2F2" : "#0A0A0A",
        color: isDark ? "#0D0D0D" : "#FAF9F6",
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50 mb-12 md:mb-16">
        Expertise
      </p>

      <div className="grid md:grid-cols-2 gap-px">
        {areas.map((area) => (
          <div key={area.title} className="py-8 md:py-14 md:pr-16">
            <h3 className="text-xl md:text-3xl font-bold tracking-tight mb-5 md:mb-6">
              {area.title}
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {area.items.map((item) => (
                <span
                  key={item}
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.12em] font-medium px-3 md:px-4 py-1.5 md:py-2 border border-current/20 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
