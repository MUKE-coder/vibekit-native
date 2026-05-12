import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../ui/avatar';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

interface ChatHeaderProps {
  name: string;
  avatarUrl?: string;
  status?: 'online' | 'offline' | 'typing';
  lastSeen?: string;
  onBack?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMore?: () => void;
  className?: string;
}

const statusText: Record<'online' | 'offline' | 'typing', string> = {
  online: 'Online',
  typing: 'Typing…',
  offline: 'Offline',
};

export function ChatHeader({
  name,
  avatarUrl,
  status,
  lastSeen,
  onBack,
  onCall,
  onVideoCall,
  onMore,
  className,
}: ChatHeaderProps) {
  const subtitle = status === 'offline' && lastSeen ? lastSeen : status ? statusText[status] : undefined;

  return (
    <SafeAreaView edges={['top']} className={cn('bg-bg', className)}>
      <View className="flex-row items-center gap-3 border-b border-border px-3 py-2.5">
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityLabel="Back"
            accessibilityRole="button"
            hitSlop={8}
            className="h-9 w-9 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </Pressable>
        ) : null}

        <Avatar source={avatarUrl} name={name} size="md" />

        <View className="flex-1">
          <Text numberOfLines={1} className="text-[15px] font-semibold text-textPrimary">
            {name}
          </Text>
          {subtitle ? (
            <View className="flex-row items-center gap-1.5 mt-0.5">
              {status === 'online' ? (
                <View className="h-2 w-2 rounded-full bg-success" />
              ) : null}
              <Text className="text-[12px] text-textTertiary">{subtitle}</Text>
            </View>
          ) : null}
        </View>

        {onCall ? (
          <Pressable
            onPress={onCall}
            accessibilityLabel="Voice call"
            accessibilityRole="button"
            hitSlop={8}
            className="h-9 w-9 items-center justify-center"
          >
            <Ionicons name="call-outline" size={22} color={colors.textPrimary} />
          </Pressable>
        ) : null}

        {onVideoCall ? (
          <Pressable
            onPress={onVideoCall}
            accessibilityLabel="Video call"
            accessibilityRole="button"
            hitSlop={8}
            className="h-9 w-9 items-center justify-center"
          >
            <Ionicons name="videocam-outline" size={22} color={colors.textPrimary} />
          </Pressable>
        ) : null}

        {onMore ? (
          <Pressable
            onPress={onMore}
            accessibilityLabel="More options"
            accessibilityRole="button"
            hitSlop={8}
            className="h-9 w-9 items-center justify-center"
          >
            <Ionicons name="ellipsis-vertical" size={22} color={colors.textPrimary} />
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
