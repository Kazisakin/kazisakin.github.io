// ============================================
// LaTeX → web résumé
// ============================================
// Reads content/resume.tex at build time and turns it into data the
// /resume page can render. Edit the .tex file and rebuild — the web page
// updates automatically.
//
// It understands the commands used in resume.tex:
//   \section{}, \entry{title}{date}, \sub{}, itemize/\item,
//   tabularx tables (\skillrow{}{} or "a & b \\" rows),
//   \href, \textcolor, \textbf, \bfseries, \small, \enspace, \textbullet
// Anything else is ignored rather than breaking the page.

import fs from 'fs';
import path from 'path';

export type ResumeBlock =
  | { kind: 'entry'; title: string; date: string; sub?: string; bullets: string[] }
  | { kind: 'table'; rows: string[][] }
  | { kind: 'text'; html: string };

export interface ResumeSection {
  title: string;
  blocks: ResumeBlock[];
}

export interface ParsedResume {
  name: string;
  contactLines: string[][]; // each line is a list of HTML items
  sections: ResumeSection[];
}

// ---------- helpers ----------

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Reads a {...} group starting at s[i] === '{'. Returns content and index after '}'.
function readGroup(s: string, i: number): [string, number] {
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === '\\') {
      j++;
      continue;
    }
    if (s[j] === '{') depth++;
    else if (s[j] === '}') {
      depth--;
      if (depth === 0) return [s.slice(i + 1, j), j + 1];
    }
  }
  return [s.slice(i + 1), s.length];
}

function skipSpaces(s: string, i: number) {
  while (i < s.length && /\s/.test(s[i])) i++;
  return i;
}

function readArgs(s: string, i: number, n: number): [string[], number] {
  const args: string[] = [];
  for (let k = 0; k < n; k++) {
    i = skipSpaces(s, i);
    if (s[i] !== '{') break;
    const [g, next] = readGroup(s, i);
    args.push(g);
    i = next;
  }
  return [args, i];
}

// Converts inline LaTeX to safe HTML.
export function inline(tex: string): string {
  let out = '';
  let i = 0;
  const s = tex
    .replace(/\\\(\s*\\rightarrow\s*\\\)/g, '→')
    .replace(/\$\\bullet\$/g, '•')
    .replace(/``/g, '“')
    .replace(/''/g, '”')
    .replace(/---/g, '—')
    .replace(/--/g, '–');

  while (i < s.length) {
    const c = s[i];

    if (c === '\\') {
      // escaped characters
      const nextCh = s[i + 1];
      if (nextCh && '&%$#_{}'.includes(nextCh)) {
        out += escapeHtml(nextCh);
        i += 2;
        continue;
      }
      if (nextCh === '\\') {
        // line break: \\ or \\[4pt]
        i += 2;
        const m = s.slice(i).match(/^\[[^\]]*\]/);
        if (m) i += m[0].length;
        out += ' ';
        continue;
      }
      const m = s.slice(i + 1).match(/^[a-zA-Z]+/);
      const cmd = m ? m[0] : '';
      i += 1 + cmd.length;

      switch (cmd) {
        case 'href': {
          const [[url, text], next] = readArgs(s, i, 2);
          i = next;
          out += `<a href="${escapeHtml(url ?? '')}" target="_blank" rel="noopener noreferrer">${inline(text ?? '')}</a>`;
          break;
        }
        case 'textcolor': {
          const [[color, text], next] = readArgs(s, i, 2);
          i = next;
          out += `<span class="tx-${escapeHtml(color ?? '')}">${inline(text ?? '')}</span>`;
          break;
        }
        case 'textbf': {
          const [[text], next] = readArgs(s, i, 1);
          i = next;
          out += `<strong>${inline(text ?? '')}</strong>`;
          break;
        }
        case 'textit':
        case 'emph': {
          const [[text], next] = readArgs(s, i, 1);
          i = next;
          out += `<em>${inline(text ?? '')}</em>`;
          break;
        }
        case 'enspace':
        case 'quad':
          out += ' ';
          break;
        case 'textbullet':
          out += '•';
          break;
        case 'bfseries': {
          // rest of the current group is bold
          const rest = s.slice(skipSpaces(s, i));
          return out + `<strong>${inline(rest)}</strong>`;
        }
        case 'small': {
          const rest = s.slice(skipSpaces(s, i));
          return out + `<small>${inline(rest)}</small>`;
        }
        default:
          // unknown command: drop it, keep going
          break;
      }
      continue;
    }

    if (c === '{') {
      const [g, next] = readGroup(s, i);
      out += inline(g);
      i = next;
      continue;
    }

    if (c === '~') {
      out += '&nbsp;';
      i++;
      continue;
    }

    if (c === '%') {
      // comment to end of line
      const nl = s.indexOf('\n', i);
      i = nl === -1 ? s.length : nl;
      continue;
    }

    out += escapeHtml(c);
    i++;
  }
  return out.replace(/\s+/g, ' ').trim();
}

