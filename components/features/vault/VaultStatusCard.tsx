import { Lock } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { VaultStatus } from '../../../types/vault';

interface VaultStatusCardProps {
  status: VaultStatus;
}

export const VaultStatusCard: React.FC<VaultStatusCardProps> = ({ status }) => {
  return (
    <View className="bg-[#1A1A1A] border border-white/5 rounded-xl p-6 flex-row items-center gap-5 mb-2">
      <View className="bg-white/5 p-4 rounded-full items-center justify-center border border-emerald-400/20">
        <Lock color="#34d399" size={24} />
      </View>
      <View className="flex-col gap-1">
        <Text className="font-title-sm text-[20px] text-primary font-medium leading-none">{status.title}</Text>
        <Text className="font-body-md text-sm text-emerald-400 font-medium tracking-wide">{status.status}</Text>
      </View>
    </View>
  );
};
