import { useConvexAuth } from "convex/react";
import { Redirect, Slot } from "expo-router";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) return null;

  if (isAuthenticated) return <Redirect href="/(app)" />;

  return <Slot />;
}
