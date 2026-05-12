import { Tabs } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomBottomBar } from '@/components/features/navigation/CustomBottomBar';
import { FloatingActionButtons } from '@/components/features/navigation/FloatingActionButtons';
import { MainHeader } from '@/components/features/navigation/MainHeader';
import FocusOverlay from '@/components/features/focus/FocusOverlay';
import SessionCompleteOverlay from '@/components/features/focus/SessionCompleteOverlay';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useSidebar } from '@/hooks/useSidebar';

export default function TabsLayout() {
  const { openSidebar } = useSidebar();
  const theme = useThemeContext();
  const styles = useMemo(() => StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    tabsWrapper: {
      flex: 1,
      position: 'relative',
    },
  }), [theme]);

  return (
    <View style={styles.mainContainer}>
      <MainHeader onMenuPress={openSidebar} />

      <View style={styles.tabsWrapper}>
        <Tabs
          tabBar={(props) => <CustomBottomBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tabs.Screen name='index' />
          <Tabs.Screen name='signal' />
          <Tabs.Screen name='markets' />
          <Tabs.Screen name='vault' />
        </Tabs>
      </View>

      <FloatingActionButtons />

      <FocusOverlay />

      <SessionCompleteOverlay />
    </View>
  );
}
