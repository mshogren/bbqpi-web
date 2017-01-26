export const loadDeviceKey = () => {
  try {
    const deviceKey = localStorage.getItem('deviceKey');
    if (deviceKey === null) {
      return undefined;
    }
    return deviceKey;
  } catch (err) {
    return undefined;
  }
};

export const saveDeviceKey = (state) => {
  try {
    const deviceKey = state.deviceKey;
    localStorage.setItem('deviceKey', deviceKey);
  } catch (err) {
    // Ignore write errors
  }
};

