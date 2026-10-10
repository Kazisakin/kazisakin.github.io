import React from 'react';
import Link from 'next/link';
import { personalInfo } from '../../data/portfolioData';

const cols = [
  {
    title: 'Navigate',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Education', href: '/#education' },
      { label: 'What I do', href: '/#skills' },
      { label: 'Projects', href: '/#projects' },
      { label: 'Experience', href: '/#experience' },
      { label: 'Design', href: '/#design' },
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'GitHub', href: personalInfo.github, ext: true },
      { label: 'LinkedIn', href: personalInfo.linkedin, ext: true },
      { label: 'Design work', href: personalInfo.designPortfolio, ext: true },
      { label: 'Résumé', href: '/resume' },
    ],
  },
];

export default function KvFooter() {
  return (
    <footer className="bg-kv-deep2 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-kv-brand text-sm font-bold">KS</span>
            <span className="leading-tight">
              <span className="block text-base font-bold">{personalInfo.name}</span>
              <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Computer Science · UNB</span>
            </span>
          </div>
          <p className="mt-6 max-w-xs text-base leading-relaxed text-white/65">
            Fourth-year Computer Science student, open to software and QA co-op roles.
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-kv-gold">{c.title}</p>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  {'ext' in l && l.ext ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-base text-white/80 hover:text-white">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-base text-white/80 hover:text-white">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-kv-gold">Contact</p>
          <ul className="mt-5 space-y-3 text-base">
            <li>
              <a href={`mailto:${personalInfo.email}`} className="text-white/80 hover:text-white">
                {personalInfo.email}
              </a>
            </li>
            <li className="text-white/65">{personalInfo.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-white/50 sm:flex-row sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} {personalInfo.name}</p>
          <p>Fredericton, New Brunswick</p>
        </div>
      </div>
    </footer>
  );
}
