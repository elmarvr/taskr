import { useFonts } from "expo-font";
import { TamaguiProvider, Theme, styled } from "tamagui";
import { SafeAreaProvider, SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { ConvexProvider } from "convex/react";
import "react-native-get-random-values";

import config from "./tamagui.config";
import { convex } from "./lib/convex";
import { Tasks } from "./components/tasks";

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
              <Tasks />
            </SafeAreaView>
          </Theme>
        </TamaguiProvider>
      </SafeAreaProvider>
    </ConvexProvider>
  );
}
