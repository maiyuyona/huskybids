'use client';

import React, { useState, useEffect } from 'react';
import BiscuitIcon from '../Components/BiscuitIcon'; // Assuming BiscuitIcon is in this path

const TasksPage = () => {
    const [biscuits, setBiscuits] = useState(3300); // Initial balance, consistent with new-bid
    const [completedTasks, setCompletedTasks] = useState({}); // To track completed tasks by ID

    // Load biscuits and completed tasks from localStorage on component mount
    useEffect(() => {
        const savedBiscuits = localStorage.getItem('tasksPageBiscuits');
        if (savedBiscuits) {
            setBiscuits(Number(savedBiscuits));
        }
        const savedCompletedTasks = localStorage.getItem('completedTasks');
        if (savedCompletedTasks) {
            setCompletedTasks(JSON.parse(savedCompletedTasks));
        }
    }, []);

    // Save biscuits and completed tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasksPageBiscuits', biscuits.toString());
    }, [biscuits]);

    useEffect(() => {
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }, [completedTasks]);

    const tasks = [
        {
            id: 1,
            title: 'Share on Instagram',
            reward: 100,
            description: 'Share HuskyBids on your Instagram story',
            icon: 'instagram'
        },
        {
            id: 2,
            title: 'Share on Twitter',
            reward: 100,
            description: 'Tweet about HuskyBids',
            icon: 'twitter'
        },
        {
            id: 3,
            title: 'Refer a Friend',
            reward: 200,
            description: 'Invite a friend to join HuskyBids',
            icon: 'person_add'
        }
    ];

    const handleCompleteTask = async (taskId, reward, taskTitle) => {
        if (completedTasks[taskId]) {
            alert(`You have already completed "${taskTitle}".`);
            return;
        }

        try {
            // Simulate task completion (e.g., API call, social media integration)
            // In a real app, this would integrate with social media APIs or backend
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work

            // Update biscuit balance
            setBiscuits(prev => prev + reward);

            // Mark task as completed
            setCompletedTasks(prev => ({
                ...prev,
                [taskId]: true
            }));

            alert(`"${taskTitle}" completed! You earned ${reward} biscuits!`);
        } catch (error) {
            alert('Error completing task. Please try again.');
        }
    };

    return (
        <div className="p-8 relative"> {/* Added relative for absolute positioning of balance */}
            {/* Biscuit Balance Display on Top Right */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full shadow-md border-2 border-purple-900">
                <BiscuitIcon size={20} className="text-purple-900" />
                <span className="font-bold text-purple-900">{biscuits} Biscuits</span>
            </div>

            <h1 className="text-3xl font-bold text-purple-900 mb-8">Earn Biscuits</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map(task => {
                    const isTaskCompleted = completedTasks[task.id];
                    return (
                        <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="material-icons text-purple-600 text-2xl">
                                    {task.icon}
                                </span>
                                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    +{task.reward} Biscuits
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                            <p className="text-gray-600 mb-4">{task.description}</p>
                            <button
                                onClick={() => handleCompleteTask(task.id, task.reward, task.title)}
                                className={`w-full py-2 rounded transition-colors ${
                                    isTaskCompleted
                                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                        : "bg-purple-600 text-white hover:bg-purple-700"
                                }`}
                                disabled={isTaskCompleted}
                            >
                                {isTaskCompleted ? "Completed" : "Complete Task"}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Task Completion Tips */}
            <div className="mt-8 bg-purple-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-purple-900 mb-4">How to Earn More Biscuits</h2>
                <ul className="list-disc list-inside space-y-2 text-purple-800">
                    <li>Share your unique referral link with friends</li>
                    <li>Complete daily tasks</li>
                    <li>Make successful bids on games</li>
                    <li>Participate in community events</li>
                </ul>
            </div>
        </div>
    );
};

export default TasksPage;