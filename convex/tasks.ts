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
    },

    handler: async (ctx, { title }) => {
      return ctx.db.insert("tasks", {
        userId: ctx.user._id,
        title,
        completed: false,
      });
    },
  })
);

export const update = mutation({
  args: {
    _id: v.id("tasks"),
    title: v.optional(v.string()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, { _id, ...input }) => {
    return ctx.db.patch(_id, input);
  },
});

export const remove = mutation({
  args: {
    _id: v.id("tasks"),
  },
  handler: async (ctx, { _id }) => {
    return ctx.db.delete(_id);
  },
});
