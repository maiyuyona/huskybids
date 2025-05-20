"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { SignInButton, SignUpButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs"; // Import Clerk components

const Sidebar = () => {
  const pathname = usePathname();

  const isActivePath = (path) => pathname === path;
  const getBackgroundColor = (path) => isActivePath(path) ? 'bg-[#4b2e83] text-white' : 'hover:bg-yellow-300';

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-yellow-400 text-purple-900 p-6 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/" className="block">
          <Image
            src="/images/logo.png"
            alt="HuskyBids Logo"
            width={150}
            height={50}
            className="mb-2"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link href="/testingHome" className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/testingHome')}`}>
              <span className="material-icons">calendar_today</span>
              <span>Calendar</span>
            </Link>
          </li>
          <li>
            <Link href="/new-bid" className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/new-bid')}`}>
              <span className="material-icons">add_circle</span>
              <span>New Bid</span>
            </Link>
          </li>
          <li>
            <Link href="/tasks" className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/tasks')}`}>
              <span className="material-icons">task</span>
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link href="/betting-history" className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/betting-history')}`}>
              <span className="material-icons">history</span>
              <span>Betting History</span>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard" className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/leaderboard')}`}>
              <span className="material-icons">leaderboard</span>
              <span>Leaderboard</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Auth Buttons */}
      <div className="mt-auto space-y-2">
        {/* Use Clerk's SignedOut component to show buttons only when not signed in */}
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="block w-full bg-purple-600 text-white text-center py-2 rounded hover:bg-purple-700 transition-colors">
              Sign Up
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="block w-full bg-white text-purple-900 text-center py-2 rounded hover:bg-gray-100 transition-colors">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        {/* Use Clerk's SignedIn component to show UserButton when signed in */}
        <SignedIn>
          <div className="w-full flex justify-center"> {/* Center the UserButton */}
            <UserButton 
              afterSignOutUrl="/" // Redirect to home or another page after sign out
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12" // Adjust size as needed
                }
              }}
            />
          </div>
        </SignedIn>
      </div>

      {/* Footer */}
      <div className="text-xs text-purple-900 opacity-50 mt-2 text-center">
        HuskyBids © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Sidebar;

/*"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BiscuitIcon from "./BiscuitIcon";
import { usePathname } from 'next/navigation';

const Sidebar = ({ initialBiscuits = 1000 }) => {
  // Default starting balance of 1000 biscuits
  const [showDailyBonus, setShowDailyBonus] = useState(true);
  const [biscuits, setBiscuits] = useState(initialBiscuits);

  // Get current route
  const pathname = usePathname();

  // Function to determine if a link is active
  const isActivePath = (path) => pathname === path;

  // Get background color based on path
  const getBackgroundColor = (path) => {
    if (!isActivePath(path)) return 'hover:bg-yellow-300';
    
    switch (path) {
      case '/testingHome':
        return 'bg-[#4b2e83] text-white';
      case '/dashboard':
        return 'bg-gray-50';
      case '/new-bid':
        return 'bg-[#4b2e83] text-white';
      case '/tasks':
        return 'bg-[#4b2e83] text-white';
      case '/leaderboard':
        return 'bg-[#4b2e83] text-white';
      default:
        return 'bg-yellow-300';
    }
  };

  const claimDailyBonus = () => {
    setShowDailyBonus(false);
    setBiscuits(prevBiscuits => prevBiscuits + 100);
    alert("Daily bonus of 100 Biscuits claimed!");
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-yellow-400 text-purple-900 p-6 flex flex-col shadow-lg">
      {/* Logo/Header }
      <div className="mb-8">
        <Link href="/" className="block">
          <Image
            src="/images/logo.png"
            alt="HuskyBids Logo"
            width={150}
            height={50}
            className="mb-2"
          />
        </Link>
      </div>

      {/* Daily Bonus Alert }
      {showDailyBonus && (
        <div className="mb-6 bg-white text-purple-900 p-3 rounded-lg shadow-md">
          <div className="font-semibold mb-2">Daily Bonus Available!</div>
          <button
            onClick={claimDailyBonus}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors text-sm"
          >
            Claim Free 100 Biscuits
          </button>
        </div>
      )}

      {/* Navigation Links }
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link
              href="/testingHome"
              className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/testingHome')}`}
            >
              <span className="material-icons">dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/new-bid"
              className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/new-bid')}`}
            >
              <span className="material-icons">add_circle</span>
              <span>New Bid</span>
            </Link>
          </li>
          <li>
            <Link
              href="/tasks"
              className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/tasks')}`}
            >
              <span className="material-icons">task</span>
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link
              href="/leaderboard"
              className={`flex items-center space-x-2 p-2 rounded transition-colors font-medium ${getBackgroundColor('/leaderboard')}`}
            >
              <span className="material-icons">leaderboard</span>
              <span>Leaderboard</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Biscuit Balance }
      <div className="border-t border-yellow-500 pt-4">
        <div className="flex items-center space-x-2">
          <BiscuitIcon size={24} />
          <div>
            <div className="text-sm text-purple-900 opacity-75">
              Your Balance
            </div>
            <div className="font-bold text-purple-900">{biscuits} Biscuits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; */