/**
 * ============================================================
 * TechEchos Innovation — coming-soon.js
 * Coming Soon Page JavaScript
 * Handles countdown timer, particle canvas, newsletter form,
 * and interactive animations
 * ============================================================
 */

'use strict';

/* ─────────────────────────────────────────────
   1. COUNTDOWN TIMER
   ───────────────────────────────────────────── */

/**
 * Countdown Timer Class
 * Counts down to a specific launch date
 */
class CountdownTimer {
  constructor(targetDate, elementIds) {
    this.targetDate = new Date(targetDate).getTime();
    this.elements = {
      days: document.getElementById(elementIds.days),
      hours: document.getElementById(elementIds.hours),
      minutes: document.getElementById(elementIds.minutes),
      seconds: document.getElementById(elementIds.seconds)
    };
    
    this.init();
  }

  init() {
   
    this.update();
    
   
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.handleExpired();
      return;
    }

   
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

   
    this.elements.days.textContent = this.pad(days);
    this.elements.hours.textContent = this.pad(hours);
    this.elements.minutes.textContent = this.pad(minutes);
    this.elements.seconds.textContent = this.pad(seconds);

   
    this.elements.seconds.style.animation = 'none';
    setTimeout(() => {
      this.elements.seconds.style.animation = 'digitPulse 0.5s ease';
    }, 10);
  }

  pad(num) {
    return num.toString().padStart(2, '0');
  }

  handleExpired() {
    clearInterval(this.interval);
    
   
    const container = document.querySelector('.countdown-container');
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: var(--space-4);">
          <h3 style="font-size: var(--text-3xl); color: var(--color-success); margin-bottom: var(--space-2);">
            🚀 We're Live!
          </h3>
          <p style="color: var(--color-text-muted);">
            Thank you for waiting. Check your email for launch details.
          </p>
        </div>
      `;
    }
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}


/* ─────────────────────────────────────────────
   2. PARTICLE CANVAS ANIMATION
   ───────────────────────────────────────────── */

/**
 * Particle Canvas Animation
 * Creates animated background particles
 */
class ParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 80;
    this.connectionDistance = 150;
    this.mouse = { x: null, y: null, radius: 150 };
    
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();
    
   
    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: this.getRandomColor()
      });
    }
  }

  getRandomColor() {
    const colors = [
      'rgba(123, 47, 190, 0.8)',  
      'rgba(249, 115, 22, 0.8)',  
      'rgba(236, 72, 153, 0.8)',  
      'rgba(0, 207, 255, 0.8)'    
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  handleMouseMove(e) {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  }

  handleMouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }

  drawParticle(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = particle.color;
    this.ctx.fill();
  }

  drawConnection(p1, p2, distance) {
    const opacity = 1 - (distance / this.connectionDistance);
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(123, 47, 190, ${opacity * 0.3})`;
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }

  updateParticle(particle) {
   
    particle.x += particle.vx;
    particle.y += particle.vy;

   
    if (particle.x < 0 || particle.x > this.canvas.width) {
      particle.vx *= -1;
    }
    if (particle.y < 0 || particle.y > this.canvas.height) {
      particle.vy *= -1;
    }

   
    if (this.mouse.x !== null && this.mouse.y !== null) {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.mouse.radius) {
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.2;
        particle.vy -= Math.sin(angle) * force * 0.2;
      }
    }

   
    particle.vx *= 0.99;
    particle.vy *= 0.99;
  }

  animate() {
   
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

   
    this.particles.forEach((particle, i) => {
      this.updateParticle(particle);
      this.drawParticle(particle);

     
      for (let j = i + 1; j < this.particles.length; j++) {
        const other = this.particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          this.drawConnection(particle, other, distance);
        }
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}


/* ─────────────────────────────────────────────
   3. NEWSLETTER FORM HANDLER
   ───────────────────────────────────────────── */

/**
 * Newsletter Form Handler
 * Validates and submits waitlist form
 */
class NewsletterForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.emailInput = this.form.querySelector('#waitlist-email');
    this.submitBtn = this.form.querySelector('.submit-btn');
    this.messageEl = document.getElementById('form-message');
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.emailInput.addEventListener('input', () => this.clearMessage());
  }

  async handleSubmit(e) {
    e.preventDefault();

    const email = this.emailInput.value.trim();

   
    if (!this.validateEmail(email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      this.emailInput.classList.add('error');
      return;
    }

   
    this.setLoading(true);

   
    try {
      await this.submitToWaitlist(email);
      
     
      this.showMessage('🎉 Success! You\'re on the waitlist. Check your email.', 'success');
      this.emailInput.value = '';
      this.emailInput.classList.add('success');
      
     
      this.trackSignup(email);
      
    } catch (error) {
     
      this.showMessage('Something went wrong. Please try again.', 'error');
      this.emailInput.classList.add('error');
    } finally {
      this.setLoading(false);
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async submitToWaitlist(email) {
   
    return new Promise((resolve, reject) => {
      setTimeout(() => {
       
       
        
       
        if (Math.random() > 0.1) {
          resolve({ success: true });
        } else {
          reject(new Error('Network error'));
        }
      }, 1500);
    });
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.submitBtn.disabled = true;
      this.submitBtn.querySelector('.btn-text').textContent = 'Processing...';
      this.submitBtn.style.opacity = '0.7';
    } else {
      this.submitBtn.disabled = false;
      this.submitBtn.querySelector('.btn-text').textContent = 'Notify Me';
      this.submitBtn.style.opacity = '1';
    }
  }

  showMessage(text, type) {
    this.messageEl.textContent = text;
    this.messageEl.className = `form-message ${type} show`;
    
   
    setTimeout(() => {
      this.messageEl.classList.remove('show');
    }, 5000);
  }

  clearMessage() {
    this.messageEl.classList.remove('show');
    this.emailInput.classList.remove('error', 'success');
  }

  trackSignup(email) {
    console.log('[Waitlist Signup]', email);
    
   
   
   
   
   
   
   
  }
}


/* ─────────────────────────────────────────────
   4. PROGRESS BAR ANIMATION
   ───────────────────────────────────────────── */

/**
 * Animates the launch progress bar
 */
function animateLaunchProgress() {
  const progressFill = document.getElementById('progress-fill');
  const progressPercent = document.getElementById('progress-percent');
  
  if (!progressFill) return;

 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = progressFill.getAttribute('data-width') || '78%';
        
        setTimeout(() => {
          progressFill.style.width = targetWidth;
        }, 300);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(progressFill);
}


/* ─────────────────────────────────────────────
   5. SOCIAL LINK TOOLTIPS
   ───────────────────────────────────────────── */

/**
 * Adds hover tooltips to social links
 */
function initSocialTooltips() {
  const socialLinks = document.querySelectorAll('.social-link[data-tooltip]');
  
  socialLinks.forEach(link => {
    const tooltip = document.createElement('span');
    tooltip.className = 'social-tooltip';
    tooltip.textContent = link.getAttribute('data-tooltip');
    
    Object.assign(tooltip.style, {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--color-surface-2)',
      color: 'var(--color-text)',
      fontSize: '0.75rem',
      padding: '4px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.2s ease',
      zIndex: '1000',
      border: '1px solid var(--color-border)'
    });

    link.style.position = 'relative';
    link.appendChild(tooltip);

    link.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
    link.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
  });
}


/* ─────────────────────────────────────────────
   6. KEYBOARD SHORTCUTS
   ───────────────────────────────────────────── */

/**
 * Adds keyboard shortcuts for quick actions
 */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
   
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const emailInput = document.getElementById('waitlist-email');
      if (emailInput) emailInput.focus();
    }

   
    if (e.key === 'Escape') {
      const emailInput = document.getElementById('waitlist-email');
      if (emailInput && document.activeElement === emailInput) {
        emailInput.blur();
      }
    }
  });
}


