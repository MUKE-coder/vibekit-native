import React from 'react';
import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { cn } from '../lib/utils';
import { formatPrice } from '../lib/format-currency';

export interface OrderLineItem {
  id: string;
  title: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: number;
  /** Optional variant text (e.g., "Size M · Red"). */
  variant?: string;
}

interface OrderSummaryProps {
  items: OrderLineItem[];
  currency: string;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  /** Custom total — defaults to subtotal + shipping + tax - discount. */
  total?: number;
  /** Discount/promo code label shown next to the discount line. */
  discountLabel?: string;
  /** Hide line items and show only the totals breakdown. */
  totalsOnly?: boolean;
  className?: string;
}

export function OrderSummary({
  items,
  currency,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  discountLabel = 'Discount',
  totalsOnly = false,
  className,
}: OrderSummaryProps) {
  const computedSubtotal =
    subtotal ?? items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const computedTotal =
    total ?? computedSubtotal + (shipping ?? 0) + (tax ?? 0) - (discount ?? 0);

  return (
    <View className={cn('rounded-2xl border border-border bg-bgElevated', className)}>
      {/* Line items */}
      {!totalsOnly && items.length > 0 ? (
        <View className="px-4 py-3">
          <Text className="text-textTertiary text-[11px] uppercase tracking-widest font-medium mb-2">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </Text>
          {items.map((it, idx) => (
            <View
              key={it.id}
              className={cn('flex-row items-center gap-3 py-2', idx !== items.length - 1 && 'border-b border-border')}
            >
              {it.imageUrl ? (
                <Image
                  source={{ uri: it.imageUrl }}
                  style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: '#1A1A1A' }}
                  contentFit="cover"
                  transition={150}
                />
              ) : (
                <View className="h-11 w-11 rounded-lg bg-bgSubtle" />
              )}
              <View className="flex-1">
                <Text className="text-textPrimary text-[13.5px] font-medium" numberOfLines={1}>
                  {it.title}
                </Text>
                {it.variant ? (
                  <Text className="text-textTertiary text-[11.5px]" numberOfLines={1}>
                    {it.variant}
                  </Text>
                ) : null}
                <Text className="text-textSecondary text-[12px] mt-0.5">
                  Qty {it.quantity} × {formatPrice(it.unitPrice, currency)}
                </Text>
              </View>
              <Text className="text-textPrimary text-[13.5px] font-semibold tabular-nums">
                {formatPrice(it.unitPrice * it.quantity, currency)}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Divider */}
      {!totalsOnly && items.length > 0 ? <View className="h-px bg-border" /> : null}

      {/* Totals */}
      <View className="px-4 py-3 gap-1.5">
        <Row label="Subtotal" value={formatPrice(computedSubtotal, currency)} />
        {typeof shipping === 'number' ? (
          <Row label="Shipping" value={shipping === 0 ? 'Free' : formatPrice(shipping, currency)} />
        ) : null}
        {typeof tax === 'number' ? (
          <Row label="Tax" value={formatPrice(tax, currency)} />
        ) : null}
        {typeof discount === 'number' && discount > 0 ? (
          <Row label={discountLabel} value={`− ${formatPrice(discount, currency)}`} valueClassName="text-success" />
        ) : null}
      </View>

      <View className="h-px bg-border" />

      {/* Grand total */}
      <View className="px-4 py-3 flex-row items-center justify-between">
        <Text className="text-textPrimary text-[15px] font-semibold">Total</Text>
        <Text className="text-textPrimary text-[18px] font-bold tabular-nums">
          {formatPrice(computedTotal, currency)}
        </Text>
      </View>
    </View>
  );
}

function Row({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-textSecondary text-[13px]">{label}</Text>
      <Text className={cn('text-textPrimary text-[13.5px] tabular-nums', valueClassName)}>
        {value}
      </Text>
    </View>
  );
}
