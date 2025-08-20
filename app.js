// Prashant Nammi's AI/ML Portfolio - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and features
    initLoadingScreen();
    initParticles();
    initTypewriter();
    initSmoothScrolling();
    initAnimatedCounters();
    initScrollAnimations();
    initNavigation();
    initContactLinks();
});

// Loading Screen Animation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Floating Particles Background
function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 50;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100vh';
        
        // Random animation duration between 4-8 seconds
        const duration = Math.random() * 4 + 4;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 2;
        particle.style.animationDelay = delay + 's';
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3;
        particle.style.opacity = opacity;
        
        // Add glow effect randomly
        if (Math.random() > 0.5) {
            particle.style.boxShadow = `0 0 ${size * 2}px rgba(0, 255, 136, 0.8)`;
        }
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(), i * 100);
    }
    
    // Continuously create new particles
    setInterval(() => {
        createParticle();
    }, 200);
}

// Typewriter Effect - Fixed
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    const text = 'Prashant Nammi';
    let index = 0;
    
    // Clear any existing content
    typewriter.textContent = '';
    
    function typeCharacter() {
        if (index < text.length) {
            typewriter.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 150);
        } else {
            // Start blinking cursor
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.style.animation = 'blink 1s infinite';
            }
        }
    }
    
    // Start typewriter after loading screen
    setTimeout(() => {
        typeCharacter();
    }, 2500);
}

// Smooth Scrolling Navigation - Fixed
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add click feedback
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
    
    // Also handle CTA button - Fixed
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = document.querySelector('#about');
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Initialize Contact Links - New function to ensure external links work
function initContactLinks() {
    // Email link
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the default mailto behavior work
            console.log('Email link clicked:', this.href);
        });
    });
    
    // External social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            let url = '';
            const linkText = this.textContent.toLowerCase();
            
            if (linkText.includes('github')) {
                url = 'https://github.com/prashanthpavankumar';
            } else if (linkText.includes('linkedin')) {
                url = 'https://www.linkedin.com/in/prasanthpavankumarnammi';
            } else if (linkText.includes('instagram')) {
                url = 'https://instagram.com/prashanth_195';
            }
            
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
                console.log('Opening:', url);
            }
        });
    });
    
    // Project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        if (link.textContent.includes('GitHub')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.open('https://github.com/prashanthpavankumar', '_blank', 'noopener,noreferrer');
            });
        }
    });
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
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
            
            updateCounter();
        });
        
        hasAnimated = true;
    }
    
    // Trigger animation when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => animateCounters(), 1000);
            }
        });
    });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .section-title');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
                
                // Add stagger effect for multiple cards
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = delay + 'ms';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Enhanced Navigation with Active States - Fixed
function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150; // Adjusted offset
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 136, 0.4)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(0, 255, 136, 0.2)';
        }
    });
}

// Enhanced Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 255, 136, 0.1)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #00ff88 !important;
        transform: translateY(-2px);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    /* Enhanced button animations */
    .btn, .cta-button, .project-link, .social-link {
        position: relative;
        overflow: hidden;
    }
    
    .btn::after, .cta-button::after, .project-link::after, .social-link::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
    }
    
    .btn:hover::after, .cta-button:hover::after, .project-link:hover::after, .social-link:hover::after {
        width: 300px;
        height: 300px;
    }
    
    /* Skill tag pulse animation */
    .skill-tag {
        animation: skillPulse 3s ease-in-out infinite;
        animation-delay: calc(var(--delay, 0) * 0.2s);
    }
    
    @keyframes skillPulse {
        0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 136, 0.3); }
        50% { box-shadow: 0 0 15px rgba(0, 255, 136, 0.6); }
    }
    
    /* Glowing text effect for hero title */
    .hero-title {
        animation: textGlow 4s ease-in-out infinite;
    }
    
    @keyframes textGlow {
        0%, 100% { 
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }
        50% { 
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.8), 0 0 30px rgba(255, 255, 0, 0.5);
        }
    }
    
    /* Enhanced project card animations */
    .project-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .project-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    /* Contact form enhancement */
    .contact-info {
        animation: contactFloat 6s ease-in-out infinite;
    }
    
    @keyframes contactFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    /* Section slide-in animation */
    @keyframes sectionSlideIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Mouse particle animation */
    @keyframes mouseParticle {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-50px);
        }
    }
`;
document.head.appendChild(style);

// Add skill tag delays for staggered animation
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--delay', index);
    });
});

// Add entrance animations for different sections
function addSectionEntranceAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'sectionSlideIn 0.8s ease forwards';
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        sectionObserver.observe(section);
    });
}

// Initialize section animations after DOM load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addSectionEntranceAnimations();
    }, 2500); // After loading screen
});

// Add interactive particle effects on mouse movement
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.98) { // Occasionally create particles
        createMouseParticle(e.clientX, e.clientY);
    }
});

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = '#00ff88';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '999';
    particle.style.animation = 'mouseParticle 1s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 1000);
}

// Console message for developers
console.log('%c🚀 Prashant Nammi\'s AI/ML Portfolio', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%c16-year-old aspiring AI/ML Engineer from Bhimavaram, India', 'color: #ffff00; font-size: 14px;');
console.log('%cCurrently pursuing Computer Engineering at Smt B Seetha Polytechnic', 'color: #ffffff; font-size: 12px;');

// Debug information
console.log('%cPortfolio Features Loaded:', 'color: #00ff88; font-weight: bold;');
console.log('✓ Loading Screen Animation');
console.log('✓ Floating Particles Background');
console.log('✓ Typewriter Effect');
console.log('✓ Smooth Scroll Navigation');
console.log('✓ Animated Counters');
console.log('✓ Section Animations');
console.log('✓ Contact Links (External)');
console.log('✓ Glass Card Hover Effects');