'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentAdded?: (comment: Comment) => void;
}

export default function CommentSection({ postId, comments, onCommentAdded }: CommentSectionProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add comment');

      setContent('');
      onCommentAdded?.(data.comment);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const displayComments = showAll ? comments : comments.slice(0, 3);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
      {displayComments.map((comment) => (
        <div key={comment.id} style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
            <span style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#9B59B6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 600,
              flexShrink: 0
            }}>
              {comment.users?.username?.charAt(0).toUpperCase() || '?'}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem' }}>
                <strong style={{ color: '#2C3E50' }}>{comment.users?.username || 'Anonymous'}</strong>
                <span style={{ color: '#888', marginLeft: '0.5rem', fontSize: '0.75rem' }}>
                  {formatTime(comment.created_at)}
                </span>
              </div>
              <p style={{ color: '#2C3E50', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}

      {comments.length > 3 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#1ABC9C',
            cursor: 'pointer',
            fontSize: '0.85rem',
            marginBottom: '0.75rem'
          }}
        >
          View all {comments.length} comments
        </button>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Add a supportive comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          style={{
            padding: '0.5rem 1rem',
            background: '#1ABC9C',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
      {error && <p style={{ color: '#FF6F91', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</p>}
    </div>
  );
}
