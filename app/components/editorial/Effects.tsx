'use client';
import { useEffect, useRef, useState } from 'react';

// Fades in every `.reveal` element when it scrolls into view,
// and makes `.spot` cards glow where the mouse is.
export function EditorialEffects() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));

    const onMove = (ev: PointerEvent) => {
      const card = (ev.target as HTMLElement).closest<HTMLElement>('.spot');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', `${ev.clientX - r.left}px`);
      card.style.setProperty('--y', `${ev.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove);

    // Scroll progress bar + experience timeline that fills as you scroll
    const bar = document.querySelector<HTMLElement>('.ed-progress');
    const lines = document.querySelectorAll<HTMLElement>('.ed-timeline');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar?.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0));
        lines.forEach((l) => {
          const r = l.getBoundingClientRect();
          const start = window.innerHeight * 0.8;
          const t = Math.min(Math.max((start - r.top) / r.height, 0), 1);
          l.style.setProperty('--tp', String(t));
        });
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}

// Counts a stat up from 0 when it appears. The real value is in the HTML,
// so it still shows correctly if JavaScript is off.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    const el = ref.current;
    if (!match || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    setText(`0${suffix}`);

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setText(`${Math.round(target * eased)}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{text}</span>;
}

// Fixed background: faint grid + two slow-moving glows.
export function Backdrop() {
  return (
    <div aria-hidden="true" className="ed-backdrop">
      <div className="ed-grid" />
      <div className="ed-glow ed-glow-a" />
      <div className="ed-glow ed-glow-b" />
    </div>
  );
}
