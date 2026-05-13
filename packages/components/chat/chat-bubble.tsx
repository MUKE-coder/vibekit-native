import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export type DeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

interface ChatBubbleProps {
  message: string;
  timestamp: string;
  isOwn: boolean;
  /** WhatsApp-style delivery indicator. Only renders for own messages. */
  deliveryStatus?: DeliveryStatus;
  className?: string;
}

export function ChatBubble({ message, timestamp, isOwn, deliveryStatus, className }: ChatBubbleProps) {
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
      <View className={cn('mt-1 px-1 flex-row items-center gap-1', isOwn ? 'justify-end' : 'justify-start')}>
        <Text className="text-textTertiary text-[11px]">{timestamp}</Text>
        {isOwn && deliveryStatus ? <DeliveryTicks status={deliveryStatus} /> : null}
      </View>
    </View>
  );
}

function DeliveryTicks({ status }: { status: DeliveryStatus }) {
  if (status === 'failed') {
    return <Ionicons name="alert-circle" size={13} color={colors.error} />;
  }
  if (status === 'sending') {
    return <Ionicons name="time-outline" size={12} color={colors.textTertiary} />;
  }
  // sent | delivered | read all show ticks; color/count varies
  const tint =
    status === 'read'
      ? colors.accent
      : status === 'delivered'
        ? colors.textSecondary
        : colors.textTertiary;
  if (status === 'sent') {
    return <Ionicons name="checkmark" size={13} color={tint} />;
  }
  // delivered + read: double ticks (overlapping)
  return (
    <View className="flex-row" style={{ width: 16, height: 13 }}>
      <Ionicons name="checkmark" size={13} color={tint} style={{ position: 'absolute', left: 0 }} />
      <Ionicons name="checkmark" size={13} color={tint} style={{ position: 'absolute', left: 4 }} />
    </View>
  );
}
