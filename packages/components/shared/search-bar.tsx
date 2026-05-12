import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  onCameraPress?: () => void;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search products...',
  onSubmit,
  onCameraPress,
  autoFocus = false,
  className,
}: SearchBarProps) {
  return (
    <View className={cn('flex-row items-center h-[44px] rounded-full bg-bgSubtle px-4', className)}>
      <Ionicons name="search" size={18} color={colors.textTertiary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        className="flex-1 text-[15px] text-textPrimary ml-2"
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        autoFocus={autoFocus}
        autoCorrect={false}
      />
      {value ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
        </Pressable>
      ) : null}
      {onCameraPress ? (
        <Pressable onPress={onCameraPress} className="ml-2" hitSlop={8}>
          <Ionicons name="camera-outline" size={20} color={colors.textTertiary} />
        </Pressable>
      ) : null}
    </View>
  );
}
