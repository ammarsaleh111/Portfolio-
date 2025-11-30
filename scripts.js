/**
 * Enhanced Portfolio JavaScript
 * Modern, accessible, performant interactions
 */

// ==============================================
// Configuration
// ==============================================
const CONFIG = {
  emailJS: {
    serviceID: 'service_xic50xi',
    templateID: 'template_ukkt317',
    publicKey: 'kH2tZ4WjM4Czctrey'
  },
  cvDownload: {
    filename: 'Ammar-Ahmed-Saleh-CV.pdf',
    fallbackURL: 'https://drive.google.com/drive/folders/1WRGeaLOgq8MEk9MLAMRaNN8H7WGMIE8x?usp=sharing'
  },
  animations: {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
};

// ==============================================
// Utility Functions
// ==============================================
const utils = {
  /**
   * Debounce function calls
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Animate number counting
   */
  animateCount(element, target, duration = 1200) {
    const start = 0;
    const startTime = performance.now();
    const formatter = new Intl.NumberFormat();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeProgress);
      
      element.textContent = formatter.format(current);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = formatter.format(target);
      }
    }
    
    requestAnimationFrame(update);
  }
};

// ==============================================
// Theme Management
// ==============================================
const themeManager = {
  init() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Get saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);

    // Listen for toggle clicks
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  }
};

// ==============================================
// Mobile Navigation
// ==============================================
const mobileNav = {
  init() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('navMenu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      this.setMenuState(!isOpen);
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        this.setMenuState(false);
        toggle.focus();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        this.setMenuState(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        this.setMenuState(false);
      }
    });
  },

  setMenuState(isOpen) {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('navMenu');
    
    toggle.setAttribute('aria-expanded', isOpen);
    menu.classList.toggle('open', isOpen);

    // Manage focus trap when menu is open
    if (isOpen) {
      const focusableElements = menu.querySelectorAll('a, button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus first element
      setTimeout(() => firstElement?.focus(), 100);

      // Trap focus within menu
      this.trapFocus(firstElement, lastElement);
    }
  },

  trapFocus(firstElement, lastElement) {
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    
    // Remove listener when menu closes
    const observer = new MutationObserver(() => {
      const menu = document.getElementById('navMenu');
      if (!menu?.classList.contains('open')) {
        document.removeEventListener('keydown', handleTabKey);
        observer.disconnect();
      }
    });

    observer.observe(document.getElementById('navMenu'), {
      attributes: true,
      attributeFilter: ['class']
    });
  }
};

// ==============================================
// Smooth Scrolling
// ==============================================
const smoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - navHeight - 16;

        window.scrollTo({
          top: href === '#home' ? 0 : offsetPosition,
          behavior: 'smooth'
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.removeAttribute('tabindex');
      });
    });
  }
};

// ==============================================
// Active Navigation Links
// ==============================================
const activeNav = {
  init() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActive(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  },

  setActive(id) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }
};

// ==============================================
// Scrolled Navigation State
// ==============================================
const navScroll = {
  init() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const handleScroll = utils.debounce(() => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }
};

