const CACHE_NAME = 'vibe-music-v1';
const urlsToCache = [
  '/vibe-music/',
  '/vibe-music/index.html',
  '/vibe-music/manifest.json',
  '/vibe-music/sw.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).catch(() => caches.match('/vibe-music/'));
      })
  );
});

// Background sync for offline playback tracking
self.addEventListener('sync', event => {
  if (event.tag === 'playback-sync') {
    event.waitUntil(syncPlaybackData());
  }
});

async function syncPlaybackData() {
  // Placeholder for background sync
  console.log('Playback data synced');
}