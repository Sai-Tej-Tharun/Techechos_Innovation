/**
 * ============================================================
 * TechEchos Innovation — home.js  (Home Page 1)
 * Page-specific JavaScript.
 * Global utilities live in ../global-js/global.js
 * ============================================================
 */

'use strict';

/* ─────────────────────────────────────────────
   0. CONFIG DATA
   ───────────────────────────────────────────── */


const HERO_WORDS = ['Ignite', 'Power', 'Shape', 'Define', 'Elevate', 'Transform'];


const MARQUEE_ITEMS = [
  'React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'React Native',
  'AWS', 'Google Cloud', 'Azure', 'TensorFlow', 'OpenAI', 'PostgreSQL',
  'MongoDB', 'Docker', 'Kubernetes', 'TypeScript', 'GraphQL', 'Redis',
  'Figma', 'Swift', 'Kotlin', 'Terraform', 'GitLab CI', 'Stripe',
];


const TECH_STACK = [
  { emoji: '⚛️',  name: 'React'      },
  { emoji: '🚀',  name: 'Next.js'    },
  { emoji: '🟢',  name: 'Node.js'    },
  { emoji: '🐍',  name: 'Python'     },
  { emoji: '🦋',  name: 'Flutter'    },
  { emoji: '☁️',  name: 'AWS'        },
  { emoji: '🔥',  name: 'Firebase'   },
  { emoji: '🐳',  name: 'Docker'     },
  { emoji: '📱',  name: 'React Native'},
  { emoji: '🧠',  name: 'TensorFlow' },
  { emoji: '🔷',  name: 'TypeScript' },
  { emoji: '🌿',  name: 'MongoDB'    },
  { emoji: '🐘',  name: 'PostgreSQL' },
  { emoji: '☸️',  name: 'Kubernetes' },
  { emoji: '🎨',  name: 'Figma'      },
  { emoji: '⚡',  name: 'GraphQL'    },
];


const PORTFOLIO_ITEMS = [
  {
    id: 1, filter: 'ai',
    title:    'NeuraVision Analytics',
    category: 'Artificial Intelligence',
    desc:     'Real-time computer vision dashboard for retail chain inventory management using custom YOLO models.',
    tags:     ['Python', 'TensorFlow', 'React'],
    gradient: 'linear-gradient(135deg, #7B2FBE 0%, #EC4899 100%)',
    icon:     `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    href:     '../careers/careers.html#portfolio',
  },
  {
    id: 2, filter: 'web',
    title:    'FinEdge SaaS Platform',
    category: 'Web Development',
    desc:     'B2B financial analytics platform processing $2B+ in transactions monthly with sub-100ms query performance.',
    tags:     ['Next.js', 'Node.js', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #0056b3 0%, #00CFFF 100%)',
    icon:     `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    href:     '../careers/careers.html#portfolio',
  },
  {
    id: 3, filter: 'mobile',
    title:    'ZenPay Super App',
    category: 'Mobile App',
    desc:     'Cross-platform fintech app with 500K+ downloads, biometric auth, and real-time fund transfers.',
    tags:     ['Flutter', 'Firebase', 'Stripe'],
    gradient: 'linear-gradient(135deg, #F97316 0%, #FFB623 100%)',
    icon:     `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    href:     '../careers/careers.html#portfolio',
  },
  {
    id: 4, filter: 'cloud',
    title:    'CloudScale Infrastructure',
    category: 'Cloud Solutions',
    desc:     'Zero-downtime migration of 40-service microservices architecture from on-prem to AWS, 60% cost reduction.',
    tags:     ['AWS', 'Terraform', 'Kubernetes'],
    gradient: 'linear-gradient(135deg, #22C55E 0%, #00CFFF 100%)',
    icon:     `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    href:     '../careers/careers.html#portfolio',
  },
  {
    id: 5, filter: 'web',
    title:    'EduFlow Learning Platform',
    category: 'Web Development',
    desc:     'Adaptive e-learning platform serving 80K students with AI-driven personalised curriculum paths.',
    tags:     ['React', 'Node.js', 'OpenAI'],
    gradient: 'linear-gradient(135deg, #EC4899 0%, #7B2FBE 100%)',
    icon:     `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    href:     '../careers/careers.html#portfolio',
  },
  {
    id: 6, filter: 'mobile',
    title:    'HealthPulse Wearables App',
    category: 'Mobile App',
    desc:     'IoT-connected health monitoring app with real-time vitals, AI anomaly detection, and doctor dashboard.',
    tags:     ['React Native', 'Python', 'AWS IoT'],
    gradient: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)',
    icon:     `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    href:     '../careers/careers.html#portfolio',
  },
];


