import React from 'react';
import { Pressable, View, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { Rating } from '../ui/rating';
import { Badge } from '../ui/badge';

export interface Product {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  currency?: string;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAddToCart?: () => void;
  onWishlistToggle?: () => void;
  isWishlisted?: boolean;
  className?: string;
  compact?: boolean;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - 16 * 2 - CARD_GAP) / 2;

export function ProductCard({
  product,
  onPress,
  onAddToCart,
  onWishlistToggle,
  isWishlisted = false,
  className,
  compact = false,
}: ProductCardProps) {
  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const discount = hasDiscount
    ? Math.round((1 - product.price / product.compareAt!) * 100)
    : 0;

  const fmtPrice = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency || 'USD',
      currencyDisplay: 'narrowSymbol',
    }).format(amount);

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'rounded-xl bg-bgElevated border border-border overflow-hidden',
        compact ? 'flex-row' : 'w-full',
        className,
      )}
      style={compact ? undefined : { width: CARD_WIDTH }}
    >
      <View className={compact ? 'w-[100px] h-[100px]' : 'relative'}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            className={compact ? 'w-full h-full' : 'w-full aspect-square'}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View className={cn('bg-bgHover items-center justify-center', compact ? 'w-full h-full' : 'aspect-square')}>
            <Ionicons name="image-outline" size={28} color="#444444" />
          </View>
        )}

        {/* Wishlist */}
        {onWishlistToggle ? (
          <Pressable
            onPress={onWishlistToggle}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-bg/80 items-center justify-center"
            hitSlop={6}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={16}
              color={isWishlisted ? '#EF4444' : '#A0A0A0'}
            />
          </Pressable>
        ) : null}

        {/* Discount badge */}
        {hasDiscount ? (
          <View className="absolute top-2 left-2 bg-error rounded px-1.5 py-0.5">
            <Text className="text-white text-[10px] font-bold">-{discount}%</Text>
          </View>
        ) : null}

        {/* Product badge */}
        {product.badge ? (
          <View className="absolute top-2 left-2 mt-7">
            <Badge label={product.badge} variant="accent" />
          </View>
        ) : null}
      </View>

      <View className={cn('flex-1', compact ? 'p-3 justify-center' : 'p-3')}>
        <Text
          className="text-[13px] font-semibold text-textPrimary"
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <View className="flex-row items-center mt-1">
          <Text className="text-[16px] font-bold text-textPrimary tabular-nums">
            {fmtPrice(product.price)}
          </Text>
          {hasDiscount ? (
            <Text className="text-[12px] text-textTertiary line-through ml-2 tabular-nums">
              {fmtPrice(product.compareAt!)}
            </Text>
          ) : null}
        </View>

        {product.rating != null ? (
          <View className="flex-row items-center mt-1">
            <Rating value={product.rating} size="sm" />
            <Text className="text-textTertiary text-[11px] ml-1">
              {product.rating}
            </Text>
            {product.reviewCount != null ? (
              <Text className="text-textTertiary text-[11px] ml-1">
                ({product.reviewCount})
              </Text>
            ) : null}
          </View>
        ) : null}

        {onAddToCart && !compact ? (
          <Pressable
            onPress={onAddToCart}
            className="mt-2 h-[32px] rounded-lg bg-accent items-center justify-center"
          >
            <Text className="text-white text-[12px] font-semibold">Add to Cart</Text>
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

export function ProductCardList({ product, onPress, onAddToCart }: {
  product: Product;
  onPress: () => void;
  onAddToCart?: () => void;
}) {
  return (
    <ProductCard
      product={product}
      onPress={onPress}
      onAddToCart={onAddToCart}
      compact
      className="w-full"
    />
  );
}
