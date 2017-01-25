self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'favicon-32x32.png',
    badge: 'favicon-32x32.png',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
