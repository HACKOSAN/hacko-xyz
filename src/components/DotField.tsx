"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "./ThemeProvider";

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const spacing = 28;
    const radius = 1.5;
    const influenceRadius = 120;
    const maxDisplace = 14;
    const connectionDist = 55;

    let dots: { baseX: number; baseY: number; x: number; y: number }[] = [];
    let w = 0;
    let h = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const offsetX = (w - (cols - 1) * spacing) / 2;
      const offsetY = (h - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            baseX: offsetX + c * spacing,
            baseY: offsetY + r * spacing,
            x: offsetX + c * spacing,
            y: offsetY + r * spacing,
          });
        }
      }
    }

    function draw() {
      const isDark = themeRef.current === "dark";
      const dotColor = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";
      const lineColor = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";

      ctx!.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const dot of dots) {
        const dx = mx - dot.baseX;
        const dy = my - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) ** 2;
          const angle = Math.atan2(dy, dx);
          dot.x += (dot.baseX - Math.cos(angle) * maxDisplace * force - dot.x) * 0.15;
          dot.y += (dot.baseY - Math.sin(angle) * maxDisplace * force - dot.y) * 0.15;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.08;
          dot.y += (dot.baseY - dot.y) * 0.08;
        }
      }

      // draw connections near mouse
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const distToMouse = Math.sqrt(
          (mx - a.x) ** 2 + (my - a.y) ** 2
        );
        if (distToMouse > influenceRadius * 1.3) continue;

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < connectionDist) {
            const alpha = (1 - d / connectionDist) * 0.15 * (1 - distToMouse / (influenceRadius * 1.3));
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = lineColor + alpha.toFixed(3) + ")";
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // draw dots
      for (const dot of dots) {
        const distToMouse = Math.sqrt(
          (mx - dot.x) ** 2 + (my - dot.y) ** 2
        );
        const proximity = Math.max(0, 1 - distToMouse / influenceRadius);
        const alpha = 0.12 + proximity * 0.6;
        const r = radius + proximity * 1.5;

        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = dotColor + alpha.toFixed(3) + ")";
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }

    function onLeave() {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    }

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    canvas!.addEventListener("mousemove", onMove);
    canvas!.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas!.removeEventListener("mousemove", onMove);
      canvas!.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
