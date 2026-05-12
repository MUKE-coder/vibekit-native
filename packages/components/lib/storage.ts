import { MMKV } from 'react-native-mmkv';

/**
 * VibeKit Native — fast key-value storage backed by MMKV.
 *
 * MMKV is ~30× faster than AsyncStorage, runs on the JS thread without
 * crossing the bridge, and supports encryption. Use it for tokens,
 * preferences, cached responses, and anything else AsyncStorage was
 * doing.
 *
 * For sensitive secrets (auth tokens, biometric data), pair MMKV with
 * expo-secure-store via the `encryptionKey` option below or store the
 * sensitive value in SecureStore and a non-sensitive reference here.
 *
 * Docs: https://github.com/mrousavy/react-native-mmkv
 *
 * Usage:
 *   import { storage } from '@/lib/storage';
 *
 *   storage.setString('theme', 'dark');
 *   const theme = storage.getString('theme');           // 'dark'
 *
 *   storage.setObject('user', { id: 1, name: 'Jane' });
 *   const user = storage.getObject<{ id: number; name: string }>('user');
 *
 *   storage.delete('user');
 *   storage.clearAll();
 */

const mmkv = new MMKV({
  id: 'vibekit-native',
  // To encrypt the entire instance, derive a key (e.g., from expo-secure-store)
  // and pass it here. Don't hard-code the key.
  // encryptionKey: someKeyFromSecureStore,
});

export const storage = {
  /* String */
  setString(key: string, value: string): void {
    mmkv.set(key, value);
  },
  getString(key: string): string | undefined {
    return mmkv.getString(key);
  },

  /* Boolean */
  setBoolean(key: string, value: boolean): void {
    mmkv.set(key, value);
  },
  getBoolean(key: string): boolean | undefined {
    return mmkv.getBoolean(key);
  },

  /* Number */
  setNumber(key: string, value: number): void {
    mmkv.set(key, value);
  },
  getNumber(key: string): number | undefined {
    return mmkv.getNumber(key);
  },

  /* JSON */
  setObject<T>(key: string, value: T): void {
    mmkv.set(key, JSON.stringify(value));
  },
  getObject<T>(key: string): T | undefined {
    const raw = mmkv.getString(key);
    if (raw == null) return undefined;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  },

  /* Maintenance */
  delete(key: string): void {
    mmkv.delete(key);
  },
  clearAll(): void {
    mmkv.clearAll();
  },
  contains(key: string): boolean {
    return mmkv.contains(key);
  },
  getAllKeys(): string[] {
    return mmkv.getAllKeys();
  },
};

export { mmkv };
