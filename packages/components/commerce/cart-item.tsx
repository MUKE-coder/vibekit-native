import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

export interface CartItemData {
  productId: string;
  name: string;
  image: string;
  price: number;
  compareAt?: number;
  quantity: number;
  options?: Record<string, string>;
}

interface CartItemProps {
  item: CartItemData;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
  onPress?: () => void;
  className?: string;
}

export function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  onPress,
  className,
}: CartItemProps) {
  const fmtPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    }).format(amount);

  return (
    <Pressable
      onPress={onPress}
      className={cn('flex-row p-4 border-b border-border', className)}
    >
      <View className="w-[90px] h-[90px] rounded-xl overflow-hidden bg-bgHover">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          contentFit="cover"
          transition={200}
        />
      </View>

      <View className="flex-1 ml-3">
        <Text className="text-[14px] font-semibold text-textPrimary" numberOfLines={2}>
          {item.name}
        </Text>

        {item.options && Object.entries(item.options).length > 0 ? (
          <Text className="text-textTertiary text-[12px] mt-0.5">
            {Object.entries(item.options)
              .map(([k, v]) => `${k}: ${v}`)
              .join(' · ')}
          </Text>
        ) : null}

        <View className="flex-row items-center mt-1">
          <Text className="text-[16px] font-bold text-textPrimary tabular-nums">
            {fmtPrice(item.price)}
          </Text>
          {item.compareAt && item.compareAt > item.price ? (
            <Text className="text-textTertiary text-[12px] line-through ml-2 tabular-nums">
              {fmtPrice(item.compareAt)}
            </Text>
          ) : null}
        </View>

        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <Pressable
              onPress={() => item.quantity > 1 && onUpdateQuantity(item.quantity - 1)}
              className="w-7 h-7 rounded border border-border items-center justify-center"
            >
              <Text className="text-textPrimary text-[15px] font-medium">-</Text>
            </Pressable>
            <View className="w-7 h-7 border-y border-border items-center justify-center">
              <Text className="text-textPrimary text-[13px] font-semibold">
                {item.quantity}
              </Text>
            </View>
            <Pressable
              onPress={() => onUpdateQuantity(item.quantity + 1)}
              className="w-7 h-7 rounded border border-border items-center justify-center"
            >
              <Text className="text-textPrimary text-[15px] font-medium">+</Text>
            </Pressable>
          </View>

          <Pressable onPress={onRemove} hitSlop={8}>
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
