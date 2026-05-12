import React from 'react';
import { Pressable, type ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

interface WishlistButtonProps {
  /** Controlled state. */
  active: boolean;
  /** Called with the new state immediately on press. */
  onToggle: (next: boolean) => void | Promise<void>;
  /** Show as a floating circle with bg + shadow (e.g., over product images). */
  floating?: boolean;
  /** Compact (28px) or default (36px) hit area. */
  size?: 'sm' | 'md' | 'lg';
  accessibilityLabel?: string;
  style?: ViewStyle;
  className?: string;
}

const SIZE_MAP: Record<NonNullable<WishlistButtonProps['size']>, { tile: number; icon: number }> = {
  sm: { tile: 28, icon: 14 },
  md: { tile: 36, icon: 18 },
  lg: { tile: 44, icon: 22 },
};

export function WishlistButton({
  active,
  onToggle,
  floating = false,
  size = 'md',
  accessibilityLabel,
  style,
  className,
}: WishlistButtonProps) {
  const scale = useSharedValue(1);
  const dim = SIZE_MAP[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  function handlePress() {
    scale.value = withSequence(
      withTiming(1.25, { duration: 130, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 130, easing: Easing.in(Easing.cubic) }),
    );
    Haptics.selectionAsync().catch(() => {});
    onToggle(!active);
  }

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={
        accessibilityLabel ?? (active ? 'Remove from wishlist' : 'Add to wishlist')
      }
      hitSlop={8}
      className={cn(
        'items-center justify-center rounded-full',
        floating && 'bg-bgElevated/90 border border-border',
        className,
      )}
      style={[
        { width: dim.tile, height: dim.tile },
        floating
          ? { shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 }
          : null,
        style,
      ]}
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={active ? 'heart' : 'heart-outline'}
          size={dim.icon}
          color={active ? colors.error : colors.textPrimary}
        />
      </Animated.View>
    </Pressable>
  );
}
