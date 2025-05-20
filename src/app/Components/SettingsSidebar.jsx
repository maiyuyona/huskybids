"use client";

import React from "react";
import Link from "next/link";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useClerk
} from "@clerk/nextjs";
import Image from "next/image"; // Import Image if you want a logo
import styles from './SettingsSidebar.module.css'; // Keep your existing CSS module
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api"; // Adjust path as needed

const SettingsSidebar = ({ isSidebarOpen, toggleSidebar, username }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const convexUser = useQuery(api.main.getUserByClerkId, { clerkId: user?.id });

  return (
    <div className={`fixed top-0 right-0 h-full w-64 bg-yellow-400 text-purple-900 p-6 flex flex-col shadow-lg ${isSidebarOpen ? styles.open : ''}`}>
      {/* Logo/Header (Optional) */}
      <div className="mb-8">
        <Link href="/" className="block">
          {/* Replace with your logo if you have one */}
          <div className="font-bold text-xl text-purple-900">Settings</div>
        </Link>
      </div>

      {/* User Info */}
      <div className="mb-6 text-center">
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: {
                  width: '100%',
                  height: '100%'
                }
              }
            }} />
          </SignedIn>
          <SignedOut>
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xl font-semibold">
              G
            </div>
          </SignedOut>
        </div>
        <div className="mt-2 font-semibold">
          <SignedIn>{user?.username || user?.firstName || username}</SignedIn>
          <SignedOut>Guest</SignedOut>
        </div>
        {convexUser?.data?.biscuits !== undefined && (
          <div className="text-sm text-purple-700 mt-1">
            {convexUser.data.biscuits} Biscuits
          </div>
        )}
      </div>

      {/* Navigation/Action Links */}
      <nav className="flex-1">
        <ul className="space-y-4">
          <SignedIn>
            <li>
              <Link href="/settings" className="block p-2 rounded-md hover:bg-yellow-300">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/betting-history" className="block p-2 rounded-md hover:bg-yellow-300">
                Betting History
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut()}
                className="w-full text-left block p-2 rounded-md hover:bg-yellow-300 text-purple-900"
              >
                Sign Out
              </button>
            </li>
          </SignedIn>

          <SignedOut>
            <li>
              <SignInButton className="w-full">
                <button className="w-full text-left block p-2 rounded-md hover:bg-yellow-300 text-purple-900">
                  Sign In
                </button>
              </SignInButton>
            </li>
            <li>
              <SignUpButton className="w-full">
                <button className="w-full text-left block p-2 rounded-md hover:bg-yellow-300 text-purple-900">
                  Sign Up
                </button>
              </SignUpButton>
            </li>
          </SignedOut>
          {/* Add any always visible links here if needed */}
        </ul>
      </nav>

      {/* Close Button (if you still want it for toggling) */}
      {toggleSidebar && (
        <button onClick={toggleSidebar} className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-bold py-2 px-4 rounded focus:outline-none shadow-md">
          Close
        </button>
      )}
    </div>
  );
};

export default SettingsSidebar;