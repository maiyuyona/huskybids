"use client";

import React from "react";
import { SAMPLE_USERS } from "../data/users";
import BiscuitIcon from "../Components/BiscuitIcon";

const LeaderboardPage = () => {
  // Sort users by biscuits in descending order
  const sortedUsers = [...SAMPLE_USERS].sort((a, b) => b.biscuits - a.biscuits);
  const [first, second, third, ...rest] = sortedUsers;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-purple-900 mb-8">Leaderboard</h1>

      {/* Podium Section */}
      <div className="mb-12">
        <div className="flex justify-center items-end space-x-8 h-64">
          {/* Second Place */}
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold mb-2">{second.username}</div>
            <div className="bg-gray-200 w-32 p-4 rounded-t-lg text-center h-40">
              <div className="text-2xl font-bold text-purple-900 mb-2">2nd</div>
              <div className="flex items-center justify-center space-x-1">
                <BiscuitIcon size={20} />
                <span className="font-bold">{second.biscuits}</span>
              </div>
            </div>
          </div>

          {/* First Place */}
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold mb-2">{first.username}</div>
            <div className="bg-purple-600 w-32 p-4 rounded-t-lg text-center h-52 text-white">
              <div className="text-3xl font-bold mb-2">👑</div>
              <div className="text-2xl font-bold mb-2">1st</div>
              <div className="flex items-center justify-center space-x-1">
                <BiscuitIcon size={24} />
                <span className="font-bold">{first.biscuits}</span>
              </div>
            </div>
          </div>

          {/* Third Place */}
          <div className="flex flex-col items-center">
            <div className="text-lg font-semibold mb-2">{third.username}</div>
            <div className="bg-gray-200 w-32 p-4 rounded-t-lg text-center h-32">
              <div className="text-2xl font-bold text-purple-900 mb-2">3rd</div>
              <div className="flex items-center justify-center space-x-1">
                <BiscuitIcon size={20} />
                <span className="font-bold">{third.biscuits}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-purple-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-right">Biscuits</th>
              <th className="px-6 py-3 text-right">Win Rate</th>
              <th className="px-6 py-3 text-right">Total Bids</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedUsers.map((user, index) => (
              <tr
                key={user.id}
                className={index < 3 ? "bg-purple-50" : "hover:bg-gray-50"}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {index + 1}
                    {index < 3 && (
                      <span className="ml-2">
                        {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{user.username}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <BiscuitIcon size={16} />
                    <span>{user.biscuits}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  {(user.winRate * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 text-right">{user.totalBids}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;
