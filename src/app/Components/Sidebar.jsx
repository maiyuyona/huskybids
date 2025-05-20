"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BiscuitIcon from "./BiscuitIcon";
import { usePathname } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Sidebar = () => {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [showDailyBonus, setShowDailyBonus] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [bonusCooldown, setBonusCooldown] = useState(null);
  
  // Get user data from Convex
  const userData = useQuery(api.users.getByClerkId, 
    user ? { clerkUserId: user.id } : "skip");
  
  // Prepare mutation
  const claimBonus = useMutation(api.dailyBonus.claimDailyBonus);

  // Check if bonus is available and calculate cooldown
  useEffect(() => {
    if (userData?.lastDailyBonus) {
      const now = Date.now();
      const lastClaim = userData.lastDailyBonus;
      const oneDay = 24 * 60 * 60 * 1000;
      const timeSinceClaim = now - lastClaim;
      
      setShowDailyBonus(timeSinceClaim >= oneDay);
      
      if (timeSinceClaim < oneDay) {
        const remainingTime = oneDay - timeSinceClaim;
        setBonusCooldown(remainingTime);
        
        // Update cooldown every second
        const interval = setInterval(() => {
          setBonusCooldown(prev => {
            if (prev <= 1000) {
              clearInterval(interval);
              setShowDailyBonus(true);
              return null;
            }
            return prev - 1000;
          });
        }, 1000);
        
        return () => clearInterval(interval);
      }
    } else if (userData) {
      // New user who hasn't claimed yet
      setShowDailyBonus(true);
    }
  }, [userData]);

  const handleClaimBonus = async () => {
    if (!user || isClaiming) return;
    
    setIsClaiming(true);
    try {
      await claimBonus({ clerkUserId: user.id });
      setShowDailyBonus(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsClaiming(false);
    }
  };

  // Format cooldown time
  const formatCooldown = (ms) => {
    if (!ms) return "";
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

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

  if (!isLoaded) {
    return (
      <div className="fixed left-0 top-0 h-full w-64 bg-yellow-400 p-6 flex flex-col shadow-lg">
        <div className="animate-pulse flex-1 space-y-4">
          <div className="h-12 bg-yellow-300 rounded"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 bg-yellow-300 rounded"></div>
            ))}
          </div>
          <div className="h-16 bg-yellow-300 rounded mt-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-yellow-400 text-purple-900 p-6 flex flex-col shadow-lg z-10">
      {/* Logo/Header */}
      <div className="mb-8">
        <Link href="/" className="block">
          <Image
            src="/images/logo.png"
            alt="HuskyBids Logo"
            width={150}
            height={50}
            className="mb-2"
            priority
          />
        </Link>
      </div>

      {/* Daily Bonus Alert */}
      <div className="mb-6">
        {showDailyBonus ? (
          <div className="bg-white text-purple-900 p-3 rounded-lg shadow-md">
            <div className="font-semibold mb-2">Daily Bonus Available!</div>
            <button
              onClick={handleClaimBonus}
              disabled={isClaiming}
              className={`w-full bg-purple-600 text-white py-2 rounded transition-colors text-sm ${
                isClaiming ? 'opacity-75' : 'hover:bg-purple-700'
              }`}
            >
              {isClaiming ? 'Claiming...' : 'Claim Free 100 Biscuits'}
            </button>
          </div>
        ) : bonusCooldown ? (
          <div className="bg-white text-purple-900 p-3 rounded-lg shadow-md">
            <div className="font-semibold mb-1">Next Bonus In:</div>
            <div className="text-sm">{formatCooldown(bonusCooldown)}</div>
          </div>
        ) : null}
      </div>

      {/* Navigation Links */}
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

      {/* User Profile & Biscuit Balance */}
      <div className="border-t border-yellow-500 pt-4 mt-auto">
        {user && (
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={user.imageUrl} 
              alt="User profile" 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-medium">{user.fullName}</div>
              <div className="text-xs text-purple-900 opacity-75">{user.primaryEmailAddress?.emailAddress}</div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2 bg-yellow-300 p-2 rounded-lg">
          <BiscuitIcon size={24} />
          <div className="flex-1">
            <div className="text-sm text-purple-900 opacity-75">Your Balance</div>
            <div className="font-bold text-purple-900">
              {userData?.biscuitBalance ?? 'Loading...'} Biscuits
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

/* "use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BiscuitIcon from "./BiscuitIcon";
import { usePathname } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Sidebar = ({ biscuits = 1000 }) => {
  // Default starting balance of 1000 biscuits
  const [showDailyBonus, setShowDailyBonus] = useState(true);

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
    // In a real app, this would update the user's balance in the database
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

export default Sidebar;
 */