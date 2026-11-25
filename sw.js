self.addEventListener("install", function(e) {
  e.waitUntil(caches.open("avivamiento-v1").then(function(c) {
    return c.addAll(["./", "index.html", "manifest.webmanifest", "icons/icon.svg"]);
  }));
});
self.addEventListener("fetch", function(e) {
  e.respondWith(caches.match(e.request).then(function(r) { return r || fetch(e.request); }));
});
