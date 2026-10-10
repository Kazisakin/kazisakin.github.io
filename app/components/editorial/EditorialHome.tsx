import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, FileText, Mail, Linkedin, Github } from 'lucide-react';
import {
  personalInfo,
  introduction,
  about,
  projects,
  skills,
  experience,
  education,
  certifications,
} from '../../data/portfolioData';
import { EditorialEffects, Backdrop } from './Effects';
import CopyEmailButton from './CopyEmailButton';

// How many projects the home page shows (the rest are on GitHub)
const SHOW_PROJECTS = 4;

// Section title with a short accent bar above it
function Heading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="reveal mb-10 sm:mb-14">
      <span className="ed-bar" aria-hidden="true" />
      <h2 className="font-display text-3xl font-bold text-ed-text sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 max-w-2xl text-lg text-ed-muted">{intro}</p>}
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

// Company logo on a white tile, or initials if there is no logo
function OrgMark({ org, logo }: { org: string; logo?: string }) {
  return logo ? (
    <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-ed-line bg-white p-1.5">
      <Image src={logo} alt={`${org} logo`} width={48} height={48} className="h-full w-full object-contain" />
    </div>
  ) : (
    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-ed-line bg-ed-surface text-sm font-bold text-ed-accent">
      {org.split(' ').map((w) => w[0]).filter((c) => /[A-Z]/.test(c)).slice(0, 3).join('')}
    </div>
  );
}

