import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { cn } from '../lib/utils';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 8,
  className,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.6, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      className={cn('bg-bgHover', className)}
      style={{ width, height, borderRadius, opacity }}
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
