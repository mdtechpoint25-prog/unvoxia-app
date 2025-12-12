'use client';

import { useState } from 'react';
import { FEELINGS } from '@/lib/constants';

interface PromptCardProps {
  prompt: string;
  onRespond?: (response: string, feelingsScore?: number) => void;
}

export default function PromptCard({ prompt, onRespond }: PromptCardProps) {
  const [response, setResponse] = useState('');
  const [feelingsScore, setFeelingsScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;

    setLoading(true);
    try {
      // Submit as a post with Feelings category (for daily prompts)
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `?? Today's Reflection:\n"${prompt}"\n\n${response}${feelingsScore ? `\n\nFeeling: ${FEELINGS.find(f => f.value === feelingsScore)?.emoji} ${FEELINGS.find(f => f.value === feelingsScore)?.label}` : ''}`,
          category: 'Feelings'
        })
      });

      if (res.ok) {
        setSubmitted(true);
        onRespond?.(response, feelingsScore || undefined);
      }
    } catch (err) {
      console.error('Submit prompt error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
        borderRadius: '16px',
        padding: '2rem',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>?</div>
        <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Beautiful reflection!
        </p>
        <p style={{ fontSize: '0.95rem', opacity: 0.9 }}>
          Your authentic thoughts have been shared with the community.
        </p>
        {feelingsScore && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <span style={{ fontSize: '1.5rem' }}>
              {FEELINGS.find(f => f.value === feelingsScore)?.emoji}
            </span>
            <span style={{ marginLeft: '0.5rem' }}>
              Feeling {FEELINGS.find(f => f.value === feelingsScore)?.label}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #2C3E50 100%)',
      borderRadius: '16px',
      padding: '1.5rem',
      color: '#fff',
      marginBottom: '1.5rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #9B59B6 0%, #1ABC9C 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem'
        }}>
          ??
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
            TODAY'S PROMPT
          </div>
          <div style={{ fontSize: '0.85rem', color: '#1ABC9C', fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Prompt Question */}
      <h3 style={{ 
        fontSize: '1.25rem', 
        marginBottom: '1.25rem', 
        fontWeight: 600,
        lineHeight: 1.5
      }}>
        {prompt}
      </h3>

      {/* Feelings Meter */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ 
          fontSize: '0.85rem', 
          color: 'rgba(255,255,255,0.7)',
          display: 'block',
          marginBottom: '0.5rem'
        }}>
          How are you feeling? (optional)
        </label>
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem',
          justifyContent: 'space-between'
        }}>
          {FEELINGS.map((feeling) => (
            <button
              key={feeling.value}
              type="button"
              onClick={() => setFeelingsScore(feelingsScore === feeling.value ? null : feeling.value)}
              style={{
                flex: 1,
                padding: '0.75rem 0.5rem',
                background: feelingsScore === feeling.value 
                  ? 'linear-gradient(135deg, #1ABC9C 0%, #9B59B6 100%)' 
                  : 'rgba(255,255,255,0.1)',
                border: feelingsScore === feeling.value 
                  ? '2px solid #1ABC9C' 
                  : '2px solid transparent',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{feeling.emoji}</span>
              <span style={{ 
                fontSize: '0.65rem', 
                color: '#fff',
                opacity: feelingsScore === feeling.value ? 1 : 0.7
              }}>
                {feeling.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Response Form */}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Take a moment to reflect... What comes to mind?"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '1rem',
            border: 'none',
            borderRadius: '12px',
            resize: 'vertical',
            fontFamily: 'inherit',
            fontSize: '1rem',
            marginBottom: '1rem',
            background: 'rgba(255,255,255,0.95)'
          }}
        />
        <button
          type="submit"
          disabled={loading || !response.trim()}
          style={{
            width: '100%',
            padding: '0.875rem 1.5rem',
            background: loading || !response.trim() 
              ? 'rgba(255,255,255,0.3)' 
              : 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: loading || !response.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? 'Sharing your reflection...' : '? Share My Reflection'}
        </button>
      </form>
    </div>
  );
}
