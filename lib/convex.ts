import { ConvexReactClient } from "convex/react";

export const convex = new ConvexReactClient(process.env.CONVEX_URL!, {
  unsavedChangesWarning: false,
});
