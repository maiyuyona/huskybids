'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BiscuitIcon from './BiscuitIcon';

const Sidebar = ({ biscuits = 1000 }) => { // Default starting balance of 1000 biscuits
    const [showDailyBonus, setShowDailyBonus] = useState(true);

    const claimDailyBonus = () => {
        setShowDailyBonus(false);
        // In a real app, this would update the user's balance in the database
        alert('Daily bonus of 100 Biscuits claimed!');
    };

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-yellow-400 text-purple-900 p-6 flex flex-col shadow-lg">
            {/* Logo/Header */}
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

            {/* Daily Bonus Alert */}
            {showDailyBonus && (
                <div className="mb-6 bg-white text-purple-900 p-3 rounded-lg shadow-md">
                    <div className="font-semibold mb-2">Daily Bonus Available!</div>
                    <button
                        onClick={claimDailyBonus}
                        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors text-sm"
                    >
                        Claim 100 Biscuits
                    </button>
                </div>
            )}

            {/* Navigation Links */}
            <nav className="flex-1">
                <ul className="space-y-4">
                    <li>
                        <Link 
                            href="/"
                            className="flex items-center space-x-2 p-2 rounded hover:bg-yellow-300 transition-colors font-medium"
                        >
                            <span className="material-icons">dashboard</span>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/new-bid"
                            className="flex items-center space-x-2 p-2 rounded hover:bg-yellow-300 transition-colors font-medium"
                        >
                            <span className="material-icons">add_circle</span>
                            <span>New Bid</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/tasks"
                            className="flex items-center space-x-2 p-2 rounded hover:bg-yellow-300 transition-colors font-medium"
                        >
                            <span className="material-icons">task</span>
                            <span>Tasks</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/leaderboard"
                            className="flex items-center space-x-2 p-2 rounded hover:bg-yellow-300 transition-colors font-medium"
                        >
                            <span className="material-icons">leaderboard</span>
                            <span>Leaderboard</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Biscuit Balance */}
            <div className="border-t border-yellow-500 pt-4">
                <div className="flex items-center space-x-2">
                    <BiscuitIcon size={24} />
                    <div>
                        <div className="text-sm text-purple-900 opacity-75">Your Balance</div>
                        <div className="font-bold text-purple-900">{biscuits} Biscuits</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 