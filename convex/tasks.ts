import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { withUser } from "./lib/user";

export const list = query(
  withUser({
    handler: async (ctx) => {
      return ctx.db
        .query("tasks")
        .withIndex("by_userId", (q) => q.eq("userId", ctx.user._id))
        .collect();
    },
  })
);

export const create = mutation(
  withUser({
    args: {
      title: v.string(),
      description: v.optional(v.string()),
    },

    handler: async (ctx, args) => {
      return ctx.db.insert("tasks", {
        ...args,
        userId: ctx.user._id,
        completed: false,
      });
    },
  })
);

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...input }) => {
    return ctx.db.patch(id, input);
  },
});

export const remove = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, { id }) => {
    return ctx.db.delete(id);
  },
});
