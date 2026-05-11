"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "6+", label: "Years coding" },
  { value: "18", label: "Years old" },
  { value: "113", label: "Features shipped" },
  { value: "3", label: "Production apps" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-44 px-5 md:px-12 lg:px-20 opacity-0"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-24">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50 mb-6 md:mb-8">
            About
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
            Self-taught.
            <br />
            Production-hardened.
          </h2>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-base md:text-xl leading-relaxed font-light opacity-70">
            I got my first laptop at 4 and started programming at 12. By 17, I
            founded Entrotech — a software company delivering real systems for
            real businesses.
          </p>
          <p className="text-base md:text-xl leading-relaxed font-light opacity-70 mt-5 md:mt-6">
            I specialize in full-stack web applications, game development,
            cybersecurity, and Linux. Fluent in Arabic and English, with some
            Turkish.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 md:mt-20 border border-current/10">
        {stats.map((s) => (
          <div key={s.label} className="p-6 md:p-12 text-center">
            <div className="text-4xl md:text-6xl font-black tracking-tight">
              {s.value}
            </div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium opacity-50 mt-2 md:mt-3">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
