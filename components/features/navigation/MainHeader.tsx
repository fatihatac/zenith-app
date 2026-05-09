import { Menu, Search } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface MainHeaderProps {
  onMenuPress: () => void;
  title?: string;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ onMenuPress, title = 'ZENITH' }) => {
  return (
    <View className="absolute top-0 left-0 right-0 w-full flex-row justify-between items-center px-margin-mobile pt-14 pb-4 border-b border-white/5 bg-background/80 z-50">
      <Pressable className="p-2 -ml-2 active:opacity-50" onPress={onMenuPress}>
        <Menu color="#ffffff" size={24} />
      </Pressable>
      <Text className="font-display-lg text-[24px] font-semibold tracking-tighter text-primary">{title}</Text>
      <Pressable className="p-2 -mr-2 active:opacity-50">
        <Search color="#ffffff" size={24} />
      </Pressable>
    </View>
  );
};
