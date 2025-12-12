'use client';

import { useState } from 'react';

interface PromptCardProps {
  prompt: string;
  onRespond?: (response: string) => void;
}

export default function PromptCard({ prompt, onRespond }: PromptCardProps) {
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;

    setLoading(true);
    try {
      // Submit as a post with daily prompts category
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `${prompt}\n\n${response}`,
          category: 'Daily Tips'
        })
      });

      if (res.ok) {
        setSubmitted(true);
        onRespond?.(response);
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
        background: 'linear-gradient(135deg, #1ABC9C 0%, #4DA8DA 100%)',
        borderRadius: '12px',
        padding: '1.5rem',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>&#10003;</div>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Thank you for reflecting!</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Your response has been shared anonymously.</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #9B59B6 0%, #4DA8DA 100%)',
      borderRadius: '12px',
      padding: '1.5rem',
      color: '#fff',
      marginBottom: '1rem'
    }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>&#128161;</div>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 500 }}>
        {prompt}
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Share your thoughts anonymously..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '8px',
            resize: 'vertical',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            marginBottom: '0.75rem'
          }}
        />
        <button
          type="submit"
          disabled={loading || !response.trim()}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#fff',
            color: '#9B59B6',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Sharing...' : 'Share Response'}
        </button>
      </form>
    </div>
  );
}
