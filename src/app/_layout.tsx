import { useFonts } from "expo-font";
import { GetProps, PortalProvider, Spinner, Stack, TamaguiProvider, Theme, YStack, styled, useTheme } from "tamagui";
import { SafeAreaProvider, SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Slot } from "expo-router";
import { AuthLoading, Authenticated } from "convex/react";
import { LogBox, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";

import config from "tamagui.config";
import { convex } from "~/lib/convex";
import { tokenCache } from "~/lib/cache";

import { PropsWithChildren, useEffect } from "react";

export const SafeAreaView = styled(RNSafeAreaView, {
  name: "SafeAreaView",
  flex: 1,
  backgroundColor: "$backgroundStrong",
});

LogBox.ignoreLogs(["fontFamily"]);

export default function RootLayout() {
  const [isLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Regular.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Regular.otf"),
  });

  if (!isLoaded) return null;

  return (
    <PortalProvider>
      <ClerkProvider publishableKey={process.env.CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <SafeAreaProvider>
            <TamaguiProvider config={config}>
              <Theme name="dark">
                <Screen>
                  <AuthLoading>
                    <Stack flex={1} justifyContent="center" alignItems="center">
                      <Spinner />
                    </Stack>
                  </AuthLoading>

                  <Slot />
                </Screen>
              </Theme>
            </TamaguiProvider>
          </SafeAreaProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </PortalProvider>
  );
}

function Screen(props: GetProps<typeof SafeAreaView>) {
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(theme.backgroundStrong.get());
      NavigationBar.setBorderColorAsync(theme.backgroundStrong.get());
    }
  }, []);

  return (
    <SafeAreaView {...props}>
      <StatusBar style="light" translucent />
      {props.children}
    </SafeAreaView>
  );
}
