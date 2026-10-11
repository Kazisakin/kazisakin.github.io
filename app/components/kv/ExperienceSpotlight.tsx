'use client';
import { useEffect, useRef, useState } from 'react';

// Experience as a spotlight: large outlined company names scroll past, the one in the
// centre fills with blue, and its role details fade in beside it.
// KvMotion pins the section and sends scroll progress (0–1) through the `kv-exp` event.

export type SpotItem = {
  name: string;
  title: string;
  promo?: string;
  period: string;
  location?: string;
  type: 'work' | 'volunteer';
  logo?: string;
};

export default function ExperienceSpotlight({ items }: { items: SpotItem[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const nameRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const target = useRef(0);
  const [active, setActive] = useState(0);
  const n = items.length;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let t = 0;
    let raf = 0;
    let last = performance.now();
    let shown = -1;
    let rowH = 0;
    const measure = () => {
      rowH = nameRefs.current[0]?.offsetHeight ?? 80;
    };
    measure();

    const draw = () => {
      list.style.transform = `translateY(${-t * rowH - rowH / 2}px)`;
      nameRefs.current.forEach((el, i) => {
        if (!el) return;
        const f = Math.min(1, Math.max(0, 1.5 - Math.abs(i - t) * 2.2));
        el.style.backgroundSize = `${f * 100}% 100%`;
        el.classList.toggle('is-on', f > 0.5);
      });
      const a = Math.round(t);
      if (a !== shown) {
        shown = a;
        setActive(a);
      }
    };
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += (target.current - t) * Math.min(1, dt * 9);
      draw();
      raf = Math.abs(target.current - t) > 0.0005 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };
    const onProgress = (e: Event) => {
      const p = Math.min(1, Math.max(0, (e as CustomEvent<number>).detail));
      target.current = Math.min(1, Math.max(0, (p - 0.04) / 0.88)) * (n - 1);
      kick();
    };
    const onResize = () => {
      measure();
      draw();
    };
    window.addEventListener('kv-exp', onProgress);
    window.addEventListener('kv-exp-pick', kick);
    window.addEventListener('resize', onResize);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('kv-exp', onProgress);
      window.removeEventListener('kv-exp-pick', kick);
      window.removeEventListener('resize', onResize);
    };
  }, [n]);

  // clicking a name brings it into the spotlight
  const pick = (i: number) => {
    target.current = i;
    window.dispatchEvent(new Event('kv-exp-pick'));
  };

  return (
    <div className="kv-spot">
      <div className="kv-spot-names">
        <div ref={listRef} className="kv-spot-list">
          {items.map((x, i) => (
            <button
              key={x.name}
              type="button"
              ref={(el) => {
                nameRefs.current[i] = el;
              }}
              className="kv-spot-name"
              onClick={() => pick(i)}
            >
              {x.name}
            </button>
          ))}
        </div>
      </div>
      <div className="kv-spot-detail" aria-live="polite">
        {items.map((x, i) => (
          <div key={x.name} className={`kv-spot-dt ${i === active ? 'is-on' : ''}`} aria-hidden={i !== active}>
            <div className="flex items-center gap-4">
              {x.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={x.logo} alt={`${x.name} logo`} className="kv-spot-logo" />
              ) : (
                <span className="kv-spot-logo kv-spot-initials">{x.name.split(' ').map((w) => w[0]).join('').slice(0, 3)}</span>
              )}
              <div>
                <p className="font-mono text-[0.8125rem] font-semibold text-kv-muted">
                  {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </p>
                <span className={`kv-spot-pill ${x.type === 'volunteer' ? 'is-vol' : ''}`}>{x.type === 'work' ? 'Work' : 'Volunteer'}</span>
              </div>
            </div>
            <h3 className="mt-5 text-[clamp(1.375rem,2.4vw,1.875rem)] font-semibold leading-snug text-kv-ink">{x.title}</h3>
            {x.promo && <p className="mt-2 text-[0.9375rem] font-semibold text-kv-brand">↑ {x.promo}</p>}
            <p className="mt-3 text-[1.0625rem] text-kv-muted">
              {x.period}
              {x.location ? (
                <>
                  <br />
                  {x.location}
                </>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
