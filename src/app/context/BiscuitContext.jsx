'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create context with default values
const BiscuitContext = createContext({
  biscuitCount: 1000,
  bettingHistory: [],
  placeBet: () => {},
  settleBet: () => {},
  resetAccount: () => {},
  isLoading: true
});

// Provider component
export function BiscuitProvider({ children }) {
  const [biscuitCount, setBiscuitCount] = useState(1000);
  const [bettingHistory, setBettingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag and load data
  useEffect(() => {
    setIsClient(true);
    
    // Only try to access localStorage on the client
    try {
      const savedBiscuits = localStorage.getItem('biscuits');
      const savedHistory = localStorage.getItem('bettingHistory');
      
      if (savedBiscuits) setBiscuitCount(parseInt(savedBiscuits, 10));
      if (savedHistory) setBettingHistory(JSON.parse(savedHistory));
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Only save to localStorage on the client after data changes
  useEffect(() => {
    if (isClient && !isLoading) {
      localStorage.setItem('biscuits', biscuitCount);
      localStorage.setItem('bettingHistory', JSON.stringify(bettingHistory));
    }
  }, [biscuitCount, bettingHistory, isLoading, isClient]);

  // Place a bet function
  const placeBet = (bet) => {
    // Validate bet
    if (bet.amount > biscuitCount) {
      throw new Error('Not enough biscuits');
    }
    if (bet.amount <= 0) {
      throw new Error('Bet amount must be positive');
    }

    // Deduct bet amount from biscuit count
    setBiscuitCount(prev => prev - bet.amount);

    // Add to history
    const newBet = {
      id: Date.now(),
      ...bet,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    setBettingHistory(prev => [newBet, ...prev]);
    
    return newBet;
  };

  // Settle bet function (for demo/manual settling)
  const settleBet = (betId, outcome) => {
    setBettingHistory(prev => prev.map(bet => {
      if (bet.id === betId) {
        const winnings = outcome === 'won' ? Math.floor(bet.amount * bet.odds) : 0;
        
        // Add winnings to biscuit count if won
        if (outcome === 'won') {
          setBiscuitCount(prev => prev + winnings + bet.amount); // Return original bet + winnings
        }
        
        return {
          ...bet,
          status: outcome,
          winnings: winnings,
          settledAt: new Date().toISOString()
        };
      }
      return bet;
    }));
  };

  // Reset (for demo purposes)
  const resetAccount = () => {
    setBiscuitCount(1000);
    setBettingHistory([]);
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = {
    biscuitCount, 
    bettingHistory, 
    placeBet, 
    settleBet,
    resetAccount,
    isLoading
  };

  return (
    <BiscuitContext.Provider value={contextValue}>
      {children}
    </BiscuitContext.Provider>
  );
}

// Custom hook with improved error handling
export function useBiscuits() {
  const context = useContext(BiscuitContext);
  
  if (process.env.NODE_ENV !== 'production') {
    if (context === undefined) {
      throw new Error('useBiscuits must be used within a BiscuitProvider');
    }
  }
  
  return context;
}
