import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '../ui/avatar';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export type Presence = 'online' | 'away' | 'offline';

interface ChatHeaderProps {
  name: string;
  avatarUrl?: string;
  /** Presence dot rendered on the avatar. */
  presence?: Presence;
  /** Show "typing…" override. Pass a string[] of names for group chats ("Alex and Sam are typing…"). */
  typing?: boolean | string[];
  /** Status label override (deprecated — use `presence` + `typing`). */
  status?: 'online' | 'offline' | 'typing';
  lastSeen?: string;
  onBack?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMore?: () => void;
  className?: string;
}

function typingLabel(typing: boolean | string[]): string {
  if (typing === true) return 'Typing…';
  if (Array.isArray(typing)) {
    if (typing.length === 0) return '';
    if (typing.length === 1) return `${typing[0]} is typing…`;
    if (typing.length === 2) return `${typing[0]} and ${typing[1]} are typing…`;
    return `${typing[0]} and ${typing.length - 1} others are typing…`;
  }
  return '';
}

function presenceColor(p: Presence | undefined): string | null {
  if (p === 'online') return '#22C55E';
  if (p === 'away') return '#F59E0B';
  if (p === 'offline') return '#6B7280';
  return null;
}

export function ChatHeader({
  name,
  avatarUrl,
  presence,
  typing,
  status,
  lastSeen,
  onBack,
  onCall,
  onVideoCall,
  onMore,
  className,
}: ChatHeaderProps) {
  // Resolve subtitle priority: typing > legacy status > presence + lastSeen
  let subtitle: string | undefined;
  const isTyping = typing === true || (Array.isArray(typing) && typing.length > 0);
  if (isTyping) {
    subtitle = typingLabel(typing!);
  } else if (status === 'typing') {
    subtitle = 'Typing…';
  } else if (presence === 'online') {
    subtitle = 'Online';
  } else if (presence === 'away') {
    subtitle = 'Away';
  } else if (presence === 'offline' || status === 'offline') {
    subtitle = lastSeen ? `Last seen ${lastSeen}` : 'Offline';
  } else if (status === 'online') {
    subtitle = 'Online';
  }

  const dotColor = presenceColor(presence);

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

        <View>
          <Avatar source={avatarUrl} name={name} size="md" />
          {dotColor ? (
            <View
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-bg"
              style={{ backgroundColor: dotColor }}
            />
          ) : null}
        </View>

        <View className="flex-1">
          <Text numberOfLines={1} className="text-[15px] font-semibold text-textPrimary">
            {name}
          </Text>
          {subtitle ? (
            <View className="flex-row items-center gap-1.5 mt-0.5">
              <Text
                className={cn(
                  'text-[12px]',
                  isTyping ? 'text-accent' : 'text-textTertiary',
                )}
                numberOfLines={1}
              >
                {subtitle}
              </Text>
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
