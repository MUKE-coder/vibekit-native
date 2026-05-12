import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

interface OTPInputProps {
  code: string;
  length?: number;
  error?: boolean;
  className?: string;
}

export function OTPInput({
  code,
  length = 4,
  error = false,
  className,
}: OTPInputProps) {
  const boxes = useMemo(
    () => Array.from({ length }, (_, i) => code[i] ?? ''),
    [code, length],
  );

  return (
    <View className={`flex-row justify-center gap-3 ${className ?? ''}`}>
      {boxes.map((digit, i) => (
        <View
          key={i}
          className={`w-[56px] h-[64px] rounded-xl border-2 items-center justify-center ${
            error
              ? 'border-error bg-error/10'
              : digit
                ? 'border-accent bg-accent/10'
                : 'border-border bg-bgElevated'
          }`}
        >
          <Text className="text-[24px] font-bold text-textPrimary">
            {digit}
          </Text>
        </View>
      ))}
    </View>
  );
}
