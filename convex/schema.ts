import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    biscuits: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  games: defineTable({
    opponent: v.string(),
    date: v.string(), // YYYY-MM-DD
    time: v.string(), // HH:MM AM/PM or 24-hour format
    startTime: v.number(), // Unix timestamp (milliseconds) for precise start time
    location: v.string(),
    isHome: v.boolean(),
    week: v.number(),
    result: v.optional(v.union(v.literal("win"), v.literal("lose"))),
  }).index("by_startTime", ["startTime"]),

  bets: defineTable({
    userId: v.id("users"),
    gameId: v.id("games"),
    bidAmount: v.number(),
    prediction: v.union(v.literal("win"), v.literal("lose")),
    hasWon: v.optional(v.boolean()),
    processed: v.boolean(),
  }).index("by_user_game", ["userId", "gameId"]),
});