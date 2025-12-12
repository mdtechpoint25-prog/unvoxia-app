'use client';

import { useState, useEffect } from 'react';
import ReactionButton from './ReactionButton';
import CommentSection from './CommentSection';

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
  interactive = true
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

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
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: '#9B59B6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600
        }}>
          {avatar || username.charAt(0).toUpperCase()}
        </span>
        <div>
          <strong style={{ color: '#2C3E50' }}>{username}</strong>
          <div style={{ fontSize: '0.75rem', color: '#888' }}>
            {formatTime(timestamp)} - <span style={{ color: '#1ABC9C' }}>{category}</span>
          </div>
        </div>
      </div>
      <p style={{ color: '#2C3E50', marginBottom: '0.75rem', whiteSpace: 'pre-wrap' }}>{content}</p>
      {mediaUrl && (
        <div style={{ marginBottom: '0.75rem' }}>
          <img src={mediaUrl} alt="post media" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      )}
      
      {interactive && (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
              fontSize: '0.9rem'
            }}
          >
            {commentsCount + comments.length} comments
          </button>
        </div>
      )}

      {!interactive && (
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#1ABC9C' }}>
          <span>{initialReactions.length} reactions</span>
          <span>{commentsCount} comments</span>
        </div>
      )}

      {showComments && interactive && (
        loadingComments ? (
          <p style={{ color: '#888', marginTop: '1rem' }}>Loading comments...</p>
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
