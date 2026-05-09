import { Plus, Terminal } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export const FloatingActionButtons: React.FC = () => {
  return (
    <View pointerEvents="box-none" className="absolute bottom-28 right-margin-mobile flex-row items-center gap-3 z-40">
      <Pressable className="bg-primary rounded-full px-5 py-3 flex-row items-center gap-2 shadow-lg active:scale-95 transition-all">
        <Terminal color="#2f3131" size={18} />
        <Text className="font-title-sm text-sm font-medium text-on-primary">Command</Text>
      </Pressable>
      <Pressable className="bg-surface-container-high border border-white/10 rounded-full w-12 h-12 items-center justify-center active:scale-95 transition-all">
        <Plus color="#ffffff" size={24} />
      </Pressable>
    </View>
  );
};
