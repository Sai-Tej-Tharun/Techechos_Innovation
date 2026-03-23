/**
 * TechEchos Innovation — login/login.js
 *
 * Scene:
 *   1. Sky canvas   — deep pre-dawn aurora gradient, slowly shifts
 *   2. Star canvas  — dense twinkling star field above the hills
 *   3. Lanterns     — TechEchos logo-bulbs float upward from behind
 *                     the hill silhouette like glowing sky lanterns.
 *                     Each has a warm halo, sinusoidal drift, parallax
 *                     depth (size) and naturally recycles after rising.
 *
 * Card:
 *   4. Login ↔ Register morph with slide + scale-bounce animation
 *   5. Password strength meter (4 levels)
 *   6. Eye-toggle on both password fields
 *   7. Real-time validation with error messages
 *   8. Submit → loading spinner → success state + celebration lanterns
 *   9. Social OAuth buttons with demo toast
 *  10. Keyboard: Escape returns to login from register
 */
'use strict';


const $  = id => document.getElementById(id);
const dbn = (fn, d) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; };


/* ══════════════════════════════════════════════════════════════
   1. SKY — deep pre-dawn gradient + shifting aurora band
   ══════════════════════════════════════════════════════════════ */
function initSky() {
  const c = $('ln-sky');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, tick = 0;

  const resize = () => { W = c.width = innerWidth; H = c.height = innerHeight; };

  function draw() {
    tick += 0.004;

    
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0.00, '#010408');
    sky.addColorStop(0.28, '#04091A');
    sky.addColorStop(0.58, '#070E22');
    sky.addColorStop(0.80, '#0B152D');
    sky.addColorStop(1.00, '#0A1220');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    
    const a1y = H * 0.28 + Math.sin(tick * 0.7) * H * 0.06;
    const a1  = ctx.createRadialGradient(W * 0.45, a1y, 0, W * 0.45, a1y, W * 0.52);
    a1.addColorStop(0,   `rgba(123,47,190,${0.11 + 0.05 * Math.sin(tick)})`);
    a1.addColorStop(0.5, `rgba(123,47,190,${0.04 + 0.02 * Math.sin(tick)})`);
    a1.addColorStop(1,   'transparent');
    ctx.fillStyle = a1;
    ctx.fillRect(0, 0, W, H);

    
    const a2  = ctx.createRadialGradient(W * 0.68, H * 0.72, 0, W * 0.68, H * 0.72, W * 0.44);
    a2.addColorStop(0,   `rgba(249,115,22,${0.07 + 0.04 * Math.cos(tick * 0.8)})`);
    a2.addColorStop(1,   'transparent');
    ctx.fillStyle = a2;
    ctx.fillRect(0, 0, W, H);

    
    const a3  = ctx.createRadialGradient(W * 0.22, H * 0.38, 0, W * 0.22, H * 0.38, W * 0.36);
    a3.addColorStop(0,   `rgba(236,72,153,${0.05 + 0.03 * Math.sin(tick * 1.2)})`);
    a3.addColorStop(1,   'transparent');
    ctx.fillStyle = a3;
    ctx.fillRect(0, 0, W, H);

    
    const hor = ctx.createLinearGradient(0, H * 0.68, 0, H);
    hor.addColorStop(0,   'transparent');
    hor.addColorStop(0.6, `rgba(249,115,22,${0.055 + 0.025 * Math.sin(tick * 0.5)})`);
    hor.addColorStop(1,   `rgba(123,47,190,0.08)`);
    ctx.fillStyle = hor;
    ctx.fillRect(0, H * 0.68, W, H * 0.32);

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', dbn(resize, 200));
}


/* ══════════════════════════════════════════════════════════════
   2. STARS — twinkling field limited to sky area above hills
   ══════════════════════════════════════════════════════════════ */
