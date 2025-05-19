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

  const menuItems = [
    { label: 'Dashboard', href: '/testingHome', icon: 'dashboard' },
    { label: 'New Bid', href: '/new-bid', icon: 'add_circle' },
    { label: 'Tasks', href: '/daily-tasks', icon: 'task' },
    { label: 'Leaderboard', href: '/leaderboard', icon: 'leaderboard' },
  ];

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
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`${styles.menuItem} ${pathname === item.href ? styles.active : ''}`}
              >
                <span className="material-icons">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
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