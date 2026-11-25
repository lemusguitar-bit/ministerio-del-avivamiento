var CACHE = "avivamiento-v5";
self.addEventListener("install", function(e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c) {
    return c.addAll(["./", "index.html", "manifest.webmanifest", "icons/icon.svg", "video.mp4"]);
  }));
});
self.addEventListener("activate", function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
  }).then(function() { return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e) {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(function(r) {
    var network = fetch(e.request).then(function(res) {
      var copy = res.clone();
      caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
      return res;
    }).catch(function() { return r; });
    return r || network;
  }));
});