function initStars() {
  const c = $('ln-stars');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, stars = [], tick = 0;

  const resize = () => {
    W = c.width = innerWidth;
    H = c.height = innerHeight;
    buildStars();
  };

  function buildStars() {
    
    const n = Math.max(60, Math.floor(W * H * 0.00022));
    stars = Array.from({ length: n }, () => {
      const bright = Math.random();
      return {
        x:     Math.random() * W,
        y:     Math.random() * H * 0.60,
        r:     0.25 + Math.random() * (bright > 0.92 ? 1.8 : 1.1),
        baseA: 0.18 + Math.random() * 0.72,
        phase: Math.random() * Math.PI * 2,
        speed: 0.006 + Math.random() * 0.028,
        
        warm:  Math.random() < 0.07,
        cool:  Math.random() < 0.18,
      };
    });
  }

  function draw() {
    tick++;
    ctx.clearRect(0, 0, W, H);

    stars.forEach(s => {
      const a = s.baseA * (0.38 + 0.62 * Math.sin(s.phase + tick * s.speed));
      let col;
      if      (s.warm) col = `rgba(255,230,180,${a})`;
      else if (s.cool) col = `rgba(180,215,255,${a})`;
      else             col = `rgba(255,255,255,${a})`;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();

      
      if (s.r > 1.1) {
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        g.addColorStop(0,   col);
        g.addColorStop(0.5, col.replace(/[\d.]+\)$/, `${a * 0.18})`));
        g.addColorStop(1,   'transparent');
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', dbn(resize, 200));
}


/* ══════════════════════════════════════════════════════════════
   3. LANTERNS — logo-bulbs rise from behind the hills
   ══════════════════════════════════════════════════════════════ */


const _lanternField = () => $('ln-lantern-field');

function initLanterns() {
  const TOTAL = 22;
  
  for (let i = 0; i < TOTAL; i++) {
    setTimeout(() => spawnLantern(), i * (7000 / TOTAL));
  }
}

function spawnLantern(opts = {}) {
  const field = _lanternField();
  if (!field) return;

  const W = innerWidth;
  const H = innerHeight;

  
  const size  = opts.size  ?? (12 + Math.random() * 38);   
  const depth = size / 50;                                  

  
  /*    Hills occupy roughly bottom 38–44% of viewport.
        Spawn lanterns so they emerge from behind the hilltop
        (slightly below mid-height for the largest, higher for smaller)  */
  const hillTopFrac = 0.56 + (1 - depth) * 0.08;           
  const startX = opts.x ?? Math.random() * W;
  const startY = opts.y ?? H * hillTopFrac + (Math.random() - 0.5) * H * 0.05;

  
  const driftTotalX = (Math.random() - 0.5) * 200;         
  const swayAmp     = 18 + Math.random() * 36;             
  const swayFreq    = 0.35 + Math.random() * 0.65;         
  const riseSpeed   = (H * 1.25) / ((14000 + Math.random() * 18000) / depth); 

  
  const maxA = opts.maxA ?? (0.38 + 0.48 * depth);

  
  const haloDur   = (1.6 + Math.random() * 2.2).toFixed(2) + 's';
  const haloDelay = (Math.random() * 1.5).toFixed(2) + 's';

  
  const wrap = document.createElement('div');
  wrap.className = 'ln-lantern';
  wrap.style.cssText = `
    width:${size}px; height:${size}px;
    --halo:${haloDur};
    --halo-delay:${haloDelay};
    left:0; top:0;
    opacity:0;
  `;

  const img = document.createElement('img');
  img.src     = 'images/logo.svg';
  img.alt     = '';
  img.loading = 'lazy';
  img.style.cssText = `
    filter:
      drop-shadow(0 0 ${(size * 0.22).toFixed(1)}px rgba(255,165,50,${(0.75 * depth).toFixed(2)}))
      drop-shadow(0 0 ${(size * 0.55).toFixed(1)}px rgba(249,115,22,${(0.50 * depth).toFixed(2)}))
      drop-shadow(0 0 ${(size * 1.10).toFixed(1)}px rgba(123,47,190,${(0.22 * depth).toFixed(2)}));
  `;
  wrap.appendChild(img);
  field.appendChild(wrap);

  
  const startTime = performance.now();

  function frame(now) {
    const elapsed  = now - startTime;
    const risePx   = elapsed * riseSpeed;
    const progress = Math.min(risePx / (H * 1.25), 1);

    
    const easedRise = progress * progress * 0.25 + progress * 0.75;
    const curY = startY - easedRise * (H * 1.30 + size);

    
    const sway = Math.sin(elapsed / 1000 * swayFreq * Math.PI * 2) * swayAmp;
    const curX = startX + driftTotalX * progress + sway;

    
    let opacity;
    if      (progress < 0.07) opacity = (progress / 0.07) * maxA;
    else if (progress < 0.76) opacity = maxA;
    else                      opacity = maxA * (1 - (progress - 0.76) / 0.24);

    wrap.style.transform = `translate(${curX}px, ${curY}px)`;
    wrap.style.opacity   = opacity;

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      wrap.remove();
      
      spawnLantern();
    }
  }

  requestAnimationFrame(frame);
}


function burstLanterns(count = 8) {
  const W = innerWidth;
  const H = innerHeight;
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnLantern({
      size:  30 + Math.random() * 20,
      x:     W * 0.20 + Math.random() * W * 0.60,
      y:     H * 0.50 + Math.random() * H * 0.10,
      maxA:  0.90,
    }), i * 140);
  }
}


/* ══════════════════════════════════════════════════════════════
   4. CARD MORPH — Login ↔ Register
   ══════════════════════════════════════════════════════════════ */

let _isReg = false;

function initMorph() {
  $('ln-to-register')?.addEventListener('click', () => morphTo(true));
  $('ln-to-login')?.addEventListener('click',    () => morphTo(false));
}

