/**
 * ============================================================
 * TechEchos Innovation — dashboard.js
 * Admin Dashboard JavaScript
 * Handles sidebar, notifications, stats counters, and
 * interactive elements
 * ============================================================
 */

'use strict';

/* ─────────────────────────────────────────────
   1. SIDEBAR FUNCTIONALITY
   ───────────────────────────────────────────── */

/**
 * Initialize sidebar toggle and mobile menu
 */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');

 
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      
     
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('collapsed')) {
          icon.setAttribute('data-lucide', 'panel-left-open');
        } else {
          icon.setAttribute('data-lucide', 'panel-left-close');
        }
        lucide.createIcons();
      }
    });
  }

 
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
    });

   
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          if (sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
            document.body.style.overflow = '';
          }
        }
      }
    });
  }

 
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 1024 && sidebar) {
        sidebar.classList.remove('mobile-open');
        document.body.style.overflow = '';
      }
    });
  });
}


/* ─────────────────────────────────────────────
   2. NOTIFICATION PANEL (Functional)
   ───────────────────────────────────────────── */

/**
 * Initialize notification panel functionality
 */
function initNotifications() {
  const notificationBtn = document.getElementById('notification-btn');
  const notificationPanel = document.getElementById('notification-panel');
  const closeNotificationBtn = document.getElementById('close-notification');

 
  if (notificationBtn && notificationPanel) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationPanel.classList.toggle('open');
    });
  }

 
  if (closeNotificationBtn && notificationPanel) {
    closeNotificationBtn.addEventListener('click', () => {
      notificationPanel.classList.remove('open');
    });
  }

 
  document.addEventListener('click', (e) => {
    if (notificationPanel && 
        notificationPanel.classList.contains('open') &&
        !notificationPanel.contains(e.target) &&
        !notificationBtn.contains(e.target)) {
      notificationPanel.classList.remove('open');
    }
  });

 
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
     
      tabBtns.forEach(b => b.classList.remove('active'));
     
      btn.classList.add('active');
      
     
      const tab = btn.getAttribute('data-tab');
      filterNotifications(tab);
    });
  });

 
  const notificationActions = document.querySelectorAll('.notification-action');
  notificationActions.forEach(action => {
    action.addEventListener('click', (e) => {
      e.stopPropagation();
      const notificationItem = action.closest('.notification-item');
      if (notificationItem) {
        notificationItem.classList.remove('unread');
        updateNotificationCount();
      }
    });
  });

 
  const markAllBtn = document.querySelector('.notification-footer .btn-text');
  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      const unreadItems = document.querySelectorAll('.notification-item.unread');
      unreadItems.forEach(item => item.classList.remove('unread'));
      updateNotificationCount();
    });
  }
}

/**
 * Filter notifications based on tab
 */
function filterNotifications(tab) {
  const items = document.querySelectorAll('.notification-item');
  
  items.forEach(item => {
    if (tab === 'all') {
      item.style.display = 'flex';
    } else if (tab === 'unread') {
      item.style.display = item.classList.contains('unread') ? 'flex' : 'none';
    }
  });
}

/**
 * Update notification count badge
 */
function updateNotificationCount() {
  const unreadCount = document.querySelectorAll('.notification-item.unread').length;
  const notificationDot = document.querySelector('.notification-dot');
  
  if (notificationDot) {
    if (unreadCount > 0) {
      notificationDot.textContent = unreadCount;
      notificationDot.style.display = 'flex';
    } else {
      notificationDot.style.display = 'none';
    }
  }

 
  const allTab = document.querySelector('[data-tab="all"] .tab-count');
  const unreadTab = document.querySelector('[data-tab="unread"] .tab-count');
  
  if (allTab) {
    allTab.textContent = document.querySelectorAll('.notification-item').length;
  }
  if (unreadTab) {
    unreadTab.textContent = unreadCount;
  }
}


/* ─────────────────────────────────────────────
   3. STATS COUNTER ANIMATION
   ───────────────────────────────────────────── */

/**
 * Animate stat values on page load
 */
function initStatsCounters() {
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(stat => observer.observe(stat));
}

