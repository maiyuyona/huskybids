'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import GameCalendar from '../Components/GameCalendar';
import { FiHome, FiClipboard, FiSettings, FiChevronRight, FiUser, FiAward } from 'react-icons/fi';

const sidebarLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
  { label: 'Betting History', href: '/betting-history', icon: <FiClipboard className="w-5 h-5" /> },
  { label: 'Leaderboard', href: '/leaderboard', icon: <FiAward className="w-5 h-5" /> },
  { label: 'Profile', href: '/profile', icon: <FiUser className="w-5 h-5" /> },
  { label: 'Settings', href: '/settings', icon: <FiSettings className="w-5 h-5" /> },
];

export default function Dashboard() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Mobile Menu Toggle */}
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

      {/* Sidebar - desktop always visible, mobile conditional */}
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
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <h2 className="text-2xl font-black tracking-wider text-yellow-300 mt-3">
            HUSKY<span className="text-white">BIDS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full mt-2"></div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-8">
          <ul className="space-y-1">
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
                    onClick={() => setMobileMenuOpen(false)}
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

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 md:ml-0 pt-16 md:pt-0">
        <div className="container mx-auto px-4 md:px-8 py-6 md:py-10">
          {/* Page Header */}
          <header className="mb-8 pb-6 border-b border-purple-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-purple-950 tracking-tight">
                  Dashboard
                </h1>
                <p className="text-purple-700 mt-1">Welcome to your HuskyBids home</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex h-10 bg-white rounded-lg shadow-sm overflow-hidden">
                  <span className="flex items-center justify-center px-3 bg-purple-900 text-white font-bold">BISCUITS</span>
                  <span className="flex items-center px-4 font-mono font-bold text-yellow-600">750</span>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Game Section */}
          <section className="mb-10">
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8 relative">
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 15L85 85H15L50 15Z" />
                  </svg>
                </div>
                <div className="relative">
                  <h2 className="text-xl font-bold text-yellow-300">FEATURED GAME</h2>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                    <div className="mb-4 md:mb-0">
                      <div className="text-3xl font-extrabold">UW vs Oregon</div>
                      <div className="text-purple-200 mt-1">Nov 29, 2024 • 12:00 PM • Husky Stadium</div>
                    </div>
                    <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold rounded-lg transition-colors shadow-md">
                      Place Bets Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-purple-800 px-6 py-3 text-purple-200 text-sm font-medium">
                Betting closes 1 hour before kickoff
              </div>
            </div>
          </section>
          
          {/* Game Calendar Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-900">Upcoming Games</h2>
              <button className="text-purple-700 hover:text-purple-900 font-medium flex items-center">
                View All Games <FiChevronRight className="ml-1" />
              </button>
            </div>
            <GameCalendar />
          </section>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Recent Activity Section */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100">
                <div className="px-6 py-5 bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <h3 className="font-bold text-xl text-purple-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center pb-4 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">You won 150 Biscuits!</p>
                        <p className="text-sm text-gray-500">UW vs UCLA - Final score: 24-17</p>
                      </div>
                      <div className="text-sm text-gray-400">2d ago</div>
                    </div>
                    <div className="flex items-center pb-4 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">Placed bet on UW vs Oregon</p>
                        <p className="text-sm text-gray-500">50 Biscuits on UW to win</p>
                      </div>
                      <div className="text-sm text-gray-400">3d ago</div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <a href="#" className="text-purple-700 hover:text-purple-900 text-sm font-medium">View all activity →</a>
                </div>
              </div>
            </div>

            {/* Quick Stats Section */}
            <div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100 h-full">
                <div className="px-6 py-5 bg-gradient-to-r from-purple-50 to-white border-b border-purple-100">
                  <h3 className="font-bold text-xl text-purple-900">Your Stats</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-sm text-purple-700 font-medium">Total Winnings</div>
                      <div className="text-2xl font-bold text-purple-900">750 Biscuits</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="text-sm text-yellow-700 font-medium">Win Rate</div>
                      <div className="text-2xl font-bold text-yellow-800">64%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-700 font-medium">Leaderboard Position</div>
                      <div className="text-2xl font-bold text-gray-900">#42</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}