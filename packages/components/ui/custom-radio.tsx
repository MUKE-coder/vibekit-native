import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

interface CustomRadioProps {
  selected: boolean;
  onSelect: () => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function CustomRadio({
  selected,
  onSelect,
  label,
  description,
  disabled = false,
  className,
}: CustomRadioProps) {
  return (
    <Pressable
      onPress={onSelect}
      disabled={disabled}
      className={cn(
        'flex-row items-center gap-3 rounded-xl border px-4 py-3.5',
        selected
          ? 'border-accent bg-accent/5'
          : 'border-border bg-bgElevated',
        disabled && 'opacity-50',
        className,
      )}
    >
      <View
        className={cn(
          'w-5 h-5 rounded-full border-2 items-center justify-center',
          selected ? 'border-accent' : 'border-borderStrong',
        )}
      >
        {selected ? (
          <View className="w-2.5 h-2.5 rounded-full bg-accent" />
        ) : null}
      </View>
      {label ? (
        <View className="flex-1">
          <Text
            className={cn(
              'text-[15px] font-medium',
              selected ? 'text-textPrimary' : 'text-textSecondary',
            )}
          >
            {label}
          </Text>
          {description ? (
            <Text className="text-textTertiary text-[13px] mt-0.5">
              {description}
            </Text>
          ) : null}
        </View>
      ) : null}
    </Pressable>
  );
}
