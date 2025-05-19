"use client";

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Sidebar from './Sidebar';
import styles from './clientLayout.module.css'; // Import CSS module

const ClientLayout = ({ children }) => {
  const { user } = useUser();
  console.log('ClientLayout user:', user);

  return (
    <div className={styles.container}>
      {/* Left Sidebar */}
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};
export default ClientLayout;