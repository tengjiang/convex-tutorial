import { defineSchema, defineTable, s } from "convex/schema";

// Define a messages table with two indexes.
export default defineSchema({
  messages: defineTable({
    author: s.string(),
    body: s.number()
  })
    .index("by_price", ["body"])
});