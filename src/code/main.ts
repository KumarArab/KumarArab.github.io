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
  linkedin: '<svg class="big" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M7 10.2V17M7 7v.1M11 17v-6.8m0 3.3c0-2 1.2-3.3 2.8-3.3s2.6 1.1 2.6 3.1V17" stroke="var(--code-bg)" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>',
  youtube: '<svg class="big" viewBox="0 0 24 24" aria-hidden="true"><rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="currentColor"/><path d="M10 8.8l5.6 3.2-5.6 3.2z" fill="var(--code-bg)"/></svg>',
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
// used only when an app has no screenshots yet
const TINTS: Record<string, [string, string, string]> = {
  cabo: ['#FF6B6B', '#FFD166', '#1B1B3A'],
  matrix: ['#00C2A8', '#3D5AFE', '#081226'],
  paperid: ['#F7B267', '#F25C54', '#2B1B17'],
};
function screenHTML(a: App) {
  if (a.screens.length) return `<div class="screen"><img src="${a.screens[0]}" alt="${esc(a.name)} on the store" loading="lazy"></div>`;
  const [x, y, z] = TINTS[a.id] ?? ['#888', '#444', '#111'];
  return `<div class="screen"><div class="screen-ph" style="--ph-a:${x};--ph-b:${y};--ph-c:${z}">
    <div class="icon">${esc(a.name[0])}</div><b>${esc(a.name)}</b><span>${esc(a.kind)}<br>screens coming soon</span></div></div>`;
}
const linkHTML = (l: App['links'][number]) => {
  const icon = l.kind === 'appstore' ? ICON.appstore : l.kind === 'play' ? ICON.play : l.kind === 'blog' ? ICON.blog : l.kind === 'github' ? ICON.github : ICON.web;
  const secondary = l.kind === 'blog' || l.kind === 'github';
  return `<a class="store ${secondary ? 'blog' : ''}" href="${l.url}" target="_blank" rel="noopener">${icon}${esc(l.label)}</a>`;
};
$('[data-apps-copy]').innerHTML = apps.map((a, i) => `
  <article class="app-copy" data-i="${i}">
    <p class="app-kind">${String(i + 1).padStart(2, '0')} / ${String(apps.length).padStart(2, '0')} · ${esc(a.kind)}</p>
    <h3 class="app-name">${a.icon ? `<img class="app-icon" src="${a.icon}" alt="">` : ''}${esc(a.name)}</h3>
    <p class="app-line">${esc(a.line)}</p>
    <p class="app-detail">${esc(a.detail)}</p>
    <ul class="app-metrics">${a.metrics.map(m => `<li><b>${esc(m.value)}</b><span>${esc(m.label)}</span></li>`).join('')}</ul>
    <div class="app-links">${a.links.map(linkHTML).join('')}</div>
    <div class="xp-stack">${a.stack.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div>
  </article>`).join('');
$('[data-apps-index]').innerHTML = apps.map(a => `<li>${esc(a.name)}</li>`).join('');
const faces = { front: $('[data-face="front"]'), back: $('[data-face="back"]') };
const faceIdx = { front: -1, back: -1 };
function setFace(which: 'front' | 'back', i: number) {
  i = Math.max(0, Math.min(apps.length - 1, i));
  if (faceIdx[which] === i) return;
  faceIdx[which] = i;
  faces[which].innerHTML = screenHTML(apps[i]);
  faces[which].classList.toggle('is-shot', apps[i].screens.length > 0);
}
setFace('front', 0);
setFace('back', 1);

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
const playCover = $('[data-play-cover]');
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
  if (!RM) gsap.fromTo('.phone-shell', { rotateY: -12, scale: .96 }, { rotateY: 0, scale: 1, duration: .7, ease: 'expo.out' });
  loadGame(i);
});
playCover.addEventListener('click', () => {
  if (!playLoaded) loadGame(playIdx);
  playCover.classList.add('is-off');
  playFrame.focus();
});

