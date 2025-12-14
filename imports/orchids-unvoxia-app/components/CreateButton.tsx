'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/create')}
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '48px',
        height: '32px',
        background: 'linear-gradient(90deg, #0d9488, #7c3aed)',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 90,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
      }}
      aria-label="Create post"
    >
      <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 300, lineHeight: 1 }}>
        +
      </span>
    </button>
  );
}
