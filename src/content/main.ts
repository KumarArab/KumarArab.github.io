import '../styles/content.css';
import { initPaletteChips } from '../lib/palette';
import { gsap, ScrollTrigger, SplitText, getLenis, initSmoothScroll, initCounters, initCursor, initMagnetic, revealLines, reduceMotion } from '../lib/motion';
import { curtainIn, initTransitions } from '../lib/transition';
import { initClock } from '../lib/clock';
import { buildArt } from '../landing/art';
import { audience, brandFit, collabs, creator, feed, headline, heroReel, pillars, services, why, type Pillar, type Stat } from './data';

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s)!;
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const RM = reduceMotion();
if (RM) document.documentElement.classList.add('rm');
initPaletteChips();

const ICON: Record<string, string> = {
  dance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="2"/><path d="M13 6.5l-1.5 6 3.5 3-1 5M11.5 12.5L8 14l-2.5 5M12 8.5l4.5 1.5 2.5-3M12 8.5L8 7 5.5 9"/></svg>',
  hanger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 7a2 2 0 1 1 2-2c0 1.2-2 1.6-2 3l9 6.5c.8.6.4 1.5-.5 1.5H3.5c-.9 0-1.3-.9-.5-1.5L12 8"/></svg>',
  laugh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M7 13.5c1 2.8 2.8 4 5 4s4-1.2 5-4zM8 9.5l2 .8M16 9.5l-2 .8"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" fill="#fff"/></svg>',
  comment: '<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12z" fill="none" stroke="#fff" stroke-width="2"/></svg>',
  share: '<svg viewBox="0 0 24 24"><path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>',
};

const fmt = (s: Stat) => s.value === null ? '<i class="soon">soon</i>' : `${s.value.toFixed(s.decimals ?? 0)}<small>${s.suffix ?? ''}</small>`;

function reelHTML(p: Pick<Pillar, 'name' | 'formats' | 'image' | 'reel' | 'tint' | 'icon' | 'link'>) {
  const media = p.reel
    ? `<video src="${p.reel}" ${p.image ? `poster="${p.image}"` : ''} autoplay muted loop playsinline preload="metadata"></video>`
    : p.image
      ? `<img src="${p.image}" alt="${esc(p.name)} reel on @flipsidefolly" loading="lazy">`
      : `<div class="reel-ph" style="--t1:${p.tint[0]};--t2:${p.tint[1]}">${ICON[p.icon]}<b>${esc(p.name)}</b><span>reel coming soon</span></div>`;
  const badge = p.link ? '<span class="reel-play" aria-hidden="true">▶ Tap for sound</span>' : '';
  const body = `${media}${badge}
    <div class="reel-ui" aria-hidden="true">${ICON.heart}${ICON.comment}${ICON.share}</div>
    <p class="reel-handle">${esc(creator.handle)}<small>${esc(p.formats.split(' · ')[0])}</small></p>`;
  return p.link ? `<a class="reel-link" href="${p.link}" target="_blank" rel="noopener" data-ig="${p.link}" aria-label="Play the ${esc(p.name)} reel with sound">${body}</a>` : body;
}

/* ---------- hero ---------- */
$('[data-hero-reel]').innerHTML = reelHTML(heroReel);
$('[data-hero-stats]').innerHTML = headline.map(s => `<li><b>${fmt(s)}</b><span>${esc(s.label)}</span></li>`).join('');
const stickers = $('[data-stickers]');
const drawStickers = () => buildArt(stickers, 'content', stickers.clientWidth, stickers.clientHeight);
drawStickers();

/* ---------- pillars ---------- */
$('[data-pillar-names]').innerHTML = pillars.map(p => `<p class="pillar-name">${esc(p.name)}</p>`).join('');
$('[data-pillar-copy]').innerHTML = pillars.map((p, i) => `
  <article class="pillar-item">
    <p class="kicker">${String(i + 1).padStart(2, '0')} / ${String(pillars.length).padStart(2, '0')}</p>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.line)}</p>
    <dl><div><dt>Formats</dt><dd style="font:400 14px/1.4 var(--mono)">${esc(p.formats)}</dd></div></dl>
    ${p.link ? `<a class="btn btn-line" href="${p.link}" target="_blank" rel="noopener" data-ig="${p.link}">Watch this reel <span class="arrow">↗</span></a>` : ''}
  </article>`).join('');
$('[data-pillar-dots]').innerHTML = pillars.map(() => '<li></li>').join('');
const pillarReel = $('[data-pillar-reel]');
const pillarBg = $('[data-pillar-bg]');
let pillarIdx = -1;
function showPillar(i: number) {
  if (i === pillarIdx) return;
  pillarIdx = i;
  pillarReel.innerHTML = reelHTML(pillars[i]);
  pillarBg.style.background = `radial-gradient(70% 60% at 50% 55%, ${pillars[i].tint[1]}, transparent 70%)`;
  $$('.pillar-dots li').forEach((d, j) => d.classList.toggle('is-on', j === i));
  if (!RM) gsap.fromTo(pillarReel, { scale: 0.92, rotate: i % 2 ? -4 : 4 }, { scale: 1, rotate: 0, duration: 0.6, ease: 'expo.out' });
}
showPillar(0);

