import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
        animation: 'fadeIn 0.8s ease-in'
      }}>
        {/* Main Message */}
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          fontWeight: 700,
          color: '#2C3E50',
          marginBottom: '1rem',
          lineHeight: 1.2
        }}>
          Speak Without Fear
        </h1>
        
        <p style={{
          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
          color: '#5a6c7d',
          marginBottom: '1rem',
          fontWeight: 300
        }}>
          You are anonymous here
        </p>

        <p style={{
          fontSize: '1rem',
          color: '#7a8a9a',
          marginBottom: '3rem',
          lineHeight: 1.6,
          maxWidth: '480px',
          margin: '0 auto 3rem'
        }}>
          No judgement. No names. No pressure.<br />
          Just a safe space to share what's on your heart.
        </p>

        {/* Primary CTA */}
        <Link href="/share" style={{
          display: 'inline-block',
          padding: '1.25rem 3rem',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#fff',
          background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
          borderRadius: '50px',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(26, 188, 156, 0.25)',
          transition: 'all 0.3s ease',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}>
          Share What You're Feeling
        </Link>

        {/* Secondary CTA */}
        <div style={{ marginTop: '1rem' }}>
          <Link href="/circles" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1ABC9C',
            background: '#fff',
            borderRadius: '50px',
            textDecoration: 'none',
            border: '2px solid #1ABC9C',
            transition: 'all 0.3s ease'
          }}>
            Join a Healing Circle
          </Link>
        </div>

        {/* Trust Indicator */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.6)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🔒</div>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0,
            lineHeight: 1.6
          }}>
            We do not collect names, emails, or IP addresses.<br />
            Your words are safe here.
          </p>
        </div>
      </div>
    </main>
  );
}