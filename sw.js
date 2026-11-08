const db=()=>new Promise((ok,no)=>{const r=indexedDB.open('m',1);r.onupgradeneeded=()=>r.result.createObjectStore('m',{autoIncrement:true});r.onsuccess=()=>ok(r.result);r.onerror=no});
self.addEventListener('push',e=>{
  const m=e.data.json();
  e.waitUntil(db().then(d=>new Promise(ok=>{const t=d.transaction('m','readwrite');t.objectStore('m').add(m);t.oncomplete=ok}))
    .then(()=>self.registration.showNotification(m.t,{body:m.b.slice(0,300),tag:String(m.ts)+m.t,icon:'icon.png'}))
    .then(()=>clients.matchAll()).then(cs=>cs.forEach(c=>c.postMessage(1))));
});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(cs=>cs.length?cs[0].focus():clients.openWindow('./')))});