const TESTIMONIALS = [
  {
    name:   'Ravi Shankar',
    role:   'CTO, FinEdge Solutions',
    initials:'RS',
    stars:  5,
    quote:  'TechEchos transformed our legacy monolith into a blazing-fast microservices platform. The team\'s technical depth and communication were exceptional throughout.',
    gradient: 'linear-gradient(135deg, #7B2FBE, #F97316)',
  },
  {
    name:   'Priya Mehta',
    role:   'Founder, ZenPay',
    initials:'PM',
    stars:  5,
    quote:  'We went from idea to 500K users in 14 months. TechEchos was our engineering backbone — shipping fast without sacrificing quality once.',
    gradient: 'linear-gradient(135deg, #F97316, #EC4899)',
  },
  {
    name:   'Arun Kumar',
    role:   'VP Engineering, NeuraVision',
    initials:'AK',
    stars:  5,
    quote:  'Their AI team integrated computer vision into our retail ops and we saw a 40% reduction in shrinkage within the first quarter. Remarkable results.',
    gradient: 'linear-gradient(135deg, #EC4899, #7B2FBE)',
  },
  {
    name:   'Sneha Patel',
    role:   'CEO, EduFlow',
    initials:'SP',
    stars:  5,
    quote:  'The platform they built handled our 10x traffic spike on launch day without a hiccup. The cloud architecture was thoughtfully designed for scale.',
    gradient: 'linear-gradient(135deg, #007BFF, #00CFFF)',
  },
  {
    name:   'Vikram Reddy',
    role:   'Director IT, HealthPulse',
    initials:'VR',
    stars:  5,
    quote:  'Security, HIPAA compliance, real-time data — they delivered all three seamlessly. Our medical staff and patients are genuinely impressed.',
    gradient: 'linear-gradient(135deg, #22C55E, #007BFF)',
  },
];


const BLOG_POSTS = [
  {
    title:    'How AI is Reshaping Software Development in 2025',
    category: 'Artificial Intelligence',
    date:     'March 10, 2025',
    excerpt:  'From copilot tooling to autonomous agents — the shift in how engineers write, test, and ship code is more profound than any hype cycle.',
    href:     '../blog-details/ai-trends.html',
    gradient: 'linear-gradient(135deg, #7B2FBE 0%, #EC4899 100%)',
  },
  {
    title:    'The 7-Step Cloud Migration Playbook for Fast-Growing Startups',
    category: 'Cloud Solutions',
    date:     'February 22, 2025',
    excerpt:  'Moving to the cloud shouldn\'t be a gamble. Our battle-tested playbook walks you through risk mitigation and zero-downtime strategies.',
    href:     '../blog-details/cloud-migration.html',
    gradient: 'linear-gradient(135deg, #0056b3 0%, #00CFFF 100%)',
  },
  {
    title:    'Why Your Next Product Needs a Design System Before Line One of Code',
    category: 'UI / UX Design',
    date:     'February 05, 2025',
    excerpt:  'Design systems pay dividends from day one. Here\'s how we help product teams establish the foundations that scale with growth.',
    href:     '../blog-details/ux-design-2025.html',
    gradient: 'linear-gradient(135deg, #F97316 0%, #FFB623 100%)',
  },
];


/* ─────────────────────────────────────────────
   1. CANVAS PARTICLE SYSTEM
   ───────────────────────────────────────────── */

