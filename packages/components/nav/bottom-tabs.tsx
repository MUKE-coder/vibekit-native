import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export interface BottomTab {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive?: keyof typeof Ionicons.glyphMap;
  /** Numeric badge (or boolean to show a dot). */
  badge?: number | boolean;
}

interface BottomTabsProps {
  tabs: BottomTab[];
  activeKey: string;
  onChange: (key: string) => void;
  /** Override default safe-area bottom inset behaviour. */
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
  className?: string;
}

/**
 * Custom tab bar — pair with expo-router's <Tabs> by passing `tabBar={() => <BottomTabs ... />}`,
 * or use standalone above your screen.
 */
export function BottomTabs({
  tabs,
  activeKey,
  onChange,
  edges = ['bottom'],
  className,
}: BottomTabsProps) {
  return (
    <SafeAreaView edges={edges} className={cn('bg-bg', className)}>
      <View className="flex-row items-stretch border-t border-border bg-bg">
        {tabs.map((tab) => {
          const active = tab.key === activeKey;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onChange(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={tab.label}
              className="flex-1 items-center justify-center py-2.5"
              android_ripple={{ color: colors.bgHover, borderless: false }}
            >
              <View>
                <Ionicons
                  name={active ? (tab.iconActive ?? tab.icon) : tab.icon}
                  size={22}
                  color={active ? colors.accent : colors.textTertiary}
                />
                {tab.badge ? (
                  <View
                    className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-error items-center justify-center"
                    style={{ minWidth: typeof tab.badge === 'number' ? 16 : 8 }}
                  >
                    {typeof tab.badge === 'number' ? (
                      <Text className="text-white text-[10px] font-bold">
                        {tab.badge > 99 ? '99+' : tab.badge}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <Text
                className={cn(
                  'text-[11px] mt-1',
                  active ? 'text-accent font-semibold' : 'text-textTertiary',
                )}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
