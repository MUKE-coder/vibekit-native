import React, { useEffect } from 'react';
import { View, type DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  useReducedMotion,
} from 'react-native-reanimated';
import { cn } from '../lib/utils';

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 8,
  className,
}: SkeletonProps) {
  const reduce = useReducedMotion();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    if (reduce) {
      opacity.value = 0.5;
      return;
    }
    opacity.value = withRepeat(
      withTiming(0.6, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [reduce, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      className={cn('bg-bgHover', className)}
      style={[{ width, height, borderRadius }, animatedStyle]}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <View className={cn('rounded-xl bg-bgElevated border border-border p-4', className)}>
      <Skeleton height={160} borderRadius={8} />
      <View className="mt-3 gap-2">
        <Skeleton height={14} width="70%" />
        <Skeleton height={14} width="40%" />
        <Skeleton height={12} width="50%" />
      </View>
    </View>
  );
}
