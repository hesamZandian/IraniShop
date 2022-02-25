const CACHE_NAME = "project_name";
// Add Routes and pages using React Browser Router
const urlsToCache = ["./index.html", "./offline.html"];

// Install a service worker
self.addEventListener("install", (event) => {

// Perform install steps
event.waitUntil(
	caches.open(CACHE_NAME).then(function (cache) {
	return cache.addAll(urlsToCache);
	})
);
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
event.respondWith(
	caches.match(event.request).then(() => {
	return fetch(event.request).catch(err => caches.match("./offline.html"));
	})
);
});

// Update a service worker
self.addEventListener("activate", (event) => {
var cacheWhitelist = ["project_name"];
event.waitUntil(
	caches.keys().then((cacheNames) => {
	return Promise.all(
		cacheNames.map((cacheName) => {
		if (cacheWhitelist.indexOf(cacheName) === -1) {
			return caches.delete(cacheName);
		}
		})
	);
	})
);
});

self.addEventListener('notificationclick', (e) => {
	const notification = e.notification;
	const action = e.action;

  
	if (action === 'close') {
	  notification.close();
	} else {
	  clients.openWindow(`https://example.com`);
	  notification.close();
	}
  });