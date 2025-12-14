'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BreathePage() {
  const router = useRouter();
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          // Move to next phase
          setPhase(currentPhase => {
            if (currentPhase === 'inhale') return 'hold';
            if (currentPhase === 'hold') return 'exhale';
            // After exhale, increment cycle and restart
            setCycles(c => c + 1);
            return 'inhale';
          });
          return 4; // Reset count
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const phaseText = {
    inhale: 'Breathe in',
    hold: 'Hold',
    exhale: 'Breathe out',
  };

  const scaleValue = {
    inhale: 1.3,
    hold: 1.3,
    exhale: 1,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Georgia, serif',
        position: 'relative',
      }}
    >
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '1rem',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        ← Back
      </button>

      {/* Breathing orb */}
      <div
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(13, 148, 136, 0.6), rgba(124, 58, 237, 0.4))',
          boxShadow: '0 0 80px rgba(13, 148, 136, 0.4)',
          transition: 'transform 4s ease-in-out',
          transform: `scale(${scaleValue[phase]})`,
          marginBottom: '48px',
        }}
      />

      {/* Phase text */}
      <p
        style={{
          fontSize: '2rem',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '16px',
          fontWeight: 400,
        }}
      >
        {phaseText[phase]}
      </p>

      {/* Count */}
      <p
        style={{
          fontSize: '3rem',
          color: 'rgba(13, 148, 136, 0.9)',
          marginBottom: '48px',
          fontWeight: 300,
        }}
      >
        {count}
      </p>

      {/* Cycle counter */}
      <p
        style={{
          fontSize: '1rem',
          color: 'rgba(255, 255, 255, 0.4)',
          marginBottom: '32px',
        }}
      >
        {cycles > 0 ? `${cycles} breath${cycles > 1 ? 's' : ''} completed` : 'Let\'s begin'}
      </p>

      {/* Done button - appears after 3 cycles */}
      {cycles >= 3 && (
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '16px 32px',
            background: 'rgba(13, 148, 136, 0.2)',
            border: '1px solid rgba(13, 148, 136, 0.4)',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(13, 148, 136, 0.3)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(13, 148, 136, 0.2)';
          }}
        >
          I feel better
        </button>
      )}
    </div>
  );
}
