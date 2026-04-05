"use client";

import { useEffect, useRef } from "react";

export default function ShimmerCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w: number, h: number;
    let particles: {
      x: number; y: number; size: number;
      speedX: number; speedY: number;
      opacity: number; opacitySpeed: number; opacityDir: number;
      hue: number;
    }[] = [];
    let animId: number;

    function resize() {
      w = canvas!.width = canvas!.offsetWidth;
      h = canvas!.height = canvas!.offsetHeight;
      particles = [];
      const count = Math.floor((w * h) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w, y: Math.random() * h,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.1 - 0.05,
          opacity: Math.random(),
          opacitySpeed: Math.random() * 0.008 + 0.002,
          opacityDir: 1,
          hue: Math.random() * 30 + 25,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.speedX; p.y += p.speedY;
        p.opacity += p.opacitySpeed * p.opacityDir;
        if (p.opacity >= 1) { p.opacityDir = -1; p.opacity = 1; }
        if (p.opacity <= 0) { p.opacityDir = 1; p.opacity = 0; }
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${p.hue}, 50%, 70%, ${p.opacity * 0.4})`;
        ctx!.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
}
