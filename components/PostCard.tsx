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

// SVG Icons
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
      background: '#fff',
      borderRadius: '16px',
      padding: '1.25rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      border: '1px solid #e5e7eb',
      marginBottom: '1rem'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '0.75rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: isAnonymous 
              ? 'linear-gradient(135deg, #7f8c8d 0%, #95a5a6 100%)' 
              : 'linear-gradient(135deg, #9B59B6 0%, #1ABC9C 100%)',
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
            <strong style={{ color: '#1a1a2e' }}>
              {isAnonymous ? 'Anonymous' : `@${displayName}`}
            </strong>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              {formatTime(timestamp)} - <span style={{ color: '#1ABC9C' }}>{category}</span>
            </div>
          </div>
        </div>
        
        {/* More Menu */}
        {interactive && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                padding: '0.5rem',
                fontSize: '1.25rem'
              }}
            >
              <MoreIcon />
            </button>
            {showMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                zIndex: 10
              }}>
                <ReportButton postId={id} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <p style={{ 
        color: '#4a5568', 
        marginBottom: '0.75rem', 
        whiteSpace: 'pre-wrap',
        lineHeight: 1.6 
      }}>
        {content}
      </p>

      {/* Media */}
      {mediaUrl && (
        <div style={{ marginBottom: '0.75rem' }}>
          <img 
            src={mediaUrl} 
            alt="post media" 
            style={{ width: '100%', borderRadius: '12px' }} 
          />
        </div>
      )}
      
      {/* Actions */}
      {interactive && (
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          paddingTop: '0.75rem',
          borderTop: '1px solid #f3f4f6'
        }}>
          <ReactionButton
            postId={id}
            reactions={initialReactions}
            currentUserId={currentUserId}
          />
          <button
            onClick={handleToggleComments}
            style={{
              background: 'none',
              border: 'none',
              color: '#1ABC9C',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            {commentsCount + comments.length} comments
          </button>
        </div>
      )}

      {!interactive && (
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          fontSize: '0.9rem', 
          color: '#1ABC9C',
          paddingTop: '0.75rem',
          borderTop: '1px solid #f3f4f6'
        }}>
          <span>{initialReactions.length} reactions</span>
          <span>{commentsCount} comments</span>
        </div>
      )}

      {showComments && interactive && (
        loadingComments ? (
          <p style={{ color: '#9ca3af', marginTop: '1rem' }}>Loading comments...</p>
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

