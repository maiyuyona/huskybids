"use client";

import React, { useState, useEffect } from "react";
import { SAMPLE_GAMES } from "../data/games";
import BiscuitIcon from "../Components/BiscuitIcon";

const NewBidPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [prediction, setPrediction] = useState("win"); // 'win' or 'lose'
  const [biscuits, setBiscuits] = useState(3100); // Initialize balance to 3100

  // Effect to load/save biscuits for persistence on this page
  useEffect(() => {
    const savedBiscuits = localStorage.getItem('newBidPageBiscuits');
    if (savedBiscuits) {
      setBiscuits(Number(savedBiscuits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('newBidPageBiscuits', biscuits.toString());
  }, [biscuits]);

  const handlePlaceBid = () => {
    if (!selectedGame || !bidAmount) {
      alert("Please select a game and enter bid amount.");
      return;
    }

    const amount = Number(bidAmount);
    
    if (amount <= 0) {
      alert("Bid amount must be a positive number.");
      return;
    }

    // Even though balance doesn't always change, ensure user 'has' the amount to bet
    if (amount > biscuits) {
      alert("You don't have enough biscuits for this bid.");
      return;
    }

    let alertMessage = "";
    let balanceChange = 0; // Initialize balance change to 0

    // Specific logic for the Oregon game scenario
    if (selectedGame.opponent === 'Oregon') {
      if (prediction === 'win') {
        // If UW wins and prediction is UW win, user gains the bid amount
        balanceChange = amount;
        alertMessage = `Results are in! UW wins against Oregon! You gained ${amount} biscuits!`;
      } else { // prediction is 'lose' for Oregon game
        // If UW wins but prediction was UW lose, balance does not change
        alertMessage = `Results are in! UW wins against Oregon! Your balance remains unchanged.`;
      }
    } else {
      // For all other games, balance does not change regardless of prediction
      alertMessage = `Bid placed successfully!
        Game: UW vs ${selectedGame.opponent}
        Bid Amount: ${bidAmount} Biscuits
        Your Prediction: UW will ${prediction}. Your balance remains unchanged.`;
    }

    // Apply the balance change if any occurred
    if (balanceChange !== 0) {
      setBiscuits(prev => prev + balanceChange);
    }

    alert(alertMessage);
    
    // Clear form fields
    setBidAmount("");
    setSelectedGame(null);
  };

  return (
    <div className="p-8 relative">
      {/* Biscuit Balance Display on Top Right */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full shadow-md border-2 border-purple-900">
        <BiscuitIcon size={20} className="text-purple-900" />
        <span className="font-bold text-purple-900">{biscuits} Biscuits</span>
      </div>

      <h1 className="text-3xl font-bold text-purple-900 mb-8">
        Place a New Bid
      </h1>

      {/* Game Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Game</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                selectedGame?.id === game.id
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="font-semibold">vs {game.opponent}</div>
              <div className="text-sm text-gray-600">{game.date}</div>
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
                onClick={() => setPrediction("win")}
                className={`px-4 py-2 rounded ${
                  prediction === "win"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                UW Will Win
              </button>
              <button
                onClick={() => setPrediction("lose")}
                className={`px-4 py-2 rounded ${
                  prediction === "lose"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

          <button
            onClick={handlePlaceBid}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Place Bid
          </button>
        </div>
      )}
    </div>
  );
};

export default NewBidPage;

/*"use client";

import React, { useState } from "react";
import { SAMPLE_GAMES } from "../data/games";

const NewBidPage = ({ initialBalance, setBalance }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [prediction, setPrediction] = useState("win"); // 'win' or 'lose'

  const handlePlaceBid = () => {
    if (!selectedGame || !bidAmount) {
      alert("Please select a game and enter bid amount");
      return;
    }

    const amount = Number(bidAmount);
    
    // Check if user has enough balance
    if (amount > initialBalance) {
      alert("You don't have enough biscuits for this bid");
      return;
    }

    // Special handling for Oregon game
    if (selectedGame.opponent === 'Oregon' && prediction === 'win') {
      setBalance(prev => prev + amount);
      alert("Results are in! UW wins!");
    } else if (selectedGame.opponent === 'Oregon' && prediction === 'win') {
      alert("Results are in! UW wins! Good luck next time.")
    } else {
      // For other games or if prediction is wrong, just place the bid
      alert(`Bid placed successfully!
        Game: UW vs ${selectedGame.opponent}
        Bid Amount: ${bidAmount} Biscuits
        Your Prediction: UW will ${prediction}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-purple-900 mb-8">
        Place a New Bid
      </h1>

      {/* Game Selection }
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Game</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`p-4 rounded-lg cursor-pointer border-2 transition-colors ${
                selectedGame?.id === game.id
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="font-semibold">vs {game.opponent}</div>
              <div className="text-sm text-gray-600">{game.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bid Details }
      {selectedGame && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Bid Details</h2>

          {/* Prediction Selection }
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Prediction
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setPrediction("win")}
                className={`px-4 py-2 rounded ${
                  prediction === "win"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                UW Will Win
              </button>
              <button
                onClick={() => setPrediction("lose")}
                className={`px-4 py-2 rounded ${
                  prediction === "lose"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                UW Will Lose
              </button>
            </div>
          </div>

          {/* Bid Amount }
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

          <button
            onClick={handlePlaceBid}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Place Bid
          </button>
        </div>
      )}
    </div>
  );
};

export default NewBidPage; */