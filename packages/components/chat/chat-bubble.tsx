import React from 'react';
import { View, Text } from 'react-native';
import { cn } from '../lib/utils';

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  isOwn: boolean;
  className?: string;
}

export function ChatBubble({ message, timestamp, isOwn, className }: ChatBubbleProps) {
  return (
    <View className={cn('mb-3', isOwn ? 'items-end' : 'items-start', className)}>
      <View
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3',
          isOwn ? 'bg-accent rounded-tr-md' : 'bg-bgElevated border border-border rounded-tl-md',
        )}
      >
        <Text className={cn('text-[15px]', isOwn ? 'text-white' : 'text-textPrimary')}>
          {message}
        </Text>
      </View>
      <Text className="text-textTertiary text-[11px] mt-1 px-1">{timestamp}</Text>
    </View>
  );
}
