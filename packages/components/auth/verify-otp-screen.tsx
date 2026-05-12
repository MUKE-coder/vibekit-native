import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { OTPInput } from '../ui/otp-input';
import { Button } from '../ui/button';
import { cn } from '../lib/utils';

export const otpSchema = z.object({
  otp: z.string().length(6, 'Code must be 6 digits'),
});

export type OtpFormData = z.infer<typeof otpSchema>;

interface VerifyOTPScreenProps {
  email: string;
  onSubmit: (data: OtpFormData) => Promise<void>;
  onResend?: () => void;
  onBack?: () => void;
  className?: string;
}

export function VerifyOTPScreen({
  email,
  onSubmit,
  onResend,
  onBack,
  className,
}: VerifyOTPScreenProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(59);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = useCallback(() => {
    setCountdown(59);
    onResend?.();
  }, [onResend]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  async function handleFormSubmit(data: OtpFormData) {
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
        <Text className="text-[26px] font-bold text-textPrimary">Verify code</Text>
        <Text className="text-[14px] text-textSecondary mt-1">
          Enter the 6-digit code sent to {email}
        </Text>
      </View>

      <View className="px-4 mt-8">
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange, value } }) => (
            <OTPInput
              code={value}
              length={6}
              error={!!errors.otp}
            />
          )}
        />
        {errors.otp ? (
          <Text className="text-error text-[12px] text-center mt-2">
            {errors.otp.message}
          </Text>
        ) : null}
      </View>

      <View className="items-center mt-6">
        {countdown > 0 ? (
          <Text className="text-[14px] text-textTertiary">
            Resend in {Math.floor(countdown / 60)}:{countdown.toString().padStart(2, '0')}
          </Text>
        ) : (
          <Pressable onPress={handleResend}>
            <Text className="text-accent text-[14px] font-bold">Resend code</Text>
          </Pressable>
        )}
      </View>

      <View className="px-4 mt-8">
        <Button
          title="Verify"
          onPress={handleSubmit(handleFormSubmit)}
          variant="primary"
          loading={loading}
        />
      </View>
    </View>
  );
}
