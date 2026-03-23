/**
 * TechEchos Innovation — blog-detail.js
 * SHARED by all 6 blog detail pages.
 * Handles: canvas, reading progress, TOC spy,
 * sidebar share, newsletter, more-articles grid,
 * CTA canvas, floating bulbs, copy-to-clipboard.
 */
'use strict';

/* ─────────────────────────────────────────────
   SHARED RELATED ARTICLE DATA
   (used to populate "More Articles" section)
   ───────────────────────────────────────────── */
const BD_RELATED = [
  { title:'The AI Revolution in Software Development — 2025',      cat:'AI / ML',   href:'ai-trends.html',            date:'Mar 10, 2025', read:'12 min', grad:'linear-gradient(135deg,#7B2FBE,#EC4899)' },
  { title:'The 7-Step Cloud Migration Playbook That Actually Works',cat:'Cloud',     href:'cloud-migration.html',      date:'Mar 5, 2025',  read:'15 min', grad:'linear-gradient(135deg,#0369A1,#22C55E)' },
  { title:'Digital Transformation Is Dead — Long Live Product Thinking',cat:'Strategy',href:'digital-transformation.html',date:'Mar 8, 2025',read:'10 min', grad:'linear-gradient(135deg,#BE185D,#7B2FBE)' },
  { title:'Why Startups Fail at Technology: The 7 Patterns',        cat:'Startup',   href:'startup-advice.html',       date:'Mar 3, 2025',  read:'11 min', grad:'linear-gradient(135deg,#EC4899,#F97316)' },
  { title:'Design Systems in 2025: Are They Worth It?',             cat:'Design',    href:'ux-design-2025.html',       date:'Mar 6, 2025',  read:'13 min', grad:'linear-gradient(135deg,#D97706,#EA580C)' },
  { title:'The Security Audit Every SaaS Startup Must Do',          cat:'Security',  href:'cybersecurity-tips.html',   date:'Mar 1, 2025',  read:'19 min', grad:'linear-gradient(135deg,#166534,#0369A1)' },
];


const debounce = (fn, d) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; };

/* ─────────────────────────────────────────────
   1. READING PROGRESS BAR
   ───────────────────────────────────────────── */
function initProgress() {
  const bar = document.querySelector('.bd-progress');
  if (!bar) return;

  const update = () => {
    const article = document.querySelector('.bd-article') || document.querySelector('.bd-prose');
    if (!article) return;
    const artTop  = article.getBoundingClientRect().top + window.scrollY;
    const artBot  = artTop + article.offsetHeight;
    const scrolled = window.scrollY - artTop;
    const total   = artBot - artTop - window.innerHeight;
    const pct     = Math.max(0, Math.min(100, (scrolled / total) * 100));
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─────────────────────────────────────────────
   2. TABLE OF CONTENTS SPY
   ───────────────────────────────────────────── */
function initTOCSpy() {
  const tocItems = document.querySelectorAll('.bd-toc-item');
  if (!tocItems.length) return;

  const headings = Array.from(document.querySelectorAll('.bd-prose h2, .bd-prose h3'));
  if (!headings.length) return;

  const spy = debounce(() => {
    const scrollY = window.scrollY + 120;
    let current  = '';
    headings.forEach(h => { if (h.offsetTop <= scrollY) current = h.id; });

    tocItems.forEach(item => {
      const a   = item.querySelector('a');
      const id  = a ? a.getAttribute('href').replace('#', '') : '';
      item.classList.toggle('bd-active', id === current);
    });
  }, 60);

  window.addEventListener('scroll', spy, { passive: true });
  spy();
}

/* ─────────────────────────────────────────────
   3. HERO CANVAS — constellation particles
   ───────────────────────────────────────────── */
function initCanvas() {
  const canvas = document.getElementById('bd-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts;
  const COLS = [[123,47,190],[249,115,22],[236,72,153],[255,182,35],[0,207,255]];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    build();
  }
  function build() {
    const n = Math.min(55, Math.floor((W * H) / 10000));
    pts = Array.from({ length: n }, () => {
      const c = COLS[Math.floor(Math.random() * COLS.length)];
      return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: 1 + Math.random() * 2, c, a: .2 + Math.random() * .5, p: Math.random() * Math.PI * 2 };
    });
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${pts[i].c},${(1-d/110)*.12})`; ctx.lineWidth = .5; ctx.stroke();
        }
      }
    }
    pts.forEach(p => {
      p.p += .016; p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      const a = p.a * (.65 + .35 * Math.sin(p.p));
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize', debounce(resize, 250));
}

/* ─────────────────────────────────────────────
   4. CTA CANVAS — rising particles
   ───────────────────────────────────────────── */
function initCtaCanvas() {
  const canvas = document.getElementById('bd-cta-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  const pts = Array.from({ length: 40 }, () => ({
    x: Math.random()*1000, y: Math.random()*400, r: 1 + Math.random()*2.5,
    vy: .1 + Math.random()*.22,
    c: ['rgba(123,47,190','rgba(249,115,22','rgba(236,72,153'][Math.floor(Math.random()*3)],
    a: .1 + Math.random()*.25
  }));
  function draw() {
    ctx.clearRect(0,0,W,H);
    pts.forEach(p => { p.y -= p.vy; if (p.y < -5) { p.y = H+5; p.x = Math.random()*W; } ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`${p.c},${p.a})`; ctx.fill(); });
    requestAnimationFrame(draw);
  }
  resize(); draw();
  window.addEventListener('resize', debounce(resize, 250));
}

/* ─────────────────────────────────────────────
   5. FLOATING BULBS IN CTA
   ───────────────────────────────────────────── */
function initCtaBulbs() {
  const wrap = document.getElementById('bd-cta-bulbs');
  if (!wrap) return;
  for (let i = 0; i < 14; i++) {
    const img = document.createElement('img');
    img.src = 'images/logo.svg'; img.alt = ''; img.className = 'bd-cbi';
    const sz = 14 + Math.random()*28;
    Object.assign(img.style, {
      width: `${sz}px`, height: `${sz}px`,
      left: `${Math.random()*100}%`, bottom: `-${sz}px`,
      filter: `drop-shadow(0 0 ${sz*.3}px rgba(255,182,35,.55))`,
      animationDuration: `${5 + Math.random()*7}s`,
      animationDelay: `${Math.random()*5}s`,
      opacity: '0',
    });
    wrap.appendChild(img);
  }
}

/* ─────────────────────────────────────────────
   6. MORE ARTICLES GRID
   ───────────────────────────────────────────── */
function initMoreGrid() {
  const grid = document.getElementById('bd-more-grid');
  if (!grid) return;

 
  const selfSlug = window.location.pathname.split('/').pop();

 
  const pool = BD_RELATED.filter(a => a.href !== selfSlug);
  const picks = pool.sort(() => Math.random() - .5).slice(0, 3);

  picks.forEach((art, i) => {
    const card = document.createElement('a');
    card.href = art.href;
    card.className = 'bd-mc reveal';
    card.style.animationDelay = `${i * .1}s`;
    card.setAttribute('aria-label', `Read: ${art.title}`);

    card.innerHTML = `
      <div class="bd-mc-thumb">
        <div class="bd-mc-bg" style="background:${art.grad};"></div>
        <img src="../global-images/logo.svg" alt="" class="bd-mc-bulb" aria-hidden="true" loading="lazy">
      </div>
      <div class="bd-mc-body">
        <span class="bd-mc-cat">${art.cat}</span>
        <h3 class="bd-mc-title">${art.title}</h3>
        <div class="bd-mc-meta">
          <span>${art.date}</span>
          <span class="bd-mc-read">⏱ ${art.read}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

 
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 100);
}

