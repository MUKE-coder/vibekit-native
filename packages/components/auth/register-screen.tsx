import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '../lib/utils';

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Valid email required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterScreenProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onSignIn?: () => void;
  className?: string;
}

export function RegisterScreen({
  onSubmit,
  onSignIn,
  className,
}: RegisterScreenProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  async function handleFormSubmit(data: RegisterFormData) {
    setLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className={cn('flex-1 bg-bg', className)} style={{ paddingTop: insets.top }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 pt-8">
            <Text className="text-[clamp(28px,6vw,36px)] font-bold text-textPrimary tracking-tight">
              Create account
            </Text>
            <Text className="text-[15px] text-textSecondary mt-2">
              Join us and start shopping
            </Text>
          </View>

          <View className="px-4 mt-8 gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Full name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                  placeholder="John Doe"
                />
              )}
            />

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

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Password"
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
                  label="Confirm password"
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                  placeholder="Repeat your password"
                  variant="password"
                />
              )}
            />

            <Button
              title="Create account"
              onPress={handleSubmit(handleFormSubmit)}
              variant="primary"
              loading={loading}
            />
          </View>

          {onSignIn ? (
            <View className="flex-row justify-center mt-8 px-4">
              <Text className="text-[14px] text-textSecondary">
                Already have an account?{' '}
              </Text>
              <Pressable onPress={onSignIn}>
                <Text className="text-accent text-[14px] font-bold">Sign in</Text>
              </Pressable>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
