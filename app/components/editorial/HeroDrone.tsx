'use client';
import React, { useEffect, useRef } from 'react';

// A 3D wireframe quadcopter drawn on a <canvas> (no 3D library needed).
// It hovers, spins its propellers, tilts toward the cursor (or finger),
// and turns and rises as the page scrolls.

type V3 = [number, number, number];
type Seg = [V3, V3, 'frame' | 'accent'];

const ARM = 0.9;
const ROTOR_R = 0.36;
const ENDS: V3[] = [
  [ARM, 0.02, ARM],
  [-ARM, 0.02, ARM],
  [ARM, 0.02, -ARM],
  [-ARM, 0.02, -ARM],
];

function staticSegments(): Seg[] {
  const s: Seg[] = [];
  // Body: a flat box
  const bx = 0.32, by = 0.08, bz = 0.24;
  const c: V3[] = [];
  for (const x of [-bx, bx]) for (const y of [-by, by]) for (const z of [-bz, bz]) c.push([x, y, z]);
  for (let i = 0; i < 8; i++)
    for (let j = i + 1; j < 8; j++) {
      const d = [0, 1, 2].filter((k) => c[i][k] !== c[j][k]).length;
      if (d === 1) s.push([c[i], c[j], 'frame']);
    }
  // Arms, motors and propeller guards
  for (const e of ENDS) {
    s.push([[Math.sign(e[0]) * 0.22, 0, Math.sign(e[2]) * 0.16], e, 'frame']);
    s.push([[e[0], 0, e[2]], [e[0], 0.13, e[2]], 'frame']);
    const n = 28;
    for (let i = 0; i < n; i++) {
      const a1 = (i / n) * Math.PI * 2, a2 = ((i + 1) / n) * Math.PI * 2;
      s.push([
        [e[0] + Math.cos(a1) * ROTOR_R, 0.13, e[2] + Math.sin(a1) * ROTOR_R],
        [e[0] + Math.cos(a2) * ROTOR_R, 0.13, e[2] + Math.sin(a2) * ROTOR_R],
        'accent',
      ]);
    }
  }
  // Landing gear
  for (const x of [-0.22, 0.22]) {
    s.push([[x * 0.7, -0.08, -0.14], [x, -0.34, -0.14], 'frame']);
    s.push([[x * 0.7, -0.08, 0.14], [x, -0.34, 0.14], 'frame']);
    s.push([[x, -0.34, -0.32], [x, -0.34, 0.32], 'frame']);
  }
  // Camera at the front
  s.push([[0.32, -0.02, -0.07], [0.42, -0.06, 0], 'accent']);
  s.push([[0.32, -0.02, 0.07], [0.42, -0.06, 0], 'accent']);
  return s;
}

export default function HeroDrone() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const segs = staticSegments();
    let w = 0, h = 0, raf = 0, visible = true, frame = 0;
    let frameColor = '#fff', accentColor = '#93c5fd';
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };

    const readColors = () => {
      const cs = getComputedStyle(canvas);
      frameColor = cs.color;
      const acc = cs.getPropertyValue('--ed-accent').trim();
      accentColor = acc ? `rgb(${acc})` : frameColor;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      if (frame++ % 30 === 0) readColors();

      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      const scroll = Math.min(window.scrollY / 700, 1);

      const yaw = t * 0.00025 + cur.x * 0.7 + scroll * 1.6;
      const pitch = 0.42 + cur.y * 0.3 - scroll * 0.25;
      const roll = -cur.x * 0.35;
      const bob = Math.sin(t * 0.0016) * 0.06 + scroll * 0.35;
      const shiftX = cur.x * 0.3;

      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const cr = Math.cos(roll), sr = Math.sin(roll);
      const f = Math.min(w, h * 1.35) * (w < 500 ? 1.5 : 1.3);
      const dist = 4.2;

      const proj = (p: V3): [number, number, number] => {
        let [x, y, z] = p;
        // roll (z), then yaw (y), then pitch (x)
        let x1 = x * cr - y * sr, y1 = x * sr + y * cr;
        x = x1; y = y1;
        x1 = x * cy + z * sy; const z1 = -x * sy + z * cy;
        x = x1; z = z1;
        const y2 = y * cp - z * sp, z2 = y * sp + z * cp;
        y = y2 + bob; z = z2; x += shiftX;
        const d = z + dist;
        return [w / 2 + (x * f) / d, h / 2 - (y * f) / d, d];
      };

      const line = (a: V3, b: V3, color: string, width: number) => {
        const pa = proj(a), pb = proj(b);
        const depth = (pa[2] + pb[2]) / 2;
        ctx.globalAlpha = Math.max(0.25, Math.min(1, 1.9 - (depth - dist) * 0.9 - 0.55));
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.stroke();
      };

      const fillPoly = (pts: V3[], color: string, alpha: number) => {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        pts.forEach((p, i) => {
          const q = proj(p);
          if (i) ctx.lineTo(q[0], q[1]);
          else ctx.moveTo(q[0], q[1]);
        });
        ctx.closePath();
        ctx.fill();
      };

      // Tinted propeller discs (motion blur) and a solid top on the body
      for (const e of ENDS) {
        const pts: V3[] = [];
        for (let i = 0; i < 28; i++) {
          const a = (i / 28) * Math.PI * 2;
          pts.push([e[0] + Math.cos(a) * ROTOR_R, 0.13, e[2] + Math.sin(a) * ROTOR_R]);
        }
        fillPoly(pts, accentColor, 0.14);
      }
      fillPoly([[-0.32, 0.08, -0.24], [0.32, 0.08, -0.24], [0.32, 0.08, 0.24], [-0.32, 0.08, 0.24]], accentColor, 0.22);
      fillPoly([[-0.32, -0.08, 0.24], [0.32, -0.08, 0.24], [0.32, 0.08, 0.24], [-0.32, 0.08, 0.24]], frameColor, 0.08);

      ctx.lineCap = 'round';
      const scaleW = Math.max(1, Math.min(1.6, w / 420));
      for (const [a, b, kind] of segs)
        line(a, b, kind === 'accent' ? accentColor : frameColor, (kind === 'accent' ? 1.4 : 2.2) * scaleW);

      // Spinning propellers
      ENDS.forEach((e, i) => {
        const a = (reduce ? 0.6 : t * 0.03) * (i % 2 ? 1 : -1) + i;
        const dx = Math.cos(a) * ROTOR_R * 0.92, dz = Math.sin(a) * ROTOR_R * 0.92;
        line([e[0] - dx, 0.14, e[2] - dz], [e[0] + dx, 0.14, e[2] + dz], accentColor, 3 * scaleW);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
    };

    resize();
    readColors();
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(0); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(canvas);

    if (reduce) {
      draw(0);
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    const mo = new MutationObserver(() => { readColors(); if (reduce) draw(0); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="block h-full w-full text-ed-text" />;
}
