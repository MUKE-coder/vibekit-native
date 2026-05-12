import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/button';
import { ScreenHeader } from '../shared/screen-header';
import { colors } from '../lib/theme';
import { usePaymentStatus } from './use-payment-status';
import {
  type PaymentStatusResponse,
  isTerminalStatus,
  statusLabel,
} from '../lib/dgateway';

interface PaymentStatusScreenProps {
  reference: string;
  onSuccess: (status: PaymentStatusResponse) => void;
  onFailure: (status: PaymentStatusResponse | null, reason: 'failed' | 'cancelled' | 'expired' | 'timeout') => void;
  onCancel?: () => void;
  title?: string;
}

export function PaymentStatusScreen({
  reference,
  onSuccess,
  onFailure,
  onCancel,
  title = 'Confirm payment',
}: PaymentStatusScreenProps) {
  const { status, data, isPolling, timedOut, cancel } = usePaymentStatus({
    reference,
    onTerminal: (res) => {
      if (res.status === 'completed') {
        onSuccess(res);
      } else if (res.status === 'failed' || res.status === 'cancelled' || res.status === 'expired') {
        onFailure(res, res.status);
      }
    },
  });

  React.useEffect(() => {
    if (timedOut) {
      onFailure(data, 'timeout');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timedOut]);

  const isTerminal = isTerminalStatus(status);
  const showSpinner = !isTerminal && !timedOut;

  function handleCancel() {
    cancel();
    onCancel?.();
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title={title} />

      <View className="flex-1 px-6 items-center justify-center">
        {/* Phone icon with pulsing ring */}
        <View className="h-28 w-28 rounded-full bg-bgElevated border border-border items-center justify-center">
          {showSpinner ? (
            <Ionicons name="phone-portrait-outline" size={44} color={colors.accent} />
          ) : status === 'completed' ? (
            <Ionicons name="checkmark-circle" size={56} color={colors.success} />
          ) : (
            <Ionicons name="close-circle" size={56} color={colors.error} />
          )}
        </View>

        <Text className="mt-8 text-textPrimary text-[20px] font-semibold text-center">
          {showSpinner ? 'Check your phone' : statusLabel(status)}
        </Text>
        <Text className="mt-2 text-textSecondary text-[14.5px] leading-relaxed text-center max-w-[300px]">
          {showSpinner
            ? 'Approve the prompt on your mobile money app to complete this payment.'
            : status === 'completed'
              ? `${data?.amount.toLocaleString() ?? ''} ${data?.currency ?? ''} received successfully.`
              : 'You can retry the payment from the previous screen.'}
        </Text>

        {showSpinner ? (
          <View className="mt-8 flex-row items-center gap-3">
            <ActivityIndicator color={colors.accent} />
            <Text className="font-mono text-[12px] text-textTertiary">
              {isPolling ? 'Waiting for confirmation…' : 'Checking…'}
            </Text>
          </View>
        ) : null}

        {/* Reference footer */}
        <View className="mt-10 self-stretch border-t border-border pt-4">
          <Text className="text-textTertiary text-[11px] uppercase tracking-widest text-center">
            Reference
          </Text>
          <Text className="mt-1 font-mono text-[12px] text-textSecondary text-center" selectable>
            {reference}
          </Text>
        </View>
      </View>

      {/* Cancel button — only while polling */}
      {showSpinner ? (
        <View className="px-4 pb-6">
          <Button
            title="Cancel"
            onPress={handleCancel}
            variant="secondary"
            size="md"
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
