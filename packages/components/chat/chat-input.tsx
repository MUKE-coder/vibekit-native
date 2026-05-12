import React from 'react';
import { View, TextInput, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  onAttach?: () => void;
  className?: string;
}

export function ChatInput({
  value,
  onChangeText,
  onSend,
  placeholder = 'Message…',
  disabled = false,
  onAttach,
  className,
}: ChatInputProps) {
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <SafeAreaView edges={['bottom']} className="bg-bg">
        <View
          className={cn(
            'flex-row items-end gap-2 px-3 py-2 bg-bg border-t border-border',
            className,
          )}
        >
          {onAttach ? (
            <Pressable
              onPress={onAttach}
              accessibilityLabel="Attach"
              accessibilityRole="button"
              hitSlop={8}
              className="h-10 w-10 items-center justify-center rounded-full bg-bgElevated"
            >
              <Ionicons name="add" size={22} color={colors.textSecondary} />
            </Pressable>
          ) : null}

          <View className="flex-1 min-h-[40px] max-h-[120px] rounded-2xl border border-border bg-bgElevated px-4 py-2 flex-row items-center">
            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={colors.textTertiary}
              editable={!disabled}
              multiline
              className="flex-1 text-[15px] text-textPrimary"
              style={{ outlineStyle: 'none', paddingTop: 4, paddingBottom: 4 }}
            />
          </View>

          <Pressable
            onPress={canSend ? onSend : undefined}
            disabled={!canSend}
            accessibilityLabel="Send message"
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSend }}
            className={cn(
              'h-10 w-10 items-center justify-center rounded-full',
              canSend ? 'bg-accent' : 'bg-bgElevated',
            )}
          >
            <Ionicons
              name="arrow-up"
              size={20}
              color={canSend ? '#FFFFFF' : colors.textTertiary}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
