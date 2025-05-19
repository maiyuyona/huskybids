// convex/server/main.ts
import { ConvexError, v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

// Get a user by their Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((user) => user.eq(user.field("clerkId"), args.clerkId))
      .first();
  },
});

// Get all future and ongoing games for betting
export const getOpenGamesForBetting = query({
  handler: async (ctx) => {
    const now = Date.now();
    // Fetch games where the start time is in the future or within the last hour
    return await ctx.db
      .query("games")
      .filter((game) => game.gte(game.field("startTime"), now - 60 * 60 * 1000) && !game.field("result"))
      .collect();
  },
});

// Get games that have finished (have a result)
export const getFinishedGames = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("games")
      .filter((game) => game.field("result"))
      .collect();
  },
});

// Get a user's bets
export const getUserBets = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bets")
      .filter((bet) => bet.eq(bet.field("userId"), args.userId))
      .collect();
  },
});

// Create a new user
export const createUser = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((user) => user.eq(user.field("clerkId"), args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    return await ctx.db.insert("users", { clerkId: args.clerkId, biscuits: 1000 }); // Initial biscuits
  },
});

// Add a new game (Admin function)
export const addGame = mutation({
  args: {
    opponent: v.string(),
    date: v.string(),
    time: v.string(),
    location: v.string(),
    isHome: v.boolean(),
    week: v.number(),
  },
  handler: async (ctx, args) => {
    const dateTimeString = `${args.date} ${args.time}`;
    const startTime = new Date(dateTimeString).getTime();
    if (isNaN(startTime)) {
      throw new ConvexError("Invalid date or time format.");
    }
    await ctx.db.insert("games", { ...args, startTime });
  },
});

// Place a new bid
export const placeBid = mutation({
  args: { gameId: v.id("games"), bidAmount: v.number(), prediction: v.union(v.literal("win"), v.literal("lose")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("User not authenticated.");
    }
    const user = await ctx.db
      .query("users")
      .filter((u) => u.eq(u.field("clerkId"), identity.subject))
      .first();
    if (!user) {
      throw new ConvexError("User not found.");
    }

    if (args.bidAmount <= 0 || user.biscuits < args.bidAmount) {
      throw new ConvexError("Insufficient biscuits or invalid bid amount.");
    }

    const game = await ctx.db.get(args.gameId);
    if (!game) {
      throw new ConvexError("Game not found.");
    }

    const now = Date.now();
    const bettingStarts = game.startTime - 7 * 24 * 60 * 60 * 1000; // One week before
    const bettingEnds = game.startTime - 60 * 60 * 1000; // One hour before

    if (now < bettingStarts) {
      throw new ConvexError("Betting for this game has not started yet.");
    }

    if (now >= bettingEnds) {
      throw new ConvexError("Betting for this game is now closed.");
    }

    await ctx.db.insert("bets", {
      userId: user._id,
      gameId: args.gameId,
      bidAmount: args.bidAmount,
      prediction: args.prediction,
      processed: false,
    });

    await ctx.db.patch(user._id, { biscuits: user.biscuits - args.bidAmount });
  },
});

// Record the result of a game (Admin only)
export const recordGameResult = mutation({
  args: { gameId: v.id("games"), result: v.union(v.literal("win"), v.literal("lose")) },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) {
      throw new ConvexError("Game not found.");
    }
    await ctx.db.patch(args.gameId, { result: args.result });
  },
});

// Process game results and award biscuits (Run after game ends)
export const processGameResults = mutation({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game?.result) {
      console.log(`Result not yet recorded for game ${args.gameId}`);
      return;
    }

    const winningBets = await ctx.db
      .query("bets")
      .filter((bet) =>
        bet.and(
          bet.eq(bet.field("gameId"), args.gameId),
          bet.eq(bet.field("prediction"), game.result),
          bet.eq(bet.field("processed"), false)
        )
      )
      .collect();

    for (const bet of winningBets) {
      const user = await ctx.db.get(bet.userId);
      if (user) {
        await ctx.db.patch(user._id, { biscuits: user.biscuits + bet.bidAmount * 2 }); // Award winnings (example: 2x the bet)
        await ctx.db.patch(bet._id, { hasWon: true, processed: true });
      } else {
        console.error(`User not found for bet ${bet._id}`);
        await ctx.db.patch(bet._id, { processed: true }); // Mark as processed
      }
    }

    // Mark losing bets as processed
    const losingBets = await ctx.db
      .query("bets")
      .filter((bet) =>
        bet.and(
          bet.eq(bet.field("gameId"), args.gameId),
          bet.neq(bet.field("prediction"), game.result),
          bet.eq(bet.field("processed"), false)
        )
      )
      .collect();

    for (const bet of losingBets) {
      await ctx.db.patch(bet._id, { hasWon: false, processed: true });
    }
  },
});