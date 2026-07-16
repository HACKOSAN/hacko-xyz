"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const projects = [
  {
    number: "01",
    name: "Mars Coffee House",
    role: "Full System — Design, Dev, Deploy",
    description:
      "Complete digital ordering platform for a coffee chain in Iraq. Public menu app with multilingual support (EN/AR/KU), admin dashboard, and cashier POS. 113 features across 3 production apps.",
    tech: "React / Firebase / Vite / Material UI / ImageKit / Vercel",
    url: "https://marscoffeehouse.com",
    logo: "https://ik.imagekit.io/marsassests/mars-menu/logos/4.png?updatedAt=1769964828248",
  },
  {
    number: "02",
    name: "Entrotech",
    role: "Founder & Lead Developer",
    description:
      "My software company. Building digital experiences and production-grade systems for businesses. From concept to deployment — full service.",
    tech: "Next.js / TypeScript / Tailwind / Firebase / Vercel",
    url: "https://entrotech.co",
  },
  {
    number: "03",
    name: "Open Source & Experiments",
    role: "Various — Games, Security, Tools",
    description:
      "Game development projects, cybersecurity tools, Linux utilities, and web experiments. Always shipping, always learning.",
    tech: "Python / C++ / Rust / JavaScript / Linux",
    url: "https://github.com/HACKOSAN",
  },
];

export function Work() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-20 md:py-44 px-5 md:px-12 lg:px-20 opacity-0"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50 mb-12 md:mb-16">
        Selected Work
      </p>

      <div className="space-y-0 border-t border-current/10">
        {projects.map((project) => (
          <a
            key={project.number}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-b border-current/10 py-8 md:py-16 transition-colors hover:opacity-80"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-40 shrink-0 pt-1">
                {project.number}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    {project.logo && (
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={48}
                        height={48}
                        className="rounded-lg shrink-0 md:w-14 md:h-14"
                      />
                    )}
                    <div className="min-w-0">
                      <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
                        {project.name}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50 mt-2">
                        {project.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-xl md:text-2xl opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 shrink-0 mt-1 md:mt-2">
                    ↗
                  </span>
                </div>

                <p className="text-sm md:text-base font-light opacity-60 leading-relaxed mt-4 md:mt-6 max-w-2xl">
                  {project.description}
                </p>

                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-medium opacity-40 mt-4 md:mt-6">
                  {project.tech}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
