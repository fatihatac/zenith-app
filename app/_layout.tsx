import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#131313" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Alt sekmeleri içeren klasörü çağırıyoruz, kendi başlığını gizleyerek */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}