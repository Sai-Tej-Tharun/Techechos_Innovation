/**
 * ============================================================
 * TechEchos Innovation — global.js
 * Master JavaScript module: navbar, scroll, animations,
 * modals, toasts, counters, forms, back-to-top, cookie banner,
 * component loader (navbar.html + footer.html).
 * All pages link to this file.
 * ============================================================
 */

'use strict';

/* ─────────────────────────────────────────────
   0. UTILITY HELPERS
   ───────────────────────────────────────────── */

/**
 * Shorthand querySelector.
 * @param {string} selector
 * @param {Document|Element} [ctx=document]
 * @returns {Element|null}
 */
const qs = (selector, ctx = document) => ctx.querySelector(selector);

/**
 * Shorthand querySelectorAll → Array.
 * @param {string} selector
 * @param {Document|Element} [ctx=document]
 * @returns {Element[]}
 */
const qsa = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

/**
 * Debounce a function.
 * @param {Function} fn
 * @param {number} delay ms
 * @returns {Function}
 */
const debounce = (fn, delay = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttle a function.
 * @param {Function} fn
 * @param {number} limit ms
 * @returns {Function}
 */
const throttle = (fn, limit = 100) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
};

/**
 * Check if an element is in the viewport.
 * @param {Element} el
 * @param {number} [offset=0] px from bottom of viewport
 * @returns {boolean}
 */
const isInViewport = (el, offset = 80) => {
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight - offset) && rect.bottom >= 0;
};


/* ─────────────────────────────────────────────
   1. COMPONENT LOADER
   Fetches navbar.html and footer.html and injects
   them into #navbar-placeholder and #footer-placeholder.
   ───────────────────────────────────────────── */

/**
 * Loads an HTML component from a URL and injects it into a container element.
 * @param {string} url        Path to the HTML partial.
 * @param {string} targetId   ID of the host element (without #).
 * @param {Function} [cb]     Optional callback after injection.
 */
async function loadComponent(url, targetId, cb) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} – ${url}`);
    const html = await res.text();
    target.innerHTML = html;
    if (typeof cb === 'function') cb();
  } catch (err) {
    
    target.innerHTML = '';
  }
}

/**
 * Loads both navbar and footer components, then initialises
 * anything that depends on the injected DOM.
 */
async function loadGlobalComponents() {
  
  const base = getBasePath();

  await Promise.all([
    loadComponent(`${base}components/navbar.html`, 'navbar-placeholder', initNavbar),
    loadComponent(`${base}components/footer.html`, 'footer-placeholder'),
  ]);

  
  highlightActiveNavLink();
}

/**
 * Computes the relative path prefix back to the project root,
 * based on how many directory levels deep the current page is.
 * e.g. from /home-1/home.html → prefix is "../"
 *      from /admin-dashboard/dashboard.html → prefix is "../"
 * @returns {string}
 */
function getBasePath() {
  const path = window.location.pathname;
  
  const parts = path.split('/').filter(Boolean);
  
  const depth = parts.length > 0 ? parts.length - 1 : 0;
  return depth > 0 ? '../'.repeat(depth) : './';
}


/* ─────────────────────────────────────────────
   2. NAVBAR
   ───────────────────────────────────────────── */

/**
 * Initialises sticky scroll effect and mobile menu toggle.
 * Called after navbar.html is injected into the DOM.
 */
function initNavbar() {
  const navbar = qs('#te-navbar');
  if (!navbar) return;

  /* SCROLL EFFECT */
  const handleScroll = throttle(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 48);
  }, 80);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* MOBILE MENU */
  const burger     = qs('#te-burger');              // ← was missing
  const mobileMenu = document.getElementById('te-mobile-menu');

  if (burger && mobileMenu) {                       // ← was missing
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* close on link click (mobile) */
    qsa('.te-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          burger.classList.remove('open');
          mobileMenu.classList.remove('open');
          mobileMenu.setAttribute('aria-hidden', 'true');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    /* click outside closes menu */
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * Adds `.active` class to the nav link whose href matches
 * the current page URL.
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  qsa('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    
    if (href && currentPath.includes(href.replace(/^(\.\.\/)+/, '').split('/')[0])) {
      link.classList.add('active');
    }
  });
}


/* ─────────────────────────────────────────────
   3. SCROLL-REVEAL ANIMATIONS
   Uses IntersectionObserver to add .visible to
   elements with .reveal / .reveal-left / .reveal-right.
   ───────────────────────────────────────────── */

function initScrollReveal() {
  const targets = qsa('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  });

  targets.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   4. ANIMATED COUNTER
   Counts up numbers inside [data-count] elements.
   ───────────────────────────────────────────── */

/**
 * Animates a single counter element from 0 to its target.
 * @param {Element} el   Element with data-count attribute.
 */
function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-count'), 10);
  const duration = parseInt(el.getAttribute('data-duration') || '2000', 10);
  const suffix   = el.getAttribute('data-suffix') || '';
  const prefix   = el.getAttribute('data-prefix') || '';
  const start    = performance.now();

  const step = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

/**
 * Observes [data-count] elements and triggers counter
 * animation when they enter the viewport.
 */
function initCounters() {
  const counters = qsa('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}


/* ─────────────────────────────────────────────
   5. BACK-TO-TOP BUTTON
   ───────────────────────────────────────────── */

function initBackToTop() {
  
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
           stroke-linejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15"/>
      </svg>`;
    document.body.appendChild(btn);
  }

