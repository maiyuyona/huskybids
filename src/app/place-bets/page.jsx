'use client';

import { useState, useEffect } from 'react';
import { useBiscuits } from '../context/BiscuitContext';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiHome, FiClipboard, FiSettings, 
  FiChevronRight, FiUser, FiAward,
  FiDollarSign, FiPlusCircle, FiAlertCircle,
  FiCheck, FiX
} from 'react-icons/fi';

// Same sidebar links used in dashboard and betting history
const sidebarLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
  { label: 'Betting History', href: '/betting-history', icon: <FiClipboard className="w-5 h-5" /> },
  { label: 'Place Bets', href: '/place-bets', icon: <FiAward className="w-5 h-5" /> },
  { label: 'Profile', href: '/profile', icon: <FiUser className="w-5 h-5" /> },
  { label: 'Settings', href: '/settings', icon: <FiSettings className="w-5 h-5" /> },
];

// Upcoming games for betting
const upcomingGames = [
  {
    id: 1,
    event: 'UW vs Oregon',
    date: '2024-11-29T12:00:00',
    location: 'Husky Stadium',
    imageUrl: '/images/oregon.png',
    odds: {
      win: 2.5,
      lose: 1.8,
      draw: 3.2
    },
    details: 'Annual rivalry game between Washington and Oregon'
  },
  {
    id: 2,
    event: 'UW vs Washington State',
    date: '2024-11-25T15:30:00',
    location: 'Martin Stadium',
    imageUrl: '/images/wsu.png',
    odds: {
      win: 1.9,
      lose: 2.1,
      draw: 3.5
    },
    details: 'The Apple Cup, a classic in-state rivalry'
  },
  {
    id: 3,
    event: 'UW vs UCLA',
    date: '2024-10-15T19:00:00',
    location: 'Husky Stadium',
    imageUrl: '/images/ucla.png',
    odds: {
      win: 1.7,
      lose: 2.2,
      draw: 4.0
    },
    details: 'Conference matchup against the Bruins'
  }
];

