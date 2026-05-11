"use client";

import { useEffect, useRef, lazy, Suspense } from "react";

const DotField = lazy(() =>
  import("./DotField").then((m) => ({ default: m.DotField }))
);

export function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h1 = h1Ref.current;
    const sub = subRef.current;
    if (h1) {
      h1.style.transform = "translateY(100%)";
      requestAnimationFrame(() => {
        h1.style.transition = "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)";
        h1.style.transform = "translateY(0)";
      });
    }
    if (sub) {
      sub.style.opacity = "0";
      sub.style.transform = "translateY(30px)";
      setTimeout(() => {
        sub.style.transition =
          "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)";
        sub.style.opacity = "1";
        sub.style.transform = "translateY(0)";
      }, 600);
    }
  }, []);

  return (
    <section className="min-h-svh flex flex-col justify-center px-5 md:px-12 lg:px-20 pt-20 relative">
      <div className="flex items-center">
        <div className="flex-1 min-w-0">
          <div className="overflow-hidden">
            <h1
              ref={h1Ref}
              className="text-[22vw] sm:text-[18vw] md:text-[14vw] lg:text-[11vw] font-black leading-[0.85] tracking-[-0.04em] uppercase"
            >
              Hacko
            </h1>
          </div>

          <div ref={subRef} className="max-w-xl mt-8 md:mt-10">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 md:mb-5 opacity-50">
              Developer & Founder
            </p>
            <p className="text-lg md:text-2xl leading-relaxed font-light opacity-70">
              18-year-old full-stack developer from Iraq. Building production
              systems since 12. Founder of{" "}
              <a
                href="https://entrotech.co"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-100 font-normal border-b border-current/30 hover:border-current transition-colors"
              >
                Entrotech
              </a>
              .
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <a
              href="#work"
              className="group text-sm font-medium border-b border-current pb-2 inline-flex items-center gap-2 hover:gap-4 transition-all"
            >
              See my work
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="hidden lg:block w-[40%] h-[70vh] shrink-0">
          <Suspense fallback={null}>
            <DotField />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
