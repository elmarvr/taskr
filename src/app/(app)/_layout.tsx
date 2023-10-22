import { useConvexAuth } from "convex/react";
import { Redirect, Slot } from "expo-router";
import { useStoreUser } from "~/hooks/use-store-user";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const userId = useStoreUser();

  if (!isLoading && !isAuthenticated) return <Redirect href="/(auth)/sign-in" />;

  if (!userId || isLoading) return null;

  return <Slot />;
}
