import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, FileText, Code2, Bug, Brain, PenTool, Award } from 'lucide-react';
import { personalInfo, introduction, projects, experience, education, certifications } from '../../data/portfolioData';
import KvEffects from './KvEffects';
import HeroField from './HeroField';

// ---------- small building blocks ----------

// "—— LABEL" in the brand colour (centered version has a line on both sides, in gold)
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

// Company logo on a white tile, or short initials if there is no logo
function OrgLogo({ org, logo }: { org: string; logo?: string }) {
  const first = org.split(/[ ,]/)[0];
  const initials = /^[A-Z]{2,4}$/.test(first)
    ? first
    : org.split(' ').map((w) => w[0]).filter((c) => /[A-Z]/.test(c)).slice(0, 3).join('');
  return logo ? (
    <span className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl border border-kv-line bg-white">
      <Image src={logo} alt={`${org} logo`} fill sizes="112px" className="object-contain p-1.5" />
    </span>
  ) : (
    <span className="grid h-16 w-28 shrink-0 place-items-center rounded-xl border border-kv-line bg-white text-lg font-bold tracking-wide text-kv-brand">
      {initials}
    </span>
  );
}

// ---------- content ----------

const facts = [
  { value: '4th', label: 'Year at UNB' },
  { value: '7+', label: 'Projects built' },
  { value: '5 yrs', label: 'Graphic design' },
  { value: '2027', label: 'Graduating' },
];

const whatIDo = [
  {
    icon: Code2,
    title: 'Web development',
    text: 'Full websites and apps, from the database to the screen.',
    tools: 'Next.js · TypeScript · Spring Boot · PostgreSQL',
  },
  {
    icon: Bug,
    title: 'Testing & QA',
    text: 'API and UI tests that catch bugs before users do.',
    tools: 'Postman · ReadyAPI · Selenium · JUnit 5',
  },
  {
    icon: Brain,
    title: 'Machine learning',
    text: 'Models that sort text, spot spam and protect private data.',
    tools: 'Python · PyTorch · scikit-learn',
  },
  {
    icon: PenTool,
    title: 'Design',
    text: 'Logos, brand kits and app screens.',
    tools: 'Figma · Photoshop · Illustrator',
  },
];


