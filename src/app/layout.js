import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { BiscuitProvider } from './context/BiscuitContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HuskyBids | UW Sports Betting Platform',
  description: 'Place your bets on UW sports events with HuskyBids',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          <BiscuitProvider>
            {children}
          </BiscuitProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
