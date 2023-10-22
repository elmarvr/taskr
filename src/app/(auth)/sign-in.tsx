import { isClerkAPIResponseError, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";
import { Button } from "tamagui";

import { useWarmUpBrowser } from "~/hooks/use-warmup-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (!setActive) return;

      setActive({
        session: createdSessionId,
      });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        console.error(error);
      }
    }
  }, []);

  return <Button onPress={onPress}>Sign in with Google</Button>;
}
