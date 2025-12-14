'use client';

import { useState } from 'react';

interface FeedNavProps {
  activeTab: 'foryou' | 'following';
  onTabChange: (tab: 'foryou' | 'following') => void;
}

export default function FeedNav({ activeTab, onTabChange }: FeedNavProps) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        zIndex: 100,
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, transparent 100%)',
        paddingTop: '12px',
      }}
    >
      <button
        onClick={() => onTabChange('following')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 16px',
          position: 'relative',
        }}
      >
        <span
          style={{
            color: activeTab === 'following' ? '#fff' : 'rgba(255, 255, 255, 0.6)',
            fontSize: '1rem',
            fontWeight: activeTab === 'following' ? 600 : 400,
            transition: 'all 0.2s ease',
          }}
        >
          Following
        </span>
        {activeTab === 'following' && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '24px',
              height: '2px',
              background: '#fff',
              borderRadius: '1px',
            }}
          />
        )}
      </button>

      <div
        style={{
          width: '1px',
          height: '16px',
          background: 'rgba(255, 255, 255, 0.3)',
        }}
      />

      <button
        onClick={() => onTabChange('foryou')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 16px',
          position: 'relative',
        }}
      >
        <span
          style={{
            color: activeTab === 'foryou' ? '#fff' : 'rgba(255, 255, 255, 0.6)',
            fontSize: '1rem',
            fontWeight: activeTab === 'foryou' ? 600 : 400,
            transition: 'all 0.2s ease',
          }}
        >
          For You
        </span>
        {activeTab === 'foryou' && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '24px',
              height: '2px',
              background: '#fff',
              borderRadius: '1px',
            }}
          />
        )}
      </button>
    </nav>
  );
}
