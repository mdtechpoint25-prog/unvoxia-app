'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// SVG Icons
const MailIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1ABC9C" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setStep('verify');
      setResendCooldown(60); // 60 second cooldown after initial send
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      window.location.href = '/login?verified=true';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || resendLoading) return;

    setResendLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resend code');

      setSuccess('Verification code sent! Please check your email.');
      setResendCooldown(60); // 60 second cooldown
    } catch (err: any) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  if (step === 'verify') {
    return (
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <MailIcon />
        </div>
        <h2 style={{ color: '#2C3E50', marginBottom: '0.5rem', textAlign: 'center' }}>
          Verify Your Email
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.95rem' }}>
          We sent a 6-digit code to<br />
          <strong style={{ color: '#1ABC9C' }}>{formData.email}</strong>
        </p>
        
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            maxLength={6}
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1.75rem',
              textAlign: 'center',
              letterSpacing: '0.75rem',
              fontWeight: 600,
              color: '#1a1a2e',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#1ABC9C'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
          
          {error && (
            <div style={{
              padding: '0.75rem',
              background: '#fee2e2',
              borderRadius: '8px',
              color: '#dc2626',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={{
              padding: '0.75rem',
              background: '#d1fae5',
              borderRadius: '8px',
              color: '#059669',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {success}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: (loading || otp.length !== 6) 
                ? '#e5e7eb' 
                : 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
              color: (loading || otp.length !== 6) ? '#9ca3af' : '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: (loading || otp.length !== 6) ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        {/* Resend Code Section */}
        <div style={{ 
          textAlign: 'center', 
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendCode}
            disabled={resendCooldown > 0 || resendLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              background: (resendCooldown > 0 || resendLoading) ? '#f3f4f6' : '#fff',
              color: (resendCooldown > 0 || resendLoading) ? '#9ca3af' : '#1ABC9C',
              border: (resendCooldown > 0 || resendLoading) ? '1px solid #e5e7eb' : '1px solid #1ABC9C',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '0.9rem',
              cursor: (resendCooldown > 0 || resendLoading) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {resendLoading ? (
              <>
                <span style={{ 
                  display: 'inline-block',
                  animation: 'spin 1s linear infinite'
                }}>
                  <RefreshIcon />
                </span>
                Sending...
              </>
            ) : resendCooldown > 0 ? (
              <>Resend in {resendCooldown}s</>
            ) : (
              <>
                <RefreshIcon />
                Resend Code
              </>
            )}
          </button>
        </div>

        {/* Change Email Link */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280', fontSize: '0.85rem' }}>
          Wrong email?{' '}
          <button
            onClick={() => {
              setStep('form');
              setOtp('');
              setError('');
              setSuccess('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#1ABC9C',
              cursor: 'pointer',
              fontWeight: 500,
              textDecoration: 'underline'
            }}
          >
            Go back
          </button>
        </p>

        <style jsx global>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Create Your Account</h2>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Join NOMA and start your productivity journey
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Anonymous Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '0.95rem'
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '0.95rem'
          }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '0.95rem'
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '0.95rem'
          }}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem',
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
            fontSize: '0.9rem',
            marginBottom: '1rem'
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
            background: loading 
              ? '#e5e7eb' 
              : 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
            color: loading ? '#9ca3af' : '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280' }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: '#1ABC9C', fontWeight: 500 }}>
          Login
        </Link>
      </p>
    </div>
  );
}