// ---------- block parsing ----------

function parseTable(body: string): string[][] {
  const rows: string[][] = [];
  // \skillrow{a}{b}
  let rest = body;
  let m: RegExpExecArray | null;
  const skill = /\\skillrow/g;
  while ((m = skill.exec(body))) {
    const [[a, b]] = readArgs(body, m.index + m[0].length, 2);
    rows.push([`<strong class="tx-navy">${inline(a ?? '')}</strong>`, inline(b ?? '')]);
  }
  rest = rest.replace(/\\skillrow\s*\{(?:[^{}]|\{[^{}]*\})*\}\s*\{(?:[^{}]|\{[^{}]*\})*\}/g, '');
  // plain "a & b \\" rows
  rest
    .split(/\\\\(?:\[[^\]]*\])?/)
    .map((r) => r.trim())
    .filter((r) => r.includes('&'))
    .forEach((r) => rows.push(r.split(/(?<!\\)&/).map((cell) => inline(cell))));
  return rows;
}

function parseSection(content: string): ResumeBlock[] {
  const blocks: ResumeBlock[] = [];
  let i = 0;
  const s = content;

  while (i < s.length) {
    const rest = s.slice(i);

    if (rest.startsWith('\\entry')) {
      const [[title, date], next] = readArgs(s, i + 6, 2);
      i = next;
      const entry: ResumeBlock = { kind: 'entry', title: inline(title ?? ''), date: inline(date ?? ''), bullets: [] };
      i = skipSpaces(s, i);
      if (s.slice(i).startsWith('\\sub')) {
        const [[sub], n2] = readArgs(s, i + 4, 1);
        entry.sub = inline(sub ?? '');
        i = skipSpaces(s, n2);
      }
      if (s.slice(i).startsWith('\\begin{itemize}')) {
        const end = s.indexOf('\\end{itemize}', i);
        const list = s.slice(i + '\\begin{itemize}'.length, end);
        entry.bullets = list
          .split('\\item')
          .map((b) => b.trim())
          .filter(Boolean)
          .map(inline);
        i = end + '\\end{itemize}'.length;
      }
      blocks.push(entry);
      continue;
    }

    if (rest.startsWith('\\begin{tabularx}')) {
      const end = s.indexOf('\\end{tabularx}', i);
      let body = s.slice(i + '\\begin{tabularx}'.length, end);
      // drop the {width}{column spec} arguments
      const [, afterArgs] = readArgs(body, 0, 2);
      body = body.slice(afterArgs);
      blocks.push({ kind: 'table', rows: parseTable(body) });
      i = end + '\\end{tabularx}'.length;
      continue;
    }

    // plain text until the next known block
    const nextBlock = rest.search(/\\entry|\\begin\{tabularx\}/);
    const chunk = nextBlock === -1 ? rest : rest.slice(0, nextBlock || 1);
    const html = inline(chunk.replace(/\\vspace\{[^}]*\}/g, '').replace(/\\noindent/g, ''));
    if (html) blocks.push({ kind: 'text', html });
    i += chunk.length;
  }
  return blocks;
}

export function parseResume(tex: string): ParsedResume {
  // strip comments (but not escaped \%)
  const clean = tex.replace(/(^|[^\\])%.*$/gm, '$1');
  const body = clean.slice(clean.indexOf('\\begin{document}') + '\\begin{document}'.length, clean.indexOf('\\end{document}'));

  // Header
  const center = body.match(/\\begin\{center\}([\s\S]*?)\\end\{center\}/)?.[1] ?? '';
  const nameMatch = center.match(/\\selectfont\s+([^}]+)\}/);
  const name = nameMatch ? inline(nameMatch[1]) : '';
  const afterName = nameMatch ? center.slice(center.indexOf(nameMatch[0]) + nameMatch[0].length) : center;
  const contactLines = afterName
    .replace(/\\small/g, '')
    .split(/\\\\(?:\[[^\]]*\])?/)
    .map((line) =>
      line
        .split(/\\enspace\s*\\textcolor\{meta\}\{\\textbullet\}\s*\\enspace/)
        .map((item) => inline(item))
        .filter(Boolean)
    )
    .filter((l) => l.length > 0);

  // Sections
  const parts = body.split(/\\section\*?\{/).slice(1);
  const sections = parts.map((part) => {
    const [title, next] = readGroup('{' + part, 0);
    return { title: inline(title), blocks: parseSection(part.slice(next - 1)) };
  });

  return { name, contactLines, sections };
}

export function loadResume(): ParsedResume {
  const file = path.join(process.cwd(), 'content', 'resume.tex');
  return parseResume(fs.readFileSync(file, 'utf8'));
}
