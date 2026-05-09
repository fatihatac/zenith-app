import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SystemLogItem } from '../../components/features/focus/SystemLogItem';
import { WorkSessionWidget } from '../../components/features/focus/WorkSessionWidget';

export default function FocusScreen() {
  return (
    <ScrollView className="flex-1 bg-background pt-24 px-margin-mobile" showsVerticalScrollIndicator={false}>
      {/* Deep Work Session Widget */}
      <WorkSessionWidget />

      {/* System Log */}
      <View className="flex-col pb-32">
        <Text className="font-title-sm text-title-sm text-primary mb-4">System Log</Text>

        <SystemLogItem
          icon="cloud"
          title="Backup Completed"
          description="System vault encrypted and synced."
          time="10m ago"
        />

        <SystemLogItem
          icon="shield"
          title="New Device Authorized"
          description="MacBook Pro (14-inch, 2023) added to trusted keys."
          time="2h ago"
        />
      </View>
    </ScrollView>
  );
}