// Centralized configuration for the mobile application
import Constants from 'expo-constants';

// For physical devices in dev mode, we can reliably get the computer's IP
// from the Expo host URL instead of hardcoding it.
const getBackendUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  if (__DEV__ && hostUri) {
    // hostUri comes as "192.168.0.95:8081", we split it to get just the IP
    const ip = hostUri.split(':')[0];
    return `http://${ip}:3000`;
  }
  // Fallback for emulators/production
  return 'http://192.168.0.95:3000'; 
};

const ENV = {
  dev: {
    API_URL: getBackendUrl(), // Automatically resolves to your current Wi-Fi IP
  },
  staging: {
    API_URL: 'https://staging-api.yourapp.com',
  },
  prod: {
    API_URL: 'https://api.yourapp.com',
  },
};

const getEnvVars = (env = Constants.expoConfig?.extra?.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  }
  if (env === 'staging') {
    return ENV.staging;
  }
  if (env === 'prod') {
    return ENV.prod;
  }
  return ENV.dev;
};

export const API_URL = getEnvVars().API_URL;
