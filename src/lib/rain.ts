/** Matrix-style rain of code glyphs on a canvas, in the palette's accent colour. */
const GLYPHS = '01{}[]<>/=;:+*#$アカサタナハマヤラワ';

export function createRain(canvas: HTMLCanvasElement, colors: () => { bg: string; fg: string }, step = 18) {
  const ctx = canvas.getContext('2d')!;
  let W = 0, H = 0, drops: number[] = [], last = 0, running = true;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hexA(hex: string, a: number) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
  }
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    reset();
  }
  function reset() {
    drops = Array.from({ length: Math.ceil(W / step) }, () => Math.random() * -H / step);
    ctx.fillStyle = colors().bg; ctx.fillRect(0, 0, W, H);
    if (still) for (let i = 0; i < 40; i++) draw(1);
  }
  function draw(alpha: number) {
    const { bg, fg } = colors();
    ctx.fillStyle = hexA(bg, 0.14 * alpha); ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = fg; ctx.font = `${step - 3}px "JetBrains Mono", monospace`;
    drops.forEach((d, i) => {
      ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * step, d * step);
      drops[i] = d * step > H && Math.random() > 0.975 ? 0 : d + 1;
    });
  }
  function frame(now: number) {
    if (!running) return;
    if (!still && now - last > 55 && !document.hidden) { last = now; draw(1); }
    requestAnimationFrame(frame);
  }
  resize();
  addEventListener('resize', resize);
  requestAnimationFrame(frame);
  return { reset, stop: () => { running = false; } };
}
