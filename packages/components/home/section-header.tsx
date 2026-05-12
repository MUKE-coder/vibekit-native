import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  className,
}: SectionHeaderProps) {
  return (
    <View className={cn('flex-row items-center justify-between px-4 py-3', className)}>
      <View className="flex-1">
        <Text className="text-[17px] font-semibold text-textPrimary">{title}</Text>
        {subtitle ? (
          <Text className="text-[12px] text-textTertiary mt-0.5">{subtitle}</Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} className="flex-row items-center gap-1" hitSlop={8}>
          <Text className="text-accent text-[13px] font-semibold">{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={14} color="#6366F1" />
        </Pressable>
      ) : null}
    </View>
  );
}
