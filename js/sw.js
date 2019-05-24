const myCacheName = 'CacheV1';
const cachesToAdd = [
  '/css/styles.css',
  '/data/restaurants.json',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/index.html',
  '/restaurant.html',
  '/manifest.json',
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(myCacheName).then(function(cache) {
      return cache.addAll(cachesToAdd);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(myCacheName).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != myCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});