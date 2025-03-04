"use client";
import Link from 'next/link';
import styles from './SettingsSidebar.module.css';

const SettingsSidebar = ({ isSidebarOpen, toggleSidebar, username }) => {
  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.userPicture} onClick={toggleSidebar}>
          <div className={styles.grayCircle}></div>
        </div>
        <div className={styles.username} onClick={toggleSidebar}>
          {username} {/* Display the username passed as a prop */}
        </div>
      </div>
      <ul className={styles.menu}>
        <li><Link href="/settings">Settings</Link></li>
        <li><Link href="/change-password">Change Password</Link></li>
        <li><Link href="/change-username">Change Username</Link></li>
        <li><Link href="/betting-history">Betting History</Link></li>
      </ul>
    </div>
  );
};

export default SettingsSidebar;