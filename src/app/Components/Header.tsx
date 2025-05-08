'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSettings } from '../context/SettingsContext';

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { toggleSettings } = useSettings();

  return (
    <div className="flex items-center justify-between mb-8">
      <Image
        src="/images/logo.png"
        alt="HuskyBids Logo"
        width={200}
        height={80}
        className="rounded-lg"
        priority
      />
      {!isHome && (
        <button
          onClick={toggleSettings}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Settings"
        >
          <span className="material-icons text-2xl">settings</span>
        </button>
      )}
    </div>
  );
};

export default Header; 