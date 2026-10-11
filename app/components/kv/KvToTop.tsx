'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// 5. Back-to-top button whose ring fills as you scroll. Clicking glides to the top
// (the scroll engine picks up the /#top link and scrolls smoothly).
const R = 24;
const C = 2 * Math.PI * R;

export default function KvToTop() {
  const ring = useRef<SVGCircleElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Link href="/#top" className={`kv-totop ${show ? 'is-shown' : ''}`} aria-label="Back to top" tabIndex={show ? 0 : -1}>
      <svg viewBox="0 0 54 54" aria-hidden="true">
        <circle className="track" cx="27" cy="27" r={R} />
        <circle ref={ring} className="fill" cx="27" cy="27" r={R} style={{ strokeDasharray: C, strokeDashoffset: C }} />
      </svg>
      <span aria-hidden="true">↑</span>
    </Link>
  );
}
