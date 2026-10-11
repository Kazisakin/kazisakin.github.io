'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from './motionState';

// Abstract 3D "wave" of dots behind the hero text.
// The surface ripples slowly and lifts toward the cursor. Drawn on a canvas, no libraries.
// `horizon` = how far down the canvas the wave sits (0 top, 1 bottom); `className` picks the mask style.
// `followScroll` lets the hero's scroll animation fly the camera into the dots.
export default function HeroField({
  horizon = 0.68,
  className = '',
  followScroll = false,
}: {
  horizon?: number;
  className?: string;
  followScroll?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const target = { x: 0.35, y: 0.2 };
    const cur = { x: 0.35, y: 0.2 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;

      const small = w < 640;
      const cols = small ? 34 : 64;
      const rows = small ? 20 : 30;
      const zoom = followScroll ? motion.heroZoom : 0;
      const tilt = 0.42 + zoom * 0.5; // camera looks down at the surface, steeper as you scroll
      const ca = Math.cos(tilt), sa = Math.sin(tilt);
      const yaw = (cur.x - 0.5) * 0.35 + zoom * 0.25;
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const D = 2.6 - zoom * 1.6; // camera flies toward the dots
      const f = Math.max(w, h) * 0.9;
      const horizonY = h * (small ? Math.min(horizon + 0.1, 0.9) : horizon) - zoom * h * 0.25;
      // where the cursor sits on the surface
      const mx = (cur.x * 2 - 1) * 1.8;
      const mz = (1 - cur.y) * 2 - 1;

      for (let r = 0; r < rows; r++) {
        const z = (r / (rows - 1)) * 2 - 1; // -1 near, 1 far
        for (let c = 0; c < cols; c++) {
          const x = ((c / (cols - 1)) * 2 - 1) * 1.8;
          const dx = x - mx, dz = z - mz;
          const bump = Math.exp(-(dx * dx + dz * dz) * 3);
          const y =
            0.09 * Math.sin(x * 2.3 + t * 0.0008) +
            0.08 * Math.cos(z * 3.1 + t * 0.0006) +
            0.22 * bump;

          // turn with the cursor, then tilt toward the viewer
          const x1 = x * cy - z * sy;
          const z1 = x * sy + z * cy;
          const y2 = y * ca + z1 * sa;
          const z2 = -y * sa + z1 * ca;
          const d = z2 + D;
          if (d <= 0.15) continue;

          const px = w / 2 + (x1 * f) / d;
          const py = horizonY - (y2 * f) / d;
          if (px < -10 || px > w + 10 || py < -10 || py > h + 10) continue;

          const near = 1 - (z + 1) / 2;
          const size = Math.min(4.5, Math.max(0.7, (2.4 * D) / d)) * (small ? 0.8 : 1);
          ctx.globalAlpha = Math.min(0.9, 0.12 + near * 0.45 + bump * 0.5);
          ctx.fillStyle = bump > 0.35 ? '#dbeafe' : '#9cc3f5';
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY > r.bottom) return;
      target.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      target.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(canvas);

    if (reduce) draw(0);
    else {
      window.addEventListener('pointermove', onPointer, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, [horizon, followScroll]);

  return (
    <div className={`kv-field ${className}`} aria-hidden="true">
      <canvas ref={ref} className="block h-full w-full" />
    </div>
  );
}