function ExperienceList({ items }: { items: typeof experience }) {
  return (
    <ol>
      {items.map((e) => (
        <li key={e.title + e.period} className="reveal grid gap-4 border-t border-ed-line py-8 sm:grid-cols-[56px_1fr] sm:gap-6">
          <OrgMark org={e.organization} logo={e.logo} />
          <div className="min-w-0">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-display text-xl font-bold text-ed-text">{e.title}</h3>
              <p className="shrink-0 text-base text-ed-muted">{e.period}</p>
            </div>
            <p className="mt-1 text-base font-semibold text-ed-accent">
              {e.organization}
              {e.location && <span className="font-normal text-ed-muted"> · {e.location}</span>}
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-lg text-ed-muted marker:text-ed-accent">
              {e.description.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function EditorialHome() {
  const degree = education[0];
  const work = experience.filter((e) => e.type === 'work');
  const volunteer = experience.filter((e) => e.type === 'volunteer');
  const skillGroups = skills.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <>
      <div className="ed-progress" aria-hidden="true" />
      <Backdrop />
      <EditorialEffects />

      {/* ---------- HERO ---------- */}
      <section className="ed-hero px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-44">
        <div className="mx-auto max-w-5xl">
          <div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-ed-text sm:text-6xl">
              {personalInfo.name.split(' ').map((w, i, all) => (
                <span key={w} className={`ed-word ${i < all.length - 1 ? 'mr-[0.22em]' : ''}`}>
                  <span style={{ animationDelay: `${0.1 + i * 0.12}s` }}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="ed-rise mt-6 max-w-2xl text-lg text-ed-muted" style={{ animationDelay: '0.58s' }}>
              {introduction.description}
            </p>
            <div className="ed-rise mt-9" style={{ animationDelay: '0.66s' }}>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full bg-ed-accent px-7 py-3.5 text-lg font-semibold text-ed-ink transition-transform hover:-translate-y-0.5"
              >
                <FileText size={20} /> Résumé
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <Section id="about">
        <Heading title="About me" />
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="reveal space-y-5 text-lg text-ed-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <a href="#projects" className="group inline-flex items-center gap-2 pt-2 font-semibold text-ed-accent">
              Explore my projects <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <dl className="reveal self-start text-base">
            {[
              ['Based in', personalInfo.location],
              ['Studying', `Computer Science, UNB (${degree.graduation})`],
              ['Looking for', 'Software or QA co-op, Winter 2027'],
              ['Also', '5 years of graphic design'],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-ed-line py-4">
                <dt className="text-sm font-semibold uppercase tracking-wider text-ed-muted">{k}</dt>
                <dd className="mt-1 text-lg font-semibold text-ed-text">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ---------- PROJECTS ---------- */}
      <Section id="projects">
        <Heading title="Projects" intro="A few things I’ve built, from live websites to machine learning." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.slice(0, SHOW_PROJECTS).map((p) => (
            <article key={p.id} className="reveal spot flex flex-col justify-between rounded-2xl border border-ed-line p-7 sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-ed-muted">{p.context}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-ed-text">{p.title}</h3>
                <p className="mt-3 text-lg text-ed-muted">{p.description}</p>
                <p className="mt-4 text-base font-semibold text-ed-accent">{p.highlight}</p>
                <p className="mt-2 text-base text-ed-muted">{p.technologies.join(' · ')}</p>
              </div>
              <div className="mt-6 flex gap-6 text-base font-semibold">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ed-text hover:text-ed-accent">
                    See it live <ArrowUpRight size={17} />
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-ed-text hover:text-ed-accent">
                    <Github size={17} /> Code
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal mt-10 inline-flex items-center gap-2 text-lg font-semibold text-ed-accent"
        >
          More projects on GitHub <ArrowUpRight size={18} />
        </a>
      </Section>

      {/* ---------- EXPERIENCE ---------- */}
      <Section id="experience">
        <Heading title="Experience" />
        <ExperienceList items={work} />
        <h3 className="reveal mb-2 mt-16 font-display text-2xl font-bold text-ed-text">Volunteer</h3>
        <ExperienceList items={volunteer} />
      </Section>

      {/* ---------- EDUCATION ---------- */}
      <Section id="education">
        <Heading title="Education" />
        <div className="reveal grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
          <a
            href="https://www.unb.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-20 w-40 place-items-center rounded-xl border border-ed-line bg-white px-4 py-3"
            title="University of New Brunswick"
          >
            <Image src="/assets/unb-logo.png" alt="University of New Brunswick logo" width={671} height={298} className="h-full w-full object-contain" />
          </a>
          <div>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-display text-2xl font-bold text-ed-text">{degree.degree}</h3>
              <p className="shrink-0 text-base text-ed-muted">{degree.period} (expected)</p>
            </div>
            <p className="mt-1 text-lg font-semibold text-ed-accent">
              {degree.institution}
              <span className="font-normal text-ed-muted"> · Fredericton, NB</span>
            </p>
          </div>
        </div>

        <dl className="reveal mt-10">
          <div className="grid gap-2 border-t border-ed-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
            <dt className="text-base font-semibold text-ed-text">Relevant courses</dt>
            <dd className="text-lg text-ed-muted">{degree.coursework.join(', ')}</dd>
          </div>
          <div className="grid gap-2 border-t border-ed-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
            <dt className="text-base font-semibold text-ed-text">This term</dt>
            <dd className="text-lg text-ed-muted">{degree.currentCourses.join(', ')}</dd>
          </div>
          <div className="grid gap-2 border-t border-ed-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
            <dt className="text-base font-semibold text-ed-text">Highlights</dt>
            <dd>
              <ul className="list-disc space-y-2 pl-5 text-lg text-ed-muted marker:text-ed-accent">
                {degree.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Section>

      {/* ---------- SKILLS ---------- */}
      <Section id="skills">
        <Heading title="Skills" />
        <dl className="reveal">
          {Object.entries(skillGroups).map(([cat, list]) => (
            <div key={cat} className="grid gap-2 border-t border-ed-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <dt className="text-base font-semibold text-ed-text">{cat}</dt>
              <dd className="text-lg text-ed-muted">{list.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ---------- CERTIFICATES ---------- */}
      <Section id="certifications">
        <Heading title="Certificates" />
        <ul className="reveal grid gap-x-10 sm:grid-cols-2">
          {certifications.map((c) => (
            <li key={c.title} className="border-t border-ed-line py-5">
              <p className="text-lg font-semibold text-ed-text">{c.title}</p>
              <p className="mt-1 text-base text-ed-muted">
                {c.organization} · {c.year}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- CONTACT ---------- */}
      <Section id="contact">
        <Heading title="Get in touch" intro="I’m looking for a software or QA co-op. Email is the fastest way to reach me." />
        <div className="reveal flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ed-accent px-6 py-3 text-lg font-semibold text-ed-ink transition-transform hover:-translate-y-0.5"
          >
            <Mail size={19} /> {personalInfo.email}
          </a>
          <CopyEmailButton
            email={personalInfo.email}
            className="inline-flex items-center gap-2 rounded-full border border-ed-line px-5 py-3 text-base font-semibold text-ed-text transition-colors hover:border-ed-accent"
          />
        </div>
        <div className="reveal mt-8 flex flex-wrap gap-8 text-lg font-semibold">
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ed-text hover:underline">
            <Linkedin size={19} /> LinkedIn
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ed-text hover:underline">
            <Github size={19} /> GitHub
          </a>
        </div>
      </Section>
    </>
  );
}
