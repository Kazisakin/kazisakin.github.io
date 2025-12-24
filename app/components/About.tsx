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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 dark:text-white gradient-text">About Me</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Educational background, professional experience, and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          <div className="space-y-8 sm:space-y-10">
            <div className="scroll-animate">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-gray-800 rounded-lg">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold dark:text-white">Education</h3>
              </div>
              {education.map((edu, i) => (
                <div key={i} className="group bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 mb-4 hover-lift relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gray-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h4 className="font-bold text-base sm:text-lg mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{edu.degree}</h4>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1 text-sm sm:text-base">{edu.institution}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">{edu.period}</p>
                    <div className="mt-4">
                      <p className="text-xs sm:text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Relevant Coursework:</p>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, idx) => (
                          <span key={idx} className="text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all cursor-default tech-badge">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="scroll-animate" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-gray-800 rounded-lg">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold dark:text-white">Certifications</h3>
              </div>
              {certifications.map((cert, i) => (
                <div key={i} className="group bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 mb-3 hover-lift relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gray-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h4 className="font-bold mb-1 text-sm sm:text-base dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cert.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{cert.organization} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-animate" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-gray-800 rounded-lg">
                <Briefcase className="text-white" size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold dark:text-white">Experience</h3>
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="group bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 mb-6 hover-lift relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gray-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h4 className="font-bold text-base sm:text-lg mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{exp.title}</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1 text-sm sm:text-base">{exp.organization}</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">{exp.period}</p>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {exp.description.map((point, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex gap-2.5 sm:gap-3 leading-relaxed">
                        <span className="text-blue-600 dark:text-blue-400 mt-1 font-bold flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 scroll-animate" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-gray-800 rounded-lg">
              <Palette className="text-white" size={24} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold dark:text-white">Interests & Hobbies</h3>
          </div>
          <div className="group bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-gray-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {interests.description}
              </p>
              <a
                href={interests.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:gap-3"
              >
                <Palette size={18} />
                {interests.linkText} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
