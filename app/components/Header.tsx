'use client';
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, FileDown, Menu, X, Palette } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { DARK_MODE } from '../config/theme';

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (DARK_MODE) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight dark:text-white">{personalInfo.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">{personalInfo.title}</p>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
             className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
             className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${personalInfo.email}`}
             className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Mail size={20} />
          </a>
          <a href="https://design.kazimostofasakin.com" target="_blank" rel="noopener noreferrer"
             className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 text-sm font-medium">
            <Palette size={16} />
            Design
          </a>
          <a href="/resume" target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-blue-700 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FileDown size={16} />
            Resume
          </a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {mobileMenu ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="px-4 py-4 space-y-3">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
               onClick={() => setMobileMenu(false)}
               className="flex items-center gap-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Github size={20} /> GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
               onClick={() => setMobileMenu(false)}
               className="flex items-center gap-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`}
               onClick={() => setMobileMenu(false)}
               className="flex items-center gap-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Mail size={20} /> Email
            </a>
            <a href="https://design.kazimostofasakin.com" target="_blank" rel="noopener noreferrer"
               onClick={() => setMobileMenu(false)}
               className="flex items-center gap-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Palette size={20} /> Design Portfolio
            </a>
            <a href="/resume" target="_blank" rel="noopener noreferrer"
               onClick={() => setMobileMenu(false)}
               className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-700 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors font-medium">
              <FileDown size={16} /> View Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
