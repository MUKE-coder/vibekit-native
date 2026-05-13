import React from 'react';
import { View, Text, Pressable, ActivityIndicator, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/button';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export type UnlockMethod = 'biometric' | 'pin';

interface BiometricUnlockScreenProps {
  /** Called when the user is successfully authenticated. Receives the method used. */
  onUnlocked: (method: UnlockMethod) => void;
  /** Validates the user-entered PIN. Return true to unlock. */
  validatePin?: (pin: string) => boolean | Promise<boolean>;
  /** Length of the PIN. Default 4. */
  pinLength?: number;
  /** Called when the user wants to log out / use a different account. */
  onCancel?: () => void;
  /** Brand / app name shown above the prompt. */
  appName?: string;
  /** Custom prompt copy passed to the system biometric dialog. */
  promptMessage?: string;
  /** Skip the auto-prompt on mount (default: prompts immediately on iOS, requires tap on Android per UX guidelines). */
  noAutoPrompt?: boolean;
  className?: string;
}

export function BiometricUnlockScreen({
  onUnlocked,
  validatePin,
  pinLength = 4,
  onCancel,
  appName = 'this app',
  promptMessage,
  noAutoPrompt = false,
  className,
}: BiometricUnlockScreenProps) {
  const [supported, setSupported] = React.useState<{
    hardware: boolean;
    enrolled: boolean;
    types: LocalAuthentication.AuthenticationType[];
  } | null>(null);
  const [authenticating, setAuthenticating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pin, setPin] = React.useState('');
  const [pinError, setPinError] = React.useState<string | undefined>();
  const [validating, setValidating] = React.useState(false);
  const [usingPin, setUsingPin] = React.useState(false);
  const promptedRef = React.useRef(false);

  // Detect biometric support on mount
  React.useEffect(() => {
    (async () => {
      const hardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      setSupported({ hardware, enrolled, types });

      // Auto-prompt on iOS where the system dialog feels native; on Android wait for tap.
      if (
        !noAutoPrompt &&
        !promptedRef.current &&
        hardware &&
        enrolled &&
        Platform.OS === 'ios'
      ) {
        promptedRef.current = true;
        // Give the screen a beat to mount before launching the modal.
        setTimeout(promptBiometric, 200);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const biometricAvailable = !!(supported?.hardware && supported?.enrolled);

  const biometricLabel: string = (() => {
    if (!supported) return 'biometric';
    const t = supported.types;
    if (t.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return Platform.OS === 'ios' ? 'Face ID' : 'Face Unlock';
    }
    if (t.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint';
    }
    return 'biometric';
  })();

  const biometricIcon: keyof typeof Ionicons.glyphMap = (() => {
    if (!supported) return 'finger-print';
    const t = supported.types;
    if (t.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) return 'scan';
    return 'finger-print';
  })();

  async function promptBiometric() {
    if (authenticating) return;
    setAuthenticating(true);
    setError(null);
    try {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: promptMessage ?? `Unlock ${appName}`,
        fallbackLabel: validatePin ? 'Use PIN' : '',
        disableDeviceFallback: !validatePin, // if no PIN handler, let the system fall back
        cancelLabel: 'Cancel',
      });

      if (res.success) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        onUnlocked('biometric');
      } else if (res.error === 'user_fallback' && validatePin) {
        setUsingPin(true);
      } else if (res.error !== 'user_cancel' && res.error !== 'system_cancel' && res.error !== 'app_cancel') {
        setError('Authentication failed. Try again.');
      }
    } catch {
      setError('Could not start biometric prompt.');
    } finally {
      setAuthenticating(false);
    }
  }

  async function handlePinComplete(value: string) {
    if (!validatePin) return;
    setValidating(true);
    setPinError(undefined);
    try {
      const ok = await Promise.resolve(validatePin(value));
      if (ok) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        onUnlocked('pin');
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
        setPinError('Incorrect PIN');
        setPin('');
      }
    } finally {
      setValidating(false);
    }
  }

  // Loading hardware status
  if (!supported) {
    return (
      <SafeAreaView className={cn('flex-1 bg-bg items-center justify-center', className)}>
        <ActivityIndicator color={colors.accent} />
      </SafeAreaView>
    );
  }

  // PIN view (fallback or no biometric)
  if (usingPin || !biometricAvailable) {
    return (
      <SafeAreaView className={cn('flex-1 bg-bg', className)}>
        <View className="flex-1 px-6 items-center justify-center">
          <View className="h-20 w-20 rounded-full bg-bgElevated items-center justify-center mb-6">
            <Ionicons name="keypad" size={36} color={colors.textPrimary} />
          </View>
          <Text className="text-[22px] font-semibold text-textPrimary text-center">
            Enter your PIN
          </Text>
          <Text className="mt-2 text-[14.5px] text-textSecondary text-center">
            {biometricAvailable
              ? `Or use ${biometricLabel} again`
              : `Enter your ${pinLength}-digit PIN to unlock ${appName}`}
          </Text>

          <View className="mt-8 self-stretch items-center">
            <PinInput
              length={pinLength}
              value={pin}
              onChange={(v) => {
                setPin(v);
                setPinError(undefined);
                if (v.length === pinLength) handlePinComplete(v);
              }}
              error={!!pinError}
            />
            {pinError ? (
              <Text className="mt-3 text-error text-[13px]">{pinError}</Text>
            ) : null}
            {validating ? (
              <ActivityIndicator className="mt-3" color={colors.accent} />
            ) : null}
          </View>

          <View className="mt-10 self-stretch gap-2">
            {biometricAvailable ? (
              <Button title={`Use ${biometricLabel}`} onPress={() => { setUsingPin(false); promptBiometric(); }} variant="ghost" size="md" />
            ) : null}
            {onCancel ? (
              <Button title="Sign out" onPress={onCancel} variant="ghost" size="md" />
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Biometric view
  return (
    <SafeAreaView className={cn('flex-1 bg-bg', className)}>
      <View className="flex-1 px-6 items-center justify-center">
        <View className="h-28 w-28 rounded-full bg-bgElevated items-center justify-center mb-6">
          <Ionicons name={biometricIcon} size={56} color={colors.accent} />
        </View>
        <Text className="text-[22px] font-semibold text-textPrimary text-center">
          Unlock {appName}
        </Text>
        <Text className="mt-2 text-[14.5px] text-textSecondary text-center max-w-[280px]">
          Use {biometricLabel} to continue.
        </Text>

        {error ? (
          <Text className="mt-4 text-error text-[13px]">{error}</Text>
        ) : null}

        <Pressable
          onPress={promptBiometric}
          disabled={authenticating}
          accessibilityRole="button"
          accessibilityLabel={`Unlock with ${biometricLabel}`}
          className="mt-8 self-stretch h-14 rounded-xl bg-accent items-center justify-center flex-row gap-2"
        >
          {authenticating ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name={biometricIcon} size={20} color="#FFFFFF" />
              <Text className="text-white text-[15px] font-semibold">Unlock with {biometricLabel}</Text>
            </>
          )}
        </Pressable>

        <View className="mt-3 self-stretch gap-2">
          {validatePin ? (
            <Button title="Use PIN instead" onPress={() => setUsingPin(true)} variant="ghost" size="md" />
          ) : null}
          {onCancel ? (
            <Button title="Sign out" onPress={onCancel} variant="ghost" size="md" />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

/**
 * Hidden TextInput + visible filled-circle dots — the standard mobile PIN UX.
 * Tapping anywhere on the dot row focuses the (offscreen) input.
 */
function PinInput({
  length,
  value,
  onChange,
  error,
}: {
  length: number;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
}) {
  const inputRef = React.useRef<TextInput>(null);
  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      className="flex-row gap-3"
      accessibilityLabel={`PIN, ${length} digits`}
    >
      {Array.from({ length }).map((_, i) => {
        const filled = i < value.length;
        return (
          <View
            key={i}
            className={cn(
              'h-14 w-12 rounded-xl border-2 items-center justify-center',
              error
                ? 'border-error bg-error/10'
                : filled
                  ? 'border-accent bg-accent/5'
                  : 'border-border bg-bgElevated',
            )}
          >
            {filled ? <View className="h-2.5 w-2.5 rounded-full bg-accent" /> : null}
          </View>
        );
      })}
      <TextInput
        ref={inputRef}
        autoFocus
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        secureTextEntry
        maxLength={length}
        textContentType="password"
        // Visually hide but keep focusable
        style={{ position: 'absolute', opacity: 0, height: 1, width: 1 }}
      />
    </Pressable>
  );
}