function morphTo(toRegister) {
  if (toRegister === _isReg) return;
  _isReg = toRegister;

  const card      = $('ln-card');
  const fromForm  = $(toRegister ? 'ln-login-form'    : 'ln-register-form');
  const toForm    = $(toRegister ? 'ln-register-form' : 'ln-login-form');
  const title     = $('ln-card-title');
  const sub       = $('ln-card-sub');
  const bulbImg   = $('ln-bulb-img');

  
  fromForm.classList.add('ln-slide-out');

  setTimeout(() => {
    fromForm.classList.add('ln-form-hidden');
    fromForm.classList.remove('ln-slide-out');

    
    title.style.opacity = '0';
    sub.style.opacity   = '0';

    setTimeout(() => {
      title.textContent = toRegister ? 'Create your account' : 'Welcome back';
      sub.textContent   = toRegister
        ? 'Join TechEchos Innovation today'
        : 'Sign in to your TechEchos account';
      title.classList.add('ln-header-animate');
      sub.classList.add('ln-header-animate');
      title.style.opacity = '1';
      sub.style.opacity   = '1';
      setTimeout(() => {
        title.classList.remove('ln-header-animate');
        sub.classList.remove('ln-header-animate');
      }, 400);
    }, 80);

    
    toForm.classList.remove('ln-form-hidden');
    toForm.style.display = 'flex';
    toForm.classList.add('ln-slide-in');
    setTimeout(() => toForm.classList.remove('ln-slide-in'), 400);

    
    card.classList.add('ln-morphing');
    setTimeout(() => card.classList.remove('ln-morphing'), 550);

    
    if (bulbImg) {
      bulbImg.style.filter = toRegister
        ? 'drop-shadow(0 0 18px rgba(123,47,190,0.95)) drop-shadow(0 0 40px rgba(236,72,153,0.65))'
        : 'drop-shadow(0 0 16px rgba(249,115,22,0.95)) drop-shadow(0 0 36px rgba(123,47,190,0.60))';
    }

    
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  }, 220);
}


/* ══════════════════════════════════════════════════════════════
   5. PASSWORD EYE TOGGLE
   ══════════════════════════════════════════════════════════════ */
function initEye() {
  document.querySelectorAll('.ln-eye-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const isText = target.type === 'text';
      target.type = isText ? 'password' : 'text';
      btn.querySelector('.ln-eye-show').style.display = isText ? 'block' : 'none';
      btn.querySelector('.ln-eye-hide').style.display = isText ? 'none'  : 'block';
      btn.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
    });
  });
}


/* ══════════════════════════════════════════════════════════════
   6. PASSWORD STRENGTH METER
   ══════════════════════════════════════════════════════════════ */
function initStrength() {
  const input  = document.getElementById('r-pass');
  const fill   = $('ln-strength-fill');
  const label  = $('ln-strength-label');
  if (!input || !fill || !label) return;

  const LEVELS = [
    { pct: '0%',   bg: 'transparent',                              text: '',       col: 'rgba(255,255,255,.28)' },
    { pct: '25%',  bg: '#EF4444',                                  text: 'Weak',   col: '#EF4444' },
    { pct: '50%',  bg: '#F59E0B',                                  text: 'Fair',   col: '#F59E0B' },
    { pct: '75%',  bg: '#3B82F6',                                  text: 'Good',   col: '#3B82F6' },
    { pct: '100%', bg: 'linear-gradient(90deg,#22C55E,#00CFFF)',  text: 'Strong', col: '#22C55E' },
  ];

  input.addEventListener('input', () => {
    const v = input.value;
    let sc = 0;
    if (v.length >= 8)  sc++;
    if (v.length >= 12) sc++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) sc++;
    if (/\d/.test(v))   sc++;
    if (/[^A-Za-z0-9]/.test(v)) sc++;
    const lvl = v ? Math.min(4, Math.ceil(sc * 0.88)) : 0;
    const L   = LEVELS[lvl];
    fill.style.width      = L.pct;
    fill.style.background = L.bg;
    label.textContent     = L.text;
    label.style.color     = L.col;
  });
}


/* ══════════════════════════════════════════════════════════════
   7. VALIDATION HELPERS
   ══════════════════════════════════════════════════════════════ */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(input, rule) {
  const v   = input?.value?.trim() ?? '';
  const err = input?.closest('.ln-field')?.querySelector('.ln-err');
  let msg = '';

  if (rule === 'email'   && !EMAIL_RE.test(v))  msg = 'Please enter a valid email address.';
  if (rule === 'pass6'   && v.length < 6)        msg = 'Password must be at least 6 characters.';
  if (rule === 'pass8'   && v.length < 8)        msg = 'Password must be at least 8 characters.';
  if (rule === 'name'    && v.length < 2)        msg = 'Please enter at least 2 characters.';

  if (err) err.textContent = msg;
  input?.classList.toggle('is-invalid', !!msg);
  input?.classList.toggle('is-valid',  !msg && v.length > 0);
  return !msg;
}

