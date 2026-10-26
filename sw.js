var C="e46-v1";
var SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(SHELL)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);
  if(u.origin!==location.origin&&u.hostname!=="cdnjs.cloudflare.com")return;
  e.respondWith(caches.open(C).then(function(c){return c.match(r).then(function(h){
    var f=fetch(r).then(function(n){if(n&&(n.ok||n.type==="opaque"))c.put(r,n.clone());return n}).catch(function(){return h});
    return h||f})}))});
