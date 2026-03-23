/**
 * ============================================================
 * TechEchos Innovation — 404.js
 * 404 Error Page JavaScript
 * Handles search functionality and interactive elements
 * ============================================================
 */

'use strict';

/* ─────────────────────────────────────────────
   1. PAGE SEARCH FUNCTIONALITY
   ───────────────────────────────────────────── */

/**
 * Initializes the search box on the 404 page.
 * Provides basic search suggestions and redirects.
 */
function init404Search() {
  const searchInput = document.getElementById('page-search');
  const searchBtn = document.querySelector('.search-btn');
  
  if (!searchInput || !searchBtn) return;

  /**
   * Common page mappings for search redirects
   */
  const pageMap = {
    'home': '../home-1/home.html',
    'about': '../about/about.html',
    'services': '../services/services.html',
    'service': '../services/services.html',
    'portfolio': '../careers/careers.html',
    'careers': '../careers/careers.html',
    'projects': '../careers/careers.html',
    'blog': '../blogs/blogs.html',
    'blogs': '../blogs/blogs.html',
    'articles': '../blogs/blogs.html',
    'news': '../blogs/blogs.html',
    'contact': '../contact/contact.html',
    'support': '../contact/contact.html',
    'help': '../contact/contact.html',
    'login': '../login/login.html',
    'register': '../login/register.html',
    'signup': '../login/register.html',
    'dashboard': '../admin-dashboard/dashboard.html',
    'admin': '../admin-dashboard/dashboard.html',
  };

  /**
   * Handles the search action
   */
  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
      showSearchToast('Please enter a search term', 'warning');
      return;
    }

   
    let foundPage = null;
    
   
    if (pageMap[query]) {
      foundPage = pageMap[query];
    } else {
     
      for (const [key, value] of Object.entries(pageMap)) {
        if (query.includes(key) || key.includes(query)) {
          foundPage = value;
          break;
        }
      }
    }

    if (foundPage) {
      showSearchToast('Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = foundPage;
      }, 800);
    } else {
      showSearchToast('No matching page found. Try "services", "about", or "contact".', 'info');
     
      setTimeout(() => {
        if (confirm('Would you like to go to the home page instead?')) {
          window.location.href = '../home-1/home.html';
        }
      }, 2000);
    }
  }

  /**
   * Shows a toast notification for search feedback
   */
  function showSearchToast(message, type = 'info') {
   
    if (window.TechEchos && typeof window.TechEchos.showToast === 'function') {
      window.TechEchos.showToast(message, type, 3000);
    } else {
     
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  }

 
  searchBtn.addEventListener('click', handleSearch);
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  });

 
  searchInput.addEventListener('input', debounceSearch((e) => {
    const value = e.target.value.toLowerCase().trim();
    
    if (value.length > 2) {
     
      const suggestions = Object.keys(pageMap).filter(key => 
        key.includes(value) || value.includes(key)
      );
      
      if (suggestions.length > 0) {
       
        const firstSuggestion = suggestions[0];
        searchInput.setAttribute('data-suggestion', firstSuggestion);
      }
    }
  }, 300));
}

/**
 * Debounce helper for search input
 */
function debounceSearch(func, delay) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}


/* ─────────────────────────────────────────────
   2. ANIMATED STATS / FLOATING BADGES
   ───────────────────────────────────────────── */

/**
 * Adds subtle animation variations to floating badges
 */
function animateFloatingBadges() {
  const badges = document.querySelectorAll('.floating-badge');
  
  badges.forEach((badge, index) => {
   
    const randomDelay = Math.random() * 2;
    const randomDuration = 3 + Math.random() * 2;
    
    badge.style.animationDelay = `${randomDelay}s`;
    badge.style.animationDuration = `${randomDuration}s`;
  });
}


/* ─────────────────────────────────────────────
   3. ERROR NUMBER GLOW EFFECT
   ───────────────────────────────────────────── */

/**
 * Adds interactive glow effect to 404 number on hover
 */
