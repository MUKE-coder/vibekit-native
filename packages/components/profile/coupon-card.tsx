import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { Card } from '../ui/card';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  description: string;
  expiresAt: string;
  minPurchase?: string;
}

interface CouponCardProps {
  coupon: Coupon;
  onApply?: (code: string) => void;
  applied?: boolean;
  className?: string;
}

export function CouponCard({ coupon, onApply, applied = false, className }: CouponCardProps) {
  return (
    <Card className={cn('flex-row overflow-hidden', applied && 'opacity-60', className)}>
      {/* Left accent bar */}
      <View className="w-1 bg-accent" />

      <View className="flex-1 flex-row items-center p-4">
        <View className="flex-1">
          <Text className="text-[16px] font-bold text-textPrimary">{coupon.discount}</Text>
          <Text className="text-textSecondary text-[13px] mt-0.5">{coupon.description}</Text>
          <Text className="text-textTertiary text-[11px] mt-1">
            Expires {coupon.expiresAt}
            {coupon.minPurchase ? ` · Min ${coupon.minPurchase}` : ''}
          </Text>
        </View>

        {onApply ? (
          <Pressable
            onPress={() => onApply(coupon.code)}
            className={cn(
              'rounded-lg px-4 py-2',
              applied ? 'bg-success/20' : 'bg-accent',
            )}
          >
            <Text className={cn(
              'text-[13px] font-semibold',
              applied ? 'text-success' : 'text-white',
            )}>
              {applied ? 'Applied' : 'Apply'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Card>
  );
}
