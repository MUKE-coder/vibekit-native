import React from 'react';
import { View } from 'react-native';
import { cn } from '../lib/utils';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <View className={cn('h-px bg-border', className)} />;
}
