import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';
import type { Currency } from '../lib/dgateway';

export interface SubscriptionPlan {
  id: number;
  name: string;
  amount: number;
  currency: Currency;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount?: number;
  trialDays?: number;
  features: string[];
  /** Highlight this plan (e.g., "Most popular"). */
  highlight?: boolean;
}

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  selected?: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
  className?: string;
}

function intervalLabel(p: SubscriptionPlan): string {
  const count = p.intervalCount ?? 1;
  const unit = p.interval + (count > 1 ? 's' : '');
  return count === 1 ? `per ${p.interval}` : `every ${count} ${unit}`;
}

export function SubscriptionPlanCard({
  plan,
  selected = false,
  onSelect,
  className,
}: SubscriptionPlanCardProps) {
  return (
    <Pressable
      onPress={() => onSelect(plan)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${plan.name} — ${plan.amount} ${plan.currency} ${intervalLabel(plan)}`}
      className={cn(
        'rounded-2xl p-5 border bg-bgElevated',
        selected ? 'border-accent' : 'border-border',
        plan.highlight && !selected && 'border-borderStrong',
        className,
      )}
    >
      {plan.highlight ? (
        <View className="self-start mb-3 px-2 py-0.5 rounded-full bg-accent/15">
          <Text className="text-accent text-[10px] uppercase tracking-widest font-semibold">
            Most popular
          </Text>
        </View>
      ) : null}

      <View className="flex-row items-center justify-between">
        <Text className="text-textPrimary text-[18px] font-semibold">{plan.name}</Text>
        {selected ? (
          <Ionicons name="checkmark-circle" size={22} color={colors.accent} />
        ) : (
          <View className="h-5 w-5 rounded-full border border-border" />
        )}
      </View>

      <View className="mt-3 flex-row items-baseline gap-1.5">
        <Text className="text-textPrimary text-[28px] font-bold">
          {plan.amount.toLocaleString()}
        </Text>
        <Text className="text-textSecondary text-[14px] font-medium">{plan.currency}</Text>
        <Text className="text-textTertiary text-[12.5px] ml-1">{intervalLabel(plan)}</Text>
      </View>

      {plan.trialDays ? (
        <Text className="mt-1 text-success text-[12px] font-medium">
          {plan.trialDays}-day free trial
        </Text>
      ) : null}

      {plan.features.length > 0 ? (
        <View className="mt-4 gap-2">
          {plan.features.map((f) => (
            <View key={f} className="flex-row items-start gap-2">
              <Ionicons name="checkmark" size={16} color={colors.accent} style={{ marginTop: 2 }} />
              <Text className="flex-1 text-textSecondary text-[13.5px] leading-snug">{f}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
}
