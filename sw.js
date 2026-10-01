const CACHE='sch-tempahan-v49-icon-fix';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icons/icon-192-v49.png','./icons/icon-512-v49.png','./icons/icon-maskable-192-v49.png','./icons/icon-maskable-512-v49.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE && k.startsWith('sch-tempahan-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin===self.location.origin){
    e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match('./index.html'))));
  }
});
