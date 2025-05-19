// src/app/api/place-bid/route.js
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs'; // For server-side authentication

export async function POST(request) {
  const { userId } = auth(); // Get the Clerk User ID on the server
  const body = await request.json();
  const { gameId, bidAmount, prediction } = body;

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!gameId || !bidAmount || !prediction) {
    return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
  }

  // Here you would:
  // 1. Validate the data (e.g., bidAmount is positive, game exists).
  // 2. Store the bid in your database, associated with the userId, gameId, bidAmount, and prediction.
  // 3. Potentially update the user's biscuit balance in your database.

  console.log('Received bid:', { userId, gameId, bidAmount, prediction });

  // For now, we'll just simulate success
  return NextResponse.json({ message: 'Bid placed successfully' }, { status: 200 });
}