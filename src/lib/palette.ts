// One brand palette per day of the week, picked by the weekday in India (IST).
// Each side's accent is the other side's main colour, which ties the two halves together.

export interface Palette {
  day: string;
  name: string;
  code: { bg: string; ink: string; accent: string };
  content: { bg: string; ink: string; accent: string };
}

// Index 0 = Sunday, matching Date.getDay().
export const PALETTES: Palette[] = [
  { day: 'Sun', name: 'Bone & Oxblood', code: { bg: '#E9E2D4', ink: '#1A1714', accent: '#7A1F2B' }, content: { bg: '#7A1F2B', ink: '#F4EADB', accent: '#F4EADB' } },
  { day: 'Mon', name: 'Graphite & Cobalt', code: { bg: '#131316', ink: '#ECECEC', accent: '#6F86FF' }, content: { bg: '#2E48F0', ink: '#FFF4E0', accent: '#FFF4E0' } },
  { day: 'Tue', name: 'Forest & Blush', code: { bg: '#0F2A22', ink: '#EFE6D8', accent: '#86D6A8' }, content: { bg: '#F1C4B3', ink: '#4A1621', accent: '#4A1621' } },
  { day: 'Wed', name: 'Navy & Coral', code: { bg: '#0F1B33', ink: '#F2ECE1', accent: '#FF7A59' }, content: { bg: '#FF7A59', ink: '#1B0F0A', accent: '#0F1B33' } },
  { day: 'Thu', name: 'Espresso & Matcha', code: { bg: '#1E1611', ink: '#EFE4D2', accent: '#A8C686' }, content: { bg: '#A8C686', ink: '#1E1611', accent: '#1E1611' } },
  { day: 'Fri', name: 'Saffron Night', code: { bg: '#0E1116', ink: '#EDE6D6', accent: '#F0A33A' }, content: { bg: '#F0A33A', ink: '#17120B', accent: '#0E1116' } },
  { day: 'Sat', name: 'Aubergine & Lilac', code: { bg: '#1E1226', ink: '#EFE6F2', accent: '#C8B3F0' }, content: { bg: '#C8B3F0', ink: '#1E1226', accent: '#1E1226' } },
];

const KEY = 'ak-palette';

export function todayIndex(): number {
  const wd = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'Asia/Kolkata' }).format(new Date());
  const i = PALETTES.findIndex(p => p.day === wd);
  return i < 0 ? 5 : i;
}

/** The palette to show: a visitor's pick for this session, else today's. */
export function currentIndex(): number {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v !== null && PALETTES[+v]) return +v;
  } catch { /* storage blocked: fall back to today */ }
  return todayIndex();
}

export function mix(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
  return '#' + ((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1);
}

type Listener = (p: Palette, index: number) => void;
const listeners: Listener[] = [];
export const onPalette = (fn: Listener) => listeners.push(fn);

export function applyPalette(index: number, remember = false): Palette {
  const p = PALETTES[index];
  const s = document.documentElement.style;
  s.setProperty('--code-bg', p.code.bg);
  s.setProperty('--code-ink', p.code.ink);
  s.setProperty('--code-accent', p.code.accent);
  s.setProperty('--code-bg-2', mix(p.code.bg, p.code.accent, 0.14));
  s.setProperty('--content-bg', p.content.bg);
  s.setProperty('--content-ink', p.content.ink);
  s.setProperty('--content-accent', p.content.accent);
  s.setProperty('--content-bg-2', mix(p.content.bg, '#ffffff', 0.18));
  if (remember) { try { sessionStorage.setItem(KEY, String(index)); } catch { /* ignore */ } }
  listeners.forEach(fn => fn(p, index));
  return p;
}

/** Wires every [data-palette-chip] button to cycle through the week's palettes. */
export function initPaletteChips(): Palette {
  let i = currentIndex();
  const today = todayIndex();
  const render = () => document.querySelectorAll<HTMLElement>('[data-palette-chip]').forEach(el => {
    const p = PALETTES[i];
    el.innerHTML = `<i style="background:linear-gradient(90deg,${p.code.bg} 50%,${p.content.bg} 50%)"></i><b>${i === today ? 'Today' : p.day}</b><span>${p.name}</span>`;
    el.title = 'Every day of the week has its own colours. Tap to preview another day.';
  });
  document.querySelectorAll('[data-palette-chip]').forEach(el => el.addEventListener('click', e => {
    e.stopPropagation();
    i = (i + 1) % PALETTES.length;
    applyPalette(i, true);
    render();
  }));
  const p = applyPalette(i);
  render();
  return p;
}
