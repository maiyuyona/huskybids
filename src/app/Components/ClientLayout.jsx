"use client";

import React, { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import SettingsSidebarComponent from '@/app/Components/SettingsSidebar/SettingsSidebar'; // Use the '@' alias
import Sidebar from '@/app/Components/Sidebar'; // Use the '@' alias
import Head from 'next/head';
import { ConvexProvider, useQuery } from 'convex/react'; // Import useQuery here
import { api } from '../../../convex/_generated/api'; // This path is likely correct
import convex from '@/convexClient'; // Import the Convex client

const ClientLayout = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const { user } = useUser();
  const convexUser = useQuery(api.users.getUserByClerkId, { clerkId: user?.id });

  return (
    <ConvexProvider client={convex}>
      <>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-yellow-400 text-purple-900 p-4 shadow-lg">
            <Sidebar convexUser={convexUser} />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {/* Top Bar */}
            <div className="flex justify-end mb-4 md:mb-6">
              <button onClick={toggleSettings} className="rounded-full focus:outline-none">
                {user?.imageUrl ? (
                  <Image src={user?.imageUrl} alt="Profile" width={40} height={40} className="rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    {user ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}` : '?'}
                  </div>
                )}
              </button>
            </div>

            {/* Page Content */}
            <div className="min-h-[calc(100vh-8rem)]">
              {children}
            </div>
          </main>

          {/* Settings Sidebar */}
          <div className={`fixed top-0 right-0 h-full w-full sm:max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSettingsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <button onClick={toggleSettings} className="absolute top-4 left-4">Close</button>
            <SettingsSidebarComponent
              isSidebarOpen={isSettingsOpen}
              toggleSidebar={setIsSettingsOpen}
              username={user?.username || 'Guest'}
              convexUser={convexUser}
            />
          </div>
        </div>
      </>
    </ConvexProvider>
  );
};

export default ClientLayout;