'use client';

import { useState, useEffect } from 'react';
import { useBiscuits } from '../context/BiscuitContext';
import { 
  FiHome, FiClipboard, FiSettings, 
  FiUser, FiAward, 
  FiFilter, FiSearch, FiCheck, FiX, FiChevronRight // <-- Add FiChevronRight here
} from 'react-icons/fi';
import Link from 'next/link';

// Import shared components
import Sidebar from '../Components/Sidebar';
import MobileHeader from '../Components/MobileHeader';

export default function BettingHistory() {
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Only set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Don't render anything complex on the server to avoid hydration mismatches
  if (!isClient) {
    return <div className="min-h-screen bg-purple-50"></div>; // Minimal placeholder
  }

  try {
    return <BettingHistoryContent />;
  } catch (err) {
    setError(err);
    return null;
  }
}

// Create wrapper component with error boundary
function BettingHistoryContent() {
  const { biscuitCount, bettingHistory, settleBet } = useBiscuits();
  const [currentPath, setCurrentPath] = useState('/betting-history');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState([]);

  // Update path
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Filter history based on filter and search
  useEffect(() => {
    let filtered = [...bettingHistory];
    
    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(bet => bet.status === filter);
    }
    
    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(bet =>
        bet.event.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredHistory(filtered);
  }, [bettingHistory, filter, searchQuery]);
  
  // Function to display formatted date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get style based on bet status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'won':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'lost':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Mobile Menu Toggle */}
      <MobileHeader 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* Sidebar - shared component */}
      <Sidebar 
        currentPath={currentPath} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 md:ml-0 pt-16 md:pt-0">
        <div className="container mx-auto px-4 md:px-8 py-6 md:py-10">
          {/* Page Header */}
          <header className="mb-8 pb-6 border-b border-purple-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-purple-950 tracking-tight">
                  Betting History
                </h1>
                <p className="text-purple-700 mt-1">Review all your past bets and outcomes</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex h-10 bg-white rounded-lg shadow-sm overflow-hidden">
                  <span className="flex items-center justify-center px-3 bg-purple-900 text-white font-bold">BISCUITS</span>
                  <span className="flex items-center px-4 font-mono font-bold text-yellow-600">{biscuitCount}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input 
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex">
              <div className="relative min-w-[150px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400" />
                </div>
                <select 
                  className="pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Bets</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FiChevronRight className="text-gray-400 rotate-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Betting History Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {bettingHistory.length === 0 ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-500 mb-4">
                  <FiClipboard className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No betting history yet</h3>
                <p className="text-gray-500">Place your first bet to see it here</p>
                <Link 
                  href="/place-bets"
                  className="mt-4 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Place Your First Bet
                </Link>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <FiSearch className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No matches found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Odds</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredHistory.map((bet) => (
                      <tr key={bet.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{bet.event}</div>
                          <div className="text-sm text-gray-500">{bet.selection}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(bet.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{bet.amount} Biscuits</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bet.odds}x
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(bet.status)}`}>
                            {bet.status === 'won' && <FiCheck className="mr-1 w-3 h-3" />}
                            {bet.status === 'lost' && <FiX className="mr-1 w-3 h-3" />}
                            {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {bet.status === 'won' ? (
                            <span className="font-medium text-green-600">+{bet.winnings} Biscuits</span>
                          ) : bet.status === 'lost' ? (
                            <span className="font-medium text-red-600">0 Biscuits</span>
                          ) : (
                            <span className="text-gray-500">Pending</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {bet.status === 'pending' && (
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => settleBet(bet.id, 'won')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Win
                              </button>
                              <button
                                onClick={() => settleBet(bet.id, 'lost')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Lose
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
