import React from 'react';
import { personalInfo } from '../../data/portfolioData';

export default function EditorialFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ed-line px-5 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 py-8 text-sm text-ed-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {personalInfo.name}</p>
        <div className="flex gap-6">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-ed-text">GitHub</a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ed-text">LinkedIn</a>
          <a href={personalInfo.designPortfolio} target="_blank" rel="noopener noreferrer" className="hover:text-ed-text">Design</a>
        </div>
      </div>
    </footer>
  );
}
