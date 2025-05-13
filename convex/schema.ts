import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    biscuits: v.number(),
    lastLogin: v.optional(v.number()), // Timestamp of the last login
  }).index("by_clerkId", ["clerkId"]),

  bets: defineTable({
    userId: v.id("users"),
    gameId: v.string(), // Or v.id("games") if you have a games table
    betAmount: v.number(),
    predictedWinner: v.string(), // Or v.id("teams") if you have a teams table
    outcome: v.optional(v.string()), // "won", "lost", "pending"
    createdAt: v.number(), // Timestamp of when the bet was placed
  }).index("by_userId", ["userId"]),

  // Optional: If you want to track game details in Convex
  games: defineTable({
    homeTeam: v.string(),
    awayTeam: v.string(),
    startTime: v.number(), // Timestamp of the game start time
    result: v.optional(v.string()), // Winner of the game
  }),
});