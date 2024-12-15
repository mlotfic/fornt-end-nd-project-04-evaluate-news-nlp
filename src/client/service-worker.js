// Use a dynamic cache name to manage versions
const CACHE_NAME = 'v1';

// Install event: Cache assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching...');
      // Pre-cache manifest added dynamically by Workbox
      return self.__WB_MANIFEST ? cache.addAll(self.__WB_MANIFEST.map(item => item.url)) : Promise.resolve();
    })
  );
  // Activate immediately
  self.skipWaiting(); 
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Claim clients immediately
  self.clients.claim(); 
});

// Fetch event: Serve cached assets or fetch from the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});