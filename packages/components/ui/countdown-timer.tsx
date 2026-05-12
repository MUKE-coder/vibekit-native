import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

interface CountdownTimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { box: 'w-8 h-8', text: 'text-[13px]', gap: 1, icon: 14 },
  md: { box: 'w-10 h-10', text: 'text-[16px]', gap: 2, icon: 16 },
  lg: { box: 'w-14 h-14', text: 'text-[22px]', gap: 3, icon: 18 },
};

export function CountdownTimer({
  hours,
  minutes,
  seconds,
  label,
  size = 'md',
  className,
}: CountdownTimerProps) {
  const s = sizeMap[size];

  function pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  return (
    <View className={cn('items-center', className)}>
      {label ? (
        <Text className="text-textSecondary text-[12px] font-medium mb-2">
          {label}
        </Text>
      ) : null}
      <View className="flex-row items-center gap-1">
        <View
          className={cn(
            'rounded-lg bg-bgHover items-center justify-center',
            s.box,
          )}
        >
          <Text className={cn('font-bold text-textPrimary tabular-nums', s.text)}>
            {pad(hours)}
          </Text>
        </View>
        <Text className={cn('font-bold text-textTertiary', s.text)}>:</Text>
        <View
          className={cn(
            'rounded-lg bg-bgHover items-center justify-center',
            s.box,
          )}
        >
          <Text className={cn('font-bold text-textPrimary tabular-nums', s.text)}>
            {pad(minutes)}
          </Text>
        </View>
        <Text className={cn('font-bold text-textTertiary', s.text)}>:</Text>
        <View
          className={cn(
            'rounded-lg bg-bgHover items-center justify-center',
            s.box,
          )}
        >
          <Text className={cn('font-bold text-textPrimary tabular-nums', s.text)}>
            {pad(seconds)}
          </Text>
        </View>
      </View>
    </View>
  );
}
