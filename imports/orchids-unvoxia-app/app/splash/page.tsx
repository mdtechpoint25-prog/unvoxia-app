'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FadePhase = 'initial' | 'logo' | 'tagline' | 'quote' | 'complete';

export default function SplashPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<FadePhase>('initial');
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);

    const timers: NodeJS.Timeout[] = [];

    // Phase transitions with smoother timing
    timers.push(setTimeout(() => setPhase('logo'), 200));
    timers.push(setTimeout(() => setPhase('tagline'), 1000));
    timers.push(setTimeout(() => setPhase('quote'), 2000));
    timers.push(setTimeout(() => setPhase('complete'), 3000));

    // Redirect after animation
    timers.push(setTimeout(() => {
      const hasSession = localStorage.getItem('noma_session');
      router.push(hasSession ? '/foryou' : '/welcome');
    }, 4000));

    return () => timers.forEach(clearTimeout);
  }, [router]);

  const isPhaseActive = (targetPhase: FadePhase) => {
    const phases: FadePhase[] = ['initial', 'logo', 'tagline', 'quote', 'complete'];
    return phases.indexOf(phase) >= phases.indexOf(targetPhase);
  };

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
        position: 'relative',
      }}
    >
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: 'rgba(13, 148, 136, 0.3)',
            animation: `floatParticle 6s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: isPhaseActive('logo') ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />
      ))}

      {/* Primary Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.2) 0%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: isPhaseActive('logo') ? 1 : 0,
          transform: isPhaseActive('tagline') ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Secondary Purple Glow */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 60%)',
          filter: 'blur(60px)',
          opacity: isPhaseActive('tagline') ? 1 : 0,
          transform: `translate(${isPhaseActive('quote') ? '50px' : '0'}, ${isPhaseActive('quote') ? '-30px' : '0'})`,
          transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Logo Container */}
      <div
        style={{
          opacity: isPhaseActive('logo') ? 1 : 0,
          transform: isPhaseActive('logo')
            ? isPhaseActive('quote') ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)'
            : 'translateY(30px) scale(0.9)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 6rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 30%, #7c3aed 70%, #a78bfa 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            animation: isPhaseActive('logo') ? 'gradientShift 4s ease infinite' : 'none',
            textShadow: '0 0 80px rgba(13, 148, 136, 0.3)',
          }}
        >
          NOMA
        </h1>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.6)',
          marginTop: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: isPhaseActive('tagline') ? 1 : 0,
          transform: isPhaseActive('tagline') ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: '0.1s',
          position: 'relative',
          zIndex: 1,
        }}
      >
        No Mask World
      </p>

      {/* Quote */}
      <p
        style={{
          fontSize: '1.6rem',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.9)',
          marginTop: '3.5rem',
          fontStyle: 'italic',
          opacity: isPhaseActive('quote') ? 1 : 0,
          transform: isPhaseActive('quote') ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        &ldquo;Speak without fear.&rdquo;
      </p>

      {/* Breathing Orb Loading Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '4rem',
          opacity: isPhaseActive('complete') ? 1 : 0,
          transform: isPhaseActive('complete') ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.3) 0%, rgba(124, 58, 237, 0.3) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'breathe 2s ease-in-out infinite',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#0d9488',
              animation: 'pulseCore 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-10px) translateX(-5px); 
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-25px) translateX(5px); 
            opacity: 0.5;
          }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes pulseCore {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(0.85); opacity: 1; }
        }
      `}</style>
    </main>
  );
}
