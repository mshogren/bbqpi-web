export default function isReady(state) {
  const { auth, device } = state;
  return auth.authenticated
    && ((device.selected && typeof device.selected === 'string') || (device.available && typeof device.available === 'object'));
}
