import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  tasks: defineTable({
    title: v.string(),
    completed: v.boolean(),
    description: v.optional(v.string()),
    userId: v.id("users"),
  }).index("by_userId", ["userId"]),

  users: defineTable({
    name: v.string(),
    image: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});

export default schema;
