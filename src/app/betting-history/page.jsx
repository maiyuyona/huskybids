"use client";

import { useState, useEffect } from 'react';
import { useBiscuit } from '../Components/BiscuitContext';
import BiscuitIcon from '../Components/BiscuitIcon'; // Adjust path if needed

const BettingHistory = () => {
  const { biscuits } = useBiscuit();
  const [bets, setBets] = useState([]);
  const [filteredBets, setFilteredBets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBets = async () => {
      setLoading(true);
      try {
        const mockBets = [
          { id: 1, eventName: 'UW vs Oregon Football', betAmount: 100, date: '2025-05-14', status: 'won' },
          { id: 2, eventName: 'UW Basketball Tournament', betAmount: 30, date: '2023-09-28', status: 'lost' },
          { id: 3, eventName: 'Husky Spring Game', betAmount: 25, date: '2023-11-05', status: 'won' },
          { id: 4, eventName: 'UW vs WSU Football', betAmount: 100, date: '2023-11-25', status: 'won' },
          { id: 5, eventName: 'PAC-12 Championships', betAmount: 75, date: '2023-12-02', status: 'lost' },
        ];
        await new Promise(resolve => setTimeout(resolve, 500));
        setBets(mockBets);
        setFilteredBets(mockBets);
        setError(null);
      } catch (err) {
        console.error("Error fetching betting history:", err);
        setError("Failed to load betting history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBets();
  }, []);

  useEffect(() => {
    let result = [...bets];
    if (filter !== 'all') {
      result = result.filter(bet => bet.status === filter);
    }
    if (searchQuery) {
      result = result.filter(bet =>
        bet.eventName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredBets(result);
  }, [filter, searchQuery, bets]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800 border-green-300';
      case 'lost': return 'bg-red-100 text-red-800 border-red-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">Betting History</h1>

      <div className="mb-4 p-4 bg-yellow-100 text-purple-900 rounded-md shadow-sm">
        <div className="flex items-center space-x-2">
          <BiscuitIcon size={20} />
          <span className="font-semibold">Your Biscuit Balance:</span>
          <span>{biscuits}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-grow min-w-[200px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="material-icons text-gray-400">search</span>
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Search Events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="min-w-[150px]">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Bets</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="pending">Pending</option>
            </select>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="material-icons text-gray-400">filter_list</span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <span className="material-icons text-gray-400">arrow_drop_down</span>
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
        </div>
      ) : error ? (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-purple-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Event</th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                  <th className="px-6 py-3 text-left font-semibold">Bet Amount</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBets.length > 0 ? (
                  filteredBets.map((bet) => (
                    <tr key={bet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{bet.eventName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(bet.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${bet.betAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bet.status)}`}>
                          {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No betting history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        This page shows your betting history. You can filter by bet status or search for specific events.
      </div>
    </div>
  );
};

export default BettingHistory;