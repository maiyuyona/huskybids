import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();
  },
});

export const claimDailyBiscuits = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!user) {
      console.log(`No user found with clerkId: ${args.clerkId}`);
      return;
    }

    await ctx.db.patch(user._id, {
      biscuits: user.biscuits + 100,
      lastLogin: Date.now(),
    });

    console.log(`User ${args.clerkId} claimed 100 daily biscuits.`);

    // Return the updated user data
    return await ctx.db.get(user._id);
  },
});

