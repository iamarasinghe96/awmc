/* AWMC Site Visit Questionnaire — offline service worker.
   Caches the whole app shell on install so it launches with no network.
   Bump CACHE version whenever any cached file changes. */
var CACHE = "awmc-visit-v3";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE).then(function(cache){
      return cache.addAll(ASSETS);
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k !== CACHE){ return caches.delete(k); }
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(event){
  var req = event.request;
  if(req.method !== "GET"){ return; }

  // For page navigations, serve the cached shell first (true offline).
  if(req.mode === "navigate"){
    event.respondWith(
      caches.match("./index.html").then(function(cached){
        return cached || fetch(req).catch(function(){ return caches.match("./index.html"); });
      })
    );
    return;
  }

  // Everything else: cache-first, fall back to network, then cache the result.
  event.respondWith(
    caches.match(req).then(function(cached){
      if(cached){ return cached; }
      return fetch(req).then(function(res){
        if(res && res.status === 200 && res.type === "basic"){
          var copy = res.clone();
          caches.open(CACHE).then(function(cache){ cache.put(req, copy); });
        }
        return res;
      }).catch(function(){ return cached; });
    })
  );
});
