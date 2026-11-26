// Linola 支援台帳：プッシュ通知の受け口。通知の中身は送られてこないので、いつも同じ文を出す（会社名や人の名前は出さない）
// 画面のファイルはここでは保存しない（古い画面が残らないようにするため）
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("push", e => {
  e.waitUntil(self.registration.showNotification("Linola 支援台帳", { body: "履歴がまだの予定があります", icon: "icon-180_1.png", badge: "favicon_1.png", tag: "linola-tt", renotify: true, data: { go: "#/tt" } }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close(); const go = (e.notification.data && e.notification.data.go) || "#/tt";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    const c = list.find(x => x.url.indexOf(self.registration.scope) === 0);
    if (c) { c.postMessage({ go: go }); return c.focus(); }
    return self.clients.openWindow(self.registration.scope + go);
  }));
});
