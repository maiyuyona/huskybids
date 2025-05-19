// src/app/layout.js
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { BiscuitProvider } from './Components/BiscuitContext';
import ClientLayout from './Components/ClientLayout'; // Import the ClientLayout

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }) => {
  return (
    <ClerkProvider>
      <BiscuitProvider>
        <html lang="en" className={inter.className}>
          <body className="bg-background">
            <ClientLayout>
              {children}
            </ClientLayout>
          </body>
        </html>
      </BiscuitProvider>
    </ClerkProvider>
  );
};

export default RootLayout;