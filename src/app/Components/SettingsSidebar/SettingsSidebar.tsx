'use client';

import Link from 'next/link';
import styles from './SettingsSidebar.module.css';
import { useSettings } from '../../context/SettingsContext';

interface SettingsSidebarProps {
  username?: string;
}

const SettingsSidebar = ({ username }: SettingsSidebarProps) => {
  const { isSettingsOpen, toggleSettings } = useSettings();

  return (
    <div className={`${styles.sidebar} ${isSettingsOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.userPicture} onClick={toggleSettings}>
          <div className={styles.grayCircle}></div>
        </div>
        <div className={styles.username} onClick={toggleSettings}>
          {username || 'Guest'}
        </div>
      </div>

      <ul className={styles.menu}>
        <li><Link href="/settings">Settings</Link></li>
        <li><Link href="/betting-history">Betting History</Link></li>
        <li>
          <button 
            onClick={() => {
              // Handle sign out
              console.log('Sign out clicked');
            }}
            className={styles.logoutButton}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SettingsSidebar; 