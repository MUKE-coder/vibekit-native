import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { cn } from '../lib/utils';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingSpinner({
  size = 'large',
  message,
  fullScreen = false,
  className,
}: LoadingSpinnerProps) {
  const content = (
    <View className={cn('items-center justify-center', className)}>
      <ActivityIndicator size={size} color="#6366F1" />
      {message ? (
        <Text className="text-textSecondary text-[14px] mt-3">{message}</Text>
      ) : null}
    </View>
  );

  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-bg">
        {content}
      </View>
    );
  }

  return content;
}
