import React from 'react';
import { QueryClient, QueryClientProvider, focusManager, onlineManager } from '@tanstack/react-query';
import { AppState, type AppStateStatus, Platform } from 'react-native';
import * as Network from 'expo-network';

/**
 * VibeKit Native API client + provider.
 *
 * Wraps your app in a TanStack Query provider with sensible mobile defaults:
 *   - retries network errors with exponential backoff
 *   - refetches when the app comes back to the foreground
 *   - tracks online/offline state via expo-network
 *
 * Wire into your root `_layout.tsx`:
 *
 *   import { ApiProvider } from '@/components/lib/api-client';
 *
 *   export default function RootLayout() {
 *     return (
 *       <ApiProvider>
 *         <Slot />
 *       </ApiProvider>
 *     );
 *   }
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

interface ApiProviderProps {
  children: React.ReactNode;
}

export function ApiProvider({ children }: ApiProviderProps) {
  React.useEffect(() => {
    const sub = AppState.addEventListener('change', onAppStateChange);
    return () => sub.remove();
  }, []);

  React.useEffect(() => {
    return onlineManager.subscribe(() => {
      // no-op — we set onlineManager via the effect below
    });
  }, []);

  React.useEffect(() => {
    let mounted = true;

    const setOnlineFromNetwork = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        if (mounted) {
          onlineManager.setOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
        }
      } catch {
        // expo-network not available — assume online
        onlineManager.setOnline(true);
      }
    };

    setOnlineFromNetwork();
    const interval = setInterval(setOnlineFromNetwork, 30_000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export { queryClient };
