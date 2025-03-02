'use client';

import React, { useState } from 'react';

const TasksPage = () => {
    const [shareCompleted, setShareCompleted] = useState(false);

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

    const handleShare = async (platform) => {
        // In a real app, this would integrate with social media APIs
        try {
            // Simulate sharing
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShareCompleted(true);
            // Here you would update the user's biscuit balance
            alert(`Shared on ${platform}! You earned some biscuits!`);
        } catch (error) {
            alert('Error sharing. Please try again.');
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-900 mb-8">Earn Biscuits</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map(task => (
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
                            onClick={() => handleShare(task.title)}
                            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
                        >
                            Complete Task
                        </button>
                    </div>
                ))}
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