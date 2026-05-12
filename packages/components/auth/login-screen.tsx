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
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '../lib/utils';

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginScreenProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  className?: string;
}

export function LoginScreen({
  onSubmit,
  onForgotPassword,
  onSignUp,
  className,
}: LoginScreenProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function handleFormSubmit(data: LoginFormData) {
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
              Sign in
            </Text>
            <Text className="text-[15px] text-textSecondary mt-2">
              Welcome back to your account
            </Text>
          </View>

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

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  placeholder="Enter your password"
                  variant="password"
                />
              )}
            />

            {onForgotPassword ? (
              <View className="items-end">
                <Pressable onPress={onForgotPassword}>
                  <Text className="text-accent text-[14px] font-medium">
                    Forgot password?
                  </Text>
                </Pressable>
              </View>
            ) : null}

            <Button
              title="Sign in"
              onPress={handleSubmit(handleFormSubmit)}
              variant="primary"
              loading={loading}
            />
          </View>

          <View className="flex-row items-center px-4 mt-8">
            <View className="flex-1 h-px bg-border" />
            <Text className="mx-4 text-[13px] text-textTertiary">or continue with</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          <View className="flex-row justify-center gap-4 mt-5 px-4">
            {['logo-google', 'logo-apple', 'logo-facebook'].map((icon) => (
              <Pressable
                key={icon}
                className="w-[52px] h-[52px] rounded-full border border-border items-center justify-center bg-bgElevated"
              >
                <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={22} color="#A0A0A0" />
              </Pressable>
            ))}
          </View>

          {onSignUp ? (
            <View className="flex-row justify-center mt-8 px-4">
              <Text className="text-[14px] text-textSecondary">
                Don't have an account?{' '}
              </Text>
              <Pressable onPress={onSignUp}>
                <Text className="text-accent text-[14px] font-bold">Sign up</Text>
              </Pressable>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
