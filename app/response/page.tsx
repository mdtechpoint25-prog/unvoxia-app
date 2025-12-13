'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getCompassionateResponse, getBreathingExercise, getAffirmation, type EmotionType } from '@/lib/compassionate-responses';
import { Suspense } from 'react';

function ResponseContent() {
  const searchParams = useSearchParams();
  const mood = (searchParams.get('mood') || 'general') as EmotionType;
  
  const response = getCompassionateResponse(mood);
  const breathing = getBreathingExercise();
  const affirmation = getAffirmation();

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
      padding: '2rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '700px',
        width: '100%'
      }}>
        {/* Main Response Card */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1.5rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            💚
          </div>

          <h1 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: '#2C3E50',
            marginBottom: '1rem'
          }}>
            Thank you for sharing
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: '#5a6c7d',
            lineHeight: 1.7,
            marginBottom: '2rem'
          }}>
            {response}
          </p>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(26, 188, 156, 0.05)',
            borderRadius: '16px',
            marginBottom: '1.5rem'
          }}>
            <p style={{
              fontSize: '1rem',
              color: '#1ABC9C',
              fontWeight: 600,
              marginBottom: '0.75rem'
            }}>
              Your feelings matter. You are heard. You are not alone.
            </p>
          </div>
        </div>

        {/* Breathing Exercise Card */}
        <div style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🌬️</span>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#2C3E50', margin: 0 }}>
              Grounding Exercise
            </h3>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#5a6c7d', lineHeight: 1.6, margin: 0 }}>
            {breathing}
          </p>
        </div>

        {/* Affirmation Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.1) 0%, rgba(155, 89, 182, 0.1) 100%)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          border: '2px solid rgba(26, 188, 156, 0.2)'
        }}>
          <p style={{
            fontSize: '1.05rem',
            color: '#2C3E50',
            fontWeight: 500,
            margin: 0,
            fontStyle: 'italic'
          }}>
            "{affirmation}"
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <Link href="/share" style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(26, 188, 156, 0.25)',
            transition: 'transform 0.2s ease'
          }}>
            Share Again
          </Link>

          <Link href="/heal" style={{
            padding: '1rem',
            background: '#fff',
            color: '#1ABC9C',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 600,
            border: '2px solid #1ABC9C',
            transition: 'all 0.2s ease'
          }}>
            Read Stories
          </Link>

          <Link href="/" style={{
            padding: '1rem',
            background: '#fff',
            color: '#6b7280',
            textDecoration: 'none',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 600,
            border: '2px solid #e5e7eb',
            transition: 'all 0.2s ease'
          }}>
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ResponsePage() {
  return (
    <Suspense fallback={
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#6b7280' }}>Loading...</div>
      </main>
    }>
      <ResponseContent />
    </Suspense>
  );
}
