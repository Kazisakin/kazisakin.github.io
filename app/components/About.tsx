'use client';
import React, { useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Award, Palette } from 'lucide-react';
import { education, experience, certifications, interests } from '../data/portfolioData';

export default function About() {
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
    <section ref={sectionRef} id="about" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 scroll-animate">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">About Me</h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Educational background, professional experience, and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          <div className="space-y-8 sm:space-y-10">
            <div className="scroll-animate">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400">
                  <GraduationCap size={22} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
              </div>
              {education.map((edu, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 mb-4 hover-lift">
                  <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-blue-700 dark:text-blue-400 font-semibold mb-1 text-sm sm:text-base">{edu.institution}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">{edu.period}</p>
                  <div className="mt-4">
                    <p className="text-xs sm:text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Relevant Coursework:</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-default">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="scroll-animate" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400">
                  <Award size={22} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Certifications</h3>
              </div>
              {certifications.map((cert, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 mb-3 hover-lift">
                  <h4 className="font-semibold mb-1 text-sm sm:text-base text-gray-900 dark:text-white">{cert.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{cert.organization} · {cert.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-animate" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400">
                <Briefcase size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Experience</h3>
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 mb-5 hover-lift">
                <h4 className="font-bold text-base sm:text-lg mb-1 text-gray-900 dark:text-white">{exp.title}</h4>
                <p className="text-blue-700 dark:text-blue-400 font-semibold mb-1 text-sm">{exp.organization}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{exp.period}</p>
                <ul className="space-y-2">
                  {exp.description.map((point, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex gap-2.5 leading-relaxed">
                      <span className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0">·</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 scroll-animate" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-400">
              <Palette size={22} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{interests.title}</h3>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 sm:p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover-lift">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {interests.description}
            </p>
            <a
              href={interests.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <Palette size={16} />
              {interests.linkText} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
