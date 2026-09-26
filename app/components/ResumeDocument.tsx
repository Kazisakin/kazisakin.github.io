import React from 'react';
import type { ParsedResume } from '../lib/latexResume';

// Renders the parsed LaTeX résumé as a "paper" page that matches the PDF style.
export default function ResumeDocument({ resume }: { resume: ParsedResume }) {
  return (
    <article className="tex-paper">
      <header className="tex-header">
        <h1>{resume.name}</h1>
        {resume.contactLines.map((line, i) => (
          <p key={i}>
            {line.map((item, j) => (
              <React.Fragment key={j}>
                {j > 0 && <span className="tx-meta tex-sep">•</span>}
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </React.Fragment>
            ))}
          </p>
        ))}
      </header>

      {resume.sections.map((section) => (
        <section key={section.title} className="tex-section">
          <h2>{section.title}</h2>
          {section.blocks.map((b, i) => {
            if (b.kind === 'entry') {
              return (
                <div key={i} className="tex-entry">
                  <div className="tex-entry-head">
                    <strong className="tx-navy" dangerouslySetInnerHTML={{ __html: b.title }} />
                    <span className="tx-meta" dangerouslySetInnerHTML={{ __html: b.date }} />
                  </div>
                  {b.sub && <p className="tx-meta tex-sub" dangerouslySetInnerHTML={{ __html: b.sub }} />}
                  {b.bullets.length > 0 && (
                    <ul>
                      {b.bullets.map((item, k) => (
                        <li key={k} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  )}
                </div>
              );
            }
            if (b.kind === 'table') {
              return (
                <table key={i} className="tex-table">
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} dangerouslySetInnerHTML={{ __html: cell }} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            }
            return <p key={i} className="tex-text" dangerouslySetInnerHTML={{ __html: b.html }} />;
          })}
        </section>
      ))}
    </article>
  );
}
