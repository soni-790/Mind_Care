const CACHE_NAME = "mindcare-v1"
const STATIC_CACHE_NAME = "mindcare-static-v1"
const DYNAMIC_CACHE_NAME = "mindcare-dynamic-v1"

// Assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html",
  "/favicon.svg",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/static/js/bundle.js",
  "/static/css/main.css",
]

// Routes to cache dynamically
const DYNAMIC_ROUTES = ["/assessment", "/dashboard", "/resources", "/about", "/contact"]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...")

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets")
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log("Service Worker: Static assets cached")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("Service Worker: Error caching static assets", error)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker: Activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse
      }

      // Otherwise fetch from network
      return fetch(request)
        .then((networkResponse) => {
          // Don't cache if not a valid response
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse
          }

          // Clone the response
          const responseToCache = networkResponse.clone()

          // Cache dynamic content
          if (shouldCacheDynamically(request.url)) {
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }

          return networkResponse
        })
        .catch((error) => {
          console.log("Service Worker: Network request failed", error)

          // Return offline page for navigation requests
          if (request.destination === "document") {
            return caches.match("/offline.html")
          }

          // Return a generic offline response for other requests
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          })
        })
    }),
  )
})

// Utility functions
function shouldCacheDynamically(url) {
  return (
    DYNAMIC_ROUTES.some((route) => url.includes(route)) ||
    url.includes(".css") ||
    url.includes(".js") ||
    url.includes(".json") ||
    url.includes("/icons/")
  )
}

// Error handling
self.addEventListener("error", (event) => {
  console.error("Service Worker: Error", event.error)
})

console.log("Service Worker: Script loaded")
