import '../styles/code.css';
import { initPaletteChips } from '../lib/palette';
import { gsap, ScrollTrigger, initSmoothScroll, initCounters, initCursor, initMagnetic, revealLines, reduceMotion } from '../lib/motion';
import { curtainIn, initTransitions } from '../lib/transition';
import { initClock } from '../lib/clock';
import { apps, community, experience, facts, playables, products, profile, stack, type App } from './data';

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const RM = reduceMotion();
if (RM) document.documentElement.classList.add('rm');

initPaletteChips();

/* ---------- icons ---------- */
const ICON = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2.8v18.4c0 .6.7 1 1.2.7L21 12.7c.5-.3.5-1.1 0-1.4L5.2 2.1C4.7 1.8 4 2.2 4 2.8z" fill="currentColor"/></svg>',
  appstore: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 17.5l-1.2 2.1a1.6 1.6 0 1 1-2.8-1.6l1.2-2.1M12.5 8.2l3.1-5.3a1.6 1.6 0 1 1 2.8 1.6L12 15.6H4.3a1.6 1.6 0 1 1 0-3.2h9.6m1.8 0h3.9a1.6 1.6 0 1 1 0 3.2h-2.1l1.2 2a1.6 1.6 0 1 1-2.8 1.7L11 9.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  web: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" fill="currentColor"/></svg>',
  blog: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h10l4 4v12H5zM14 4v5h5M8 13h8M8 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  linkedin: '<svg class="big" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M7 10.2V17M7 7v.1M11 17v-6.8m0 3.3c0-2 1.2-3.3 2.8-3.3s2.6 1.1 2.6 3.1V17" stroke="var(--glyph, var(--code-bg))" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>',
  youtube: '<svg class="big" viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="currentColor"/><path d="M10 8.8l5.6 3.2-5.6 3.2z" fill="var(--glyph, var(--code-bg))"/></svg>',
  instagram: '<svg class="big" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"/></svg>',
};

/* ---------- hero ---------- */
$('[data-facts]').innerHTML = facts.map(f => `<li><b data-count="${f.value}" data-suffix="${f.suffix}">${f.value}${f.suffix}</b><span>${esc(f.label)}</span></li>`).join('');

/* ---------- experience ---------- */
$('[data-xp]').innerHTML = experience.map(r => `
  <article class="xp-card">
    <p class="xp-period">${esc(r.period)}</p>
    <h3 class="xp-role">${esc(r.role)}${r.todo ? '<span class="todo-tag">placeholder</span>' : ''}</h3>
    <p class="xp-company">${esc(r.company)}</p>
    <ul class="xp-points">${r.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
    <div class="xp-stack">${r.stack.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>
  </article>`).join('');
$('[data-xp-nodes]').innerHTML = experience.map(() => '<li></li>').join('');

/* ---------- apps ---------- */
/** The app's store screenshots as a deck of cards: the front card shuffles to the back every few seconds,
 *  and the deck fans out on hover so every screen is visible at once. */
function deckHTML(a: App) {
  return `<div class="deck" role="button" tabindex="0" aria-label="${esc(a.name)} screenshots, tap for the next one">
    ${a.screens.map((src, i) => `<figure class="deck-card" data-pos="${i}"><img src="${src}" alt="${esc(a.name)} screen ${i + 1}" loading="lazy"></figure>`).join('')}
  </div><ol class="deck-dots" aria-hidden="true">${a.screens.map((_, i) => `<li class="${i === 0 ? 'is-on' : ''}"></li>`).join('')}</ol>`;
}
const linkHTML = (l: App['links'][number]) => {
  const icon = l.kind === 'appstore' ? ICON.appstore : l.kind === 'play' ? ICON.play : l.kind === 'blog' ? ICON.blog : l.kind === 'github' ? ICON.github : ICON.web;
  const secondary = l.kind === 'blog' || l.kind === 'github';
  return `<a class="store ${secondary ? 'blog' : ''}" href="${l.url}" target="_blank" rel="noopener">${icon}${esc(l.label)}</a>`;
};
$('[data-apps-copy]').innerHTML = apps.map((a, i) => `
  <article class="app-copy" data-i="${i}">
    <div class="orbit-m">${deckHTML(a)}</div>
    <p class="app-kind">${String(i + 1).padStart(2, '0')} / ${String(apps.length).padStart(2, '0')} · ${esc(a.kind)}</p>
    <h3 class="app-name">${a.icon ? `<img class="app-icon" src="${a.icon}" alt="">` : ''}${esc(a.name)}</h3>
    <p class="app-line">${esc(a.line)}</p>
    <p class="app-detail">${esc(a.detail)}</p>
    <ul class="app-metrics">${a.metrics.map(m => `<li><b>${esc(m.value)}</b><span>${esc(m.label)}</span></li>`).join('')}</ul>
    <div class="app-links">${a.links.map(linkHTML).join('')}</div>
    <div class="xp-stack">${a.stack.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>
  </article>`).join('');
