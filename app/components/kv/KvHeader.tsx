'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#education', label: 'Education' },
  { href: '/#skills', label: 'What I do' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#design', label: 'Design' },
];

export default function KvHeader() {
  const [open, setOpen] = useState(false);
  const onResume = usePathname()?.startsWith('/resume');
  const nav = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  // 1. the underline slides to the link of the section you're reading
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(2));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const move = (id: string | null) => {
      const n = nav.current, b = bar.current;
      if (!n || !b) return;
      const a = id ? n.querySelector<HTMLElement>(`a[href="/#${id}"]`) : null;
      n.querySelectorAll('a').forEach((x) => x.classList.toggle('text-kv-brand', x === a));
      if (!a) {
        b.style.opacity = '0';
        return;
      }
      b.style.opacity = '1';
      b.style.left = `${a.offsetLeft + 16}px`;
      b.style.width = `${a.offsetWidth - 32}px`;
    };
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && move(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    const top = new IntersectionObserver(([e]) => e.isIntersecting && move(null), { rootMargin: '-45% 0px -50% 0px' });
    const hero = document.getElementById('top');
    if (hero) top.observe(hero);
    return () => {
      io.disconnect();
      top.disconnect();
    };
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-kv-deep px-5 py-2.5 text-center text-sm text-white/80">
        Open to new opportunities
        <span className="mx-2">·</span>
        {onResume ? (
          <a href="/assets/Kazi-Mostofa-Sakin-Resume.pdf" download className="font-semibold text-white hover:underline">
            Download PDF
          </a>
        ) : (
          <Link href="/resume" className="font-semibold text-white hover:underline">
            View résumé
          </Link>
        )}
      </div>

      <header className="sticky top-0 z-50 border-b border-kv-line bg-kv-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-kv-brand text-sm font-bold text-white">KS</span>
            <span className="leading-tight">
              <span className="block text-base font-bold text-kv-ink">{personalInfo.name}</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-kv-muted">Computer Science</span>
            </span>
          </Link>

          <nav ref={nav} className="relative hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-kv-ink transition-colors hover:text-kv-brand"
              >
                {l.label}
              </Link>
            ))}
            <span ref={bar} className="kv-nav-bar" aria-hidden="true" />
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-kv-line text-kv-ink lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-kv-line bg-kv-bg px-5 pb-6 sm:px-8 lg:hidden" aria-label="Mobile">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-kv-line py-4 text-xl font-semibold text-kv-ink"
              >
                <span className="text-xs font-bold tracking-[0.18em] text-kv-brand">{String(i + 1).padStart(2, '0')}</span>
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
