'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion } from './motionState';

// All scroll animation for the home page.
// Every effect is "scrubbed" (tied to the scrollbar), so scrolling back up plays it in reverse.
// Smooth scrolling: Lenis. Scroll animation: GSAP ScrollTrigger.
// With "reduce motion" turned on, nothing here runs and the page is shown as-is.

export default function KvMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // ---- smooth scrolling ----
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // hold scrolling while the opening screen is up, then measure everything fresh
    const loaderUp = () => Boolean(document.querySelector('.kv-loader.is-active')) && !(window as unknown as { __kvLoaded?: boolean }).__kvLoaded;
    if (loaderUp()) lenis.stop();
    const onLoaded = () => {
      lenis.start();
      ScrollTrigger.refresh();
    };
    window.addEventListener('kv-loaded', onLoaded);

    // section labels decode from random characters, like code compiling
    const GLYPHS = '!<>-_/[]{}=+*^?#01';
    const scramble = (el: HTMLElement) => {
      const final = el.dataset.text ?? el.textContent ?? '';
      el.dataset.text = final;
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / 700);
        const keep = Math.floor(final.length * p);
        el.textContent =
          final.slice(0, keep) +
          final
            .slice(keep)
            .replace(/[^\s]/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // in-page links (header, footer) glide instead of jumping
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      const m = a?.getAttribute('href')?.match(/^\/?#([\w-]+)$/);
      const el = m && document.getElementById(m[1]);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { duration: 1.6 });
      history.replaceState(null, '', `#${m![1]}`);
    };
    document.addEventListener('click', onClick, true);

    const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
    const clamp = gsap.utils.clamp(0, 1);
    // how long (s) animations take to catch up with the scrollbar: higher = smoother, softer
    const SMOOTH = 0.35;

    const mm = gsap.matchMedia();
    mm.add({ desk: '(min-width: 900px)', phone: '(max-width: 899px)' }, (ctx) => {
      const desk = Boolean(ctx.conditions?.desk);

      // section labels decode as they arrive (and again when you come back to them)
      $$('.kv-eyebrow').forEach((el) =>
        ScrollTrigger.create({ trigger: el, start: 'top 92%', onEnter: () => scramble(el), onEnterBack: () => scramble(el) })
      );

      // footer: the big faded name rises in as you reach the end
      gsap.from('.kv-footer-big span', {
        yPercent: 70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.kv-footer-big', start: 'top 100%', end: 'bottom 100%', scrub: SMOOTH },
      });

      // top progress bar
      gsap.fromTo('.kv-progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

      /* 1 HERO: your name zooms toward you, the camera flies into the dots, the hero shrinks into a card */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.kv-hero',
            start: 'top top',
            end: '+=70%',
            scrub: SMOOTH,
            pin: true,
            anticipatePin: 1,
            onUpdate: (s) => (motion.heroZoom = s.progress),
          },
        })
        .to('.kv-hero-inner', { scale: 1.25, yPercent: -10, opacity: 0, ease: 'power1.in' }, 0)
        .to('.kv-scroll-hint', { opacity: 0, duration: 0.2 }, 0)
        .fromTo('.kv-hero', { clipPath: 'inset(0% 0% 0% 0% round 0px)' }, { clipPath: 'inset(7% 5% 7% 5% round 40px)', ease: 'power1.inOut' }, 0.45);

      /* 2 NUMBERS: count with the scrollbar and rise in one by one */
      const nums = $$('.kv-count');
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#facts',
            start: 'top 92%',
            end: 'bottom 55%',
            scrub: SMOOTH,
            onUpdate: (s) =>
              nums.forEach((n, i) => {
                const from = Number(n.dataset.from), to = Number(n.dataset.to);
                const p = clamp(s.progress * 1.5 - i * 0.12);
                n.textContent = `${Math.round(from + (to - from) * p)}${n.dataset.suffix ?? ''}`;
              }),
          },
        })
        .from('.kv-fact', { y: 90, opacity: 0, stagger: 0.15, ease: 'power2.out' });

      /* 3 ABOUT: pinned; the sentence lights up word by word, then the three facts rise in */
      gsap.set('.kv-word', { opacity: 0.14 });
      gsap
        .timeline({ scrollTrigger: { trigger: '#about', start: 'top top', end: '+=90%', scrub: SMOOTH, pin: true, anticipatePin: 1 } })
        .from('#about .kv-eyebrow', { opacity: 0, y: 24, duration: 0.4 })
        .to('.kv-word', { opacity: 1, stagger: 0.12, duration: 0.5, ease: 'none' })
        .from('.kv-tile', { y: 60, opacity: 0, stagger: 0.25, duration: 0.6 }, '-=0.6');

      /* section headings (eyebrow + two-line title) slide in as each section arrives */
      $$('.kv-head').forEach((h) => {
        gsap.from(h.querySelectorAll('.kv-eyebrow, .kv-line > span'), {
          yPercent: 110,
          opacity: 0,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: h, start: 'top 95%', end: 'top 70%', scrub: SMOOTH },
        });
      });

      /* 4 EDUCATION: the card swings up from a 3D tilt, then the lists fill in */
      gsap.from('.kv-edu-card', {
        rotateX: 12,
        y: 70,
        scale: 0.96,
        opacity: 0,
        transformOrigin: '50% 100%',
        transformPerspective: 1400,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.kv-edu-card', start: 'top 100%', end: 'top 70%', scrub: SMOOTH },
      });
      $$('.kv-edu-list').forEach((list) =>
        gsap.from(list.children, {
          y: 24,
          opacity: 0,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: { trigger: list, start: 'top 95%', end: 'top 70%', scrub: SMOOTH },
        })
      );

      /* 5 WHAT I DO: the map frame rises in, then the section pins: boxes appear, lines draw,
         and each scroll step highlights the next skill */
      gsap
        .timeline({ scrollTrigger: { trigger: '.kv-map-wrap', start: 'top 100%', end: 'top 45%', scrub: SMOOTH } })
        .from('.kv-map-wrap', { y: 60, scale: 0.97, opacity: 0, ease: 'power2.out', duration: 0.6 })
        .from('.kv-map-node', { opacity: 0, scale: 0.85, transformOrigin: '50% 50%', stagger: 0.06, duration: 0.3 }, 0.2)
        .from('.kv-map-edge', { strokeDashoffset: 1, stagger: 0.05, duration: 0.35, ease: 'none' }, 0.45)
        .from('.kv-map-dot', { opacity: 0, duration: 0.2 }, 0.8);
      let lastStep = -1;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '#skills',
            start: 'top top',
            end: '+=90%',
            scrub: SMOOTH,
            pin: true,
            anticipatePin: 1,
            onUpdate: (s) => {
              const step = Math.floor(gsap.utils.clamp(0, 0.999, s.progress) * 6);
              if (step !== lastStep) {
                lastStep = step;
                window.dispatchEvent(new CustomEvent('kv-map-step', { detail: step }));
              }
            },
          },
        })
        .to({}, { duration: 1 }); // the pin only steps the highlight through each skill

      /* 6 PROJECTS: slide sideways on desktop; every card turns in 3D and sweeps from wireframe to design */
      const track = $('.kv-track');
      const cards = $$('.kv-pcard');
      if (desk && track) {
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        // the row pins, rests on the first card for a moment, then slides
        const hold = () => window.innerHeight * 0.3;
        const pinST = ScrollTrigger.create({
          trigger: '#projects',
          start: 'top top',
          end: () => `+=${dist() + hold()}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
        const slide = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          // measured from the pin itself, so the slide always happens while the row is pinned
          scrollTrigger: { start: () => pinST.start + hold(), end: () => pinST.start + hold() + dist(), scrub: SMOOTH, invalidateOnRefresh: true },
        });
        // cards already on screen when the row pins (starting with the first one) play as the section arrives;
        // the rest play as they slide in from the right
        const sweepEls = (c: HTMLElement, st: ScrollTrigger.Vars) => {
          gsap.fromTo(c.querySelector('.kv-wire'), { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 100%)', ease: 'none', scrollTrigger: st });
          gsap.fromTo(c.querySelector('.kv-scan'), { left: '0%', opacity: 1 }, { left: '100%', opacity: 0, ease: 'none', scrollTrigger: st });
        };
        cards.forEach((c, i) => {
          const visibleAtStart = c.offsetLeft + c.offsetWidth * 0.5 < window.innerWidth;
          if (visibleAtStart) {
            const st = { trigger: '#projects', start: 'top 75%', end: 'top 5%', scrub: SMOOTH };
            gsap.fromTo(c, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { ...st, start: `top ${85 - i * 8}%`, end: 'top 35%' } });
            sweepEls(c, { ...st, start: `top ${60 - i * 10}%`, end: `top ${i * 10}%` });
          } else {
            gsap.fromTo(
              c,
              { rotateY: -14, scale: 0.92, transformPerspective: 1200 },
              { rotateY: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: slide, start: 'left 100%', end: 'left 65%', scrub: SMOOTH } }
            );
            // ends early enough that the last card finishes before the row stops sliding
            sweepEls(c, { trigger: c, containerAnimation: slide, start: 'left 95%', end: 'center 75%', scrub: SMOOTH });
          }
        });
      } else {
        cards.forEach((c) => {
          gsap.from(c, {
            y: 80,
            rotateX: 18,
            opacity: 0,
            transformPerspective: 900,
            ease: 'none',
            scrollTrigger: { trigger: c, start: 'top 98%', end: 'top 65%', scrub: SMOOTH },
          });
          const sweep = { trigger: c, start: 'top 80%', end: 'top 30%', scrub: SMOOTH };
          gsap.fromTo(c.querySelector('.kv-wire'), { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 100%)', ease: 'none', scrollTrigger: sweep });
          gsap.fromTo(c.querySelector('.kv-scan'), { left: '0%', opacity: 1 }, { left: '100%', opacity: 0.2, ease: 'none', scrollTrigger: sweep });
        });
      }

      /* 7 EXPERIENCE: each job card rises in; as the next one slides over it, the one below steps back */
      $$('.kv-stack').forEach((stack) => {
        const jobs = Array.from(stack.querySelectorAll<HTMLElement>('.kv-job'));
        jobs.forEach((j, i) => {
          gsap.from(j, {
            y: 70,
            rotateX: -8,
            transformPerspective: 1200,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: j, start: 'top 100%', end: 'top 80%', scrub: SMOOTH },
          });
          const next = jobs[i + 1];
          if (next) {
            gsap.fromTo(
              j,
              { scale: 1 },
              {
                scale: 0.94, // steps back but stays solid, so nothing shows through
                ease: 'none',
                immediateRender: false,
                scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 35%', scrub: SMOOTH },
              }
            );
          }
        });
      });

      /* MARQUEE: two rows of big words slide in opposite directions with the scroll */
      gsap.fromTo('.kv-marquee-a', { xPercent: 0 }, { xPercent: -28, ease: 'none', scrollTrigger: { trigger: '.kv-marquee', start: 'top bottom', end: 'bottom top', scrub: SMOOTH } });
      gsap.fromTo('.kv-marquee-b', { xPercent: -28 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.kv-marquee', start: 'top bottom', end: 'bottom top', scrub: SMOOTH } });


      /* 8 DESIGN: a navy circle grows from the centre to fill the screen */
      gsap.fromTo(
        '.kv-design-panel',
        { clipPath: 'circle(6% at 50% 50%)' },
        { clipPath: 'circle(80% at 50% 50%)', ease: 'none', scrollTrigger: { trigger: '#design', start: 'top bottom', end: 'top top', scrub: SMOOTH } }
      );
      gsap.from('.kv-design-copy', {
        scale: 0.75,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '#design', start: 'top 55%', end: 'top 5%', scrub: SMOOTH },
      });
    });

    // measure again once fonts and images have settled
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      mm.revert();
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('kv-loaded', onLoaded);
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      motion.heroZoom = 0;
    };
  }, []);

  return <div className="kv-progress" aria-hidden="true" />;
}
