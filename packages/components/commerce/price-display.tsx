import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../lib/utils';

interface PriceDisplayProps {
  price: number;
  compareAt?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  className?: string;
}

export function PriceDisplay({
  price,
  compareAt,
  currency = 'USD',
  size = 'md',
  showDiscount = true,
  className,
}: PriceDisplayProps) {
  const fmt = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'narrowSymbol',
    }).format(amount);

  const discount =
    compareAt && compareAt > price
      ? Math.round((1 - price / compareAt) * 100)
      : 0;

  const sizeMap = {
    sm: { price: 'text-[14px]', struck: 'text-[11px]', badge: 'text-[10px]' },
    md: { price: 'text-[18px]', struck: 'text-[13px]', badge: 'text-[11px]' },
    lg: { price: 'text-[24px]', struck: 'text-[16px]', badge: 'text-[12px]' },
  };

  const s = sizeMap[size];

  return (
    <View className={cn('flex-row items-baseline gap-2', className)}>
      <Text className={cn('font-bold text-textPrimary tabular-nums', s.price)}>
        {fmt(price)}
      </Text>
      {compareAt && compareAt > price ? (
        <>
          <Text className={cn('text-textTertiary line-through tabular-nums', s.struck)}>
            {fmt(compareAt)}
          </Text>
          {showDiscount ? (
            <View className="bg-error/20 px-1.5 py-0.5 rounded">
              <Text className={cn('font-semibold text-error', s.badge)}>
                -{discount}%
              </Text>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}