// WHATSAPP BUTTON + POPUP
let wa = document.getElementById('whatsapp-btn');
let chat = document.getElementById('wa-chat');

if (!wa) {
  wa = document.createElement('button');
  wa.id = 'whatsapp-btn';
  wa.setAttribute('aria-label', 'Open WhatsApp Chat');

  wa.innerHTML = `
<svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor">
  <path d="M16 .4C7.3.4.4 7.3.4 16c0 2.8.7 5.5 2.1 7.9L.3 31.7l8-2.1c2.3 1.2 4.8 1.8 7.4 1.8h.1c8.7 0 15.6-6.9 15.6-15.6S24.7.4 16 .4zm0 28.5c-2.3 0-4.5-.6-6.4-1.7l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.2-2-1.9-4.3-1.9-6.7 0-7 5.7-12.7 12.7-12.7S28.8 9 28.8 16 23 28.9 16 28.9zm7-9.6c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.2-2.2-2.6-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.6.1-.2.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .5-.3.4-1.4 1.3-1.4 3.1 0 1.8 1.3 3.6 1.5 3.9.2.3 2.6 4 6.4 5.5.9.4 1.6.6 2.2.8.9.3 1.7.3 2.3.2.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.2-.7-.4z"/>
</svg>
`;
  document.body.appendChild(wa);
}

if (!chat) {
  chat = document.createElement('div');
  chat.id = 'wa-chat';

  chat.innerHTML = `
    <div class="wa-header">
      <strong>Chat with us</strong>
      <span id="wa-close">✕</span>
    </div>

    <div class="wa-body">
      <p>Hi 👋<br>How can we help you?</p>
    </div>

    <div class="wa-footer">
      <a href="https://wa.me/91XXXXXXXXXX" target="_blank">
        Start Chat on WhatsApp
      </a>
    </div>
  `;

  document.body.appendChild(chat);
}

// toggle chat
wa.addEventListener('click', () => {
  chat.classList.toggle('open');
});

