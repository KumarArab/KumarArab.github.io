import '../styles/landing.css';
import { initPaletteChips, mix, onPalette, type Palette } from '../lib/palette';
import { initCursor, initMagnetic, reduceMotion } from '../lib/motion';
import { curtainIn, initTransitions } from '../lib/transition';
import { createRain } from '../lib/rain';
import { initClock } from '../lib/clock';
import { buildArt } from './art';
import type { Brain } from './brain';

const stage = document.getElementById('stage')!;
const liquid = document.getElementById('liquid') as HTMLCanvasElement;
const ctx = liquid.getContext('2d')!;
const codeLayer = document.querySelector<HTMLElement>('.code-layer')!;
const arts = [...document.querySelectorAll<HTMLElement>('.art')];
const reduce = reduceMotion();
const clamp = (n: number, a: number, z: number) => Math.max(a, Math.min(z, n));

let palette: Palette = initPaletteChips();
// the thin 'meniscus' behind the liquid edge: a soft blend of both sides
const bg2 = () => mix(palette.content.bg, palette.code.bg, 0.22);
let codeBg2 = bg2();

const rain = createRain(document.getElementById('rain') as HTMLCanvasElement, () => ({ bg: palette.code.bg, fg: palette.code.accent }));

// three.js is large, so the brain loads after the page is already interactive
let brain: Brain | null = null;
const brainCanvas = document.getElementById('brain') as HTMLCanvasElement;
brainCanvas.style.opacity = '0';
import('./brain').then(({ createBrain }) => {
  try { brain = createBrain(brainCanvas); } catch { return; /* no WebGL: the split still works */ }
  brain.setColors(palette.code.accent, palette.content.accent);
  brain.resize(W, H, brainSize, !horiz);
  brainCanvas.style.transition = 'opacity 1.2s';
  requestAnimationFrame(() => { brainCanvas.style.opacity = '1'; });
});

onPalette(p => {
  palette = p;
  codeBg2 = bg2();
  rain.reset();
  brain?.setColors(p.code.accent, p.content.accent);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', p.code.bg);
});

/* ---------- layout ---------- */
let W = 0, H = 0, horiz = true, brainSize = 300;
function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  horiz = !(W <= 760 && H > W);
  brainSize = horiz ? Math.min(W * 0.3, H * 0.46, 460) : Math.min(W * 0.62, H * 0.3);
  stage.style.setProperty('--brain', `${brainSize}px`);
  liquid.width = W * dpr; liquid.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  arts.forEach(a => buildArt(a, a.dataset.art as 'code' | 'content', W, H));
  brain?.resize(W, H, brainSize, !horiz);
  document.querySelectorAll('.router').forEach(r => {
    r.textContent = horiz ? 'Hiring? Go left. Collaborating? Go right.' : 'Hiring? Go up. Collaborating? Go down.';
  });
}

/* ---------- liquid split ---------- */
// b = share of the screen taken by Code (left, or top on phones)
let b = 0.5, v = 0, target = 0.5, locked: string | null = null;
const ptr = { x: 0, y: 0, last: -1e9 };
const A = () => (horiz ? W : H);   // axis the split moves along
const C = () => (horiz ? H : W);   // axis the edge runs along

function steer(x: number, y: number) {
  ptr.x = x; ptr.y = y; ptr.last = performance.now();
  if (locked) return;
  const f = horiz ? x / W : y / H;
  target = clamp(0.5 + (0.5 - f) * 1.55, 0, 1);   // the side you move toward floods
}
addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.buttons) steer(e.clientX, e.clientY); }, { passive: true });
addEventListener('pointerdown', e => { ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });

