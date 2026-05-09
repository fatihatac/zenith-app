import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { CustomBottomBar } from '../../components/features/navigation/CustomBottomBar';
import { FloatingActionButtons } from '../../components/features/navigation/FloatingActionButtons';
import { MainHeader } from '../../components/features/navigation/MainHeader';
import { Sidebar } from '../../components/features/navigation/Sidebar';
import { useSidebar } from '../../hooks/useSidebar';

export default function TabsLayout() {
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();

  return (
    <View className="flex-1 bg-background">
      {/* HEADER AREA */}
      <MainHeader onMenuPress={openSidebar} />

      {/* TABS ENGINE */}
      <View className="flex-1">
        <Tabs
          tabBar={(props) => <CustomBottomBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="signal" />
          <Tabs.Screen name="markets" />
          <Tabs.Screen name="vault" />
        </Tabs>
      </View>

      {/* FLOATING ACTION BUTTONS */}
      <FloatingActionButtons />

      {/* SIDEBAR MODAL */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </View>
  );
}