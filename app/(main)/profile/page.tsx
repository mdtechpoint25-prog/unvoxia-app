'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page redirects to the user's own profile
// In production, get username from auth context
export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Get current user's username from auth
    // For now, redirect to a demo profile
    router.replace('/profile/silentvoice_83');
  }, [router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Loading profile...</div>
    </div>
  );
}
