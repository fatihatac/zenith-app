import React from 'react';
import { Text, View } from 'react-native';
import { SignalIntel } from '../../../types/signal';

interface SignalCardProps {
  signal: SignalIntel;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  return (
    <View className="bg-[#1A1A1A] border border-white/5 rounded-xl p-6 flex-col mb-4">
      <View className="flex-row justify-between items-center w-full mb-3">
        <Text className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">{signal.category}</Text>
        <Text className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">{signal.timestamp}</Text>
      </View>
      <Text className="font-title-sm text-[18px] text-primary leading-tight mb-3">
        {signal.title}
      </Text>
      <Text className="font-body-md text-on-surface-variant leading-relaxed">
        {signal.description}
      </Text>
    </View>
  );
};
