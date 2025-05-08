'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from './Components/Sidebar';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HuskyBids',
  description: 'Bid on Husky games',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  );
} 