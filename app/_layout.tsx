import { useMemo } from "react";
import { Stack } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import { useSidebar } from "@/hooks/useSidebar";
import { Sidebar } from "@/components/features/navigation/Sidebar";
import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";

export default function RootLayout() {
  const { isOpen, closeSidebar } = useSidebar();
  const theme = useThemeContext();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      }),
    [theme]
  );

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.background}
          translucent={true}
        />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background }
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>

        {/* Global Sidebar Component */}
        <Sidebar isOpen={isOpen} onClose={closeSidebar} />
      </View>
    </ThemeProvider>
  );
}