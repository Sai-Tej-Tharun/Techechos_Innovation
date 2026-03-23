/**
 * ============================================================
 * TechEchos Innovation — services/services.js
 * Page-specific JavaScript. All global utilities (navbar,
 * footer, scroll-reveal, counters, accordion) are in
 * ../global-js/global.js and run automatically.
 *
 * This file adds:
 *  1. Hero particle canvas  (constellation)
 *  2. Hero bulb mouse-parallax
 *  3. Hero stat counter animation
 *  4. Process steps auto-cycle
 *  5. Tech stack pills render
 *  6. Pricing cards render + billing toggle
 *  7. Testimonials slider
 *  8. FAQ accordion (custom, light)
 *  9. CTA canvas + floating bulbs
 * ============================================================
 */

'use strict';

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const PROCESS_STEPS = [
  {
    num: '01', title: 'Discovery',
    desc: 'We audit your market, users and technical constraints to architect the right solution.'
  },
  {
    num: '02', title: 'Design',
    desc: 'Wire-frames, system design and a full design system — shipped before a line of code.'
  },
  {
    num: '03', title: 'Build',
    desc: 'Agile sprints with daily standups. You see working software every single week.'
  },
  {
    num: '04', title: 'Test & QA',
    desc: 'Automated tests, load testing, security scans and manual QA across every device.'
  },
  {
    num: '05', title: 'Launch',
    desc: 'Zero-downtime deploy, monitoring setup and a dedicated launch-day war room.'
  },
];

