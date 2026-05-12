import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { cn } from '../lib/utils';

interface FlashSaleTimerProps {
  endTime?: number;
  className?: string;
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return {
    hours: h.toString().padStart(2, '0'),
    minutes: m.toString().padStart(2, '0'),
    seconds: s.toString().padStart(2, '0'),
  };
}

export function FlashSaleTimer({ endTime = 7200, className }: FlashSaleTimerProps) {
  const [remaining, setRemaining] = useState(endTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { hours, minutes, seconds } = formatTime(remaining);

  return (
    <View className={cn('flex-row items-center gap-1', className)}>
      <TimeBox value={hours} />
      <Text className="text-[16px] font-bold text-textPrimary">:</Text>
      <TimeBox value={minutes} />
      <Text className="text-[16px] font-bold text-textPrimary">:</Text>
      <TimeBox value={seconds} />
    </View>
  );
}

function TimeBox({ value }: { value: string }) {
  return (
    <View className="bg-accent rounded-lg px-2 py-1">
      <Text className="text-white text-[16px] font-bold tabular-nums">{value}</Text>
    </View>
  );
}
