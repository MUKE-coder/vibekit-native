import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar } from '../ui/avatar';
import { cn } from '../lib/utils';

export const completeProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;

interface CompleteProfileScreenProps {
  onSubmit: (data: CompleteProfileFormData) => Promise<void>;
  initialName?: string;
  className?: string;
}

export function CompleteProfileScreen({
  onSubmit,
  initialName = '',
  className,
}: CompleteProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: { name: initialName, phone: '', bio: '' },
  });

  async function handleFormSubmit(data: CompleteProfileFormData) {
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
          <View className="items-center pt-8">
            <Avatar name={initialName || 'You'} size="xl" />
            <Text className="text-[26px] font-bold text-textPrimary mt-4">
              Complete profile
            </Text>
            <Text className="text-[14px] text-textSecondary mt-1">
              Tell us a bit about yourself
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
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Phone number (optional)"
                  value={value}
                  onChangeText={onChange}
                  placeholder="+1 (555) 000-0000"
                  keyboardType="phone-pad"
                />
              )}
            />

            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Bio (optional)"
                  value={value}
                  onChangeText={onChange}
                  placeholder="A short description about you"
                  multiline
                  numberOfLines={3}
                />
              )}
            />

            <Button
              title="Save & continue"
              onPress={handleSubmit(handleFormSubmit)}
              variant="primary"
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
