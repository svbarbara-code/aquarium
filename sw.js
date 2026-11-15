const CACHE='aquarium-v20';
const FILES=['./','index.html','manifest.json','icon-512.png','assets/reef-wide.jpg','assets/reef-tall.jpg','assets/fish-clownfish.png','assets/fish-chromis.png','assets/fish-gramma.png','assets/fish-yellowtang.png','assets/fish-bluetang.png','assets/fish-firefish.png','assets/fish-mandarin.png','assets/turn-clownfish.png','assets/turn-chromis.png','assets/turn-gramma.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
