import React, { useState } from 'react';
import { ClerkProvider, UserButton, useUser } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { BiscuitProvider } from './Components/BiscuitContext';
import Sidebar from './Components/Sidebar';
import SettingsSidebarComponent from './Components/SettingsSidebar/SettingsSidebar';

// Define a simple cn function
const cn = (...args) => {
  return args.filter(Boolean).join(' ');
};

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const { user } = useUser();

  return (
    <ClerkProvider>
      <BiscuitProvider>
        <html lang="en" className={inter.className}>
          <body className="bg-background">
            <div className="flex h-screen">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content Area */}
              <main className="flex-1 p-4 md:p-6 lg:p-8">
                {/* Top Bar (for profile picture and potentially other elements) */}
                <div className="flex justify-end mb-4 md:mb-6">
                  {/* Profile Picture / User Button */}
                  <div className="relative">
                    <button
                      onClick={toggleSettings}
                      className={cn( // Use the cn function we defined
                        "rounded-full overflow-hidden border-2 border-gray-300 w-10 h-10 md:w-12 md:h-12 cursor-pointer"
                      )}
                    >
                      {user?.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                          {user ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}` : '?'}
                        </div>
                      )}
                    </button>
                    {/* Clerk UserButton for sign out */}
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            userButton: "p-2 rounded-md hover:bg-gray-100",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Page Content */}
                {children}

                {/* Settings Sidebar */}
                <div
                  className={cn( // Use the cn function we defined
                    "fixed top-0 right-0 h-full bg-white w-full sm:max-w-sm transform transition-transform duration-300 ease-in-out",
                    isSettingsOpen ? "translate-x-0" : "translate-x-full",
                    "shadow-lg border-l border-gray-200 z-50"
                  )}
                >
                  <SettingsSidebarComponent
                    isSidebarOpen={isSettingsOpen}
                    toggleSidebar={setIsSettingsOpen}
                    username={user?.username || 'Guest'}
                  />
                </div>
                {isSettingsOpen && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSettings}
                  ></div>
                )}
              </main>
            </div>
          </body>
        </html>
      </BiscuitProvider>
    </ClerkProvider>
  );
};

export default RootLayout;