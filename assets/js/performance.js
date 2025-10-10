// Performance Optimization Script
(function() {
    'use strict';

    // Image lazy loading optimization
    function optimizeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        // Add intersection observer for better lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            '../assets/images/boilerplate1.png',
            '../assets/images/nfc.png',
            '../assets/images/hero.png',
            '../assets/images/tifi.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Optimize video loading
    function optimizeVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Pause videos when not in viewport
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            }, { threshold: 0.5 });

            videoObserver.observe(video);
        });
    }

    // Prefetch next pages on hover
    function setupPrefetching() {
        const links = document.querySelectorAll('a[href*=".html"]');
        const prefetched = new Set();

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.href;
                if (!prefetched.has(href)) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                    prefetched.add(href);
                }
            }, { once: true });
        });
    }

    // Optimize CSS animations
    function optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        }

        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            const animations = document.querySelectorAll('[data-aos]');
            animations.forEach(el => {
                if (document.hidden) {
                    el.style.animationPlayState = 'paused';
                } else {
                    el.style.animationPlayState = 'running';
                }
            });
        });
    }

    // Service Worker registration for caching
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }

    // Critical CSS inlining detection
    function handleCriticalCSS() {
        const criticalCSS = document.querySelector('style[data-critical]');
        if (criticalCSS) {
            // Remove critical CSS after page load to prevent duplication
            window.addEventListener('load', () => {
                setTimeout(() => {
                    criticalCSS.remove();
                }, 1000);
            });
        }
    }

    // Font loading optimization
    function optimizeFonts() {
        if ('fonts' in document) {
            // Preload critical fonts
            const fontPromises = [
                document.fonts.load('400 1em Lato'),
                document.fonts.load('600 1em Lato'),
                document.fonts.load('400 1em Amaranth')
            ];

            Promise.all(fontPromises).then(() => {
                document.documentElement.classList.add('fonts-loaded');
            });
        }
    }

    // Initialize all optimizations
    function init() {
        // Run immediately
        optimizeImages();
        setupPrefetching();
        optimizeAnimations();
        handleCriticalCSS();
        optimizeFonts();

        // Run after DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                optimizeVideos();
                preloadCriticalResources();
            });
        } else {
            optimizeVideos();
            preloadCriticalResources();
        }

        // Run after page is fully loaded
        window.addEventListener('load', () => {
            registerServiceWorker();
        });
    }

    // Start optimization
    init();

})();