import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export interface BarItem {
  label: string;
  value: number;
  /** Per-bar color override (defaults to accent). */
  frontColor?: string;
  /** Tooltip text. */
  topLabelComponent?: () => React.ReactElement;
}

interface ChartBarProps {
  data: BarItem[];
  title?: string;
  subtitle?: string;
  height?: number;
  /** Show value labels on top of each bar. */
  showValues?: boolean;
  /** Rotate x-axis labels for long names. */
  rotateLabels?: boolean;
  /** Force Y ceiling. */
  maxValue?: number;
  className?: string;
}

export function ChartBar({
  data,
  title,
  subtitle,
  height = 200,
  showValues = false,
  rotateLabels = false,
  maxValue,
  className,
}: ChartBarProps) {
  const decorated = data.map((d) => ({
    ...d,
    frontColor: d.frontColor ?? colors.accent,
    topLabelComponent: showValues
      ? () => (
          <Text style={{ color: colors.textSecondary, fontSize: 9, marginBottom: 2 }}>
            {d.value.toLocaleString()}
          </Text>
        )
      : d.topLabelComponent,
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

      <BarChart
        data={decorated}
        height={height}
        barWidth={Math.max(16, 240 / Math.max(1, data.length))}
        spacing={12}
        roundedTop
        roundedBottom={false}
        yAxisColor="transparent"
        xAxisColor={colors.border}
        rulesColor={colors.border}
        rulesType="solid"
        yAxisTextStyle={{ color: colors.textTertiary, fontSize: 10 }}
        xAxisLabelTextStyle={{
          color: colors.textTertiary,
          fontSize: 10,
          ...(rotateLabels ? { transform: [{ rotate: '-45deg' }] } : {}),
        }}
        noOfSections={4}
        maxValue={maxValue}
        showGradient
        gradientColor={colors.accent}
      />
    </View>
  );
}
