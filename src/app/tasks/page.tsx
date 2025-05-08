'use client';

import Header from '../Components/Header';

export default function Tasks() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">No tasks available at the moment.</p>
      </div>
    </div>
  );
} 