const TECH_STACK = [
  {
    label: 'Frontend',
    pills: [
      { e: '⚛️', t: 'React' }, { e: '🔲', t: 'Next.js' }, { e: '🎨', t: 'Tailwind CSS' },
      { e: '📘', t: 'TypeScript' }, { e: '🎭', t: 'Framer Motion' }, { e: '📚', t: 'Storybook' },
    ],
  },
  {
    label: 'Backend',
    pills: [
      { e: '🟢', t: 'Node.js' }, { e: '🐍', t: 'Python' }, { e: '🚂', t: 'Express' },
      { e: '⚡', t: 'FastAPI' }, { e: '🐘', t: 'PostgreSQL' }, { e: '🍃', t: 'MongoDB' },
      { e: '🔴', t: 'Redis' },
    ],
  },
  {
    label: 'Mobile',
    pills: [
      { e: '🦋', t: 'Flutter' }, { e: '📱', t: 'React Native' },
      { e: '🍎', t: 'Swift' }, { e: '🤖', t: 'Kotlin' }, { e: '🔥', t: 'Firebase' },
    ],
  },
  {
    label: 'AI / ML',
    pills: [
      { e: '🧠', t: 'TensorFlow' }, { e: '🤗', t: 'HuggingFace' }, { e: '🔮', t: 'OpenAI API' },
      { e: '📊', t: 'PyTorch' }, { e: '🌊', t: 'LangChain' }, { e: '👁️', t: 'YOLO / CV' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    pills: [
      { e: '☁️', t: 'AWS' }, { e: '🌐', t: 'GCP' }, { e: '💠', t: 'Azure' },
      { e: '🐳', t: 'Docker' }, { e: '☸️', t: 'Kubernetes' }, { e: '🏗️', t: 'Terraform' },
      { e: '🔄', t: 'GitHub Actions' },
    ],
  },
];

const PRICING_PLANS = [
  {
    tier: 'Starter',
    monthly: 5000, annual: 35000,
    desc: 'Perfect for early-stage startups validating an idea.',
    popular: false,
    features: [
      { text: '1 dedicated engineer',   yes: true  },
      { text: 'Up to 80 hrs / month',   yes: true  },
      { text: 'Weekly demo calls',       yes: true  },
      { text: 'Slack access',            yes: true  },
      { text: 'Design system included',  yes: false },
      { text: 'AI integration',          yes: false },
      { text: '24/7 monitoring',         yes: false },
    ],
    cta: 'Get Started', ctaClass: 'sv-price-cta--outline',
  },
  {
    tier: 'Growth',
    monthly: 10000, annual: 55000,
    desc: 'For growing teams shipping fast and scaling smart.',
    popular: true,
    features: [
      { text: '3 dedicated engineers',  yes: true  },
      { text: 'Up to 240 hrs / month',  yes: true  },
      { text: 'Daily standups',          yes: true  },
      { text: 'Slack + Jira access',     yes: true  },
      { text: 'Design system included',  yes: true  },
      { text: 'AI integration',          yes: true  },
      { text: '24/7 monitoring',         yes: false },
    ],
    cta: 'Most Popular', ctaClass: 'sv-price-cta--primary',
  },
  {
    tier: 'Enterprise',
    monthly: 20000, annual: 95000,
    desc: 'Dedicated team for high-growth companies at scale.',
    popular: false,
    features: [
      { text: 'Full dedicated team',    yes: true },
      { text: 'Unlimited hours',         yes: true },
      { text: 'Daily standups',          yes: true },
      { text: 'Full tooling access',     yes: true },
      { text: 'Design system included',  yes: true },
      { text: 'AI integration',          yes: true },
      { text: '24/7 monitoring',         yes: true },
    ],
    cta: 'Talk to Sales', ctaClass: 'sv-price-cta--outline',
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    quote: 'TechEchos took us from 0 to 500K users in 14 months. Their AI team is second to none. Best engineering decision we ever made.',
    name: 'Ravi S.',       role: 'CTO, FinEdge',
    initials: 'RS', grad: 'linear-gradient(135deg,#7B2FBE,#EC4899)',
  },
  {
    stars: 5,
    quote: 'The MVP was live in 6 weeks, exactly as promised. Investor-ready, fully tested, and it held up on launch day without a single issue.',
    name: 'Priya M.',      role: 'Founder, ZenPay',
    initials: 'PM', grad: 'linear-gradient(135deg,#F97316,#FB923C)',
  },
  {
    stars: 5,
    quote: 'Their computer vision work reduced our retail shrinkage by 40% in Q1. The ROI was visible within weeks of going live.',
    name: 'Arun K.',       role: 'VP Engineering, NeuraVision',
    initials: 'AK', grad: 'linear-gradient(135deg,#0056b3,#00CFFF)',
  },
  {
    stars: 5,
    quote: '80,000 students on day one. The platform scaled perfectly because TechEchos built the infrastructure right from the very start.',
    name: 'Sneha P.',      role: 'CEO, EduFlow',
    initials: 'SP', grad: 'linear-gradient(135deg,#22C55E,#007BFF)',
  },
  {
    stars: 5,
    quote: 'HIPAA compliance, real-time vitals, IoT integration — all delivered on time, on budget, with zero security incidents.',
    name: 'Vikram R.',     role: 'Dir IT, HealthPulse',
    initials: 'VR', grad: 'linear-gradient(135deg,#EF4444,#F97316)',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Do I have to choose just one service?',
    a: 'Not at all. Most of our clients engage us across multiple disciplines — we often provide a combined Web + AI or Mobile + Cloud package that reduces hand-offs and accelerates delivery. Just describe what you need on your consultation call.',
  },
  {
    q: 'How quickly can you start a project?',
    a: 'For most projects, we can begin a paid discovery sprint within 5 business days of signing. Our fastest start was 48 hours for an emergency rebuild. We don\'t have long waiting lists because we staff every engagement with a dedicated team.',
  },
  {
    q: 'What does a typical engagement look like?',
    a: 'Week 1: Discovery sprint and architecture design. Weeks 2–5: Build sprints with daily standups and weekly client demos. Week 6: QA, performance tuning and zero-downtime deployment. Post-launch: 30-day support window included in every plan.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. We sign a mutual NDA before any detailed project discussion at no charge. We handle hundreds of confidential projects annually and treat every client\'s IP with absolute seriousness.',
  },
  {
    q: 'Who owns the code at the end?',
    a: 'You do — 100%. All source code, designs, infrastructure configs and documentation are transferred to you on the final day of the project. No lock-in, no licensing fees, no strings attached.',
  },
  {
    q: 'Can I scale the team up or down mid-project?',
    a: 'Yes. You can add or remove engineers at the start of any sprint with 7 days\' notice. We\'re structured specifically for this kind of flexible engagement — it\'s one of the reasons startups choose us over traditional agencies.',
  },
  {
    q: 'Do you offer post-launch support?',
    a: 'Every engagement includes a 30-day post-launch support window. Most clients then transition to our ongoing retainer for continued feature development, monitoring and technical support.',
  },
];


/* ─────────────────────────────────────────────
   UTILITIES
   ───────────────────────────────────────────── */


const _dbn = (fn, d) => {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); };
};


/* ─────────────────────────────────────────────
   1. HERO CANVAS — constellation particles
   ───────────────────────────────────────────── */

