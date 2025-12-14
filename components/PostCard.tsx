'use client';

import { useState } from 'react';
import ReactionButton from './ReactionButton';
import CommentSection from './CommentSection';
import ReportButton from './ReportButton';

export interface PostCardProps {
  id: string;
  username: string;
  avatar?: string | null;
  timestamp: string;
  category: string;
  content: string;
  mediaUrl?: string | null;
  initialReactions?: { emoji: string; user_id: string }[];
  commentsCount: number;
  currentUserId?: string;
  interactive?: boolean;
  isAnonymous?: boolean;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string | null;
  };
}

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

export default function PostCard({
  id,
  username,
  avatar,
  timestamp,
  category,
  content,
  mediaUrl,
  initialReactions = [],
  commentsCount,
  currentUserId,
  interactive = true,
  isAnonymous = false
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const displayName = isAnonymous ? 'Anonymous' : username;
  const displayAvatar = isAnonymous ? null : (avatar || username.charAt(0).toUpperCase());

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const loadComments = async () => {
    if (comments.length > 0) return;
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/posts/${id}/comments`);
      const data = await res.json();
      if (res.ok) setComments(data.comments);
    } catch (err) {
      console.error('Load comments error:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleToggleComments = () => {
    if (!showComments) loadComments();
    setShowComments(!showComments);
  };

  const handleCommentAdded = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div style={{
      background: 'var(--bg-surface)',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-card)',
      border: '1px solid var(--border-subtle)',
      marginBottom: '1rem',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '1rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: isAnonymous 
              ? 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' 
              : 'linear-gradient(135deg, var(--accent) 0%, var(--accent-bright) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1rem'
          }}>
            {isAnonymous ? <UserIcon /> : displayAvatar}
          </span>
          <div>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              {isAnonymous ? 'Anonymous' : `@${displayName}`}
            </strong>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2px' }}>
              <span>{formatTime(timestamp)}</span>
              <span style={{ opacity: 0.5 }}>-</span>
              <span style={{ 
                color: 'var(--accent)', 
                background: 'rgba(212, 168, 85, 0.1)',
                padding: '2px 8px',
                borderRadius: '100px',
                fontSize: '0.75rem'
              }}>{category}</span>
            </div>
          </div>
        </div>
        
        {interactive && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{
                background: 'var(--overlay-low)',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.5rem',
                fontSize: '1.25rem',
                borderRadius: '10px',
                transition: 'all 0.2s'
              }}
            >
              <MoreIcon />
            </button>
            {showMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'var(--bg-surface-elevated)',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                zIndex: 10
              }}>
                <ReportButton postId={id} />
              </div>
            )}
          </div>
        )}
      </div>

      <p style={{ 
        color: 'var(--text-secondary)', 
        marginBottom: '1rem', 
        whiteSpace: 'pre-wrap',
        lineHeight: 1.7,
        fontSize: '1rem'
      }}>
        {content}
      </p>

      {mediaUrl && (
        <div style={{ marginBottom: '1rem' }}>
          <img 
            src={mediaUrl} 
            alt="post media" 
            style={{ width: '100%', borderRadius: '16px' }} 
          />
        </div>
      )}
      
      {interactive && (
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <ReactionButton
            postId={id}
            reactions={initialReactions}
            currentUserId={currentUserId}
          />
          <button
            onClick={handleToggleComments}
            style={{
              background: 'var(--overlay-low)',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '10px',
              transition: 'all 0.2s'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {showComments ? 'Hide' : 'Show'} responses
          </button>
        </div>
      )}

      {!interactive && (
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          fontSize: '0.875rem', 
          color: 'var(--text-muted)',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <span style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>Anonymous voice</span>
        </div>
      )}

      {showComments && interactive && (
        loadingComments ? (
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Loading comments...</p>
        ) : (
          <CommentSection
            postId={id}
            comments={comments}
            onCommentAdded={handleCommentAdded}
          />
        )
      )}
    </div>
  );
}

