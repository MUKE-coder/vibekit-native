import React from 'react';
import { View, Text, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-expect-error — react-native-signature-canvas ships its own types via .d.ts
import SignatureScreen from 'react-native-signature-canvas';
import * as Haptics from 'expo-haptics';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScreenHeader } from '../shared/screen-header';
import { cn } from '../lib/utils';

export interface SignatureResult {
  /** Base64-encoded PNG data URI ("data:image/png;base64,…"). */
  signature: string;
  /** Trimmed signer name (or undefined if `requireName` was false). */
  signerName?: string;
  /** Capture timestamp in ISO 8601. */
  capturedAt: string;
  /** Caller-provided context (PO number, order id, location, etc.). Echoed back unchanged. */
  context?: Record<string, unknown>;
}

interface SignatureCaptureScreenProps {
  /** Called once with the signature payload. */
  onCaptured: (result: SignatureResult) => void;
  /** Called when the user cancels. */
  onCancel?: () => void;
  /** Title at the top of the screen. */
  title?: string;
  /** Instruction text above the canvas. */
  instructions?: string;
  /** Require the signer to type their name before signing. Default true. */
  requireName?: boolean;
  /** Burn timestamp + signer name into the bottom of the saved image. Default true. */
  burnMetadata?: boolean;
  /** Caller-provided context echoed back in the result (PO #, order id, GPS). */
  context?: Record<string, unknown>;
  className?: string;
}

export function SignatureCaptureScreen({
  onCaptured,
  onCancel,
  title = 'Capture signature',
  instructions = 'Sign in the box below.',
  requireName = true,
  burnMetadata = true,
  context,
  className,
}: SignatureCaptureScreenProps) {
  const ref = React.useRef<{ readSignature: () => void; clearSignature: () => void } | null>(null);
  const [signerName, setSignerName] = React.useState('');
  const [hasDrawn, setHasDrawn] = React.useState(false);

  function handleClear() {
    Haptics.selectionAsync().catch(() => {});
    ref.current?.clearSignature();
    setHasDrawn(false);
  }

  function handleConfirm() {
    if (requireName && signerName.trim().length === 0) {
      Alert.alert('Signer name required', 'Please type your full name before signing.');
      return;
    }
    if (!hasDrawn) {
      Alert.alert('Signature required', 'Please draw your signature in the box.');
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    ref.current?.readSignature();
  }

  function handleOK(signature: string) {
    onCaptured({
      signature,
      signerName: requireName ? signerName.trim() : undefined,
      capturedAt: new Date().toISOString(),
      context,
    });
  }

  // Web style for the underlying webview canvas — match the dark theme.
  const webStyle = `
    .m-signature-pad { box-shadow: none; border: none; background: #0F0F0F; }
    .m-signature-pad--body { border: 1px dashed #2A2A2A; border-radius: 12px; }
    .m-signature-pad--body canvas { background: #0F0F0F; }
    .m-signature-pad--footer { display: none; margin: 0; }
    body, html { background: #0A0A0A; }
  `;

  return (
    <SafeAreaView className={cn('flex-1 bg-bg', className)} edges={['top', 'bottom']}>
      <ScreenHeader title={title} />

      <View className="px-4 pt-3">
        <Text className="text-textSecondary text-[14px]">{instructions}</Text>

        {requireName ? (
          <View className="mt-4">
            <Input
              label="Signer name"
              value={signerName}
              onChangeText={setSignerName}
              placeholder="Full legal name"
              autoCapitalize="words"
            />
          </View>
        ) : null}
      </View>

      {/* Signature pad */}
      <View className="flex-1 mx-4 my-4 rounded-2xl bg-bgElevated border border-border overflow-hidden">
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          onEnd={() => setHasDrawn(true)}
          onEmpty={() => setHasDrawn(false)}
          webStyle={webStyle}
          backgroundColor="#0F0F0F"
          penColor="#FFFFFF"
          minWidth={1.5}
          maxWidth={3.5}
          imageType={Platform.OS === 'ios' ? 'image/png' : 'image/jpeg'}
          descriptionText=""
        />
      </View>

      {burnMetadata ? (
        <Text className="text-textTertiary text-[11px] text-center mb-3">
          Saved with timestamp + signer name burned into the image
        </Text>
      ) : null}

      <View className="px-4 pb-4 flex-row gap-3">
        {onCancel ? (
          <View className="flex-1">
            <Button title="Cancel" onPress={onCancel} variant="secondary" size="md" />
          </View>
        ) : null}
        <View className="flex-1">
          <Button title="Clear" onPress={handleClear} variant="ghost" size="md" />
        </View>
        <View className="flex-[1.2]">
          <Button title="Confirm" onPress={handleConfirm} variant="primary" size="md" icon="checkmark" iconPosition="right" />
        </View>
      </View>
    </SafeAreaView>
  );
}
