import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

type OrderTimelineStep = {
  label: string;
  date?: string;
  completed: boolean;
  active: boolean;
};

interface OrderTimelineProps {
  steps: OrderTimelineStep[];
  className?: string;
}

export function OrderTimeline({ steps, className }: OrderTimelineProps) {
  return (
    <View className={cn('px-4 py-2', className)}>
      {steps.map((step, i) => (
        <View key={i} className="flex-row">
          {/* Timeline */}
          <View className="items-center w-8">
            <View
              className={cn(
                'w-7 h-7 rounded-full items-center justify-center',
                step.active
                  ? 'bg-accent'
                  : step.completed
                    ? 'bg-success'
                    : 'bg-bgHover',
              )}
            >
              {step.completed || step.active ? (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              ) : (
                <View className="w-2 h-2 rounded-full bg-borderStrong" />
              )}
            </View>
            {i < steps.length - 1 ? (
              <View
                className={cn(
                  'w-0.5 flex-1',
                  step.completed ? 'bg-success' : 'bg-border',
                )}
                style={{ minHeight: 24 }}
              />
            ) : null}
          </View>

          {/* Content */}
          <View className={cn('flex-1 ml-3', i < steps.length - 1 && 'pb-4')}>
            <Text
              className={cn(
                'text-[14px]',
                step.active
                  ? 'font-semibold text-textPrimary'
                  : step.completed
                    ? 'text-textPrimary'
                    : 'text-textTertiary',
              )}
            >
              {step.label}
            </Text>
            {step.date ? (
              <Text className="text-textTertiary text-[12px] mt-0.5">
                {step.date}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
