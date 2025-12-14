'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FadePhase = 'logo' | 'tagline' | 'quote' | 'complete';

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<FadePhase>('logo');

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Phase transitions
    timers.push(setTimeout(() => setPhase('tagline'), 800));
    timers.push(setTimeout(() => setPhase('quote'), 1600));
    timers.push(setTimeout(() => setPhase('complete'), 2400));

    // Redirect after animation
    timers.push(setTimeout(() => {
      // Check if user is authenticated (localStorage token)
      const hasSession = localStorage.getItem('noma_session');
      router.push(hasSession ? '/foryou' : '/welcome');
    }, 3200));

    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: phase === 'logo' ? 0 : 1,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: phase !== 'logo' ? 1 : 0,
          transform: phase !== 'logo' ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(3rem, 12vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}
        >
          NOMA
        </h1>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: '1.125rem',
          color: 'rgba(255, 255, 255, 0.6)',
          marginTop: '0.5rem',
          opacity: ['tagline', 'quote', 'complete'].includes(phase) ? 1 : 0,
          transform: ['tagline', 'quote', 'complete'].includes(phase) ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        No Mask World
      </p>

      {/* Quote */}
      <p
        style={{
          fontSize: '1.5rem',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.9)',
          marginTop: '3rem',
          fontStyle: 'italic',
          opacity: ['quote', 'complete'].includes(phase) ? 1 : 0,
          transform: ['quote', 'complete'].includes(phase) ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        "Speak without fear."
      </p>

      {/* Loading indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '4rem',
          display: 'flex',
          gap: '8px',
          opacity: phase === 'complete' ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#0d9488',
              animation: 'pulse 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
