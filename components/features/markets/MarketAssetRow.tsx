import React from 'react';
import { Text, View } from 'react-native';
import { MarketAsset } from '../../../types/market';

interface MarketAssetRowProps {
  asset: MarketAsset;
}

export const MarketAssetRow: React.FC<MarketAssetRowProps> = ({ asset }) => {
  return (
    <View className="flex-row justify-between items-center py-4 px-4 border-b border-white/5 w-full last:border-0">
      <View className="flex-col gap-1">
        <Text className="font-title-sm text-[18px] text-primary leading-none">{asset.symbol}</Text>
        <Text className="font-body-md text-sm text-on-surface-variant leading-none">{asset.name}</Text>
      </View>
      <View className="flex-col items-end gap-1">
        <Text className="font-title-sm text-[18px] text-primary tabular-nums leading-none">{asset.price}</Text>
        <Text className={`font-body-md text-sm font-medium leading-none ${asset.isPositive ? 'text-emerald-400' : 'text-error'}`}>
          {asset.change}
        </Text>
      </View>
    </View>
  );
};
