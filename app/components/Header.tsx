'use client';
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, FileDown, Moon, Sun, Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) document.body.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.body.classList.toggle('dark', newMode);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight dark:text-white">{personalInfo.name}</h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">{personalInfo.title}</p>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
             className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Github size={22} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
             className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Linkedin size={22} />
          </a>
          <a href={`mailto:${personalInfo.email}`}
             className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Mail size={22} />
          </a>
          <button onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {darkMode ? <Sun size={20} className="text-gray-300" /> : <Moon size={20} className="text-gray-700" />}
          </button>
          <a href="/resume" target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium magnetic-hover">
            <FileDown size={16} />
            Resume
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {darkMode ? <Sun size={20} className="text-gray-300" /> : <Moon size={20} className="text-gray-700" />}
          </button>
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
               className="flex items-center gap-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <Github size={20} /> GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href={`mailto:${personalInfo.email}`}
               className="flex items-center gap-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <Mail size={20} /> Email
            </a>
            <a href="/resume" target="_blank" rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <FileDown size={16} /> View Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
