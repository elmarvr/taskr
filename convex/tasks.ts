import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query(async (ctx) => {
  return ctx.db.query("tasks").collect();
});

export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, { title }) => {
    return ctx.db.insert("tasks", {
      title,
      completed: false,
    });
  },
});

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
