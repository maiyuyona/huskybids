'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 