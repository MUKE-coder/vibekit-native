import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export interface PieSlice {
  value: number;
  label: string;
  /** Optional color override — defaults to a rotating accent palette. */
  color?: string;
}

interface ChartPieProps {
  data: PieSlice[];
  title?: string;
  subtitle?: string;
  /** Donut variant (centered total or label). */
  donut?: boolean;
  /** Donut center label override — falls back to the sum. */
  centerLabel?: string;
  /** Donut center sub-label. */
  centerSubLabel?: string;
  /** Show right-side legend. */
  showLegend?: boolean;
  size?: number;
  className?: string;
}

const PALETTE = [
  colors.accent,
  '#34D399',  // emerald
  '#F59E0B',  // amber
  '#F87171',  // rose
  '#60A5FA',  // sky
  '#A78BFA',  // violet
  '#FBBF24',  // yellow
  '#22D3EE',  // cyan
];

export function ChartPie({
  data,
  title,
  subtitle,
  donut = true,
  centerLabel,
  centerSubLabel,
  showLegend = true,
  size = 180,
  className,
}: ChartPieProps) {
  const total = data.reduce((sum, s) => sum + s.value, 0);

  const decorated = data.map((s, i) => ({
    ...s,
    color: s.color ?? PALETTE[i % PALETTE.length],
  }));

  return (
    <View className={cn('rounded-2xl border border-border bg-bgElevated p-4', className)}>
      {(title || subtitle) ? (
        <View className="mb-3">
          {title ? (
            <Text className="text-textPrimary text-[15px] font-semibold">{title}</Text>
          ) : null}
          {subtitle ? (
            <Text className="text-textTertiary text-[12.5px] mt-0.5">{subtitle}</Text>
          ) : null}
        </View>
      ) : null}

      <View className="flex-row items-center gap-5">
        <PieChart
          data={decorated}
          donut={donut}
          innerRadius={donut ? size * 0.32 : 0}
          radius={size / 2}
          innerCircleColor={colors.bgElevated}
          centerLabelComponent={
            donut
              ? () => (
                  <View className="items-center">
                    <Text className="text-textPrimary text-[20px] font-bold">
                      {centerLabel ?? total.toLocaleString()}
                    </Text>
                    {centerSubLabel ? (
                      <Text className="text-textTertiary text-[11px]">{centerSubLabel}</Text>
                    ) : null}
                  </View>
                )
              : undefined
          }
        />

        {showLegend ? (
          <View className="flex-1 gap-2">
            {decorated.map((slice) => {
              const pct = total > 0 ? Math.round((slice.value / total) * 100) : 0;
              return (
                <View key={slice.label} className="flex-row items-center gap-2.5">
                  <View
                    style={{ backgroundColor: slice.color, width: 10, height: 10, borderRadius: 3 }}
                  />
                  <Text className="flex-1 text-textSecondary text-[12.5px]" numberOfLines={1}>
                    {slice.label}
                  </Text>
                  <Text className="text-textPrimary text-[12.5px] font-semibold tabular-nums">
                    {pct}%
                  </Text>
                </View>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}