function initHeroCanvas () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

 
  const COLOURS = [
    'rgba(123,47,190,0.6)',
    'rgba(249,115,22,0.5)',
    'rgba(236,72,153,0.5)',
    'rgba(255,182,35,0.6)',
    'rgba(0,207,255,0.4)',
    'rgba(255,255,255,0.3)',
  ];

  let W, H, particles;
  let mouse = { x: null, y: null };

 
  function resize () {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initParticles();
  }

 
  function createParticle () {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.35;
    return {
      x:      Math.random() * W,
      y:      Math.random() * H,
      r:      1 + Math.random() * 2.5,
      vx:     Math.cos(angle) * speed,
      vy:     Math.sin(angle) * speed,
      colour: COLOURS[Math.floor(Math.random() * COLOURS.length)],
      alpha:  0.2 + Math.random() * 0.6,
      pulse:  Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.02,
    };
  }

  function initParticles () {
    const count = Math.min(120, Math.floor((W * H) / 8000));
    particles = Array.from({ length: count }, createParticle);
  }

 
  function drawConnections () {
    const MAX_DIST = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,182,35,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

 
  function tick () {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
     
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += p.pulseSpeed;

     
      if (p.x < -5)  p.x = W + 5;
      if (p.x > W+5) p.x = -5;
      if (p.y < -5)  p.y = H + 5;
      if (p.y > H+5) p.y = -5;

     
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          const force = (80 - dist) / 80 * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
         
          p.vx *= 0.95;
          p.vy *= 0.95;
        }
      }

     
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > 1.2) { p.vx = (p.vx / spd) * 1.2; p.vy = (p.vy / spd) * 1.2; }

     
      const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.colour.replace(/[\d.]+\)$/, `${currentAlpha})`);
      ctx.fill();

     
      if (p.r > 2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.colour.replace(/[\d.]+\)$/, `${currentAlpha * 0.15})`);
        ctx.fill();
      }
    });

    drawConnections();
    requestAnimationFrame(tick);
  }

 
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });
    heroEl.addEventListener('mouseleave', () => {
      mouse.x = null; mouse.y = null;
    });
  }

 
  resize();
  tick();
  window.addEventListener('resize', debounce(resize, 250));
}


/* ─────────────────────────────────────────────
   2. CTA CANVAS (mini version)
   ───────────────────────────────────────────── */

