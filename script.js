// Live clock — Central Time
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

// Build ID — date-based "build number"
(function () {
  const el = document.getElementById('buildId');
  if (!el) return;
  const d = new Date();
  const doy = Math.floor(
    (d - new Date(d.getFullYear(), 0, 0)) / 86400000
  );
  el.textContent = String(doy).padStart(3, '0');
})();

// Project card spotlight — track mouse for the radial glow
(function () {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
})();

// Reveal sections on scroll
(function () {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );
  document
    .querySelectorAll('.band, .arc-list, .about-grid, .contact-grid')
    .forEach((el) => io.observe(el));
})();
