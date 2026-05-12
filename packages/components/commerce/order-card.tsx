import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { Badge } from '../ui/badge';

type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface Order {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: { name: string; image: string; quantity: number }[];
}

interface OrderCardProps {
  order: Order;
  onPress: () => void;
  onTrack?: () => void;
  className?: string;
}

const statusConfig: Record<OrderStatus, { label: string; variant: 'success' | 'warning' | 'info' | 'error' | 'neutral' }> = {
  confirmed: { label: 'Confirmed', variant: 'info' },
  processing: { label: 'Processing', variant: 'warning' },
  shipped: { label: 'Shipped', variant: 'accent' },
  delivered: { label: 'Delivered', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'error' },
  returned: { label: 'Returned', variant: 'neutral' },
};

export function OrderCard({ order, onPress, onTrack, className }: OrderCardProps) {
  const cfg = statusConfig[order.status];
  const fmtPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  return (
    <Pressable
      onPress={onPress}
      className={cn('rounded-xl border border-border bg-bgElevated overflow-hidden', className)}
    >
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-border">
        <View>
          <Text className="text-[13px] font-semibold text-textPrimary">{order.number}</Text>
          <Text className="text-textTertiary text-[12px] mt-0.5">{order.date}</Text>
        </View>
        <Badge label={cfg.label} variant={cfg.variant} />
      </View>

      <View className="px-4 py-3">
        <View className="flex-row gap-2">
          {order.items.slice(0, 3).map((item, i) => (
            <View key={i} className="w-14 h-14 rounded-lg overflow-hidden bg-bgHover">
              <Image source={{ uri: item.image }} className="w-full h-full" contentFit="cover" />
            </View>
          ))}
          {order.items.length > 3 ? (
            <View className="w-14 h-14 rounded-lg bg-bgSubtle items-center justify-center">
              <Text className="text-textSecondary text-[11px] font-medium">
                +{order.items.length - 3}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="flex-row items-center justify-between px-4 py-3 border-t border-border">
        <Text className="text-[15px] font-bold text-textPrimary tabular-nums">
          {fmtPrice(order.total)}
        </Text>
        {onTrack && order.status !== 'delivered' && order.status !== 'cancelled' ? (
          <Pressable onPress={onTrack} className="flex-row items-center gap-1">
            <Text className="text-accent text-[13px] font-semibold">Track</Text>
            <Ionicons name="chevron-forward" size={14} color="#6366F1" />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}