// ==============================================
// Particles Background
// ==============================================
const particles = {
  init() {
    // Only initialize if particles.js library is loaded
    if (typeof particlesJS === 'undefined') return;

    const container = document.getElementById('particles-js');
    if (!container) return;

    // Reduce particle count on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;

    particlesJS('particles-js', {
      particles: {
        number: {
          value: particleCount,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#14b8a6'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.4,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#14b8a6',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: !isMobile,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
};

// ==============================================
// GSAP Animations
// ==============================================
const animations = {
  init() {
    if (CONFIG.animations.reducedMotion) {
      this.showAllElements();
      return;
    }

    if (typeof gsap === 'undefined') {
      this.showAllElements();
      return;
    }

    this.initScrollAnimations();
    this.initHeroAnimations();
  },

  showAllElements() {
    // Ensure content is visible if animations are disabled
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  },

  initScrollAnimations() {
    if (typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate cards
    gsap.utils.toArray('.card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // Animate CV panel
    const cvPanel = document.querySelector('.cv-panel');
    if (cvPanel) {
      gsap.from(cvPanel, {
        scrollTrigger: {
          trigger: cvPanel,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  },

  initHeroAnimations() {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .from('.headline', {
        opacity: 0,
        y: 40,
        duration: 0.8
      })
      .from('.subhead', {
        opacity: 0,
        y: 30,
        duration: 0.7
      }, '-=0.5')
      .from('.lead', {
        opacity: 0,
        y: 20,
        duration: 0.7
      }, '-=0.5')
      .from('.hero-ctas .btn', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15
      }, '-=0.4')
      .from('.media-frame', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8
      }, '-=0.8');
  }
};

// ==============================================
// Count Up Animation
// ==============================================
const countUp = {
  init() {
    const countElements = document.querySelectorAll('.count[data-target]');
    if (!countElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-target'), 10);
          const duration = parseInt(element.getAttribute('data-duration'), 10) || 1500;
          
          utils.animateCount(element, target, duration);
          obs.unobserve(element);
        }
      });
    }, {
      threshold: 0.5
    });

    countElements.forEach(el => observer.observe(el));
  }
};

// ==============================================
// Project Filtering
// ==============================================
const projectFilter = {
  currentFilter: 'all',
  baseLimit: 3,
  lastCounts: { totalMatches: 0, visibleCount: 0 },
  
  init() {
    const filters = document.querySelectorAll('.filter');
    const projectGrid = document.getElementById('projectGrid');
    
    if (!filters.length || !projectGrid) return;

    filters.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filters.forEach(btn => {
          const isActive = btn === button;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-pressed', isActive);
        });

        this.currentFilter = filter;
        this.resetShowMore();
        this.filterProjects(filter, { suppressAnimation: true });
      });
    });

    this.filterProjects(this.currentFilter, { suppressAnimation: true });
  },

  filterProjects(filter, options = {}) {
    const cards = document.querySelectorAll('.project-card');
    const limit = (options && typeof options.limit === 'number') ? options.limit : this.baseLimit;
    const suppressAnimation = (options && Object.prototype.hasOwnProperty.call(options, 'suppressAnimation'))
      ? options.suppressAnimation
      : false;
    let matchIndex = 0;
    
    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const matchesFilter = filter === 'all' || category === filter;

      if (matchesFilter) {
        if (matchIndex < limit) {
          this.showCard(card, suppressAnimation);
        } else {
          this.hideCard(card, suppressAnimation);
        }
        matchIndex++;
      } else {
        this.hideCard(card, suppressAnimation);
      }
    });

    const totalMatches = matchIndex;
    const visibleNow = Math.min(totalMatches, limit);
    this.lastCounts = { totalMatches, visibleCount: visibleNow };
    this.toggleShowMoreButton(totalMatches, visibleNow);
    return this.lastCounts;
  },
  
  resetShowMore() {
    if (typeof showMoreProjects !== 'undefined' && typeof showMoreProjects.resetSteps === 'function') {
      showMoreProjects.resetSteps();
      return;
    }

    const showMoreBtn = document.getElementById('showMoreBtn');
    if (showMoreBtn) {
      showMoreBtn.classList.remove('expanded');
    }
  },

  showCard(card, suppressAnimation = false) {
    this.clearCollapseTimer(card);
    card.classList.remove('hidden-project', 'collapsing');
    card.style.display = '';
    card.setAttribute('aria-hidden', 'false');

    if (!suppressAnimation) {
      card.classList.add('expanding');
      card.addEventListener('animationend', () => {
        card.classList.remove('expanding');
      }, { once: true });
    } else {
      card.classList.remove('expanding');
    }
  },

  hideCard(card, suppressAnimation = false) {
    const finalize = () => {
      card.style.display = 'none';
      card.classList.add('hidden-project');
      card.classList.remove('collapsing', 'expanding');
      card.setAttribute('aria-hidden', 'true');
      this.clearCollapseTimer(card);
    };

    if (suppressAnimation || card.style.display === 'none') {
      finalize();
      return;
    }

    this.clearCollapseTimer(card);
    card.classList.add('collapsing');
    const timeoutId = window.setTimeout(finalize, 250);
    card.dataset.collapseTimeout = timeoutId;
  },

  clearCollapseTimer(card) {
    const timeoutId = card.dataset.collapseTimeout;
    if (timeoutId) {
      clearTimeout(Number(timeoutId));
      delete card.dataset.collapseTimeout;
    }
  },

  toggleShowMoreButton(totalMatches, visibleCount) {
    if (typeof showMoreProjects !== 'undefined' && typeof showMoreProjects.handleCountsUpdate === 'function') {
      showMoreProjects.handleCountsUpdate(totalMatches, visibleCount);
      return;
    }

    const showMoreBtn = document.getElementById('showMoreBtn');
    if (!showMoreBtn) return;
    showMoreBtn.style.display = totalMatches > visibleCount ? 'inline-flex' : 'none';
  }
};

