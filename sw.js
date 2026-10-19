// 오프라인에서도 열리게: 새 버전은 인터넷이 될 때 받아오고, 안 되면 저장해 둔 걸로 열어요
const CACHE = "wedding-note-v1";
self.addEventListener("install", (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "./index.html"]))); });
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  const req = e.request; if (req.method !== "GET") return;
  e.respondWith(fetch(req).then((res) => { if (res.ok && (new URL(req.url).origin === location.origin || req.url.includes("fonts.g"))) { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); } return res; })
    .catch(() => caches.match(req).then((r) => r || caches.match("./index.html"))));
});
