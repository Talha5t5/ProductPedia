const {default: axios} = require('axios');

const fetchPlayStoreVersion = async () => {
  try {
    const response = await axios.get(
      'https://play.google.com/store/apps/details?id=YOUR_APP_PACKAGE_NAME',
    );
    const versionMatch = response.data.match(/"softwareVersion":"([\d.]+)"/);
    if (versionMatch && versionMatch.length > 1) {
      return versionMatch[1];
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch the latest version from Play Store:', error);
    return null;
  }
};
