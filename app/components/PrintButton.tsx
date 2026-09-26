'use client';

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="resume-btn resume-btn-ghost">
      Print
    </button>
  );
}
