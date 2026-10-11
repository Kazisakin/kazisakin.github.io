'use client';
import React, { useEffect, useRef, useState } from 'react';

// "What I do" as a live system diagram: Design → Frontend → API → Database,
// with Testing and Machine learning plugged in. Small dots show data moving.
// While pinned, scrolling steps through each part; hover, focus or tap to pick one.

type Key = 'design' | 'front' | 'test' | 'ml' | 'api' | 'db';

const NODES: Record<Key, { label: string; sub: string; tools: string }> = {
  design: { label: 'UI Design', sub: 'Figma', tools: 'Figma, Photoshop, Illustrator. Brand identity and interface design.' },
  front: { label: 'Frontend', sub: 'Next.js · React', tools: 'Next.js, React, TypeScript. Responsive, accessible web applications.' },
  test: { label: 'Testing', sub: 'Postman · Selenium', tools: 'Postman, ReadyAPI, Selenium, JUnit 5. API, UI and unit testing.' },
  ml: { label: 'Machine learning', sub: 'Python · PyTorch', tools: 'Python, PyTorch, scikit-learn. NLP, classification and privacy-preserving models.' },
  api: { label: 'API', sub: 'Spring Boot · FastAPI', tools: 'Spring Boot, FastAPI, Flask. RESTful services and business logic.' },
  db: { label: 'Database', sub: 'PostgreSQL', tools: 'PostgreSQL, SQL, Prisma. Data modelling and storage.' },
};
const ORDER: Key[] = ['design', 'front', 'api', 'db', 'test', 'ml'];
const EDGES: [Key, Key][] = [
  ['design', 'front'],
  ['front', 'api'],
  ['api', 'db'],
  ['test', 'front'],
  ['test', 'api'],
  ['ml', 'api'],
];

type Layout = { vw: number; vh: number; w: number; h: number; pos: Record<Key, { x: number; y: number }> };
const WIDE: Layout = {
  vw: 760, vh: 300, w: 200, h: 80,
  pos: { design: { x: 20, y: 30 }, front: { x: 280, y: 30 }, test: { x: 540, y: 30 }, ml: { x: 20, y: 190 }, api: { x: 280, y: 190 }, db: { x: 540, y: 190 } },
};
const NARROW: Layout = {
  vw: 340, vh: 440, w: 150, h: 78,
  pos: { design: { x: 10, y: 14 }, front: { x: 180, y: 14 }, test: { x: 10, y: 180 }, api: { x: 180, y: 180 }, ml: { x: 10, y: 346 }, db: { x: 180, y: 346 } },
};

function edgePath(L: Layout, a: Key, b: Key) {
  const A = L.pos[a], B = L.pos[b];
  const ca = { x: A.x + L.w / 2, y: A.y + L.h / 2 }, cb = { x: B.x + L.w / 2, y: B.y + L.h / 2 };
  const dx = cb.x - ca.x, dy = cb.y - ca.y;
  let x1, y1, x2, y2;
  if (Math.abs(dx) * L.h > Math.abs(dy) * L.w) {
    const s = Math.sign(dx);
    x1 = ca.x + (s * L.w) / 2; y1 = ca.y; x2 = cb.x - (s * L.w) / 2; y2 = cb.y;
    if (y1 === y2) return `M${x1},${y1} L${x2},${y2}`;
    const mx = (x1 + x2) / 2;
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
  }
  const s = Math.sign(dy);
  x1 = ca.x; y1 = ca.y + (s * L.h) / 2; x2 = cb.x; y2 = cb.y - (s * L.h) / 2;
  if (x1 === x2) return `M${x1},${y1} L${x2},${y2}`;
  const my = (y1 + y2) / 2;
  return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
}

export default function SystemMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  const [narrow, setNarrow] = useState(false);
  const [active, setActive] = useState<Key>('front');
  const touched = useRef(false);
  const L = narrow ? NARROW : WIDE;

  // pick the layout from the available width
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setNarrow(e.contentRect.width < 620));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // moving data dots + auto-cycle while on screen
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, visible = false;
    const place = (t: number) => {
      EDGES.forEach((_, i) => {
        const p = paths.current[i], c = dots.current[i];
        if (!p || !c) return;
        const len = p.getTotalLength();
        const f = (t * (0.00018 + (i % 3) * 0.00004) + i * 0.17) % 1;
        const pt = p.getPointAtLength(f * len);
        c.setAttribute('cx', String(pt.x));
        c.setAttribute('cy', String(pt.y));
      });
    };
    const loop = (t: number) => {
      if (visible) place(t);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(el);
    if (reduce) place(2000);
    else raf = requestAnimationFrame(loop);
    // the page's scroll animation tells the map which part to highlight
    const onStep = (e: Event) => {
      if (touched.current) return;
      const n = (e as CustomEvent<number>).detail;
      setActive(ORDER[Math.max(0, Math.min(ORDER.length - 1, n))]);
    };
    window.addEventListener('kv-map-step', onStep);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('kv-map-step', onStep);
      io.disconnect();
    };
  }, [narrow]);

  const pick = (k: Key) => {
    touched.current = true;
    setActive(k);
  };

  const n = NODES[active];
  return (
    <div ref={wrap} className="kv-map rounded-[1.5rem] px-3 pb-6 pt-5 sm:px-6 sm:pt-6">
      <svg
        viewBox={`0 0 ${L.vw} ${L.vh}`}
        className="block h-auto w-full"
        role="group"
        aria-label="My skills as a system: UI Design feeds the Frontend, the Frontend calls the API, the API uses the Database, Testing checks the Frontend and API, Machine learning connects to the API."
      >
        {EDGES.map(([a, b], i) => (
          <path
            key={`${a}-${b}`}
            ref={(el) => {
              paths.current[i] = el;
            }}
            d={edgePath(L, a, b)}
            pathLength={1}
            className={`kv-map-edge ${a === active || b === active ? 'is-lit' : ''}`}
          />
        ))}
        {EDGES.map(([a], i) => (
          <circle
            key={`dot-${i}`}
            ref={(el) => {
              dots.current[i] = el;
            }}
            r={4}
            className={a === 'test' ? 'kv-map-dot gold' : 'kv-map-dot'}
          />
        ))}
        {(Object.keys(NODES) as Key[]).map((k) => {
          const p = L.pos[k];
          return (
            <g
              key={k}
              className={`kv-map-node ${k === active ? 'is-active' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={k === active}
              aria-label={`${NODES[k].label}: ${NODES[k].tools}`}
              onMouseEnter={() => pick(k)}
              onFocus={() => pick(k)}
              onClick={() => pick(k)}
            >
              <rect x={p.x} y={p.y} width={L.w} height={L.h} rx={14} />
              <text x={p.x + 16} y={p.y + 34} className="kv-map-label">
                {NODES[k].label}
              </text>
              <text x={p.x + 16} y={p.y + 58} className="kv-map-sub">
                {NODES[k].sub}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="kv-map-caption mx-auto mt-4 max-w-2xl px-2 text-center text-[1.0625rem] leading-relaxed" aria-live="polite">
        <b>{n.label}:</b> {n.tools}
      </p>
    </div>
  );
}
