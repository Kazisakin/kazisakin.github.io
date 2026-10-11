'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Opening screen. Covers the whole site while it loads: code types itself out and a progress bar
// counts to 100% once the page (images + fonts) has really finished loading. Then it shows
// "Compiled successfully", splits into columns that slide away, and announces `kv-loaded`.
// Plays once per browser session; a click skips it; "reduce motion" never sees it.

const SEGS: [string, string][] = [
  ['d', '// app/page.tsx\n'],
  ['k', 'export default'], ['', ' '], ['k', 'function'], ['', ' Home() {\n'],
  ['', '  '], ['k', 'return'], ['', ' (\n'],
  ['', '    <'], ['k', 'Portfolio'], ['', '\n'],
  ['', '      '], ['a', 'name'], ['', '='], ['s', '"Kazi Mostofa Sakin"'], ['', '\n'],
  ['', '      '], ['a', 'school'], ['', '='], ['s', '"UNB · Computer Science"'], ['', '\n'],
  ['', '      '], ['a', 'skills'], ['', '={['], ['s', '"build"'], ['', ', '], ['s', '"test"'], ['', ', '], ['s', '"design"'], ['', ']}\n'],
  ['', '    />\n'],
  ['', '  );\n}'],
];
const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const wrap = (c: string, t: string) => (c ? `<span class="c-${c}">${esc(t)}</span>` : esc(t));
const TOTAL = SEGS.reduce((n, [, t]) => n + t.length, 0);


export default function KvLoader() {
  const root = useRef<HTMLDivElement>(null);
  const code = useRef<HTMLPreElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const status = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const announce = () => window.dispatchEvent(new Event('kv-loaded'));
    if (!el || !el.classList.contains('is-active')) {
      // skipped (already seen this session, or reduce motion)
      (window as unknown as { __kvLoaded?: boolean }).__kvLoaded = true;
      announce();
      return;
    }

    const html = document.documentElement;
    html.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    let loaded = document.readyState === 'complete';
    let fonts = false;
    const onLoad = () => (loaded = true);
    window.addEventListener('load', onLoad);
    if (document.fonts) document.fonts.ready.then(() => (fonts = true));
    else fonts = true;

    const t0 = performance.now();
    let typed = 0, shown = 0, raf = 0, finished = false;

    // typing
    const render = () => {
      let left = typed, out = '';
      for (const [c, t] of SEGS) {
        if (left <= 0) break;
        out += wrap(c, t.slice(0, left));
        left -= t.length;
      }
      if (code.current) code.current.innerHTML = out + '<span class="caret"></span>';
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      typed = TOTAL;
      render();
      if (pct.current) pct.current.textContent = '100';
      if (bar.current) bar.current.style.transform = 'scaleX(1)';
      if (status.current) {
        status.current.textContent = `✓ Compiled successfully in ${((performance.now() - t0) / 1000).toFixed(1)}s`;
        status.current.classList.add('is-ok');
      }
      try {
        sessionStorage.setItem('kv-loaded', '1');
      } catch {
        /* storage blocked: the opening may play again next visit */
      }
      gsap
        .timeline({ delay: 0.45 })
        .to(el.querySelector('.kv-loader-ui'), { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
        .add(() => {
          el.classList.remove('is-active'); // lets the hero's own entrance start as it is revealed
          html.style.overflow = '';
          (window as unknown as { __kvLoaded?: boolean }).__kvLoaded = true;
          announce();
        })
        .to(el.querySelectorAll('.kv-loader-col'), { yPercent: -100, duration: 0.9, ease: 'power4.inOut', stagger: 0.07 }, '<')
        .set(el, { display: 'none' });
    };

    const tick = (now: number) => {
      const elapsed = now - t0;
      typed = Math.min(TOTAL, Math.floor(elapsed / 9));
      render();
      // real progress: can only reach 100% once the page and its fonts have loaded
      const ready = loaded && fonts;
      const target = ready ? Math.min(1, elapsed / 1900) : Math.min(0.9, elapsed / 2600);
      shown += (target - shown) * 0.12;
      if (pct.current) pct.current.textContent = String(Math.round(shown * 100)).padStart(2, '0');
      if (bar.current) bar.current.style.transform = `scaleX(${shown})`;
      if ((ready && typed >= TOTAL && shown > 0.985) || elapsed > 6500) return finish();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener('click', finish);
    const onKey = () => finish();
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('keydown', onKey);
      html.style.overflow = '';
    };
  }, []);

  return (
    <div ref={root} className="kv-loader is-active" role="status" aria-label="Loading portfolio" suppressHydrationWarning>
      <div className="kv-loader-cols" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="kv-loader-col" />
        ))}
      </div>
      <div className="kv-loader-ui">
        <div className="kv-loader-top">
          <span className="kv-loader-logo">KS</span>
          <span>Kazi Mostofa Sakin · Portfolio 2026</span>
        </div>
        <div className="kv-loader-mid">
          <div className="kv-editor">
            <div className="kv-editor-bar">
              <i />
              <i />
              <i />
              <span>app/page.tsx</span>
            </div>
            <pre ref={code} className="kv-editor-code" />
          </div>
          <div className="kv-loader-progress">
            <span ref={status} className="kv-loader-status">Compiling portfolio…</span>
            <span className="kv-loader-pct">
              <span ref={pct}>00</span>%
            </span>
          </div>
          <span className="kv-loader-track">
            <span ref={bar} className="kv-loader-bar" />
          </span>
        </div>
        <p className="kv-loader-skip">Click anywhere to skip</p>
      </div>
    </div>
  );
}