/**
 * Animate a single counter
 */
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'), 10);
  const prefix = element.getAttribute('data-prefix') || '';
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000;
  const start = performance.now();

  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    
    element.textContent = `${prefix}${current}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}


/* ─────────────────────────────────────────────
   4. SEARCH FUNCTIONALITY
   ───────────────────────────────────────────── */

/**
 * Initialize search box
 */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  
  if (!searchInput) return;

 
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

 
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length > 2) {
      console.log('[Search]', query);
     
    }
  });
}


/* ─────────────────────────────────────────────
   5. TOOLTIPS
   ───────────────────────────────────────────── */

/**
 * Initialize tooltips for icon buttons
 */
function initTooltips() {
  const elements = document.querySelectorAll('[data-tooltip]');
  
  elements.forEach(el => {
    const tooltip = document.createElement('span');
    tooltip.className = 'dashboard-tooltip';
    tooltip.textContent = el.getAttribute('data-tooltip');
    
    Object.assign(tooltip.style, {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--color-surface-2)',
      color: 'var(--color-text)',
      fontSize: '0.75rem',
      padding: '6px 12px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.2s ease',
      zIndex: '2000',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)'
    });

    el.style.position = 'relative';
    el.appendChild(tooltip);

    el.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
    el.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
  });
}


/* ─────────────────────────────────────────────
   6. CHART PLACEHOLDER (Simple Bar Animation)
   ───────────────────────────────────────────── */

/**
 * Create a simple animated chart visualization
 */
function initChartPlaceholder() {
  const canvas = document.getElementById('revenue-chart');
  
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

 
  const data = [45, 52, 48, 65, 72, 68];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const barWidth = canvas.width / (data.length * 2);
  const maxValue = Math.max(...data);

 
  data.forEach((value, index) => {
    const barHeight = (value / maxValue) * (canvas.height - 40);
    const x = (index * 2 + 0.5) * barWidth;
    const y = canvas.height - barHeight - 20;

   
    const gradient = ctx.createLinearGradient(x, y, x, canvas.height - 20);
    gradient.addColorStop(0, '#7B2FBE');
    gradient.addColorStop(0.5, '#F97316');
    gradient.addColorStop(1, '#EC4899');

    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);

   
    ctx.fillStyle = '#6B7280';
    ctx.font = '11px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(labels[index], x + barWidth / 2, canvas.height - 5);
  });
}


/* ─────────────────────────────────────────────
   7. PROGRESS BARS ANIMATION
   ───────────────────────────────────────────── */

/**
 * Animate project progress bars
 */
function initProgressBars() {
  const progressBars = document.querySelectorAll('.project-progress .progress-fill');

  progressBars.forEach(bar => {
   
    bar.style.transition = 'none';
  });
}


/* ─────────────────────────────────────────────
   8. QUICK ACTIONS ANALYTICS
   ───────────────────────────────────────────── */

/**
 * Track quick action clicks
 */
function initQuickActions() {
  const actionCards = document.querySelectorAll('.action-card');
  
  actionCards.forEach(card => {
    card.addEventListener('click', () => {
      const action = card.querySelector('span')?.textContent || 'Unknown Action';
      console.log('[Quick Action Clicked]', action);
      
     
      if (window.TechEchos && typeof window.TechEchos.showToast === 'function') {
        window.TechEchos.showToast(`Action: ${action}`, 'info', 2000);
      }
    });
  });
}


/* ─────────────────────────────────────────────
   9. REAL-TIME CLOCK (Optional)
   ───────────────────────────────────────────── */

/**
 * Display current time in the dashboard (optional feature)
 */
function initClock() {
 
  const updateClock = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
   
    const clockEl = document.getElementById('dashboard-clock');
    if (clockEl) {
      clockEl.textContent = timeString;
    }
  };

  updateClock();
  setInterval(updateClock, 60000);
}


/* ─────────────────────────────────────────────
   10. KEYBOARD SHORTCUTS
   ───────────────────────────────────────────── */

/**
 * Global keyboard shortcuts
 */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
   
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.toggle('collapsed');
      }
    }

   
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      const notificationPanel = document.getElementById('notification-panel');
      if (notificationPanel) {
        notificationPanel.classList.toggle('open');
      }
    }

   
    if (e.key === 'Escape') {
      const notificationPanel = document.getElementById('notification-panel');
      if (notificationPanel && notificationPanel.classList.contains('open')) {
        notificationPanel.classList.remove('open');
      }
    }
  });
}


/* ─────────────────────────────────────────────
   11. CONSOLE MESSAGE
   ───────────────────────────────────────────── */

/**
 * Display console message for developers
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
    '%c📊 TechEchos Admin Dashboard',
    styles,
    '\n\n✨ Welcome to the admin panel!\n\n' +
    '⌨️  Keyboard shortcuts:\n' +
    '   • Ctrl/Cmd + K: Focus search\n' +
    '   • Ctrl/Cmd + B: Toggle sidebar\n' +
    '   • Ctrl/Cmd + N: Open notifications\n' +
    '   • Esc: Close panels\n\n' +
    '🎨 Built with: HTML5, CSS3, Vanilla JavaScript\n' +
    '📧 Need help? Contact support@techechos.com'
  );
}


/* ─────────────────────────────────────────────
   12. PAGE ANALYTICS
   ───────────────────────────────────────────── */

/**
 * Track dashboard usage
 */
function initAnalytics() {
  console.log('[Dashboard Load]', {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`
  });

 
  let startTime = Date.now();

  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    console.log('[Dashboard Session]', `${timeSpent} seconds`);
  });
}


/* ─────────────────────────────────────────────
   13. SCROLL TO TOP
   ───────────────────────────────────────────── */

/**
 * Add scroll to top functionality
 */
function initScrollToTop() {
  const dashboardContent = document.querySelector('.dashboard-content');
  
  if (!dashboardContent) return;

  let scrollBtn = document.getElementById('scroll-to-top');
  
  if (!scrollBtn) {
    scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    Object.assign(scrollBtn.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--gradient-accent)',
      border: 'none',
      color: '#fff',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: '1000',
      boxShadow: 'var(--shadow-glow-grad)',
      transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(scrollBtn);
    lucide.createIcons();
  }

  dashboardContent.addEventListener('scroll', () => {
    if (dashboardContent.scrollTop > 300) {
      scrollBtn.style.display = 'flex';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  scrollBtn.addEventListener('click', () => {
    dashboardContent.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* ─────────────────────────────────────────────
   14. INITIALIZATION
   ───────────────────────────────────────────── */

/**
 * Initialize all dashboard features
 */
function initDashboard() {
  initSidebar();
  initNotifications();
  initStatsCounters();
  initSearch();
  initTooltips();
  initChartPlaceholder();
  initProgressBars();
  initQuickActions();
  initClock();
  initKeyboardShortcuts();
  initScrollToTop();
  showConsoleMessage();
  initAnalytics();

 
  updateNotificationCount();
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}


/* ─────────────────────────────────────────────
   15. EXPORT (if needed by other scripts)
   ───────────────────────────────────────────── */

window.Dashboard = {
  initSidebar,
  initNotifications,
  updateNotificationCount,
  filterNotifications
};
