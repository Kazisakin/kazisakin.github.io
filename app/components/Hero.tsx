'use client';
import React from 'react';
import { Mail, ChevronRight } from 'lucide-react';
import { introduction, personalInfo } from '../data/portfolioData';

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="max-w-4xl text-center relative z-10">

        <div className="animate-on-scroll mb-3">
          <p className="text-sm font-medium tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-6">
            {personalInfo.title}
          </p>
        </div>

        <div className="animate-on-scroll">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white leading-tight">
            {introduction.greeting}
          </h1>
        </div>

        <div className="animate-on-scroll" style={{ animationDelay: '0.1s' }}>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-700 dark:text-blue-400 mb-6 sm:mb-8 font-medium">
            {personalInfo.subtitle}
          </p>
        </div>

        <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-10 sm:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
            {introduction.description}
          </p>
        </div>

        <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base shadow-sm"
          >
            View Projects
            <ChevronRight size={16} />
          </button>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-700 dark:hover:text-blue-400 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base"
          >
            <Mail size={16} />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
