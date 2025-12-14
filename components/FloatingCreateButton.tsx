'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FloatingCreateButton() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    router.push('/create');
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setShowTooltip(false);
      }}
      onMouseEnter={() => setShowTooltip(true)}
      aria-label="Create new post"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 90,
        boxShadow: isPressed 
          ? '0 2px 8px rgba(13, 148, 136, 0.3)' 
          : '0 4px 20px rgba(13, 148, 136, 0.4), 0 0 40px rgba(124, 58, 237, 0.2)',
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Plus Icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{
          transition: 'transform 0.2s ease',
          transform: isPressed ? 'rotate(90deg)' : 'rotate(0deg)',
        }}
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>

      {/* Tooltip */}
      {showTooltip && (
        <span
          style={{
            position: 'absolute',
            right: '70px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          Share what you're holding inside
        </span>
      )}

      {/* Pulse animation ring */}
      <span
        style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '50%',
          border: '2px solid rgba(13, 148, 136, 0.3)',
          animation: 'pulseRing 2s ease-out infinite',
          pointerEvents: 'none',
        }}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