// ==============================================
// Show More Projects
// ==============================================
const showMoreProjects = {
  baseLimit: 3,
  chunkSize: 3,
  currentStep: 0,
  totalMatches: 0,
  visibleCount: 0,
  button: null,
  showMoreText: null,
  showLessText: null,

  cacheElements() {
    if (!this.button) {
      this.button = document.getElementById('showMoreBtn');
    }
    if (this.button && !this.showMoreText) {
      this.showMoreText = this.button.querySelector('.show-more-text');
    }
    if (this.button && !this.showLessText) {
      this.showLessText = this.button.querySelector('.show-less-text');
    }
  },

  init() {
    this.cacheElements();
    if (!this.button) return;

    this.button.addEventListener('click', () => this.handleClick());
    this.handleCountsUpdate(projectFilter.lastCounts.totalMatches, projectFilter.lastCounts.visibleCount);
    this.updateLabel();
  },

  handleCountsUpdate(total, visible) {
    this.cacheElements();
    this.totalMatches = total || 0;
    this.visibleCount = visible || 0;

    if (!this.button) return;

    if (this.totalMatches <= this.baseLimit) {
      this.button.style.display = 'none';
      this.currentStep = 0;
      this.button.classList.remove('expanded');
      return;
    }

    this.button.style.display = 'inline-flex';
    this.button.classList.toggle('expanded', this.currentStep === 2);
    this.updateLabel();
  },

  resetSteps() {
    this.cacheElements();
    if (!this.button) return;
    this.currentStep = 0;
    this.button.classList.remove('expanded');
    this.updateLabel();
  },

  handleClick() {
    this.cacheElements();
    if (!this.button || this.totalMatches <= this.baseLimit) return;

    if (this.currentStep === 0) {
      const target = Math.min(this.baseLimit + this.chunkSize, this.totalMatches);
      projectFilter.filterProjects(projectFilter.currentFilter, { limit: target });
      this.currentStep = (this.totalMatches > target) ? 1 : 2;
    } else if (this.currentStep === 1) {
      projectFilter.filterProjects(projectFilter.currentFilter, { limit: this.totalMatches });
      this.currentStep = 2;
    } else {
      projectFilter.filterProjects(projectFilter.currentFilter, { limit: this.baseLimit });
      this.currentStep = 0;
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    this.button.classList.toggle('expanded', this.currentStep === 2);
    this.updateLabel();
  },

  updateLabel() {
    this.cacheElements();
    if (!this.button || !this.showMoreText || !this.showLessText) return;

    if (this.currentStep === 0) {
      const remaining = Math.max(this.totalMatches - this.baseLimit, 0);
      const chunk = Math.min(this.chunkSize, remaining);
      this.showMoreText.textContent = chunk > 0
        ? `Show ${chunk} more project${chunk === 1 ? '' : 's'}`
        : 'Show more projects';
      this.showLessText.textContent = 'Show less';
    } else if (this.currentStep === 1) {
      this.showMoreText.textContent = 'Show all projects';
      this.showLessText.textContent = 'Show less';
    } else {
      this.showLessText.textContent = 'Show less';
    }
  }
};

// ==============================================
// CV Download
// ==============================================
const cvDownload = {
  init() {
    const downloadBtn = document.getElementById('downloadBtn');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', (e) => {
      // Check if PDF file exists, otherwise use fallback
      const href = downloadBtn.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        this.handleFallback();
      }
    });
  },

  handleFallback() {
    // If PDF doesn't exist, open Google Drive folder
    window.open(CONFIG.cvDownload.fallbackURL, '_blank', 'noopener,noreferrer');
  }
};

