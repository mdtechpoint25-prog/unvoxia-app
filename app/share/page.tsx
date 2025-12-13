'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOODS, type EmotionType } from '@/lib/compassionate-responses';

const MAX_CHARS = 1000;

export default function SharePage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<EmotionType | ''>('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() || submitting) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content.trim(),
          mood: mood || 'general',
          anonymous: true
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to response page with the compassionate message
        router.push(`/response?mood=${mood || 'general'}`);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const remainingChars = MAX_CHARS - content.length;

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
        width: '100%',
        background: '#fff',
        borderRadius: '24px',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
      }}>
        {/* Header */}
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 700,
          color: '#2C3E50',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          Share What's on Your Heart
        </h1>
        
        <p style={{
          fontSize: '1rem',
          color: '#7a8a9a',
          marginBottom: '2rem',
          textAlign: 'center',
          lineHeight: 1.6
        }}>
          Type what's weighing on your heart… no name, no judgment.
        </p>

        {/* Mood Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#5a6c7d',
            marginBottom: '0.75rem'
          }}>
            How are you feeling? (Optional)
          </label>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '0.75rem'
          }}>
            {MOODS.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value as EmotionType)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: mood === m.value ? '2px solid #1ABC9C' : '2px solid #e5e7eb',
                  background: mood === m.value ? 'rgba(26, 188, 156, 0.1)' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: mood === m.value ? '#1ABC9C' : '#6b7280',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div style={{ marginBottom: '1rem' }}>
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setContent(e.target.value);
              }
            }}
            placeholder="Share your thoughts, feelings, struggles, or fears here. You are completely anonymous. No one will know who you are."
            maxLength={MAX_CHARS}
            rows={10}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: '#2C3E50',
              resize: 'vertical',
              fontFamily: 'inherit',
              minHeight: '200px'
            }}
          />
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.5rem'
          }}>
            <span style={{
              fontSize: '0.875rem',
              color: remainingChars < 50 ? '#e74c3c' : '#9ca3af'
            }}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || submitting}
          style={{
            width: '100%',
            padding: '1.25rem',
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#fff',
            background: (!content.trim() || submitting) 
              ? '#d1d5db' 
              : 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
            borderRadius: '12px',
            border: 'none',
            cursor: (!content.trim() || submitting) ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: (!content.trim() || submitting) 
              ? 'none' 
              : '0 4px 16px rgba(26, 188, 156, 0.3)',
            marginBottom: '1.5rem'
          }}
        >
          {submitting ? 'Sharing...' : 'Submit Anonymously'}
        </button>

        {/* Trust Message */}
        <div style={{
          padding: '1.25rem',
          background: 'rgba(26, 188, 156, 0.05)',
          borderRadius: '12px',
          borderLeft: '4px solid #1ABC9C'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'start',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>🔒</span>
            <div>
              <p style={{
                fontSize: '0.875rem',
                color: '#5a6c7d',
                margin: 0,
                lineHeight: 1.6
              }}>
                <strong>Your privacy is sacred:</strong> We do not collect names, emails, or IP addresses. 
                Your submission is completely anonymous. You are safe here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