function initCtaCanvas () {
  const canvas = document.getElementById('cta-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize () {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  const dots = Array.from({ length: 40 }, () => ({
    x: Math.random() * 1000,
    y: Math.random() * 400,
    r: 1 + Math.random() * 3,
    speed: 0.1 + Math.random() * 0.2,
    alpha: 0.1 + Math.random() * 0.35,
    colour: ['rgba(123,47,190','rgba(249,115,22','rgba(236,72,153'][Math.floor(Math.random()*3)],
  }));

  function draw () {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x -= d.speed;
      if (d.x < -5) { d.x = W + 5; d.y = Math.random() * H; }
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `${d.colour},${d.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', debounce(resize, 250));
}


/* ─────────────────────────────────────────────
   3. BULB SPARKLE PARTICLES
   ───────────────────────────────────────────── */

function initBulbSparkles () {
  const field = document.getElementById('sparkle-field');
  if (!field) return;

  const SPARKLE_COLOURS = ['#FFB623','#F97316','#EC4899','#7B2FBE','#00CFFF','#fff'];
  const SPARKLE_COUNT   = 20;

  for (let i = 0; i < SPARKLE_COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';

    const size  = 2 + Math.random() * 4;
    const angle = Math.random() * 360;
    const dist  = 60 + Math.random() * 100;
    const rad   = (angle * Math.PI) / 180;
    const sx    = Math.cos(rad) * dist;
    const sy    = Math.sin(rad) * dist;
    const dur   = 1.5 + Math.random() * 2.5;
    const delay = Math.random() * 3;
    const colour= SPARKLE_COLOURS[Math.floor(Math.random() * SPARKLE_COLOURS.length)];

    Object.assign(s.style, {
      width:            `${size}px`,
      height:           `${size}px`,
      background:       colour,
      boxShadow:        `0 0 ${size * 2}px ${colour}`,
      left:             '50%',
      top:              '50%',
      marginLeft:       `-${size / 2}px`,
      marginTop:        `-${size / 2}px`,
      '--sx':           `${sx}px`,
      '--sy':           `${sy}px`,
      animationDuration:`${dur}s`,
      animationDelay:   `${delay}s`,
    });

    field.appendChild(s);
  }
}


/* ─────────────────────────────────────────────
   4. BULB CLICK BURST
   ───────────────────────────────────────────── */

function initBulbClickBurst () {
  const bulb = document.getElementById('bulb-svg');
  const field = document.getElementById('sparkle-field');
  if (!bulb || !field) return;

  bulb.addEventListener('click', () => {
   
    for (let i = 0; i < 30; i++) {
      const b = document.createElement('div');
      b.className = 'sparkle';
      const size  = 3 + Math.random() * 6;
      const angle = (i / 30) * 360 + Math.random() * 20;
      const dist  = 80 + Math.random() * 160;
      const rad   = (angle * Math.PI) / 180;
      const COLOURS = ['#FFB623','#F97316','#EC4899','#7B2FBE','#00CFFF','#fff'];
      const colour  = COLOURS[Math.floor(Math.random() * COLOURS.length)];

      Object.assign(b.style, {
        width:  `${size}px`,
        height: `${size}px`,
        background: colour,
        boxShadow:  `0 0 ${size * 3}px ${colour}`,
        left:   '50%', top: '50%',
        marginLeft: `-${size / 2}px`,
        marginTop:  `-${size / 2}px`,
        '--sx': `${Math.cos(rad) * dist}px`,
        '--sy': `${Math.sin(rad) * dist}px`,
        animationDuration: '1s',
        animationDelay:    '0s',
      });

      field.appendChild(b);
      setTimeout(() => b.remove(), 1100);
    }

   
    if (window.showToast) {
      const msgs = [
        '💡 Idea unlocked!',
        '⚡ Let\'s build something great!',
        '🚀 Innovation starts here!',
        '🔥 You\'ve got the spark!',
        '✨ Brilliant minds think alike!',
      ];
      window.showToast(msgs[Math.floor(Math.random() * msgs.length)], 'info', 2500);
    }
  });
}


/* ─────────────────────────────────────────────
   5. HERO WORD ROTATOR
   ───────────────────────────────────────────── */

function initWordRotator () {
  const wordEl = document.getElementById('rotating-word');
  if (!wordEl) return;

  let idx = 0;

  setInterval(() => {
   
    wordEl.classList.add('swapping');

    setTimeout(() => {
      idx = (idx + 1) % HERO_WORDS.length;
      wordEl.textContent = HERO_WORDS[idx];
      wordEl.classList.remove('swapping');
    }, 300);
  }, 2800);
}


/* ─────────────────────────────────────────────
   6. MARQUEE TICKER
   ───────────────────────────────────────────── */

function initMarquee () {
  const inner = document.getElementById('marquee-inner');
  if (!inner) return;

 
  const buildSet = () => MARQUEE_ITEMS.map(item => {
    const el = document.createElement('span');
    el.className = 'marquee-item';
    el.innerHTML = `<span class="mi-dot" aria-hidden="true"></span>${item}`;
    return el;
  });

  [...buildSet(), ...buildSet()].forEach(el => inner.appendChild(el));

 
  inner.addEventListener('mouseenter', () => {
    inner.style.animationPlayState = 'paused';
  });
  inner.addEventListener('mouseleave', () => {
    inner.style.animationPlayState = 'running';
  });
}


/* ─────────────────────────────────────────────
   7. TECH STACK GRID
   ───────────────────────────────────────────── */

function initTechStack () {
  const grid = document.getElementById('techstack-grid');
  if (!grid) return;

  TECH_STACK.forEach((tech, i) => {
    const card = document.createElement('div');
    card.className = 'ts-card';
    card.setAttribute('aria-label', tech.name);
    card.setAttribute('data-tooltip', tech.name);
    card.style.animationDelay = `${i * 0.06}s`;

    card.innerHTML = `
      <div class="ts-icon" aria-hidden="true">${tech.emoji}</div>
      <span class="ts-name">${tech.name}</span>
    `;

   
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rx   = ((e.clientY - cy) / (rect.height / 2)) * 8;
      const ry   = -((e.clientX - cx) / (rect.width  / 2)) * 8;
      card.style.transform = `translateY(-6px) scale(1.04) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    grid.appendChild(card);
  });

 
  if (window.TechEchos) window.TechEchos.qs && initTooltipsForStack();
}