export default function KvHome() {
  const degree = education[0];
  const work = experience.filter((e) => e.type === 'work');
  const volunteer = experience.filter((e) => e.type === 'volunteer');

  return (
    <>
      <KvEffects />

      {/* ---------- HERO ---------- */}
      <section className="kv-hero relative flex min-h-[calc(100svh-7rem)] items-center overflow-hidden py-24">
        <HeroField />
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
              <FileText size={19} /> View my résumé <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ---------- FACTS STRIP ---------- */}
      <section className="border-b border-kv-line bg-kv-bg">
        <Container>
          <dl className="kv-count-wrap grid grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`py-10 sm:py-14 ${i % 2 ? 'border-l border-kv-line pl-6 sm:pl-10' : ''} ${
                  i > 0 ? 'lg:border-l lg:border-kv-line lg:pl-10' : ''
                } ${i < 2 ? 'border-b border-kv-line lg:border-b-0' : ''}`}
              >
                <dd className="kv-count text-[2.75rem] font-semibold leading-none tracking-tight text-kv-brand sm:text-5xl">{f.value}</dd>
                <dt className="mt-3 text-[0.8125rem] font-bold uppercase tracking-[0.18em] text-kv-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------- ABOUT (dark band) ---------- */}
      <section id="about" className="kv-dark py-24 text-center sm:py-32">
        <Container className="kv-reveal max-w-3xl">
          <Eyebrow center>About me</Eyebrow>
          <Title a="Full-stack developer," b="software tester and designer." dark />
          <p className="mx-auto mt-8 max-w-2xl text-[1.1875rem] leading-relaxed text-white/80">
            I’m in my fourth year of Computer Science at the University of New Brunswick, focused on full-stack
            development and software testing. I’ve shipped a live online store, tested APIs with Postman and ReadyAPI,
            and trained machine learning models in Python.
          </p>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-left sm:grid-cols-3">
            {[
              ['Live e-commerce site', 'Built for KrishiVet'],
              ['API testing certified', 'Postman and ReadyAPI'],
              ['5 years of design', 'Before computer science'],
            ].map(([a, b]) => (
              <li key={a} className="bg-kv-deep px-6 py-5">
                <p className="text-lg font-semibold text-white">{a}</p>
                <p className="mt-1 text-[0.9375rem] text-white/60">{b}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- EDUCATION (short) ---------- */}
      <section id="education" className="bg-kv-bg py-20 sm:py-24">
        <Container>
          <div className="kv-reveal">
            <Eyebrow>Education</Eyebrow>
          </div>
          <div className="kv-reveal mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
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
            <div className="kv-reveal">
              <h3 className="text-xl font-semibold text-kv-ink">Courses</h3>
              <ul className="mt-5 grid gap-x-8 gap-y-3 text-[1.0625rem] text-kv-body sm:grid-cols-2">
                {degree.coursework.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-kv-brand" />
                    {c}
                  </li>
                ))}
                {degree.currentCourses.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-kv-brand" />
                    <span>
                      {c} <span className="ml-1 rounded-full bg-kv-brand/10 px-2 py-0.5 text-xs font-bold text-kv-brand">Now</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="kv-reveal">
              <h3 className="text-xl font-semibold text-kv-ink">Certificates</h3>
              <ul className="mt-5 space-y-5">
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
        </Container>
      </section>

      {/* ---------- WHAT I DO ---------- */}
      <section id="skills" className="bg-kv-alt py-24 sm:py-28">
        <Container>
          <div className="kv-reveal max-w-3xl">
            <Eyebrow>What I do</Eyebrow>
            <Title a="Things I do well," b="and the tools I use." />
          </div>
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {whatIDo.map((w, i) => (
              <div key={w.title} className="kv-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-kv-brand/10 text-kv-brand">
                  <w.icon size={26} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-[1.375rem] font-semibold text-kv-ink">{w.title}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-kv-body">{w.text}</p>
                <p className="mt-4 text-[0.9375rem] font-semibold text-kv-muted">{w.tools}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- PROJECTS ---------- */}
      <section id="projects" className="bg-kv-bg py-24 sm:py-28">
        <Container>
          <div className="kv-reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <Eyebrow>Projects</Eyebrow>
              <Title a="Four projects." b="Real results." />
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

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((p, i) => (
              <article key={p.id} className="kv-reveal" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <div className="kv-card kv-tilt flex h-full min-h-[20rem] flex-col justify-between rounded-[1.5rem] p-8 sm:p-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">
                    {num(i)} · {p.context}
                  </p>
                  <p className="mt-6 text-lg font-semibold text-kv-hi">{p.highlight}</p>
                  <h3 className="mt-2 text-[1.625rem] font-semibold leading-snug text-white">{p.title}</h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/80">{p.description}</p>
                </div>
                <div className="mt-8">
                  <p className="text-[0.9375rem] text-white/55">{p.technologies.join(' · ')}</p>
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
                </div>
              </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- EXPERIENCE (process steps with company logos) ---------- */}
      <section id="experience" className="bg-kv-alt py-24 sm:py-28">
        <Container>
          <div className="kv-reveal max-w-3xl">
            <Eyebrow>Experience</Eyebrow>
            <Title a="Where I’ve worked," b="most recent first." />
          </div>

          <Steps items={work} />

          <h3 className="kv-reveal mt-20 text-2xl font-semibold text-kv-ink">Volunteer work</h3>
          <Steps items={volunteer} />
        </Container>
      </section>

      {/* ---------- DESIGN PORTFOLIO (dark band) ---------- */}
      <section id="design" className="kv-dark py-24 text-center sm:py-32">
        <Container className="kv-reveal max-w-3xl">
          <Eyebrow center>Design portfolio</Eyebrow>
          <Title a="I also design." b="See my design work." dark />
          <p className="mx-auto mt-7 max-w-xl text-[1.1875rem] leading-relaxed text-white/80">
            Logos, brand kits, posters and app screens from five years of graphic design.
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
      </section>
    </>
  );
}

// Krishivet "process" style: logo, connecting line, then the details
function Steps({ items }: { items: typeof experience }) {
  return (
    <ol className={`mt-12 grid gap-12 sm:grid-cols-2 ${items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} lg:gap-8`}>
      {items.map((e, i) => (
        <li key={e.title + e.period} className="kv-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
          <div className="flex items-center gap-4">
            <OrgLogo org={e.organization} logo={e.logo} />
            <span className="kv-draw h-px flex-1 bg-kv-brand/40" />
          </div>
          <p className="mt-6 text-[0.9375rem] font-semibold text-kv-muted">{e.period}</p>
          <h4 className="mt-2 text-[1.25rem] font-semibold leading-snug text-kv-ink">{e.title}</h4>
          <p className="mt-1 text-base font-semibold text-kv-brand">
            {e.organization}
            {e.location ? <span className="font-normal text-kv-muted"> · {e.location}</span> : null}
          </p>
        </li>
      ))}
    </ol>
  );
}
