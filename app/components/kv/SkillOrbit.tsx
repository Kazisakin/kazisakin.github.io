'use client';
import { useEffect, useRef, useState } from 'react';

// Skills as an orbit: five rings of tools circle a central core.
// KvMotion pins the section and sends scroll progress (0–1) through the `kv-orbit` event.
// The rings turn with the scroll and light up one skill area at a time; scrolling up reverses it.

const AREAS = [
  { name: 'UI Design', c: '#f2b84b', line: 'Brand identity and interface design.', tools: ['Figma', 'Photoshop', 'Illustrator'] },
  { name: 'Frontend', c: '#60a5fa', line: 'Responsive, accessible web applications.', tools: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
  { name: 'Backend', c: '#a78bfa', line: 'RESTful services and business logic.', tools: ['Spring Boot', 'FastAPI', 'Flask', 'REST APIs'] },
  { name: 'Testing', c: '#34d399', line: 'API, UI and unit testing.', tools: ['Postman', 'ReadyAPI', 'Selenium', 'JUnit 5'] },
  { name: 'Data & ML', c: '#22d3ee', line: 'Databases, NLP and classification models.', tools: ['PostgreSQL', 'Prisma', 'Python', 'PyTorch', 'scikit-learn'] },
];

const CHIPS = AREAS.flatMap((a, k) =>
  a.tools.map((t, j) => ({ t, k, c: a.c, base: (j / a.tools.length) * 360 + k * 41 + (k % 2) * 18 }))
);

export default function SkillOrbit() {
  const box = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(560);

  // size the orbit to the space available
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setSize(Math.round(Math.min(el.clientWidth * (el.clientWidth < 600 ? 0.74 : 0.8), window.innerHeight * 0.58, 640)));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  // scroll progress → rotation and active ring
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let target = 0;
    let p = 0;
    let raf = 0;
    let visible = false;
    let last = performance.now();
    let drift = 0;
    let shown = -1;
    const radius = (k: number) => size * (0.19 + 0.072 * k);

    const draw = () => {
      CHIPS.forEach((c, i) => {
        const node = chipRefs.current[i];
        if (!node) return;
        const dir = c.k % 2 ? -1 : 1;
        const a = c.base + dir * (p * 170 * (1 - c.k * 0.1) + drift);
        node.style.transform = `translate(-50%, -50%) rotate(${a}deg) translate(${radius(c.k)}px) rotate(${-a}deg)`;
      });
      const now = Math.min(AREAS.length - 1, Math.floor(p * AREAS.length * 0.999));
      if (now !== shown) {
        shown = now;
        setActive(now);
      }
    };

    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      p += (target - p) * Math.min(1, dt * 8);
      if (!still) drift += dt * 2.5;
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onProgress = (e: Event) => {
      target = Math.min(1, Math.max(0, (e as CustomEvent<number>).detail));
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(el);
    window.addEventListener('kv-orbit', onProgress);
    draw();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('kv-orbit', onProgress);
    };
  }, [size]);

  const area = AREAS[active];
  return (
    <div ref={box} className="kv-orbit-box">
      <div className="kv-orbit" style={{ width: size, height: size, '--S': `${size}px` } as React.CSSProperties} aria-hidden="true">
        {AREAS.map((a, k) => (
          <span
            key={a.name}
            className={`kv-orbit-ring ${k === active ? 'is-on' : ''}`}
            style={{ width: size * (0.19 + 0.072 * k) * 2, height: size * (0.19 + 0.072 * k) * 2, '--c': a.c } as React.CSSProperties}
          />
        ))}
        {CHIPS.map((c, i) => (
          <span
            key={c.t}
            ref={(n) => {
              chipRefs.current[i] = n;
            }}
            className={`kv-orbit-chip ${c.k === active ? 'is-on' : ''}`}
            style={{ '--c': c.c } as React.CSSProperties}
          >
            {c.t}
          </span>
        ))}
        <div className="kv-orbit-core" style={{ '--c': area.c } as React.CSSProperties}>
          <div>
            <b key={area.name}>{area.name}</b>
            <small>{area.tools.length} tools</small>
          </div>
        </div>
      </div>
      <p className="kv-orbit-line" key={area.line} style={{ '--c': area.c } as React.CSSProperties}>
        <b>{area.name}:</b> {area.line}
      </p>
      <div className="kv-orbit-steps" aria-hidden="true">
        {AREAS.map((a, k) => (
          <i key={a.name} className={k <= active ? 'is-on' : ''} style={{ '--c': a.c } as React.CSSProperties} />
        ))}
      </div>
      {/* the full list for screen readers */}
      <ul className="sr-only">
        {AREAS.map((a) => (
          <li key={a.name}>
            {a.name}: {a.tools.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
