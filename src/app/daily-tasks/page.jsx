"use client";

import React from 'react';
import Image from 'next/image';
import BiscuitIcon from '../Components/BiscuitIcon';
import styles from './daily-tasks.module.css'; // Import CSS module
import { useBiscuit } from '../Components/BiscuitContext'; // Import the context

const DailyTasksPage = () => {
  const { biscuits, setBiscuits } = useBiscuit(); // Access the biscuit state and setter

  const earnBiscuitTasks = [
    {
      id: 'share-instagram',
      title: 'Share on Instagram',
      reward: 100,
      description: 'Share HuskyBids on your Instagram story',
      icon: 'instagram',
    },
    {
      id: 'share-twitter',
      title: 'Share on Twitter',
      reward: 100,
      description: 'Tweet about HuskyBids',
      icon: 'twitter',
    },
    {
      id: 'refer-friend',
      title: 'Refer a Friend',
      reward: 200,
      description: 'Invite a friend to join HuskyBids',
      icon: 'person_add',
    },
  ];

  const handleCollect = (taskId) => {
    const taskToCollect = earnBiscuitTasks.find((task) => task.id === taskId);
    if (taskToCollect) {
      setBiscuits((prevBiscuits) => prevBiscuits + taskToCollect.reward);
      alert(`Completed "${taskToCollect.title}" and earned ${taskToCollect.reward} biscuits!`);
      // In a real app, you'd manage the completion state
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Daily Tasks</h1>
        <h2 className={styles.biscuitBalance}>
          <BiscuitIcon size={24} /> Total Biscuits: {biscuits}
        </h2>
      </header>

      <h2 className={styles.earnBiscuitsTitle}>Earn Biscuits</h2>

      <div className={styles.tasksGrid}>
        {earnBiscuitTasks.map((task, index) => (
          <div key={task.id} className={`${styles.taskSquare} ${index === 2 ? styles.taskSquareFullWidth : ''}`}>
            <div className={styles.taskHeader}>
              <span className="material-icons">{task.icon}</span>
              <div className={styles.rewardBadge}>+{task.reward} Biscuits</div>
            </div>
            <h3 className={styles.taskTitle}>{task.title}</h3>
            <p className={styles.taskDescription}>{task.description}</p>
            <button onClick={() => handleCollect(task.id)} className={styles.collectButton}>
              Complete Task
            </button>
          </div>
        ))}
      </div>

      {/* Task Completion Tips */}
      <div className={styles.tipsContainer}>
        <h2 className={styles.tipsTitle}>How to Earn More Biscuits</h2>
        <ul className={styles.tipsList}>
          <li>Share your unique referral link with friends</li>
          <li>Complete daily tasks</li>
          <li>Make successful bids on games</li>
          <li>Participate in community events</li>
        </ul>
      </div>
    </div>
  );
};

export default DailyTasksPage;