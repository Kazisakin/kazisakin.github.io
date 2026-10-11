import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, FileText, Award } from 'lucide-react';
import { personalInfo, introduction, projects, experience, education, certifications } from '../../data/portfolioData';
import KvMotion from './KvMotion';
import HeroField from './HeroField';
import KvLoader from './KvLoader';
import KvDots from './KvDots';
import KvToTop from './KvToTop';
import { LOADER_SKIP_SCRIPT } from './loaderScript';
import SkillOrbit from './SkillOrbit';
import ExperienceSpotlight, { type SpotItem } from './ExperienceSpotlight';
import Constellation from './Constellation';

// The whole page reads as one story, top to bottom. KvMotion adds the scroll animations
// (pinned sections, zooms, horizontal projects, stacked jobs); without it everything is still fully visible.

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return <p className={center ? 'kv-eyebrow kv-eyebrow-center' : 'kv-eyebrow'}>{children}</p>;
}

// Two-part title: first part in ink, second part in the accent colour
function Title({ a, b, dark = false }: { a: string; b: string; dark?: boolean }) {
  return (
    <h2 className={`kv-h2 mt-5 ${dark ? 'text-white' : 'text-kv-ink'}`}>
      <span className="kv-line">
        <span>{a}</span>
      </span>
      <span className="kv-line">
        <span className={dark ? 'text-kv-hi' : 'text-kv-brand'}>{b}</span>
      </span>
    </h2>
  );
}

function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

const num = (i: number) => String(i + 1).padStart(2, '0');

const facts = [
  { from: 1, to: 4, suffix: 'th', label: 'Year of study, UNB' },
  { from: 0, to: 12, suffix: '+', label: 'Projects delivered' },
  { from: 0, to: 5, suffix: ' yrs', label: 'Design experience' },
  { from: 2023, to: 2027, suffix: '', label: 'Expected graduation' },
];

// About: the sentence that lights up word by word. Words wrapped in [] are highlighted.
const ABOUT =
  'I build [full-stack web applications,] test them with [API and automated testing,] and design [clear, user-friendly interfaces.]';

function AboutWords() {
  const parts = ABOUT.split(/(\[[^\]]+\])/).filter(Boolean);
  let k = 0;
  return (
    <>
      {parts.map((part) => {
        const hl = part.startsWith('[');
        const text = hl ? part.slice(1, -1) : part;
        return text.split(/(\s+)/).map((w) =>
          w.trim() ? (
            <span key={k++} className={`kv-word ${hl ? 'text-kv-hi' : ''}`}>
              {w}
            </span>
          ) : (
            <React.Fragment key={k++}>{w}</React.Fragment>
          )
        );
      })}
    </>
  );
}

