'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

const links = [
  { href: '/#education', label: 'Education' },
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
];

export default function EditorialHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 border-b border-ed-line bg-ed-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ed-accent font-display text-sm font-bold text-ed-ink">
            KS
          </span>
          <span className="font-display text-base font-bold tracking-tight text-ed-text">
            {personalInfo.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ed-muted transition-colors hover:text-ed-text"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/resume"
            className="rounded-full bg-ed-accent px-4 py-2 text-sm font-semibold text-ed-ink transition-opacity hover:opacity-90"
          >
            Resume
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="rounded-lg p-2 text-ed-text md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ed-line bg-ed-bg pb-6 pt-2 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-ed-line py-4 font-display text-2xl font-bold text-ed-text"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/resume"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-ed-accent py-3 text-center font-semibold text-ed-ink"
          >
            Resume
          </Link>
        </nav>
      )}
    </header>
  );
}
