import React from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { ChatBubble } from './chat-bubble';
import { colors } from '../lib/theme';

export interface ChatMessage {
  id: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
  senderName?: string;
  senderAvatar?: string;
}

interface ChatListProps {
  messages: ChatMessage[];
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
  ListHeaderComponent?: React.ComponentType | React.ReactElement | null;
  emptyText?: string;
  /** Average bubble height. FlashList uses this to recycle rows. Default 72. */
  estimatedItemSize?: number;
  className?: string;
}

export function ChatList({
  messages,
  onRefresh,
  refreshing = false,
  onEndReached,
  ListHeaderComponent,
  emptyText = 'No messages yet. Say hi 👋',
  estimatedItemSize = 72,
  className,
}: ChatListProps) {
  const renderItem: ListRenderItem<ChatMessage> = ({ item }) => (
    <ChatBubble
      message={item.message}
      timestamp={item.timestamp}
      isOwn={item.isOwn}
    />
  );

  return (
    <FlashList
      data={messages}
      keyExtractor={(m) => m.id}
      renderItem={renderItem}
      inverted
      estimatedItemSize={estimatedItemSize}
      // Different recycling pool for own vs. other bubbles — they have different layouts.
      getItemType={(item) => (item.isOwn ? 'own' : 'other')}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      ListHeaderComponent={ListHeaderComponent}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        ) : undefined
      }
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center py-16">
          <Text className="text-textTertiary text-[14px]">{emptyText}</Text>
        </View>
      }
      className={className}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}
