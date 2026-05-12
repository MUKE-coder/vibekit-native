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

export const newPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

interface NewPasswordScreenProps {
  onSubmit: (data: NewPasswordFormData) => Promise<void>;
  onBack?: () => void;
  className?: string;
}

export function NewPasswordScreen({
  onSubmit,
  onBack,
  className,
}: NewPasswordScreenProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function handleFormSubmit(data: NewPasswordFormData) {
    setLoading(true);
    try {
      await onSubmit(data);
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
        <Text className="text-[26px] font-bold text-textPrimary">Set new password</Text>
        <Text className="text-[14px] text-textSecondary mt-1">
          Choose a strong password you haven't used before.
        </Text>
      </View>

      <View className="px-4 mt-8 gap-4">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="New password"
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
              placeholder="At least 6 characters"
              variant="password"
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Confirm new password"
              value={value}
              onChangeText={onChange}
              error={errors.confirmPassword?.message}
              placeholder="Repeat your password"
              variant="password"
            />
          )}
        />

        <Button
          title="Reset password"
          onPress={handleSubmit(handleFormSubmit)}
          variant="primary"
          loading={loading}
        />
      </View>
    </View>
  );
}
