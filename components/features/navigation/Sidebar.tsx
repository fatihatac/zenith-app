import { Activity, Cloud, Database, Lock, Palette, X, Zap } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 flex-row">
        <Pressable className="flex-1 bg-black/40 absolute inset-0 z-10" onPress={onClose} />

        <View className="h-full w-[80%] max-w-sm rounded-r-xl border-r border-outline-variant bg-surface flex-col p-md gap-sm absolute left-0 top-0 z-20 shadow-2xl">
          {/* Header */}
          <View className="mb-lg pt-sm flex-row justify-between items-start">
            <View>
              <Text className="font-display-lg text-display-lg text-primary tracking-tighter mb-xs">
                ZENITH <Text className="font-title-sm text-title-sm text-on-surface-variant">PRO</Text>
              </Text>
              <View className="flex-row items-center gap-xs">
                <View
                  className="w-2 h-2 rounded-full bg-[#10b981]"
                  style={{ shadowColor: '#10b981', shadowOpacity: 0.8, shadowRadius: 8, elevation: 4 }}
                />
                <Text className="font-label-caps text-label-caps text-on-surface-variant">E2E Encryption Active</Text>
              </View>
            </View>
            <Pressable onPress={onClose} className="p-2 -mr-4 -mt-2 active:opacity-50">
              <X color="#c4c7c8" size={24} />
            </Pressable>
          </View>

          {/* Navigation List */}
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pr-xs">
            <View className="flex-col gap-unit">
              <Pressable className="flex-row items-center gap-sm px-sm py-xs rounded-full active:bg-surface-container-high transition-colors">
                <Cloud color="#c4c7c8" size={24} strokeWidth={1.5} />
                <Text className="font-title-sm text-title-sm text-on-surface-variant">Account & Sync</Text>
              </Pressable>

              <Pressable className="flex-row items-center gap-sm px-sm py-xs rounded-full active:bg-surface-container-high transition-colors">
                <Database color="#c4c7c8" size={24} strokeWidth={1.5} />
                <Text className="font-title-sm text-title-sm text-on-surface-variant">Data Sources & API</Text>
              </Pressable>

              {/* Active / Expanded Section */}
              <View className="flex-col">
                <Pressable className="flex-row items-center gap-sm px-sm py-xs bg-primary-container rounded-full active:opacity-80 transition-colors">
                  <Activity color="#636565" size={24} strokeWidth={2} />
                  <Text className="font-title-sm text-title-sm font-bold text-on-primary-container">Engine & Telemetry</Text>
                </Pressable>

                <View className="pl-[44px] pr-sm py-xs mt-unit">
                  <View className="bg-surface-container-low border border-outline-variant rounded-md p-xs flex-col gap-unit">
                    <Text className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase">
                      Telemetry Data
                    </Text>
                    <Text className="font-mono text-[10px] text-primary tracking-widest leading-relaxed">
                      CPU: 45°C | TPL: Active | FIVR: -50mV
                    </Text>
                  </View>
                </View>
              </View>

              <Pressable className="flex-row items-center gap-sm px-sm py-xs rounded-full active:bg-surface-container-high transition-colors">
                <Zap color="#c4c7c8" size={24} strokeWidth={1.5} />
                <Text className="font-title-sm text-title-sm text-on-surface-variant">Focus Automations</Text>
              </Pressable>

              <Pressable className="flex-row items-center gap-sm px-sm py-xs rounded-full active:bg-surface-container-high transition-colors">
                <Palette color="#c4c7c8" size={24} strokeWidth={1.5} />
                <Text className="font-title-sm text-title-sm text-on-surface-variant">Appearance</Text>
              </Pressable>
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="mt-auto pt-md border-t border-outline-variant/30 pb-safe">
            <Pressable className="w-full flex-row justify-center items-center gap-xs py-sm rounded-full active:bg-surface-container transition-colors">
              <Lock color="#c4c7c8" size={18} strokeWidth={2} />
              <Text className="font-label-caps text-label-caps text-on-surface-variant">Lock Vault & Exit</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
