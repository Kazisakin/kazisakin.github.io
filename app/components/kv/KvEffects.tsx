'use client';
import { useEffect } from 'react';

// All scroll and mouse animations for the Krishivet-style page:
//  - fade/slide sections in as they scroll into view (.kv-reveal)
//  - count numbers up (.kv-count)
//  - top progress bar, hero parallax (--p, --hs)
//  - 3D tilt + light reflection on project cards (.kv-tilt)
// Everything is visible without JavaScript and respects "reduce motion".
export default function KvEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- reveal on scroll ----
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          e.target.querySelectorAll<HTMLElement>('.kv-count').forEach(countUp);
          if ((e.target as HTMLElement).classList.contains('kv-count')) countUp(e.target as HTMLElement);
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll<HTMLElement>('.kv-reveal, .kv-count-wrap').forEach((el) => io.observe(el));

    // ---- count up ----
    function countUp(el: HTMLElement) {
      if (reduce || el.dataset.done) return;
      el.dataset.done = '1';
      const full = el.textContent || '';
      const m = full.match(/^(\d+)(.*)$/);
      if (!m) return;
      const end = Number(m[1]);
      const rest = m[2];
      const start = end >= 1000 ? end - 25 : 0;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.round(start + (end - start) * eased)}${rest}`;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = full;
      };
      requestAnimationFrame(tick);
    }

    // ---- progress bar + hero parallax ----
    const hero = document.querySelector<HTMLElement>('.kv-hero');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0));
        if (hero && !reduce) {
          const hs = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);
          hero.style.setProperty('--hs', hs.toFixed(3));
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---- 3D tilt on cards (mouse only) ----
    const cleanups: Array<() => void> = [];
    if (!reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll<HTMLElement>('.kv-tilt').forEach((card) => {
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          card.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
          card.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
          card.style.setProperty('--gx', `${px * 100}%`);
          card.style.setProperty('--gy', `${py * 100}%`);
          card.classList.add('is-tilting');
        };
        const leave = () => {
          card.style.setProperty('--ry', '0deg');
          card.style.setProperty('--rx', '0deg');
          card.classList.remove('is-tilting');
        };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', leave);
        });
      });
    }

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cleanups.forEach((c) => c());
    };
  }, []);

  return <div className="kv-progress" aria-hidden="true" />;
}
