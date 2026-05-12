import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  disabled?: boolean;
  showEmpty?: boolean;
  className?: string;
}

const sizeMap = { sm: 14, md: 18, lg: 24 };

export function Rating({
  value,
  max = 5,
  size = 'md',
  onChange,
  disabled = true,
  showEmpty = true,
  className,
}: RatingProps) {
  const iconSize = sizeMap[size];
  const interactive = !disabled && !!onChange;

  return (
    <View className={cn('flex-row items-center gap-0.5', className)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(value);
        const half = !filled && i < value;
        const starName = filled ? 'star' : half ? 'star-half' : showEmpty ? 'star-outline' : undefined;

        if (!starName) return null;

        return (
          <Pressable
            key={i}
            onPress={() => onChange?.(i + 1)}
            disabled={!interactive}
            className={interactive ? 'p-0.5' : ''}
          >
            <Ionicons
              name={starName as keyof typeof Ionicons.glyphMap}
              size={iconSize}
              color={filled || half ? '#F59E0B' : '#333333'}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
