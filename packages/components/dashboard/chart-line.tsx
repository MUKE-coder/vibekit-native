import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export interface LinePoint {
  /** X-axis label (date, hour, name…). Render every N points via `xAxisLabelInterval`. */
  label?: string;
  /** Y-axis value. */
  value: number;
  /** Optional tooltip text — falls back to value. */
  tooltipText?: string;
}

interface ChartLineProps {
  data: LinePoint[];
  /** Comparison series (e.g., last period). Rendered in muted tone. */
  comparisonData?: LinePoint[];
  /** Title shown above the chart. */
  title?: string;
  /** Sub-label (e.g., "Last 30 days"). */
  subtitle?: string;
  /** Hide grid lines for a cleaner look. */
  noGrid?: boolean;
  /** Force a Y-axis ceiling (otherwise auto-scaled). */
  maxValue?: number;
  /** Chart height in px. Default 200. */
  height?: number;
  /** Curved (smooth) line instead of straight segments. */
  smooth?: boolean;
  className?: string;
}

/**
 * Line chart wrapper around react-native-gifted-charts.
 * Theme-aware — uses the VibeKit Native dark palette by default.
 */
export function ChartLine({
  data,
  comparisonData,
  title,
  subtitle,
  noGrid = false,
  maxValue,
  height = 200,
  smooth = true,
  className,
}: ChartLineProps) {
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

      <LineChart
        data={data}
        data2={comparisonData}
        height={height}
        thickness={2}
        curved={smooth}
        color={colors.accent}
        color2={colors.textTertiary}
        startFillColor={colors.accent}
        startOpacity={0.18}
        endFillColor={colors.accent}
        endOpacity={0}
        areaChart
        hideDataPoints
        showVerticalLines={!noGrid}
        verticalLinesColor={colors.border}
        rulesColor={colors.border}
        rulesType={noGrid ? 'dashed' : 'solid'}
        hideRules={noGrid}
        yAxisColor="transparent"
        xAxisColor="transparent"
        yAxisTextStyle={{ color: colors.textTertiary, fontSize: 10 }}
        xAxisLabelTextStyle={{ color: colors.textTertiary, fontSize: 10 }}
        maxValue={maxValue}
        noOfSections={4}
        spacing={Math.max(20, 280 / Math.max(1, data.length))}
        initialSpacing={10}
        endSpacing={10}
        pointerConfig={{
          pointerStripHeight: height - 30,
          pointerStripColor: colors.border,
          pointerStripWidth: 1,
          pointerColor: colors.accent,
          radius: 5,
          activatePointersOnLongPress: false,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items: { value: number }[]) => (
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: colors.bgSubtle,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.textPrimary, fontSize: 11, fontWeight: '600' }}>
                {items[0]?.value?.toLocaleString() ?? ''}
              </Text>
            </View>
          ),
        }}
      />
    </View>
  );
}
