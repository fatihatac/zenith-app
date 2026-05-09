import { Stack } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import { theme } from "../constants/theme";

export default function RootLayout() {
  return (
    <View style={styles.container}>
      {/* StatusBar: Dijital sessizlik için arka planla bütünleşik.
        iOS için light-content, Android için tema rengi.
      */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        translucent={true}
      />

      <Stack
        screenOptions={{
          headerShown: false,
          // Stack seviyesinde içerik arka planını sabitliyoruz
          contentStyle: { backgroundColor: theme.colors.background }
        }}
      >
        {/* Ana uygulama döngüsü (Tabs) */}
        <Stack.Screen name="(tabs)" />

        {/* İleride eklenecek modal veya auth sayfaları buraya gelecek */}
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});