import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';

interface CategoryCircleProps {
  name: string;
  image?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

export function CategoryCircle({ name, image, icon, onPress }: CategoryCircleProps) {
  return (
    <Pressable onPress={onPress} className="items-center gap-2" style={{ width: 72 }}>
      <View className="w-16 h-16 rounded-full bg-bgElevated border border-border items-center justify-center overflow-hidden">
        {image ? (
          <Image source={{ uri: image }} className="w-full h-full" contentFit="cover" />
        ) : icon ? (
          <Ionicons name={icon} size={24} color="#6366F1" />
        ) : (
          <Ionicons name="grid-outline" size={24} color="#6366F1" />
        )}
      </View>
      <Text className="text-[11px] text-textSecondary text-center" numberOfLines={2}>
        {name}
      </Text>
    </Pressable>
  );
}

interface CategoryCirclesProps {
  categories: { id: string; name: string; image?: string; icon?: keyof typeof Ionicons.glyphMap }[];
  onCategoryPress: (id: string) => void;
  className?: string;
}

export function CategoryCircles({ categories, onCategoryPress, className }: CategoryCirclesProps) {
  return (
    <View className={cn('px-4', className)}>
      <View className="flex-row gap-4 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <CategoryCircle
            key={cat.id}
            name={cat.name}
            image={cat.image}
            icon={cat.icon}
            onPress={() => onCategoryPress(cat.id)}
          />
        ))}
      </View>
    </View>
  );
}
