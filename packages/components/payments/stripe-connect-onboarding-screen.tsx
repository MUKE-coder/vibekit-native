import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../ui/button';
import { ScreenHeader } from '../shared/screen-header';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

/**
 * Stripe Connect Express onboarding wizard for marketplaces, LMS instructors,
 * multi-vendor commerce. Five conceptual steps; the actual KYC fields live
 * in Stripe's hosted onboarding (opened via expo-web-browser) — we wrap it
 * with a clear pre-flight + status-polling UX.
 *
 * Backend contract:
 *   POST /api/connect/onboarding/start  → { accountId, onboardingUrl }
 *     Server creates a Stripe Account (Express, country, capabilities) +
 *     an Account Link with refresh_url + return_url pointing back to the
 *     app's deep link.
 *
 *   GET  /api/connect/onboarding/status → {
 *     accountId, chargesEnabled, payoutsEnabled, detailsSubmitted,
 *     requirementsCurrentlyDue: string[], state: 'pending' | 'in_review' |
 *     'active' | 'restricted'
 *   }
 *     Mobile polls this every 5s while the in-app browser is open and
 *     once on return; backend reflects the latest from
 *     stripe.accounts.retrieve(accountId).
 *
 *   POST /api/connect/onboarding/payout-method → { type: 'mobile_money' | 'bank',
 *     phoneNumber?, accountNumber?, currency? }
 *     For East African sellers: route payouts through DGateway mobile money
 *     instead of Stripe's own payout rails.
 *
 * Live docs:
 *   https://stripe.com/docs/connect/express-accounts
 *   https://stripe.com/docs/connect/account-links
 */

export type ConnectState = 'pending' | 'in_review' | 'active' | 'restricted';

export interface ConnectStatus {
  accountId?: string;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  requirementsCurrentlyDue?: string[];
  state: ConnectState;
}

export type PayoutMethod = 'mobile_money' | 'stripe_bank';

interface StripeConnectOnboardingScreenProps {
  /** Current onboarding status — supplied by the parent (poll your /api/connect/onboarding/status). */
  status?: ConnectStatus;
  /** Called when the user clicks Start onboarding. Should hit your /api/connect/onboarding/start route. */
  onStart: () => Promise<{ accountId: string; onboardingUrl: string }>;
  /** Called when the user picks a payout method. */
  onSelectPayoutMethod?: (method: PayoutMethod) => Promise<void>;
  /** Called when the user finishes the wizard (status.state === 'active'). */
  onComplete?: (status: ConnectStatus) => void;
  /** Manually refresh the status from the backend. Called on return from web browser. */
  onRefreshStatus?: () => Promise<void>;
  /** Hide the mobile-money payout option (e.g., for non-EA markets). */
  hideMobileMoneyPayout?: boolean;
  title?: string;
  className?: string;
}

interface Step {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const STEPS: Step[] = [
  { id: 'business',  title: 'Business info',     description: 'Your business name, type, and contact details.',  icon: 'briefcase-outline' },
  { id: 'address',   title: 'Address',           description: 'Where your business is registered.',              icon: 'location-outline' },
  { id: 'identity',  title: 'Identity',          description: 'A government ID for KYC verification.',           icon: 'card-outline' },
  { id: 'payout',    title: 'Payout method',     description: 'How you want to receive your earnings.',          icon: 'wallet-outline' },
  { id: 'review',    title: 'Stripe review',     description: 'Stripe checks everything (usually under 24h).',   icon: 'shield-checkmark-outline' },
];

export function StripeConnectOnboardingScreen({
  status,
  onStart,
  onSelectPayoutMethod,
  onComplete,
  onRefreshStatus,
  hideMobileMoneyPayout = false,
  title = 'Become a seller',
  className,
}: StripeConnectOnboardingScreenProps) {
  const [starting, setStarting] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedPayout, setSelectedPayout] = React.useState<PayoutMethod | null>(null);
  const completedRef = React.useRef(false);

  React.useEffect(() => {
    if (status?.state === 'active' && !completedRef.current) {
      completedRef.current = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      onComplete?.(status);
    }
  }, [status, onComplete]);

