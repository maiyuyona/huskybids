"use client";

import React, { useState } from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import SettingsSidebarComponent from './SettingsSidebar/SettingsSidebar';
import Sidebar from './Sidebar';

const ClientLayout = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const { user } = useUser();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar className="w-64"/>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Top Bar (for profile picture and potentially other elements) */}
        <div className="flex justify-end mb-4 md:mb-6">
          {/* Profile Picture / User Button */}
          <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="rounded-full">
                <Avatar className="w-10 h-10 md:w-12 md:h-12">
                  <AvatarImage src={user?.imageUrl} alt="Profile" />
                  <AvatarFallback>
                    {user ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}` : '?'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-full sm:max-w-sm">
              <SheetTitle>Settings</SheetTitle>
              <SettingsSidebarComponent
                isSidebarOpen={isSettingsOpen}
                toggleSidebar={setIsSettingsOpen}
                username={user?.username || 'Guest'}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Page Content */}
        <div className="min-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ClientLayout;