const base = () => -0.12 * A() + b * 1.24 * A();
function edge(s: number, t: number, amp: number) {
  const wob = amp * (Math.sin(s * 0.006 + t * 1.1) * 0.6 + Math.sin(s * 0.013 - t * 1.7) * 0.3 + Math.sin(s * 0.021 + t * 0.6) * 0.1);
  const d = (s - (horiz ? ptr.y : ptr.x)) / (C() * 0.22);
  return base() + wob + clamp(v, -0.04, 0.04) * A() * 3.2 * Math.exp(-d * d);
}
function points(t: number, amp: number, shift: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let s = -20; s <= C() + 20; s += 14) {
    const e = edge(s, t, amp) + shift;
    pts.push(horiz ? [e, s] : [s, e]);
  }
  return pts;
}
const corners = (): [number, number][] => (horiz ? [[-10, -20], [-10, H + 20]] : [[-20, -10], [W + 20, -10]]);
function fill(pts: [number, number][], color: string) {
  const [c0, c1] = corners();
  ctx.beginPath();
  ctx.moveTo(c0[0], c0[1]);
  ctx.lineTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length - 1; i++) {
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last[0], last[1]);
  ctx.lineTo(c1[0], c1[1]);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
function clipPath(pts: [number, number][]) {
  const [c0, c1] = corners();
  const body = pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L');
  return `path('M${c0[0]} ${c0[1]} L${body} L${c1[0]} ${c1[1]} Z')`;
}

function frame(now: number) {
  const t = reduce ? 0 : now / 1000;
  if (!locked && now - ptr.last > 2500) target = 0.5 + (reduce ? 0 : 0.08 * Math.sin(t * 0.7));
  if (reduce) { b = target; v = 0; } else { v += (target - b) * 0.05; v *= 0.84; b += v; }

  const calm = 1 - Math.min(1, Math.abs(b - 0.5) * 1.6);
  const amp = reduce ? 0 : Math.min(A() * 0.03, 34) * (0.25 + calm * 0.75);

  ctx.clearRect(0, 0, W, H);
  const main = points(t, amp, 0);
  fill(points(t + 0.9, amp * 1.25, 10), codeBg2);
  fill(main, palette.code.bg);
  codeLayer.style.clipPath = clipPath(main);

  const px = ptr.x / W - 0.5 || 0, py = ptr.y / H - 0.5 || 0;
  arts.forEach(a => {
    const k = a.dataset.art === 'code' ? 14 : -18;
    a.style.transform = `translate(${(px * k).toFixed(1)}px, ${(py * k).toFixed(1)}px)`;
  });
  brain?.update({ activity: clamp((b - 0.5) * 2.2, -1, 1), px: horiz ? px : py, py: horiz ? py : -px, t });
  requestAnimationFrame(frame);
}

/* ---------- interactions ---------- */
stage.addEventListener('click', e => {
  if ((e.target as Element).closest('a, button')) return;
  // tapping a side leans the split toward it
  const onCode = (horiz ? e.clientX : e.clientY) < base();
  target = onCode ? 0.8 : 0.2;
  ptr.last = performance.now() + 4000;
});
addEventListener('keydown', e => {
  if (locked) return;
  const toCode = horiz ? 'ArrowLeft' : 'ArrowUp', toContent = horiz ? 'ArrowRight' : 'ArrowDown';
  if (e.key === toCode) { target = clamp(target + 0.25, 0, 1); ptr.last = performance.now(); }
  if (e.key === toContent) { target = clamp(target - 0.25, 0, 1); ptr.last = performance.now(); }
});

// Entering a side: flood the screen, fly the camera into that hemisphere, then navigate.
initTransitions(kind => {
  if (kind !== 'code' && kind !== 'content') return 0;
  locked = kind;
  target = kind === 'code' ? 1 : 0;
  brain?.dive(kind);
  return reduce ? 0 : 450;
});
addEventListener('pageshow', e => { if (e.persisted) { locked = null; target = 0.5; location.reload(); } });

resize();
addEventListener('resize', resize);
ptr.x = W / 2; ptr.y = H / 2;
initClock();
initCursor();
initMagnetic();
requestAnimationFrame(frame);
curtainIn();
