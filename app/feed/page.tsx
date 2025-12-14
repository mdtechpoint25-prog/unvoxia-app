'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/authentic-feed');
  }, [router]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-secondary)'
    }}>
      <p>Redirecting to Authentic Feed...</p>
    </div>
  );
}
