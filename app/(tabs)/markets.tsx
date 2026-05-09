import React from 'react';
import { ScrollView, View } from 'react-native';
import { MarketAssetRow } from '../../components/features/markets/MarketAssetRow';
import { useMarkets } from '../../hooks/useMarkets';

export default function MarketsScreen() {
  const { assets } = useMarkets();

  return (
    <ScrollView className="flex-1 bg-background pt-24 px-margin-mobile pb-32" showsVerticalScrollIndicator={false}>
      {/* Financial Asset List Container */}
      <View className="bg-[#1A1A1A] border border-white/5 rounded-xl p-2 flex-col w-full">
        {assets.map((asset) => (
          <MarketAssetRow key={asset.id} asset={asset} />
        ))}
      </View>
    </ScrollView>
  );
}