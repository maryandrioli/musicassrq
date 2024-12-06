const CACHE_NAME = 'sons-sr-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './sons/1.mp3',
  './sons/2.mp3',
  './sons/3.mp3',
  './sons/4.mp3',
  './sons/5.mp3',
  './sons/6.mp3',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
  );
});