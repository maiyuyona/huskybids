"use client";
import { useState } from 'react';
import SettingsSidebar from '../components/SettingsSidebar/SettingsSidebar';
import styles from './TestSidebar.module.css';

const TestSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('Dubs'); // Local state for username

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.container}>
      {/* Grey Circle Button and Text */}
      {!isSidebarOpen && ( // Only show buttons when sidebar is closed
        <div className={styles.toggleContainer}>
          <button className={styles.toggleButton} onClick={toggleSidebar}>
            <div className={styles.grayCircle}></div>
          </button>
          <p className={styles.toggleText} onClick={toggleSidebar}>Toggle Sidebar</p>
        </div>
      )}

      {/* Sidebar */}
      <SettingsSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        username={username} // Pass the username as a prop
      />

      {/* Page Content */}
      <div className={styles.content}>
        <h1>Test Sidebar Page</h1>
        <p>Click the gray circle or the text below it to toggle the sidebar.</p>
      </div>
    </div>
  );
};

export default TestSidebar;