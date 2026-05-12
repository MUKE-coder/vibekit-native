import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '../lib/utils';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Valid email required'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordScreenProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  onBack?: () => void;
  className?: string;
}

export function ForgotPasswordScreen({
  onSubmit,
  onBack,
  className,
}: ForgotPasswordScreenProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function handleFormSubmit(data: ForgotPasswordFormData) {
    setLoading(true);
    try {
      await onSubmit(data);
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className={cn('flex-1 bg-bg', className)} style={{ paddingTop: insets.top }}>
      {onBack ? (
        <View className="px-4 pt-3">
          <Pressable onPress={onBack} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color="#A0A0A0" />
          </Pressable>
        </View>
      ) : null}

      <View className="px-4 mt-6">
        <Text className="text-[26px] font-bold text-textPrimary">
          {sent ? 'Check your email' : 'Forgot password'}
        </Text>
        <Text className="text-[14px] text-textSecondary mt-1">
          {sent
            ? 'We sent a password reset link to your email.'
            : 'Enter your email and we will send you a reset link.'}
        </Text>
      </View>

      {!sent ? (
        <View className="px-4 mt-8 gap-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
                placeholder="you@example.com"
                keyboardType="email-address"
              />
            )}
          />
          <Button
            title="Send reset link"
            onPress={handleSubmit(handleFormSubmit)}
            variant="primary"
            loading={loading}
          />
        </View>
      ) : (
        <View className="px-4 mt-8">
          <Button
            title="Back to sign in"
            onPress={onBack || (() => {})}
            variant="secondary"
          />
        </View>
      )}
    </View>
  );
}