/* ---------- community ---------- */
function commVisual(c: (typeof community)[number]) {
  if (c.kind === 'github') {
    return `<img class="avatar" src="/work/github-avatar.webp" alt="" loading="lazy">
      <img class="chart" src="https://ghchart.rshah.org/KumarArab" alt="GitHub contributions chart" loading="lazy" onerror="this.remove()">`;
  }
  if (c.kind === 'blog') return `<iframe data-src="${c.url}" title="Cabo engineering blog preview" loading="lazy" tabindex="-1"></iframe>`;
  return ICON[c.kind];
}
$('[data-comm]').insertAdjacentHTML('beforeend', community.map(c => `
  <a class="ccard" href="${c.url}" target="_blank" rel="noopener">
    <div class="ccard-visual">${commVisual(c)}</div>
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

/* ---------- live iframes: load when near, scale desktop layout into the frame ---------- */
function fitFrames() {
  $$<HTMLIFrameElement>('.browser-view iframe').forEach(f => { f.style.transform = `scale(${f.parentElement!.clientWidth / 1280})`; });
  $$<HTMLIFrameElement>('.ccard-visual iframe').forEach(f => { f.style.transform = `scale(${f.parentElement!.clientWidth / 1100})`; });
}
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const f = en.target as HTMLIFrameElement;
  if (f.dataset.src) { f.src = f.dataset.src; delete f.dataset.src; }
  if (f === playFrame && !playLoaded) loadGame(0);
  io.unobserve(f);
}), { rootMargin: '600px 600px' });
$$<HTMLIFrameElement>('iframe[data-src]').forEach(f => io.observe(f));
io.observe(playFrame);
fitFrames();
addEventListener('resize', fitFrames);

/* ---------- motion ---------- */
initSmoothScroll();
initCounters();
initCursor();
initMagnetic();
initClock();
initTransitions();


if (!RM) {
  // hero: one calm entrance, then it quietly steps back as you scroll
  gsap.from('.status, .hero-grid > *, .hero-foot', { y: 24, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: 1.1 });
  gsap.from('.spec div', { autoAlpha: 0, x: -12, duration: 0.8, ease: 'expo.out', stagger: 0.06, delay: 1.3 });
  gsap.to('.hero', { autoAlpha: 0.15, yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'center top', end: 'bottom top', scrub: true } });

  // experience: one role in focus at a time
  const cards = $$('.xp-card');
  const nodes = $$('.xp-rail li');
  gsap.set(cards.slice(1), { autoAlpha: 0, y: 80 });
  const xpTl = gsap.timeline({
    onUpdate() { const p = this.progress(); nodes.forEach((n, i) => n.classList.toggle('is-on', p >= i / Math.max(1, cards.length - 1) * 0.85 - 0.02)); },
    scrollTrigger: { trigger: '.xp .pin', pin: true, start: 'top top', end: () => `+=${cards.length * innerHeight * 0.9}`, scrub: 0.8 },
  });
  xpTl.to('.xp-fill', { scaleY: 1, ease: 'none', duration: cards.length }, 0);
  cards.forEach((c, i) => {
    if (i === 0) return;
    xpTl.to(cards[i - 1], { autoAlpha: 0, y: -80, scale: 0.96, duration: 0.3 }, i - 0.6)
      .to(c, { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.28);
  });
  xpTl.to({}, { duration: 0.4 });

  // apps: the phone flips to each app while the copy swaps
  const copies = $$('.app-copy');
  const index = $$('.apps-index li');
  const word = $('[data-apps-word]');
  gsap.set(copies.slice(1), { autoAlpha: 0, y: 60 });
  const phone = $('[data-phone]');
  const n = apps.length;
  const syncPhone = () => {
    const r = (gsap.getProperty(phone, 'rotateY') as number) / 180;
    setFace('front', 2 * Math.round(r / 2));
    setFace('back', 2 * Math.floor((r + 0.5) / 2) + 1);
    const cur = Math.max(0, Math.min(n - 1, Math.round(r)));
    index.forEach((li, i) => li.classList.toggle('is-on', i === cur));
    if (word.dataset.i !== String(cur)) { word.dataset.i = String(cur); word.textContent = `${apps[cur].name} · ${apps[cur].name} · ${apps[cur].name}`; }
  };
  // runs on every rendered frame of the (smoothed) timeline, so the screen always matches the flip
  const appsTl = gsap.timeline({
    onUpdate: syncPhone,
    scrollTrigger: { trigger: '.apps .pin', pin: true, start: 'top top', end: () => `+=${n * innerHeight}`, scrub: 0.8 },
  });
  syncPhone();
  appsTl.fromTo(phone, { rotateY: -18, rotateX: 8 }, { rotateY: 0, rotateX: 0, duration: 0.3, ease: 'power2.out' }, 0);
  for (let i = 1; i < n; i++) {
    appsTl.to(phone, { rotateY: i * 180, duration: 0.7, ease: 'power2.inOut' }, i - 0.5)
      .to(copies[i - 1], { autoAlpha: 0, y: -60, duration: 0.35 }, i - 0.5)
      .to(copies[i], { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.2);
  }
  appsTl.fromTo(word, { xPercent: 0 }, { xPercent: -30, ease: 'none', duration: n }, 0);
  appsTl.to({}, { duration: 0.3 });

  // products: each card stacks over the last, which recedes
  const pcards = $$('.pcard');
  pcards.forEach((c, i) => {
    const next = pcards[i + 1];
    gsap.from(c.children, { y: 60, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: c, start: 'top 80%', once: true } });
    if (!next) return;
    gsap.to(c, { scale: 0.92, filter: 'brightness(.55)', ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true } });
  });

  // playables: the phone rises into place, PLAY scrolls behind it
  gsap.from('.phone-shell', { y: 160, rotateX: 28, scale: 0.85, ease: 'none', transformPerspective: 1200, scrollTrigger: { trigger: '.play', start: 'top bottom', end: 'top 20%', scrub: true } });
  gsap.from('.play-item', { x: -60, autoAlpha: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: '.play-list', start: 'top 80%', once: true } });
  gsap.fromTo('.play-word', { xPercent: 0 }, { xPercent: -35, ease: 'none', scrollTrigger: { trigger: '.play', start: 'top bottom', end: 'bottom top', scrub: true } });

  // community: vertical scroll drives a horizontal track; the centred card is in focus
  const track = $('[data-comm]');
  const dist = () => track.scrollWidth - innerWidth;
  const hTween = gsap.to(track, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: '.community .pin', pin: true, start: 'top top', end: () => `+=${dist()}`, scrub: 0.8, invalidateOnRefresh: true },
  });
  $$('.ccard').forEach(card => {
    gsap.timeline({ scrollTrigger: { trigger: card, containerAnimation: hTween, start: 'left right', end: 'right left', scrub: true } })
      .fromTo(card, { scale: 0.84, autoAlpha: 0.35, rotate: 3 }, { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.5, ease: 'power1.out' })
      .to(card, { scale: 0.84, autoAlpha: 0.35, rotate: -3, duration: 0.5, ease: 'power1.in' });
  });

  // stack rows slide in opposite directions
  $$('.srow').forEach((row, i) => {
    gsap.fromTo(row, { xPercent: i % 2 ? -30 : 0 }, { xPercent: i % 2 ? 0 : -30, ease: 'none', scrollTrigger: { trigger: '.stackrows', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // headlines
  revealLines('.sec-head--flow h2, .contact-title, .comm-intro h2, .play .sec-head h2');
  gsap.from('.crossover', { y: 120, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.crossover', start: 'top 90%', once: true } });
}

// section nav highlight
$$<HTMLAnchorElement>('.secnav a').forEach(a => {
  const sec = document.querySelector(a.getAttribute('href')!);
  if (!sec) return;
  ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 45%', onToggle: s => a.classList.toggle('is-active', s.isActive) });
});

// wait for fonts so pinned heights and split lines are measured correctly
document.fonts?.ready.then(() => ScrollTrigger.refresh());
revealLines('.hero-title', { immediate: true, delay: 0.85 });
curtainIn();
