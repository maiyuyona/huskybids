import { defineSchema, v } from "convex/schema";

export default defineSchema({
  games: v.object({
    name: v.string(),
    startTime: v.number(), // UNIX timestamp
    teamA: v.string(),
    teamB: v.string(),
    scoreA: v.optional(v.number()),
    scoreB: v.optional(v.number()),
    status: v.union(
      v.literal("upcoming"),
      v.literal("live"),
      v.literal("finished")
    ),
  }),
});