// the sticky stage holds one deck of screenshots per app and crossfades between them
$('[data-phone]').innerHTML = apps.map((a, i) => `<div class="orbit ${i === 0 ? 'is-on' : ''}">${deckHTML(a)}</div>`).join('');

/* ---------- decks: lay out, shuffle, fan, tilt ---------- */
function layDeck(deck: HTMLElement) {
  const cards = [...deck.querySelectorAll<HTMLElement>('.deck-card')];
  cards.forEach(c => {
    const p = +c.dataset.pos!;
    const side = p % 2 ? 1 : -1;                // back cards peek out alternately left and right
    c.style.setProperty('--p', String(p));
    c.style.setProperty('--s', String(p ? side : 0));
    c.style.setProperty('--fx', String(p ? side * Math.ceil(p / 2) : 0));   // slot when fanned out
    c.style.zIndex = String(cards.length - p);
  });
  const front = cards.findIndex(c => c.dataset.pos === '0');
  deck.nextElementSibling?.querySelectorAll('li').forEach((d, i) => d.classList.toggle('is-on', i === front));
}
function shuffle(deck: HTMLElement) {
  if (deck.classList.contains('is-busy')) return;
  const cards = [...deck.querySelectorAll<HTMLElement>('.deck-card')];
  const front = cards.find(c => c.dataset.pos === '0')!;
  deck.classList.add('is-busy');
  front.classList.add('is-leaving');           // flick the front card out…
  setTimeout(() => {
    cards.forEach(c => { c.dataset.pos = String((+c.dataset.pos! - 1 + cards.length) % cards.length); });
    front.classList.remove('is-leaving');      // …and tuck it in at the back
    layDeck(deck);
    setTimeout(() => deck.classList.remove('is-busy'), 450);
  }, 420);
}
const decks = $$('.deck');
decks.forEach(d => {
  layDeck(d);
  d.addEventListener('click', () => shuffle(d));
  d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); shuffle(d); } });
});
// auto-shuffle only decks that are on screen and not being looked at closely
const inView = new Set<HTMLElement>();
const deckIO = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? inView.add(e.target as HTMLElement) : inView.delete(e.target as HTMLElement)));
decks.forEach(d => deckIO.observe(d));
if (!RM) setInterval(() => inView.forEach(d => {
  const stage = d.closest('.orbit');
  if (d.matches(':hover') || (stage && !stage.classList.contains('is-on'))) return;
  shuffle(d);
}), 3000);
// the desktop deck tilts toward the cursor
const phoneStage = $('[data-phone]');
if (!RM && matchMedia('(hover: hover)').matches) {
  const rx = gsap.quickTo(phoneStage, 'rotationX', { duration: 0.8, ease: 'power3.out' });
  const ry = gsap.quickTo(phoneStage, 'rotationY', { duration: 0.8, ease: 'power3.out' });
  phoneStage.addEventListener('pointermove', e => {
    const r = phoneStage.getBoundingClientRect();
    ry(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
  });
  phoneStage.addEventListener('pointerleave', () => { rx(0); ry(0); });
}

/* ---------- products ---------- */
$('[data-products]').innerHTML = products.map((p, i) => `
  <article class="pcard" style="--i:${i}">
    <div class="pcard-copy">
      <span class="pill status ${p.status === 'Live' ? 'live' : 'dev'}"><span class="dot"></span>${p.status}</span>
      <h3>${esc(p.name)}</h3>
      <p class="pcard-tag">${esc(p.tag)}</p>
      <dl>
        <div><dt>The problem</dt><dd>${esc(p.problem)}</dd></div>
        <div><dt>What I built</dt><dd>${esc(p.solution)}</dd></div>
      </dl>
      <a class="btn btn-ghost" href="${p.url}" target="_blank" rel="noopener">Visit ${esc(p.name)} <span class="arrow">↗</span></a>
    </div>
    <a class="browser" href="${p.url}" target="_blank" rel="noopener" aria-label="Open ${esc(p.name)}">
      <div class="browser-bar"><i></i><i></i><i></i><span>${esc(p.url.replace(/^https?:\/\//, ''))}</span></div>
      <div class="browser-view">
        ${p.image ? `<img class="shot" src="${p.image}" alt="${esc(p.name)} website" loading="lazy">` : `<div class="fallback">${esc(p.name)}<span>${esc(p.tag)}</span></div>`}
        ${p.embed ? `<iframe data-src="${p.url}" title="${esc(p.name)} live preview" loading="lazy" tabindex="-1"></iframe>` : ''}
        <span class="pill live-hint" style="background:#fff;color:#111;border-color:#111"><span class="dot"></span>${p.embed ? 'Live preview' : 'Open site ↗'}</span>
      </div>
    </a>
  </article>`).join('');

/* ---------- playables ---------- */
const playList = $('[data-play-list]');
const playFrame = $<HTMLIFrameElement>('[data-play-frame]');
const playOpen = $<HTMLAnchorElement>('[data-play-open]');
let playIdx = 0, playLoaded = false;
playList.innerHTML = playables.map((g, i) => `
  <button class="play-item" role="tab" type="button" aria-selected="${i === 0}" data-game="${i}">
    <span class="n">${String(i + 1).padStart(2, '0')}</span><b>${esc(g.name)}</b><span>${esc(g.line)}</span>
  </button>`).join('');
function loadGame(i: number) {
  playIdx = i;
  playFrame.src = playables[i].url;
  playFrame.title = `${playables[i].name}, playable game`;
  playOpen.href = playables[i].url;
  playLoaded = true;
  $$('.play-item').forEach((b, j) => b.setAttribute('aria-selected', String(j === i)));
}
playOpen.href = playables[0].url;
playList.addEventListener('click', e => {
  const b = (e.target as Element).closest<HTMLElement>('[data-game]');
  if (!b) return;
  const i = +b.dataset.game!;
  if (i === playIdx && playLoaded) return;
  loadGame(i);
});
// the first ad loads as soon as the page has, so it is ready to play the moment you reach it
addEventListener('load', () => loadGame(0), { once: true });

/* ---------- community ---------- */
function commVisual(c: (typeof community)[number]) {
  if (c.kind === 'github') {
    return `<img class="avatar" src="/work/github-avatar.webp" alt="" loading="lazy">
      <img class="chart" src="https://ghchart.rshah.org/KumarArab" alt="GitHub contributions chart" loading="lazy" onerror="this.remove()">`;
  }
  if (c.kind === 'blog') return `<img class="shot" src="/work/products/cabo-blog.webp" alt="Cabo engineering blog" loading="lazy">`;
  return ICON[c.kind];
}
$('[data-comm]').insertAdjacentHTML('beforeend', community.map(c => `
  <a class="ccard" href="${c.url}" target="_blank" rel="noopener">
    <div class="ccard-visual" data-brand="${c.kind}">${commVisual(c)}</div>
    <div class="ccard-body"><small>${esc(c.handle)}${c.stat ? ` · <strong>${esc(c.stat)}</strong>` : ''}</small><b>${esc(c.name)}</b><p>${esc(c.line)}</p><span class="go">${esc(c.cta)} ↗</span></div>
  </a>`).join(''));

/* ---------- stack rows ---------- */
$('[data-stack]').innerHTML = stack.map(row => {
  const items = [...row, ...row, ...row].map(s => `<span>${esc(s)}</span><i>✦</i>`).join('');
  return `<div class="srow">${items}</div>`;
}).join('');

/* ---------- contact ---------- */
$('[data-year]').textContent = String(new Date().getFullYear());
$('[data-email]').addEventListener('click', async () => {
  const out = $('[data-copied]');
  try { await navigator.clipboard.writeText(profile.email); out.textContent = 'Email copied. Opening your mail app…'; }
  catch { out.textContent = profile.email; }
  location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Hello from arabkumar.in')}`;
});

/* ---------- live previews: each site renders at a fixed 1280 × 800 and is scaled to fit its frame ---------- */
const fit = new ResizeObserver(entries => entries.forEach(en => {
  const f = en.target.querySelector('iframe');
  if (f) f.style.transform = `scale(${en.contentRect.width / 1280})`;
}));
$$('.browser-view').forEach(v => fit.observe(v));
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const f = en.target as HTMLIFrameElement;
  if (f.dataset.src) {
    f.addEventListener('load', () => f.classList.add('is-loaded'), { once: true });
    f.src = f.dataset.src; delete f.dataset.src;
  }
  io.unobserve(f);
}), { rootMargin: '1200px 0px' });
$$<HTMLIFrameElement>('iframe[data-src]').forEach(f => io.observe(f));

