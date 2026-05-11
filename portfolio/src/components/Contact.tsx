"use client";

import { useEffect, useRef } from "react";

const socials = [
  { label: "GitHub", href: "https://github.com/HACKOSAN" },
  { label: "Instagram", href: "https://www.instagram.com/kha1tek/" },
  { label: "TikTok", href: "https://www.tiktok.com/@kha1tek" },
  { label: "Entrotech", href: "https://entrotech.co" },
];

export function Contact() {
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
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-44 px-5 md:px-12 lg:px-20 opacity-0"
    >
      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50 mb-6 md:mb-8">
        Contact
      </p>

      <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.9]">
        Let&apos;s build
        <br />
        something great.
      </h2>

      <div className="mt-12 md:mt-16">
        <a
          href="https://wa.me/9647806565094"
          target="_blank"
          rel="noopener noreferrer"
          className="group text-base md:text-xl font-light opacity-70 hover:opacity-100 border-b border-current/20 hover:border-current pb-2 inline-flex items-center gap-3 transition-all"
        >
          Message me on WhatsApp
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </a>
      </div>

      <div className="flex flex-wrap gap-5 md:gap-8 mt-8 md:mt-10">
        {socials.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50 hover:opacity-100 transition-opacity"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
