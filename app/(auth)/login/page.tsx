'use client';

import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #2C3E50 100%)'
    }}>
      {/* Left Side - Branding */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }} className="auth-brand-side">
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26, 188, 156, 0.2) 0%, transparent 70%)',
          top: '10%',
          left: '-10%',
          filter: 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155, 89, 182, 0.2) 0%, transparent 70%)',
          bottom: '10%',
          right: '-5%',
          filter: 'blur(40px)'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem' }}>
            <Logo size={60} showText={false} variant="icon" />
          </Link>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '1rem'
          }}>
            Welcome Back
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '400px',
            lineHeight: 1.7
          }}>
            Sign in to continue your productivity journey with No Mask World.
          </p>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        borderRadius: '24px 0 0 24px',
        padding: '2rem'
      }}>
        <LoginForm />
      </div>
      
      <style jsx global>{`
        @media (max-width: 768px) {
          .auth-brand-side { display: none !important; }
          main > div:last-child { border-radius: 0 !important; }
        }
      `}</style>
    </main>
  );
}