'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// 2. Section dots on the right: show where you are, and jump to a section on click.
const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'What I do' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'design', label: 'Design' },
];

export default function KvDots() {
  const [active, setActive] = useState('top');
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          setActive(e.target.id);
          // switch to light dots over the dark navy sections
          setDark(['top', 'about', 'design'].includes(e.target.id));
        }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className={`kv-dots ${dark ? 'on-dark' : ''}`} aria-label="Sections">
      {SECTIONS.map((s) => (
        <Link key={s.id} href={`/#${s.id}`} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'true' : undefined}>
          <span>{s.label}</span>
          <i />
        </Link>
      ))}
    </nav>
  );
}