// close button
document.addEventListener('click', (e) => {
  if (e.target.id === 'wa-close') {
    chat.classList.remove('open');
  }
});

  const toggle = throttle(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
    wa.classList.toggle('visible', window.scrollY > 400);
  }, 100);

  window.addEventListener('scroll', toggle, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   6. TOAST NOTIFICATIONS
   Usage:
     showToast('Saved!', 'success');
     showToast('Something went wrong.', 'error', 5000);
   ───────────────────────────────────────────── */

/**
 * Displays a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} [type='info']
 * @param {number} [duration=3500] ms before auto-dismiss
 */
function showToast(message, type = 'info', duration = 3500) {
  
  let container = qs('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const icons = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span style="color:var(--color-${type === 'info' ? 'brand' : type}); flex-shrink:0;">
      ${icons[type] || icons.info}
    </span>
    <span>${message}</span>`;

  container.appendChild(toast);

  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    setTimeout(() => toast.remove(), 350);
  }, duration);
}


window.showToast = showToast;


/* ─────────────────────────────────────────────
   7. MODAL MANAGEMENT
   Usage:
     openModal('my-modal');
     closeModal('my-modal');
   ───────────────────────────────────────────── */

/**
 * Opens a modal overlay by ID.
 * @param {string} id  ID of the .modal-overlay element.
 */
function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  const focusable = overlay.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) setTimeout(() => focusable.focus(), 100);
}

/**
 * Closes a modal overlay by ID.
 * @param {string} id  ID of the .modal-overlay element.
 */
function closeModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}


function initModals() {
  
  qsa('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.modalOpen));
  });

  
  qsa('[data-modal-close], .modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.modalClose || btn.closest('.modal-overlay')?.id;
      if (id) closeModal(id);
    });
  });

  
  qsa('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      qsa('.modal-overlay.open').forEach(overlay => closeModal(overlay.id));
    }
  });
}

window.openModal  = openModal;
window.closeModal = closeModal;


/* ─────────────────────────────────────────────
   8. FORM VALIDATION
   Usage: attach to a <form> via initFormValidation(formEl)
          or it auto-inits all forms with data-validate.
   ───────────────────────────────────────────── */

/**
 * Validates a single input field.
 * @param {HTMLInputElement|HTMLTextAreaElement} field
 * @returns {boolean}
 */
function validateField(field) {
  const value   = field.value.trim();
  const type    = field.type;
  const name    = field.name || field.id;
  let   isValid = true;
  let   msg     = '';

  
  if (field.required && !value) {
    isValid = false;
    msg = `${capitalize(name)} is required.`;
  }
  
  else if (type === 'email' && value) {
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(value)) {
      isValid = false;
      msg = 'Please enter a valid email address.';
    }
  }
  
  else if (type === 'tel' && value) {
    const telRx = /^[+\d\s\-()]{7,15}$/;
    if (!telRx.test(value)) {
      isValid = false;
      msg = 'Please enter a valid phone number.';
    }
  }
  
  else if (field.minLength && value.length < field.minLength) {
    isValid = false;
    msg = `Minimum ${field.minLength} characters required.`;
  }

  
  const errEl = field.parentElement.querySelector('.form-error-msg');

  if (!isValid) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
  } else {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; }
  }

  return isValid;
}

/**
 * Attaches real-time validation and submit handling to a form.
 * @param {HTMLFormElement} form
 * @param {Function} [onSuccess] Callback when form is valid on submit.
 */
function initFormValidation(form, onSuccess) {
  if (!form) return;

  const fields = qsa('input, textarea, select', form);

  
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = fields.map(validateField).every(Boolean);
    if (allValid && typeof onSuccess === 'function') {
      onSuccess(form);
    } else if (!allValid) {
      const firstError = qs('.form-control.error', form);
      if (firstError) firstError.focus();
    }
  });
}


function initForms() {
  qsa('form[data-validate]').forEach(form => {
    initFormValidation(form, (f) => {
      
      showToast('Message sent successfully!', 'success');
      f.reset();
    });
  });
}

window.initFormValidation = initFormValidation;


/* ─────────────────────────────────────────────
   9. SMOOTH ANCHOR SCROLL
   Handles <a href="#section-id"> clicks.
   ───────────────────────────────────────────── */

function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    const navHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--navbar-height') || '72', 10);
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
}


/* ─────────────────────────────────────────────
   10. TAB COMPONENT
   Usage: add [data-tab-group], [data-tab], [data-tab-panel]
   ───────────────────────────────────────────── */

function initTabs() {
  qsa('[data-tab-group]').forEach(group => {
    const tabs   = qsa('[data-tab]', group);
    const panels = qsa('[data-tab-panel]', group);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => {
          t.classList.toggle('active', t === tab);
          t.setAttribute('aria-selected', String(t === tab));
        });

        panels.forEach(panel => {
          const isActive = panel.dataset.tabPanel === target;
          panel.classList.toggle('hidden', !isActive);
          panel.setAttribute('aria-hidden', String(!isActive));
        });
      });
    });

    
    if (tabs[0]) tabs[0].click();
  });
}


/* ─────────────────────────────────────────────
   11. ACCORDION COMPONENT
   Usage: .accordion > .accordion-item > .accordion-header + .accordion-body
   ───────────────────────────────────────────── */

function initAccordion() {
  qsa('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item   = header.closest('.accordion-item');
      const body   = qs('.accordion-body', item);
      const isOpen = item.classList.contains('open');

      
      const siblings = qsa('.accordion-item.open', item.closest('.accordion'));
      siblings.forEach(sib => {
        sib.classList.remove('open');
        const sibBody = qs('.accordion-body', sib);
        if (sibBody) sibBody.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}


/* ─────────────────────────────────────────────
   12. LAZY IMAGE LOADING
   (Native loading="lazy" is set in HTML; this is
    a fallback observer for older browsers.)
   ───────────────────────────────────────────── */

function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) return; 

  const images = qsa('img[loading="lazy"]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        if (src) img.src = src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
}


/* ─────────────────────────────────────────────
   13. COOKIE CONSENT BANNER
   ───────────────────────────────────────────── */

function initCookieBanner() {
  if (localStorage.getItem('te_cookies_accepted')) return;

  let banner = document.getElementById('cookie-banner');

  
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'complementary');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <p style="font-size:0.875rem; color:var(--color-text-muted); flex:1; min-width:200px;">
        We use cookies to enhance your experience. By continuing to visit this site
        you agree to our use of cookies.
        <a href="#" style="color:var(--color-accent); text-decoration:underline; margin-left:4px;">Learn more</a>
      </p>
      <div style="display:flex; gap:12px; flex-shrink:0;">
        <button id="cookie-accept" class="btn btn-primary btn-sm" aria-label="Accept cookies">Accept</button>
        <button id="cookie-decline" class="btn btn-secondary btn-sm" aria-label="Decline cookies">Decline</button>
      </div>`;
    document.body.appendChild(banner);
  }

  
  setTimeout(() => banner.classList.add('show'), 1500);

  
  qs('#cookie-accept', banner)?.addEventListener('click', () => {
    localStorage.setItem('te_cookies_accepted', '1');
    banner.classList.remove('show');
  });

  
  qs('#cookie-decline', banner)?.addEventListener('click', () => {
    banner.classList.remove('show');
  });
}


/* ─────────────────────────────────────────────
   14. ACTIVE SECTION TRACKER
   Updates nav links as user scrolls through sections
   identified by [data-section] on main <section> tags.
   ───────────────────────────────────────────── */

function initActiveSectionTracker() {
  const sections = qsa('section[id]');
  if (!sections.length) return;

  const navLinks = qsa('.navbar-nav .nav-link');
  if (!navLinks.length) return;

  const handler = throttle(() => {
    const scrollY = window.scrollY;
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) current = section.id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === `#${current}`) {
        link.classList.add('active');
      } else if (href.startsWith('#')) {
        link.classList.remove('active');
      }
    });
  }, 120);

  window.addEventListener('scroll', handler, { passive: true });
}


