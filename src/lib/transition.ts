import { gsap, reduceMotion } from './motion';

/**
 * Page transitions. Each page starts under a full-screen curtain in its own colour,
 * which pulls away on load. Links marked [data-go] flood the screen from the click
 * point in the destination's colour, then navigate.
 */
const curtain = () => document.querySelector<HTMLElement>('.curtain');

export function curtainIn(onDone?: () => void) {
  const c = curtain();
  if (!c) { onDone?.(); return; }
  if (reduceMotion()) { c.style.display = 'none'; onDone?.(); return; }
  gsap.fromTo(c, { clipPath: 'inset(0% 0% 0% 0%)' }, {
    clipPath: 'inset(0% 0% 100% 0%)', duration: 1.05, ease: 'expo.inOut', delay: 0.1,
    onComplete: () => { c.style.pointerEvents = 'none'; onDone?.(); },
  });
}

const COLORS: Record<string, string> = { code: 'var(--code-bg)', content: 'var(--content-bg)', home: 'var(--code-bg)' };

export function go(href: string, kind: string, x = innerWidth / 2, y = innerHeight / 2) {
  const c = curtain();
  if (!c || reduceMotion()) { location.href = href; return; }
  c.style.background = COLORS[kind] ?? 'var(--code-bg)';
  c.style.pointerEvents = 'auto';
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  gsap.fromTo(c, { clipPath: `circle(0px at ${x}px ${y}px)` }, {
    clipPath: `circle(${r}px at ${x}px ${y}px)`, duration: 0.8, ease: 'expo.in',
    onComplete: () => { location.href = href; },
  });
}

export function initTransitions(before?: (kind: string) => number) {
  document.addEventListener('click', e => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[data-go]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const kind = a.dataset.go!;
    const wait = before?.(kind) ?? 0;
    setTimeout(() => go(a.href, kind, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2), wait);
  });
  // Coming back with the browser's back button restores a page from cache with the curtain down.
  addEventListener('pageshow', e => {
    if (!e.persisted) return;
    const c = curtain();
    if (c) { c.style.clipPath = 'inset(0% 0% 100% 0%)'; c.style.pointerEvents = 'none'; }
  });
}
