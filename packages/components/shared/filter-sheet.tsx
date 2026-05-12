import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { BottomSheet } from '../ui/bottom-sheet';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  sections: FilterSection[];
  selected: Record<string, string[]>;
  onApply: (selected: Record<string, string[]>) => void;
  onReset?: () => void;
}

export function FilterSheet({
  visible,
  onClose,
  sections,
  selected,
  onApply,
  onReset,
}: FilterSheetProps) {
  const [local, setLocal] = useState<Record<string, string[]>>(selected);

  function toggle(sectionTitle: string, value: string, multi?: boolean) {
    setLocal((prev) => {
      const current = prev[sectionTitle] ?? [];
      if (multi) {
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [sectionTitle]: next };
      }
      return { ...prev, [sectionTitle]: current.includes(value) ? [] : [value] };
    });
  }

  const totalSelected = useMemo(
    () => Object.values(local).reduce((sum, arr) => sum + arr.length, 0),
    [local],
  );

  return (
    <BottomSheet visible={visible} onClose={onClose} className="pb-4">
      <View className="flex-row items-center justify-between px-4 pb-3 border-b border-border">
        <Text className="text-[17px] font-semibold text-textPrimary">Filters</Text>
        <Pressable onPress={onClose} hitSlop={8}>
          <Ionicons name="close" size={22} color="#A0A0A0" />
        </Pressable>
      </View>

      <ScrollView className="max-h-[60%] px-4 pt-3">
        {sections.map((section) => (
          <View key={section.title} className="mb-5">
            <Text className="text-[14px] font-semibold text-textPrimary mb-2">
              {section.title}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {section.options.map((opt) => {
                const isSelected = (local[section.title] ?? []).includes(opt.value);
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => toggle(section.title, opt.value, section.multiSelect)}
                    className={cn(
                      'rounded-full px-3.5 py-2 border',
                      isSelected
                        ? 'bg-accent/10 border-accent'
                        : 'bg-bgSubtle border-border',
                    )}
                  >
                    <Text
                      className={cn(
                        'text-[13px]',
                        isSelected ? 'text-accent font-medium' : 'text-textSecondary',
                      )}
                    >
                      {opt.label}
                      {opt.count != null ? ` (${opt.count})` : ''}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row gap-3 px-4 pt-3 border-t border-border">
        {onReset ? (
          <Pressable
            onPress={() => { setLocal({}); onReset(); }}
            className="flex-1 h-[48px] rounded-lg border border-border items-center justify-center"
          >
            <Text className="text-textSecondary text-[15px] font-medium">Reset</Text>
          </Pressable>
        ) : null}
        <Pressable
          onPress={() => { onApply(local); onClose(); }}
          className="flex-1 h-[48px] rounded-lg bg-accent items-center justify-center"
        >
          <Text className="text-white text-[15px] font-semibold">
            Apply{totalSelected > 0 ? ` (${totalSelected})` : ''}
          </Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
}
