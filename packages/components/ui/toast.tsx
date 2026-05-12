import React, { useEffect } from 'react';
import { Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  useReducedMotion,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastAction {
  label: string;
  onPress: () => void;
}

interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  action?: ToastAction;
  onDismiss?: () => void;
  duration?: number;
  className?: string;
}

const typeConfig: Record<ToastType, { icon: keyof typeof Ionicons.glyphMap; bg: string; border: string; iconColor: string }> = {
  success: { icon: 'checkmark-circle', bg: 'bg-successLight', border: 'border-success/30', iconColor: '#22C55E' },
  error:   { icon: 'alert-circle',     bg: 'bg-errorLight',   border: 'border-error/30',   iconColor: '#EF4444' },
  warning: { icon: 'warning',          bg: 'bg-warningLight', border: 'border-warning/30', iconColor: '#F59E0B' },
  info:    { icon: 'information-circle', bg: 'bg-infoLight',  border: 'border-info/30',    iconColor: '#3B82F6' },
};

export function Toast({
  visible,
  message,
  type = 'info',
  action,
  onDismiss,
  duration = 3000,
  className,
}: ToastProps) {
  const reduce = useReducedMotion();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  useEffect(() => {
    if (!visible) return;
    const enterDuration = reduce ? 0 : 200;
    opacity.value = withTiming(1, { duration: enterDuration });
    translateY.value = withTiming(0, { duration: enterDuration });

    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: enterDuration }, (finished) => {
        if (finished && onDismiss) runOnJS(onDismiss)();
      });
      translateY.value = withTiming(-20, { duration: enterDuration });
    }, duration);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, duration, reduce]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  const cfg = typeConfig[type];

  return (
    <Animated.View
      className={cn(
        'absolute top-12 left-4 right-4 z-50 flex-row items-center rounded-xl border px-4 py-3',
        cfg.bg,
        cfg.border,
        className,
      )}
      style={animatedStyle}
    >
      <Ionicons name={cfg.icon} size={20} color={cfg.iconColor} />
      <Text className="flex-1 text-textPrimary text-[14px] ml-3">{message}</Text>
      {action ? (
        <Pressable onPress={action.onPress} className="ml-2">
          <Text className="text-accent text-[13px] font-semibold">{action.label}</Text>
        </Pressable>
      ) : null}
      {onDismiss ? (
        <Pressable onPress={onDismiss} className="ml-2" hitSlop={8}>
          <Ionicons name="close" size={18} color="#666666" />
        </Pressable>
      ) : null}
    </Animated.View>
  );
}
