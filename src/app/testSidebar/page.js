"use client"

import { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

const SidebarTesting = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 relative">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
  
        {/* Open Sidebar Button */}
        <button
          className="bg-blue-500 rounded p-4 text-white"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
  
        {/* Main Content */}
        <div
          style={{
            marginRight: isSidebarOpen ? "250px" : "0",
            transition: "0.5s",
            padding: "20px",
          }}
        >
          <h1 className="text-2xl font-bold mt-8">Sidebar Testing Page</h1>
          <p className="mt-4">This page is only for testing the sidebar.</p>
        </div>
      </div>
    );
  };
  
  export default SidebarTesting;