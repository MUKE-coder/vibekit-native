import React from 'react';
import { View, Text, Pressable, Modal, Animated, Dimensions, type GestureResponderEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export interface DrawerItem {
  key: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  badge?: number;
  onPress?: () => void;
  /** Renders as a divider when true. */
  divider?: boolean;
  /** Visual variant — destructive items render in error color. */
  variant?: 'default' | 'destructive';
}

export interface DrawerHeader {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
}

interface AppDrawerProps {
  visible: boolean;
  onClose: () => void;
  items: DrawerItem[];
  activeKey?: string;
  header?: DrawerHeader;
  footer?: React.ReactNode;
  /** Drawer width in px (default 304 — Material). Use a number, not a string. */
  width?: number;
}

const SCREEN = Dimensions.get('window');

export function AppDrawer({
  visible,
  onClose,
  items,
  activeKey,
  header,
  footer,
  width = 304,
}: AppDrawerProps) {
  const translateX = React.useRef(new Animated.Value(-width)).current;
  const backdropOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 240,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 240,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -width,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, width, translateX, backdropOpacity]);

  function handleItemPress(item: DrawerItem) {
    return (_e: GestureResponderEvent) => {
      item.onPress?.();
      onClose();
    };
  }

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Animated drawer */}
        <Animated.View
          style={{
            width,
            height: SCREEN.height,
            transform: [{ translateX }],
            backgroundColor: colors.bgElevated,
          }}
          className="border-r border-border"
        >
          <SafeAreaView edges={['top', 'bottom', 'left']} className="flex-1">
            {/* Header */}
            {header ? (
              <View className="px-5 py-5 border-b border-border">
                <View className="flex-row items-center gap-3">
                  {header.avatarUrl ? (
                    <View
                      className="h-12 w-12 rounded-full bg-bgSubtle border border-border"
                    />
                  ) : (
                    <View className="h-12 w-12 rounded-full bg-accent/15 items-center justify-center">
                      <Text className="text-accent font-semibold text-[18px]">
                        {header.title.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <View className="flex-1">
                    <Text className="text-textPrimary text-[15px] font-semibold" numberOfLines={1}>
                      {header.title}
                    </Text>
                    {header.subtitle ? (
                      <Text className="text-textTertiary text-[12.5px]" numberOfLines={1}>
                        {header.subtitle}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
            ) : null}

            {/* Items */}
            <View className="flex-1 py-2">
              {items.map((item) => {
                if (item.divider) {
                  return <View key={item.key} className="h-px bg-border my-2 mx-4" />;
                }
                const active = item.key === activeKey;
                const isDestructive = item.variant === 'destructive';
                return (
                  <Pressable
                    key={item.key}
                    onPress={handleItemPress(item)}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: active }}
                    className={cn(
                      'flex-row items-center gap-3 px-5 py-3 mx-2 rounded-lg',
                      active && 'bg-accent/10',
                    )}
                    android_ripple={{ color: colors.bgHover }}
                  >
                    {item.icon ? (
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={isDestructive ? colors.error : active ? colors.accent : colors.textSecondary}
                      />
                    ) : null}
                    <Text
                      className={cn(
                        'flex-1 text-[14.5px]',
                        isDestructive ? 'text-error' : active ? 'text-accent font-semibold' : 'text-textPrimary',
                      )}
                    >
                      {item.label}
                    </Text>
                    {typeof item.badge === 'number' && item.badge > 0 ? (
                      <View className="px-2 py-0.5 rounded-full bg-accent/15">
                        <Text className="text-accent text-[11px] font-semibold">
                          {item.badge > 99 ? '99+' : item.badge}
                        </Text>
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            {/* Footer */}
            {footer ? <View className="border-t border-border p-4">{footer}</View> : null}
          </SafeAreaView>
        </Animated.View>

        {/* Backdrop */}
        <Animated.View style={{ flex: 1, opacity: backdropOpacity }}>
          <Pressable onPress={onClose} accessibilityLabel="Close menu" className="flex-1 bg-black/60" />
        </Animated.View>
      </View>
    </Modal>
  );
}
