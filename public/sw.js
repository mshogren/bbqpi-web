self.addEventListener('push', (event) => {
  const data = event.data.json();
  const { name, alarmTemperature, currentTemperature } = data;
  const timestamp = Date.now();

  const title = 'BBQ-Pi Alarm';
  const options = {
    body: `${name} has reached the target: ${alarmTemperature}°F\nCurrent temperature: ${currentTemperature}°F`,
    icon: 'android-chrome-192x192.png',
    badge: 'android-chrome-192x192.png',
    tag: data.channel,
    timestamp,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
