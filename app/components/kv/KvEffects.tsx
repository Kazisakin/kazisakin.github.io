'use client';
import { useEffect } from 'react';

// Fades each `.kv-reveal` element up as it scrolls into view.
// Content is only hidden once JavaScript is running, so nothing is ever lost.
export default function KvEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const els = document.querySelectorAll<HTMLElement>('.kv-reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
