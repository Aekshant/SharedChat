self.addEventListener('push', function (event) {
  // const data = event.data.json();

  // const data = event.data ? event.data.json() : {};
  // const title = data.title || "New Message";
  // const body = data.body || "You received a message";

  // event.waitUntil(
  //   self.registration.showNotification(data.title, {
  //     body: data.body,
  //     icon: '/assets/icons/icon-192x192.png',
  //     data: data,
  //   })
  // );

  console.log("SW PUSH EVENT:", event);

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.error("Invalid push data", e);
  }

  const title = data.title || "New Notification";
  const body = data.body || "You have a message";

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: `${self.location.origin}/assets/icons/icon-192x192.png`,
      data: data,
      requireInteraction: true  // 👈 forces notification to appear

    })
  );

});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/chat/' + event.notification.data.senderId)
  );
});
