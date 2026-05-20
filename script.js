// Clock
(function () {
  const el = document.getElementById('clock');
  if (!el) return;
  const tick = () => {
    const now = new Date();
    const ct = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    const hh = String(ct.getHours()).padStart(2, '0');
    const mm = String(ct.getMinutes()).padStart(2, '0');
    const ss = String(ct.getSeconds()).padStart(2, '0');
    el.textContent = `${hh}:${mm}:${ss} CT`;
  };
  tick();
  setInterval(tick, 1000);
})();

// Custom cursor
(function () {
  const cur = document.getElementById('cursor');
  if (!cur || matchMedia('(hover: none)').matches) return;
  let tx = 0, ty = 0, cx = 0, cy = 0;
  function loop() {
    cx += (tx - cx) * 0.3;
    cy += (ty - cy) * 0.3;
    cur.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  }
  loop();
  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
})();

// Card spotlight
(function () {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });
})();

// Chip click jumps to band
(function () {
  const map = { ai: 'band-ai', embedded: 'band-embedded', mobile: 'band-mobile', web: 'band-web' };
  document.querySelectorAll('.chip[data-chip]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const t = document.getElementById(map[chip.dataset.chip]);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
