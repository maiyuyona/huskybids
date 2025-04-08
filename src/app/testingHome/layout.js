// src/app/(main)/layout.js
// This component wraps the pages inside the (main) group

// You can keep this as a client component if the sidebars need interactivity,
// or make parts of it server components if possible.
"use client";

import React from 'react';
// --- Use Link from next/link ---
import Link from 'next/link';

// Assume your right sidebar content is static or its own component
// import RightSidebar from '@/components/RightSidebar'; // Example import

export default function MainLayout({ children }) {
  // Removed state/logic related to date scroller - that belongs in the specific page (app/page.js)

  return (
    <div className="bg-[#4b2e83] flex w-full min-h-screen relative overflow-hidden">
      {/* Left Menu */}
      <div className="w-[20%] bg-[#3a2365] p-6 text-white rounded-r-2xl overflow-hidden flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-5">
          {/* --- Use Link from next/link with href --- */}
          <li className="hover:text-[#c5b4e3]">
            <Link href="/" className="block cursor-pointer">HuskyBids</Link>
          </li>
          <li className="hover:text-[#c5b4e3]">
            <Link href="/dashboard" className="block cursor-pointer">Dashboard</Link>
          </li>
          <li className="hover:text-[#c5b4e3]">
            <Link href="/new-bid" className="block cursor-pointer">New bid</Link>
          </li>
          <li className="hover:text-[#c5b4e3]">
            <Link href="/tasks" className="block cursor-pointer">Biscuit Tasks</Link>
          </li>
          {/* --- End Link components --- */}
        </ul>
      </div>

      {/* Center Content Area - Renders the matched page */}
      {/* The 'children' prop passed by Next.js contains the page component */}
      <div className="flex-1 overflow-y-auto p-6"> {/* Added padding */}
        {children}
      </div>

      {/* Right Menu */}
      <div className="w-[20%] bg-[#3a2365] p-6 text-white rounded-l-2xl overflow-hidden flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <ul className="space-y-2">
          <li className="hover:text-[#c5b4e3] cursor-pointer">Settings</li>
          <li className="hover:text-[#c5b4e3] cursor-pointer">...</li>
          <li className="hover:text-[#c5b4e3] cursor-pointer">...</li>
        </ul>
        {/* Or <RightSidebar /> */}
      </div>
    </div>
  );
}
