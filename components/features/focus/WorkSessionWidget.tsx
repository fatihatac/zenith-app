import React from 'react';
import { Pressable, Text, View } from 'react-native';

export const WorkSessionWidget: React.FC = () => {
  return (
    <View className="bg-[#1A1A1A] border border-white/5 rounded-xl p-8 items-center justify-center gap-6 min-h-[300px] mb-lg">
      <Text className="text-on-surface-variant font-label-caps text-label-caps uppercase tracking-widest">
        Deep Work Session
      </Text>
      <Text className="font-display-lg text-[64px] text-primary tracking-tighter tabular-nums">
        25:00
      </Text>
      <Pressable className="bg-primary px-8 py-3 rounded-full active:scale-95 transition-all">
        <Text className="text-on-primary font-title-sm text-title-sm">START</Text>
      </Pressable>
    </View>
  );
};
