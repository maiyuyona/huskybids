"use client";

import React from "react";
import { SAMPLE_USERS } from "../data/users";
import BiscuitIcon from "../Components/BiscuitIcon";
import styles from "./leaderboard.module.css"; // Import CSS Module

const LeaderboardPage = () => {
  // Sort users by biscuits in descending order
  const sortedUsers = [...SAMPLE_USERS].sort((a, b) => b.biscuits - a.biscuits);
  const [first, second, third, ...rest] = sortedUsers;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Leaderboard</h1>
      </header>

      {/* Podium Section */}
      <div className={styles.podium}>
        {second && (
          <div className={`${styles.podiumPlace}`}>
            <div className={styles.podiumUsername}>{second.username}</div>
            <div className={styles.podiumRankBox} style={{ height: '10rem' }}>
              <div className={styles.podiumRank}>2nd</div>
              <div className={styles.podiumBiscuits}>
                <BiscuitIcon size={20} /> <span>{second.biscuits}</span>
              </div>
            </div>
          </div>
        )}

        {first && (
          <div className={`${styles.podiumPlace} ${styles.firstPlace}`}>
            <div className={styles.podiumUsername}>{first.username}</div>
            <div className={styles.podiumRankBox} style={{ height: '13rem' }}>
              <div className={styles.podiumCrown}>👑</div>
              <div className={styles.podiumRank}>1st</div>
              <div className={styles.podiumBiscuits}>
                <BiscuitIcon size={24} /> <span>{first.biscuits}</span>
              </div>
            </div>
          </div>
        )}

        {third && (
          <div className={`${styles.podiumPlace}`}>
            <div className={styles.podiumUsername}>{third.username}</div>
            <div className={styles.podiumRankBox} style={{ height: '9rem' }}>
              <div className={styles.podiumRank}>3rd</div>
              <div className={styles.podiumBiscuits}>
                <BiscuitIcon size={20} /> <span>{third.biscuits}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rankings Table */}
      <div className={styles.rankingsTable}>
        <table>
          <thead>
            <tr className={styles.tableHeaderRow}>
              <th className={styles.tableHeader}>Rank</th>
              <th className={styles.tableHeader}>Username</th>
              <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Biscuits</th>
              <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Win Rate</th>
              <th className={styles.tableHeader} style={{ textAlign: 'right' }}>Total Bids</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.id} className={index < 3 ? styles.topRankRow : styles.rowHover}>
                <td className={styles.rankCell}>
                  {index + 1}
                  {index === 0 && <span className={styles.rankCrown}>👑</span>}
                  {index === 1 && <span className={styles.rankCrown}>🥈</span>}
                  {index === 2 && <span className={styles.rankCrown}>🥉</span>}
                </td>
                <td className={styles.usernameCell}>{user.username}</td>
                <td className={`${styles.biscuitCell} winRateCell`}>
                  <BiscuitIcon size={16} /> <span>{user.biscuits}</span>
                </td>
                <td className={`winRateCell`}>{(user.winRate * 100).toFixed(1)}%</td>
                <td className={`totalBidsCell`}>{user.totalBids}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;