/* ─────────────────────────────────────────────
   15. PROGRESS BAR ANIMATION
   Animates .progress-fill elements with data-width attribute.
   ───────────────────────────────────────────── */

function initProgressBars() {
  const bars = qsa('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.getAttribute('data-width');
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => observer.observe(bar));
}


/* ─────────────────────────────────────────────
   16. TOOLTIP
   Usage: add [data-tooltip="text"] to any element.
   ───────────────────────────────────────────── */

function initTooltips() {
  qsa('[data-tooltip]').forEach(el => {
    el.style.position = 'relative';

    const tip = document.createElement('span');
    tip.className = 'tooltip-bubble';
    tip.textContent = el.dataset.tooltip;
    
    Object.assign(tip.style, {
      position:      'absolute',
      bottom:        'calc(100% + 8px)',
      left:          '50%',
      transform:     'translateX(-50%)',
      background:    'var(--color-surface-2)',
      color:         'var(--color-text)',
      fontSize:      '0.75rem',
      padding:       '5px 10px',
      borderRadius:  'var(--radius-sm)',
      whiteSpace:    'nowrap',
      pointerEvents: 'none',
      opacity:       '0',
      transition:    'opacity 0.2s ease',
      zIndex:        '500',
      border:        '1px solid var(--color-border)',
      boxShadow:     'var(--shadow-sm)',
    });

    el.appendChild(tip);

    el.addEventListener('mouseenter', () => tip.style.opacity = '1');
    el.addEventListener('mouseleave', () => tip.style.opacity = '0');
    el.addEventListener('focusin',    () => tip.style.opacity = '1');
    el.addEventListener('focusout',   () => tip.style.opacity = '0');
  });
}


