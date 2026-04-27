'use client';
import React, { useEffect, useRef } from 'react';
import {
  Code, Database, Wrench, Terminal,
  Cpu, Cloud, Shield, Palette, Network, Layers, CheckSquare, Server,
} from 'lucide-react';
import { skills } from '../data/portfolioData';

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Terminal size={20} />,
  Frontend: <Code size={20} />,
  Backend: <Server size={20} />,
  'ML & AI': <Cpu size={20} />,
  Databases: <Database size={20} />,
  'DevOps & Cloud': <Cloud size={20} />,
  'Testing & QA': <CheckSquare size={20} />,
  Security: <Shield size={20} />,
  'Design Tools': <Palette size={20} />,
  Networking: <Network size={20} />,
  'CMS & Tools': <Layers size={20} />,
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
    <section ref={sectionRef} id="skills" className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 scroll-animate">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Technical Skills</h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools across development, research, and design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Object.entries(skillsByCategory).map(([category, skillList], index) => (
            <div
              key={category}
              className="scroll-animate group bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400">
                  {categoryIcons[category] ?? <Wrench size={20} />}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                  {category}
                </h3>
              </div>
              <ul className="space-y-2">
                {skillList.map((skill, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
