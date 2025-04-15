'use client';

import Image from 'next/image';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-8 rounded-xl">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src="/images/logo.png"
            alt="HuskyBids Logo"
            fill
            className="object-contain animate-pulse"
          />
        </div>
        
        <div className="flex space-x-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-3 h-3 rounded-full bg-purple-900 animate-bounce"
              style={{ 
                animationDuration: '0.8s',
                animationDelay: `${i * 0.15}s` 
              }}
            ></div>
          ))}
        </div>
        
        <p className="mt-4 text-purple-900 font-medium">Loading HuskyBids...</p>
      </div>
    </div>
  );
}