// ==============================================
// Contact Form
// ==============================================
const contactForm = {
  init() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init(CONFIG.emailJS.publicKey);
    }

    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (!this.validate()) return;
      
      this.submit();
    });

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('blur', () => {
        this.validateField(field);
      });

      field.addEventListener('input', () => {
        this.clearError(field);
      });
    });
  },

  validate() {
    const form = document.getElementById('contactForm');
    const fields = form.querySelectorAll('[required]');
    let isValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  },

  validateField(field) {
    const value = field.value.trim();
    const errorEl = document.getElementById(`${field.id}-error`);
    let errorMessage = '';

    if (!value) {
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && !this.isValidEmail(value)) {
      errorMessage = 'Please enter a valid email address';
    }

    if (errorMessage) {
      field.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = errorMessage;
      return false;
    }

    field.setAttribute('aria-invalid', 'false');
    if (errorEl) errorEl.textContent = '';
    return true;
  },

  clearError(field) {
    field.setAttribute('aria-invalid', 'false');
    const errorEl = document.getElementById(`${field.id}-error`);
    if (errorEl) errorEl.textContent = '';
  },

  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  async submit() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const status = document.getElementById('formStatus');

    const formData = {
      from_name: form.from_name.value,
      reply_to: form.reply_to.value,
      message: form.message.value
    };

    // Update button state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // Check if EmailJS is configured
      if (typeof emailjs !== 'undefined') {
        await emailjs.send(
          CONFIG.emailJS.serviceID,
          CONFIG.emailJS.templateID,
          formData
        );

        this.showStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
        form.reset();
      } else {
        // EmailJS not loaded
        throw new Error('EmailJS library not loaded');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showStatus('error', 'Failed to send message. Please try again or contact me directly.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  },

  showStatus(type, message) {
    const status = document.getElementById('formStatus');
    status.className = `form-status ${type}`;
    status.textContent = message;
    
    // Announce to screen readers
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
  }
};

// ==============================================
// Footer Year
// ==============================================
const footerYear = {
  init() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
};

// ==============================================
// Keyboard Navigation Enhancement
// ==============================================
const keyboardNav = {
  init() {
    // Add visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }
};

// ==============================================
// Lazy Load Images
// ==============================================
const lazyImages = {
  init() {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      return;
    }

    // Fallback for browsers without native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.srcset = img.dataset.srcset || img.srcset;
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
};

// ==============================================
// Performance Monitoring (renamed to avoid shadowing window.performance)
// ==============================================
const perfMonitor = {
  init() {
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Observer not supported
      }
    }
  }
};
// ==================== TYPING CODE ANIMATION ====================
const typingCodeAnimation = {
  codeLines: [
    'const innovation = true;',
    'function buildFuture() {',
    '  return creative.code();',
    '}',
    'class Developer {',
    '  constructor() {',
    '    this.passion = Infinity;',
    '    this.creativity = "limitless";',
    '  }',
    '  createMagic() {',
    '    return this.passion * Math.pow(10, 3);',
    '  }',
    '}',  ],
  
  lineIndex: 0,
  charIndex: 0,
  typingSpeed: 10,
  lineDelay: 500,
  
  init() {
    const codeElement = document.querySelector('.typing-code');
    if (!codeElement) return;
    
    this.typeCode();
  },
  
  typeCode() {
    const codeElement = document.querySelector('.typing-code');
    if (!codeElement) return;
    
    if (this.lineIndex < this.codeLines.length) {
      if (this.charIndex < this.codeLines[this.lineIndex].length) {
        codeElement.textContent += this.codeLines[this.lineIndex][this.charIndex];
        this.charIndex++;
        setTimeout(() => this.typeCode(), this.typingSpeed);
      } else {
        codeElement.textContent += '\n';
        this.lineIndex++;
        this.charIndex = 0;
        setTimeout(() => this.typeCode(), this.lineDelay);
      }
    } else {
      setTimeout(() => {
        codeElement.textContent = '';
        this.lineIndex = 0;
        this.charIndex = 0;
        this.typeCode();
      }, 3000);
    }
  }
};

// ==================== 3D PARALLAX EFFECTS ====================
const parallax3D = {
  init() {
    if (CONFIG.animations.reducedMotion) return;
    
    const heroVisual = document.querySelector('.hero-visual');
    const profileContainer = document.querySelector('.profile-image-container');
    
    if (heroVisual) {
      this.addParallax(heroVisual);
    }
    
    if (profileContainer) {
      this.addParallax(profileContainer);
    }
  },
  
  addParallax(element) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      const child = element.querySelector('.code-window, .profile-frame');
      if (child) {
        child.style.transform = `
          translateZ(50px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;
      }
    });
    
    element.addEventListener('mouseleave', () => {
      const child = element.querySelector('.code-window, .profile-frame');
      if (child) {
        child.style.transform = 'translateZ(50px) rotateX(0deg) rotateY(0deg)';
      }
    });
  }
};

// ==================== ENHANCED NAV SCROLL EFFECT ====================
const enhancedNav = {
  init() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', utils.debounce(() => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, 10));
  }
};

// ==============================================
// Initialize Everything
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  themeManager.init();
  mobileNav.init();
  smoothScroll.init();
  activeNav.init();
  navScroll.init();
  keyboardNav.init();
  footerYear.init();
  // ADD THESE NEW LINES:
  typingCodeAnimation.init();
  parallax3D.init();
  enhancedNav.init();
  // Content enhancements
  particles.init();
  animations.init();
  countUp.init();
  if (typeof projectsRenderer !== 'undefined') {
    projectsRenderer.render();
  }
  projectFilter.init();
  showMoreProjects.init();
  cvDownload.init();
  contactForm.init();
  lazyImages.init();

  // Back to top floating button
  backToTop.init();

  // Performance monitoring (development only)
  if (window.location.hostname === 'localhost') {
    performance.init();
  }
});

// ==============================================
// Service Worker Registration (Optional)
// ==============================================
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}

// ==============================================
// Back To Top Button
// ==============================================
const backToTop = {
  init() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    };

    window.addEventListener('scroll', utils.debounce(toggleVisibility, 10), { passive: true });
    toggleVisibility();

    btn.addEventListener('click', () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });

    // Keyboard activation support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  }
};
