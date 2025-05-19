"use client";

import React, { useState, useEffect } from "react";
import { SAMPLE_GAMES } from "../data/games";
import styles from "./new-bid.module.css";
import { useBiscuit } from "../Components/BiscuitContext";
import { useUser } from "@clerk/nextjs"; // Import useUser

const NewBidPage = () => {
  const { biscuits, setBiscuits } = useBiscuit();
  const { userId } = useUser(); // Get the Clerk User ID
  const [selectedGame, setSelectedGame] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [prediction, setPrediction] = useState(null); // 'win', 'lose', or null
  const [canBet, setCanBet] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (selectedGame) {
      const gameDate = new Date(selectedGame.date);
      const bettingWindowStart = new Date(gameDate);
      bettingWindowStart.setDate(gameDate.getDate() - 7);
      const gameEnd = new Date(gameDate);
      gameEnd.setHours(parseInt(selectedGame.time.split(':')[0]) + 2, parseInt(selectedGame.time.split(':')[1]));

      setCanBet(currentTime >= bettingWindowStart && currentTime < gameEnd);
    } else {
      setCanBet(false);
    }
  }, [selectedGame, currentTime]);

  const handlePlaceBid = async () => {
    if (!selectedGame || !bidAmount || !prediction) {
      alert("Please select a game, enter bid amount, and your prediction.");
      return;
    }

    if (!canBet) {
      alert("Bidding is currently closed for this game.");
      return;
    }

    if (!userId) {
      alert("You must be signed in to place a bid.");
      return;
    }

    const bidData = {
      userId: userId, // Include the Clerk User ID
      gameId: selectedGame.id,
      bidAmount: Number(bidAmount),
      prediction,
    };

    try {
      const response = await fetch('/api/place-bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
      });

      if (response.ok) {
        setBiscuits((prevBiscuits) => prevBiscuits - Number(bidAmount));
        alert(`Bid placed successfully!
            Game: UW vs ${selectedGame.opponent}
            Bid Amount: ${bidAmount} Biscuits
            Your Prediction: UW will ${prediction}`);
        setSelectedGame(null);
        setBidAmount("");
        setPrediction(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to place bid: ${errorData?.error || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Place a New Bid</h1>
      </header>

      <div className={styles.bidSection}>
        <h2 className={styles.sectionTitle}>Select Game</h2>
        <div className={styles.gameGrid}>
          {SAMPLE_GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`${styles.gameCard} ${selectedGame?.id === game.id ? styles.selected : ""}`}
            >
              <div className={styles.opponent}>vs {game.opponent}</div>
              <div className={styles.gameDate}>{game.date} - {game.time}</div>
              <div className={styles.winRate}>Week: {game.week}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedGame && (
        <div className={styles.bidSection}>
          <h2 className={styles.sectionTitle}>Place Your Bid</h2>

          <div className={styles.predictionButtons}>
            <button
              onClick={() => setPrediction("win")}
              className={`${styles.predictionButton} win ${prediction === "win" ? "" : styles.unselected}`}
              disabled={!canBet}
            >
              UW Will Win
            </button>
            <button
              onClick={() => setPrediction("lose")}
              className={`${styles.predictionButton} lose ${prediction === "lose" ? "" : styles.unselected}`}
              disabled={!canBet}
            >
              UW Will Lose
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="bidAmount" className={styles.bidAmountLabel}>
              Bid Amount (Biscuits)
            </label>
            <input
              type="number"
              id="bidAmount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className={styles.bidAmountInput}
              placeholder="Enter amount"
              min="1"
              disabled={!canBet}
            />
          </div>

          <button
            onClick={handlePlaceBid}
            className={styles.placeBidButton}
            disabled={!canBet || !prediction || !bidAmount}
          >
            {canBet ? "Place Bid" : "Bidding Closed"}
          </button>
        </div>
      )}
    </div>
  );
};

export default NewBidPage;