function initHeroCanvas() {
  const canvas = document.getElementById('global-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const COLS = [[123,47,190],[249,115,22],[236,72,153],[255,182,35],[0,207,255]];
  let W, H, pts;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    build();
  }

  function build() {
    const n = Math.min(80, Math.floor((W * H) / 9500));
    pts = Array.from({ length: n }, () => {
      const c = COLS[Math.floor(Math.random() * COLS.length)];
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
        r: 1 + Math.random() * 2.5, c,
        a: .22 + Math.random() * .50, p: Math.random() * Math.PI * 2,
      };
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          const [r,g,b] = pts[i].c;
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / 120) * .14})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }

    
    pts.forEach(p => {
      p.p  += .017;
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
  window.addEventListener('resize', _dbn(resize, 250));
}


/* ─────────────────────────────────────────────
   2. HERO BULB MOUSE PARALLAX
   ───────────────────────────────────────────── */

function initBulbParallax() {
  const stage = document.getElementById('sv-bulb-stage');
  const hero  = document.querySelector('.sv-hero');
  if (!stage || !hero || window.innerWidth < 1024) return;

  hero.addEventListener('mousemove', e => {
    const r  = hero.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const rx = ((e.clientY - cy) / (r.height / 2)) * 10;
    const ry = -((e.clientX - cx) / (r.width  / 2)) * 14;
    stage.style.transform = `translateY(-50%) rotateX(${rx}deg) rotateY(${ry}deg)`;
    stage.style.transition = 'transform 0.1s ease';
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    stage.style.transform = 'translateY(-50%)';
    stage.style.transition = 'transform 0.6s ease';
  });
}


/* ─────────────────────────────────────────────
   3. HERO STAT COUNTER (uses global counter if available)
   ───────────────────────────────────────────── */

function initStatCounters() {
  const stats = document.querySelectorAll('.sv-stat-val[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur    = 2000;
      const start  = performance.now();
      const isFloat = String(target).includes('.');

      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3); 
        const v = isFloat ? (e * target).toFixed(1) : Math.floor(e * target);
        el.textContent = `${v}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   4. PROCESS STEPS — auto-cycle highlight
   ───────────────────────────────────────────── */

function initProcessSteps() {
  const track = document.getElementById('sv-process-track');
  const fill  = document.getElementById('sv-process-fill');
  if (!track) return;

  
  PROCESS_STEPS.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'sv-process-step reveal';
    el.setAttribute('role', 'listitem');
    el.innerHTML = `
      <div class="sv-proc-badge${i === 0 ? ' is-active' : ''}">
        <img src="../global-images/logo.svg" alt="" class="sv-proc-bulb" aria-hidden="true">
        <span class="sv-proc-num">${s.num}</span>
      </div>
      <h3 class="sv-proc-title">${s.title}</h3>
      <p class="sv-proc-desc">${s.desc}</p>
    `;
    track.appendChild(el);
  });

  const steps  = track.querySelectorAll('.sv-process-step');
  let current  = 0;
  let interval = null;

  function activateStep(idx) {
    steps.forEach((s, i) => {
      s.classList.toggle('is-active', i === idx);
      const badge = s.querySelector('.sv-proc-badge');
      if (badge) badge.classList.toggle('is-active', i === idx);
      s.querySelector('.sv-proc-title')?.classList.toggle('is-active', i === idx);
    });
    if (fill) {
      fill.style.width = `${((idx + 1) / steps.length) * 100}%`;
    }
  }

  activateStep(0);

  
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      interval = setInterval(() => {
        current = (current + 1) % PROCESS_STEPS.length;
        activateStep(current);
      }, 1800);
    } else {
      clearInterval(interval);
    }
  }, { threshold: 0.4 });
  obs.observe(track);

  
  steps.forEach((step, i) => {
    step.addEventListener('click', () => {
      clearInterval(interval);
      current = i;
      activateStep(i);
    });
    step.style.cursor = 'pointer';
  });
}


/* ─────────────────────────────────────────────
   5. TECH STACK RENDER
   ───────────────────────────────────────────── */

function initTechStack() {
  const wrap = document.getElementById('sv-stack-wrap');
  if (!wrap) return;

  TECH_STACK.forEach(cat => {
    const sec = document.createElement('div');
    sec.className = 'sv-stack-category reveal';

    const label = document.createElement('div');
    label.className = 'sv-stack-cat-label';
    label.textContent = cat.label;

    const pills = document.createElement('div');
    pills.className = 'sv-stack-pills';

    cat.pills.forEach(pill => {
      const p = document.createElement('div');
      p.className = 'sv-stack-pill';
      p.innerHTML = `<span class="sv-stack-pill-emoji" aria-hidden="true">${pill.e}</span>${pill.t}`;
      pills.appendChild(p);
    });

    sec.appendChild(label);
    sec.appendChild(pills);
    wrap.appendChild(sec);
  });
}


/* ─────────────────────────────────────────────
   6. PRICING CARDS + BILLING TOGGLE
   ───────────────────────────────────────────── */

let _isAnnual = false;

function renderPricingCards() {
  const grid = document.getElementById('sv-pricing-grid');
  if (!grid) return;
  grid.innerHTML = '';

  PRICING_PLANS.forEach(plan => {
    const price = _isAnnual ? plan.annual : plan.monthly;

    const card = document.createElement('div');
    card.className = `sv-price-card${plan.popular ? ' is-popular' : ''} reveal`;

    card.innerHTML = `
      <img src="../global-images/logo.svg" alt="" class="sv-price-bulb" aria-hidden="true" loading="lazy">
      ${plan.popular ? '<span class="sv-popular-badge">Most Popular</span>' : ''}

      <span class="sv-price-tier">${plan.tier}</span>

      <div class="sv-price-amount">
        <span class="sv-price-currency">₹</span>
        <span class="sv-price-value" data-monthly="${plan.monthly}" data-annual="${plan.annual}">
          ${price.toLocaleString()}
        </span>
        <span class="sv-price-period">/mo</span>
      </div>

      <p class="sv-price-desc">${plan.desc}</p>

      <ul class="sv-price-features" aria-label="${plan.tier} plan features">
        ${plan.features.map(f => `
          <li class="sv-pf-item${f.yes ? '' : ' is-disabled'}">
            <span class="sv-pf-check ${f.yes ? 'sv-pf-check--yes' : 'sv-pf-check--no'}"
                  aria-label="${f.yes ? 'Included' : 'Not included'}">
              ${f.yes ? '✓' : '✗'}
            </span>
            ${f.text}
          </li>
        `).join('')}
      </ul>

      <a href="../contact/contact.html#quote"
         class="sv-price-cta ${plan.ctaClass}"
         aria-label="Choose ${plan.tier} plan">
        ${plan.cta}
      </a>
    `;

    grid.appendChild(card);

    
    const valEl  = card.querySelector('.sv-price-value');
    if (valEl) {
      const from   = _isAnnual ? plan.monthly : plan.annual;
      const to     = price;
      const dur    = 600;
      const start  = performance.now();
      const step   = now => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        valEl.textContent = Math.floor(from + (to - from) * e).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  });

  
  setTimeout(() => {
    grid.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) {
        el.classList.add('visible');
      }
    });
  }, 60);
}

function initPricing() {
  renderPricingCards();

  const toggle = document.getElementById('sv-billing-btn');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    _isAnnual = !_isAnnual;
    toggle.setAttribute('aria-pressed', String(_isAnnual));
    renderPricingCards();
  });
}


/* ─────────────────────────────────────────────
   7. TESTIMONIALS SLIDER
   ───────────────────────────────────────────── */

function initTestimonials() {
  const track   = document.getElementById('sv-testi-track');
  const navWrap = document.getElementById('sv-testi-nav');
  if (!track) return;

  
  TESTIMONIALS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'sv-testi-card';
    card.innerHTML = `
      <img src="../global-images/logo.svg" alt="" class="sv-tc-bulb" aria-hidden="true" loading="lazy">
      <div class="sv-tc-stars" aria-label="${t.stars} stars">
        ${'★'.repeat(t.stars)}
      </div>
      <p class="sv-tc-quote">"${t.quote}"</p>
      <div class="sv-tc-author">
        <div class="sv-tc-av" style="background:${t.grad};" aria-hidden="true">${t.initials}</div>
        <div>
          <span class="sv-tc-name">${t.name}</span>
          <span class="sv-tc-role">${t.role}</span>
        </div>
      </div>
    `;
    track.appendChild(card);
  });

  let current  = 0;
  let autoTimer = null;

  
  if (navWrap) {
    TESTIMONIALS.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `sv-testi-dot${i === 0 ? ' is-active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.addEventListener('click', () => { clearInterval(autoTimer); goTo(i); });
      navWrap.appendChild(dot);
    });
  }

  function goTo(idx) {
    const cards   = track.querySelectorAll('.sv-testi-card');
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const perView  = isMobile ? 1 : isTablet ? 2 : 3;

    
    const max = Math.max(0, TESTIMONIALS.length - perView);
    current = Math.max(0, Math.min(idx, max));

    const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 0;
    track.style.transform = `translateX(-${current * cardWidth}px)`;

    if (navWrap) {
      navWrap.querySelectorAll('.sv-testi-dot').forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
      });
    }
  }

  
  autoTimer = setInterval(() => {
    const perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    goTo((current + 1) % Math.max(1, TESTIMONIALS.length - perView + 1));
  }, 4500);

  
  const viewport = document.querySelector('.sv-testi-viewport');
  if (viewport) {
    viewport.addEventListener('mouseenter', () => clearInterval(autoTimer));
    viewport.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => {
        const pv = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        goTo((current + 1) % Math.max(1, TESTIMONIALS.length - pv + 1));
      }, 4500);
    });
  }

  
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  window.addEventListener('resize', _dbn(() => goTo(current), 200));
}


