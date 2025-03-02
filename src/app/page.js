import Image from 'next/image';
import GameCalendar from './Components/GameCalendar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header with Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/images/logo.png"
            alt="HuskyBids Logo"
            width={300}
            height={100}
            priority
            className="mb-8"
          />
        </div>

        {/* Game Calendar Section */}
        <div className="mb-12">
          <GameCalendar />
        </div>

        {/* Recent Activity Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">Recent Activity</h2>
            <p className="text-gray-600">Activity feed coming soon...</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-12 bg-purple-100 rounded-lg p-6 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Welcome to HuskyBids!</h2>
          <p className="text-purple-800">
            Place your bets on UW football games, earn Biscuits, and climb the leaderboard.
          </p>
        </div>
      </div>
    </div>
  );
}
