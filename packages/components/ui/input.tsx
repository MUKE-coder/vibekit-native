import React from 'react';
import { View, TextInput, Text, Pressable, type KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

type InputVariant = 'standard' | 'password' | 'search' | 'currency';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  keyboardType?: KeyboardTypeOptions;
  autoFocus?: boolean;
  currencySymbol?: string;
  accessibilityLabel?: string;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  className?: string;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  variant = 'standard',
  leftIcon,
  rightIcon,
  onRightIconPress,
  keyboardType,
  autoFocus = false,
  currencySymbol = '$',
  accessibilityLabel,
  editable = true,
  multiline = false,
  numberOfLines,
  className,
}: InputProps) {
  const [focused, setFocused] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const isPassword = variant === 'password';
  const isSearch = variant === 'search';
  const isCurrency = variant === 'currency';

  const resolvedSecure = isPassword ? !passwordVisible : undefined;
  const resolvedKeyboard: KeyboardTypeType =
    isCurrency ? 'numeric' : (keyboardType ?? 'default');

  const resolvedLeftIcon = (isSearch ? 'search-outline' : leftIcon) as keyof typeof Ionicons.glyphMap | undefined;
  const resolvedRightIcon = (isSearch ? 'camera-outline' : rightIcon) as keyof typeof Ionicons.glyphMap | undefined;

  function handleChangeText(text: string) {
    if (isCurrency) {
      const digits = text.replace(/\D/g, '');
      onChangeText(digits);
    } else {
      onChangeText(text);
    }
  }

  const baseContainer = isSearch
    ? 'h-[44px] rounded-full'
    : 'h-[52px] rounded-lg';

  const borderStyle = error
    ? 'border border-error'
    : focused
      ? 'border border-accent'
      : 'border border-border';

  return (
    <View className={cn('w-full', className)}>
      {label ? (
        <Text className="text-[14px] font-medium text-textSecondary mb-1.5">
          {label}
        </Text>
      ) : null}

      <View
        className={cn(
          'flex-row items-center px-4 bg-bgElevated',
          baseContainer,
          borderStyle,
        )}
      >
        {isCurrency ? (
          <Text className="text-[14px] text-textPrimary mr-1 font-medium">
            {currencySymbol}
          </Text>
        ) : null}

        {resolvedLeftIcon ? (
          <Ionicons
            name={resolvedLeftIcon}
            size={20}
            color={colors.textTertiary}
            style={{ marginRight: 8 }}
          />
        ) : null}

        <TextInput
          value={isCurrency ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={resolvedSecure}
          keyboardType={resolvedKeyboard}
          autoFocus={autoFocus}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
          className="flex-1 text-[15px] text-textPrimary"
          style={{ outlineStyle: 'none' }}
        />

        {isPassword ? (
          <Pressable
            onPress={() => setPasswordVisible((p) => !p)}
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
            hitSlop={8}
          >
            <Ionicons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.textTertiary}
            />
          </Pressable>
        ) : null}

        {!isPassword && resolvedRightIcon ? (
          <Pressable
            onPress={onRightIconPress}
            accessibilityLabel={`${String(resolvedRightIcon)} button`}
            hitSlop={8}
            disabled={!onRightIconPress}
          >
            <Ionicons
              name={resolvedRightIcon}
              size={22}
              color={colors.textTertiary}
            />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text className="text-error text-[12px] mt-1.5">{error}</Text>
      ) : null}
      {!error && helperText ? (
        <Text className="text-textTertiary text-[12px] mt-1.5">{helperText}</Text>
      ) : null}
    </View>
  );
}
