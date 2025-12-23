'use client';
import React, { useEffect, useRef } from 'react';
import { Code, Database, Wrench, Terminal } from 'lucide-react';
import { skills } from '../data/portfolioData';

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Terminal size={22} />,
  Frontend: <Code size={22} />,
  Backend: <Database size={22} />,
  Tools: <Wrench size={22} />,
};

export default function Skills() {
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

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <section ref={sectionRef} id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 scroll-animate">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 dark:text-white gradient-text">Technical Skills</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools for building modern applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Object.entries(skillsByCategory).map(([category, skillList], index) => (
            <div
              key={category}
              className="scroll-animate group bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 hover-lift relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gray-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-gray-800 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category]}
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category}
                  </h3>
                </div>
                <ul className="space-y-2 sm:space-y-2.5">
                  {skillList.map((skill, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2.5 font-medium group/item hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
                      style={{ animationDelay: `${(index * 0.1) + (i * 0.05)}s` }}
                    >
                      <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
