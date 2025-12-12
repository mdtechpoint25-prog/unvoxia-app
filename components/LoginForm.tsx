'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      window.location.href = '/feed';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
    <h2 style={{ color: '#2C3E50', marginBottom: '1rem' }}>Welcome Back</h2>
    <p style={{ color: '#888', marginBottom: '1.5rem' }}>
      Login to your NOMA account
    </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailOrUsername"
          placeholder="Email or Username"
          value={formData.emailOrUsername}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
        <Link href="/forgot-password" style={{ color: '#1ABC9C' }}>Forgot password?</Link>
      </p>
      <p style={{ textAlign: 'center', marginTop: '0.5rem', color: '#888' }}>
        Don't have an account? <Link href="/signup" style={{ color: '#1ABC9C' }}>Sign Up</Link>
      </p>
    </div>
  );
}
