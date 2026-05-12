import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

/**
 * VibeKit Native — push notification registration.
 *
 * Wires expo-notifications to register an Expo Push Token with YOUR
 * backend after the user signs in. Designed to be:
 *   - Safe on simulators (Device.isDevice guard)
 *   - Idempotent (your backend should dedupe by (userId, token))
 *   - Polite (asks for permission AFTER sign-in, not on cold start —
 *     Apple rejects apps that demand permission immediately)
 *   - Configurable (foreground behaviour, channel id, backend endpoint)
 *
 * Backend contract:
 *   POST /api/push/register
 *   Body: { token: string, platform: 'iOS' | 'Android' | string, deviceId?: string }
 *   The backend dedupes by (userId, token) and stores against the
 *   signed-in user (Better Auth session).
 *
 * Usage:
 *
 *   // app/(tabs)/_layout.tsx (or wherever the user is signed in)
 *   import { usePushNotifications } from '@/components/lib/push-notifications';
 *
 *   export default function TabsLayout() {
 *     usePushNotifications({ endpoint: '/api/push/register' });
 *     return <Tabs ... />;
 *   }
 *
 * Foreground behaviour: by default, notifications received while the app
 * is open show as a banner. Override via Notifications.setNotificationHandler
 * if you want silent foreground notifications (e.g., for chat where the
 * app already shows the new message inline).
 */

// Show notifications even when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface UsePushNotificationsOptions {
  /** Backend endpoint to register the token with. Default: /api/push/register */
  endpoint?: string;
  /** Skip the permission request + registration (e.g., user is signed out). */
  enabled?: boolean;
  /** Android notification channel id. Default: 'default'. */
  channelId?: string;
  /** Callback when a notification arrives in the foreground. */
  onNotificationReceived?: (notification: Notifications.Notification) => void;
  /** Callback when the user taps a notification (in any state). */
  onNotificationTapped?: (response: Notifications.NotificationResponse) => void;
}

export function usePushNotifications({
  endpoint = '/api/push/register',
  enabled = true,
  channelId = 'default',
  onNotificationReceived,
  onNotificationTapped,
}: UsePushNotificationsOptions = {}): void {
  const registeredRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (registeredRef.current) return;

    (async () => {
      if (!Device.isDevice) return; // simulators can't receive push

      // Android: set up the default notification channel before requesting
      // permission, otherwise notifications are silent.
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(channelId, {
          name: 'Default',
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const existing = await Notifications.getPermissionsAsync();
      let status = existing.status;
      if (status !== 'granted') {
        const requested = await Notifications.requestPermissionsAsync();
        status = requested.status;
      }
      if (status !== 'granted') return;

      // Get the Expo push token (requires expo.extra.eas.projectId for
      // production builds — set automatically by `eas init`).
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;

      const tokenResponse = projectId
        ? await Notifications.getExpoPushTokenAsync({ projectId })
        : await Notifications.getExpoPushTokenAsync();
      const token = tokenResponse.data;

      const apiUrl =
        Constants.expoConfig?.extra?.apiUrl ??
        process.env.EXPO_PUBLIC_API_URL ??
        'http://localhost:3000';

      try {
        await fetch(`${apiUrl.replace(/\/$/, '')}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            platform: Device.osName ?? Platform.OS,
            deviceId: Device.modelName ?? null,
          }),
        });
        registeredRef.current = true;
      } catch {
        // Backend unreachable — silent fail. Will retry on next mount.
      }
    })();
  }, [enabled, endpoint, channelId]);

  // Listen for incoming notifications (foreground + tap)
  useEffect(() => {
    if (!onNotificationReceived && !onNotificationTapped) return;

    const received = onNotificationReceived
      ? Notifications.addNotificationReceivedListener(onNotificationReceived)
      : null;
    const tapped = onNotificationTapped
      ? Notifications.addNotificationResponseReceivedListener(onNotificationTapped)
      : null;

    return () => {
      received?.remove();
      tapped?.remove();
    };
  }, [onNotificationReceived, onNotificationTapped]);
}
