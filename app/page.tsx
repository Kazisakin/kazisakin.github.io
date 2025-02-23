import React from 'react';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Blog from './sections/Blog'; // Assuming BlogPreview was meant here

/**
 * Single-page content with multiple sections:
 * - Home
 * - About
 * - Projects
 * - BlogPreview
 */
export default function Page() {
  return (
    <div className="space-y-16">
      <section className="snap-start fade-in-up">
        <Home />
      </section>
      <section className="snap-start fade-in-up">
        <About />
      </section>
      <section className="snap-start fade-in-up">
        <Projects />
      </section>
      <section className="snap-start fade-in-up">
        <Blog />
      </section>
    </div>
  );
}