export default function PlaceBets() {
  const { biscuitCount, placeBet } = useBiscuits();
  const [currentPath, setCurrentPath] = useState('/place-bets');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [betAmount, setBetAmount] = useState(50);
  const [selection, setSelection] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Update client-side flag and path
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Format date for display
  const formatGameDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Handle game selection
  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setSelection('');
    setBetAmount(50);
    setErrorMessage('');
    setSuccessMessage('');
  };
  
  // Handle bet placement
  const handlePlaceBet = () => {
    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validation
    if (!selectedGame) {
      setErrorMessage('Please select a game');
      return;
    }
    
    if (!selection) {
      setErrorMessage('Please select an outcome');
      return;
    }
    
    if (betAmount <= 0) {
      setErrorMessage('Bet amount must be greater than zero');
      return;
    }
    
    if (betAmount > biscuitCount) {
      setErrorMessage('Not enough biscuits');
      return;
    }
    
    try {
      // Get odds based on selection
      const odds = selectedGame.odds[selection];
      
      // Place the bet
      placeBet({
        event: selectedGame.event,
        selection: `${selection.charAt(0).toUpperCase() + selection.slice(1)}`,
        amount: betAmount,
        odds: odds,
      });
      
      // Show success message
      setSuccessMessage(`Successfully placed ${betAmount} biscuits on ${selectedGame.event}!`);
      
      // Reset form
      setBetAmount(50);
      setSelection('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Render sidebar (same as dashboard and betting history)
  const renderSidebar = () => (
    <aside className={`
      ${mobileMenuOpen ? 'block' : 'hidden'} 
      md:block fixed md:sticky top-0 z-40
      w-64 h-screen
      bg-gradient-to-b from-purple-950 to-purple-800 
      text-white md:shadow-xl transition-all
      pt-6 md:pt-8 px-4
    `}>
      {/* ... existing code ... */}
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

      <div className="mt-auto pb-6 pt-4 text-xs text-purple-300 text-center opacity-75">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mb-4"></div>
        &copy; {new Date().getFullYear()} HuskyBids
      </div>
    </aside>
  );

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

      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 md:ml-0 pt-16 md:pt-0">
        <div className="container mx-auto px-4 md:px-8 py-6 md:py-10">
          {/* Page Header */}
          <header className="mb-8 pb-6 border-b border-purple-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-purple-950 tracking-tight">
                  Place Bets
                </h1>
                <p className="text-purple-700 mt-1">Bet on upcoming Husky games</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="flex h-10 bg-white rounded-lg shadow-sm overflow-hidden">
                  <span className="flex items-center justify-center px-3 bg-purple-900 text-white font-bold">BISCUITS</span>
                  <span className="flex items-center px-4 font-mono font-bold text-yellow-600">{biscuitCount}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Notification Messages */}
          {errorMessage && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <FiAlertCircle className="mt-0.5 mr-2 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start">
              <FiCheck className="mt-0.5 mr-2 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Game List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-purple-900 text-white">
                  <h2 className="font-bold text-lg">Upcoming Games</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {upcomingGames.map((game) => (
                    <button
                      key={game.id}
                      onClick={() => handleSelectGame(game)}
                      className={`w-full px-6 py-4 text-left hover:bg-purple-50 transition-colors ${selectedGame?.id === game.id ? 'bg-purple-50 border-l-4 border-purple-500' : ''}`}
                    >
                      <div className="font-medium text-gray-900">{game.event}</div>
                      <div className="text-sm text-gray-500 mt-1">{formatGameDate(game.date)}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Betting Form */}
            <div className="lg:col-span-2">
              {selectedGame ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-purple-900 to-purple-700 text-white">
                    <h2 className="font-bold text-lg">{selectedGame.event}</h2>
                    <p className="text-sm text-purple-200">{formatGameDate(selectedGame.date)} • {selectedGame.location}</p>
                  </div>
                  
                  <div className="p-6">
                    {/* Game Details */}
                    <div className="mb-6">
                      <p className="text-gray-700">{selectedGame.details}</p>
                    </div>
                    
                    {/* Betting Options */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Select Outcome</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          className={`flex flex-col items-center p-4 rounded-lg border ${selection === 'win' ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => setSelection('win')}
                        >
                          <span className="text-lg font-medium">UW Win</span>
                          <span className="text-sm text-gray-500 mt-1">Odds: {selectedGame.odds.win}x</span>
                        </button>
                        
                        <button
                          className={`flex flex-col items-center p-4 rounded-lg border ${selection === 'draw' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => setSelection('draw')}
                        >
                          <span className="text-lg font-medium">Draw</span>
                          <span className="text-sm text-gray-500 mt-1">Odds: {selectedGame.odds.draw}x</span>
                        </button>
                        
                        <button
                          className={`flex flex-col items-center p-4 rounded-lg border ${selection === 'lose' ? 'bg-red-50 border-red-500 text-red-700' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => setSelection('lose')}
                        >
                          <span className="text-lg font-medium">UW Lose</span>
                          <span className="text-sm text-gray-500 mt-1">Odds: {selectedGame.odds.lose}x</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Bet Amount */}
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Bet Amount</h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="number"
                          min="1"
                          max={biscuitCount}
                          value={betAmount}
                          onChange={(e) => setBetAmount(parseInt(e.target.value) || 0)}
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => setBetAmount(Math.max(1, betAmount - 10))}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            -10
                          </button>
                          <button
                            onClick={() => setBetAmount(Math.max(1, betAmount - 50))}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            -50
                          </button>
                          <button
                            onClick={() => setBetAmount(Math.min(biscuitCount, betAmount + 50))}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            +50
                          </button>
                          <button
                            onClick={() => setBetAmount(Math.min(biscuitCount, betAmount + 10))}
                            className="px-3 py-2 border border-gray-300 rounded-lg"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                      
                      {/* Show potential winnings if selection is made */}
                      {selection && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg">
                          <div className="text-sm text-green-800">
                            If you win, you will receive:
                            <span className="font-bold ml-1">
                              {betAmount * selectedGame.odds[selection]} Biscuits
                            </span>
                            <span className="text-green-600 ml-1">
                              (+{(betAmount * selectedGame.odds[selection]) - betAmount} profit)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handlePlaceBet}
                        className="px-6 py-3 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        disabled={!selection || betAmount <= 0 || betAmount > biscuitCount}
                      >
                        <div className="flex items-center">
                          <FiDollarSign className="mr-2" />
                          Place Bet
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center bg-white rounded-xl shadow-md p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-500 mb-4">
                      <FiPlusCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Select a game</h3>
                    <p className="text-gray-500">Choose a game from the list to place your bet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
