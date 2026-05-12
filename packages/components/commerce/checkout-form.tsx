import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ScreenHeader } from '../shared/screen-header';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export type PaymentMethodId = 'mobile-money' | 'card' | 'cash-on-delivery';

export interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  description?: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  disabled?: boolean;
}

const DEFAULT_METHODS: PaymentMethodOption[] = [
  { id: 'mobile-money', label: 'Mobile money', description: 'MTN, Airtel, M-Pesa', icon: 'phone-portrait-outline' },
  { id: 'card', label: 'Card', description: 'Visa, Mastercard', icon: 'card-outline' },
  { id: 'cash-on-delivery', label: 'Cash on delivery', icon: 'cash-outline' },
];

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(9, 'Enter a valid phone'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  addressLine: z.string().min(3, 'Address required'),
  city: z.string().min(2, 'City required'),
  region: z.string().optional(),
  notes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof schema> & {
  paymentMethod: PaymentMethodId;
};

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => void | Promise<void>;
  /** Initial values from saved profile / draft. */
  defaultValues?: Partial<CheckoutFormValues>;
  /** Override the payment method list. */
  paymentMethods?: PaymentMethodOption[];
  /** Disable the form submit button. */
  disabled?: boolean;
  /** Loading state on submit. */
  submitting?: boolean;
  submitLabel?: string;
  /** Optional content rendered above the submit button (e.g., OrderSummary). */
  footerContent?: React.ReactNode;
  title?: string;
}

export function CheckoutForm({
  onSubmit,
  defaultValues,
  paymentMethods = DEFAULT_METHODS,
  disabled = false,
  submitting = false,
  submitLabel = 'Place order',
  footerContent,
  title = 'Checkout',
}: CheckoutFormProps) {
  const [method, setMethod] = React.useState<PaymentMethodId>(
    defaultValues?.paymentMethod ?? paymentMethods[0]?.id ?? 'mobile-money',
  );

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? '',
      phone: defaultValues?.phone ?? '',
      email: defaultValues?.email ?? '',
      addressLine: defaultValues?.addressLine ?? '',
      city: defaultValues?.city ?? '',
      region: defaultValues?.region ?? '',
      notes: defaultValues?.notes ?? '',
    },
  });

  async function submit(values: z.infer<typeof schema>) {
    await onSubmit({ ...values, paymentMethod: method });
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title={title} />

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Section: Contact */}
        <SectionHeader icon="person-outline" title="Contact" />
        <View className="rounded-2xl bg-bgElevated border border-border p-4 gap-3">
          <Controller
            control={control}
            name="fullName"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Full name"
                value={value}
                onChangeText={onChange}
                placeholder="Jane Mukasa"
                error={errors.fullName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Phone"
                value={value}
                onChangeText={onChange}
                placeholder="0771234567"
                keyboardType="phone-pad"
                leftIcon="call-outline"
                error={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Email (for receipt)"
                value={value ?? ''}
                onChangeText={onChange}
                placeholder="you@example.com"
                keyboardType="email-address"
                leftIcon="mail-outline"
                error={errors.email?.message}
              />
            )}
          />
        </View>

        {/* Section: Shipping */}
        <SectionHeader icon="location-outline" title="Shipping address" className="mt-5" />
        <View className="rounded-2xl bg-bgElevated border border-border p-4 gap-3">
          <Controller
            control={control}
            name="addressLine"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Address"
                value={value}
                onChangeText={onChange}
                placeholder="Plot 12, Nakawa"
                error={errors.addressLine?.message}
              />
            )}
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Controller
                control={control}
                name="city"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="City"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Kampala"
                    error={errors.city?.message}
                  />
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="region"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Region"
                    value={value ?? ''}
                    onChangeText={onChange}
                    placeholder="Central"
                  />
                )}
              />
            </View>
          </View>
          <Controller
            control={control}
            name="notes"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Delivery notes (optional)"
                value={value ?? ''}
                onChangeText={onChange}
                placeholder="Gate code, landmark, time…"
                multiline
                numberOfLines={3}
              />
            )}
          />
        </View>

        {/* Section: Payment */}
        <SectionHeader icon="card-outline" title="Payment method" className="mt-5" />
        <View className="rounded-2xl bg-bgElevated border border-border p-2">
          {paymentMethods.map((m, idx) => {
            const selected = method === m.id;
            return (
              <View
                key={m.id}
                className={cn(
                  'flex-row items-center px-3 py-3 rounded-xl',
                  selected && 'bg-accent/8',
                  idx !== paymentMethods.length - 1 && 'mb-1',
                )}
                onTouchEnd={() => !m.disabled && setMethod(m.id)}
              >
                <View className={cn(
                  'h-9 w-9 rounded-lg items-center justify-center mr-3',
                  selected ? 'bg-accent/15' : 'bg-bgSubtle',
                )}>
                  <Ionicons name={m.icon} size={18} color={selected ? colors.accent : colors.textSecondary} />
                </View>
                <View className="flex-1">
                  <Text className={cn(
                    'text-[14px] font-medium',
                    selected ? 'text-accent' : 'text-textPrimary',
                  )}>
                    {m.label}
                  </Text>
                  {m.description ? (
                    <Text className="text-textTertiary text-[12px] mt-0.5">{m.description}</Text>
                  ) : null}
                </View>
                <View
                  className={cn(
                    'h-5 w-5 rounded-full border-2 items-center justify-center',
                    selected ? 'border-accent' : 'border-border',
                  )}
                >
                  {selected ? <View className="h-2 w-2 rounded-full bg-accent" /> : null}
                </View>
              </View>
            );
          })}
        </View>

        {/* Optional footer (e.g., OrderSummary) */}
        {footerContent ? <View className="mt-5">{footerContent}</View> : null}

        {/* Submit */}
        <View className="mt-6">
          <Button
            title={submitLabel}
            onPress={handleSubmit(submit)}
            disabled={disabled}
            loading={submitting}
            icon="arrow-forward"
            iconPosition="right"
            variant="primary"
            size="lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({
  icon,
  title,
  className,
}: {
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  title: string;
  className?: string;
}) {
  return (
    <View className={cn('flex-row items-center gap-2 mb-2.5', className)}>
      <Ionicons name={icon} size={15} color={colors.textTertiary} />
      <Text className="text-textTertiary text-[11.5px] uppercase tracking-widest font-medium">
        {title}
      </Text>
    </View>
  );
}
