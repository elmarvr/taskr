import { useFonts } from "expo-font";
import { Spinner, TamaguiProvider, Theme, YStack, styled } from "tamagui";
import { SafeAreaProvider, SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { AuthLoading, Authenticated, Unauthenticated } from "convex/react";
import "react-native-get-random-values";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import config from "./tamagui.config";
import { convex } from "./lib/convex";
import { Tasks } from "./components/tasks";
import { SignIn } from "./components/sign-in";
import { tokenCache } from "./lib/cache";

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
    <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <SafeAreaProvider>
          <TamaguiProvider config={config}>
            <Theme name="dark">
              <SafeAreaView>
                <AuthLoading>
                  <YStack flex={1} alignItems="center" justifyContent="center">
                    <Spinner />
                  </YStack>
                </AuthLoading>
                <Authenticated>
                  <Tasks />
                </Authenticated>
                <Unauthenticated>
                  <SignIn />
                </Unauthenticated>
              </SafeAreaView>
            </Theme>
          </TamaguiProvider>
        </SafeAreaProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
