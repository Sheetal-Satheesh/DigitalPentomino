
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./resources/images/icons/dp_192.png",
                "./manifest.json",
                "./resources/js/board.js",
                "./resources/js/game-controller.js",
                "./resources/js/game-loader.js",
                "./resources/js/pentomino-utility.js",
                "./resources/js/pentomino.js"
                ]);
        })
    );
});

self.addEventListener("fetch", e => {
    //console.log(`Intercepting fetch request for: ${e.request.url}`);

    //try to find cached elements, elsewise use network for load
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})