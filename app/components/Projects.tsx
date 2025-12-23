'use client';
import React, { useEffect, useRef } from 'react';
import { ExternalLink, Github as GitHubIcon } from 'lucide-react';
import { projects } from '../data/portfolioData';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-20 scroll-animate">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 dark:text-white gradient-text">Featured Work</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Showcasing innovation through full-stack development, machine learning, and system architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="scroll-animate group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:border-blue-600 dark:hover:border-blue-500 hover-lift overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-gray-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>

                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-blue-500/10 dark:border-blue-400/10 rounded-full group-hover:scale-150 group-hover:opacity-0 transition-all duration-700"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-gray-400/10 rounded-full group-hover:scale-150 group-hover:opacity-0 transition-all duration-700" style={{ animationDelay: '0.1s' }}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-default tech-badge"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-blue-500/50 text-sm group-hover:scale-105"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg font-medium transition-all text-sm group-hover:scale-105"
                      >
                        <GitHubIcon size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-gray-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