  // Map status → completed step count for the progress bar.
  const completedSteps = React.useMemo(() => {
    if (!status) return 0;
    if (status.state === 'active') return STEPS.length;
    if (status.payoutsEnabled) return 4;
    if (selectedPayout) return 3;
    if (status.detailsSubmitted) return 3;
    if (status.accountId) return 1;
    return 0;
  }, [status, selectedPayout]);

  const progress = completedSteps / STEPS.length;

  async function handleStart() {
    setStarting(true);
    try {
      const { onboardingUrl } = await onStart();
      Haptics.selectionAsync().catch(() => {});
      // Open Stripe's hosted onboarding in an in-app browser (handles 3DS, doc upload, etc.).
      await WebBrowser.openBrowserAsync(onboardingUrl, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
        controlsColor: colors.accent,
        toolbarColor: colors.bg,
      });
      // On dismiss, poll status once.
      await handleRefresh();
    } catch (err) {
      Alert.alert('Could not start onboarding', (err as Error).message ?? 'Try again.');
    } finally {
      setStarting(false);
    }
  }

  async function handleRefresh() {
    if (!onRefreshStatus) return;
    setRefreshing(true);
    try {
      await onRefreshStatus();
    } finally {
      setRefreshing(false);
    }
  }

  async function handleSelectPayout(method: PayoutMethod) {
    if (!onSelectPayoutMethod) return;
    setSelectedPayout(method);
    Haptics.selectionAsync().catch(() => {});
    try {
      await onSelectPayoutMethod(method);
    } catch (err) {
      Alert.alert('Could not save payout method', (err as Error).message ?? 'Try again.');
      setSelectedPayout(null);
    }
  }

  const isActive = status?.state === 'active';
  const isRestricted = status?.state === 'restricted';
  const isInReview = status?.state === 'in_review';

  return (
    <SafeAreaView edges={['top']} className={cn('flex-1 bg-bg', className)}>
      <ScreenHeader title={title} />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Progress bar */}
        <View className="rounded-2xl bg-bgElevated border border-border p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-textTertiary text-[11px] uppercase tracking-widest font-medium">
              Step {Math.min(completedSteps + 1, STEPS.length)} of {STEPS.length}
            </Text>
            <Text className="text-textSecondary text-[12.5px]">
              {Math.round(progress * 100)}% complete
            </Text>
          </View>
          <View className="mt-2 h-1.5 rounded-full bg-bgSubtle overflow-hidden">
            <View
              className="h-full bg-accent rounded-full"
              style={{ width: `${Math.max(progress * 100, 4)}%` }}
            />
          </View>
        </View>

        {/* Steps */}
        <View className="mt-5 gap-3">
          {STEPS.map((step, i) => {
            const isComplete = i < completedSteps;
            const isCurrent = i === completedSteps && !isActive;
            return (
              <View
                key={step.id}
                className={cn(
                  'rounded-2xl border p-4 flex-row items-start gap-3',
                  isComplete
                    ? 'bg-success/5 border-success/30'
                    : isCurrent
                      ? 'bg-accent/5 border-accent/40'
                      : 'bg-bgElevated border-border',
                )}
              >
                <View
                  className={cn(
                    'h-9 w-9 rounded-full items-center justify-center',
                    isComplete ? 'bg-success' : isCurrent ? 'bg-accent' : 'bg-bgSubtle',
                  )}
                >
                  <Ionicons
                    name={isComplete ? 'checkmark' : step.icon}
                    size={isComplete ? 18 : 16}
                    color={isComplete || isCurrent ? '#FFFFFF' : colors.textSecondary}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-textPrimary text-[14.5px] font-semibold">
                    {step.title}
                  </Text>
                  <Text className="text-textSecondary text-[12.5px] mt-0.5">
                    {step.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Active state */}
        {isActive ? (
          <View className="mt-6 rounded-2xl bg-success/10 border border-success/30 p-5">
            <View className="flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={22} color={colors.success} />
              <Text className="text-success text-[16px] font-semibold">You&apos;re all set</Text>
            </View>
            <Text className="text-textSecondary text-[13.5px] mt-2 leading-relaxed">
              Your account is verified. You can now receive payments and payouts.
            </Text>
          </View>
        ) : isRestricted ? (
          <View className="mt-6 rounded-2xl bg-error/10 border border-error/30 p-5">
            <View className="flex-row items-center gap-2">
              <Ionicons name="alert-circle" size={22} color={colors.error} />
              <Text className="text-error text-[16px] font-semibold">Account restricted</Text>
            </View>
            <Text className="text-textSecondary text-[13.5px] mt-2 leading-relaxed">
              Stripe needs more information. Open onboarding to resolve the requirements.
            </Text>
            {status?.requirementsCurrentlyDue?.length ? (
              <View className="mt-3">
                {status.requirementsCurrentlyDue.slice(0, 5).map((r) => (
                  <Text key={r} className="text-textTertiary text-[12px]">
                    • {r}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        ) : isInReview ? (
          <View className="mt-6 rounded-2xl bg-warning/10 border border-warning/30 p-5">
            <View className="flex-row items-center gap-2">
              <Ionicons name="time-outline" size={22} color={colors.warning} />
              <Text className="text-warning text-[16px] font-semibold">Under review</Text>
            </View>
            <Text className="text-textSecondary text-[13.5px] mt-2 leading-relaxed">
              Stripe is reviewing your information. This usually takes under 24 hours. We&apos;ll notify you when you&apos;re approved.
            </Text>
          </View>
        ) : null}

        {/* Payout method picker — only show once Stripe details are submitted */}
        {!isActive && status?.detailsSubmitted && !hideMobileMoneyPayout && onSelectPayoutMethod ? (
          <View className="mt-6">
            <Text className="text-textTertiary text-[11px] uppercase tracking-widest font-medium mb-2">
              Pick your payout method
            </Text>
            <View className="gap-2">
              <PayoutOption
                label="Mobile money"
                description="Faster payouts via DGateway (UGX, KES, TZS, RWF)"
                icon="phone-portrait-outline"
                selected={selectedPayout === 'mobile_money'}
                onPress={() => handleSelectPayout('mobile_money')}
              />
              <PayoutOption
                label="Bank transfer"
                description="Stripe's standard payout schedule"
                icon="card-outline"
                selected={selectedPayout === 'stripe_bank'}
                onPress={() => handleSelectPayout('stripe_bank')}
              />
            </View>
          </View>
        ) : null}

        {/* Actions */}
        <View className="mt-8 gap-2">
          {!isActive ? (
            <Button
              title={status?.accountId ? 'Continue onboarding' : 'Start onboarding'}
              onPress={handleStart}
              loading={starting}
              icon="open-outline"
              iconPosition="right"
              variant="primary"
              size="lg"
            />
          ) : null}
          {onRefreshStatus && !isActive ? (
            <Button
              title="Check status"
              onPress={handleRefresh}
              loading={refreshing}
              variant="secondary"
              size="md"
            />
          ) : null}
          {refreshing && !status ? (
            <View className="items-center mt-2">
              <ActivityIndicator color={colors.accent} />
            </View>
          ) : null}
        </View>

        <Text className="mt-6 text-textTertiary text-[11.5px] text-center leading-relaxed">
          Onboarding is hosted by Stripe — your KYC documents go directly to them and never touch this app.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function PayoutOption({
  label,
  description,
  icon,
  selected,
  onPress,
}: {
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <View
      className={cn(
        'rounded-xl p-4 border flex-row items-center',
        selected ? 'bg-accent/8 border-accent' : 'bg-bgElevated border-border',
      )}
      onTouchEnd={onPress}
    >
      <View
        className={cn(
          'h-10 w-10 rounded-lg items-center justify-center mr-3',
          selected ? 'bg-accent/15' : 'bg-bgSubtle',
        )}
      >
        <Ionicons name={icon} size={20} color={selected ? colors.accent : colors.textSecondary} />
      </View>
      <View className="flex-1">
        <Text className={cn('text-[14px] font-semibold', selected ? 'text-accent' : 'text-textPrimary')}>
          {label}
        </Text>
        <Text className="text-textTertiary text-[12px] mt-0.5">{description}</Text>
      </View>
      <View
        className={cn(
          'h-5 w-5 rounded-full border-2 items-center justify-center',
          selected ? 'border-accent' : 'border-border',
        )}
      >
        {selected ? <View className="h-2 w-2 rounded-full bg-accent" /> : null}
      </View>
    </View>
  );
}
