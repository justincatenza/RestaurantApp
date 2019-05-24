const myCacheName = 'CacheV1';
const cachesToAdd = [
  '/RestaurantApp/css/styles.css',
  '/RestaurantApp/data/restaurants.json',
  '/RestaurantApp/js/dbhelper.js',
  '/RestaurantApp/js/main.js',
  '/RestaurantApp/js/restaurant_info.js',
  '/RestaurantApp/index.html',
  '/RestaurantApp/restaurant.html',
  '/RestaurantApp/manifest.json',
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