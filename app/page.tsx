// ============================================
// MAIN PAGE (View in MVC Pattern)
// ============================================
// Single-page portfolio with all sections

import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';

export default function Page() {
  return (
    <>
      {/* Hero/Introduction Section */}
      <Hero />

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* About Section (Education & Experience) */}
      <About />
    </>
  );
}