/* ─────────────────────────────────────────────
   8. FAQ ACCORDION
   ───────────────────────────────────────────── */

function initFaqAccordion() {
  const container = document.getElementById('sv-accordion');
  if (!container) return;

  FAQ_ITEMS.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'sv-acc-item';
    el.setAttribute('role', 'listitem');

    el.innerHTML = `
      <button class="sv-acc-trigger"
              aria-expanded="false"
              aria-controls="sv-acc-body-${i}"
              id="sv-acc-btn-${i}">
        ${item.q}
        <svg class="sv-acc-chevron" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="sv-acc-body"
           id="sv-acc-body-${i}"
           role="region"
           aria-labelledby="sv-acc-btn-${i}">
        <div class="sv-acc-body-inner">${item.a}</div>
      </div>
    `;

    container.appendChild(el);

    const trigger = el.querySelector('.sv-acc-trigger');
    const body    = el.querySelector('.sv-acc-body');
    const inner   = el.querySelector('.sv-acc-body-inner');

    trigger.addEventListener('click', () => {
      const isOpen = el.classList.contains('is-open');

      
      container.querySelectorAll('.sv-acc-item.is-open').forEach(openEl => {
        openEl.classList.remove('is-open');
        openEl.querySelector('.sv-acc-trigger').setAttribute('aria-expanded', 'false');
        openEl.querySelector('.sv-acc-body').style.maxHeight = null;
      });

      if (!isOpen) {
        el.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
}


/* ─────────────────────────────────────────────
   9. CTA CANVAS + FLOATING BULBS
   ───────────────────────────────────────────── */

function initCtaSection() {

  
  const bulbWrap = document.getElementById('sv-cta-bulbs');
  if (bulbWrap) {
    for (let i = 0; i < 14; i++) {
      const img = document.createElement('img');
      img.src = '../global-images/logo.svg';
      img.alt = '';
      img.className = 'sv-cta-bulb-item';
      const sz = 16 + Math.random() * 30;
      Object.assign(img.style, {
        width:  `${sz}px`,
        height: `${sz}px`,
        left:   `${Math.random() * 100}%`,
        bottom: `-${sz}px`,
        filter: `drop-shadow(0 0 ${sz * .3}px rgba(249,115,22,.60))`,
        animationDuration: `${5 + Math.random() * 7}s`,
        animationDelay:    `${Math.random() * 5}s`,
      });
      bulbWrap.appendChild(img);
    }
  }

  
  const canvas = document.getElementById('sv-cta-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H;

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  const pts = Array.from({ length: 45 }, () => ({
    x: Math.random() * 1000, y: Math.random() * 500,
    r: 1 + Math.random() * 3,
    vy: .10 + Math.random() * .25,
    c: ['rgba(123,47,190', 'rgba(249,115,22', 'rgba(236,72,153'][Math.floor(Math.random() * 3)],
    a: .10 + Math.random() * .28,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.y -= p.vy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${p.c},${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', _dbn(resize, 250));
}


/* ─────────────────────────────────────────────
   INIT — runs after DOM is ready
   ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  initHeroCanvas();
  initBulbParallax();
  initStatCounters();
  initProcessSteps();
  initTechStack();
  initPricing();
  initTestimonials();
  initFaqAccordion();
  initCtaSection();

  
  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) {
        el.classList.add('visible');
      }
    });
  }, 160);

});
