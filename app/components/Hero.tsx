'use client';
import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, Sparkles } from 'lucide-react';
import { introduction, personalInfo } from '../data/portfolioData';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-700/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="hidden md:block absolute top-40 right-20 w-2 h-2 bg-blue-500 rounded-full animate-float-1" />
      <div className="hidden md:block absolute top-60 right-40 w-3 h-3 bg-blue-400 rounded-full animate-float-2" />
      <div className="hidden md:block absolute top-1/3 left-20 w-2 h-2 bg-gray-600 rounded-full animate-float-3" />
      <div className="hidden md:block absolute bottom-1/3 left-40 w-3 h-3 bg-blue-600 rounded-full animate-float-1" style={{ animationDelay: '1s' }} />
      <div className="hidden md:block absolute top-1/2 right-60 w-2 h-2 bg-gray-500 rounded-full animate-float-2" style={{ animationDelay: '0.5s' }} />

      <div className="max-w-4xl text-center relative z-10">
        <div className="animate-on-scroll mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={16} />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Welcome to my portfolio</span>
          </div>
        </div>

        <div className="animate-on-scroll">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text leading-tight">
            {introduction.greeting}
          </h1>
        </div>

        <div className="animate-on-scroll" style={{ animationDelay: '0.1s' }}>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-6 sm:mb-8 font-semibold">
            {personalInfo.subtitle}
          </p>
        </div>

        <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 sm:mb-12 leading-relaxed max-w-2xl mx-auto px-4">
            {introduction.description}
          </p>
        </div>

        <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={scrollToProjects}
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-blue-600 to-gray-800 hover:from-blue-700 hover:to-gray-900 text-white rounded-lg flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all text-sm sm:text-base magnetic-hover"
          >
            View Projects
            <ArrowDown size={18} className="group-hover:animate-bounce" />
          </button>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg flex items-center justify-center gap-2 font-medium transition-all text-sm sm:text-base glow-on-hover magnetic-hover"
          >
            <Mail size={18} />
            Get in Touch
          </a>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
