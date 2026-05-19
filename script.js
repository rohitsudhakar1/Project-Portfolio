// ============================================================
//  BOOT SEQUENCE
// ============================================================
(function () {
  const el = document.getElementById('boot');
  if (!el) return;
  const lines = [
    '[OK] mounting /portfolio',
    '[OK] handshake · github.io',
    '[OK] loading projects: ai-ml × 4, embedded × 1, mobile × 3, web × 2',
    '[OK] ready. typing > _',
  ];
  let i = 0, j = 0, current = '';
  function tick() {
    if (i >= lines.length) {
      el.textContent = '[OK] ready · welcome';
      setTimeout(() => el.classList.add('done'), 700);
      return;
    }
    const line = lines[i];
    current = line.slice(0, j);
    el.textContent = current;
    j++;
    if (j > line.length) { i++; j = 0; setTimeout(tick, 220); return; }
    setTimeout(tick, 18 + Math.random() * 22);
  }
  setTimeout(tick, 120);
})();

// ============================================================
//  CLOCK · CT
// ============================================================
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

// ============================================================
//  CUSTOM CURSOR — crosshair + coords
// ============================================================
(function () {
  const cur = document.getElementById('cursor');
  if (!cur || matchMedia('(hover: none)').matches) return;
  const label = cur.querySelector('.cl');
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

  function loop() {
    cx += (tx - cx) * 0.3;
    cy += (ty - cy) * 0.3;
    cur.style.transform = `translate(${cx}px, ${cy}px)`;
    raf = requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (label) label.textContent = `${String(Math.round(e.clientX)).padStart(4, '0')}, ${String(Math.round(e.clientY)).padStart(4, '0')}`;
  });

  // Snap to chip / card / link
  const targets = 'a, button, .chip[data-chip], .card, .contact-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(targets)) cur.classList.add('over');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(targets)) cur.classList.remove('over');
  });
})();

// ============================================================
//  CARD SPOTLIGHT — mouse-tracked radial glow
// ============================================================
(function () {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });
})();

// ============================================================
//  CHIP → BAND JUMP
// ============================================================
(function () {
  const map = { ai: 'band-ai', embedded: 'band-embedded', mobile: 'band-mobile', web: 'band-web' };
  document.querySelectorAll('.chip[data-chip]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const id = map[chip.dataset.chip];
      const t = document.getElementById(id);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ============================================================
//  SCROLL LOG — fake-real telemetry in the footer
// ============================================================
(function () {
  const el = document.getElementById('scrollLog');
  if (!el) return;
  let raf = null;
  function update() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    let label = 'idle';
    if (p > 4)  label = 'hero';
    if (p > 18) label = 'reading · ai-ml';
    if (p > 36) label = 'reading · embedded';
    if (p > 46) label = 'reading · mobile';
    if (p > 60) label = 'reading · web';
    if (p > 72) label = 'archive';
    if (p > 82) label = 'about';
    if (p > 92) label = 'contact';
    el.textContent = `scroll ${p.toFixed(0).padStart(2, '0')}% · ${label}`;
    raf = null;
  }
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
  update();
})();

// ============================================================
//  REVEAL ON SCROLL
// ============================================================
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
  document.querySelectorAll('.band, .arc-list, .about-grid, .contact-grid').forEach((el) => io.observe(el));
})();

// ============================================================
//  KONAMI · power-cycle the board for fun
// ============================================================
(function () {
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let i = 0;
  window.addEventListener('keydown', (e) => {
    if (e.key === seq[i]) {
      i++;
      if (i === seq.length) {
        i = 0;
        document.body.animate(
          [
            { filter: 'brightness(1)' },
            { filter: 'brightness(0)' },
            { filter: 'brightness(2) hue-rotate(20deg)' },
            { filter: 'brightness(1)' },
          ],
          { duration: 1100, easing: 'cubic-bezier(.3,1,.5,1)' }
        );
      }
    } else { i = 0; }
  });
})();
