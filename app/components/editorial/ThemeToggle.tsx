'use client';
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

// Switches between the light theme (default) and the dark theme.
// The choice is saved in the browser and applied before paint (see layout.tsx).
type Mode = 'dark' | 'field';

export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('dark');

  // Read the theme from <html>, and stay in sync if another switch changes it
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setMode(root.getAttribute('data-theme') === 'field' ? 'field' : 'dark');
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => mo.disconnect();
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next: Mode = root.getAttribute('data-theme') === 'field' ? 'dark' : 'field';
    if (next === 'field') root.setAttribute('data-theme', 'field');
    else root.removeAttribute('data-theme');
    try {
      localStorage.setItem('ed-theme', next);
    } catch {
      /* storage blocked — theme still switches for this visit */
    }
  };

  const label = mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-ed-line text-ed-text transition-colors hover:border-ed-accent hover:text-ed-accent"
    >
      {mode === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
