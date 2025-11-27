const CACHE_NAME = "meu-app-cache-v1";
const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./cadastro.html",
    "./perfil.html",
    "./style.css",
    "./app.js",
    "./manifest.json",
    "./icons/web-app-manifest-192x192.png",
    "./icons/web-app-manifest-512x512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
