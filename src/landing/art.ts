// Low-opacity background art: creator icons and graffiti on one side, code glyphs on the other.

const SVG_NS = 'http://www.w3.org/2000/svg';

const ICONS: Record<string, string> = {
  ig: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/>',
  yt: '<rect x="1.5" y="5" width="21" height="14" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9l5.5 3-5.5 3z" fill="currentColor"/>',
  cam: '<path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="13" r="3.6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  chat: '<path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12z" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  spark: '<path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="currentColor"/>',
  reel: '<rect x="6" y="2" width="12" height="20" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor"/>',
  hanger: '<path d="M12 7a2 2 0 1 1 2-2c0 1.2-2 1.6-2 3l9 6.5c.8.6.4 1.5-.5 1.5H3.5c-.9 0-1.3-.9-.5-1.5L12 8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  shoe: '<path d="M3 16v-5l4 1 3-4 3 3c2 2 5 2 8 3v2z M3 16h18v2H3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  in: '<rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 10.5v6.5M7 7v.2M11 17v-6.5m0 3c0-1.8 1.1-3 2.6-3s2.4 1 2.4 2.8V17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  tag: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  term: '<rect x="2" y="4" width="20" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 9l3 3-3 3M11 15h6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  git: '<circle cx="6" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="19" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="9" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6 7.2v9.6M18 11.2c0 3-3 4-7 4.6L6 16.8" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 18.5h3" stroke="currentColor" stroke-width="1.8"/>',
  bug: '<rect x="7" y="8" width="10" height="12" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 8a3 3 0 0 1 6 0M3 13h4M17 13h4M4 8l3 2M20 8l-3 2M4 19l3-2M20 19l-3-2" fill="none" stroke="currentColor" stroke-width="1.8"/>',
  flutter: '<path d="M14 3L5 12l3 3L20 3zM14 12l-6 6 3 3h6l-3-3 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
};

const SETS = {
  content: { icons: ['ig', 'yt', 'cam', 'heart', 'chat', 'mic', 'spark', 'reel', 'hanger', 'shoe'],
    words: ['hit record', '#reels', 'POV:', 'link in bio', 'take 7', 'ootd', 'fit check', 'yap session', 'swipe →'] },
  code: { icons: ['in', 'tag', 'term', 'git', 'phone', 'bug', 'flutter'],
    words: ['git push origin main', 'flutter run', '200 OK', 'if (bug) fix();', '// TODO: sleep', 'setState(() {})', '{ }', '=>', 'await ship();', 'pubspec.yaml'] },
};

function rng(seed: number) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

export function buildArt(el: HTMLElement, kind: 'content' | 'code', W: number, H: number) {
  const set = SETS[kind];
  const r = rng(kind === 'code' ? 7 : 42);
  el.textContent = '';
  const cell = W < 760 ? 92 : 128;
  for (let y = 0; y < H + 80; y += cell) for (let x = 0; x < W + 80; x += cell) {
    if (r() < 0.22) continue;
    const px = x + r() * cell * 0.7, py = y + r() * cell * 0.7, rot = (r() - 0.5) * 40;
    if (r() < 0.2) {
      const s = document.createElement('span');
      s.className = 'w';
      s.textContent = set.words[Math.floor(r() * set.words.length)];
      s.style.cssText = `left:${px}px;top:${py}px;transform:rotate(${kind === 'code' ? 0 : rot}deg)`;
      el.appendChild(s);
    } else {
      const size = 22 + r() * 30;
      const svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', String(size));
      svg.setAttribute('height', String(size));
      svg.style.cssText = `left:${px}px;top:${py}px;transform:rotate(${rot}deg)`;
      svg.innerHTML = ICONS[set.icons[Math.floor(r() * set.icons.length)]];
      el.appendChild(svg);
    }
  }
}
