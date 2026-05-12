import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { cn } from '../lib/utils';

interface BannerItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  cta?: string;
}

interface HeroBannerProps {
  banners: BannerItem[];
  onBannerPress: (id: string) => void;
  className?: string;
}

export function HeroBanner({ banners, onBannerPress, className }: HeroBannerProps) {
  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
      setActiveIndex(index);
    },
    [screenWidth],
  );

  if (banners.length === 0) return null;

  return (
    <View className={cn('mt-3', className)}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {banners.map((banner) => (
          <Pressable
            key={banner.id}
            onPress={() => onBannerPress(banner.id)}
            style={{ width: screenWidth }}
          >
            <View className="mx-4 overflow-hidden rounded-xl" style={{ aspectRatio: 16 / 7 }}>
              <Image
                source={{ uri: banner.image }}
                className="w-full h-full"
                contentFit="cover"
              />
              <View className="absolute bottom-0 left-0 right-0 bg-black/40 px-4 py-3">
                <Text className="text-[18px] font-bold text-white">{banner.title}</Text>
                {banner.subtitle ? (
                  <Text className="text-[13px] text-white/90 mt-0.5">{banner.subtitle}</Text>
                ) : null}
                {banner.cta ? (
                  <View className="mt-2 self-start rounded-full bg-white px-4 py-1.5">
                    <Text className="text-[12px] font-semibold text-black">{banner.cta}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {banners.length > 1 ? (
        <View className="flex-row items-center justify-center gap-1.5 mt-3">
          {banners.map((banner, i) => (
            <View
              key={banner.id}
              className={cn(
                'h-2 w-2 rounded-full',
                i === activeIndex ? 'bg-accent' : 'bg-border',
              )}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
