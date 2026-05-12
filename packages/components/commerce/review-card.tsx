import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../ui/avatar';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export interface Review {
  id: string;
  authorName: string;
  authorAvatarUrl?: string;
  rating: number;       // 0..5, half-stars allowed (e.g., 4.5)
  date: string;         // ISO or pre-formatted
  title?: string;
  body: string;
  verified?: boolean;
  helpfulCount?: number;
}

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  className?: string;
}

function formatDate(input: string): string {
  if (!input) return '';
  if (Number.isNaN(Date.parse(input))) return input;
  return new Date(input).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ReviewCard({ review, onHelpful, className }: ReviewCardProps) {
  return (
    <View className={cn('rounded-2xl border border-border bg-bgElevated p-4', className)}>
      {/* Header — avatar + author + verified */}
      <View className="flex-row items-center gap-3">
        <Avatar source={review.authorAvatarUrl} name={review.authorName} size="md" />
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-textPrimary text-[14px] font-semibold" numberOfLines={1}>
              {review.authorName}
            </Text>
            {review.verified ? (
              <View className="flex-row items-center gap-1 px-1.5 py-0.5 rounded bg-success/15">
                <Ionicons name="checkmark-circle" size={10} color={colors.success} />
                <Text className="text-success text-[10px] font-semibold">Verified</Text>
              </View>
            ) : null}
          </View>
          <Text className="text-textTertiary text-[11.5px] mt-0.5">
            {formatDate(review.date)}
          </Text>
        </View>
      </View>

      {/* Stars */}
      <View className="mt-3 flex-row items-center gap-0.5">
        <Stars rating={review.rating} />
        <Text className="ml-2 text-textSecondary text-[12.5px] font-medium">
          {review.rating.toFixed(1)}
        </Text>
      </View>

      {/* Body */}
      {review.title ? (
        <Text className="mt-3 text-textPrimary text-[14.5px] font-semibold">{review.title}</Text>
      ) : null}
      <Text className={cn('text-textSecondary text-[13.5px] leading-relaxed', review.title ? 'mt-1' : 'mt-3')}>
        {review.body}
      </Text>

      {/* Helpful */}
      {onHelpful ? (
        <View className="mt-4 flex-row items-center gap-3 pt-3 border-t border-border">
          <Text
            onPress={() => onHelpful(review.id)}
            className="text-textSecondary text-[12.5px] font-medium"
          >
            👍 Helpful{typeof review.helpfulCount === 'number' && review.helpfulCount > 0 ? ` (${review.helpfulCount})` : ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => {
        const name: React.ComponentProps<typeof Ionicons>['name'] =
          i < full ? 'star' : i === full && hasHalf ? 'star-half' : 'star-outline';
        return <Ionicons key={i} name={name} size={14} color={colors.warning} />;
      })}
    </>
  );
}
