import { useFonts } from "expo-font";
import { Spinner, Stack, TamaguiProvider, Theme, YStack, styled } from "tamagui";
import { SafeAreaProvider, SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Slot } from "expo-router";

import config from "tamagui.config";
import { convex } from "~/lib/convex";
import { tokenCache } from "~/lib/cache";
import { AuthLoading, Authenticated } from "convex/react";

export const SafeAreaView = styled(RNSafeAreaView, {
  name: "SafeAreaView",
  flex: 1,
  backgroundColor: "$backgroundStrong",
});

export default function RootLayout() {
  const [isLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!isLoaded) return null;

  return (
    <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <SafeAreaProvider>
          <TamaguiProvider config={config}>
            <Theme name="dark">
              <SafeAreaView>
                <AuthLoading>
                  <Stack flex={1} justifyContent="center" alignItems="center">
                    <Spinner />
                  </Stack>
                </AuthLoading>

                <Slot />
              </SafeAreaView>
            </Theme>
          </TamaguiProvider>
        </SafeAreaProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
