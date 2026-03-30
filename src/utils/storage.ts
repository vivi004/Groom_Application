import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Determine if we should use AsyncStorage (for web)
const useAsyncStorage = Platform.OS === 'web';

// Lazily require SQLite kv-store only on native platforms
let SQLiteStorage: any = null;
if (!useAsyncStorage) {
  try {
    SQLiteStorage = require('expo-sqlite/kv-store').Storage;
  } catch (error) {
    console.warn('Failed to load expo-sqlite/kv-store fallback', error);
  }
}

export const Storage = {
  // Get an item from storage
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (useAsyncStorage || !SQLiteStorage) {
        return await AsyncStorage.getItem(key);
      } else {
        // kv-store returns string | null synchronously or via promise depending on version,
        // but typically standardizes on Promise for compatibility
        return await SQLiteStorage.getItem(key);
      }
    } catch (error) {
      console.error(`Error getting item ${key} from storage:`, error);
      return null;
    }
  },

  // Set an item in storage
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (useAsyncStorage || !SQLiteStorage) {
        await AsyncStorage.setItem(key, value);
      } else {
        await SQLiteStorage.setItem(key, value);
      }
    } catch (error) {
      console.error(`Error setting item ${key} in storage:`, error);
    }
  },

  // Remove an item from storage
  removeItem: async (key: string): Promise<void> => {
    try {
      if (useAsyncStorage || !SQLiteStorage) {
        await AsyncStorage.removeItem(key);
      } else {
        await SQLiteStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing item ${key} from storage:`, error);
    }
  },

  // Token Helpers
  getToken: async (): Promise<string | null> => {
    return await Storage.getItem('auth_token');
  },
  
  setToken: async (token: string): Promise<void> => {
    await Storage.setItem('auth_token', token);
  },
  
  removeToken: async (): Promise<void> => {
    await Storage.removeItem('auth_token');
  },
};
