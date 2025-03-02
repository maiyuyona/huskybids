'use client';

import React, { useState } from 'react';

// Sample game data - replace with real data later
const SAMPLE_GAMES = [
    {
        id: 1,
        opponent: 'Michigan State',
        date: '2024-08-31',
        time: '3:30 PM',
        location: 'Husky Stadium',
        isHome: true,
        week: 1
    },
    {
        id: 2,
        opponent: 'Oregon',
        date: '2024-09-14',
        time: '7:00 PM',
        location: 'Husky Stadium',
        isHome: true,
        week: 3
    },
    {
        id: 3,
        opponent: 'USC',
        date: '2024-09-28',
        time: '4:00 PM',
        location: 'Los Angeles Memorial Coliseum',
        isHome: false,
        week: 5
    },
];

const GameCalendar = () => {
    const [currentWeek, setCurrentWeek] = useState(1);
    const [selectedGame, setSelectedGame] = useState(null);

    // Get games for current week
    const getGamesForWeek = (week) => {
        return SAMPLE_GAMES.filter(game => game.week === week);
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
        <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => changeWeek(-1)}
                    className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50"
                    disabled={currentWeek === 1}
                >
                    Previous Week
                </button>
                <h2 className="text-xl font-bold text-purple-900">
                    Week {currentWeek}
                </h2>
                <button
                    onClick={() => changeWeek(1)}
                    className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50"
                    disabled={currentWeek === 12}
                >
                    Next Week
                </button>
            </div>

            <div className="space-y-2">
                {currentGames.length > 0 ? (
                    currentGames.map(game => (
                        <div
                            key={game.id}
                            onClick={() => setSelectedGame(game)}
                            className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-purple-900">
                                    <div className="font-semibold">{game.opponent}</div>
                                    <div className="text-sm text-purple-700">{game.date} at {game.time}</div>
                                </div>
                            </div>
                            <div className="text-sm font-medium text-purple-700">
                                {game.isHome ? 'Home' : 'Away'}
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
            {selectedGame && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
                        <h3 className="text-xl font-bold mb-4">Game Details</h3>
                        <p className="mb-2">
                            <span className="font-semibold">Opponent:</span> {selectedGame.opponent}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Date:</span> {selectedGame.date}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Time:</span> {selectedGame.time}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Location:</span> {selectedGame.location}
                        </p>
                        <button
                            onClick={() => setSelectedGame(null)}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameCalendar; 