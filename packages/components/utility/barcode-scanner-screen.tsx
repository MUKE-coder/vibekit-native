import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/button';
import { ScreenHeader } from '../shared/screen-header';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export type BarcodeType =
  | 'qr'
  | 'ean13'
  | 'ean8'
  | 'code128'
  | 'code39'
  | 'pdf417'
  | 'aztec'
  | 'datamatrix'
  | 'upc_a'
  | 'upc_e'
  | 'itf14';

interface BarcodeScannerScreenProps {
  /** Called once with the first successful scan. The screen freezes the camera until you call `reset()`. */
  onScanned: (data: { value: string; type: string }, reset: () => void) => void;
  /** Called when the user dismisses without scanning. */
  onCancel?: () => void;
  /** Filter which barcode types to detect. Default: all common types. */
  barcodeTypes?: BarcodeType[];
  /** Title bar copy. */
  title?: string;
  /** Hint shown over the viewfinder. */
  hint?: string;
  /** Cooldown ms after a successful scan before another can register. Default 1500. */
  cooldownMs?: number;
  className?: string;
}

const DEFAULT_TYPES: BarcodeType[] = ['qr', 'ean13', 'ean8', 'code128', 'code39', 'pdf417', 'upc_a', 'upc_e'];

export function BarcodeScannerScreen({
  onScanned,
  onCancel,
  barcodeTypes = DEFAULT_TYPES,
  title = 'Scan',
  hint = 'Align the barcode inside the frame',
  cooldownMs = 1500,
  className,
}: BarcodeScannerScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = React.useState(false);
  const [torch, setTorch] = React.useState(false);
  const cooldownRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (cooldownRef.current) clearTimeout(cooldownRef.current);
    };
  }, []);

  function handleBarCodeScanned(result: BarcodeScanningResult) {
    if (scanned) return;
    setScanned(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});

    const reset = () => {
      cooldownRef.current = setTimeout(() => setScanned(false), cooldownMs);
    };

    onScanned({ value: result.data, type: result.type }, reset);
  }

  // 1. Permission still loading
  if (!permission) {
    return (
      <SafeAreaView className={cn('flex-1 bg-bg items-center justify-center', className)}>
        <ActivityIndicator color={colors.accent} />
      </SafeAreaView>
    );
  }

  // 2. Permission denied
  if (!permission.granted) {
    return (
      <SafeAreaView className={cn('flex-1 bg-bg', className)}>
        <ScreenHeader title={title} />
        <View className="flex-1 px-6 items-center justify-center">
          <Ionicons name="camera-outline" size={56} color={colors.textTertiary} />
          <Text className="mt-5 text-[18px] font-semibold text-textPrimary text-center">
            Camera access needed
          </Text>
          <Text className="mt-2 text-[14.5px] text-textSecondary text-center max-w-[280px]">
            We need camera permission to scan barcodes and QR codes. We don&apos;t store the camera feed.
          </Text>
          <View className="mt-6 self-stretch gap-2">
            <Button title="Grant camera permission" onPress={requestPermission} variant="primary" size="md" />
            {onCancel ? (
              <Button title="Cancel" onPress={onCancel} variant="ghost" size="md" />
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 3. Active scanning
  return (
    <View className={cn('flex-1 bg-black', className)}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        enableTorch={torch}
        barcodeScannerSettings={{ barcodeTypes }}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <SafeAreaView edges={['top', 'bottom']} className="flex-1">
          {/* Top bar */}
          <View className="flex-row items-center justify-between px-4 py-2">
            {onCancel ? (
              <Pressable
                onPress={onCancel}
                accessibilityLabel="Close scanner"
                hitSlop={12}
                className="h-10 w-10 items-center justify-center rounded-full bg-black/50"
              >
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </Pressable>
            ) : (
              <View />
            )}
            <Pressable
              onPress={() => setTorch((t) => !t)}
              accessibilityLabel={torch ? 'Turn flashlight off' : 'Turn flashlight on'}
              hitSlop={12}
              className="h-10 w-10 items-center justify-center rounded-full bg-black/50"
            >
              <Ionicons name={torch ? 'flash' : 'flash-off'} size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Centered viewfinder cutout */}
          <View className="flex-1 items-center justify-center">
            <View
              className="border-2 border-white/80 rounded-3xl"
              style={{ width: 260, height: 260 }}
            >
              {/* Corner brackets */}
              <CornerBracket position="tl" />
              <CornerBracket position="tr" />
              <CornerBracket position="bl" />
              <CornerBracket position="br" />
            </View>
          </View>

          {/* Bottom hint */}
          <View className="px-6 pb-6">
            <View className="self-center bg-black/60 rounded-full px-4 py-2.5">
              <Text className="text-white text-[13px] text-center">
                {scanned ? 'Scanned ✓' : hint}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

function CornerBracket({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base = 'absolute h-6 w-6 border-accent';
  const cls =
    position === 'tl'
      ? `${base} top-[-2px] left-[-2px] border-l-[3px] border-t-[3px] rounded-tl-2xl`
      : position === 'tr'
        ? `${base} top-[-2px] right-[-2px] border-r-[3px] border-t-[3px] rounded-tr-2xl`
        : position === 'bl'
          ? `${base} bottom-[-2px] left-[-2px] border-l-[3px] border-b-[3px] rounded-bl-2xl`
          : `${base} bottom-[-2px] right-[-2px] border-r-[3px] border-b-[3px] rounded-br-2xl`;
  return <View className={cls} />;
}