function initTooltipsForStack () {
  document.querySelectorAll('.ts-card[data-tooltip]').forEach(el => {
    el.style.position = 'relative';
    const tip = document.createElement('span');
    tip.textContent = el.dataset.tooltip;
    Object.assign(tip.style, {
      position:      'absolute',
      bottom:        'calc(100% + 8px)',
      left:          '50%',
      transform:     'translateX(-50%)',
      background:    'rgba(30,41,59,0.95)',
      color:         '#fff',
      fontSize:      '0.75rem',
      padding:       '4px 10px',
      borderRadius:  '6px',
      whiteSpace:    'nowrap',
      pointerEvents: 'none',
      opacity:       '0',
      transition:    'opacity 0.2s ease',
      zIndex:        '100',
    });
    el.appendChild(tip);
    el.addEventListener('mouseenter', () => tip.style.opacity = '1');
    el.addEventListener('mouseleave', () => tip.style.opacity = '0');
  });
}


/* ─────────────────────────────────────────────
   8. PORTFOLIO GRID + FILTER
   ───────────────────────────────────────────── */

function renderPortfolioItems (filter) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const items = filter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(p => p.filter === filter);

 
  const existing = grid.querySelectorAll('.portfolio-card');
  existing.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'scale(0.9)';
  });

  setTimeout(() => {
    grid.innerHTML = '';

    items.forEach((item, i) => {
      const card = document.createElement('article');
      card.className = 'portfolio-card reveal';
      card.setAttribute('role', 'article');
      card.setAttribute('aria-label', item.title);
      card.style.animationDelay = `${i * 0.1}s`;
      card.dataset.filter = item.filter;

      card.innerHTML = `
        <div class="pc-thumb">
          <div class="pc-thumb-bg" style="background:${item.gradient};">
            <div class="pc-thumb-icon">${item.icon}</div>
          </div>
          <div class="pc-overlay">
            <a href="${item.href}" class="pc-view-btn" aria-label="View ${item.title}">View Project</a>
          </div>
        </div>
        <div class="pc-body">
          <p class="pc-category">${item.category}</p>
          <h3 class="pc-title">${item.title}</h3>
          <p class="pc-desc">${item.desc}</p>
          <div class="pc-tags" aria-label="Technologies">
            ${item.tags.map(t => `<span class="pc-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

   
    setTimeout(() => {
      grid.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('visible');
      });
    }, 60);

  }, 250);
}

function initPortfolio () {
  renderPortfolioItems('all');

  const filterBtns = document.querySelectorAll('.pf-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderPortfolioItems(btn.dataset.filter);
    });
  });
}


/* ─────────────────────────────────────────────
   9. TESTIMONIALS SLIDER
   ───────────────────────────────────────────── */

let testiCurrentIndex = 0;
let testiAutoplay;

