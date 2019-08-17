let cache_name = "rest-app-cache";

const urlsToCache = [
  "./",
  "./img/",
  "index.html",
  "restaurant.html",
  "./css/styles.css",
  "./data/restaurants.json",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg",
  "./js/dbhelper.js",
  "./js/main.js",
  "./js/restaurant_info.js"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cache_name).then(function(cache) {
      return cache.addAll(urlsToCache);
      console.log("Assets Cached!");
    })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      //cache hit - return response
      if (response) {
        return response;
      }
      return fetch(e.request).then(function(response) {
        //checking for valid response
        if (!response || response.status == !200 || response.type !== "basic") {
          return response;
        }
        var responseToCache = response.clone();
        caches.open(cache_name).then(function(cache) {
          cache.put(e.request, responseToCache);
        });
      });
    })
  );
});
/*
self.addEventListener("activate", function (e) {
  console.log("service worker activated!");
});

*/
