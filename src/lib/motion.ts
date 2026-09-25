import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

let lenis: Lenis | null = null;

/** Smooth scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll(): Lenis | null {
  if (reduceMotion()) return null;
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href')!);
    if (!target) return;
    e.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
  }));
  return lenis;
}

export const getLenis = () => lenis;

/** Counts a number up from 0 when it scrolls into view. Reads data-count (+ optional data-suffix). */
export function initCounters(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
    const end = parseFloat(el.dataset.count || '0');
    const dec = (el.dataset.count || '').includes('.') ? 1 : 0;
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    const set = () => { el.textContent = obj.v.toFixed(dec) + suffix; };
    if (reduceMotion()) { obj.v = end; set(); return; }
    set();
    gsap.to(obj, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: set, scrollTrigger: { trigger: el, start: 'top bottom', once: true } });
  });
}

/** Headline reveal: lines rise out of a mask when they enter the viewport. */
export function revealLines(selector: string, opts: { delay?: number; immediate?: boolean } = {}) {
  document.querySelectorAll<HTMLElement>(selector).forEach(el => {
    if (reduceMotion()) return;
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'line' });
    gsap.from(split.lines, {
      yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: opts.delay ?? 0,
      scrollTrigger: opts.immediate ? undefined : { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/** Buttons that lean toward the cursor. */
export function initMagnetic() {
  if (!finePointer() || reduceMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.3);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}

/** A small dot that trails the cursor and swells over anything clickable. */
export function initCursor() {
  if (!finePointer() || reduceMotion()) return;
  const dot = document.createElement('div');
  dot.className = 'cursor';
  document.body.appendChild(dot);
  const xTo = gsap.quickTo(dot, 'x', { duration: 0.25, ease: 'power3.out' });
  const yTo = gsap.quickTo(dot, 'y', { duration: 0.25, ease: 'power3.out' });
  addEventListener('pointermove', e => {
    xTo(e.clientX); yTo(e.clientY);
    dot.classList.toggle('is-link', !!(e.target as Element).closest?.('a, button, [data-cursor]'));
  }, { passive: true });
  document.addEventListener('pointerleave', () => dot.classList.add('is-hidden'));
  document.addEventListener('pointerenter', () => dot.classList.remove('is-hidden'));
}

export { gsap, ScrollTrigger, SplitText };
