// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initThemeToggle();
    initTypingEffect();
    initSmoothScrolling();
    initScrollAnimations();
    initCustomCursor();
    initBackToTop();
    initContactForm();
    initRippleEffects();
    initSkillProgress();
    initAutoNavigation();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(8, 27, 41, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(8, 27, 41, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Force dark theme as default (override any saved preference)
    const savedTheme = 'dark';
    body.setAttribute('data-theme', savedTheme);
    localStorage.setItem('theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Typing Effect
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const texts = [
        'Software Engineer',
        'Full Stack Developer',
        'AI/ML Enthusiast',
        'Flutter Developer',
        'CS & Business Systems Student'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(type, 1000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 100
    });
    
    // Custom scroll animations for elements without AOS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for custom animations
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .timeline-item');
    animateElements.forEach(el => observer.observe(el));
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Cursor animation
    function animateCursor() {
        // Main cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower cursor
        followerX += (mouseX - followerX) * 0.05;
        followerY += (mouseY - followerY) * 0.05;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor effects on hover
    const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .skill-item, .project-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
    
    // Hide cursor on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        }, 2000);
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-light);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-md);
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Ripple Effects
function initRippleEffects() {
    const rippleElements = document.querySelectorAll('.ripple-effect');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Skill Progress Animation
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.transform = `scaleX(${progress / 100})`;
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Auto Navigation
function initAutoNavigation() {
    let currentSection = 0;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Auto scroll through sections (optional feature)
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            currentSection = (currentSection + 1) % sections.length;
            const targetSection = sections[currentSection];
            const offsetTop = targetSection.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }, 8000); // Change section every 8 seconds
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }
    
    // Start auto scroll after user interaction
    let hasInteracted = false;
    
    document.addEventListener('click', function() {
        if (!hasInteracted) {
            hasInteracted = true;
            // Uncomment the line below to enable auto navigation
            // startAutoScroll();
        }
    });
    
    // Stop auto scroll on user scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        stopAutoScroll();
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (hasInteracted) {
                // Restart auto scroll after user stops scrolling
                // startAutoScroll();
            }
        }, 3000);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events efficiently
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Handle window resize
const optimizedResizeHandler = debounce(function() {
    // Handle resize events efficiently
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group.focused .form-label {
        transform: translateY(-25px) scale(0.8);
        color: var(--primary-color);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 0.2rem;
        border-radius: var(--radius-sm);
        transition: all var(--transition-normal);
    }
    
    .notification-close:hover {
        color: var(--text-color);
        background: rgba(255, 255, 255, 0.1);
    }
    
    .notification-success {
        border-left: 4px solid var(--success-color);
    }
    
    .notification-error {
        border-left: 4px solid var(--error-color);
    }
    
    .notification-warning {
        border-left: 4px solid var(--warning-color);
    }
    
    .notification-info {
        border-left: 4px solid var(--primary-color);
    }
`;

document.head.appendChild(style);