export default function KvHome() {
  const degree = education[0];
  const spot = spotlightItems();

  return (
    <>
      <KvMotion />
      <KvLoader />
      <script dangerouslySetInnerHTML={{ __html: LOADER_SKIP_SCRIPT }} />
      <KvDots />
      <KvToTop />

      {/* ---------- HERO: code compiles into the page, then zooms away as you scroll ---------- */}
      <section id="top" className="kv-hero relative flex h-[100svh] min-h-[36rem] items-center overflow-hidden">
        <HeroField followScroll />
        <Container className="kv-hero-inner w-full">
          <h1 className="kv-h1 text-white">
            <span className="kv-line kv-line-load">
              <span style={{ animationDelay: '0.1s' }}>Kazi Mostofa</span>
            </span>
            <span className="kv-line kv-line-load">
              <span className="text-kv-hi" style={{ animationDelay: '0.22s' }}>
                Sakin.
              </span>
            </span>
          </h1>
          <p className="kv-rise mt-7 max-w-2xl text-[1.1875rem] leading-relaxed text-white/85" style={{ animationDelay: '0.4s' }}>
            {introduction.description}
          </p>
          <div className="kv-rise mt-10" style={{ animationDelay: '0.5s' }}>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2.5 rounded-full bg-kv-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-kv-brand-hover"
            >
              <FileText size={19} /> View résumé <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
        <p className="kv-scroll-hint" aria-hidden="true">
          Scroll
        </p>
      </section>

      {/* ---------- NUMBERS: count up with the scrollbar ---------- */}
      <section id="facts" className="relative z-[2] border-b border-kv-line bg-kv-bg">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`kv-fact py-10 sm:py-14 ${i % 2 ? 'border-l border-kv-line pl-6 sm:pl-10' : ''} ${
                  i > 0 ? 'lg:border-l lg:border-kv-line lg:pl-10' : ''
                } ${i < 2 ? 'border-b border-kv-line lg:border-b-0' : ''}`}
              >
                <dd
                  className="kv-count text-[2.75rem] font-semibold leading-none tracking-tight text-kv-brand sm:text-5xl"
                  data-from={f.from}
                  data-to={f.to}
                  data-suffix={f.suffix}
                >
                  {f.to}
                  {f.suffix}
                </dd>
                <dt className="mt-3 text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-kv-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------- ABOUT: pinned, the sentence lights up word by word ---------- */}
      <section id="about" className="kv-dark text-center">
        <div className="kv-about-stage relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-28">
          <Constellation />
          <Container className="relative max-w-4xl">
            <Eyebrow center>About</Eyebrow>
            <p className="kv-about-text mx-auto mt-8 max-w-[56rem] text-[clamp(1.6rem,3.5vw,2.6rem)] font-semibold leading-[1.3] tracking-tight text-white">
              <AboutWords />
            </p>
            <ul className="mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-left sm:grid-cols-3">
              {[
                ['Full-stack development', 'Next.js · Spring Boot · PostgreSQL'],
                ['Software testing', 'Postman and ReadyAPI certified'],
                ['UI/UX design', 'Figma and Adobe Creative Suite'],
              ].map(([a, b]) => (
                <li key={a} className="kv-tile bg-kv-deep px-6 py-5">
                  <p className="text-lg font-semibold text-white">{a}</p>
                  <p className="mt-1 text-[0.9375rem] text-white/60">{b}</p>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* ---------- EDUCATION: the card swings up from a 3D tilt ---------- */}
      <section id="education" className="bg-kv-bg py-20 sm:py-24">
        <Container>
          <div className="kv-head">
            <Eyebrow>Education</Eyebrow>
            <Title a="Education" b="and certifications." />
          </div>
          <div className="kv-edu-card mt-12 rounded-[1.75rem] border border-kv-line bg-white p-6 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <a
                href="https://www.unb.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-20 w-44 shrink-0 place-items-center rounded-xl border border-kv-line bg-white px-4 py-3"
                title="University of New Brunswick"
              >
                <Image src="/assets/unb-logo.png" alt="University of New Brunswick logo" width={671} height={298} className="h-full w-full object-contain" />
              </a>
              <div>
                <h3 className="text-[1.75rem] font-semibold leading-tight text-kv-ink">{degree.degree}</h3>
                <p className="mt-1.5 text-lg text-kv-body">
                  {degree.institution} · <span className="font-semibold text-kv-brand">Graduating {degree.graduation}</span>
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-12 border-t border-kv-line pt-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
              <div>
                <h3 className="text-xl font-semibold text-kv-ink">Courses</h3>
                <ul className="kv-edu-list mt-5 grid gap-x-8 gap-y-3 text-[1.0625rem] text-kv-body sm:grid-cols-2">
                  {degree.coursework.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-kv-brand" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-kv-ink">Certificates</h3>
                <ul className="kv-edu-list mt-5 space-y-5">
                  {certifications.map((c) => (
                    <li key={c.title} className="flex gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-kv-brand/10 text-kv-brand">
                        <Award size={20} strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="text-[1.0625rem] font-semibold leading-snug text-kv-ink">{c.title}</p>
                        <p className="mt-0.5 text-[0.9375rem] text-kv-muted">
                          {c.organization} · {c.year}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- WHAT I DO: pinned system map, each scroll step highlights the next skill ---------- */}
      <section id="skills" className="kv-dark">
        <div className="flex min-h-[100svh] flex-col justify-center pb-6 pt-24">
          <Container className="w-full">
            <div className="kv-head text-center">
              <Eyebrow center>Skills</Eyebrow>
              <Title a="Technical skills" b="and core tools." dark />
            </div>
            <div className="kv-orbit-wrap mt-6">
              <SkillOrbit />
            </div>
          </Container>
        </div>
      </section>

      {/* ---------- PROJECTS: slide sideways; each card sweeps from wireframe to design ---------- */}
      <section id="projects" className="overflow-hidden bg-kv-bg">
        <div className="flex min-h-[100svh] flex-col justify-center pb-10 pt-24">
          <Container className="w-full">
            <div className="kv-head flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Projects</Eyebrow>
                <Title a="Selected projects" b="and their results." />
              </div>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-kv-brand hover:underline"
              >
                View all on GitHub <ArrowUpRight size={17} />
              </a>
            </div>
          </Container>
          <div className="kv-track mt-12">
            {projects.slice(0, 4).map((p, i) => (
              <article key={p.id} className="kv-pcard">
                <ProjectBody p={p} i={i} />
                <div className="kv-wire" aria-hidden="true">
                  <ProjectBody p={p} i={i} wire />
                </div>
                <span className="kv-scan" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE: huge words slide in opposite directions as you scroll ---------- */}
      <section className="kv-marquee overflow-hidden border-y border-kv-line bg-kv-bg py-12 sm:py-16" aria-hidden="true">
        <div className="kv-marquee-row kv-marquee-a">
          {Array.from({ length: 3 }).map((_, r) => (
            <span key={r}>
              Develop <b>·</b> Test <b>·</b> Design <b>·</b> Deliver <b>·</b>{' '}
            </span>
          ))}
        </div>
        <div className="kv-marquee-row kv-marquee-b">
          {Array.from({ length: 3 }).map((_, r) => (
            <span key={r}>
              Next.js <b>·</b> TypeScript <b>·</b> Spring Boot <b>·</b> PostgreSQL <b>·</b> Postman <b>·</b> Selenium <b>·</b> PyTorch <b>·</b> Figma <b>·</b>{' '}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- EXPERIENCE: two card stacks (Work | Volunteer); each new card slides up over the last ---------- */}
      <section id="experience" className="flex min-h-[100svh] flex-col justify-center bg-kv-bg pb-10 pt-24">
        <Container className="w-full">
          <div className="kv-head">
            <Eyebrow>Experience</Eyebrow>
            <Title a="Professional experience" b="and volunteer work." />
          </div>
          <div className="mt-4 sm:mt-8">
            <ExperienceSpotlight items={spot} />
          </div>
        </Container>
      </section>

      {/* ---------- DESIGN PORTFOLIO: a navy circle grows to fill the screen ---------- */}
      <section id="design" className="bg-kv-alt">
        <div className="kv-design-panel kv-dark relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-28 text-center">
          <HeroField horizon={0.86} className="kv-field-band" />
          <Container className="kv-design-copy relative z-[1] max-w-3xl">
            <Eyebrow center>Design portfolio</Eyebrow>
            <Title a="Brand and UI design." b="Selected client work." dark />
            <p className="mx-auto mt-7 max-w-xl text-[1.1875rem] leading-relaxed text-white/80">
              Five years of client work across logos, brand identities, marketing materials and app interfaces.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href={personalInfo.designPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-kv-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-kv-brand-hover"
              >
                View design portfolio <ArrowUpRight size={18} />
              </a>
              <a
                href={personalInfo.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white/60"
              >
                Behance <ArrowUpRight size={18} />
              </a>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}

// One project card's content. With `wire`, the same layout is drawn as a wireframe with spacing specs.
function ProjectBody({ p, i, wire = false }: { p: (typeof projects)[number]; i: number; wire?: boolean }) {
  const spec = (s: string) => (wire ? { 'data-spec': s } : {});
  return (
    <>
      <div>
        <p {...spec('label · 12px')} className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">
          {num(i)} · {p.context}
        </p>
        <p {...spec('result · 18px')} className="mt-6 text-lg font-semibold text-kv-hi">{p.highlight}</p>
        <h3 {...spec('h3 · 26px')} className="mt-2 text-[1.625rem] font-semibold leading-snug text-white">{p.title}</h3>
        <p {...spec('body · 17px')} className="mt-4 text-[1.0625rem] leading-relaxed text-white/80">{p.description}</p>
      </div>
      <div>
        <p {...spec('tech · 15px')} className="text-[0.9375rem] text-white/55">{p.technologies.join(' · ')}</p>
        {wire ? (
          <p data-spec="links · 15px" className="mt-5 text-[0.9375rem] font-semibold">See it live · View code</p>
        ) : (
          <div className="mt-5 flex gap-6 text-[0.9375rem] font-semibold">
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-kv-hi hover:underline">
                See it live <ArrowRight size={16} />
              </a>
            )}
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-kv-hi hover:underline">
                View code <ArrowRight size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// Experience for the spotlight: one entry per organisation (a promotion shows as one entry), newest first.
const SPOT_ORDER = ['Day & Ross', 'IO Solutions', 'KrishiVet Nutra Solution', 'RoboFlight', 'Bangladesh Student Society, UNB', 'EGC Ltd'];
const SPOT_NAME: Record<string, string> = { 'KrishiVet Nutra Solution': 'KrishiVet', 'Bangladesh Student Society, UNB': 'UNB BSS' };

function spotlightItems(): SpotItem[] {
  const clean = (t: string) => t.replace(/\s*\((Volunteer|Part-time)\)/, '');
  const orgs = [...new Set(experience.map((e) => e.organization))].sort(
    (a, b) => (SPOT_ORDER.indexOf(a) + 99) % 99 - (SPOT_ORDER.indexOf(b) + 99) % 99
  );
  return orgs.map((org) => {
    const roles = experience.filter((e) => e.organization === org); // newest first
    const latest = roles[0];
    const first = roles[roles.length - 1];
    const start = first.period.split(' – ')[0];
    const end = latest.period.split(' – ')[1] ?? '';
    return {
      name: SPOT_NAME[org] ?? org,
      title: clean(latest.title),
      promo: roles.length > 1 ? `Promoted from ${roles.slice(1).map((r) => clean(r.title)).join(', ')}` : undefined,
      period: roles.length > 1 ? `${start} – ${end}` : latest.period,
      location: org === 'Bangladesh Student Society, UNB' ? `${org} · ${latest.location ?? ''}`.replace(/ · $/, '') : latest.location,
      type: latest.type,
      logo: latest.logo,
    };
  });
}
