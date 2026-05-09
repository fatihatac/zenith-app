import { Cloud, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface SystemLogItemProps {
  icon: 'cloud' | 'shield';
  title: string;
  description: string;
  time: string;
}

export const SystemLogItem: React.FC<SystemLogItemProps> = ({ icon, title, description, time }) => {
  const IconComponent = icon === 'cloud' ? Cloud : ShieldCheck;

  return (
    <View className="flex-row items-center gap-4 py-3 border-b border-white/5">
      <IconComponent color="#c4c7c8" size={20} />
      <View className="flex-1">
        <Text className="text-primary font-body-md">{title}</Text>
        <Text className="text-on-surface-variant text-sm">{description}</Text>
      </View>
      <Text className="text-on-surface-variant text-xs">{time}</Text>
    </View>
  );
};
