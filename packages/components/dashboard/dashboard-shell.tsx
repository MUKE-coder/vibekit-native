import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

interface DashboardShellProps {
  /** Page title shown at the top of the scroll view. */
  title: string;
  /** Optional small label above the title (e.g., "Overview"). */
  eyebrow?: string;
  /** Subtitle below the title. */
  subtitle?: string;
  /** Right-side header actions (icon buttons). */
  actions?: HeaderAction[];
  /** Greeting strip — pass user name and we'll add "Hi, {name}" with avatar. */
  greeting?: { name: string; avatar?: React.ReactNode };
  /** Stats row — rendered at the top of the body, horizontally scrollable on mobile. */
  statsRow?: React.ReactNode;
  /** Main content. */
  children: React.ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  className?: string;
}

export interface HeaderAction {
  key: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  badge?: number;
  accessibilityLabel: string;
}

export function DashboardShell({
  title,
  eyebrow,
  subtitle,
  actions = [],
  greeting,
  statsRow,
  children,
  onRefresh,
  refreshing = false,
  className,
}: DashboardShellProps) {
  return (
    <SafeAreaView edges={['top']} className={cn('flex-1 bg-bg', className)}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
        <View className="flex-1 pr-3">
          {eyebrow ? (
            <Text className="text-textTertiary text-[11px] uppercase tracking-widest font-medium">
              {eyebrow}
            </Text>
          ) : null}
          <Text className="text-textPrimary text-[24px] font-bold" numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-textSecondary text-[13.5px] mt-0.5" numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View className="flex-row items-center gap-2">
          {actions.map((a) => (
            <View key={a.key} className="relative">
              <Ionicons
                name={a.icon}
                size={22}
                color={colors.textPrimary}
                onPress={a.onPress}
                accessibilityLabel={a.accessibilityLabel}
                style={{ padding: 8 }}
              />
              {a.badge ? (
                <View className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-error items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">
                    {a.badge > 99 ? '99+' : a.badge}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
          ) : undefined
        }
      >
        {/* Greeting strip */}
        {greeting ? (
          <View className="mx-4 mb-4 flex-row items-center gap-3 rounded-2xl bg-bgElevated border border-border p-4">
            {greeting.avatar}
            <View className="flex-1">
              <Text className="text-textSecondary text-[12.5px]">Welcome back</Text>
              <Text className="text-textPrimary text-[16px] font-semibold" numberOfLines={1}>
                {greeting.name}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Stats row */}
        {statsRow ? <View className="mb-4">{statsRow}</View> : null}

        {/* Body */}
        <View className="px-4">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
