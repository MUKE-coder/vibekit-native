import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { Badge } from '../ui/badge';
import { Rating } from '../ui/rating';
import { Divider } from '../ui/divider';

export interface ProductDetailData {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  description?: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  badge?: string;
}

interface ProductHeaderProps {
  product: ProductDetailData;
  selectedColor?: string;
  selectedSize?: string;
  onColorChange?: (color: string) => void;
  onSizeChange?: (size: string) => void;
  onAddToCart?: () => void;
  onWishlistToggle?: () => void;
  isWishlisted?: boolean;
  className?: string;
}

export function ProductHeader({
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
  onAddToCart,
  onWishlistToggle,
  isWishlisted = false,
  className,
}: ProductHeaderProps) {
  const fmtPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(amount);

  return (
    <ScrollView className={cn('flex-1 bg-bg', className)}>
      {/* Image gallery */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {product.images.map((img, i) => (
          <View key={i} className="w-screen aspect-[3/4] bg-bgHover">
            <Image source={{ uri: img }} className="w-full h-full" contentFit="cover" />
          </View>
        ))}
      </ScrollView>

      <View className="px-4 pt-4 pb-6">
        {/* Badge + wishlist */}
        <View className="flex-row items-center justify-between">
          {product.badge ? <Badge label={product.badge} variant="accent" /> : <View />}
          {onWishlistToggle ? (
            <Pressable onPress={onWishlistToggle} hitSlop={8}>
              <Ionicons name={isWishlisted ? 'heart' : 'heart-outline'} size={22} color={isWishlisted ? '#EF4444' : '#A0A0A0'} />
            </Pressable>
          ) : null}
        </View>

        {/* Name */}
        <Text className="text-[18px] font-semibold text-textPrimary mt-2">{product.name}</Text>

        {/* Price */}
        <View className="flex-row items-baseline gap-2 mt-1">
          <Text className="text-[22px] font-bold text-textPrimary tabular-nums">{fmtPrice(product.price)}</Text>
          {product.compareAt ? (
            <Text className="text-textTertiary text-[15px] line-through tabular-nums">{fmtPrice(product.compareAt)}</Text>
          ) : null}
        </View>

        {/* Rating */}
        {product.rating ? (
          <View className="flex-row items-center mt-2">
            <Rating value={product.rating} size="sm" />
            <Text className="text-textSecondary text-[13px] ml-2">
              {product.rating} ({product.reviewCount ?? 0} reviews)
            </Text>
          </View>
        ) : null}

        <Divider className="my-4" />

        {/* Color selector */}
        {product.colors && product.colors.length > 0 ? (
          <View className="mb-4">
            <Text className="text-[14px] font-semibold text-textPrimary mb-2">
              Color: {selectedColor ?? 'Select'}
            </Text>
            <View className="flex-row gap-3">
              {product.colors.map((c) => (
                <Pressable
                  key={c.name}
                  onPress={() => onColorChange?.(c.name)}
                  className={cn(
                    'w-8 h-8 rounded-full border-2',
                    selectedColor === c.name ? 'border-accent' : 'border-border',
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </View>
          </View>
        ) : null}

        {/* Size selector */}
        {product.sizes && product.sizes.length > 0 ? (
          <View className="mb-4">
            <Text className="text-[14px] font-semibold text-textPrimary mb-2">
              Size: {selectedSize ?? 'Select'}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {product.sizes.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => onSizeChange?.(s)}
                  className={cn(
                    'h-[36px] min-w-[48px] rounded-lg border items-center justify-center px-3',
                    selectedSize === s
                      ? 'bg-accent/10 border-accent'
                      : 'bg-bgElevated border-border',
                  )}
                >
                  <Text className={cn(
                    'text-[13px] font-medium',
                    selectedSize === s ? 'text-accent' : 'text-textSecondary',
                  )}>
                    {s}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {/* Description */}
        {product.description ? (
          <View className="mt-2">
            <Text className="text-[14px] font-semibold text-textPrimary mb-1">Description</Text>
            <Text className="text-[14px] text-textSecondary leading-5">{product.description}</Text>
          </View>
        ) : null}
      </View>

      {/* Add to cart sticky footer */}
      {onAddToCart ? (
        <View className="px-4 py-3 border-t border-border bg-bgElevated">
          <Pressable
            onPress={onAddToCart}
            className="h-[52px] rounded-xl bg-accent items-center justify-center"
          >
            <Text className="text-white text-[16px] font-semibold">
              Add to Cart — {fmtPrice(product.price)}
            </Text>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}
