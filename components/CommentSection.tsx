'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  parent_id?: string | null;
  users: {
    username: string;
    avatar_url: string | null;
  };
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentAdded?: (comment: Comment) => void;
}

// SVG Icons
const UserIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// Recursive comment component for threading
function CommentItem({ 
  comment, 
  postId, 
  depth = 0, 
  onReply,
  formatTime 
}: { 
  comment: Comment; 
  postId: string;
  depth?: number;
  onReply: (parentId: string, content: string) => Promise<void>;
  formatTime: (date: string) => string;
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReply = async () => {
    if (!replyContent.trim()) return;
    setLoading(true);
    await onReply(comment.id, replyContent);
    setReplyContent('');
    setShowReplyInput(false);
    setLoading(false);
  };

  const maxDepth = 3;
  const hasUsername = comment.users?.username;

  return (
    <div style={{ 
      marginLeft: depth > 0 ? '1.5rem' : 0,
      borderLeft: depth > 0 ? '2px solid #e5e7eb' : 'none',
      paddingLeft: depth > 0 ? '0.75rem' : 0,
      marginBottom: '0.75rem'
    }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
        <span style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #9B59B6 0%, #1ABC9C 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 600,
          flexShrink: 0
        }}>
          {hasUsername ? comment.users.username.charAt(0).toUpperCase() : <UserIcon size={14} />}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.85rem' }}>
            <strong style={{ color: '#1a1a2e' }}>@{comment.users?.username || 'Anonymous'}</strong>
            <span style={{ color: '#9ca3af', marginLeft: '0.5rem', fontSize: '0.75rem' }}>
              {formatTime(comment.created_at)}
            </span>
          </div>
          <p style={{ color: '#4a5568', margin: '0.25rem 0', fontSize: '0.9rem', lineHeight: 1.5 }}>
            {comment.content}
          </p>
          {depth < maxDepth && (
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              style={{
                background: 'none',
                border: 'none',
                color: '#1ABC9C',
                cursor: 'pointer',
                fontSize: '0.8rem',
                padding: 0,
                fontWeight: 500
              }}
            >
              Reply
            </button>
          )}

          {showReplyInput && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.85rem'
                }}
              />
              <button
                onClick={handleReply}
                disabled={loading || !replyContent.trim()}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: '#1ABC9C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                {loading ? '...' : <><SendIcon /> Reply</>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              depth={depth + 1}
              onReply={onReply}
              formatTime={formatTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ postId, comments, onCommentAdded }: CommentSectionProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

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
      setLocalComments([...localComments, data.comment]);
      onCommentAdded?.(data.comment);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (parentId: string, replyContent: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent, parent_id: parentId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setLocalComments([...localComments, data.comment]);
      onCommentAdded?.(data.comment);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const displayComments = showAll ? localComments : localComments.slice(0, 5);

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
    <div style={{ marginTop: '1rem', borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
      {displayComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          onReply={handleReply}
          formatTime={formatTime}
        />
      ))}

      {localComments.length > 5 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#1ABC9C',
            cursor: 'pointer',
            fontSize: '0.85rem',
            marginBottom: '0.75rem',
            fontWeight: 500
          }}
        >
          View all {localComments.length} comments
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
            padding: '0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '0.9rem'
          }}
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          style={{
            padding: '0.75rem 1.25rem',
            background: (loading || !content.trim()) ? '#e5e7eb' : '#1ABC9C',
            color: (loading || !content.trim()) ? '#9ca3af' : '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: (loading || !content.trim()) ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {loading ? '...' : <><SendIcon /> Send</>}
        </button>
      </form>
      {error && <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
}
