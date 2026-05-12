import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

interface SearchableSelectOption {
  label: string;
  value: string;
  description?: string;
}

interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Search...',
  label,
  error,
  disabled = false,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const selected = options.find((o) => o.value === value);
  const filtered = query.trim()
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          o.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  return (
    <View className={cn('w-full', className)}>
      {label ? (
        <Text className="text-[14px] font-medium text-textSecondary mb-1.5">
          {label}
        </Text>
      ) : null}

      <Pressable
        onPress={() => { if (!disabled) { setOpen(true); setQuery(''); } }}
        disabled={disabled}
        className="flex-row items-center h-[52px] rounded-lg border border-border bg-bgElevated px-4"
      >
        <Text
          className={`flex-1 text-[15px] ${
            selected ? 'text-textPrimary' : 'text-textTertiary'
          }`}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.textTertiary} />
      </Pressable>

      {error ? (
        <Text className="text-error text-[12px] mt-1.5">{error}</Text>
      ) : null}

      <Modal visible={open} transparent animationType="slide">
        <Pressable
          className="flex-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onPress={() => setOpen(false)}
        />
        <View className="bg-bgElevated rounded-t-2xl max-h-[60%] pb-8">
          <View className="items-center pt-2 pb-3">
            <View className="w-9 h-1 rounded-full bg-borderStrong" />
          </View>
          <View className="px-4 pb-3">
            <View className="flex-row items-center h-[44px] rounded-full bg-bgSubtle px-4">
              <Ionicons name="search" size={18} color={colors.textTertiary} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={placeholder}
                placeholderTextColor={colors.textTertiary}
                className="flex-1 text-[15px] text-textPrimary ml-2"
                autoFocus
              />
              {query ? (
                <Pressable onPress={() => setQuery('')} hitSlop={8}>
                  <Ionicons name="close" size={18} color={colors.textTertiary} />
                </Pressable>
              ) : null}
            </View>
          </View>
          <FlashList
            data={filtered}
            keyExtractor={(item) => item.value}
            estimatedItemSize={options.some((o) => o.description) ? 70 : 52}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                className={`rounded-xl px-4 py-3.5 mb-1 ${
                  item.value === value
                    ? 'bg-accent/10 border border-accent/30'
                    : 'bg-bgSubtle'
                }`}
              >
                <Text className="text-[15px] font-medium text-textPrimary">
                  {item.label}
                </Text>
                {item.description ? (
                  <Text className="text-textTertiary text-[13px] mt-0.5">
                    {item.description}
                  </Text>
                ) : null}
              </Pressable>
            )}
            ListEmptyComponent={
              <Text className="text-textTertiary text-[14px] text-center py-8">
                No results found
              </Text>
            }
          />
        </View>
      </Modal>
    </View>
  );
}
