/* GAMER-FREE-DEVELOPER · Service Worker · 1.0.3 */
'use strict';

const CACHE_PREFIX = 'gamer-free-developer-';
const CACHE_NAME = `${CACHE_PREFIX}v1.0.3`;
const CORE_ASSETS = [
  './',
  './index.html',
  './legal.html',
  './offline.html',
  './manifest.webmanifest',
  './assets/css/styles.css',
  './assets/js/audio.js',
  './assets/js/app.js',
  './assets/brand/favicon.svg',
  './assets/brand/brand-mark.svg',
  './assets/brand/icon-192.png',
  './assets/brand/icon-512.png',
  './assets/brand/icon-maskable-512.png',
  './assets/illustrations/game-world.svg',
  './assets/illustrations/game-world-mini.svg',
  './assets/illustrations/mascot.svg',
  './assets/illustrations/android-bot.svg',
  './assets/illustrations/social-preview.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_ASSETS);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok && response.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(request))
          || (await cache.match('./offline.html'))
          || (await cache.match('./index.html'));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    } catch {
      return cached || Response.error();
    }
  })());
});
