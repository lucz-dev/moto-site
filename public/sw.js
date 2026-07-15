// One-time origin migration from the former game PWA. Existing installations
// still check /sw.js for updates after moto.lucz.dev moves to this landing.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map((name) => caches.delete(name)));

    await self.clients.claim();
    await self.registration.unregister();

    const windows = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });
    await Promise.all(windows.map((client) => client.navigate(client.url)));
  })());
});
