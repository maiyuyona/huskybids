"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BiscuitIcon from "./BiscuitIcon";
import { usePathname } from 'next/navigation';
import { useBiscuit } from './BiscuitContext';
import styles from './Sidebar.module.css'; // Import the CSS module

const Sidebar = () => {
  const { biscuits, setBiscuits } = useBiscuit();
  const [showDailyBonus, setShowDailyBonus] = useState(true);

  const pathname = usePathname();

  const isActivePath = (path) => pathname === path;

  const getBackgroundColor = (path) => {
    if (!isActivePath(path)) return ''; // No specific background on hover, handled by menuItem:hover

    switch (path) {
      case '/testingHome':
      case '/new-bid':
      case '/tasks':
      case '/leaderboard':
        return styles.active; // Apply the active style
      default:
        return '';
    }
  };

  const claimDailyBonus = () => {
    setBiscuits((prevBiscuits) => prevBiscuits + 100);
    setShowDailyBonus(false);
    alert("Daily bonus of 100 Biscuits claimed!");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Link href="/" className="block">
          <Image
            src="/images/logo.png"
            alt="HuskyBids Logo"
            width={150}
            height={50}
            className={styles.logoImage}
          />
        </Link>
      </div>

      {showDailyBonus && (
        <div className={styles.dailyBonusCard}>
          <div className={styles.dailyBonusTitle}>Daily Bonus Available!</div>
          <button
            onClick={claimDailyBonus}
            className={styles.claimButton}
          >
            Claim Free 100 Biscuits
          </button>
        </div>
      )}

      <nav className={styles.menu}>
        <ul>
          <li>
            <Link
              href="/testingHome"
              className={`${styles.menuItem} ${getBackgroundColor('/testingHome')}`}
            >
              <span className="material-icons">dashboard</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/new-bid"
              className={`${styles.menuItem} ${getBackgroundColor('/new-bid')}`}
            >
              <span className="material-icons">add_circle</span>
              <span>New Bid</span>
            </Link>
          </li>
          <li>
            <Link
              href="/tasks"
              className={`${styles.menuItem} ${getBackgroundColor('/tasks')}`}
            >
              <span className="material-icons">task</span>
              <span>Tasks</span>
            </Link>
          </li>
          <li>
            <Link
              href="/leaderboard"
              className={`${styles.menuItem} ${getBackgroundColor('/leaderboard')}`}
            >
              <span className="material-icons">leaderboard</span>
              <span>Leaderboard</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.balanceContainer}>
        <div className={styles.balanceInfo}>
          <BiscuitIcon size={24} />
          <div>
            <div className={styles.balanceText}>
              Your Balance
            </div>
            <div className={styles.balanceAmount}>{biscuits} Biscuits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;