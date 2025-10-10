// Service Worker for Performance Optimization
const CACHE_NAME = 'mercy-kalu-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/screens/projects.html',
  '/screens/boilerplate.html',
  '/screens/gymTracker.html',
  '/screens/convey.html',
  '/screens/credet.html',
  '/screens/restaurant.html',
  '/screens/delve.html',
  '/assets/css/bootstrap.min.css',
  '/assets/css/style.css',
  '/assets/css/gym.css',
  '/assets/css/study.css',
  '/assets/css/optimized.css',
  '/assets/js/bootstrap.bundle.min.js',
  '/assets/js/aos.js',
  '/assets/js/main.js',
  '/assets/js/performance.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});