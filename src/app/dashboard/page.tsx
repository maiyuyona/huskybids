'use client';

import GameCalendar from '../Components/GameCalendar';
import Header from '../Components/Header';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <GameCalendar />
    </div>
  );
} 