/* ---------- numbers ---------- */
$('[data-asof]').textContent = creator.statsAsOf ? `From Instagram Insights, as of ${creator.statsAsOf}.` : 'Live numbers are being added.';
$('[data-stats]').innerHTML = headline.map(s => `
  <div class="stat"><b>${fmt(s)}</b><p class="label">${esc(s.label)}</p><p class="note">${esc(s.note)}</p></div>`).join('');

/* ---------- audience ---------- */
const bars = (rows: { label: string; value: number | null }[]) => {
  const max = Math.max(...rows.map(r => r.value ?? 0), 1);
  return rows.map(r => `
  <div class="bar-row"><span>${esc(r.label)}</span><span class="bar ${r.value === null ? 'empty' : ''}"><i style="width:${((r.value ?? 0) / max) * 100}%"></i></span><span>${r.value === null ? '—' : r.value + '%'}</span></div>`).join('');
};
$('[data-audience]').innerHTML = `
  <article class="aud-card"><h3>Gender</h3>
    <div class="split">${audience.gender.map(g => `<div style="flex:${g.value ?? 50}"><b>${g.value === null ? '—' : g.value + '%'}</b>${esc(g.label)}</div>`).join('')}</div>
    <p class="aud-note">90% of the audience is 18–34.</p></article>
  <article class="aud-card aud-card--wide"><h3>Age</h3>${bars(audience.age)}</article>
  <article class="aud-card aud-card--wide"><h3>Top countries</h3>${bars(audience.countries)}</article>`;

/* ---------- why it works ---------- */
$('[data-why]').innerHTML = why.map((w, i) => `
  <li class="why-item"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(w.title)}</h3><p>${esc(w.body)}</p></li>`).join('');

/* ---------- brand fit, collabs, feed, services ---------- */
$('[data-fit-yes]').innerHTML = brandFit.yes.map(b => `<span>${esc(b)}</span>`).join('');
$('[data-fit-no]').innerHTML = brandFit.no.map(b => `<span>${esc(b)}</span>`).join('');
$('[data-collabs]').innerHTML = collabs.map(c => `
  <a class="collab" href="${c.url}" target="_blank" rel="noopener">
    <img class="collab-logo" src="${c.logo}" alt="${esc(c.brand)} logo" loading="lazy">
    <b>${esc(c.brand)}</b>
    <p class="collab-cat">${esc(c.category)}</p>
    <p class="collab-count"><strong data-count="${c.videos}">${c.videos}</strong> UGC videos</p>
  </a>`).join('');
const feedItems = feed.map(f => `<a class="feed-item" href="${f.url}" target="_blank" rel="noopener" data-ig="${f.url}"><img src="${f.image}" alt="Reel on @flipsidefolly" loading="lazy"></a>`).join('');
$('[data-feed]').innerHTML = feedItems + feedItems.replaceAll('<a class="feed-item"', '<a class="feed-item" aria-hidden="true" tabindex="-1"');
$('[data-services]').innerHTML = services.map((s, i) => `
  <li class="svc"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${esc(s.name)}</b><span>${esc(s.detail)}</span></li>`).join('');

/* ---------- reel player: Instagram's own embed, with sound, in a lightbox ---------- */
const player = document.createElement('div');
player.className = 'ig-player';
player.hidden = true;
player.innerHTML = `<div class="ig-box" role="dialog" aria-modal="true" aria-label="Instagram reel">
  <button class="ig-close" type="button" aria-label="Close">×</button>
  <iframe title="Instagram reel" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
  <a class="ig-open" target="_blank" rel="noopener">Open in Instagram ↗</a></div>`;
