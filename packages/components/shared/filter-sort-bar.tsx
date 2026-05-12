import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

interface FilterSortBarProps {
  totalCount: number;
  sortLabel?: string;
  onSortPress?: () => void;
  onFilterPress?: () => void;
  className?: string;
}

export function FilterSortBar({
  totalCount,
  sortLabel = 'Relevance',
  onSortPress,
  onFilterPress,
  className,
}: FilterSortBarProps) {
  return (
    <View className={cn('flex-row items-center justify-between px-4 py-3 border-b border-border', className)}>
      <Text className="text-[13px] text-textSecondary">
        {totalCount} {totalCount === 1 ? 'result' : 'results'}
      </Text>
      <View className="flex-row gap-3">
        {onSortPress ? (
          <Pressable onPress={onSortPress} className="flex-row items-center gap-1">
            <Ionicons name="swap-vertical" size={16} color="#A0A0A0" />
            <Text className="text-[13px] text-textSecondary">{sortLabel}</Text>
          </Pressable>
        ) : null}
        {onFilterPress ? (
          <Pressable onPress={onFilterPress} className="flex-row items-center gap-1">
            <Ionicons name="options" size={16} color="#A0A0A0" />
            <Text className="text-[13px] text-textSecondary">Filter</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
