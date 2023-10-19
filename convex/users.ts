import { mutation, query } from "./_generated/server";
import { withUser } from "./lib/user";

export const store = mutation({
  handler: async ({ auth, db }) => {
    const identity = await auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const user = await db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (user !== null) {
      await db.patch(user._id, {
        name: identity.name,
        image: identity.pictureUrl,
        email: identity.email,
      });

      return user._id;
    }

    return await db.insert("users", {
      name: identity.name!,
      image: identity.pictureUrl!,
      email: identity.email!,
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

export const me = query(
  withUser({
    handler: async ({ user }) => {
      return user;
    },
  })
);