document.body.appendChild(player);
const igFrame = player.querySelector('iframe')!;
const closePlayer = () => { player.hidden = true; igFrame.src = 'about:blank'; document.documentElement.classList.remove('is-locked'); getLenis()?.start(); };
player.addEventListener('click', e => { if (e.target === player || (e.target as Element).closest('.ig-close')) closePlayer(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !player.hidden) closePlayer(); });
document.addEventListener('click', e => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('[data-ig]');
  if (!a || e.metaKey || e.ctrlKey) return;
  const m = a.dataset.ig!.match(/instagram\.com\/(?:p|reel)\/([^/?#]+)/);
  if (!m) return;
  e.preventDefault();
  igFrame.src = `https://www.instagram.com/p/${m[1]}/embed/`;
  player.querySelector<HTMLAnchorElement>('.ig-open')!.href = a.dataset.ig!;
  player.hidden = false;
  document.documentElement.classList.add('is-locked');
  getLenis()?.stop();
});

/* ---------- book ---------- */
$('[data-year]').textContent = String(new Date().getFullYear());
$('[data-email]').addEventListener('click', async () => {
  const out = $('[data-copied]');
  try { await navigator.clipboard.writeText(creator.email); out.textContent = 'Email copied. Opening your mail app…'; }
  catch { out.textContent = creator.email; }
  location.href = `mailto:${creator.email}?subject=${encodeURIComponent('Collab with @flipsidefolly')}`;
});

/* ---------- motion ---------- */
initSmoothScroll();
initCounters();
initCursor();
initMagnetic();
initClock();
initTransitions();
addEventListener('resize', drawStickers);

if (!RM) {
  // hero
  revealLines('.hero-title', { immediate: true, delay: 0.85 });
  gsap.from('.hero .kicker, .hero-sub, .hero-ctas, .hero-stats li', { y: 30, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 1.05 });
  gsap.from('.hero-reel', { y: 140, rotate: 16, autoAlpha: 0, duration: 1.5, ease: 'expo.out', delay: 1.1 });
  gsap.to('.hero-reel', { yPercent: -25, rotate: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.stickers', { yPercent: 30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // meet: each word lights up in turn
  const words = SplitText.create('[data-meet]', { type: 'words', wordsClass: 'word' }).words;
  gsap.to(words, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.meet .pin', pin: true, start: 'top top', end: '+=150%', scrub: 0.6 } });

  // pillars: one at a time
  const pNames = $$('.pillar-name'), pItems = $$('.pillar-item');
  const n = pillars.length;
  gsap.set([...pNames.slice(1), ...pItems.slice(1)], { autoAlpha: 0, y: 70 });
  const pTl = gsap.timeline({
    onUpdate() { showPillar(Math.min(n - 1, Math.floor(this.time() + 0.1))); },
    scrollTrigger: { trigger: '.pillars .pin', pin: true, start: 'top top', end: () => `+=${n * innerHeight}`, scrub: 0.8 },
  });
  for (let i = 1; i < n; i++) {
    pTl.to([pNames[i - 1], pItems[i - 1]], { autoAlpha: 0, y: -70, duration: 0.3 }, i - 0.25)
      .to([pNames[i], pItems[i]], { autoAlpha: 1, y: 0, duration: 0.35 }, i - 0.05);
  }
  pTl.to({}, { duration: 0.6 }, n - 0.6);

  // numbers: one giant stat at a time
  const stats = $$('.stat');
  gsap.set(stats.slice(1), { autoAlpha: 0, yPercent: 40 });
  const sTl = gsap.timeline({ scrollTrigger: { trigger: '.numbers .pin', pin: true, start: 'top top', end: () => `+=${stats.length * innerHeight * 0.8}`, scrub: 0.8 } });
  sTl.to('[data-stat-fill]', { scaleX: 1, ease: 'none', duration: stats.length }, 0);
  stats.forEach((s, i) => {
    if (!i) return;
    sTl.to(stats[i - 1], { autoAlpha: 0, yPercent: -40, duration: 0.35 }, i - 0.3)
      .to(s, { autoAlpha: 1, yPercent: 0, duration: 0.4 }, i - 0.1);
  });

  // audience bars grow, cards rise
  gsap.from('.aud-card', { y: 90, autoAlpha: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.aud-grid', start: 'top 80%', once: true } });
  gsap.from('.bar i', { scaleX: 0, duration: 1.4, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '.aud-grid', start: 'top 70%', once: true } });

  gsap.from('.why-item', { y: 100, autoAlpha: 0, stagger: 0.15, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.why-list', start: 'top 80%', once: true } });

  // brand chips fly in from scattered spots
  gsap.from('.fit-cloud span', {
    x: () => gsap.utils.random(-260, 260), y: () => gsap.utils.random(80, 220), rotate: () => gsap.utils.random(-25, 25), autoAlpha: 0,
    duration: 1.2, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: '.fit', start: 'top 70%', once: true },
  });
  gsap.from('.collab', { y: 120, rotate: (i: number) => (i - 1) * 5, autoAlpha: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.collab-list', start: 'top 80%', once: true } });
  gsap.from('.svc', { xPercent: 12, autoAlpha: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.svc-list', start: 'top 80%', once: true } });

  revealLines('.sec-head h2, .book-title');
  gsap.from('.crossover', { y: 120, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.crossover', start: 'top 90%', once: true } });
}

// section nav highlight (after pins, so positions include pin spacing)
$$<HTMLAnchorElement>('.secnav a').forEach(a => {
  const sec = document.querySelector(a.getAttribute('href')!);
  if (!sec) return;
  ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 45%', onToggle: s => a.classList.toggle('is-active', s.isActive) });
});

// the top bar flips colours over the dark numbers section
ScrollTrigger.create({ trigger: '.numbers', start: 'top 40px', end: 'bottom 40px', toggleClass: { targets: document.body, className: 'dark-zone' } });

document.fonts?.ready.then(() => ScrollTrigger.refresh());
curtainIn();
