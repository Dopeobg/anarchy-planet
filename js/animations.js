// Animation Effects with Intersection Observer

class AnimationController {
    constructor() {
        this.observedElements = new Map();
        this.countersAnimated = new Set();
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollEffects();
        this.initCounters();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0, 0.1],
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                    
                    // Check if element is a counter
                    const counters = entry.target.querySelectorAll('[data-target]');
                    if (counters.length > 0) {
                        this.animateCounters(entry.target);
                    }
                } else {
                    // Optional: Reset animation on scroll out
                    this.resetAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation classes
        document.querySelectorAll('.feature-card, .pricing-card, .stats__item, .cta__content, .section-title').forEach(el => {
            observer.observe(el);
            this.observedElements.set(el, observer);
        });
    }
    
    triggerAnimation(element) {
        // Add animation class to element
        element.classList.add('in-view');
        
        // Specific animations for different element types
        if (element.classList.contains('feature-card')) {
            element.style.animation = 'fadeSlideUp 0.8s ease-out forwards';
        } else if (element.classList.contains('pricing-card')) {
            element.style.animation = 'fadeSlideUp 0.8s ease-out forwards';
        } else if (element.classList.contains('stats__item')) {
            element.style.animation = 'fadeSlideUp 0.8s ease-out forwards';
        } else if (element.classList.contains('cta__content')) {
            element.style.animation = 'fadeSlideUp 0.8s ease-out forwards';
        }
    }
    
    resetAnimation(element) {
        element.classList.remove('in-view');
    }
    
    animateCounters(container) {
        const counters = container.querySelectorAll('[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Use key to prevent multiple animations on same element
            const counterKey = counter.textContent + target;
            if (!this.countersAnimated.has(counterKey)) {
                updateCounter();
                this.countersAnimated.add(counterKey);
            }
        });
    }
    
    setupScrollEffects() {
        const navbar = document.getElementById('navbar');
        
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, { passive: true });
        }
    }
    
    initCounters() {
        // Initialize counter elements for animation
        const counters = document.querySelectorAll('[data-target]');
        counters.forEach(counter => {
            counter.textContent = '0';
        });
    }
}

// Smooth Scroll Behavior for Anchor Links
class SmoothScroll {
    constructor() {
        this.setupAnchorLinks();
    }
    
    setupAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80; // Account for navbar height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Button Ripple Effect
class RippleEffect {
    constructor() {
        this.setupButtons();
    }
    
    setupButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });
        });
    }
    
    createRipple(event, button) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Parallax Effect for Hero Section
class ParallaxEffect {
    constructor() {
        this.setupParallax();
    }
    
    setupParallax() {
        const hero = document.getElementById('hero');
        
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const heroHeight = hero.offsetHeight;
                
                if (scrollY < heroHeight) {
                    hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
                }
            }, { passive: true });
        }
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.monitorPerformance();
    }
    
    monitorPerformance() {
        // Check performance metrics
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    
                    // Log to console if needed
                    if (process.env.NODE_ENV === 'development') {
                        console.log('Время загрузки страницы:', pageLoadTime + 'мс');
                    }
                }, 0);
            });
        }
    }
}

// Loader Manager
class LoaderManager {
    constructor() {
        this.hideLoaderOnLoad();
    }
    
    hideLoaderOnLoad() {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Reduced Motion Support
class MotionPreferences {
    constructor() {
        this.checkMotionPreferences();
    }
    
    checkMotionPreferences() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.documentElement.style.scrollBehavior = 'auto';
            
            // Disable animations
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller
    new AnimationController();
    
    // Setup smooth scroll
    new SmoothScroll();
    
    // Setup ripple effect
    new RippleEffect();
    
    // Setup parallax
    new ParallaxEffect();
    
    // Monitor performance
    new PerformanceMonitor();
    
    // Check motion preferences
    new MotionPreferences();
    
    // Hide loader if exists
    new LoaderManager();
    
    // Accessibility: Focus management
    setupFocusManagement();
});

// Focus Management for Accessibility
function setupFocusManagement() {
    document.addEventListener('keydown', (e) => {
        // Tab key focus management
        if (e.key === 'Tab') {
            document.documentElement.classList.add('tab-focus');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.documentElement.classList.remove('tab-focus');
    });
}

// Utility: Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Utility: Throttle function
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        SmoothScroll,
        RippleEffect,
        ParallaxEffect,
        debounce,
        throttle
    };
}
