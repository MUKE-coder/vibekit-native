import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { cn } from '../lib/utils';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, { dim: number; text: string }> = {
  sm: { dim: 28, text: 'text-[11px]' },
  md: { dim: 36, text: 'text-[13px]' },
  lg: { dim: 48, text: 'text-[16px]' },
  xl: { dim: 64, text: 'text-[20px]' },
};

function getInitials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ source, name, size = 'md', className }: AvatarProps) {
  const s = sizeMap[size];

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        className={cn('rounded-full bg-bgHover', className)}
        style={{ width: s.dim, height: s.dim }}
        contentFit="cover"
        transition={200}
      />
    );
  }

  return (
    <View
      className={cn(
        'rounded-full bg-accent/20 items-center justify-center',
        className,
      )}
      style={{ width: s.dim, height: s.dim }}
    >
      <Text className={cn('font-semibold text-accent', s.text)}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