/* ─────────────────────────────────────────────
   17. PAGE TRANSITION LOADER
   Shows a thin gradient progress bar at the top
   of the page on navigation.
   ───────────────────────────────────────────── */

function initPageLoader() {
  
  if (document.getElementById('page-loader')) return;

  const loader = document.createElement('div');
  loader.id = 'page-loader';
  Object.assign(loader.style, {
    position:   'fixed',
    top:        '0',
    left:       '0',
    height:     '3px',
    width:      '0%',
    background: 'linear-gradient(90deg, #7B2FBE, #F97316, #EC4899)',
    zIndex:     '9999',
    transition: 'width 0.4s ease, opacity 0.3s ease',
    pointerEvents: 'none',
  });
  document.body.prepend(loader);

  
  loader.style.width = '70%';
  window.addEventListener('load', () => {
    loader.style.width = '100%';
    setTimeout(() => { loader.style.opacity = '0'; }, 350);
    setTimeout(() => { loader.style.width = '0'; loader.style.opacity = '1'; }, 750);
  });
}


/* ─────────────────────────────────────────────
   18. CLIPBOARD COPY UTILITY
   Usage: <button data-copy="text to copy">Copy</button>
   ───────────────────────────────────────────── */

function initCopyButtons() {
  qsa('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 2000);
        showToast('Copied to clipboard!', 'success', 2000);
      } catch {
        showToast('Copy failed. Please try manually.', 'error');
      }
    });
  });
}


/* ─────────────────────────────────────────────
   19. HELPER UTILITIES (Exported to window)
   ───────────────────────────────────────────── */


function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}


function formatNumber(n) {
  return Number(n).toLocaleString();
}


function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}


function truncate(str, maxLen = 120) {
  return str.length > maxLen ? str.slice(0, maxLen).trimEnd() + '…' : str;
}


window.TechEchos = {
  showToast,
  openModal,
  closeModal,
  initFormValidation,
  formatNumber,
  formatDate,
  truncate,
  capitalize,
  qs,
  qsa,
  debounce,
  throttle,
};


/* ─────────────────────────────────────────────
   20. INITIALISATION — runs on DOMContentLoaded
   ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', async () => {

  
  initPageLoader();

  
  await loadGlobalComponents();

  
  initScrollReveal();
  initCounters();
  initBackToTop();
  initSmoothScroll();
  initModals();
  initForms();
  initTabs();
  initAccordion();
  initLazyImages();
  initProgressBars();
  initTooltips();
  initActiveSectionTracker();
  initCopyButtons();

  
  setTimeout(initCookieBanner, 800);

});

function loadParticles() {
  fetch('../components/particles.html')
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML('afterbegin', data);
      initGlobalParticles();
    });
}

loadParticles();

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

function initFloatingBulbs() {
  const containers = document.querySelectorAll('.floating-bulbs');

  containers.forEach(container => {
    const count = parseInt(container.dataset.bulbCount) || 12;
    const imgSrc = container.dataset.bulbImg || '../global-images/logo.svg';

    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');

      const size = 14 + Math.random() * 28;

      img.src = imgSrc;
      img.className = 'floating-bulb-item';
      img.alt = '';

      Object.assign(img.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        bottom: `-${size}px`,
        filter: `drop-shadow(0 0 ${size * 0.35}px rgba(249,115,22,0.7))`,
        animationDuration: `${5 + Math.random() * 6}s`,
        animationDelay: `${Math.random() * 5}s`,
      });

      container.appendChild(img);
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initFloatingBulbs();
});
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initNavbar === 'function') {
    initNavbar();
  } else {
    console.warn('initNavbar() is not defined yet.');
  }
});


