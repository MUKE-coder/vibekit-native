import React from 'react';
import { View, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '../lib/utils';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | string;
  className?: string;
}

export function BottomSheet({
  visible,
  onClose,
  children,
  height,
  className,
}: BottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <Pressable className="flex-1" onPress={onClose} />
        <View
          className={cn('bg-bgElevated rounded-t-2xl', className)}
          style={typeof height === 'number' ? { height } : undefined}
        >
          <View className="items-center pt-2 pb-2">
            <View className="w-9 h-1 rounded-full bg-borderStrong" />
          </View>
          {children}
          <SafeAreaView edges={['bottom']} />
        </View>
      </View>
    </Modal>
  );
}
