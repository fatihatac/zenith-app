import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { VaultItemRow } from '../../components/features/vault/VaultItemRow';
import { VaultStatusCard } from '../../components/features/vault/VaultStatusCard';
import { useVault } from '../../hooks/useVault';

export default function VaultScreen() {
  const { items, status } = useVault();

  return (
    <ScrollView className="flex-1 bg-background pt-24 px-margin-mobile pb-32" showsVerticalScrollIndicator={false}>
      {/* Vault Status Card */}
      {status && <VaultStatusCard status={status} />}

      <Text className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest pl-2 mt-4 mb-2">
        Secure Items
      </Text>

      {/* Encrypted Items List */}
      <View className="flex-col gap-3">
        {items.map((item) => (
          <VaultItemRow key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}