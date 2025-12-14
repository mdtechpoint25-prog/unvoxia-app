'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'email';
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: method === 'email' ? email : undefined,
          phone: method === 'phone' ? phone : undefined,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store session token
        if (data.session?.access_token) {
          localStorage.setItem('noma_session', data.session.access_token);
        }
        // Check if user needs to set up profile
        if (!data.user?.username) {
          router.push('/setup');
        } else {
          router.push('/foryou');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.1) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
      />

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
        {/* Back button */}
        <button
          onClick={() => router.push('/welcome')}
          style={{
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '2rem',
            padding: '0.5rem 0',
          }}
        >
          ← Back
        </button>

        {/* Logo */}
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
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

        <p
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '2rem',
          }}
        >
          Welcome back
        </p>

        {/* Method tabs */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem',
            width: '100%',
          }}
        >
          <button
            onClick={() => router.replace('/login?method=email')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: method === 'email' ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              background: method === 'email' ? 'rgba(13, 148, 136, 0.2)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Email
          </button>
          <button
            onClick={() => router.replace('/login?method=phone')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: method === 'phone' ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              background: method === 'phone' ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Phone
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {method === 'email' ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                marginBottom: '1rem',
                outline: 'none',
              }}
            />
          ) : (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1rem',
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                marginBottom: '1rem',
                outline: 'none',
              }}
            />
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              color: '#fff',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              marginBottom: '1rem',
              outline: 'none',
            }}
          />

          {error && (
            <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #0d9488 0%, #7c3aed 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: isLoading ? 'wait' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'opacity 0.2s ease',
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '1.5rem',
          }}
        >
          <Link
            href="/forgot-password"
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            Forgot password?
          </Link>
          <Link
            href="/signup"
            style={{
              color: '#0d9488',
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0f172a' }} />}>
      <LoginContent />
    </Suspense>
  );
}