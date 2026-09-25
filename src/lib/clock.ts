/** Live India time for every [data-clock] element. */
export function initClock() {
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  const tick = () => document.querySelectorAll('[data-clock]').forEach(el => { el.textContent = `IST ${fmt.format(new Date())}`; });
  tick();
  setInterval(tick, 15000);
}
