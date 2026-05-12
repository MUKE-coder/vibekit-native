import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * VibeKit Native — secure key-value storage for sensitive data.
 *
 * Wraps expo-secure-store with typed getters/setters and JSON helpers.
 * Use this for:
 *   - Auth tokens / refresh tokens (when NOT using Better Auth's built-in
 *     storage — Better Auth + @better-auth/expo already wires SecureStore)
 *   - Biometric secrets
 *   - PII the user has consented to store locally (e.g., saved card
 *     references, not card numbers themselves)
 *   - 2FA seeds, API keys the user pastes in-app
 *
 * Backed by:
 *   - iOS: Keychain Services
 *   - Android: SharedPreferences + EncryptedSharedPreferences (AES-256)
 *   - Web: localStorage (NOT secure — secureStorage is a no-op fallback
 *     on web; never store real secrets there)
 *
 * For non-sensitive data (preferences, cache, last-seen IDs), use the
 * `storage` lib instead — MMKV is ~30x faster.
 *
 * Usage:
 *   import { secureStorage } from '@/components/lib/secure-storage';
 *
 *   await secureStorage.setString('token', userToken);
 *   const token = await secureStorage.getString('token');
 *
 *   await secureStorage.setObject('biometric', { key: '...', enabled: true });
 *   const config = await secureStorage.getObject<BiometricConfig>('biometric');
 *
 *   await secureStorage.delete('token');
 */

const isWeb = Platform.OS === 'web';

async function setItem(key: string, value: string): Promise<void> {
  if (isWeb) {
    // Web fallback — uses localStorage, NOT encrypted. Only safe for
    // public values; warn the user if they try to store real secrets here.
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`vibekit-secure:${key}`, value);
    }
    return;
  }
  await SecureStore.setItemAsync(key, value, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
}

async function getItem(key: string): Promise<string | null> {
  if (isWeb) {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(`vibekit-secure:${key}`);
  }
  return SecureStore.getItemAsync(key);
}

async function deleteItem(key: string): Promise<void> {
  if (isWeb) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(`vibekit-secure:${key}`);
    }
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export const secureStorage = {
  async setString(key: string, value: string): Promise<void> {
    await setItem(key, value);
  },
  async getString(key: string): Promise<string | null> {
    return getItem(key);
  },
  async setObject<T>(key: string, value: T): Promise<void> {
    await setItem(key, JSON.stringify(value));
  },
  async getObject<T>(key: string): Promise<T | null> {
    const raw = await getItem(key);
    if (raw == null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  async delete(key: string): Promise<void> {
    await deleteItem(key);
  },
};
