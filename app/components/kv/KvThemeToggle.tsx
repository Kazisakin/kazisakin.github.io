'use client';
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Light is the default. Dark sets data-theme="dark" on <html>; the choice is saved
// and applied before paint by the script in app/layout.tsx.
export default function KvThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.getAttribute('data-theme') === 'dark');
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') !== 'dark';
    if (next) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    try {
      localStorage.setItem('kv-theme', next ? 'dark' : 'light');
    } catch {
      /* storage blocked: theme still switches for this visit */
    }
  };

  const label = dark ? 'Switch to light theme' : 'Switch to dark theme';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid h-10 w-10 place-items-center rounded-full border border-kv-line text-kv-ink transition-colors hover:border-kv-brand hover:text-kv-brand ${className}`}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
