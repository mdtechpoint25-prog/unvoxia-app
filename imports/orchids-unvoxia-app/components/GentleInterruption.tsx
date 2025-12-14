'use client';

import Link from 'next/link';

interface GentleInterruptionProps {
  onContinue: () => void;
}

export default function GentleInterruption({ onContinue }: GentleInterruptionProps) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        position: 'relative',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Warm glow */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: '320px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Gentle message */}
        <p
          style={{
            fontSize: '1.375rem',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.6,
            margin: '0 0 2.5rem',
            fontFamily: 'Georgia, serif',
          }}
        >
          If something inside you wants to speak, you can let it out here.
        </p>

        {/* Primary action */}
        <Link
          href="/release"
          style={{
            display: 'inline-block',
            background: 'rgba(20, 184, 166, 0.15)',
            border: '1px solid rgba(20, 184, 166, 0.4)',
            color: '#14b8a6',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            marginBottom: '1.25rem',
            transition: 'all 0.3s ease',
          }}
        >
          Let it out
        </Link>

        {/* Secondary option */}
        <button
          onClick={onContinue}
          style={{
            display: 'block',
            width: '100%',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.9375rem',
            padding: '0.75rem',
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
        >
          Keep reading
        </button>
      </div>

      {/* Privacy note */}
      <div
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.3)',
          textAlign: 'center',
        }}
      >
        No names. No tracking. No judgment.
      </div>
    </div>
  );
}
