import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '../lib/utils';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  className?: string;
}

export function ScreenHeader({ title, onBack, rightAction, className }: ScreenHeaderProps) {
  return (
    <View className={cn('flex-row items-center justify-between px-4 h-[52px]', className)}>
      <View className="w-10">
        {onBack ? (
          <Pressable onPress={onBack} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color="#A0A0A0" />
          </Pressable>
        ) : null}
      </View>
      <Text className="text-[17px] font-semibold text-textPrimary flex-1 text-center">
        {title}
      </Text>
      <View className="w-10 items-end">
        {rightAction ? (
          <Pressable onPress={rightAction.onPress} hitSlop={8}>
            <Ionicons name={rightAction.icon} size={22} color="#A0A0A0" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
