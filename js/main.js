// Main Application Logic

class AnarchyVPN {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupButtons();
        this.setupModals();
        this.setupForms();
        this.setupEventListeners();
    }
    
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.navbar__menu');
        
        if (navbar) {
            // Handle active link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    // Close mobile menu on link click
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('mobile-open');
                });
            });
            
            // Hamburger menu toggle
            if (hamburger) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('mobile-open');
                });
            }
            
            // Update active link on scroll
            window.addEventListener('scroll', () => {
                this.updateActiveNavLink();
            });
        }
    }
    
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    setupButtons() {
        const buttons = document.querySelectorAll('.btn:not(a)');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e, button);
            });
        });
    }
    
    handleButtonClick(e, button) {
        const buttonText = button.textContent.trim().toLowerCase();
        
        // Route to different actions based on button text
        if (buttonText.includes('начать') || buttonText.includes('бесплатно') || buttonText.includes('👉 начать')) {
            this.showTrialModal();
        } else if (buttonText.includes('скачать') || buttonText.includes('приложение') || buttonText.includes('👉 скачать')) {
            this.showDownloadModal();
        } else if (buttonText.includes('выбрать') || buttonText.includes('👉 выбрать') || buttonText.includes('использование') || buttonText.includes('👉 начать использование')) {
            // Handle plan selection or feature viewing
            console.log('Операция триггерена:', buttonText);
        }
    }
    
    setupModals() {
        // Setup modal functionality
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    setupForms() {
        // Setup form handling if forms exist
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }
    
    handleFormSubmit(form) {
        // Handle form submission
        const formData = new FormData(form);
        console.log('Отправлено:', Object.fromEntries(formData));
        
        // Show success message
        this.showNotification('Сообщение отправлено успешно!', 'success');
    }
    
    setupEventListeners() {
        // Global event listeners
        document.addEventListener('click', (e) => {
            // Handle dynamic click events
            if (e.target.matches('[data-action]')) {
                const action = e.target.dataset.action;
                this.handleAction(action, e.target);
            }
        });
        
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search (if needed)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                console.log('Лэнта поиска активирована');
            }
        });
    }
    
    handleAction(action, element) {
        switch(action) {
            case 'download':
                this.handleDownload();
                break;
            case 'trial':
                this.showTrialModal();
                break;
            case 'contact':
                this.scrollToSection('contact');
                break;
            default:
                console.log('Неизвестное действие:', action);
        }
    }
    
    showTrialModal() {
        this.showNotification('Перенаправление на бесплатную пробу...' , 'info');
        // In a real app, redirect to trial signup
        setTimeout(() => {
            // window.location.href = '/trial';
        }, 1000);
    }
    
    showDownloadModal() {
        this.showNotification('Подготовка ссылок для скачивания...', 'info');
        // In a real app, show download options
    }
    
    handleDownload() {
        console.log('Скачивание начато');
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                ${message}
            </div>
            <button class="notification__close">×</button>
        `;
        
        // Add styles if not already present
        if (!document.querySelector('style[data-notification]')) {
            const style = document.createElement('style');
            style.setAttribute('data-notification', 'true');
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    max-width: 400px;
                    padding: 16px 20px;
                    border-radius: 8px;
                    background: white;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    animation: slideInRight 0.3s ease-out;
                }
                
                .notification--success {
                    border-left: 4px solid #e8000d;
                    background: #1a1a1a;
                    color: #fff;
                }
                
                .notification--error {
                    border-left: 4px solid #ff3333;
                    background: #1a1a1a;
                    color: #fff;
                }
                
                .notification--info {
                    border-left: 4px solid #0066ff;
                    background: #1a1a1a;
                    color: #fff;
                }
                
                .notification__close {
                    background: none;
                    border: none;
                    color: inherit;
                    font-size: 24px;
                    cursor: pointer;
                    margin-left: 10px;
                    padding: 0;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                
                .notification__close:hover {
                    opacity: 1;
                }
                
                @media (max-width: 640px) {
                    .notification {
                        left: 20px;
                        right: 20px;
                        bottom: 20px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Setup close button
        notification.querySelector('.notification__close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    closeAllModals() {
        // Close any open modals
        document.querySelectorAll('.modal.open').forEach(modal => {
            modal.classList.remove('open');
        });
    }
}

// Analytics Helper
class Analytics {
    static trackEvent(eventName, data = {}) {
        console.log(`Event: ${eventName}`, data);
        
        // In a real app, send to analytics service
        // Example: gtag('event', eventName, data);
    }
    
    static trackPageView() {
        console.log('Page view tracked');
    }
}

// Service Worker Registration
class ServiceWorkerManager {
    static register() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(err => {
                console.log('SW registration failed:', err);
            });
        }
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.applyTheme(this.getPreferredTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.applyTheme(e.matches ? 'dark' : 'light');
        });
    }
    
    getPreferredTheme() {
        const stored = localStorage.getItem('theme-preference');
        if (stored) return stored;
        
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme-preference', theme);
    }
}

// Local Storage Manager
class StorageManager {
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage error:', e);
        }
    }
    
    static getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    }
    
    static removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage error:', e);
        }
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    const app = new AnarchyVPN();
    
    // Initialize theme manager
    new ThemeManager();
    
    // Track page view
    Analytics.trackPageView();
    
    // Register service worker
    ServiceWorkerManager.register();
    
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('Ощибка:', e.error);
        Analytics.trackEvent('error', {
            message: e.error?.message,
            stack: e.error?.stack
        });
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Необработанное отклонение:', e.reason);
        Analytics.trackEvent('unhandled_rejection', {
            reason: e.reason?.message || String(e.reason)
        });
    });
    
    // Expose globals for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
        window.App = app;
        window.Analytics = Analytics;
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnarchyVPN,
        Analytics,
        StorageManager,
        ThemeManager,
        ServiceWorkerManager
    };
}
