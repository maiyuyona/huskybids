"use client";

import { UserProfile, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SignedIn>
        <h1 className="text-3xl font-bold text-purple-900 mb-6 text-center">Account Settings</h1>
        <UserProfile routing="path" path="/account" />
      </SignedIn>
      
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}