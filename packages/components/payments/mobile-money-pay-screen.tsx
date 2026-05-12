import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ScreenHeader } from '../shared/screen-header';
import { dgateway, type Currency } from '../lib/dgateway';

interface MobileMoneyPayScreenProps {
  /** Amount in whole units of currency — pass via route param or prop. */
  defaultAmount?: number;
  /** Pre-filled buyer phone (e.g., from logged-in user profile). */
  defaultPhone?: string;
  defaultCurrency?: Currency;
  /** Free-form description shown on the buyer's bank/wallet statement. */
  description: string;
  /** Metadata attached to the transaction (e.g., orderId). */
  metadata?: Record<string, string | number | boolean>;
  /** Called with the DGateway reference once the prompt is sent. Navigate to a status screen here. */
  onStarted: (reference: string) => void;
  /** Page title. */
  title?: string;
}

const phoneRegex = /^(\+?256|0)?7\d{8}$|^(\+?254|0)?[71]\d{8}$|^(\+?255|0)?[67]\d{8}$|^(\+?250|0)?7\d{8}$/;

const schema = z.object({
  amount: z
    .string()
    .min(1, 'Required')
    .refine((s) => /^\d+$/.test(s) && Number(s) > 0, 'Whole numbers only'),
  phone: z
    .string()
    .min(9, 'Enter a valid phone')
    .refine((s) => phoneRegex.test(s.trim()), 'Use 07X… or 2567X…'),
});

type FormValues = z.infer<typeof schema>;

const CURRENCIES: { code: Currency; label: string }[] = [
  { code: 'UGX', label: '🇺🇬 UGX' },
  { code: 'KES', label: '🇰🇪 KES' },
  { code: 'TZS', label: '🇹🇿 TZS' },
  { code: 'RWF', label: '🇷🇼 RWF' },
];

export function MobileMoneyPayScreen({
  defaultAmount,
  defaultPhone,
  defaultCurrency = 'UGX',
  description,
  metadata,
  onStarted,
  title = 'Pay with mobile money',
}: MobileMoneyPayScreenProps) {
  const [currency, setCurrency] = React.useState<Currency>(defaultCurrency);
  const [submitting, setSubmitting] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: defaultAmount ? String(defaultAmount) : '',
      phone: defaultPhone ?? '',
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await dgateway.startPayment({
        amount: Number(values.amount),
        currency,
        phoneNumber: values.phone.trim(),
        description,
        metadata,
      });
      onStarted(res.reference);
    } catch (err) {
      Alert.alert(
        'Payment could not start',
        (err as Error).message || 'Please try again in a moment.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg">
      <ScreenHeader title={title} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 16 }}>
        <View className="rounded-2xl bg-bgElevated border border-border p-5">
          <Text className="text-textSecondary text-[13px]">You&apos;ll be charged</Text>

          {/* Currency switcher */}
          <View className="mt-3 flex-row gap-2 flex-wrap">
            {CURRENCIES.map((c) => {
              const active = c.code === currency;
              return (
                <Text
                  key={c.code}
                  onPress={() => setCurrency(c.code)}
                  className={[
                    'px-3 py-1.5 rounded-full text-[12px] font-medium',
                    active
                      ? 'bg-accent text-white'
                      : 'bg-bgSubtle text-textSecondary border border-border',
                  ].join(' ')}
                >
                  {c.label}
                </Text>
              );
            })}
          </View>

          {/* Amount input */}
          <View className="mt-4">
            <Controller
              control={control}
              name="amount"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Amount"
                  value={value}
                  onChangeText={onChange}
                  placeholder="0"
                  keyboardType="number-pad"
                  error={errors.amount?.message}
                  variant="currency"
                  currencySymbol={currency}
                />
              )}
            />
          </View>

          {/* Phone input */}
          <View className="mt-4">
            <Controller
              control={control}
              name="phone"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Mobile money number"
                  value={value}
                  onChangeText={onChange}
                  placeholder="0771234567"
                  keyboardType="phone-pad"
                  leftIcon="call-outline"
                  error={errors.phone?.message}
                  helperText="We&apos;ll send a confirmation prompt to this number."
                />
              )}
            />
          </View>
        </View>

        <Text className="mt-5 text-textTertiary text-[12.5px] leading-relaxed">
          DGateway routes mobile-money payments automatically. UGX goes through Iotec; KES, TZS, and RWF
          through Relworx. The buyer approves the STK push on their phone — usually within 90 seconds.
        </Text>

        <View className="mt-6">
          <Button
            title="Send payment prompt"
            onPress={handleSubmit(onSubmit)}
            loading={submitting}
            icon="phone-portrait-outline"
            variant="primary"
            size="lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
