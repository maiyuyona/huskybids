'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiHome, FiClipboard, FiSettings, 
  FiChevronRight, FiUser, FiAward,
  FiDollarSign
} from 'react-icons/fi';

// Shared sidebar links structure - same across all pages
const sidebarLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
  { label: 'Betting History', href: '/betting-history', icon: <FiClipboard className="w-5 h-5" /> },
  { label: 'Place Bets', href: '/place-bets', icon: <FiDollarSign className="w-5 h-5" /> },
  { label: 'Leaderboard', href: '/leaderboard', icon: <FiAward className="w-5 h-5" /> },
];

// Separate array for settings/profile links that will appear at bottom
const accountLinks = [
  { label: 'Profile', href: '/profile', icon: <FiUser className="w-5 h-5" /> },
  { label: 'Settings', href: '/settings', icon: <FiSettings className="w-5 h-5" /> },
];

export default function Sidebar({ currentPath, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <aside className={`
      ${mobileMenuOpen ? 'block' : 'hidden'} 
      md:block fixed md:sticky top-0 z-40
      w-64 h-screen
      bg-gradient-to-b from-purple-950 to-purple-800 
      text-white md:shadow-xl transition-all
      pt-6 md:pt-8 px-4
    `}>
      {/* Logo and Branding */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-32 h-32">
          <Image
            src="/images/logo.png"
            alt="HuskyBids Logo"
            fill
            sizes="128px"
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
        <h2 className="text-2xl font-black tracking-wider text-yellow-300 mt-3">
          HUSKY<span className="text-white">BIDS</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full mt-2"></div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1">
        <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">Main</h3>
        <ul className="space-y-1 mb-8">
          {sidebarLinks.map(link => {
            const isActive = currentPath === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    flex items-center px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-700 text-white font-bold shadow-md' 
                      : 'hover:bg-purple-800 text-purple-100'
                    }
                  `}
                  onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive && <FiChevronRight className="ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
        
        {/* Account Navigation */}
        <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">Account</h3>
        <ul className="space-y-1">
          {accountLinks.map(link => {
            const isActive = currentPath === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    flex items-center px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-700 text-white font-bold shadow-md' 
                      : 'hover:bg-purple-800 text-purple-100'
                    }
                  `}
                  onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive && <FiChevronRight className="ml-auto" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto pb-6 pt-4 text-xs text-purple-300 text-center opacity-75">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-4"></div>
        &copy; {new Date().getFullYear()} HuskyBids
      </div>
    </aside>
  );
}