function initErrorNumberInteraction() {
  const errorNumber = document.querySelector('.error-number');
  
  if (!errorNumber) return;

  errorNumber.addEventListener('mouseenter', () => {
    errorNumber.style.filter = 'drop-shadow(0 0 40px rgba(123, 47, 190, 0.6))';
  });

  errorNumber.addEventListener('mouseleave', () => {
    errorNumber.style.filter = 'none';
  });
}


/* ─────────────────────────────────────────────
   4. LINK CARD ANALYTICS (Optional)
   ───────────────────────────────────────────── */

/**
 * Tracks which helpful links users click
 * Can be integrated with analytics services
 */
function trackLinkClicks() {
  const linkCards = document.querySelectorAll('.link-card');
  
  linkCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const linkTitle = card.querySelector('h4')?.textContent || 'Unknown';
      
     
      console.log(`[404 Navigation] User clicked: ${linkTitle}`);
      
     
     
     
     
     
     
     
    });
  });
}


/* ─────────────────────────────────────────────
   5. KEYBOARD SHORTCUTS
   ───────────────────────────────────────────── */

/**
 * Adds keyboard shortcuts for quick navigation
 */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
   
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('page-search');
      if (searchInput) {
        searchInput.focus();
      }
    }
    
   
    if (e.key === 'Escape') {
      const searchInput = document.getElementById('page-search');
      if (searchInput && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
      }
    }
    
   
    if (e.key === 'h' && !isInputFocused()) {
      window.location.href = '../home-1/home.html';
    }
    
   
    if (e.key === 'c' && !isInputFocused()) {
      window.location.href = '../contact/contact.html';
    }
  });
}

/**
 * Check if any input element is currently focused
 */
function isInputFocused() {
  const activeElement = document.activeElement;
  return activeElement && (
    activeElement.tagName === 'INPUT' ||
    activeElement.tagName === 'TEXTAREA' ||
    activeElement.isContentEditable
  );
}


/* ─────────────────────────────────────────────
   6. CONSOLE EASTER EGG
   ───────────────────────────────────────────── */

/**
 * Adds a fun console message for developers
 */
function showConsoleMessage() {
  const styles = [
    'color: #7B2FBE',
    'background: linear-gradient(135deg, #7B2FBE, #F97316, #EC4899)',
    'font-size: 14px',
    'padding: 8px 12px',
    'border-radius: 4px',
    'font-weight: bold'
  ].join(';');

  console.log(
    '%c🚀 TechEchos Innovation',
    styles,
    '\n\nLooks like you found a 404! But hey, you\'re a developer—you know how to find your way back.\n\nKeyboard shortcuts:\n• Ctrl/Cmd + K: Focus search\n• H: Go home\n• C: Contact us\n\nWant to join our team? Check out /careers'
  );
}


/* ─────────────────────────────────────────────
   7. PAGE LOAD TRACKING
   ───────────────────────────────────────────── */

/**
 * Logs 404 page loads for analytics
 */
function track404PageLoad() {
 
  const referrer = document.referrer || 'Direct access';
  const attemptedPath = window.location.pathname;
  
  console.log('[404 Page Load]', {
    attempted: attemptedPath,
    referrer: referrer,
    timestamp: new Date().toISOString()
  });

 
 
 
 
 
 
 
 
 
}


/* ─────────────────────────────────────────────
   8. INITIALIZATION
   ───────────────────────────────────────────── */

/**
 * Initialize all 404 page functionality
 */
function init404Page() {
  init404Search();
  animateFloatingBadges();
  initErrorNumberInteraction();
  trackLinkClicks();
  initKeyboardShortcuts();
  showConsoleMessage();
  track404PageLoad();
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init404Page);
} else {
  init404Page();
}


/* ─────────────────────────────────────────────
   9. EXPORT UTILITIES (if needed by other scripts)
   ───────────────────────────────────────────── */

window.Error404 = {
  init404Search,
  animateFloatingBadges,
  trackLinkClicks
};