/* ---------- motion ---------- */
initSmoothScroll();
initCounters();
initCursor();
initMagnetic();
initClock();
initTransitions();


// Nothing below hides content until an animation fires, so a missed trigger can never leave a blank card.
if (!RM) {
  // hero: one calm entrance on load
  gsap.from('.status, .hero-grid > *, .hero-foot', { y: 24, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 1.1 });
  gsap.from('.spec div', { autoAlpha: 0, x: -12, duration: 0.8, ease: 'expo.out', stagger: 0.06, delay: 1.3 });

  // experience: the rail fills as you read down the list
  gsap.fromTo('.xp-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.xp-list', start: 'top 60%', end: 'bottom 60%', scrub: true } });

  // stack rows drift in opposite directions
  $$('.srow').forEach((row, i) => {
    gsap.fromTo(row, { xPercent: i % 2 ? -30 : 0 }, { xPercent: i % 2 ? 0 : -30, ease: 'none', scrollTrigger: { trigger: '.stackrows', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  revealLines('.sec-head h2, .contact-title');
}

// the item nearest the middle of the screen is "on" (experience roles, apps); pure class toggles
const nodes = $$('.xp-rail li');
$$('.xp-card').forEach((card, i) => ScrollTrigger.create({
  trigger: card, start: 'top 65%', end: 'bottom 35%',
  onToggle: s => { card.classList.toggle('is-on', s.isActive); if (s.isActive) nodes.forEach((n, j) => n.classList.toggle('is-on', j <= i)); },
}));
const shots = $$('[data-phone] .orbit');
$$('.app-copy').forEach((copy, i) => ScrollTrigger.create({
  trigger: copy, start: 'top 55%', end: 'bottom 45%',
  onToggle: s => {
    copy.classList.toggle('is-on', s.isActive);
    if (s.isActive) shots.forEach((img, j) => img.classList.toggle('is-on', j === i));
  },
}));
$$('.xp-card')[0]?.classList.add('is-on');
$$('.app-copy')[0]?.classList.add('is-on');

// wait for fonts so pinned heights and split lines are measured correctly
document.fonts?.ready.then(() => ScrollTrigger.refresh());
addEventListener('load', () => ScrollTrigger.refresh());
revealLines('.hero-title', { immediate: true, delay: 0.85 });
curtainIn();
