'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/lib/constants';

interface CreatePostFormProps {
  onPostCreated?: () => void;
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Thoughts');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content.trim(),
          category,
          is_anonymous: isAnonymous
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create post');

      setContent('');
      setCategory('Thoughts');
      setIsAnonymous(false);
      setIsExpanded(false);
      onPostCreated?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      border: '1px solid #e5e7eb',
      marginBottom: '1.5rem',
      overflow: 'hidden'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ padding: '1.25rem' }}>
          <textarea
            placeholder="What's on your mind? Share your authentic thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            style={{
              width: '100%',
              minHeight: isExpanded ? '120px' : '60px',
              padding: '0',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: '1rem',
              lineHeight: 1.6,
              fontFamily: 'inherit',
              color: '#1a1a2e',
              transition: 'min-height 0.3s ease'
            }}
          />
        </div>

        {isExpanded && (
          <div style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid #f3f4f6',
            background: '#fafafa'
          }}>
            {/* Category Selection */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.85rem', 
                color: '#6b7280',
                marginBottom: '0.5rem',
                fontWeight: 500
              }}>
                Category
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      border: 'none',
                      background: category === cat
                        ? 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)'
                        : '#e5e7eb',
                      color: category === cat ? '#fff' : '#4a5568',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isAnonymous
                      ? 'linear-gradient(135deg, #9B59B6 0%, #8e44ad 100%)'
                      : '#ddd',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.3s ease'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    left: isAnonymous ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#fff',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }} />
                </button>
                <span style={{
                  fontSize: '0.9rem',
                  color: isAnonymous ? '#9B59B6' : '#6b7280',
                  fontWeight: 500
                }}>
                  {isAnonymous ? 'Anonymous Mode' : 'Show Identity'}
                </span>
              </div>
            </div>

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

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setContent('');
                  setError('');
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#f5f5f5',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !content.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: (loading || !content.trim())
                    ? '#9ca3af'
                    : 'linear-gradient(135deg, #1ABC9C 0%, #16a085 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: (loading || !content.trim()) ? 'not-allowed' : 'pointer',
                  boxShadow: (loading || !content.trim())
                    ? 'none'
                    : '0 4px 15px rgba(26, 188, 156, 0.3)'
                }}
              >
                {loading ? 'Posting...' : 'Share'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

