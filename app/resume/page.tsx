// Résumé page — built from content/resume.tex
// To update: edit content/resume.tex, then rebuild the site.
// To update the PDF download: compile the same .tex (Overleaf or pdflatex) and
// replace public/assets/Kazi-Mostofa-Sakin-Resume.pdf

import React from 'react';
import Link from 'next/link';
import { loadResume } from '../lib/latexResume';
import ResumeDocument from '../components/ResumeDocument';
import PrintButton from '../components/PrintButton';

export const metadata = {
  title: 'Résumé — Kazi Mostofa Sakin',
  description: 'Résumé of Kazi Mostofa Sakin, Computer Science student at the University of New Brunswick.',
};

const PDF_URL = '/assets/Kazi-Mostofa-Sakin-Resume.pdf';

export default function ResumePage() {
  const resume = loadResume();

  return (
    <div className="resume-page">
      <div className="resume-toolbar">
        <Link href="/" className="resume-btn resume-btn-ghost">
          ← Portfolio
        </Link>
        <div className="resume-toolbar-right">
          <PrintButton />
          <a href={PDF_URL} download className="resume-btn resume-btn-primary">
            Download PDF
          </a>
        </div>
      </div>
      <ResumeDocument resume={resume} />
    </div>
  );
}
