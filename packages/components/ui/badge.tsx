import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../lib/utils';

type BadgeVariant = 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  accent: { bg: 'bg-accent/15', text: 'text-accent' },
  success: { bg: 'bg-success/15', text: 'text-success' },
  warning: { bg: 'bg-warning/15', text: 'text-warning' },
  error: { bg: 'bg-error/15', text: 'text-error' },
  info: { bg: 'bg-info/15', text: 'text-info' },
  neutral: { bg: 'bg-bgHover', text: 'text-textSecondary' },
};

export function Badge({ label, variant = 'neutral', className }: BadgeProps) {
  const s = variantStyles[variant];

  return (
    <View className={cn('self-start px-2 py-0.5 rounded', s.bg, className)}>
      <Text className={cn('text-[11px] font-semibold', s.text)}>
        {label}
      </Text>
    </View>
  );
}
