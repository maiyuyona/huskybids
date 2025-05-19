import { Inter } from 'next/font/google';
import './globals.css';
import { ConvexClientProvider } from './ConvexClientProvider'; // Adjust path if needed
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

// Define metadata as a plain JavaScript object
export const metadata = {
  title: 'HuskyBids',
  description: 'A Husky Bids website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}