function buildTestimonials () {
  const slider = document.getElementById('testimonials-slider');
  const dotsEl = document.getElementById('testimonial-dots');
  if (!slider) return;

 
  const track = document.createElement('div');
  track.className = 'testi-track';
  track.id = 'testi-track';

  TESTIMONIALS.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = `testi-card${i === 0 ? ' active' : ''}`;
    card.setAttribute('role', 'tabpanel');
    card.setAttribute('aria-label', `Testimonial by ${t.name}`);

    const stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);

    card.innerHTML = `
      <img src="../global-images/logo.svg" alt="" class="testi-bulb" aria-hidden="true">
      <div class="testi-stars" aria-label="${t.stars} stars">
        ${[...stars].map(s => `<span class="testi-star" aria-hidden="true">${s}</span>`).join('')}
      </div>
      <p class="testi-quote">"${t.quote}"</p>
      <div class="testi-author">
        <div class="testi-avatar" style="background:${t.gradient};" aria-hidden="true">${t.initials}</div>
        <div>
          <p class="testi-name">${t.name}</p>
          <p class="testi-role">${t.role}</p>
        </div>
      </div>
    `;
    track.appendChild(card);
  });

  slider.appendChild(track);

 
  if (dotsEl) {
    TESTIMONIALS.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `testi-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.setAttribute('aria-selected', String(i === 0));
      dot.addEventListener('click', () => goToTestimonial(i));
      dotsEl.appendChild(dot);
    });
  }
}

function goToTestimonial (idx) {
  const track    = document.getElementById('testi-track');
  const cards    = document.querySelectorAll('.testi-card');
  const dots     = document.querySelectorAll('.testi-dot');
  const isMobile = window.innerWidth <= 767;
  const isTablet = window.innerWidth <= 1023;
  const perView  = isMobile ? 1 : isTablet ? 2 : 3;
  const cardW    = cards[0] ? cards[0].offsetWidth + 24 : 0;

  testiCurrentIndex = Math.max(0, Math.min(idx, TESTIMONIALS.length - perView));

  if (track) {
    track.style.transform = `translateX(-${testiCurrentIndex * cardW}px)`;
  }

 
  cards.forEach((c, i) => {
    c.classList.toggle('active', i === testiCurrentIndex);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === testiCurrentIndex);
    d.setAttribute('aria-selected', String(i === testiCurrentIndex));
  });
}

function initTestimonials () {
  buildTestimonials();

 
  testiAutoplay = setInterval(() => {
    const next = (testiCurrentIndex + 1) % TESTIMONIALS.length;
    goToTestimonial(next);
  }, 4500);

 
  const slider = document.getElementById('testimonials-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(testiAutoplay));
    slider.addEventListener('mouseleave', () => {
      testiAutoplay = setInterval(() => {
        goToTestimonial((testiCurrentIndex + 1) % TESTIMONIALS.length);
      }, 4500);
    });
  }

 
  let touchStartX = 0;
  if (slider) {
    slider.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    slider.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goToTestimonial(diff > 0
          ? Math.min(testiCurrentIndex + 1, TESTIMONIALS.length - 1)
          : Math.max(testiCurrentIndex - 1, 0));
      }
    }, { passive: true });
  }

  window.addEventListener('resize', debounce(() => goToTestimonial(testiCurrentIndex), 200));
}


/* ─────────────────────────────────────────────
   10. BLOG GRID RENDER
   ───────────────────────────────────────────── */

function initBlogGrid () {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  BLOG_POSTS.forEach((post, i) => {
    const card = document.createElement('a');
    card.className = 'blog-card reveal';
    card.href = post.href;
    card.setAttribute('aria-label', `Read: ${post.title}`);
    card.style.animationDelay = `${i * 0.15}s`;

    card.innerHTML = `
      <div class="bc-thumb">
        <div class="bc-thumb-bg" style="background:${post.gradient};">
          <img src="../global-images/logo.svg" alt="" class="bc-mini-bulb" aria-hidden="true">
        </div>
      </div>
      <div class="bc-body">
        <div class="bc-meta">
          <span class="bc-category">${post.category}</span>
          <span class="bc-date">${post.date}</span>
        </div>
        <h3 class="bc-title">${post.title}</h3>
        <p class="bc-excerpt">${post.excerpt}</p>
        <span class="bc-read" aria-hidden="true">
          Read Article
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
      </div>
    `;

    grid.appendChild(card);
  });
}


/* ─────────────────────────────────────────────
   11. CONTACT FORM
   ───────────────────────────────────────────── */

function initContactForm () {
  const form = document.getElementById('home-contact-form');
  if (!form || !window.TechEchos) return;

  window.TechEchos.initFormValidation(form, () => {
    const btn = document.getElementById('hf-submit');
    if (btn) {
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Message Sent!
      `;
      btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
      setTimeout(() => {
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Send Message
        `;
        btn.style.background = '';
      }, 3000);
    }
    window.TechEchos.showToast('Your message has been sent! We\'ll respond within 24 hours. 🚀', 'success', 5000);
    form.reset();
  });
}


/* ─────────────────────────────────────────────
   12. PARALLAX HERO VISUAL
   Light parallax on scroll for the bulb stage
   ───────────────────────────────────────────── */

function initHeroParallax () {
  const bulbStage = document.querySelector('.bulb-stage');
  if (!bulbStage) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      bulbStage.style.transform = `translateY(${scrollY * 0.12}px)`;
    }
  }, { passive: true });
}


/* ─────────────────────────────────────────────
   13. BULB CURSOR TRAIL
   Tiny bulb dots follow the mouse in the hero
   ───────────────────────────────────────────── */

function initBulbCursorTrail () {
  const hero = document.getElementById('hero');
  if (!hero) return;

 
  if (window.innerWidth < 1024) return;

  const TRAIL_COUNT = 8;
  const trail = [];

  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position:      'fixed',
      width:         `${6 - i * 0.5}px`,
      height:        `${6 - i * 0.5}px`,
      borderRadius:  '50%',
      background:    `hsl(${30 + i * 15}, 90%, 60%)`,
      pointerEvents: 'none',
      zIndex:        '9999',
      opacity:       `${0.8 - i * 0.08}`,
      transform:     'translate(-50%, -50%)',
      transition:    `left ${i * 0.04}s ease, top ${i * 0.04}s ease`,
      display:       'none',
    });
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  hero.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trail.forEach(t => { t.el.style.display = 'block'; });
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    trail.forEach(t => { t.el.style.display = 'none'; });
  });

  function animateTrail () {
    let x = mouseX, y = mouseY;
    trail.forEach((t, i) => {
      const prev = trail[i - 1];
      t.x = prev ? prev.x + (x - prev.x) * 0.4 : x;
      t.y = prev ? prev.y + (y - prev.y) * 0.4 : y;
      x = t.x; y = t.y;
      t.el.style.left = `${t.x}px`;
      t.el.style.top  = `${t.y}px`;
    });
    requestAnimationFrame(animateTrail);
  }
  requestAnimationFrame(animateTrail);
}


/* ─────────────────────────────────────────────
   14. SECTION ENTRANCE COUNTERS
   Trigger counters when about stats come into view
   ───────────────────────────────────────────── */

function initAfcCounters () {
  const afcNumbers = document.querySelectorAll('.afc-number[data-count]');
  if (!afcNumbers.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el       = entry.target;
        const target   = parseInt(el.getAttribute('data-count'),  10);
        const suffix   = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start    = performance.now();

        const step = now => {
          const progress = Math.min((now - start) / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.floor(eased * target)}${suffix}`;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  afcNumbers.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   15. HERO STAT COUNTERS
   ───────────────────────────────────────────── */

function initHeroStatCounters () {
  const statEls = document.querySelectorAll('.hero-stat-number[data-count]');
  if (!statEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const dur    = 2200;
        const start  = performance.now();

        const step = now => {
          const p = Math.min((now - start) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.floor(e * target)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  statEls.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   16. SERVICE CARD TILT EFFECT
   ───────────────────────────────────────────── */

function initServiceCardTilt () {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const rx   = ((e.clientY - cy) / (rect.height / 2)) * 5;
      const ry   = -((e.clientX - cx) / (rect.width  / 2)) * 5;
      card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ─────────────────────────────────────────────
   UTILITY: debounce (local fallback)
   ───────────────────────────────────────────── */

function debounce (fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


/* ─────────────────────────────────────────────
   INIT — runs after DOM + global.js
   ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  
  initHeroCanvas();
  initCtaCanvas();

  
  initBulbSparkles();
  initBulbClickBurst();
  initWordRotator();
  initHeroParallax();
  initHeroStatCounters();
  initBulbCursorTrail();

  
  initMarquee();

  
  initTechStack();
  initPortfolio();
  initTestimonials();
  initBlogGrid();
  initAfcCounters();

  
  initServiceCardTilt();

  
  initContactForm();

  
  setTimeout(() => {
    
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add('visible');
      }
    });
  }, 150);

});
(function () {
  const counters = document.querySelectorAll('.hero-stat-number');

  const animateCount = (el) => {
    const target = +el.getAttribute('data-count');
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;

    const increment = target / 60;

    const update = () => {
      current += increment;

      if (current < target) {
        el.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };

    update();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
})();

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) * 0.2;
    const moveY = (y - rect.height / 2) * 0.3;

    btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

const bulb = document.getElementById('bulb-core');

document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;

  bulb.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateZ(10px)`;
});

