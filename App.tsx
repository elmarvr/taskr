import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import config from "./tamagui.config";
import { Button, TamaguiProvider, Theme, styled } from "tamagui";
import { SafeAreaProvider, SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

export const SafeAreaView = styled(RNSafeAreaView, {
  name: "SafeAreaView",
  flex: 1,
  backgroundColor: "$backgroundStrong",
});

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Theme name="dark">
          <SafeAreaView>
            <Button>Click me</Button>
          </SafeAreaView>
        </Theme>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

{
  /* <StatusBar style="auto" /> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
