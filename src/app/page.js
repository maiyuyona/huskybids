'use client';

import Link from 'next/link';

// Simple index page with .js extension to test basic routing
export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Husky Bids Home</h1>
      <p>This is a very simple home page to test routing.</p>
      <div style={{ marginTop: '20px' }}>
        <Link href="/betting-history" style={{ color: 'blue', textDecoration: 'underline', marginRight: '16px' }}>
          Go to Betting History
        </Link>
        <Link href="/dashboard" style={{ color: 'green', textDecoration: 'underline' }}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
