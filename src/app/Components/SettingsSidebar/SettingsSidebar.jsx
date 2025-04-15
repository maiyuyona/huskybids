"use client";
import Link from 'next/link';
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useClerk
} from "@clerk/nextjs";
import styles from './SettingsSidebar.module.css';

const SettingsSidebar = ({ isSidebarOpen, toggleSidebar, username }) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.userPicture} onClick={toggleSidebar}>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: {
                  width: '100px',
                  height: '100px'
                }
              }
            }} />
          </SignedIn>
          <SignedOut>
            <div className={styles.grayCircle}></div>
          </SignedOut>
        </div>
        <div className={styles.username} onClick={toggleSidebar}>
          <SignedIn>{user?.username || user?.firstName || username}</SignedIn>
          <SignedOut>Guest</SignedOut>
        </div>
      </div>

      <ul className={styles.menu}>
        <SignedIn>
          <li><Link href="/settings">Settings</Link></li>
          <li><Link href="/betting-history">Betting History</Link></li>
          <li>
            <button 
              onClick={() => signOut()}
              className={styles.logoutButton}
            >
              Sign Out
            </button>
          </li>
        </SignedIn>
        
        <SignedOut>
          <li>
            <SignInButton mode="modal">
              <button className={styles.authButton}>Sign In</button>
            </SignInButton>
          </li>
          <li>
            <SignUpButton mode="modal">
              <button className={styles.authButton}>Sign Up</button>
            </SignUpButton>
          </li>
        </SignedOut>
      </ul>
    </div>
  );
};

export default SettingsSidebar; 