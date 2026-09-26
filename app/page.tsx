// ============================================
// MAIN PAGE (View in MVC Pattern)
// ============================================
// Which design renders is set in app/config/theme.ts

import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import EditorialHome from './components/editorial/EditorialHome';
import { THEME } from './config/theme';

export default function Page() {
  if (THEME === 'editorial') return <EditorialHome />;

  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <About />
    </>
  );
}
