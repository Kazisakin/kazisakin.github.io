'use client';
import React, { useState } from 'react';
import Link from 'next/link';
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

  return (
    <>
      {/* Top bar */}
      <div className="bg-kv-deep px-5 py-2.5 text-center text-sm text-white/80">
        Open to a Winter 2027 co-op
        <span className="mx-2">·</span>
        <Link href="/resume" className="font-semibold text-white hover:underline">
          View résumé
        </Link>
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

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-kv-ink transition-colors hover:text-kv-brand"
              >
                {l.label}
              </Link>
            ))}
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
