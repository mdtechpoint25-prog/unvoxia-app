'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send reset email');

      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <main style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
        <h2 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Check Your Email</h2>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>
          If an account exists with {email}, you will receive a password reset link.
        </p>
        <Link href="/login" style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          background: '#1ABC9C',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Back to Login
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Reset Password</h2>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>
        Enter your email to receive a password reset link
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}
        />
        {error && <p style={{ color: '#FF6F91', marginBottom: '1rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#1ABC9C',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
        <Link href="/login" style={{ color: '#1ABC9C' }}>Back to Login</Link>
      </p>
    </main>
  );
}
