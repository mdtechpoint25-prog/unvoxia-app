'use client';

import Link from 'next/link';

export default function AdminPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Admin Dashboard</h2>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Manage content, users, and platform settings.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#1ABC9C',
          borderRadius: '12px',
          padding: '1.5rem',
          color: '#fff'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>0</div>
          <div>Total Users</div>
        </div>
        <div style={{
          background: '#FF6B35',
          borderRadius: '12px',
          padding: '1.5rem',
          color: '#fff'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>0</div>
          <div>Total Posts</div>
        </div>
        <div style={{
          background: '#9B59B6',
          borderRadius: '12px',
          padding: '1.5rem',
          color: '#fff'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>0</div>
          <div>Flagged Content</div>
        </div>
        <div style={{
          background: '#4DA8DA',
          borderRadius: '12px',
          padding: '1.5rem',
          color: '#fff'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>0</div>
          <div>Reports</div>
        </div>
      </div>

      <div style={{
        background: '#f5f5f5',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>???</div>
        <h3 style={{ color: '#2C3E50', marginBottom: '0.5rem' }}>Moderation Dashboard</h3>
        <p style={{ color: '#888', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          AI-powered content moderation with human review capabilities coming soon.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxWidth: '300px',
          margin: '0 auto',
          textAlign: 'left',
          color: '#2C3E50'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#9744;</span> Review flagged posts
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#9744;</span> Manage user reports
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#9744;</span> Feature/highlight posts
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#9744;</span> Manage user badges
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>&#9744;</span> View platform analytics
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/" style={{
          padding: '0.75rem 1.5rem',
          background: '#2C3E50',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600
        }}>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
