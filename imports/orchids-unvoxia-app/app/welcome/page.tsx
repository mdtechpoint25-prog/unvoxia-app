'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WelcomePage() {
  const router = useRouter();

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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glows */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)',
          top: '-10%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
          bottom: '-10%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            marginBottom: '0.5rem',
          }}
        >
          NOMA
        </h1>

        {/* Headline */}
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            marginBottom: '3rem',
            lineHeight: 1.4,
          }}
        >
          You don&apos;t need a mask here.
        </h2>

        {/* Auth Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
            marginBottom: '2rem',
          }}
        >
          <button
            onClick={() => router.push('/login?method=email')}
            style={{
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0d9488';
              e.currentTarget.style.background = 'rgba(13, 148, 136, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Continue with Email
          </button>

          <button
            onClick={() => router.push('/login?method=phone')}
            style={{
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#7c3aed';
              e.currentTarget.style.background = 'rgba(124, 58, 237, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Continue with Phone
          </button>
        </div>

        {/* Privacy message */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          No real names. Ever.
        </p>

        {/* Terms footer */}
        <p
          style={{
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          By continuing, you agree to our{' '}
          <Link
            href="/safety"
            style={{
              color: '#0d9488',
              textDecoration: 'none',
            }}
          >
            Community Safety Rules
          </Link>
        </p>
      </div>
    </main>
  );
}
