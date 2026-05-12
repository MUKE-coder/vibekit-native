import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
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

const typeConfig: Record<ToastType, { icon: keyof typeof Ionicons.glyphMap; bg: string; border: string }> = {
  success: { icon: 'checkmark-circle', bg: 'bg-successLight', border: 'border-success/30' },
  error: { icon: 'alert-circle', bg: 'bg-errorLight', border: 'border-error/30' },
  warning: { icon: 'warning', bg: 'bg-warningLight', border: 'border-warning/30' },
  info: { icon: 'information-circle', bg: 'bg-infoLight', border: 'border-info/30' },
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
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -20, duration: 200, useNativeDriver: true }),
        ]).start(() => onDismiss?.());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

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
      style={{ opacity, transform: [{ translateY }] }}
    >
      <Ionicons name={cfg.icon} size={20} color={type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#3B82F6'} />
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
