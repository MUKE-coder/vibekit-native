import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

interface PointsCardProps {
  points: number;
  tierName?: string;
  tierProgress?: number;
  tierNext?: string;
  onHistoryPress?: () => void;
  className?: string;
}

export function PointsCard({ points, tierName, tierProgress, tierNext, onHistoryPress, className }: PointsCardProps) {
  const pct = tierProgress != null ? Math.min(tierProgress, 100) : 0;

  return (
    <View className={cn('rounded-xl bg-accent p-5', className)}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-white/70 text-[12px] font-medium">Your Points</Text>
          <Text className="text-white text-[32px] font-bold mt-1 tabular-nums">
            {points.toLocaleString()}
          </Text>
        </View>
        <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
          <Ionicons name="star" size={24} color="#FFFFFF" />
        </View>
      </View>

      {tierName ? (
        <View className="mt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-white/80 text-[13px] font-medium">{tierName}</Text>
            {tierNext ? (
              <Text className="text-white/60 text-[12px]">{tierNext}</Text>
            ) : null}
          </View>
          <View className="mt-1.5 h-2 rounded-full bg-white/20 overflow-hidden">
            <View
              className="h-full rounded-full bg-white"
              style={{ width: `${pct}%` }}
            />
          </View>
        </View>
      ) : null}

      {onHistoryPress ? (
        <Pressable onPress={onHistoryPress} className="flex-row items-center gap-1 mt-4">
          <Text className="text-white/80 text-[13px] font-medium">View history</Text>
          <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
        </Pressable>
      ) : null}
    </View>
  );
}
