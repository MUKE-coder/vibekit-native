import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '../lib/utils';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, style, ...props }: CardProps) {
  return (
    <View
      className={cn('rounded-xl bg-bgElevated border border-border', className)}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}
