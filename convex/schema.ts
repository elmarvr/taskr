import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  tasks: defineTable({
    title: v.string(),
    completed: v.boolean(),
  }),
});

export default schema;
