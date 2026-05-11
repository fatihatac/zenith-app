import { Stack } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import { theme } from "@/constants/theme";
import { useSidebar } from "@/hooks/useSidebar";
import { Sidebar } from "@/components/features/navigation/Sidebar";

export default function RootLayout() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});