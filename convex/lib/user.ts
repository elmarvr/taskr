import { Auth } from "convex/server";
import { Doc } from "../_generated/dataModel";
import { PropertyValidators } from "convex/values";
import { DatabaseReader } from "../_generated/server";
import { ConvexFunction } from "./types";

export function withUser<Ctx, Output, Validator extends PropertyValidators | unknown>(
  fn: ConvexFunction<Ctx & { user: Doc<"users"> }, Validator, Output>
): ConvexFunction<Ctx, Validator, Output>;

export function withUser(fn: any) {
  return {
    ...fn,
    async handler(
      ctx: {
        db: DatabaseReader;
        auth: Auth;
      },
      args: any
    ) {
      const { db, auth } = ctx;

      const identity = await auth.getUserIdentity();

      if (!identity) {
        throw new Error("Not authenticated");
      }

      const user = await db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();

      if (!user) throw new Error("User not found");

      return fn.handler({ ...ctx, user }, args);
    },
  };
}
