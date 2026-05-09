import { ChevronRight, FileText, FolderOpen, Key } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { VaultItem } from '../../../types/vault';

interface VaultItemRowProps {
  item: VaultItem;
}

export const VaultItemRow: React.FC<VaultItemRowProps> = ({ item }) => {
  let IconComponent = Key;
  if (item.icon === 'file-text') IconComponent = FileText;
  if (item.icon === 'folder-open') IconComponent = FolderOpen;

  return (
    <Pressable className="bg-[#1A1A1A] border border-white/5 rounded-xl p-4 flex-row justify-between items-center active:scale-[0.98] transition-all">
      <View className="flex-row items-center gap-4">
        <IconComponent color="#c4c7c8" size={20} />
        <View className="flex-col gap-1">
          <Text className="font-title-sm text-[16px] text-primary leading-none">{item.title}</Text>
          <Text className="font-body-md text-xs text-on-surface-variant leading-none">{item.subtitle}</Text>
        </View>
      </View>
      <ChevronRight color="#c4c7c8" size={20} />
    </Pressable>
  );
};
