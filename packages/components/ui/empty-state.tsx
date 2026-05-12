import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from './button';
import { cn } from '../lib/utils';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon = 'cube-outline',
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <View className={cn('items-center justify-center py-16 px-8', className)}>
      <View className="w-16 h-16 rounded-full bg-bgHover items-center justify-center mb-4">
        <Ionicons name={icon} size={28} color="#666666" />
      </View>
      <Text className="text-[17px] font-semibold text-textPrimary text-center">
        {title}
      </Text>
      {description ? (
        <Text className="text-[14px] text-textSecondary text-center mt-2 leading-5">
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          size="sm"
          className="mt-6"
        />
      ) : null}
    </View>
  );
}
