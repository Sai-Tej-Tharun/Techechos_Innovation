/**
 * ============================================================
 * TechEchos Innovation — service-detail.js
 * SHARED by all 6 service detail pages.
 *
 * Handles:
 *  1. Hero particle canvas (constellation)
 *  2. Stat counter animations
 *  3. FAQ accordion
 *  4. Sidebar newsletter form
 *  5. Bottom CTA canvas + floating bulbs
 *  6. Scroll reveal trigger
 * ============================================================
 */

'use strict';


const _db = (fn, d) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; };

/* ─────────────────────────────────────────────
   1. HERO PARTICLE CANVAS
   ───────────────────────────────────────────── */
function initCanvas() {
  const canvas = document.getElementById('sd-canvas');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  const COLS = [[123,47,190],[249,115,22],[236,72,153],[255,182,35],[0,207,255]];
  let W, H, pts;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    build();
  }

  function build() {
    const n = Math.min(65, Math.floor((W * H) / 10000));
    pts = Array.from({ length: n }, () => {
      const c = COLS[Math.floor(Math.random() * COLS.length)];
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
        r: 1 + Math.random() * 2.5,
        c, a: .20 + Math.random() * .48, p: Math.random() * Math.PI * 2,
      };
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 115) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          const [r, g, b] = pts[i].c;
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / 115) * .13})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }

    
    pts.forEach(p => {
      p.p  += .016;
      p.x  += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      const a = p.a * (.65 + .35 * Math.sin(p.p));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', _db(resize, 250));
}


/* ─────────────────────────────────────────────
   2. STAT COUNTER ANIMATIONS
   ───────────────────────────────────────────── */
function initCounters() {
  const els = document.querySelectorAll('.sd-hero-stat-val[data-count], .sd-mc-val[data-count]');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur    = 2000;
      const start  = performance.now();
      const isF    = String(target).includes('.');

      const step = now => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = (isF ? (e * target).toFixed(1) : Math.floor(e * target)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => obs.observe(el));
}


/* ─────────────────────────────────────────────
   3. FAQ ACCORDION
   ───────────────────────────────────────────── */
function initFAQ() {
  const lists = document.querySelectorAll('.sd-acc-list');
  lists.forEach(list => {
    list.querySelectorAll('.sd-acc-item').forEach(item => {
      const trigger = item.querySelector('.sd-acc-trigger');
      const body    = item.querySelector('.sd-acc-body');
      const inner   = item.querySelector('.sd-acc-body-inner');
      if (!trigger || !body || !inner) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        
        list.querySelectorAll('.sd-acc-item.is-open').forEach(open => {
          open.classList.remove('is-open');
          open.querySelector('.sd-acc-trigger')?.setAttribute('aria-expanded', 'false');
          open.querySelector('.sd-acc-body').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = inner.scrollHeight + 'px';
        }
      });
    });
  });
}


/* ─────────────────────────────────────────────
   4. SIDEBAR NEWSLETTER
   ───────────────────────────────────────────── */
function initSidebarNL() {
  document.querySelectorAll('.sd-nl-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input?.value.trim() ?? '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (input) {
          input.style.borderColor = 'rgba(239,68,68,.6)';
          setTimeout(() => { input.style.borderColor = ''; }, 2500);
        }
        return;
      }
      if (window.TechEchos?.showToast) {
        window.TechEchos.showToast('🎉 Subscribed to TechEchos Insights!', 'success', 4000);
      }
      form.reset();
    });
  });
}


/* ─────────────────────────────────────────────
   5. CTA CANVAS + FLOATING BULBS
   ───────────────────────────────────────────── */
function initCTASection() {

  
  const bWrap = document.getElementById('sd-cta-bulbs');
  if (bWrap) {
    for (let i = 0; i < 14; i++) {
      const img = document.createElement('img');
      img.src = 'images/logo.svg'; img.alt = '';
      img.className = 'sd-cbi';
      const sz = 14 + Math.random() * 28;
      Object.assign(img.style, {
        width:  `${sz}px`, height: `${sz}px`,
        left:   `${Math.random() * 100}%`,
        bottom: `-${sz}px`,
        filter: `drop-shadow(0 0 ${sz * .3}px rgba(249,115,22,.60))`,
        animationDuration: `${5 + Math.random() * 7}s`,
        animationDelay:    `${Math.random() * 5}s`,
      });
      bWrap.appendChild(img);
    }
  }

  
  const canvas = document.getElementById('sd-cta-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };

  const pts = Array.from({ length: 40 }, () => ({
    x: Math.random() * 1000, y: Math.random() * 500,
    r: 1 + Math.random() * 3, vy: .10 + Math.random() * .25,
    c: ['rgba(123,47,190','rgba(249,115,22','rgba(236,72,153'][Math.floor(Math.random() * 3)],
    a: .10 + Math.random() * .28,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.y -= p.vy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.c},${p.a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); draw();
  window.addEventListener('resize', _db(resize, 250));
}


/* ─────────────────────────────────────────────
   6. SCROLL REVEAL (supplement to global.js)
   ───────────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}


/* ─────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initCounters();
  initFAQ();
  initSidebarNL();
  initCTASection();
  initReveal();

  
  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.add('visible');
    });
  }, 160);
});
