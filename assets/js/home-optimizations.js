// Home Page Specific Optimizations
(function() {
    'use strict';

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    // Active navigation highlighting
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        function updateActiveNav() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initial call
    }

    // Optimize card image loading
    function optimizeCardImages() {
        const cardImages = document.querySelectorAll('.card-custom-image img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                        
                        // If image is already loaded
                        if (img.complete) {
                            img.classList.add('loaded');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });
            
            cardImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Preload project pages on card hover
    function initProjectPreloading() {
        const projectCards = document.querySelectorAll('.card-custom.project');
        const preloadedPages = new Set();
        
        projectCards.forEach(card => {
            const caseStudyLink = card.querySelector('a[href*="screens/"]');
            
            if (caseStudyLink) {
                card.addEventListener('mouseenter', () => {
                    const href = caseStudyLink.href;
                    
                    if (!preloadedPages.has(href)) {
                        const link = document.createElement('link');
                        link.rel = 'prefetch';
                        link.href = href;
                        document.head.appendChild(link);
                        preloadedPages.add(href);
                    }
                }, { once: true });
            }
        });
    }

    // Optimize form submission
    function initContactForm() {
        const contactForm = document.querySelector('#contact form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual form handling)
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.classList.add('btn-success');
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-success');
                        this.reset();
                    }, 2000);
                }, 1000);
            });
        }
    }

    // Performance monitoring
    function initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }
    }

    // Initialize all optimizations
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initSmoothScrolling();
                initActiveNavigation();
                optimizeCardImages();
                initProjectPreloading();
                initContactForm();
            });
        } else {
            initSmoothScrolling();
            initActiveNavigation();
            optimizeCardImages();
            initProjectPreloading();
            initContactForm();
        }
        
        // Initialize performance monitoring after page load
        window.addEventListener('load', initPerformanceMonitoring);
    }

    // Start optimizations
    init();

})();