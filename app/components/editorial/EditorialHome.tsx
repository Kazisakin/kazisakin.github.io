import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, FileText, GraduationCap, Mail, Linkedin, Github, Award } from 'lucide-react';
import {
  personalInfo,
  introduction,
  about,
  stats,
  projects,
  skills,
  timeline,
  education,
  certifications,
  interests,
  workedWith,
} from '../../data/portfolioData';
import { EditorialEffects, CountUp, Backdrop } from './Effects';

// How much the editorial theme shows. Change these numbers to show more or less.
const SHOW = {
  stats: 3,
  projects: 7,
};

// Numbered section heading: "01 — Education" + title + animated underline
function Heading({ n, label, title }: { n: string; label: string; title: string }) {
  return (
    <div className="reveal mb-12">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-ed-muted">
        <span className="text-ed-accent">{n}</span> — {label}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold text-ed-text sm:text-4xl">{title}</h2>
      <span className="ed-rule" />
    </div>
  );
}

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

// Staggered delay for items in a list
const delay = (i: number) => ({ transitionDelay: `${i * 90}ms` });

export default function EditorialHome() {
  const skillGroups = skills.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s.name);
    return acc;
  }, {} as Record<string, string[]>);

  const degree = education[0];
  const marquee = Array.from(new Set(projects.flatMap((p) => p.technologies).concat(skills.map((s) => s.name))));
  const workItems = timeline.filter((t) => t.type === 'work');
  const volunteerItems = timeline.filter((t) => t.type === 'volunteer');

  const facts = [
    { k: 'Program', v: degree.degree },
    { k: 'University', v: degree.institution },
    { k: 'Expected graduation', v: degree.graduation },
    { k: 'Location', v: personalInfo.location },
    { k: 'Focus', v: 'Software development, QA & automation' },
  ];

  return (
    <>
      <div className="ed-progress" aria-hidden="true" />
      <Backdrop />
      <EditorialEffects />

      {/* ---------- HERO ---------- */}
      <section className="flex min-h-[92vh] items-center px-5 pb-12 pt-32 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <p className="ed-rise mb-8 inline-flex items-center gap-2.5 rounded-full border border-ed-line bg-ed-surface/70 px-4 py-2 text-sm text-ed-text">
            <span className="ed-pulse h-2 w-2 rounded-full bg-emerald-400" />
            {personalInfo.availability}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] text-ed-text sm:text-7xl lg:text-[5.25rem]">
            {personalInfo.name.split(' ').map((w, i, all) => (
              <span key={w} className={`ed-word ${i < all.length - 1 ? 'mr-[0.22em]' : ''}`}>
                <span style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                  {w}
                  {i === all.length - 1 && <span className="text-ed-accent">.</span>}
                </span>
              </span>
            ))}
          </h1>
          <p className="ed-rise mt-6 text-lg font-medium text-ed-accent sm:text-xl" style={{ animationDelay: '0.5s' }}>
            {introduction.role}
          </p>
          <p className="ed-rise mt-5 max-w-2xl text-lg leading-relaxed text-ed-muted" style={{ animationDelay: '0.58s' }}>
            {introduction.description}
          </p>
          <div className="ed-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: '0.66s' }}>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-full bg-ed-accent px-6 py-3 font-semibold text-ed-ink transition-transform hover:-translate-y-0.5"
            >
              <FileText size={18} /> View Résumé
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-ed-line bg-ed-bg/60 px-6 py-3 font-semibold text-ed-text transition-colors hover:border-ed-text"
            >
              View Projects <ArrowRight size={18} />
            </a>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6">
            {stats.slice(0, SHOW.stats).map((s, i) => (
              <div key={s.label} className="reveal flex flex-col" style={delay(i)}>
                <dt className="order-2 mt-1 text-sm text-ed-muted">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-ed-text sm:text-4xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- TECHNOLOGY MARQUEE ---------- */}
      <div className="ed-marquee border-y border-ed-line py-5" aria-label="Technologies I work with">
        <div className="ed-marquee-track">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="whitespace-nowrap font-display text-lg text-ed-muted" aria-hidden={i >= marquee.length}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- WORKED WITH ---------- */}
      <div className="border-b border-ed-line px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-[0.18em] text-ed-muted">
            Organisations I have worked with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {workedWith.map((org) => (
              <div key={org.name} className="flex items-center gap-3 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
                <Image
                  src={org.logo}
                  alt={org.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-md object-cover"
                />
                <span className="text-sm font-medium text-ed-text">{org.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 01 PROFILE ---------- */}
      <Section id="profile">
        <Heading n="01" label="Profile" title="About me" />
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal space-y-5 text-lg leading-relaxed text-ed-text/90">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="reveal divide-y divide-ed-line rounded-2xl border border-ed-line bg-ed-surface/60" style={delay(1)}>
            {facts.map((f) => (
              <div key={f.k} className="flex justify-between gap-4 px-5 py-3.5 text-sm">
                <dt className="text-ed-muted">{f.k}</dt>
                <dd className="text-right text-ed-text">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ---------- 02 EDUCATION ---------- */}
      <Section id="education">
        <Heading n="02" label="Education" title="Academic background" />
        <div className="reveal spot rounded-3xl border border-ed-line p-7 sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ed-accent/10 text-ed-accent">
                <GraduationCap size={24} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-ed-text sm:text-3xl">{degree.degree}</h3>
                <p className="mt-1 text-lg text-ed-accent">{degree.institution}</p>
              </div>
            </div>
            <p className="text-ed-muted sm:text-right">
              {degree.period.split(' – ')[0]} – Present
              <br />
              <span className="text-ed-text">Expected graduation: {degree.graduation}</span>
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-ed-muted">Academic highlights</h4>
              <ul className="space-y-3">
                {degree.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-ed-text">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ed-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-ed-muted">Completed coursework</h4>
                <ul className="flex flex-wrap gap-2">
                  {degree.coursework.map((c) => (
                    <li key={c} className="rounded-full border border-ed-line px-3 py-1.5 text-sm text-ed-text">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-ed-muted">Current term (Fall 2026)</h4>
                <ul className="flex flex-wrap gap-2">
                  {degree.currentCourses.map((c) => (
                    <li key={c} className="rounded-full border border-ed-accent/40 bg-ed-accent/5 px-3 py-1.5 text-sm text-ed-text">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- 03 PROJECTS ---------- */}
      <Section id="projects">
        <Heading n="03" label="Projects" title="Selected projects" />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.slice(0, SHOW.projects).map((p, i) => (
            <article
              key={p.id}
              style={delay(i % 2)}
              className={`reveal spot flex flex-col justify-between rounded-3xl ${
                i === Math.min(projects.length, SHOW.projects) - 1 && i % 2 === 0 ? 'md:col-span-2' : ''
              } border border-ed-line p-7 hover:border-ed-accent/60 sm:p-8`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-ed-muted">{p.context}</p>
                  <p className="rounded-full border border-ed-accent/40 px-2.5 py-0.5 text-xs font-medium text-ed-accent">
                    {p.highlight}
                  </p>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-ed-text">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ed-muted">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.technologies.slice(0, 4).map((t) => (
                    <li key={t} className="rounded-md bg-ed-bg/70 px-2 py-1 text-xs text-ed-text/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-7 flex gap-5 text-sm font-medium">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ed-text hover:text-ed-accent">
                    Live site <ArrowUpRight size={15} />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ed-text hover:text-ed-accent">
                    <Github size={15} /> Source code
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------- 04 EXPERIENCE ---------- */}
      <Section id="experience">
        <Heading n="04" label="Experience" title="Work experience" />
        <ol className="ed-timeline space-y-10 pl-9">
          <span className="ed-timeline-fill" aria-hidden="true" />
          {workItems.map((t, i) => (
            <li key={t.role + t.period} style={delay(i % 3)} className="reveal relative">
              <span className="absolute -left-9 top-2 h-[11px] w-[11px] rounded-full border-2 border-ed-accent bg-ed-bg" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="font-display text-xl font-bold text-ed-text">{t.role}</h3>
                <span className="shrink-0 text-sm text-ed-muted">{t.period}</span>
              </div>
              <p className="text-ed-accent">{t.org}</p>
              <p className="mt-2 max-w-3xl leading-relaxed text-ed-muted">{t.note}</p>
            </li>
          ))}
        </ol>

        <h3 className="mb-8 mt-16 font-display text-2xl font-bold text-ed-text">Volunteering</h3>
        <ol className="ed-timeline space-y-10 pl-9">
          <span className="ed-timeline-fill" aria-hidden="true" />
          {volunteerItems.map((t, i) => (
            <li key={t.role + t.period} style={delay(i % 3)} className="reveal relative">
              <span className="absolute -left-9 top-2 h-[11px] w-[11px] rounded-full border-2 border-ed-accent bg-ed-bg" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h3 className="font-display text-xl font-bold text-ed-text">{t.role}</h3>
                <span className="shrink-0 text-sm text-ed-muted">{t.period}</span>
              </div>
              <p className="text-ed-accent">{t.org}</p>
              <p className="mt-2 max-w-3xl leading-relaxed text-ed-muted">{t.note}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- 05 SKILLS ---------- */}
      <Section id="skills">
        <Heading n="05" label="Skills" title="Technical skills" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {Object.entries(skillGroups).map(([cat, list], i) => (
            <div key={cat} className="reveal" style={delay(i)}>
              <h3 className="mb-4 border-b border-ed-line pb-3 text-sm font-medium text-ed-accent">{cat}</h3>
              <ul className="space-y-2">
                {list.map((s) => (
                  <li key={s} className="text-ed-text">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 06 CERTIFICATIONS ---------- */}
      <Section id="certifications">
        <Heading n="06" label="Certifications" title="Certifications" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <li key={c.title} style={delay(i % 2)} className="reveal spot flex gap-4 rounded-2xl border border-ed-line p-5">
              <Award size={22} className="mt-0.5 shrink-0 text-ed-accent" />
              <div>
                <p className="font-semibold text-ed-text">{c.title}</p>
                <p className="mt-1 text-sm text-ed-muted">
                  {c.organization} · {c.year}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- DESIGN BAND ---------- */}
      <section className="bg-ed-accent px-5 py-20 text-ed-ink sm:px-8 sm:py-24">
        <div className="reveal mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] opacity-70">Design background</p>
            <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Design & creative work</h2>
            <p className="mt-3 max-w-xl text-lg opacity-80">{interests.description}</p>
          </div>
          <a
            href={interests.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ed-ink px-6 py-3 font-semibold text-ed-accent transition-transform hover:-translate-y-0.5 md:self-auto"
          >
            {interests.linkText} <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      {/* ---------- 07 CONTACT ---------- */}
      <Section id="contact">
        <Heading n="07" label="Contact" title="Get in touch" />
        <p className="reveal max-w-2xl text-lg leading-relaxed text-ed-muted">
          I am currently seeking co-op and internship opportunities in software development and QA automation. I
          welcome messages from recruiters and hiring teams.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ed-accent px-6 py-3 font-semibold text-ed-ink transition-transform hover:-translate-y-0.5"
          >
            <Mail size={18} /> {personalInfo.email}
          </a>
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-ed-line px-6 py-3 font-semibold text-ed-text transition-colors hover:border-ed-text"
          >
            <FileText size={18} /> Résumé
          </Link>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ed-line px-6 py-3 font-semibold text-ed-text transition-colors hover:border-ed-text"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ed-line px-6 py-3 font-semibold text-ed-text transition-colors hover:border-ed-text"
          >
            <Github size={18} /> GitHub
          </a>
        </div>
      </Section>
    </>
  );
}
