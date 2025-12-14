'use client';

import { useState } from 'react';
import Link from 'next/link';

type LoginMode = 'password' | 'otp';

export default function LoginForm() {
  const [mode, setMode] = useState<LoginMode>('password');
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [otpData, setOtpData] = useState({
    email: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
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

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/login/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpData.email, action: 'request' })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      setOtpSent(true);
      setSuccess('OTP sent to your email!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpData.email, otp: otpData.otp, action: 'verify' })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP');

      window.location.href = '/feed';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ color: '#1a1a2e', marginBottom: '0.5rem', fontWeight: 700 }}>Welcome Back</h2>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Login to your NOMA account
      </p>

      {/* Login Mode Toggle */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '1.5rem',
        background: '#f5f5f5',
        padding: '0.25rem',
        borderRadius: '10px'
      }}>
        <button
          type="button"
          onClick={() => { setMode('password'); setError(''); setSuccess(''); }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: mode === 'password' 
              ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)' 
              : 'transparent',
            color: mode === 'password' ? '#fff' : '#4a5568',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => { setMode('otp'); setError(''); setSuccess(''); setOtpSent(false); }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: mode === 'otp' 
              ? 'linear-gradient(135deg, #9B59B6 0%, #8e44ad 100%)' 
              : 'transparent',
            color: mode === 'otp' ? '#fff' : '#4a5568',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          OTP Login
        </button>
      </div>

      {/* Password Login Form */}
      {mode === 'password' && (
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
              padding: '0.875rem',
              marginBottom: '0.875rem',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '0.95rem'
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
              padding: '0.875rem',
              marginBottom: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '0.95rem'
            }}
          />
          {error && (
            <div style={{ 
              padding: '0.75rem',
              background: '#fee2e2',
              borderRadius: '8px',
              color: '#dc2626',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}

      {/* OTP Login Form */}
      {mode === 'otp' && (
        <>
          {!otpSent ? (
            <form onSubmit={handleRequestOtp}>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
                We'll send a one-time password to your email
              </p>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={otpData.email}
                onChange={handleOtpChange}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  marginBottom: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '0.95rem'
                }}
              />
              {error && (
                <div style={{ 
                  padding: '0.75rem',
                  background: '#fee2e2',
                  borderRadius: '8px',
                  color: '#dc2626',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #9B59B6 0%, #8e44ad 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              {success && (
                <div style={{ 
                  padding: '0.75rem',
                  background: '#d1fae5',
                  borderRadius: '8px',
                  color: '#059669',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  ? {success}
                </div>
              )}
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Enter the 6-digit code sent to <strong>{otpData.email}</strong>
              </p>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP code"
                value={otpData.otp}
                onChange={handleOtpChange}
                maxLength={6}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  marginBottom: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1.25rem',
                  textAlign: 'center',
                  letterSpacing: '0.5rem'
                }}
              />
              {error && (
                <div style={{ 
                  padding: '0.75rem',
                  background: '#fee2e2',
                  borderRadius: '8px',
                  color: '#dc2626',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading || otpData.otp.length !== 6}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  background: (loading || otpData.otp.length !== 6) 
                    ? '#9ca3af' 
                    : 'linear-gradient(135deg, #9B59B6 0%, #8e44ad 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: (loading || otpData.otp.length !== 6) ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
              <button
                type="button"
                onClick={() => { setOtpSent(false); setOtpData({ ...otpData, otp: '' }); setError(''); }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'transparent',
                  color: '#6b7280',
                  border: 'none',
                  marginTop: '0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Use a different email
              </button>
            </form>
          )}
        </>
      )}

      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280' }}>
        <Link href="/forgot-password" style={{ color: '#1ABC9C', fontWeight: 500 }}>
          Forgot password?
        </Link>
      </p>
      <p style={{ textAlign: 'center', marginTop: '0.75rem', color: '#6b7280' }}>
        Don't have an account?{' '}
        <Link href="/signup" style={{ color: '#1ABC9C', fontWeight: 500 }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