/* ─────────────────────────────────────────────
   7. PAGE ANALYTICS
   ───────────────────────────────────────────── */

/**
 * Tracks page views and user interactions
 */
function initAnalytics() {
 
  console.log('[Coming Soon Page Load]', {
    timestamp: new Date().toISOString(),
    referrer: document.referrer || 'Direct',
    userAgent: navigator.userAgent
  });

 
  let startTime = Date.now();

  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    console.log('[Time on Page]', `${timeSpent} seconds`);
    
   
   
   
   
   
   
   
  });

 
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const platform = link.getAttribute('aria-label') || 'Unknown';
      console.log('[Social Link Click]', platform);
    });
  });
}


/* ─────────────────────────────────────────────
   8. CONSOLE EASTER EGG
   ───────────────────────────────────────────── */

/**
 * Displays a fun message for developers
 */
function showConsoleMessage() {
  const styles = [
    'color: #fff',
    'background: linear-gradient(135deg, #7B2FBE, #F97316, #EC4899)',
    'font-size: 16px',
    'padding: 12px 20px',
    'border-radius: 6px',
    'font-weight: bold'
  ].join(';');

  console.log(
    '%c🚀 TechEchos Innovation — Coming Soon!',
    styles,
    '\n\n✨ Excited about our launch? Join the waitlist above!\n\n' +
    '💡 Keyboard shortcuts:\n' +
    '   • Ctrl/Cmd + K: Focus email input\n' +
    '   • Esc: Unfocus input\n\n' +
    '🎨 Built with: HTML5, CSS3, Vanilla JS\n' +
    '📧 Questions? Email us at hello@techechos.com'
  );
}


/* ─────────────────────────────────────────────
   9. AOS (ANIMATE ON SCROLL) SIMULATION
   ───────────────────────────────────────────── */

/**
 * Simple scroll animation observer
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}


/* ─────────────────────────────────────────────
   10. INITIALIZATION
   ───────────────────────────────────────────── */

/**
 * Initialize all coming soon page features
 */
function initComingSoonPage() {
 
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

 
  new CountdownTimer(launchDate, {
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds'
  });

  new ParticleCanvas('particle-canvas');
  new NewsletterForm('waitlist-form');

  animateLaunchProgress();
  initSocialTooltips();
  initKeyboardShortcuts();
  initScrollAnimations();
  initAnalytics();
  showConsoleMessage();
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComingSoonPage);
} else {
  initComingSoonPage();
}


/* ─────────────────────────────────────────────
   11. EXPORT (if needed by other scripts)
   ───────────────────────────────────────────── */

window.ComingSoon = {
  CountdownTimer,
  ParticleCanvas,
  NewsletterForm
};