function setLoading(btn, on) {
  btn.disabled = on;
  btn.classList.toggle('ln-loading', on);
  if (!on) btn.innerHTML = btn.dataset.label || btn.innerHTML;
}


/* ══════════════════════════════════════════════════════════════
   8. SUCCESS STATE
   ══════════════════════════════════════════════════════════════ */
function showSuccess(card, msg1, msg2) {
  
  const header = $('ln-card-header');
  const bulb   = card.querySelector('.ln-bulb-wrap');

  
  document.querySelectorAll('.ln-form').forEach(f => { f.style.display = 'none'; });
  if (header) header.style.display = 'none';

  
  burstLanterns(10);

  
  const div = document.createElement('div');
  div.className = 'ln-success';
  div.innerHTML = `
    <img src="images/logo.svg" alt="" class="ln-success-bulb">
    <h2 class="ln-success-title">${msg1}</h2>
    <p  class="ln-success-sub">${msg2}</p>
  `;
  card.appendChild(div);
}


/* ══════════════════════════════════════════════════════════════
   9. LOGIN FORM
   ══════════════════════════════════════════════════════════════ */
function initLogin() {
  const form = $('ln-login-form');
  const btn  = $('ln-login-btn');
  if (!form || !btn) return;

  btn.dataset.label = btn.innerHTML;

  
  document.getElementById('l-email')?.addEventListener('blur', () =>
    validate(document.getElementById('l-email'), 'email'));
  document.getElementById('l-pass')?.addEventListener('blur',  () =>
    validate(document.getElementById('l-pass'),  'pass6'));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok1 = validate(document.getElementById('l-email'), 'email');
    const ok2 = validate(document.getElementById('l-pass'),  'pass6');
    if (!ok1 || !ok2) return;

    setLoading(btn, true);

    setTimeout(() => {
      setLoading(btn, false);
      showSuccess(
        $('ln-card'),
        '✓ Signed in!',
        'Welcome back. Redirecting you to your dashboard…'
      );
    }, 1800);
  });
}


/* ══════════════════════════════════════════════════════════════
   10. REGISTER FORM
   ══════════════════════════════════════════════════════════════ */
function initRegister() {
  const form = $('ln-register-form');
  const btn  = $('ln-register-btn');
  if (!form || !btn) return;

  btn.dataset.label = btn.innerHTML;

  ['r-fname','r-lname'].forEach(id => {
    document.getElementById(id)?.addEventListener('blur', () =>
      validate(document.getElementById(id), 'name'));
  });
  document.getElementById('r-email')?.addEventListener('blur', () =>
    validate(document.getElementById('r-email'), 'email'));
  document.getElementById('r-pass')?.addEventListener('blur', () =>
    validate(document.getElementById('r-pass'), 'pass8'));

  form.addEventListener('submit', e => {
    e.preventDefault();

    const ok1 = validate(document.getElementById('r-fname'), 'name');
    const ok2 = validate(document.getElementById('r-lname'), 'name');
    const ok3 = validate(document.getElementById('r-email'), 'email');
    const ok4 = validate(document.getElementById('r-pass'),  'pass8');

    const agree    = document.getElementById('r-agree');
    const agreeErr = $('r-agree-err');
    const agreeOk  = agree?.checked;
    if (agreeErr) agreeErr.textContent = agreeOk ? '' : 'Please agree to the Terms of Service.';

    if (!ok1 || !ok2 || !ok3 || !ok4 || !agreeOk) return;

    setLoading(btn, true);

    setTimeout(() => {
      setLoading(btn, false);
      showSuccess(
        $('ln-card'),
        '🎉 Account created!',
        'Welcome to TechEchos Innovation. Redirecting you to your dashboard…'
      );
    }, 1900);
  });
}


/* ══════════════════════════════════════════════════════════════
   11. SOCIAL BUTTONS — demo toast
   ══════════════════════════════════════════════════════════════ */
function initSocial() {
  document.querySelectorAll('.ln-social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.provider || 'OAuth';
      if (window.TechEchos?.showToast) {
        window.TechEchos.showToast(
          `${p} OAuth would open here in a live deployment.`,
          'info', 3200
        );
      }
    });
  });
}


/* ══════════════════════════════════════════════════════════════
   12. KEYBOARD SHORTCUTS
   ══════════════════════════════════════════════════════════════ */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    
    if (e.key === 'Escape' && _isReg) morphTo(false);
  });
}


/* ══════════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initSky();
  initStars();
  initLanterns();
  initMorph();
  initEye();
  initStrength();
  initLogin();
  initRegister();
  initSocial();
  initKeyboard();
});
