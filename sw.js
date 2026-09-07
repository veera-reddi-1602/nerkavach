const CACHE_NAME = 'ner-kavach-v3.2.1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Always Network First to guarantee instant updates with zero stale cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
