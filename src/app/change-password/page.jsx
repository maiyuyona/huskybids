"use client";

import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="container">
      <UserProfile routing="path" path="/account" />
    </div>
  );
}