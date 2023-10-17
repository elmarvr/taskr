import { useFonts } from "expo-font";
import { Button, TamaguiProvider, Theme, styled } from "tamagui";
import { SafeAreaProvider, SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";

import config from "./tamagui.config";
import { convex } from "./lib/convex";
import { Todos } from "./components/todos";

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
    <ConvexProvider client={convex}>
      <SafeAreaProvider>
        <TamaguiProvider config={config}>
          <Theme name="dark">
            <SafeAreaView>
              <Todos />
            </SafeAreaView>
          </Theme>
        </TamaguiProvider>
      </SafeAreaProvider>
    </ConvexProvider>
  );
}
