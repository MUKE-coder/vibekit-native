import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type ViewStyle,
  type GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: (e: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  accessibilityLabel?: string;
  className?: string;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-accent',
    text: 'text-white',
  },
  secondary: {
    container: 'bg-transparent border border-borderStrong',
    text: 'text-textPrimary',
  },
  ghost: {
    container: 'bg-transparent',
    text: 'text-textSecondary',
  },
  destructive: {
    container: 'bg-error',
    text: 'text-white',
  },
  text: {
    container: 'bg-transparent',
    text: 'text-accent',
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string; iconSize: number }> = {
  sm: { container: 'h-[36px] px-3 rounded-md', text: 'text-[13px]', iconSize: 16 },
  md: { container: 'h-[48px] px-5 rounded-lg', text: 'text-[15px]', iconSize: 18 },
  lg: { container: 'h-[56px] px-6 rounded-xl', text: 'text-[16px]', iconSize: 20 },
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  icon,
  iconPosition = 'left',
  accessibilityLabel,
  className,
}: ButtonProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      className={cn(
        'flex-row items-center justify-center',
        s.container,
        v.container,
        fullWidth ? 'w-full' : 'self-start',
        isDisabled && 'opacity-50',
        className,
      )}
      style={({ pressed }: { pressed: boolean }): ViewStyle => ({
        opacity: pressed && !isDisabled ? 0.92 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'destructive' ? '#FFFFFF' : '#6366F1'}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' ? (
            <Ionicons
              name={icon}
              size={s.iconSize}
              color={variant === 'primary' || variant === 'destructive' ? '#FFFFFF' : '#A0A0A0'}
              style={{ marginRight: 8 }}
            />
          ) : null}
          <Text className={cn('font-semibold', s.text, v.text)}>
            {title}
          </Text>
          {icon && iconPosition === 'right' ? (
            <Ionicons
              name={icon}
              size={s.iconSize}
              color={variant === 'primary' || variant === 'destructive' ? '#FFFFFF' : '#A0A0A0'}
              style={{ marginLeft: 8 }}
            />
          ) : null}
        </>
      )}
    </Pressable>
  );
}
