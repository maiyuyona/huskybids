"use client";

import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import SettingsSidebar from '../components/SettingsSidebar/SettingsSidebar';

export default function MainLayout({ children }) {
  // State to control the visibility of the right sidebar
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [username, setUsername] = useState("User"); // Default username

  // Toggle function for the right sidebar
  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <div className="bg-[#4b2e83] flex w-full min-h-screen relative overflow-hidden">
      {/* Profile Icon in the top right - Fixed */}
      <div className="fixed top-4 right-4 z-20">
        <button 
          onClick={toggleRightSidebar}
          className="text-white hover:text-[#c5b4e3] transition-colors"
          aria-label="Toggle profile menu"
        >
          <FaUserCircle size={32} />
        </button>
      </div>
      
      {/* Center Content Area - Renders the matched page */}
      <div className="flex-1 p-6 relative">
        {children}
      </div>

      {/* Right Sidebar using the existing SettingsSidebar component */}
      <SettingsSidebar
        isSidebarOpen={isRightSidebarOpen}
        toggleSidebar={toggleRightSidebar}
        username={username}
      />
      
      {/* Overlay to close sidebar when clicking outside */}
      {isRightSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleRightSidebar}
        ></div>
      )}
    </div>
  );
}