/* ─────────────────────────────────────────────
   7. SIDEBAR SHARE BUTTONS
   ───────────────────────────────────────────── */
function initShareButtons() {
  const url   = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

 
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const platform = btn.getAttribute('data-share');
      let shareUrl = '';
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'copy':
          navigator.clipboard?.writeText(window.location.href).then(() => {
            if (window.showToast) window.showToast('Link copied to clipboard!', 'success', 2500);
            const orig = btn.textContent.trim();
            btn.textContent = '✓ Copied!';
            setTimeout(() => { btn.innerHTML = btn.getAttribute('data-orig') || orig; }, 2200);
          });
          return;
      }
      if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400,noopener');
    });
   
    btn.setAttribute('data-orig', btn.innerHTML);
  });
}

/* ─────────────────────────────────────────────
   8. SIDEBAR NEWSLETTER MINI FORM
   ───────────────────────────────────────────── */
function initSidebarNewsletter() {
  const form = document.getElementById('bd-nl-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const email = input ? input.value.trim() : '';
    const rx    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !rx.test(email)) {
      if (input) { input.style.borderColor = 'rgba(239,68,68,.6)'; setTimeout(() => { input.style.borderColor = ''; }, 2500); }
      return;
    }
    if (window.showToast) window.showToast('🎉 Subscribed! Welcome to TechEchos Insights.', 'success', 4000);
    form.reset();
  });
}

/* ─────────────────────────────────────────────
   9. SMOOTH SCROLL FOR TOC LINKS
   ───────────────────────────────────────────── */
function initTOCScroll() {
  document.querySelectorAll('.bd-toc-item a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const id  = a.getAttribute('href').slice(1);
      const tgt = document.getElementById(id);
      if (!tgt) return;
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '72', 10) + 28;
      window.scrollTo({ top: tgt.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────
   10. SCROLL REVEAL FOR PROSE ELEMENTS
   ───────────────────────────────────────────── */
function initProseReveal() {
  const targets = document.querySelectorAll('.bd-callout, .bd-stat-row, .bd-takeaways, .bd-figure');
  if (!targets.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    obs.observe(el);
  });
}

/* ─────────────────────────────────────────────
   11. PROGRESS COUNT-UP for stat boxes
   ───────────────────────────────────────────── */
function initStatCounters() {
  const statVals = document.querySelectorAll('.bd-stat-val[data-count]');
  if (!statVals.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el     = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur    = 1800;
        const start  = performance.now();
        const isF    = String(target).includes('.');
        const step   = now => {
          const p = Math.min((now - start) / dur, 1);
          const v = isF ? (p * target).toFixed(1) : Math.floor(p * target);
          el.textContent = `${v}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: .5 });
  statVals.forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────────
   12. GLOBAL REVEAL TRIGGER (for more-grid etc)
   ───────────────────────────────────────────── */
function initReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -50px 0px' });
  targets.forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────────
   13. ESTIMATED READING TIME BADGE
   (auto-updates if element with id="bd-read-time" exists)
   ───────────────────────────────────────────── */
function initReadingTime() {
  const badge  = document.getElementById('bd-read-time');
  const prose  = document.querySelector('.bd-prose');
  if (!badge || !prose) return;
  const words  = prose.innerText.trim().split(/\s+/).length;
  const mins   = Math.max(1, Math.round(words / 200));
  badge.textContent = `${mins} min read`;
}

/* ─────────────────────────────────────────────
   INIT — runs after DOM loads
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initCtaCanvas();
  initCtaBulbs();
  initProgress();
  initTOCSpy();
  initTOCScroll();
  initProseReveal();
  initStatCounters();
  initMoreGrid();
  initShareButtons();
  initSidebarNewsletter();
  initReadingTime();
  initReveal();

 
  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.add('visible');
    });
  }, 160);
});
