// 캐시 이름과 캐싱할 파일들 설정
const CACHE_NAME = "holog-cache-v1";
const urlsToCache = ["/", "/index.html", "/favicon.ico", "/manifest.json"];

// 설치(Install) 이벤트 - Service Worker가 설치될 때 발생
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// 활성화(Activate) 이벤트 - 이전 버전의 캐시를 정리하는 용도
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// fetch 이벤트 - 네트워크 요청이 발생할 때 캐시에서 응답을 제공
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시가 있으면 캐시 응답을 반환하고, 없으면 네트워크 요청
      return response || fetch(event.request);
    })
  );
});
