'use client';

import { useState, useEffect, useRef } from 'react';

interface Comment {
  id: string;
  username: string;
  content: string;
  createdAt: string;
  isPinned: boolean;
}

interface CommentSheetProps {
  postId: string;
  onClose: () => void;
}

// Mock comments
const mockComments: Comment[] = [
  {
    id: '1',
    username: 'kindspirit_22',
    content: 'This hits so close to home. You\'re not alone in feeling this way. Sending you strength 💙',
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    isPinned: true,
  },
  {
    id: '2',
    username: 'healing_slowly',
    content: 'Thank you for sharing this. It takes courage to be vulnerable.',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    isPinned: false,
  },
  {
    id: '3',
    username: 'gentlesoul_91',
    content: 'I felt this in my chest. We\'re all carrying invisible weights.',
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    isPinned: false,
  },
  {
    id: '4',
    username: 'midnight_thoughts',
    content: 'The mask we wear is often the heaviest thing we carry. Take care of yourself.',
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
    isPinned: false,
  },
];

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export default function CommentSheet({ postId, onClose }: CommentSheetProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment: Comment = {
      id: Date.now().toString(),
      username: 'you',
      content: newComment,
      createdAt: new Date().toISOString(),
      isPinned: false,
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    setIsSubmitting(false);
  };

  // Sort: pinned first
  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        ref={sheetRef}
        style={{
          width: '100%',
          maxWidth: '500px',
          maxHeight: '75vh',
          background: '#161823',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px' }}>
          <div style={{ width: '40px', height: '4px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '2px' }} />
        </div>

        {/* Header */}
        <div
          style={{
            padding: '8px 20px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
            Support ({comments.length})
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            ×
          </button>
        </div>

        {/* Kindness Reminder - Pinned */}
        <div
          style={{
            padding: '14px 20px',
            background: 'rgba(124, 255, 178, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
            💚 Respond with kindness. Someone is healing.
          </p>
        </div>

        {/* Comments List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
          }}
        >
          {sortedComments.map((comment) => (
            <div
              key={comment.id}
              style={{
                marginBottom: '20px',
                padding: comment.isPinned ? '12px' : 0,
                background: comment.isPinned ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                borderRadius: comment.isPinned ? '12px' : 0,
              }}
            >
              {comment.isPinned && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#0d9488' }}>📌 Pinned</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Avatar */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0d9488, #7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                  }}
                >
                  👤
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                      @{comment.username}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}>
                      {formatTime(comment.createdAt)}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '12px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a supportive response..."
            style={{
              flex: 1,
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            style={{
              padding: '12px 20px',
              background: newComment.trim() ? '#0d9488' : 'rgba(13, 148, 136, 0.3)',
              border: 'none',
              borderRadius: '24px',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: newComment.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
            }}
          >
            {isSubmitting ? '...' : 'Post'}
          </button>
        </form>

        <style jsx>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
