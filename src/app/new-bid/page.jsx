'use client';

import React, { useState } from 'react';
import { SAMPLE_GAMES, HISTORICAL_DATA } from '../data/games';

const NewBidPage = () => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [prediction, setPrediction] = useState('win'); // 'win' or 'lose'

    const calculatePotentialWinnings = () => {
        if (!selectedGame || !bidAmount) return 0;
        const odds = HISTORICAL_DATA[selectedGame.opponent].odds;
        return Math.round(Number(bidAmount) * odds);
    };

    const handlePlaceBid = () => {
        if (!selectedGame || !bidAmount) {
            alert('Please select a game and enter bid amount');
            return;
        }

        // In a real app, this would make an API call to place the bid
        const winnings = calculatePotentialWinnings();
        alert(`Bid placed successfully!
        Game: UW vs ${selectedGame.opponent}
        Bid Amount: ${bidAmount} Biscuits
        Your Prediction: UW will ${prediction}
        Potential Winnings: ${winnings} Biscuits`);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-900 mb-8">Place a New Bid</h1>

            {/* Game Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Select Game</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {SAMPLE_GAMES.map(game => (
                        <div
                            key={game.id}
                            onClick={() => setSelectedGame(game)}
                            className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                                selectedGame?.id === game.id
                                    ? 'border-purple-600 bg-purple-50'
                                    : 'border-gray-200 hover:border-purple-300'
                            }`}
                        >
                            <div className="font-semibold">vs {game.opponent}</div>
                            <div className="text-sm text-gray-600">{game.date}</div>
                            <div className="text-sm text-purple-600 mt-2">
                                Win Rate: {(HISTORICAL_DATA[game.opponent].winPercentage * 100).toFixed(1)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bid Details */}
            {selectedGame && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Bid Details</h2>
                    
                    {/* Prediction Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Prediction
                        </label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setPrediction('win')}
                                className={`px-4 py-2 rounded ${
                                    prediction === 'win'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                UW Will Win
                            </button>
                            <button
                                onClick={() => setPrediction('lose')}
                                className={`px-4 py-2 rounded ${
                                    prediction === 'lose'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                UW Will Lose
                            </button>
                        </div>
                    </div>

                    {/* Bid Amount */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bid Amount (Biscuits)
                        </label>
                        <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Enter amount"
                            min="1"
                        />
                    </div>

                    {/* Potential Winnings */}
                    <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                        <div className="text-sm text-purple-700">Potential Winnings</div>
                        <div className="text-2xl font-bold text-purple-900">
                            {calculatePotentialWinnings()} Biscuits
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceBid}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Place Bid
                    </button>
                </div>
            )}

            {/* Historical Stats */}
            {selectedGame && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Historical Stats vs {selectedGame.opponent}</h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-sm text-purple-700">Wins</div>
                            <div className="text-2xl font-bold text-purple-900">
                                {HISTORICAL_DATA[selectedGame.opponent].wins}
                            </div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-sm text-purple-700">Losses</div>
                            <div className="text-2xl font-bold text-purple-900">
                                {HISTORICAL_DATA[selectedGame.opponent].losses}
                            </div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="text-sm text-purple-700">Win Rate</div>
                            <div className="text-2xl font-bold text-purple-900">
                                {(HISTORICAL_DATA[selectedGame.opponent].winPercentage * 100).toFixed(1)}%
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewBidPage; 