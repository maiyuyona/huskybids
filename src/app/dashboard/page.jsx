'use client';

import Image from 'next/image';
import GameCalendar from '../Components/GameCalendar';
import { SAMPLE_GAMES } from '../../app/data/games';
import { useState } from 'react';

export default function Dashboard() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedGame, setSelectedGame] = useState(null);

  // Get games for current week
  const getGamesForWeek = (week) => {
    // Debug logs
    console.log('Current week:', week);
    console.log('SAMPLE_GAMES available:', SAMPLE_GAMES);
    const games = SAMPLE_GAMES.filter(game => game.week === week);
    console.log('Filtered games:', games);
    return games;
  };

  // Function to handle week navigation
  const changeWeek = (increment) => {
    const newWeek = currentWeek + increment;
    if (newWeek >= 1 && newWeek <= 12) { // Assuming 12 weeks in a season
      setCurrentWeek(newWeek);
    }
  };

  const currentGames = getGamesForWeek(currentWeek);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header with Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/images/logo.png"
            alt="HuskyBids Logo"
            width={300}
            height={100}
            priority
            className="mb-8"
          />
        </div>

        {/* Game Calendar Section */}
        <div className="mb-12">
          <GameCalendar />
        </div>

        {/* Recent Activity Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">Recent Activity</h2>
            <p className="text-gray-600">Activity feed coming soon...</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-12 bg-purple-100 rounded-lg p-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Welcome to HuskyBids!</h2>
          <p className="text-purple-800">
            Place your bets on UW football games, earn Biscuits, and climb the leaderboard.
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => changeWeek(-1)}
            className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50 cursor-pointer"
            disabled={currentWeek === 1}
            style={{ minWidth: '100px' }}
          >
            <span className="flex items-center justify-center">
              <span className="material-icons mr-1">arrow_back</span>
              Previous Week
            </span>
          </button>
          <h2 className="text-xl font-bold text-purple-900">
            Week {currentWeek} of 12
          </h2>
          <button
            onClick={() => changeWeek(1)}
            className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50 cursor-pointer"
            disabled={currentWeek === 12}
            style={{ minWidth: '100px' }}
          >
            <span className="flex items-center justify-center">
              Next Week
              <span className="material-icons ml-1">arrow_forward</span>
            </span>
          </button>
        </div>

        {/* Display Games for Current Week */}
        <div className="mt-4 space-y-2">
          {currentGames.length > 0 ? (
            currentGames.map(game => (
              <div 
                key={game.id}
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-purple-900">
                      {game.isHome ? 'UW vs ' : 'UW at '}{game.opponent}
                    </h3>
                    <p className="text-sm text-purple-700">
                      {game.date} at {game.time}
                    </p>
                    <p className="text-sm text-purple-700">
                      {game.location}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-purple-700">
                    {game.isHome ? 'Home' : 'Away'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No games scheduled for Week {currentWeek}
            </div>
          )}
        </div>

        {/* Game Details Modal */}
      </div>
    </div>
  );
} 