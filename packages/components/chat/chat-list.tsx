import React from 'react';
import { FlatList, View, Text, RefreshControl, type ListRenderItem } from 'react-native';
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
  className?: string;
}

export function ChatList({
  messages,
  onRefresh,
  refreshing = false,
  onEndReached,
  ListHeaderComponent,
  emptyText = 'No messages yet. Say hi 👋',
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
    <FlatList
      data={messages}
      keyExtractor={(m) => m.id}
      renderItem={renderItem}
      inverted
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
