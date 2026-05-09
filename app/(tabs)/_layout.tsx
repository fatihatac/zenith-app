import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomBottomBar } from '../../components/features/navigation/CustomBottomBar';
import { FloatingActionButtons } from '../../components/features/navigation/FloatingActionButtons';
import { MainHeader } from '../../components/features/navigation/MainHeader';
import { Sidebar } from '../../components/features/navigation/Sidebar';
import { theme } from '../../constants/theme';
import { useSidebar } from '../../hooks/useSidebar';

export default function TabsLayout() {
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebar();

  return (
    <View style={styles.mainContainer}>
      {/* HEADER AREA */}
      <MainHeader onMenuPress={openSidebar} />

      {/* TABS ENGINE */}
      <View style={styles.tabsWrapper}>
        <Tabs
          // DÜZELTME: sceneContainerStyle'ı sildik çünkü tip çakışması yaratıyor.
          // Arka plan rengini zaten her sayfanın kendi 'container' stilinde yönettik.
          tabBar={(props) => <CustomBottomBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.background, // Ana kapsayıcıyı siyah yaparak olası boşlukları kapattık
  },
  tabsWrapper: {
    flex: 1,
  },
});