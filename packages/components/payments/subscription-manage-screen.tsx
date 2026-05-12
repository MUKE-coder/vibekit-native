import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScreenHeader } from '../shared/screen-header';
import { colors } from '../lib/theme';
import { dgateway, type Currency, type SubscriptionState } from '../lib/dgateway';

export interface ActiveSubscription {
  id: number | string;
  planName: string;
  amount: number;
  currency: Currency;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount?: number;
  state: SubscriptionState;
  nextChargeAt?: string;
  trialEndsAt?: string;
  cancelledAt?: string;
  paymentMethodLast4?: string;
  paymentMethodLabel?: string;
}

interface SubscriptionManageScreenProps {
  subscription: ActiveSubscription;
  onCancelled?: (subscriptionId: ActiveSubscription['id']) => void;
  onPayNow?: () => void;
  title?: string;
}

const STATE_TO_VARIANT: Record<SubscriptionState, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  trialing: 'info',
  active: 'success',
  past_due: 'warning',
  cancelled: 'neutral',
  expired: 'error',
};

const STATE_LABEL: Record<SubscriptionState, string> = {
  trialing: 'Trialing',
  active: 'Active',
  past_due: 'Payment due',
  cancelled: 'Cancelled',
  expired: 'Expired',
};

function formatDate(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function SubscriptionManageScreen({
  subscription,
  onCancelled,
  onPayNow,
  title = 'Your subscription',
}: SubscriptionManageScreenProps) {
  const [cancelling, setCancelling] = React.useState(false);

  function confirmCancel() {
    Alert.alert(
      'Cancel subscription?',
      `You'll keep access until ${formatDate(subscription.nextChargeAt)}. After that, the subscription ends.`,
      [
        { text: 'Keep subscription', style: 'cancel' },
        {
          text: 'Cancel subscription',
          style: 'destructive',
          onPress: handleCancel,
        },
      ],
    );
  }

  async function handleCancel() {
    setCancelling(true);
    try {
      await dgateway.cancelSubscription(subscription.id);
      onCancelled?.(subscription.id);
    } catch (err) {
      Alert.alert('Could not cancel', (err as Error).message || 'Please try again.');
    } finally {
      setCancelling(false);
    }
  }

  const intervalUnit = subscription.intervalCount && subscription.intervalCount > 1
    ? `${subscription.intervalCount} ${subscription.interval}s`
    : subscription.interval;

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title={title} />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Plan card */}
        <View className="rounded-2xl bg-bgElevated border border-border p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-textPrimary text-[18px] font-semibold">
              {subscription.planName}
            </Text>
            <Badge
              label={STATE_LABEL[subscription.state]}
              variant={STATE_TO_VARIANT[subscription.state]}
            />
          </View>

          <View className="mt-3 flex-row items-baseline gap-1.5">
            <Text className="text-textPrimary text-[28px] font-bold">
              {subscription.amount.toLocaleString()}
            </Text>
            <Text className="text-textSecondary text-[14px] font-medium">
              {subscription.currency}
            </Text>
            <Text className="text-textTertiary text-[13px] ml-1">
              every {intervalUnit}
            </Text>
          </View>
        </View>

        {/* Past-due banner */}
        {subscription.state === 'past_due' ? (
          <View className="mt-4 rounded-xl border border-warning bg-warningLight p-4">
            <View className="flex-row items-start gap-3">
              <Ionicons name="warning" size={20} color={colors.warning} style={{ marginTop: 1 }} />
              <View className="flex-1">
                <Text className="text-warning text-[14px] font-semibold">
                  Your last payment didn&apos;t go through
                </Text>
                <Text className="text-textSecondary text-[13px] mt-1 leading-snug">
                  Pay now to keep your subscription active. We&apos;ll retry automatically before
                  cancelling.
                </Text>
                <View className="mt-3 self-start">
                  <Button title="Pay now" onPress={() => onPayNow?.()} size="sm" />
                </View>
              </View>
            </View>
          </View>
        ) : null}

        {/* Details rows */}
        <View className="mt-4 rounded-2xl bg-bgElevated border border-border">
          <DetailRow
            icon="calendar-outline"
            label="Next charge"
            value={formatDate(subscription.nextChargeAt)}
          />
          <Divider />
          {subscription.trialEndsAt ? (
            <>
              <DetailRow
                icon="hourglass-outline"
                label="Trial ends"
                value={formatDate(subscription.trialEndsAt)}
              />
              <Divider />
            </>
          ) : null}
          {subscription.paymentMethodLabel ? (
            <>
              <DetailRow
                icon="card-outline"
                label="Payment method"
                value={
                  subscription.paymentMethodLast4
                    ? `${subscription.paymentMethodLabel} ···· ${subscription.paymentMethodLast4}`
                    : subscription.paymentMethodLabel
                }
              />
              <Divider />
            </>
          ) : null}
          <DetailRow
            icon="receipt-outline"
            label="Subscription ID"
            value={String(subscription.id)}
            mono
          />
        </View>

        {/* Cancel action */}
        {subscription.state !== 'cancelled' && subscription.state !== 'expired' ? (
          <View className="mt-6">
            <Button
              title={cancelling ? 'Cancelling…' : 'Cancel subscription'}
              variant="destructive"
              onPress={confirmCancel}
              loading={cancelling}
              size="md"
            />
          </View>
        ) : (
          <View className="mt-6 rounded-xl bg-bgElevated border border-border p-4">
            <Text className="text-textSecondary text-[13.5px] leading-relaxed text-center">
              This subscription ended on {formatDate(subscription.cancelledAt)}. Subscribe again to
              restore access.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3.5">
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={18} color={colors.textTertiary} />
        <Text className="text-textSecondary text-[13.5px]">{label}</Text>
      </View>
      <Text
        className={['text-textPrimary text-[13.5px]', mono ? 'font-mono text-[12px]' : ''].join(' ')}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return <View className="h-px bg-border mx-4" />;
}
