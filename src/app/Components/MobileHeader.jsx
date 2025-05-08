'use client';

import React from 'react';
import Image from 'next/image';

export default function MobileHeader({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <div className="md:hidden fixed top-0 w-full bg-purple-950 z-50 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <Image 
          src="/images/logo.png" 
          alt="HuskyBids" 
          width={40} 
          height={40} 
          className="rounded-full"
        />
        <span className="text-white font-bold ml-2">HuskyBids</span>
      </div>
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="text-white p-2"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>
    </div>
  );
}
