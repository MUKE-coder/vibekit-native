import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

interface StatCardProps {
  label: string;
  value: string | number;
  /** Sub-value shown next to the main value (e.g. currency). */
  unit?: string;
  /** Optional delta vs prior period — positive = up. */
  delta?: number;
  deltaLabel?: string;
  /** Optional sparkline data points (0..1 normalised). */
  sparkline?: number[];
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  /** Visual emphasis variant. */
  variant?: 'default' | 'accent';
  className?: string;
}

export function StatCard({
  label,
  value,
  unit,
  delta,
  deltaLabel = 'vs last period',
  sparkline,
  icon,
  onPress,
  variant = 'default',
  className,
}: StatCardProps) {
  const isUp = typeof delta === 'number' && delta > 0;
  const isDown = typeof delta === 'number' && delta < 0;
  const deltaColor = isUp ? colors.success : isDown ? colors.error : colors.textTertiary;

  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${label}: ${value}${unit ? ' ' + unit : ''}`}
      className={cn(
        'rounded-2xl p-4 border bg-bgElevated',
        variant === 'accent' ? 'border-accent/40' : 'border-border',
        className,
      )}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-textTertiary text-[11.5px] uppercase tracking-widest font-medium">
          {label}
        </Text>
        {icon ? (
          <View className="h-8 w-8 rounded-lg items-center justify-center bg-bgSubtle">
            <Ionicons name={icon} size={16} color={variant === 'accent' ? colors.accent : colors.textSecondary} />
          </View>
        ) : null}
      </View>

      <View className="mt-2 flex-row items-baseline gap-1.5">
        <Text className="text-textPrimary text-[26px] font-bold tabular-nums">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Text>
        {unit ? (
          <Text className="text-textSecondary text-[13px] font-medium">{unit}</Text>
        ) : null}
      </View>

      {typeof delta === 'number' || sparkline?.length ? (
        <View className="mt-2 flex-row items-center justify-between">
          {typeof delta === 'number' ? (
            <View className="flex-row items-center gap-1">
              <Ionicons
                name={isUp ? 'trending-up' : isDown ? 'trending-down' : 'remove'}
                size={14}
                color={deltaColor}
              />
              <Text className="text-[12px] font-semibold" style={{ color: deltaColor }}>
                {delta > 0 ? '+' : ''}{delta.toFixed(1)}%
              </Text>
              <Text className="text-textTertiary text-[11px] ml-1">{deltaLabel}</Text>
            </View>
          ) : (
            <View />
          )}
          {sparkline && sparkline.length > 1 ? (
            <Sparkline data={sparkline} color={isDown ? colors.error : colors.accent} />
          ) : null}
        </View>
      ) : null}
    </Container>
  );
}

/** Tiny SVG-free sparkline using View bars. ~32px wide. */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data, 1);
  return (
    <View className="flex-row items-end gap-[2px] h-5">
      {data.map((v, i) => (
        <View
          key={i}
          style={{
            width: 3,
            height: Math.max(2, (v / max) * 20),
            backgroundColor: color,
            opacity: 0.4 + (i / data.length) * 0.6,
            borderRadius: 1.5,
          }}
        />
      ))}
    </View>
  );
}
