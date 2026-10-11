'use client';
import React, { useEffect, useRef } from 'react';

// 6. Page transition: going to another page (e.g. the résumé) covers the screen with the same
// navy columns as the opening screen; the next page starts covered and the columns lift away.
// The "start covered" flag is applied before paint by WIPE_SCRIPT (see wipeScript.ts).
export default function KvTransition() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // arriving from a wipe: lift the columns
    if (el.classList.contains('is-covered')) {
      requestAnimationFrame(() => {
        el.classList.remove('is-covered');
        el.classList.add('is-leaving');
        window.setTimeout(() => el.classList.remove('is-leaving'), 1000);
      });
    }

    const onClick = (e: MouseEvent) => {
      if (reduce || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a');
      if (!a || a.target === '_blank') return;
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('/') || href.startsWith('//') || href.includes('#')) return;
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      el.classList.add('is-entering');
      try {
        sessionStorage.setItem('kv-wipe', '1');
      } catch {
        /* without storage the next page simply appears */
      }
      window.setTimeout(() => (window.location.href = url.href), 650);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <div ref={root} className="kv-wipe" aria-hidden="true" suppressHydrationWarning>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}
