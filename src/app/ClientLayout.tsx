'use client';

import SettingsSidebar from './Components/SettingsSidebar/SettingsSidebar';
import { SettingsProvider } from './context/SettingsContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <div className="flex min-h-screen">
        {children}
        <SettingsSidebar />
      </div>
    </SettingsProvider>
  );
} 